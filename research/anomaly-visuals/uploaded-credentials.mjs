// Reviewed conceptual guides; original artwork and supplied notes remain unchanged.
import assert from 'node:assert/strict';
const base='https://1200km.com/articles/research/anomaly-visuals/uploaded-credentials/';
const ms='https://learn.microsoft.com/en-us/';
const event=n=>ms+'previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-'+n;
const source=(label,url)=>({label,url});
export const credentialDocuments=['README.md','SOURCES_AND_EVIDENCE_NOTES.md','accessible_text.json','bitmask_checks.json','manifest.json'].map(original=>({original,file:'uploaded-credentials/'+original}));
export const credentialSources={
  A:source('A · Article context','https://1200km.com/articles/read/2026/2026-04-20-malicious-activity-as-a-statistical-signal-a-detection-engineering-analysis-of-anomaly-bas-90df8b6dea12/'),
  K1:source('K1 · Microsoft: Security 4769',event(4769)),
  K2:source('K2 · MITRE: Kerberoasting','https://attack.mitre.org/techniques/T1558/003/'),
  D1:source('D1 · Microsoft: Security 4662',event(4662)),
  D2:source('D2 · MITRE: DCSync','https://attack.mitre.org/techniques/T1003/006/'),
  D3:source('D3 · Microsoft: Get-Changes',ms+'windows/win32/adschema/r-ds-replication-get-changes'),
  D4:source('D4 · Microsoft: Get-Changes-All',ms+'windows/win32/adschema/r-ds-replication-get-changes-all'),
  D5:source('D5 · Microsoft: Get-Changes-In-Filtered-Set',ms+'windows/win32/adschema/r-ds-replication-get-changes-in-filtered-set'),
  W1:source('W1 · Microsoft: Security 4624',event(4624)),
  W2:source('W2 · Microsoft: local logon sessions',ms+'windows/win32/secauthn/lsa-logon-sessions'),
  H1:source('H1 · MITRE: Pass the Hash','https://attack.mitre.org/techniques/T1550/002/'),
  H2:source('H2 · Microsoft: NTLM',ms+'windows/win32/secauthn/microsoft-ntlm'),
  S1:source('S1 · Microsoft: Sysmon ProcessAccess',ms+'sysinternals/downloads/sysmon#event-id-10-processaccess'),
  P1:source('P1 · Microsoft: process-access rights',ms+'windows/win32/procthread/process-security-and-access-rights'),
  L1:source('L1 · MITRE: LSASS Memory','https://attack.mitre.org/techniques/T1003/001/')
};
export const credentialUploads=[
  {
    id:'credential-kerberoast',section:'6.1 Kerberoasting',before:'### 6.2 DCSync',
    original:'individual/6_1_kerberoasting.png',title:'Kerberoasting: service-ticket evidence is not recovery',sourceCodes:['A','K1','K2'],
    caption:'Event 4769 supports investigation of service-ticket requests, not proof of offline password recovery. Ticket-encryption values 0x17, 0x11 and 0x12 denote RC4-HMAC, AES128 and AES256; they are not the supported-encryption-types bitmask. An RC4-only filter misses AES requests. The existing one-record replay still returns zero matches for the service-breadth rule; no new replay was run.',
    boundary:'Breadth and novelty need a workload baseline. Low-volume targeting can evade breadth rules, and a name ending in $ is not a blanket safe exclusion.',
    transcript:[
      'The arrows describe an analyst workflow: observe 4769 on a domain controller; compare request breadth and novelty against role and workload; corroborate source-process activity, authorization and purpose. They are not a mandatory attack sequence.',
      'Preserve requester, source address, target service, result, event version and ticket encryption type. Verify the service identifier actually emitted: native ServiceName describes an account or computer, not necessarily a unique SPN.',
      'For TicketEncryptionType, RC4-HMAC is 0x17; AES128-CTS-HMAC-SHA1-96 is 0x11; AES256-CTS-HMAC-SHA1-96 is 0x12. RC4 and AES do not share the same NTLM-hash key derivation. Do not use these enum values as a supported-types bitmask.',
      'Enable and validate relevant DC auditing. Routine requests are legitimate, sparse targeting may not exceed breadth thresholds, and no universal count threshold is given. The zero-match public replay remains visible in the existing results, not retested by importing artwork.'
    ],
    extraSources:[source('Existing replay results — not rerun','https://1200km.com/articles/research/anomaly-validation/functional-results.json')]
  },
  {
    id:'credential-dcsync',section:'6.2 DCSync',before:'### 6.3 Pass-the-Hash',
    original:'individual/6_2_dcsync.png',title:'DCSync: retain uncertain source attribution',sourceCodes:['A','D1','D2','D3','D4','D5','W1'],
    caption:'The arrows show enrichment, not event chronology. Correlate 4662 SubjectLogonId with a suitable preceding 4624 TargetLogonId on the same DC, with normalized identifiers, consistent identity and bounded time. Event 4662 has no native client-IP field; retain unresolved or ambiguous matches. One replication-right observation does not prove credential extraction.',
    boundary:'A SACL selects auditing; effective permissions govern access. Verify approved principal–source relationships without treating an approved source as uncompromisable.',
    transcript:[
      'Directory-access record 4662 contributes principal, SubjectLogonId, object, rights and AccessMask. A suitable 4624 record contributes TargetLogonId and source address only when available. These are separate source records.',
      'Join on the same DC and normalized logon ID, check identity consistency, preceding bounded event time and identifier reuse. Preserve correlated, unresolved and ambiguous outcomes instead of manufacturing a source address.',
      'Evaluate extended rights with the control-access bit 0x100: Get-Changes = 1131f6aa-9c07-11d1-f79f-00c04fc2dcd2; Get-Changes-All = 1131f6ad-9c07-11d1-f79f-00c04fc2dcd2; Get-Changes-In-Filtered-Set = 89e95b76-444d-4c62-991a-0facbeda640c. All three need not appear in one event.',
      'Configure Directory Service Access auditing and an applicable SACL on the domain object. A SACL is not a permission grant. Audit records are not direct proof of secret extraction. Validate exceptions against current principal/source inventory, scope and time; avoid blanket account-name exclusions.'
    ]
  },
  {
    id:'credential-pth',section:'6.3 Pass-the-Hash',before:'### 6.4 LSASS',
    original:'individual/6_3_pass_the_hash.png',title:'Pass-the-Hash: two hunting views, no single verdict',sourceCodes:['A','H1','H2','W1','W2'],
    caption:'Source-side 4624 type 9 with seclogo and target-side type 3 with NTLM are distinct hunting views, not two required stages or a binary PtH classifier. Type 9 outbound-account fields can differ from the local identity. Logon IDs are host-local, not cross-host join keys; neither view alone establishes hash reuse.',
    boundary:'NTLM uses challenge–response; the stored hash is not transmitted as a password. Validate authorization and collection before assigning intent or interpreting missing events.',
    transcript:[
      'The source-side card shows 4624 type 9, NewCredentials, with LogonProcess seclogo. This pattern can appear with some implementations and with legitimate alternate-credential workflows. It is not required for every PtH implementation.',
      'The target-side card shows 4624 type 3, Network, with AuthenticationPackage NTLM. Ordinary network authentication can produce the same view. The two cards are evidence classes, not a complete implementation inventory.',
      'Correlate outbound identity, source process, destination and authorized administration within bounded time. Type 9 can retain the local identity while specifying different outbound credentials. A local logon identifier is not a global identity or cross-host join key.',
      'Null Subject SID, zero key length or a missing earlier logon does not establish PtH. Verify collection, retention and clock alignment. The NTLM exchange uses a response computed from credential material rather than sending the stored hash as a password.'
    ]
  },
  {
    id:'credential-lsass',section:'6.4 LSASS Credential Dumping (Sysmon Event 10)',before:'## 7. How Attackers',
    original:'individual/6_4_lsass_credential_dumping.png',title:'LSASS: decode access rights, then establish provenance',sourceCodes:['A','S1','P1','L1'],
    caption:'Sysmon Event 10 records process access, not each memory read or successful credential extraction. The displayed masks decompose exactly: 0x1010 = 0x1000 | 0x0010; 0x1410 = 0x1000 | 0x0400 | 0x0010. Arithmetic is independently checked, but granted rights do not prove they were exercised. Signer, hash and ancestry may require separate telemetry enrichment.',
    boundary:'These masks are examples, not exhaustive coverage. An unresolved call trace or familiar signer is not a verdict; validate provenance, collection and scoped exceptions.',
    transcript:[
      'A source process opens lsass.exe with GrantedAccess. Preserve the source and target process GUIDs and images, access rights and call trace. The arrow depicts an access relationship, not confirmed memory dumping.',
      'PROCESS_VM_READ = 0x0010; PROCESS_QUERY_INFORMATION = 0x0400; PROCESS_QUERY_LIMITED_INFORMATION = 0x1000. Bitwise OR gives 0x1010 from limited query plus VM read, and 0x1410 when query information is also set.',
      'Read-capable access is not proof of memory reads or recovered credentials. Other access paths and masks exist. Validate Sysmon filtering and sensor health; join process-creation context, signer/hash, ancestry and available memory evidence rather than assuming every enrichment field is native to Event 10.',
      'Security and diagnostic tools can access LSASS legitimately. Missing call-trace resolution does not establish injection. A familiar filename, signature or directory is not a universal safe exclusion; review exceptions with an owner, scope and expiry.'
    ],
    extraSources:[source('Supplied bitmask examples — independently recalculated',base+'bitmask_checks.json')]
  }
].map(f=>({...f,file:'uploaded-credentials/'+f.original,evidence:'CONCEPTUAL DETECTION GUIDE · USER-SUPPLIED',sources:[...f.sourceCodes.filter(c=>c!=='A').map(c=>credentialSources[c]),...(f.extraSources||[]),source('Supplied source key and evidence notes',base+'SOURCES_AND_EVIDENCE_NOTES.md')]}));

// The supplied validated flag is not trusted as proof; recompute exact artwork values.
export function validateCredentialMasks(data){
  assert.equal(data.PROCESS_VM_READ,'0x0010');
  assert.equal(data.PROCESS_QUERY_INFORMATION,'0x0400');
  assert.equal(data.PROCESS_QUERY_LIMITED_INFORMATION,'0x1000');
  assert.deepEqual(data['0x1010_components'],['0x1000','0x0010']);
  assert.deepEqual(data['0x1410_components'],['0x1000','0x0400','0x0010']);
  return ['0x1010','0x1410'].map(mask=>{
    const components=data[mask+'_components'],value=components.reduce((n,c)=>n|Number(c),0);
    assert.equal(value,Number(mask));
    return {mask,components,decimal:value,meaning:'Access rights only; not observed memory reads or credential extraction.'};
  });
}
