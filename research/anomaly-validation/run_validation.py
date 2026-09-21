#!/usr/bin/env python3
"""Functional tests only. No emulator throughput, latency or product benchmarks.

Fixtures are explicitly synthetic. Optional public recordings are pinned and hashed.
Uses only Python's standard library; never executes commands from recorded events.
"""
from __future__ import annotations

import argparse
import collections
import datetime as dt
import hashlib
import ipaddress
import json
import math
from pathlib import Path
import re
import sys
import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent
CONTRACT = json.loads((ROOT / 'contracts.json').read_text())
MANIFEST = json.loads((ROOT / 'datasets.json').read_text())
IMAGE = 'mcr.microsoft.com/azuredataexplorer/kustainer-linux@sha256:21516f47b7877707cd603ad7dbc372d4cf0ac0d2b758f2c192f5266c4214d363'
DAY = dt.datetime(2026, 9, 20, tzinfo=dt.timezone.utc)
NS = {'e': 'http://schemas.microsoft.com/win/2004/08/events/event'}


def sha256(data):
    return hashlib.sha256(data).hexdigest()


def timestamp(minutes=0):
    return (DAY + dt.timedelta(hours=9, minutes=minutes)).isoformat()


def integer(value):
    if value in (None, '', '-'):
        return None
    return int(str(value), 16 if str(value).lower().startswith('0x') else 10)


def source_ip(value):
    if value in (None, '', '-'):
        return ''
    parsed = ipaddress.ip_address(value)
    return str(getattr(parsed, 'ipv4_mapped', None) or parsed)


def normalize_xml(raw):
    """Read only recorded XML; reject unsupported provider/channel combinations."""
    if b'<!DOCTYPE' in raw.upper() or b'<!ENTITY' in raw.upper():
        raise ValueError('DTD/entity declarations are not accepted')
    blocks = re.findall(rb'<Event\b[\s\S]*?</Event>', raw)
    if not blocks:
        raise ValueError('No Windows event XML records')
    tables = {'WindowsEvents': [], 'EndpointEvents': []}
    records = []
    for ordinal, block in enumerate(blocks):
        event = ET.fromstring(block)
        system = event.find('e:System', NS)
        provider = system.find('e:Provider', NS).get('Name')
        channel = system.findtext('e:Channel', '', NS)
        eid = int(system.findtext('e:EventID', '', NS))
        fields = {item.get('Name'): item.text or '' for item in event.findall('e:EventData/e:Data', NS)}
        record = system.findtext('e:EventRecordID', '', NS)
        when = system.find('e:TimeCreated', NS).get('SystemTime')
        identity = f'{provider}:{channel}:{record}:{when}'
        common = dict(TimeGenerated=when, Computer=system.findtext('e:Computer', '', NS).lower(),
                      EvidenceId=identity, EventID=eid)
        if provider == 'Microsoft-Windows-Security-Auditing' and channel == 'Security':
            principal = fields.get('SubjectUserSid') if eid == 4662 else fields.get('TargetUserSid')
            if not principal or principal in ('-', 'S-1-0-0'):
                user = fields.get('SubjectUserName', '') if eid == 4662 else fields.get('TargetUserName', '')
                domain = fields.get('SubjectDomainName', '') if eid == 4662 else fields.get('TargetDomainName', '')
                principal = f'{domain}\\{user}' if domain and user else user
            logon = fields.get('SubjectLogonId') if eid == 4662 else fields.get('TargetLogonId')
            row = dict(common, Principal=(principal or '').lower(), SourceIP=source_ip(fields.get('IpAddress')),
                       LogonId=str(integer(logon)) if integer(logon) is not None else '',
                       AccessMask=integer(fields.get('AccessMask')), ObjectType=fields.get('ObjectType', ''),
                       Properties=fields.get('Properties', ''), ServiceName=fields.get('ServiceName', ''),
                       EncryptionType=fields.get('TicketEncryptionType', ''),
                       ResultCode=str(integer(fields.get('Status'))) if integer(fields.get('Status')) is not None else '',
                       LogonType=integer(fields.get('LogonType')), LogonProcess=fields.get('LogonProcessName', ''),
                       AuthenticationPackage=fields.get('AuthenticationPackageName', ''))
            tables['WindowsEvents'].append(row)
        elif provider == 'Microsoft-Windows-Sysmon' and channel == 'Microsoft-Windows-Sysmon/Operational':
            row = dict(common, Provider=provider, Image=fields.get('SourceImage', fields.get('Image', '')),
                       ParentImage=fields.get('ParentImage', ''), TargetImage=fields.get('TargetImage', ''),
                       GrantedAccess=integer(fields.get('GrantedAccess')), CallTrace=fields.get('CallTrace', ''),
                       CommandLine=fields.get('CommandLine', ''), HostRole='unknown')
            tables['EndpointEvents'].append(row)
        else:
            raise ValueError(f'Unsupported provider/channel: {provider}/{channel}')
        records.append({'ordinal': ordinal, 'id': identity, 'event_id': eid, 'sha256': sha256(block)})
    return tables, records


