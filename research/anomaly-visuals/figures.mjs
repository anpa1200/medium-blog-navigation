// Authored visual specifications. Numerical figures are computed from evidence,
// never transcribed from a screenshot. No production-accuracy claim is implied.
import {readFileSync} from 'node:fs';
import {definitionUploads,familyUploads,registerUpload,validateRegisterSnapshot,incidentUploads} from './uploaded-figures.mjs';
import {detectionUploads,validateDetectionCalculations} from './uploaded-detection-sources.mjs';
import {credentialUploads,validateCredentialMasks} from './uploaded-credentials.mjs';
const root = new URL('../../', import.meta.url);
const json = p => JSON.parse(readFileSync(new URL(p, root)));
const incidents = json('research/anomaly-incidents.json');
validateRegisterSnapshot(incidents);
const study = json('research/anomaly-validation/results/synthetic-study.json');
const functional = json('research/anomaly-validation/results/functional-results.json');
const source = (label, url) => ({label, url});
const primary = id => source(incidents.sources[id].publisher, incidents.sources[id].url);
const nist = source('NIST SP 800-94', 'https://csrc.nist.gov/pubs/sp/800/94/final');
const sysmon = source('Microsoft Sysmon', 'https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon');
const event = n => source(`Microsoft event ${n}`, `https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-${n}`);
const artifact = name => source(name, `https://1200km.com/articles/research/anomaly-validation/${name}`);
const panel = (label, text, tone = 'blue') => ({label, text, tone});
const step = (label, text = '') => ({label, text});
const figures = [];
function add(id, title, section, before, kind, spec) {
  figures.push({id, title, section, before, kind, evidence: 'CONCEPTUAL MODEL', ...spec});
}

add('research-map', 'From anomaly to investigation', 'Introduction', ':::info Article Metadata', 'flow', {
  subtitle: 'Malicious Activity as a Statistical Signal',
  steps: [step('Observe', 'Collect an event or change.'), step('Compare', 'Use a defined baseline.'), step('Corroborate', 'Check entity and context.'), step('Investigate', 'Test competing explanations.')],
  panels: [panel('Scope', '14 operational families + multi-event correlation. These are overlapping analytical views.'), panel('Evidence boundary', 'Incident reports, functional tests and synthetic statistics answer different questions.', 'amber')],
  boundary: 'An anomaly is a lead, not an intrusion verdict or actor attribution.',
  sources: [nist], caption: 'A detection-engineering workflow, not a chronological attack lifecycle. Validation and analyst judgment are required before operational action.'
});
for(const f of definitionUploads)add(f.id,f.title,f.section,f.before,'uploaded',{
  ...f,upload:f.file,evidence:f.id==='definition-correlation'?'CONCEPTUAL WORKFLOW · USER-SUPPLIED':'SYNTHETIC ILLUSTRATION · USER-SUPPLIED'
});
const base = {benign: 1000000, malicious: 100, fpr: 0.01, recall: 0.9};
base.fp = base.benign * base.fpr; base.tp = base.malicious * base.recall;
base.tn = base.benign - base.fp; base.fn = base.malicious - base.tp;
base.precision = base.tp / (base.tp + base.fp);
add('base-rate', 'Rare events change alert precision', '1.2 The Central Tension', '## 2. Taxonomy', 'base-rate', {
  evidence: 'ILLUSTRATIVE ARITHMETIC', data: base,
  boundary: 'These assumed counts explain base rates; they are not measured detector results.',
  sources: [nist], caption: 'Precision uses all alerts as its denominator; false-positive rate uses all benign events. A 1% false-positive rate does not mean 99% alert precision.'
});

