// Reviewed user-supplied artwork. Import original bytes without redrawing images.
// Transcripts describe the actual artwork; examples are not incident measurements.
import {continuationFamilyUploads,registerUpload} from './uploaded-taxonomy-continuation.mjs';
import {incidentUploads} from './uploaded-incidents.mjs';
import {detectionUploads} from './uploaded-detection-sources.mjs';
import {credentialUploads} from './uploaded-credentials.mjs';
export {credentialUploads,credentialDocuments} from './uploaded-credentials.mjs';
export {detectionUploads,detectionDocuments} from './uploaded-detection-sources.mjs';
export {incidentUploads,incidentSourceNotes} from './uploaded-incidents.mjs';
export {continuationUploads,registerUpload,validateRegisterSnapshot} from './uploaded-taxonomy-continuation.mjs';
const survey={label:'Chandola et al. (2009)',url:'https://arindam.cs.illinois.edu/papers/09/anomaly.pdf'};
const nist={label:'NIST SP 800-94',url:'https://csrc.nist.gov/pubs/sp/800/94/final'};
export const definitionUploads=[
  {
    id:'statistical-forms',title:'Point anomaly',section:'1.1 Point anomaly',
    before:'#### Contextual anomaly {#anomaly-form-contextual}',
    file:'uploaded-point-anomaly.png',original:'ChatGPT Image Sep 21, 2026, 05_05_04 PM (1).png',
    caption:'Synthetic point-anomaly illustration: one value is separated from a stated comparison distribution. The observation axis is an illustrative index, not a second security feature; the dots are not a measured dataset.',
    boundary:'Distance from a reference distribution does not establish malicious intent. The plot is schematic, not a numerical detection threshold.',
    transcript:[
      'A single instance differs markedly from the reference data. The schematic shows a blue cluster and one higher red value.',
      'Synthetic example: a value lies outside a fixed, defined univariate distribution. If host history or role determines the comparison, the interpretation can also be contextual.',
      'Key idea: one point can stand out by itself. Neither the colored points nor the axis values are observations from an incident.'
    ],sources:[survey]
  },
  {
    id:'definition-contextual',title:'Contextual anomaly',section:'1.1 Contextual anomaly',
    before:'#### Collective anomaly {#anomaly-form-collective}',
    file:'uploaded-contextual-anomaly.png',original:'ChatGPT Image Sep 21, 2026, 05_05_04 PM (2).png',
    caption:'Synthetic comparison of the same ntdsutil IFM operation inside and outside approved maintenance. IFM means Install From Media: creating AD DS installation media, not a complete domain-controller recovery backup. The clock positions are illustrative.',
    boundary:'An unscheduled operation is a lead, not proof of credential theft. Validate the host role, account, approval and actual command purpose.',
    transcript:[
      'The same action can have different significance in different contexts. The diagram labels an example domain controller DC-01.',
      'A scheduled ntdsutil.exe IFM operation appears inside an approved maintenance window; a second appears outside it. These are synthetic times, not a real incident timeline.',
      'The image uses the shorthand IFM backup operation. More precisely, IFM creates installation media for adding a domain controller; it does not replace a full recovery backup.',
      'Host role, principal and purpose matter. The executable name alone is not a verdict.'
    ],sources:[survey,{label:'Microsoft: IFM command',url:'https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2012-r2-and-2012/cc732530(v=ws.11)'}]
  },
  {
    id:'definition-collective',title:'Collective anomaly',section:'1.1 Collective anomaly',
    before:'**Malicious-behaviour correlation.**',
    file:'uploaded-collective-anomaly.png',original:'ChatGPT Image Sep 21, 2026, 05_05_04 PM (3).png',
    caption:'Synthetic collective-anomaly example: authentication, a permission change, data access and export form an unexpected workflow under the stated baseline. The individual “Normal” labels are assumptions for this example, not a universal classification of those actions.',
    boundary:'Events need not be individually benign for a collective anomaly. Ordering is one possible relationship; a verified baseline and reliable entity correlation are still required.',
    transcript:[
      'Related events can be anomalous together even when individual events are not anomalous on their own.',
      'The illustrated sequence is: login from a known device; expanded access rights; sensitive-file access; export to an external location. The graphic assumes each event can occur legitimately in the chosen environment.',
      'The combined workflow differs from that environment’s expected pattern. Investigate benign alternatives and verify event and entity links.',
      'The emphasis on pattern and order applies to this example. It does not mean a single event can never be decisive.'
    ],sources:[survey]
  },
  {
    id:'definition-correlation',title:'Malicious-behaviour correlation',section:'1.1 Malicious-behaviour correlation',
    before:'### 1.2 The Central Tension',
    file:'uploaded-malicious-behaviour-correlation.png',original:'ChatGPT Image Sep 21, 2026, 05_05_05 PM (4).png',
    caption:'Conceptual investigation workflow: combine an anomaly with asset context, identity state, companion telemetry and adversary tradecraft. Correlation supports a testable investigative hypothesis; it does not automatically produce a correct detection or attribution.',
    boundary:'Correlation is an analytical step, not a fourth statistical anomaly form. Independent corroboration and analyst validation remain necessary.',
    transcript:[
      'Asset context includes the device, system, network location and criticality. Identity state includes the account, privileges and recent activity.',
      'Companion telemetry includes logs, network activity, endpoint observations and cloud records. Adversary tradecraft provides candidate techniques and threat-intelligence context.',
      'These inputs help interpret an observed anomaly and form an investigative hypothesis. An anomaly is evidence, not a verdict.',
      'Operational value must still be tested. Adding a correlation condition can remove true alerts as well as false alerts.'
    ],sources:[nist]
  }
];
const families=[
  ['volumetric','2_1_volumetric.png','Volumetric anomaly',
    'Equal 30-minute windows for the same user and workload contain 90, 120, 110, 100, 130 and 650 download audit events. These are synthetic counts, not the Snowflake or DDoS incident measurements below.',
    ['W1: 90; W2: 120; W3: 110; W4: 100; W5: 130; W6: 650 download audit events. Every window is 30 minutes.', 'Compare like units and workloads. Audit events are not necessarily unique files; backups and reporting can explain spikes.', 'Measure how much, then establish why.']],
  ['frequency-rate','2_2_frequency_rate.png','Frequency / rate anomaly',
    'The same synthetic API client produces 3, 2, 3, 4, 3 and 24 requests in six equal one-minute intervals. The time denominator is explicit; the example does not prescribe an alert threshold.',
    ['M1: 3; M2: 2; M3: 3; M4: 4; M5: 3; M6: 24 requests per observed minute.', 'Deduplicate events and verify observation time. Retries, outages and load tests can create benign bursts.', 'Count occurrences and state the time denominator.']],
  ['temporal','2_3_temporal.png','Temporal anomaly',
    'A synthetic weekday-only account acts at 03:00 on Sunday, outside its stated schedule. The heatmap is a schedule illustration, not measured event intensity or a real incident timeline.',
    ['The weekday work-context cells contrast with a highlighted Sunday 03:00 cell, in example local time.', 'Check time zone, shifts, on-call duties and approved changes. Event time and ingestion time are different.', 'Unusual timing is a question, not an explanation.']],
  ['peer-group','2_4_peer_group.png','Peer-group anomaly',
    'Four synthetic employees have comparable finance roles. A–C access the finance application and CRM; D also accesses a code repository. That deviation depends on how the peer group was defined.',
    ['Employees A, B and C: finance application and CRM. Employee D: the same two resources plus a code repository.', 'Verify duties and cohort membership. A temporary project or legitimate role change may explain the difference.', 'Compare like with like and validate the cohort first.']],
  ['sequence','2_5_sequence.png','Sequence anomaly',
    'A synthetic session contains sign-in at 09:00, a permission grant at 09:03 and sensitive access at 09:05, without a matching approval yet observed. Missing approval telemetry is not proof that approval never occurred.',
    ['Expected workflow: approved request, permission grant, sensitive access.', 'Illustrated session for one verified identity: sign-in 09:00, permission grant 09:03, sensitive access 09:05. Approval has not yet been observed.', 'Check identity, session, ordering, allowed gaps and record completeness before inferring an unauthorized sequence.']],
  ['graph-relationship','2_6_graph_relationship.png','Graph / relationship anomaly',
    'The synthetic graph adds a permission edge from a service identity to an administrative resource. Its established Application A relationship is also a permission edge; neither arrow proves actual resource use.',
    ['One service identity has an established permission relationship with Application A and a newly observed grant to an administrative resource.', 'Edges point from the identity to the resource and represent permission, not network traffic or successful access.', 'Compare against a past-only graph. Migrations and new projects can explain new edges; verify use separately.']],
  ['geographic-asn','2_7_geographic_asn.png','Geographic / ASN anomaly',
    'The same synthetic account reaches an identity provider through an unfamiliar provider ASN rather than its usual corporate egress. The drawing shows alternative paths, not proof of two simultaneous sessions or physical travel.',
    ['The account and device can appear through corporate egress or a new provider network before reaching the identity provider.', 'ASN means Autonomous System Number. Observed source-IP location is uncertain and need not be the person’s location.', 'Correlate device and session evidence; VPNs, mobile routing, travel and privacy relays can change the apparent exit.']],
  ['identity-access','2_8_identity_access.png','Identity / access anomaly',
    'A synthetic account registers a new MFA factor, receives an elevated role and accesses a protected application. The sequence needs an authorization and recovery-context check; a recorded change alone is not a compromise finding.',
    ['Recorded changes for one account: new MFA factor, elevated role, protected-application access.', 'Check whether an approved recovery or role change explains the sequence. Verify the support ticket, actor and device.', 'Recovery and delegated administration can produce similar records.']],
  ['rare-process-service','2_9_rare_process_service.png','Rare process / service anomaly',
    'A utility appears on 1 of 20 monitored database hosts over seven days: 5% observed host prevalence. That is not a 5% attack probability, detector precision or enterprise-wide prevalence estimate.',
    ['Defined example population: 20 monitored database hosts over seven days. The utility is observed on host 20 only: 1/20 = 5%.', 'Check hash, signer, owner and deployment history. Newly enabled logging can make familiar software look new.', 'Rare means uncommon in the observations, not malicious.']],
  ['parent-child','2_10_parent_child_execution.png','Parent–child execution anomaly',
    'In the synthetic w3wp.exe → cmd.exe → powershell.exe chain, cmd.exe is the web worker’s direct child; PowerShell is its later descendant and cmd.exe’s direct child. This is not a reconstruction of the Exchange incidents below.',
    ['Direct relationship 1: w3wp.exe starts cmd.exe. Direct relationship 2: cmd.exe starts powershell.exe.', 'Relative to w3wp.exe, PowerShell is a descendant, not a direct child.', 'Use stable process identifiers, host role and command lines. Verify legitimate automation; in-process activity may create no child process.']]
];
export const familyUploads=[...families.map(([id,original,title,caption,transcript])=>({id:`family-${id}`,original,file:`uploaded-${id}.png`,title,caption,transcript,sources:[nist]})),...continuationFamilyUploads];
export const uploadedFigures=[...definitionUploads,...familyUploads,registerUpload,...incidentUploads,...detectionUploads,...credentialUploads];
