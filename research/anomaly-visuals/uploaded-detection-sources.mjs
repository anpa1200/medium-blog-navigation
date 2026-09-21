// Reviewed user artwork; retain the complete supplied package unchanged.
// Source notes are data, not instructions. Captions qualify the actual figures.
import assert from 'node:assert/strict';
const base='https://1200km.com/articles/research/anomaly-visuals/uploaded-detection/';
export const detectionDocuments=['README.md','SOURCES_AND_EVIDENCE_NOTES.md','manifest.json','accessible_text.json','synthetic_calculations.json'].map(original=>({original,file:'uploaded-detection/'+original}));
export const detectionSources={
  A:{label:'A · Article context',url:'https://1200km.com/articles/read/2026/2026-04-20-malicious-activity-as-a-statistical-signal-a-detection-engineering-analysis-of-anomaly-bas-90df8b6dea12/'},
  W1:{label:'W1 · Microsoft: Security 4688',url:'https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4688'},
  W2:{label:'W2 · Microsoft: Security 4662',url:'https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4662'},
  W3:{label:'W3 · Microsoft: AD event reference',url:'https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/monitoring-active-directory-for-signs-of-compromise'},
  S1:{label:'S1 · Microsoft: Sysmon events',url:'https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon'},
  E1:{label:'E1 · Microsoft: DeviceProcessEvents',url:'https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-deviceprocessevents-table'},
  N1:{label:'N1 · Zeek DNS reference (pinned 8.2.1)',url:'https://docs.zeek.org/en/v8.2.1/reference/logs/dns.html'},
  N2:{label:'N2 · Zeek TLS reference (8.2.0)',url:'https://docs.zeek.org/en/v8.2.0/reference/logs/ssl.html'},
  N3:{label:'N3 · Cloudflare: JA4',url:'https://blog.cloudflare.com/ja4-signals/'},
  I1:{label:'I1 · Microsoft: Entra risk detections',url:'https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-risks'},
  I2:{label:'I2 · Okta: event catalog',url:'https://developer.okta.com/docs/reference/api/event-types/'},
  C1:{label:'C1 · AWS: CloudTrail data events',url:'https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-data-events-with-cloudtrail.html'},
  C2:{label:'C2 · AWS: GuardDuty IAM findings',url:'https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_finding-types-iam.html'},
  C3:{label:'C3 · AWS: RDS IAM authentication limits',url:'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.html'},
  O1:{label:'O1 · Microsoft: OfficeActivity schema',url:'https://learn.microsoft.com/en-us/azure/azure-monitor/reference/tables/officeactivity'},
  P1:{label:'P1 · NIST SP 800-94',url:'https://csrc.nist.gov/pubs/sp/800/94/final'},
  D1:{label:'D1 · Supplied synthetic calculations',url:base+'synthetic_calculations.json'}
};
export const detectionUploads=[
  {
    id:'source-windows',section:'5.1 Windows Security Event Log',before:'### 5.2 Sysmon',
    original:'individual/5_1_windows_security_event_log.png',title:'Windows events: verify channel and effective audit policy',sourceCodes:['A','W1','W2','W3'],
    caption:'Selected Windows Security events, with System 7045 explicitly separated. Event 4688 command-line capture requires its own policy; 4662 requires Directory Service Access auditing and a relevant SACL. These are collection prerequisites, not evidence that a particular environment is collecting the events.',
    boundary:'A SACL selects auditing; it does not grant permissions. A successful logon or privileged session is not by itself evidence of credential theft.',
    transcript:[
      'Selected Security-channel reference: 4624 is successful logon; 4625 is failed logon; 4648 is a logon attempt using explicit credentials; 4672 records special privileges assigned to a new logon.',
      '4688 records a new process, with separate command-line inclusion policy. 4662 records directory-service object access when the applicable auditing and SACL conditions are met. 4769 concerns service-ticket requests; 4776 concerns credential validation.',
      '4720 records creation of a Windows user. 4728, 4732 and 4756 concern addition to global, local and universal security groups, respectively. These are Windows objects, not arbitrary application accounts.',
      '4697 records service installation and 4698 scheduled-task creation in Security. 1102 records Security-log clearing. System 7045 is a separate Service Control Manager source for service installation.',
      'Verify effective audit policy, host role, event version and forwarding. Keep actor and session context. A cleared log and failed forwarding are different observations; this table is selected guidance, not a complete event inventory.'
    ]
  },
  {
    id:'source-sysmon',section:'5.2 Sysmon',before:'### 5.3 EDR',
    original:'individual/5_2_sysmon.png',title:'Sysmon: event availability depends on configuration',sourceCodes:['A','S1'],
    caption:'Ten selected Sysmon event families, not an exhaustive inventory or guaranteed local collection. Verify the installed version and filters. Empty inferred start-module fields and unresolved call traces do not, by themselves, prove injected code; image-load records do not guarantee manual-mapping coverage.',
    boundary:'A documented event type is not proof that your sensor generates, forwards or retains it. Test the actual configuration before claiming detection coverage.',
    transcript:[
      'Event 1: process creation, including ProcessGuid and command line. Event 3: process-linked TCP/UDP network connections. Events 6 and 7: driver and image loads.',
      'Event 8: CreateRemoteThread, with potentially empty inferred start-module/function fields. Event 10: process access, with access rights and available call trace. Event 11: file creation or overwrite.',
      'Events 12–14: registry object creation/deletion, value setting and renaming. Events 17/18: named-pipe creation/connection. Event 22: DNS queries. Event 25: supported process-image tampering observations.',
      'Record the installed version and configuration hash. Exercise inclusion and exclusion filters; inspect actual network and image-load records rather than assuming availability.',
      'The ten grouped rows are a selection. Correlate process identity, host role and timing; missing metadata, unfamiliar pipes or a single access event are investigation leads, not automatic attack verdicts.'
    ]
  },
  {
    id:'source-edr',section:'5.3 EDR Platforms',before:'### 5.4 Network',
    original:'individual/5_3_edr_platforms.png',title:'EDR: separate event identity from process correlation',sourceCodes:['A','E1'],
    caption:'DeviceProcessEvents is a Microsoft-specific example. Its documented unique-event key is ReportId + DeviceName + Timestamp; the displayed DeviceId + Timestamp pair is context, not a replacement event key. ProcessUniqueId and InitiatingProcessUniqueId identify process instances, not individual event records.',
    boundary:'A table name or vendor alert does not establish complete telemetry or a confirmed intrusion. Missing fields must remain unknown, not silently fabricated.',
    transcript:[
      'Conceptual workflow: sensor observations become hunting records, which support analyst review and testing of competing explanations. This is not a ranking of EDR products.',
      'The image lists DeviceId and Timestamp for context, plus ProcessUniqueId and InitiatingProcessUniqueId for process correlation. They are Microsoft schema examples, not universal field names.',
      'Key clarification: ReportId is a repeating counter. Microsoft documents using it together with DeviceName and Timestamp for unique event identification. Do not deduplicate solely by ReportId, DeviceId plus time, or a process-instance identifier.',
      'Confirm sensor deployment, health, retention and actual populated columns. Scope process-lineage joins to the correct device and time; ordinary process IDs can be reused. Preserve the original source record and distinguish vendor detection from the analyst’s finding.'
    ]
  },
  {
    id:'source-ndr',section:'5.4 Network Detection and Response',before:'### 5.5 Identity',
    original:'individual/5_4_network_detection_response.png',title:'Network visibility depends on the observation point',sourceCodes:['A','N1','N2','N3'],
    caption:'The Zeek sensor receives a TAP/SPAN traffic copy; the drawing does not place it inline. dns.log uses TTLs, not TTL. TLS fields and fingerprints depend on protocol, analyzers and configuration. A JA3/JA4 fingerprint is neither an actor identity nor proof of malware.',
    boundary:'Placement, packet loss and encryption constrain visibility. Connection metadata alone cannot reveal encrypted application payloads or establish estate-wide coverage.',
    transcript:[
      'The monitored path runs from a client or service, through a network link, to a destination. A TAP/SPAN copy feeds a Zeek sensor; traffic need not pass through the sensor itself.',
      'conn.log supplies directional connection metadata; dns.log supplies available queries, answers and TTLs; ssl.log supplies observable TLS metadata. Missing fields must be interpreted against the analyzer and event schema.',
      'Record sensor placement, packet loss, Zeek version, scripts and packages. Certificates, hashes and fingerprints are not guaranteed in every protocol or configuration.',
      'Shared libraries, client changes and imitation limit fingerprint attribution. The supplied notes reference the moving master DNS page; the caption links the verified 8.2.1 DNS reference and 8.2.0 TLS reference instead of claiming one universal schema.'
    ]
  },
  {
    id:'source-iam',section:'5.5 Identity and Access Management Platforms',before:'### 5.6 Cloud',
    original:'individual/5_5_identity_access_management.png',title:'Identity events: inspect the actor, target and outcome',sourceCodes:['A','I1','I2'],
    caption:'The three Okta event names are catalog entries, not attack verdicts. Read outcome and actor/target context before inferring abuse. Entra risk detections combine different signal types; denying an MFA challenge is not automatically a suspicious-activity report or proof of MFA fatigue.',
    boundary:'Approved support, recovery and privilege changes can produce similar records. Validate the tenant, session, configuration and retained events before correlating activity.',
    transcript:[
      'Interpret the actor, action and result, and target together: who performed the action, what succeeded or failed, and whose state changed.',
      'Okta examples: user.mfa.factor.update concerns factor updates; user.session.impersonation.initiate concerns starting an impersonation session; user.account.privilege.grant concerns changes to a user’s administrative privileges.',
      'Retain the literal event type, outcome, reason, actor, target and available session keys. Correlate within the correct tenant, identity and bounded time; inspect approved support and role changes.',
      'Entra detections are not all statistical anomaly models. A denied MFA prompt and an explicit user report are distinct, and a generic authentication failure does not demonstrate an MFA-fatigue attack. Local licensing, collection and retention still need verification.'
    ]
  },
  {
    id:'source-cloud',section:'5.6 Cloud Security Services',before:'### 5.7 DNS',
    original:'individual/5_6_cloud_security_services.png',title:'Cloud evidence: distinguish raw events and provider findings',sourceCodes:['A','C1','C2','C3'],
    caption:'Control-plane events, resource data events and native findings need separate collection checks. AWS documentation still lists GenerateDbAuthToken in GuardDuty guidance while RDS states CloudTrail does not track token generation. This unresolved discrepancy is not permission to assume an exported event exists.',
    boundary:'A native finding is not a raw audit record. No cloud account was exercised here, and no detector dependent on the disputed token-generation event was implemented.',
    transcript:[
      'Three separate evidence streams: configuration and management activity; resource-level access and actions; provider-generated findings. Validate each stream independently.',
      'Scope accounts, regions, resources, categories and delivery. CloudTrail data events require explicit collection choices; a management log is not automatically a full record of data access.',
      'Provider-native analytics may use context absent from exported logs. A local query cannot claim to reproduce that proprietary context without evidence.',
      'Documentation boundary: the GuardDuty IAM finding reference names GenerateDbAuthToken, while the RDS IAM-authentication limitations say CloudTrail does not track token generation. Both statements were located during this review; the implementation does not resolve them by inventing a raw event.'
    ]
  },
  {
    id:'dns-entropy',section:'5.7 DNS Security',before:'### 5.8 SaaS',
    original:'individual/5_7_dns_security.png',title:'DNS entropy measures symbol distribution, not intent',sourceCodes:['A','N1','D1'],
    evidence:'EXACT MATH · SYNTHETIC LABELS · USER-SUPPLIED',
    caption:'The synthetic labels aaaa, abab and abcd have empirical character entropies of 0, 1 and 2 bits per character. These exact calculations match the supplied bars and are not incident measurements or alert thresholds. A structured string can have high empirical entropy.',
    boundary:'For nonempty labels of length n over alphabet A, H ≤ log₂(min(n, |A|)). This bound and the three examples do not establish a useful tunneling detector.',
    transcript:[
      'The plotted quantity is empirical character-frequency entropy: H = −Σ p(c) log₂ p(c), measured in bits per character. All three illustrated labels contain four characters.',
      'aaaa: one symbol with probability 1, giving 0 bits per character. abab: two equally frequent symbols, giving 1. abcd: four equally frequent symbols, giving 2. The last label is plainly structured despite its higher value.',
      'Choose which label or labels to score before analysis. Normalize case, handle internationalized names explicitly, use public-suffix-aware parsing for registrable-domain grouping, and keep length alongside entropy.',
      'Resolver, endpoint and network logs observe different parts of DNS activity. Caching and encrypted DNS can limit particular observation points. Include legitimate encoded-name controls; this is not a SUNBURST-specific entropy range or universal maliciousness cutoff.'
    ]
  },
  {
    id:'source-saas',section:'5.8 SaaS Audit Logs',before:'### 5.9 Detection',
    original:'individual/5_8_saas_audit_logs.png',title:'SaaS audit: events, objects and transferred bytes differ',sourceCodes:['A','O1'],
    evidence:'EXACT ARITHMETIC · SYNTHETIC RECORDS · USER-SUPPLIED',
    caption:'Three synthetic, distinct FileDownloaded audit records refer to object A: three events, one distinct object identifier, and unknown transferred bytes—not zero. This is not a tenant replay. OfficeObjectId is not a byte counter, and object size alone may not equal the bytes actually transferred.',
    boundary:'Deduplicate evidence records separately from counting objects. Quantify bytes only from validated counters or explicitly qualified enrichment, retaining unknown values.',
    transcript:[
      'Illustrative records E1, E2 and E3 each have operation FileDownloaded and object identifier A. The event identifiers are distinct; the object identifier is shared.',
      'The resulting counts are 3 audit events and 1 distinct object. Transferred bytes are unknown. The example does not establish three full transfers, one full transfer, or zero transferred bytes.',
      'Verify MailItemsAccessed, FileDownloaded and FileSyncDownloadedFull against their workload’s auditing and retention. The figure’s O1 schema source is supplemented here with the operation catalog and mailbox guidance.',
      'Keep record identity, object identity and units separate. Entra application-consent and service-principal evidence may complement workload logs. Validate transfer counters or document the limits of size enrichment rather than treating an identifier as a size.'
    ],
    extraSources:[{label:'Supplement · Microsoft: audit operations',url:'https://learn.microsoft.com/en-us/purview/audit-log-activities'},{label:'Supplement · Microsoft: MailItemsAccessed',url:'https://learn.microsoft.com/en-us/purview/audit-log-investigate-accounts'},{label:'Synthetic event-count calculation',url:base+'synthetic_calculations.json'}]
  },
  {
    id:'source-prioritization',section:'5.9 Detection Source Prioritization Matrix',before:'## 6. Credential-Based',
    original:'individual/5_9_detection_source_prioritization_matrix.png',title:'Prioritize sources using measured local value',sourceCodes:['A','P1'],
    evidence:'PROPOSED PLANNING FRAMEWORK · USER-SUPPLIED',
    caption:'Five planning questions, not measured product rankings, fidelity scores or a universal rollout sequence. The matrix summarizes the article’s proposed framework; NIST supports general IDPS planning, not an endorsement or validation of this exact five-row design.',
    boundary:'Pilot a defined use case, measure local costs and outcomes, and assign collection ownership. A numbered planning row is not a calibrated priority score.',
    transcript:[
      'Visibility gap: identify important assets, the threat model and currently unobserved behavior. Collectability: obtain raw samples and verify policy, schema, sensor health and required entitlements.',
      'Operational fit: measure volume, retention needs, privacy requirements and ownership. Analytic value: examine held-out candidates, benign controls, missed cases and analyst workload.',
      'Priority justification: record local benefit and cost without unsupported source-fidelity ratings. The five numbered questions are not a vendor ranking or mandatory deployment order.',
      'Pilot one defined use case on important assets before scaling. Include ordinary workload changes and known misses; measure retained evidence and review effort. Assign an owner and recurring health check while documenting remaining blind spots.'
    ]
  }
].map(f=>({...f,file:'uploaded-detection/'+f.original,evidence:f.evidence||'SOURCE REFERENCE · COLLECTION-DEPENDENT · USER-SUPPLIED',sources:[...f.sourceCodes.filter(c=>c!=='A').map(c=>detectionSources[c]),...(f.extraSources||[]),{label:'Supplied source key and evidence notes',url:base+'SOURCES_AND_EVIDENCE_NOTES.md'}]}));