def literals(value, kind):
    if kind == 'string':
        return json.dumps(value or '', ensure_ascii=True)
    if value is None:
        return f'{kind}(null)'
    if kind == 'datetime':
        return 'datetime(' + value + ')'
    if kind == 'bool':
        return 'true' if value else 'false'
    return str(int(value))


def validate_rows(tables):
    seen = set()
    for row in tables.get('DailyDownloads', []):
        key = row['TenantId'], row['UserId'], row['Day']
        if key in seen:
            raise ValueError('duplicate daily entity row')
        seen.add(key)
        day = dt.datetime.fromisoformat(row['Day'].replace('Z', '+00:00'))
        if day.tzinfo is None or day.utcoffset() != dt.timedelta(0) or any((day.hour, day.minute, day.second, day.microsecond)):
            raise ValueError('DailyDownloads requires UTC midnight bins')


def query_text(name, tables):
    validate_rows(tables)
    lines = [f'let EvaluationDay=datetime({DAY.isoformat()});']
    for table, schema in CONTRACT['tables'].items():
        fields = [part.split(':') for part in schema.split(',')]
        values = [', '.join(literals(row.get(key), kind) for key, kind in fields) for row in tables.get(table, [])]
        lines.append(f'let {table}=datatable({schema})[\n' + ',\n'.join(values) + '\n];')
    return '\n'.join(lines) + '\n' + (ROOT / 'queries' / f'{name}.kql').read_text()


def request(endpoint, csl, management=False, database=''):
    url = endpoint.rstrip('/') + ('/v1/rest/mgmt' if management else '/v1/rest/query')
    body = json.dumps({'db': database, 'csl': csl}).encode()
    req = urllib.request.Request(url, body, {'Content-Type': 'application/json'})
    try:
        with urllib.request.urlopen(req, timeout=60) as response:
            result = json.load(response)
    except urllib.error.HTTPError as error:
        raise RuntimeError(error.read().decode(errors='replace')[:6000]) from error
    if 'error' in result:
        raise RuntimeError(json.dumps(result['error']))
    tables = result.get('Tables', [])
    for table in tables:
        if table.get('TableKind') == 'QueryCompletionInformation':
            for row in table.get('Rows', []):
                if 'error' in str(row).lower():
                    raise RuntimeError(str(row))
    if not tables:
        raise RuntimeError('Engine returned no result table')
    table = tables[0]
    cols = [column['ColumnName'] for column in table['Columns']]
    return [dict(zip(cols, row)) for row in table['Rows']]


def windows(evidence, **kwargs):
    return dict(TimeGenerated=timestamp(), Computer='dc1', EvidenceId=evidence, **kwargs)


def endpoint(evidence, **kwargs):
    return dict(TimeGenerated=timestamp(), Computer='host1', EvidenceId=evidence,
                Provider='Microsoft-Windows-Sysmon', **kwargs)


