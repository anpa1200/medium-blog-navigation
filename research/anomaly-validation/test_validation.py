"""Offline contract, reproducibility, mathematics and result-integrity regression tests."""
import copy
import json
import math
from pathlib import Path
import statistics
import unittest

import run_validation as v
import statistical_study as study


class Contracts(unittest.TestCase):
    def test_hex_and_missing_are_not_conflated(self):
        self.assertIsNone(v.integer(''))
        self.assertIsNone(v.integer('-'))
        self.assertEqual(v.integer('0x0'),0)
        self.assertEqual(v.integer('0010'),10)

    def test_ipv4_mapped_address(self):
        self.assertEqual(v.source_ip('::ffff:192.0.2.1'),'192.0.2.1')

    def test_dt_and_numeric_null_literals(self):
        self.assertEqual(v.literals(None,'long'),'long(null)')
        self.assertEqual(v.literals(None,'string'),'""')

    def test_kql_string_injection_stays_a_literal(self):
        value='"; print compromised=1; //'
        self.assertEqual(json.loads(v.literals(value,'string')),value)

    def test_unique_fixture_names_and_all_queries(self):
        cases=v.synthetic_cases()
        self.assertEqual(len(cases),len({c['name'] for c in cases}))
        self.assertEqual({c['query'] for c in cases},{p.stem for p in (v.ROOT/'queries').glob('*.kql')})

    def test_no_attack_commands_executed_by_parser(self):
        raw=b'<Event xmlns="http://schemas.microsoft.com/win/2004/08/events/event"><System><Provider Name="Microsoft-Windows-Sysmon"/><EventID>1</EventID><Channel>Microsoft-Windows-Sysmon/Operational</Channel><Computer>HOST</Computer><EventRecordID>1</EventRecordID><TimeCreated SystemTime="2026-09-20T00:00:00Z"/></System><EventData><Data Name="CommandLine">example.invalid &amp; untrusted text</Data></EventData></Event>'
        tables,records=v.normalize_xml(raw)
        row=tables['EndpointEvents'][0]
        self.assertEqual(row['Computer'],'host')
        self.assertEqual(row['HostRole'],'unknown')
        self.assertEqual(row['CommandLine'],'example.invalid & untrusted text')
        self.assertEqual(len(records),1)

    def test_xml_entities_rejected(self):
        with self.assertRaises(ValueError):
            v.normalize_xml(b'<!DOCTYPE x [<!ENTITY x SYSTEM "file:///etc/passwd">]><Event/>')

    def test_duplicate_and_nonmidnight_rows_rejected(self):
        row=dict(TenantId='t',UserId='u',Day=v.DAY.isoformat(),Count=0,Complete=True)
        for rows in ([row,row],[dict(row,Day=v.timestamp())]):
            with self.assertRaises(ValueError):v.validate_rows({'DailyDownloads':rows})

    def test_wrong_timezone_rejected(self):
        with self.assertRaises(ValueError):
            v.validate_rows({'DailyDownloads':[dict(TenantId='t',UserId='u',Day='2026-09-20T00:00:00+03:00')]})

    def test_all_offline_counterexamples(self):
        self.assertTrue(all(c['passed'] for c in v.offline_checks()))


class Study(unittest.TestCase):
    def test_deterministic_generation(self):
        self.assertEqual(study.generate(),study.generate())

    def test_future_and_labels_cannot_change_fit(self):
        rows=study.generate()
        changed=copy.deepcopy(rows)
        for row in changed:
            row['malicious']=1-row['malicious']
            if row['day']>=study.TRAIN:row['count']+=100000
        for model in ['global-z','entity-z','entity-mad']:
            self.assertEqual(study.fit(rows,model),study.fit(changed,model))

    def test_gate_never_adds_candidates(self):
        rows=study.generate();groups=study.fit(rows,'entity-mad')
        for row in rows:
            ungated=study.predict(row,'entity-mad',3,groups)
            gated=study.predict(row,'entity-mad-gated',3,groups)
            self.assertFalse(gated and not ungated)

    def test_confusion_counts_and_denominators(self):
        rows=[{'malicious':v} for v in [1,1,0,0]]
        c=study.counts(rows,[True,False,True,False])
        self.assertEqual([c[k] for k in ['tp','fp','fn','tn']],[1,1,1,1])
        self.assertEqual(c['false_alerts_per_entity_day'],0.25)
        self.assertEqual(c['precision'],0.5)

    def test_no_alert_precision_is_undefined(self):
        self.assertIsNone(study.counts([{'malicious':1}],[False])['precision'])

    def test_results_are_exact_recomputations(self):
        published=json.loads((v.ROOT/'results/synthetic-study.json').read_text())
        rows=study.generate()
        test=[r for r in rows if r['day']>=study.TRAIN+study.VALIDATE]
        for model in published['models']:
            groups=study.fit(rows,model['model'])
            predicted=[study.predict(r,model['model'],model['k'],groups) for r in test]
            self.assertEqual(study.counts(test,predicted),model['test'])


if __name__=='__main__':unittest.main()