const familySpecs = [
  ['volumetric', 'How much moved?', 'volume', ['Volume in aligned windows', 'Same role / same units'],
    'Count bytes, objects, rows or events; do not substitute one for another.', 'Compare like workloads over equal observation windows.', 'Backups, reporting and recovery can produce legitimate spikes.'],
  ['frequency-rate', 'How often did it happen?', 'rate', ['Fixed-duration windows', 'Events / elapsed time'],
    'Count occurrences and state the time denominator.', 'Evaluate rate with source and target diversity.', 'Retries, polling and releases can create bursts; sparse attacks may not.'],
  ['temporal', 'Does the timing fit the task?', 'time', ['Usual work context', 'Activity to investigate'],
    'Preserve event time, time zone, shift and schedule.', 'Compare equivalent calendar periods, not just clock hours.', 'On-call work, travel and daylight-saving changes can explain timing.'],
  ['peer-group', 'Compare the right peers', 'peers', ['Role-matched cohort', 'Entity under review'],
    'Define role and cohort membership before scoring.', 'Compare like entities; reassess after a legitimate role change.', 'Small cohorts and incomplete inventory can manufacture an outlier.'],
  ['sequence', 'Order adds context', 'sequence', ['Authentication', 'Permission change', 'Sensitive access'],
    'Join a defined entity or session across ordered events.', 'Declare permitted gaps, missing steps and late arrival.', 'This illustrative workflow can also be legitimate; timing alone is not causality.'],
  ['graph-relationship', 'A new edge is a question', 'graph', ['Identity', 'Resource', 'New resource'],
    'Define the direction and meaning of each edge.', 'Compare with a past-only relationship graph.', 'Projects and migrations create legitimate edges; novelty is not attribution.'],
  ['geographic-asn', 'Network location is uncertain', 'network', ['Identity + device', 'VPN / proxy / mobile egress', 'Observed IP / ASN'],
    'Retain the source IP and enrichment version.', 'Correlate device, session and account history.', 'IP geolocation is not a measurement of the person’s physical location.'],
  ['identity-access', 'Review identity and access changes', 'sequence', ['Identity or factor', 'Grant / session', 'Workload action'],
    'Collect factor lifecycle, consent and workload audit records.', 'Separate a recorded change from an inferred anomaly.', 'Recovery and delegated administration can be authorized.'],
  ['rare-process-service', 'Rare does not mean malicious', 'peers', ['Observed software population', 'Low-prevalence process'],
    'Measure prevalence within a role and observation window.', 'Check signer, hash, owner and collection coverage.', 'New software, diagnostics and newly enabled telemetry can all look rare.'],
  ['parent-child', 'Direct child is not any descendant', 'lineage', ['Web worker', 'Shell child', 'Later descendant'],
    'Use stable process identifiers and parent identifiers.', 'Declare direct-child matching or an ancestry search.', 'PID reuse, missing ancestry and in-process execution limit coverage.'],
  ['data-movement', 'Track source, destination and units', 'sequence', ['Data source', 'Export / copy / sync', 'Destination account'],
    'Keep audit events, unique objects, records and bytes distinct.', 'Review destination ownership and access authorization.', 'Approved migration and backup can resemble exfiltration.'],
  ['protocol-application', 'Inspect usage, not just the port', 'sequence', ['Observed protocol', 'Defined feature', 'Entity / application context'],
    'Record parser version, sensor location and feature definition.', 'Compare the entity’s application and destination history.', 'New clients and legitimate encoded identifiers can shift a baseline.'],
  ['negative-absence', 'No event is not the same as no activity', 'absence', ['Expected heartbeat', 'Missing observation', 'Independent health check'],
    'Define when a source is expected to report.', 'Check delivery, asset state, filters and retention separately.', 'An outage or parser failure can look like deliberate impairment.'],
  ['state-change', 'Compare before and after', 'state', ['Prior state', 'Recorded change', 'New effective state'],
    'Retain actor, object, timestamp and old/new values.', 'Check effective permissions and approved change records.', 'A first-seen configuration change can be legitimate administration.'],
  ['multi-event-correlation', 'Join evidence without inventing a chain', 'correlation', ['Identity event', 'Process event', 'Application event'],
    'Join tenant, account, host or session with bounded event time.', 'Retain missing or ambiguous links; deduplicate shared evidence.', 'Adding a gate can remove true positives as well as false positives.']
];
for (const [id, title, motif, labels, measure, compare, limit] of familySpecs) {
  const t = incidents.types.find(t => t.id === id);
  add(`family-${id}`, title, `2.${incidents.types.indexOf(t) + 1} ${t.label}`, `<!-- anomaly-evidence:${id}:start -->`, 'family', {
    motif, labels, subtitle: t.label, evidence: 'SCHEMATIC · NOT OBSERVED DATA',
    panels: [panel('Measure', measure), panel('Compare', compare)], boundary: limit,
    sources: [nist], caption: `${t.label}: ${id === 'multi-event-correlation' ? 'a composition pattern, not an additional independent anomaly family' : 'one operational feature family, not a mutually exclusive statistical class'}. The incident cards below provide separate source-reported examples; this schematic does not reconstruct those incidents.`
  });
}
for(const replacement of familyUploads){
  const f=figures.find(f=>f.id===replacement.id);
  Object.assign(f,replacement,{kind:'uploaded',upload:replacement.file,evidence:'SYNTHETIC ILLUSTRATION · USER-SUPPLIED'});
  delete f.panels;delete f.labels;delete f.motif;
}
add(registerUpload.id,registerUpload.title,registerUpload.section,registerUpload.before,'uploaded',{
  ...registerUpload,upload:registerUpload.file
});