def synthetic_cases():
    cases = []

    def add(name, query, tables, expected, fields):
        cases.append(dict(name=name, query=query, tables=tables, expected=expected, fields=fields))

    failures = [dict(TimeGenerated=timestamp(i // 3), TenantId='tenant1', UserId=f'u{i % 3}',
                     EventId=f'f{i}', IPAddress=f'192.0.2.{1+i//3}', ResultType='50126') for i in range(6)]
    success = dict(TimeGenerated=timestamp(4), TenantId='tenant1', UserId='u0', EventId='s1',
                   IPAddress='198.51.100.1', ResultType='0')
    spray_fields = ['TenantId', 'UserId', 'SuccessEventId']
    add('spray-success-after-own-failures', 'password-spray', {'SigninEvents': failures+[success]},
        [['tenant1','u0','s1']], spray_fields)
    for name, change in [('unrelated-user', {'UserId':'other'}), ('other-tenant', {'TenantId':'tenant2'}),
                         ('50140-not-success', {'ResultType':'50140'}), ('reversed-order', {'TimeGenerated':timestamp(-1)}),
                         ('expired-followup', {'TimeGenerated':timestamp(32)})]:
        add('spray-'+name, 'password-spray', {'SigninEvents':failures+[dict(success, **change)]}, [], spray_fields)
    add('spray-policy-errors-not-password-failures', 'password-spray',
        {'SigninEvents':[dict(row, ResultType='53003') for row in failures]+[success]}, [], spray_fields)
    add('spray-duplicate-events-not-extra-failures', 'password-spray',
        {'SigninEvents':failures[:3]*3+[success]}, [], spray_fields)
    split = [dict(row, TimeGenerated=timestamp(-1 if i < 3 else 1)) for i,row in enumerate(failures)]
    add('spray-fixed-bin-boundary-known-blind-spot', 'password-spray', {'SigninEvents':split+[success]}, [], spray_fields)
    tickets = [windows(f'k{i}', EventID=4769, Principal='user', ServiceName=f'svc{i}',
                       SourceIP='192.0.2.4', EncryptionType='0x12', ResultCode='0') for i in range(5)]
    add('kerberoast-aes-breadth', 'kerberoasting', {'WindowsEvents':tickets}, [['user',5]], ['Principal','DistinctServices'])
    add('kerberoast-machine-principal-not-hidden', 'kerberoasting',
        {'WindowsEvents':[dict(row, Principal='computer$') for row in tickets]}, [['computer$',5]], ['Principal','DistinctServices'])
    add('kerberoast-low-volume-known-blind-spot', 'kerberoasting', {'WindowsEvents':tickets[:1]}, [], ['Principal'])
    add('kerberoast-krbtgt-not-counted', 'kerberoasting',
        {'WindowsEvents':tickets[:4]+[dict(tickets[4],ServiceName='krbtgt')]}, [], ['Principal'])
    add('kerberoast-repeated-service-not-breadth', 'kerberoasting',
        {'WindowsEvents':[dict(row,ServiceName='svc0') for row in tickets]}, [], ['Principal'])
    replication = windows('r1', EventID=4662, Principal='computer$', LogonId='123', AccessMask=256,
                          ObjectType='domainDNS', Properties='1131f6ad-9c07-11d1-f79f-00c04fc2dcd2')
    logon = windows('l1', EventID=4624, LogonId='123', SourceIP='192.0.2.10')
    for name, extras, status, ip in [('same-dc-logon', [logon], 'correlated','192.0.2.10'),
        ('missing-logon-retained', [], 'unresolved',''),
        ('other-dc-not-joined', [dict(logon, Computer='dc2')], 'unresolved',''),
        ('future-logon-not-joined', [dict(logon, TimeGenerated=timestamp(1))], 'unresolved',''),
        ('stale-logon-not-joined', [dict(logon, TimeGenerated=timestamp(-1441))], 'unresolved',''),
        ('ambiguous-addresses-retained', [logon, dict(logon,EvidenceId='l2',SourceIP='192.0.2.11')], 'ambiguous','')]:
        add('replication-'+name, 'dcsync', {'WindowsEvents':[replication]+extras},
            [['r1',status,ip]], ['EvidenceId','SourceStatus','SourceIP'])
    add('replication-separate-rights-not-and-same-event', 'dcsync',
        {'WindowsEvents':[replication,dict(replication,EvidenceId='r2',Properties='1131f6aa-9c07-11d1-f79f-00c04fc2dcd2')]},
        [['r1'],['r2']], ['EvidenceId'])
    add('replication-wrong-access-bit', 'dcsync', {'WindowsEvents':[dict(replication,AccessMask=16)]}, [], ['EvidenceId'])
    add('replication-additional-access-bits-accepted', 'dcsync', {'WindowsEvents':[dict(replication,AccessMask=272)]}, [['r1']], ['EvidenceId'])
    add('pth-two-views-not-proof', 'pass-the-hash', {'WindowsEvents':[
        windows('p1',EventID=4624,LogonType=9,LogonProcess='seclogo'),
        windows('p2',EventID=4624,LogonType=3,AuthenticationPackage='NTLM'),
        windows('p3',EventID=4624,LogonType=3,AuthenticationPackage='Kerberos')]},
        [['p1','source-new-credentials'],['p2','target-ntlm-network']], ['EvidenceId','EvidenceClass'])
    add('lsass-read-bit-and-trusted-path-retained', 'lsass-access', {'EndpointEvents':[
        endpoint('a1',EventID=10,TargetImage='C:\\Windows\\System32\\lsass.exe',GrantedAccess=0x1410,Image='C:\\Windows\\trusted.exe'),
        endpoint('a2',EventID=10,TargetImage='C:\\Windows\\System32\\lsass.exe',GrantedAccess=0x1400),
        endpoint('a3',EventID=10,TargetImage='C:\\Windows\\other.exe',GrantedAccess=0x1410)]}, [['a1']], ['EvidenceId'])
    web = endpoint('w1',EventID=1,HostRole='web-server',ParentImage='C:\\inetsrv\\w3wp.exe',Image='C:\\Windows\\cmd.exe')
    add('web-child-role-scoped', 'web-shell-lineage', {'EndpointEvents':[web,
        dict(web,EvidenceId='w2',HostRole='developer'),dict(web,EvidenceId='w3',ParentImage='C:\\Windows\\explorer.exe')]}, [['w1']], ['EvidenceId'])
    add('dns-frequency-entropy-not-randomness', 'dns-entropy', {'DnsLabels':[
        dict(TimeGenerated=timestamp(),Sensor='dns1',EvidenceId='d1',Label='aaaa'),
        dict(TimeGenerated=timestamp(),Sensor='dns1',EvidenceId='d2',Label='abcd'),
        dict(TimeGenerated=timestamp(),Sensor='dns1',EvidenceId='d3',Label='AaAa'),
        dict(TimeGenerated=timestamp(),Sensor='dns1',EvidenceId='empty',Label=''),
        dict(TimeGenerated=timestamp(),Sensor='dns1',EvidenceId='unicode',Label='ééé')]},
        [['d1',0.0],['d2',2.0],['d3',0.0]], ['EvidenceId','Entropy'])
    for name, n, count, complete, history_complete, expected in [
        ('zero-mad-spike',28,30,True,True,'above-baseline'),
        ('zero-mad-small-change',28,20,True,True,'within-baseline'),
        ('cold-start',0,1000,True,True,'insufficient-history'),
        ('missing-history-not-zero',28,1000,True,False,'insufficient-history'),
        ('current-outage',28,1000,False,True,'missing-telemetry'),
        ('current-null-count',28,None,True,True,'missing-telemetry'),
        ('minimum-observed-days',14,30,True,True,'above-baseline')]:
        history = [dict(TenantId='t',UserId='u',Day=(DAY-dt.timedelta(days=i+1)).isoformat(),Count=5,Complete=history_complete) for i in range(n)]
        current=dict(TenantId='t',UserId='u',Day=DAY.isoformat(),Count=count,Complete=complete)
        future=dict(current,Day=(DAY+dt.timedelta(days=1)).isoformat(),Count=999999,Complete=True)
        add('bulk-'+name, 'bulk-download', {'DailyDownloads':history+[current,future]}, [[expected]], ['Status'])
    return cases


def download():
    cache=ROOT/'cache'
    cache.mkdir(exist_ok=True)
    for item in MANIFEST['datasets']:
        dest=cache/(item['id']+'.xml')
        if not dest.exists() or sha256(dest.read_bytes()) != item['sha256']:
            url=f"https://media.githubusercontent.com/media/splunk/attack_data/{MANIFEST['commit']}/{item['path']}"
            with urllib.request.urlopen(url,timeout=60) as response:
                raw=response.read(2_000_001)
            if len(raw)!=item['bytes'] or sha256(raw)!=item['sha256']:
                raise ValueError('Dataset size/hash mismatch: '+item['id'])
            dest.write_bytes(raw)
        print('Verified pinned recording:',item['id'],item['bytes'],'bytes',flush=True)


def offline_checks():
    def entropy(value):
        values=collections.Counter(value.lower())
        return -sum((n/len(value))*math.log2(n/len(value)) for n in values.values()) if value else 0.0
    checks=[]
    def check(name,condition):
        checks.append(dict(name=name,passed=bool(condition)))
    check('base-rate-arithmetic',abs(90/(10000+90)-0.0089197225)<1e-9)
    check('entropy-short-label-bound',entropy('abcd')==2.0)
    check('structured-distinct-characters-high-entropy',entropy('abcdefghijklmnop')==4.0)
    check('gating-can-lose-true-positives',len({1,2,3}&{1,4})<len({1,2,3}))
    check('hex-normalization',integer('0x100')==256 and integer('256')==256)
    check('ipv4-mapped-normalization',source_ip('::ffff:192.0.2.10')=='192.0.2.10')
    row=dict(TenantId='t',UserId='u',Day=DAY.isoformat(),Count=0,Complete=True)
    for name,rows in [('duplicate-daily-rows-rejected',[row,row]),('rolling-day-bin-rejected',[dict(row,Day=timestamp())])]:
        try:
            validate_rows({'DailyDownloads':rows})
            check(name,False)
        except ValueError:
            check(name,True)
    return checks


def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('--endpoint',help='Local functional-test endpoint, e.g. http://127.0.0.1:18921')
    parser.add_argument('--download',action='store_true')
    parser.add_argument('--public-recordings',action='store_true')
    args=parser.parse_args()
    if args.endpoint:
        endpoint_url=urllib.parse.urlparse(args.endpoint)
        if endpoint_url.scheme!='http' or endpoint_url.hostname not in ('127.0.0.1','localhost'):
            parser.error('Only an explicit localhost emulator endpoint is permitted')
    if args.download:
        download()
    report={'schema_version':1,'generated_at':dt.datetime.now(dt.timezone.utc).isoformat(),
            'scope':'Functional correctness and bounded public-recording replay; not an engine benchmark or production-performance evaluation.',
            'image_digest':IMAGE,'query_sha256':{p.name:sha256(p.read_bytes()) for p in sorted((ROOT/'queries').glob('*.kql'))},
            'implementation_sha256':{name:sha256((ROOT/name).read_bytes()) for name in ('run_validation.py','contracts.json','datasets.json')},
            'offline_checks':offline_checks(),'synthetic_tests':[],'public_recordings':[],
            'engine_status':'not-run','sentinel_ingestion_tested':False,'splunk_execution_tested':False,
            'production_precision':None,'production_recall':None,'errors':[]}
    try:
        if args.endpoint:
            report['engine_version']=request(args.endpoint,'.show version',True)
            report['engine_status']='executed'
            for case in synthetic_cases():
                output=request(args.endpoint,query_text(case['query'],case['tables']))
                projected=[[row.get(field) for field in case['fields']] for row in output]
                passed=projected==case['expected']
                report['synthetic_tests'].append({key:case[key] for key in ('name','query','fields','expected')}|
                    {'actual':projected,'passed':passed})
                print(('PASS ' if passed else 'FAIL ')+case['name'],flush=True)
            if args.public_recordings:
                for item in MANIFEST['datasets']:
                    raw=(ROOT/'cache'/(item['id']+'.xml')).read_bytes()
                    if sha256(raw)!=item['sha256']:
                        raise ValueError('Recording hash changed')
                    tables,records=normalize_xml(raw)
                    output=request(args.endpoint,query_text(item['query'],tables))
                    entry={'id':item['id'],'source_commit':MANIFEST['commit'],'source_path':item['path'],
                           'sha256':item['sha256'],'input_records':len(records),'query':item['query'],
                           'output_rows':len(output),'output':output,'record_manifest':records,
                           'interpretation':'Output is a query observation, not a labeled true-positive count. Unmatched events are not automatically benign.'}
                    report['public_recordings'].append(entry)
                    print(f"REPLAY {item['id']}: {len(records)} input records, {len(output)} output rows",flush=True)
    except Exception as error:
        report['errors'].append(str(error))
        print('ERROR:',error,file=sys.stderr)
    report['functional_passed']=bool(args.endpoint) and not report['errors'] and all(
        x['passed'] for x in report['offline_checks']+report['synthetic_tests']) and len(report['synthetic_tests'])==len(synthetic_cases())
    dest=ROOT/'results'
    dest.mkdir(exist_ok=True)
    filename='functional-results.json' if args.endpoint else 'offline-results.json'
    (dest/filename).write_text(json.dumps(report,indent=2)+'\n')
    if report['errors'] or any(not x['passed'] for x in report['offline_checks']+report['synthetic_tests']):
        return 1
    print('Report:',dest/filename)
    return 0


if __name__=='__main__':
    raise SystemExit(main())