// Fail closed when support data no longer matches the numbers baked into artwork.
export function validateDetectionCalculations(data,entropy){
  assert.match(data.scope,/synthetic/);
  assert.deepEqual(data.dns.map(r=>r.label),['aaaa','abab','abcd']);
  const expected=[0,1,2];
  for(const [i,r] of data.dns.entries()){
    assert.equal(r.length,r.label.length);
    const counts={};for(const c of r.label)counts[c]=(counts[c]||0)+1;
    assert.deepEqual(r.frequencies,counts);
    assert.equal(r.empirical_entropy_bits_per_character,expected[i]);
    assert.ok(Math.abs(entropy(r.label)-expected[i])<1e-12);
  }
  const s=data.saas;
  assert.deepEqual(s.records,['E1','E2','E3'].map(illustrative_event_id=>({illustrative_event_id,operation:'FileDownloaded',object_id:'A'})));
  assert.equal(s.audit_events,new Set(s.records.map(r=>r.illustrative_event_id)).size);
  assert.equal(s.distinct_objects,new Set(s.records.map(r=>r.object_id)).size);
  assert.equal(s.transferred_bytes,null);assert.equal(s.unknown_is_not_zero,true);
  return {dns:data.dns.map(r=>({label:r.label,value:r.empirical_entropy_bits_per_character})),saas:s};
}