add('attack-mapping', 'Map behavior, then ask what is measurable', '3. ATT&CK mapping', '## 4. Evidence Register', 'flow', {
  steps: [step('Observed behavior', 'Keep the source and its limits.'), step('ATT&CK mapping', 'Explain why the behavior fits.'), step('Candidate feature', 'Name fields, units and context.')],
  panels: [panel('ATT&CK v19.2 context', 'The v19 split created Stealth and Defense Impairment. Tactics are not a required time sequence.'), panel('Do not infer', 'An anomaly tag is neither a technique verdict, a group identity nor measured detection coverage.', 'amber')],
  boundary: 'These are analytical relationships, not a guaranteed attack progression.',
  sources: [source('MITRE v19 release notes', 'https://attack.mitre.org/resources/updates/updates-april-2026/'), source('MITRE v19.2 release notes', 'https://attack.mitre.org/resources/updates/updates-august-2026/')],
  caption: 'The article’s tactic matrix is a set of proposed observation opportunities. It is not a ranking of detector performance.'
});

function campaign(id, title, section, before, reported, hypothesis, limit, sources) {
  add(id, title, section, before, 'evidence', {
    evidence: 'SOURCE-REPORTED + AUTHOR INFERENCE',
    panels: [panel('Source-reported', reported, 'teal'), panel('Detection hypothesis', hypothesis, 'blue')],
    boundary: limit, sources,
    caption: 'The solid evidence panel summarizes cited reporting; the dashed hypothesis panel is author inference. No victim-telemetry replay or validation of the author’s proposed detector is implied.'
  });
}
campaign('case-sunburst', 'SUNBURST: observation is not an entropy score', '4.1 SUNBURST', '### 4.2 HAFNIUM',
  'A trojanized SolarWinds component used delayed activation and encoded information in DNS names.',
  'Correlate DNS-label structure, destination novelty and the originating process.',
  'No measured victim entropy range or universal DNS cutoff is established here.', [primary('sunburst')]);
campaign('case-exchange', 'Exchange: keep campaign evidence separate', '4.2 HAFNIUM / Exchange', '### 4.3 Conti',
  'Microsoft described Exchange exploitation and webshell deployment. Broader post-exploitation reporting includes multiple actors.',
  'Join unusual web requests, ASPX writes and shell ancestry with the server’s role.',
  'Do not assign every post-exploitation observation to HAFNIUM. Standard IIS logs do not expose arbitrary request bodies.', [source('Microsoft HAFNIUM investigation', 'https://www.microsoft.com/en-us/security/blog/2021/03/02/hafnium-targeting-exchange-servers/'), primary('exchange')]);
