// Reviewed originals from anomaly_taxonomy_2_11_to_2_16.zip. No pixel changes.
const nist={label:'NIST SP 800-94',url:'https://csrc.nist.gov/pubs/sp/800/94/final'};
export const continuationFamilyUploads=[
  {
    id:'family-data-movement',original:'2_11_data_movement.jpg',file:'uploaded-data-movement.jpg',title:'Data movement anomaly',
    caption:'Synthetic transfer of customer records through an export or sync job to a new storage account. Destination ownership and approval are unresolved; a changed route is an investigation lead, not confirmed exfiltration. Audit events, distinct objects, records and bytes are different measurements.',
    transcript:[
      'Customer records are the defined source. An export or sync job, linked to an actor and session, transfers them to a new storage account whose ownership needs review.',
      'The synthetic service identity uses a destination outside its previous workflow. Check whether that destination is approved for this data and verify who controls it.',
      'Keep audit-event counts, distinct objects, rows or records, and bytes separate. Match source, actor, job and destination; backups, migrations and collaboration can explain the transfer.'
    ],sources:[nist]
  },
  {
    id:'family-protocol-application',original:'2_12_protocol_application_usage.jpg',file:'uploaded-protocol-application.jpg',title:'Protocol / application usage anomaly',
    caption:'Synthetic comparison for the same account, application and HTTPS transport: routine reads change to a first-observed bulk export. The illustrated difference is the application operation, not a changed port or a claim that encrypted flow metadata reveals the action.',
    transcript:[
      'Historical use consists of routine application-data reads. Current use is a bulk export first observed for the account; the application and HTTPS transport are unchanged.',
      'Candidate evidence includes API operations, parser and sensor context, and process and destination information. Encrypted flow metadata alone may not reveal the application action.',
      'Inspect application audit or available parsed fields. Client upgrades, approved jobs and integrations are alternatives; port numbers and entropy alone are not verdicts.'
    ],sources:[nist]
  },
  {
    id:'family-negative-absence',original:'2_13_negative_absence.jpg',file:'uploaded-negative-absence.jpg',title:'Negative / absence anomaly',
    caption:'Synthetic heartbeat schedule: reports at minutes 0, 5 and 10, then none observed at 15, 20 or 25. At minute 28, each missing report is beyond the illustrative two-minute delivery allowance. These assumed timings are not a universal alert threshold or proof of sensor tampering.',
    transcript:[
      'The example expects one heartbeat every five minutes. Reports were received at minutes 0, 5 and 10; reports expected at 15, 20 and 25 are not observed.',
      'Assessment occurs at minute 28 with a two-minute delivery allowance, so the three example deadlines were 17, 22 and 27. An independent host monitor still reports the server online.',
      'Check the expected-asset roster, source and collector health, delivery delays, filters and retention. Missing telemetry is unknown, not evidence of zero activity or automatically a benign state.'
    ],sources:[nist]
  },
  {
    id:'family-state-change',original:'2_14_state_change.jpg',file:'uploaded-state-change.jpg',title:'State-change anomaly',
    caption:'Synthetic change on Repo-07 by Admin-12 at 10:04 UTC: internal-only access changes to allowing external sharing. No approval has yet been matched. Verify effective access separately; enabling sharing does not establish public exposure, data access or an unauthorized change.',
    transcript:[
      'The same repository object, Repo-07, changes from internal users only to external sharing enabled. The diagram names a synthetic actor Admin-12 and event time 10:04 UTC.',
      'Approval has not yet been matched. This is not proof that the change lacked authorization.',
      'Retain old and new values, object identity, actor and time. Check effective exposure and the approved change record; legitimate administration can create the same setting change.'
    ],sources:[nist]
  },
  {
    id:'family-multi-event-correlation',original:'2_15_multi_event_correlation.jpg',file:'uploaded-multi-event-correlation.jpg',title:'Multi-event correlation',
    caption:'Synthetic identity, application and storage records become one investigation candidate only after tenant, account, session or asset, and timing checks support the join. Correlation is a composition pattern, not another anomaly family; repeated alerts from one event are not independent evidence.',
    transcript:[
      'Identity audit reports a new factor registration, application audit a new privileged session, and storage audit an unusual export destination.',
      'Check matching tenant and account, verified session or asset links, and allowed event order and gaps. Preserve unresolved links rather than inventing a chain.',
      'Deduplicate shared evidence and reject ambiguous joins. Measure how added gates change false alerts and missed attacks; do not add uncalibrated scores. The output is an investigation candidate, not a verdict.'
    ],sources:[nist]
  }
];
export const registerUpload={
  id:'incident-register',original:'2_16_incident_register_evidence_boundaries.jpg',file:'uploaded-incident-register.jpg',
  title:'Incident register: evidence boundaries',section:'2.16 Incident register, tags and evidence boundaries',
  before:'| Case / campaign record | Attribution boundary | Crosslinked analytical views |',
  evidence:'ARTICLE SCOPE SNAPSHOT · USER-SUPPLIED',
  caption:'Article-register snapshot reviewed 2026-09-21: 14 operational families plus correlation, 15 navigation tags, 17 distinct case/campaign records and 30 incident-to-topic mappings. These counts match the maintained register; they are not individual breach counts, independent confirmations or detector-performance measurements.',
  boundary:'Reported observations, author-inferred mappings and proposed telemetry have different evidence status. This register is not an anomaly type or a detector benchmark.',
  transcript:[
    'Scope snapshot: 14 operational anomaly families plus one correlation pattern; 15 navigation tags; 17 distinct case or campaign records; 30 incident-to-topic mappings. Reviewed 2026-09-21.',
    'Reported: a named investigator reports an observation; the article has not independently reproduced it. Inferred: the author maps behavior to an analytical view; a topic tag is not attribution or detector validation.',
    'Proposed: suggested telemetry requires validation; a collection plan does not prove that the original victim had that visibility.',
    'Keep each case identifier, investigator and source attached to every mapping. A repeated case is not independent evidence, and a campaign can include several victims. Neither counts nor topic tags establish precision, recall or successful detection.'
  ],
  registerSnapshot:{families:14,correlationPatterns:1,navigationTags:15,cases:17,mappings:30,reviewedAt:'2026-09-21'},
  sources:[{label:'Maintained incident register and source citations',url:'https://1200km.com/articles/research/anomaly-incidents.json'}]
};
export function validateRegisterSnapshot(register){
  const actual={families:register.types.filter(t=>t.id!=='multi-event-correlation').length,correlationPatterns:register.types.filter(t=>t.id==='multi-event-correlation').length,navigationTags:register.types.length,cases:Object.keys(register.cases).length,mappings:register.types.reduce((n,t)=>n+t.examples.length,0),reviewedAt:register.reviewed_at};
  for(const [key,value] of Object.entries(registerUpload.registerSnapshot))if(actual[key]!==value)throw Error(`Uploaded incident-register graphic is stale: ${key}; review the artwork before publishing.`);
}
export const continuationUploads=[...continuationFamilyUploads,registerUpload];