campaign('case-conti', 'BazarCall to Conti: one intrusion account', '4.3 Conti', '### 4.4 APT34',
  'The selected investigation describes BazarCall, Trickbot, Cobalt Strike and Conti in one intrusion.',
  'Correlate enumeration, remote administration, share access and security changes by host and identity.',
  'This is not every affiliate’s timeline. Administrative tools and backup changes can be legitimate.', [primary('conti')]);
campaign('case-oilrig', 'OilRig-associated RDAT: variants matter', '4.4 OilRig', '### 4.5 MOVEit',
  'Unit 42 described RDAT communication mechanisms, including an email/steganography variant.',
  'Inspect protocol structure, timing, destinations and endpoint context for the specific sample.',
  'Do not collapse every variant into DNS tunneling or treat a TXT:A ratio as a verdict.', [primary('rdat')]);
campaign('case-moveit', 'MOVEit: application account, not Windows user', '4.5 MOVEit', '### 4.6 Midnight',
  'LEMURLOOT interacted with the MOVEit database and created a MOVEit application account.',
  'Correlate webshell access, application sessions, database changes and exports.',
  'Windows Security 4720 does not describe this SQL-backed application-account creation.', [primary('moveit')]);
campaign('case-midnight', 'Midnight Blizzard: preserve the actual permission', '4.6 Midnight Blizzard', '### 4.7 Scattered',
  'Microsoft reported password spraying, residential proxies and Exchange full_access_as_app permission abuse.',
  'Join account failures, application consent and ownership, credentials and EWS activity.',
  'Do not substitute generic Graph mail scopes. Missing history is a cold start, not evidence of innocence.', [primary('midnight')]);
campaign('case-unc3944', 'UNC3944: look across identity and SaaS', '4.7 UNC3944', '### 4.8 Storm',
  'Mandiant described help-desk social engineering, identity abuse and SaaS data theft using legitimate integration tools.',
  'Join factor changes to sessions and sensitive application actions with real tenant/account keys.',
  'A transfer can bypass endpoint sensors without leaving every provider or application blind.', [primary('unc3944')]);
campaign('case-storm', 'Storm-0558: customer-side detection did work', '4.8 Storm-0558', '### 4.9 Volt',
  'An acquired signing key was used to forge tokens. The CSRB describes State Department discovery using Big Yellow Taxi and MailItemsAccessed.',
  'Use workload audit data and identity context; evaluate any proposed local analytic separately.',
  'The private rule and performance denominator are not published here. Storm-1283 OAuth cryptomining is a separate campaign.', [source('CSRB investigation', 'https://www.cisa.gov/sites/default/files/2024-03/CSRB%20Review%20of%20the%20Summer%202023%20MEO%20Intrusion%20Final_508c.pdf'), source('Microsoft Storm-0558 analysis', incidents.sources.storm0558.url), source('Microsoft OAuth campaigns', incidents.sources.oauth.url)]);
campaign('case-volt', 'Volt Typhoon: the execution host matters', '4.9 Volt Typhoon', '### 4.10 APT41',
  'Microsoft described ntdsutil IFM credential extraction against domain controllers, with living-off-the-land activity.',
  'Review IFM creation on the DC, its principal, approved backup context and subsequent data movement.',
  'A non-DC-only filter misses this execution context. A remote initiation host is not necessarily the execution host.', [source('Microsoft Volt Typhoon investigation', 'https://www.microsoft.com/en-us/security/blog/2023/05/24/volt-typhoon-targets-us-critical-infrastructure-with-living-off-the-land-techniques/')]);
campaign('case-apt41', 'APT41: two accounts, not one invented chain', '4.10 APT41', '### 4.11 CISA',
  '2019: MESSAGETAP was an ELF data miner on Linux SMS servers. 2024: SQLULDR2 exports and PINEGROVE transfers appear in a separate investigation.',
  'Check process provenance and capture outputs for the first case; database exports and storage destinations for the second.',
  'Loading libpcap or using cloud storage is not proof of theft. These are separate reports, not sequential stages.', [primary('messagetap'), source('Mandiant APT41 investigation', 'https://cloud.google.com/blog/topics/threat-intelligence/apt41-arisen-from-dust')]);
campaign('case-impacket', 'Impacket is a toolkit, not an attribution', '4.11 CISA AA22-277A', '### 4.12 Lazarus',
  'CISA AA22-277A reports Impacket and data theft without assigning a named actor.',
  'Correlate remote logons, process ancestry and mode-specific evidence.',
  'secretsdump is not synonymous with DCSync. Ordinary wmiexec is not a permanent WMI subscription.', [source('CISA AA22-277A', 'https://www.cisa.gov/news-events/cybersecurity-advisories/aa22-277a')]);
campaign('case-3cx', '3CX: a signature is not a benign verdict', '4.12 3CX', '## 5. Detection',
  'SentinelOne reported behavioral detections before public disclosure. GitHub-hosted icons carried encoded C2 information in the Windows chain.',
  'Investigate new destinations and later execution associated with a normally trusted application.',
  'The icons were not described as executable payloads. Vendor-reported detection is not an independent EDR benchmark.', [source('SentinelOne 3CX investigation', 'https://www.sentinelone.com/blog/smoothoperator-ongoing-campaign-trojanizes-3cx-software-in-software-supply-chain-attack/')]);

for(const replacement of incidentUploads){
  const f=figures.find(f=>f.id===replacement.id);
  if(!f||!f.section.startsWith('4.'))throw Error('Missing incident placement: '+replacement.id);
  Object.assign(f,replacement,{kind:'uploaded',upload:replacement.file,evidence:'SOURCE-REPORTED + AUTHOR INFERENCE · USER-SUPPLIED'});
  delete f.panels;
}

add('telemetry-contract', 'A field name is not a collection guarantee', '5. Telemetry contracts', '### 5.1 Windows', 'flow', {
  steps: [step('Source', 'Provider, channel, event version.'), step('Collection', 'Policy, filters, delivery health.'), step('Normalization', 'Parser, units, keys, clock.'), step('Analytic', 'Tested fields and explicit gaps.')],
  panels: [panel('Distinct pipelines', 'Security 4688 and Sysmon 1 are separate process-creation sources. Validate each adapter.'), panel('Missing observations', 'No event can mean no activity, disabled auditing, filtering, delay or failed collection.', 'amber')],
  boundary: 'Validate raw records before treating a normalized table as detection coverage.',
  sources: [event(4688), sysmon, artifact('contracts.json')], caption: 'A telemetry contract connects source meaning to query assumptions. This diagram does not imply that a SIEM enables collection automatically.'
});
const entropy = label => {
  const counts = new Map(); for (const c of label) counts.set(c, (counts.get(c) || 0) + 1);
  return -[...counts.values()].reduce((sum,n) => sum + n / label.length * Math.log2(n / label.length), 0);
};
const detectionData=validateDetectionCalculations(json('static/research/anomaly-visuals/uploaded-detection/synthetic_calculations.json'),entropy);
for(const f of detectionUploads)add(f.id,f.title,f.section,f.before,'uploaded',{
  ...f,upload:f.file,
  ...(f.id==='dns-entropy'?{data:detectionData.dns}:f.id==='source-saas'?{data:detectionData.saas}:{})
});

const credentialMasks=validateCredentialMasks(json('static/research/anomaly-visuals/uploaded-credentials/bitmask_checks.json'));
for(const f of credentialUploads)add(f.id,f.title,f.section,f.before,'uploaded',{
  ...f,upload:f.file,...(f.id==='credential-lsass'?{data:credentialMasks}:{})
});
add('visibility-limits', 'A detector can miss at different layers', '7. Visibility limits', '## 8. Detection Engineering', 'flow', {
  steps: [step('Behavior', 'Low-rate or in-process activity.'), step('Sensor', 'Wrong position or missing source.'), step('Data pipeline', 'Drops, filters, clock or parser errors.'), step('Model', 'Wrong cohort or contaminated baseline.')],
  panels: [panel('Investigate the layer', 'Record which assumption failed and test an alternative source or analytic.'), panel('Avoid circular reasoning', 'A missing alert does not prove intentional evasion or absence of compromise.', 'amber')],
  boundary: 'This is a diagnostic map, not a sourced chronology for any particular actor.',
  sources: [nist], caption: 'Different failure layers require different remedies. More complex scoring cannot recover events the pipeline never collected.'
});
add('analytic-contract', 'Make the analytic reproducible', '8.1 Design patterns', '### 8.2 Detection Logic', 'flow', {
  steps: [step('Define', 'Entity, units, windows and missing-data behavior.'), step('Implement', 'One maintained query + versioned adapters.'), step('Test', 'Positive, benign and failure cases.'), step('Evaluate', 'Held-out alerts, misses and workload.')],
  boundary: 'Eight normalized KQL examples are not eight drop-in native Sentinel connectors.',
  sources: [artifact('contracts.json'), artifact('README.md')], caption: 'Passing syntax and functional fixtures is one stage. Native ingestion, field compatibility and production value remain separate validation tasks.'
});
add('validation-levels', 'What the tests actually establish', '8.3 Evidence levels', '## 9. Implementation', 'validation', {
  evidence: 'RECORDED RESULTS · SCOPED CLAIMS',
  data: {kqlPassed: functional.synthetic_tests.filter(x => x.passed).length, kqlTotal: functional.synthetic_tests.length,
    offlinePassed: functional.offline_checks.filter(x => x.passed).length, offlineTotal: functional.offline_checks.length,
    replay: functional.public_recordings.map(x => ({id:x.id, input:x.input_records, output:x.output_rows}))},
  boundary: 'Query output rows are candidates, not labeled true positives. Production accuracy is not established.',
  sources: [artifact('functional-results.json'), artifact('datasets.json')], caption: 'Counts are read from the committed execution report, not rerun by drawing the figure. The zero-match Kerberoasting case remains visible.'
});
add('study-splits', 'Freeze the experiment before the test', '9.6 Synthetic study design', '### 9.6 A reproducible statistical study', 'splits', {
  placement: 'after-heading', evidence: 'SEEDED SYNTHETIC EXPERIMENT',
  data: {seed:study.seed, rows:study.dataset_rows, ...study.selection_and_splits, positives:study.test_positives, negatives:study.test_negatives},
  boundary: 'The generator is a constructed world, not a representative enterprise sample.',
  sources: [artifact('synthetic-study.json')], caption: 'Chronological train, validation and test partitions are disjoint. The gated-MAD model reuses the ungated threshold; the test is not used for tuning.'
});
add('study-results', 'Corroboration reduces alerts and recall', '9.6 Synthetic study results', '### 9.7 Revision', 'results', {
  evidence: 'SYNTHETIC RESULTS · NOT PRODUCTION',
  data: study.models.map(row => ({model:row.model,...row.test})),
  boundary: 'The generator makes corroboration more likely for attacks. That advantage is assumed, not discovered.',
  sources: [artifact('synthetic-study.json'), artifact('synthetic-study.csv')], caption: 'Confusion counts and precision/recall are computed from the committed study. Compared with ungated entity-MAD, the gate removes both false and true alerts; it is not a free improvement.'
});
add('operational-workflow', 'Close the loop before operational use', '9.5 Validation workflow', '### 9.6 A reproducible statistical study', 'flow', {
  steps: [step('Collect', 'Generate and inspect real source events.'), step('Replay', 'Include authorized benign and attack cases.'), step('Shadow', 'Measure alerts, misses and analyst effort.'), step('Review', 'Assign an owner, rollback and revalidation plan.')],
  boundary: 'Investigation priority, incident declaration and automatic containment are different decisions.',
  sources: [nist, artifact('README.md')], caption: 'A proposed operational workflow. This article has not completed a representative production trial or certified automated containment safety.'
});

// Keep figure numbers in reading order; the operational loop precedes the study.
const operational=figures.pop();
figures.splice(figures.findIndex(f=>f.id==='study-splits'),0,operational);
export {figures, base, entropy};
