#!/usr/bin/env node
// Render reviewed incident evidence into the existing article, never a new route.
import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const data = JSON.parse(readFileSync(resolve(root, 'research/anomaly-incidents.json')));
const catalog = JSON.parse(readFileSync(resolve(root, 'src/data/article-catalog.json')));
const article = catalog.find(row => row.id === data.article_id);
const target = resolve(root, 'docs/articles', article.local_path + '.md');
const old = readFileSync(target, 'utf8');
const byType = Object.fromEntries(data.types.map(t => [t.id, t]));
const labels = {cloud: 'Cloud and SaaS', network: 'Network telemetry', identity: 'Identity and access', endpoint: 'Endpoint telemetry', insider: 'Insider risk', ot: 'Operational technology', 'telemetry-health': 'Telemetry health', application: 'Application audit'};
const typesLink = id => `[${byType[id].label}](#anomaly-${id})`;
const escapeHTML = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
// Follow the archive's same-origin full-navigation convention in both builds.
const siteLink = (label, path) => `<a href="https://1200km.com${path}" target="_self">${escapeHTML(label)}</a>`;
const articleLink = id => {
  const row = catalog.find(item => item.id === id);
  if (!row) throw Error('Unknown article ' + id);
  return siteLink(row.title, `/articles/read/${row.local_path}/`);
};
const sourceLink = id => {
  const s = data.sources[id];
  return `[${s.publisher}: ${s.title}](${s.url})`;
};
const marker = (id, body) => `<!-- anomaly-evidence:${id}:start -->\n${body.trim()}\n<!-- anomaly-evidence:${id}:end -->`;
const escapeRE = text => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
function updateBlock(text, id, content) {
  const re = new RegExp(`<!-- anomaly-evidence:${id}:start -->[\\s\\S]*?<!-- anomaly-evidence:${id}:end -->`);
  return re.test(text) ? text.replace(re, () => marker(id, content)) : null;
}
function renderType(type) {
  const tags = type.tags.map(tag => `[${labels[tag]}](#tag-${tag})`).join(' · ');
  const forms = type.forms.map(form => `[${form}](#anomaly-form-${form})`).join(', ');
  const browse = siteLink(`Browse articles and guides: ${type.label}`, `/search.html?f.anomaly=anomaly-${type.id}`);
  const lines = [`**Evidence tags:** ${tags}. **Statistical forms:** ${forms}.`, '', browse + '.', '', '**Reported incidents and detection interpretations**', ''];
  for (const example of type.examples) {
    const incident = data.cases[example.case];
    lines.push(`#### ${incident.name} {#case-${type.id}-${example.case}}`, '',
      `**Period:** ${incident.period}. **Evidence:** ${incident.kind.replaceAll('-', ' ')} reported by the cited source.`, '',
      `**Observed [source-reported]:** ${example.observed} ${incident.sources.map(sourceLink).join('; ')}.`, '',
      `**Anomaly interpretation [inferred]:** ${example.interpretation}`, '',
      `**Telemetry to validate:** ${example.telemetry}`, '',
      `**Boundary / competing explanation:** ${example.limit}`, '',
      `**ATT&CK [author-mapped behavior, not actor attribution]:** ${example.attack.length ? example.attack.map(id => siteLink(`${id} — ${data.attack[id]}`, `/threat-matrix/techniques/${id}/`)).join('; ') : 'Not forced: the public role-misuse evidence does not justify a specific technique mapping here.'}`, '');
  }
  lines.push(`**Crosslinks:** ${type.related.map(typesLink).join(' · ')}. ${siteLink('Statistical foundation in the Anomaly Detection Atlas', `/anomaly-detection-atlas/statistical-anomaly-taxonomy/#${type.atlas}`)}. Related research: ${type.article_links.map(articleLink).join('; ')}.`, '');
  return lines.join('\n');
}

let text = old;
for (const [index, type] of data.types.entries()) {
  const block = renderType(type);
  const updated = updateBlock(text, type.id, block);
  if (updated !== null) { text = updated; continue; }
  const beginning = `**${type.label}**`;
  const start = text.indexOf(beginning, text.indexOf('## 2. Taxonomy'));
  if (start < 0) throw Error('Missing taxonomy type ' + type.label);
  const next = index + 1 < data.types.length ? text.indexOf(`**${data.types[index + 1].label}**`, start) : text.indexOf('## 3. Mapping', start);
  if (next < start) throw Error('Missing next section');
  let segment = text.slice(start, next);
  const heading = `### 2.${index + 1} ${type.label} {#anomaly-${type.id}}\n\n`;
  segment = segment.replace(new RegExp('^' + escapeRE(beginning) + '\\s*[—–-]\\s*'), heading);
  if (!segment.startsWith(heading)) throw Error('Unexpected type intro ' + type.label);
  const scenarios = segment.match(/\*\*Examples:\*\*|Examples:/);
  if (!scenarios) throw Error('Missing illustrative scenarios ' + type.label);
  segment = segment.slice(0, scenarios.index) + marker(type.id, block) + '\n\n**Illustrative scenarios (not additional incidents):**' + segment.slice(scenarios.index + scenarios[0].length);
  text = text.slice(0, start) + segment + text.slice(next);
}

const count = data.types.reduce((sum,t)=>sum+t.examples.length,0);
const indexLines = [
  `### 2.${data.types.length + 1} Incident register, tags and evidence boundaries {#anomaly-evidence-index}`, '',
  `This expansion covers **14 operational anomaly families plus multi-event correlation: ${data.types.length} navigation tags, ${count} incident-to-topic mappings and ${Object.keys(data.cases).length} distinct case/campaign records**, reviewed on ${data.reviewed_at}. A campaign record may summarize multiple victims; this is not a count of individual breaches. A repeated case is not independent evidence.`, '',
  '**Reading the labels:** “Observed” means reported by the named investigator, not reproduced in this research. Each anomaly interpretation and ATT&CK association is an author-derived mapping. Suggested telemetry is a collection plan, not a claim that it was available to the original victim. No new precision, recall, threshold or successful-detection result is asserted.', '',
  '**Scope:** Fourteen headings describe operational feature families; the fifteenth, multi-event correlation, is a composition pattern that combines them. The companion Atlas has a broader statistical taxonomy; its linked categories explain the statistical concept and do not imply one-to-one equivalence. The existing generic example bullets remain illustrative scenarios, not extra documented incidents.', '',
  '| Case / campaign record | Attribution boundary | Crosslinked analytical views |',
  '|---|---|---|',
];
for (const [id, incident] of Object.entries(data.cases)) {
  const uses = data.types.filter(t=>t.examples.some(e=>e.case===id));
  indexLines.push(`| ${incident.name} (${incident.period}) | ${incident.attribution} | ${uses.map(t=>`[${t.label}](#case-${t.id}-${id})`).join(' · ')} |`);
}
indexLines.push('', '#### Topic tags {#anomaly-topic-tags}', '', 'These tags link to the relevant sections of this existing article; they do not create new tag landing pages.', '');
for (const [tag, label] of Object.entries(labels)) {
  indexLines.push(`##### ${label} {#tag-${tag}}`, '', data.types.filter(t=>t.tags.includes(tag)).map(t=>typesLink(t.id)).join(' · '), '');
}
indexLines.push('#### Reuse and validation {#anomaly-reuse-validation}', '',
  `**ATT&CK currency:** Mappings were reviewed on ${data.reviewed_at}; the technical revision uses Enterprise ATT&CK v19.2. ${data.attack_migrations.map(item => `The former ${item.previous} now points to [${item.current} — ${data.attack[item.current]}](${item.url})`).join('; ')}. The JSON retains these identifier transitions. Vendor finding names remain their vendor-defined identifiers.`, '',
  `The companion machine-readable evidence register is ${siteLink('available as JSON', '/articles/research/anomaly-incidents.json')}. It keeps source URLs and publication dates separate from incident periods, and records both the observed behavior and the inferred detection opportunity. Case identifiers support deduplication across anomaly types.`, '',
  'To evaluate a proposed detector, preserve the source event IDs, normalize entity identifiers and time zones, define the comparison population, and test against both attack and legitimate activity. Freeze thresholds before evaluation. Report missing telemetry, false alerts per entity-day, incident recall and alert precision separately. A high anomaly score is neither group attribution nor an automatic containment decision.', '',
  '**Implementation boundary:** Incident evidence does not validate a detector. Section 8 now uses maintained query files and explicit telemetry contracts; its execution report distinguishes functional tests from public-recording replay. Section 9 labels synthetic statistical results separately. Neither establishes production precision, recall, connector compatibility or universal thresholds.', '');
const indexBlock = indexLines.join('\n');
text = updateBlock(text, 'index', indexBlock) ?? text.replace('## 3. Mapping', marker('index',indexBlock) + '\n\n## 3. Mapping');

const refs = ['### Incident-source register (September 2026 expansion) {#incident-primary-sources}', '', ...Object.values(data.sources).map(s=>`- ${s.publisher}. [${s.title}](${s.url}). Published ${s.published}; reviewed ${data.reviewed_at}.`), ''].join('\n');
text = updateBlock(text, 'sources', refs) ?? text.replace('## 11. References\n', '## 11. References\n\n' + marker('sources',refs) + '\n');

const asset = resolve(root, 'static/research/anomaly-incidents.json');
const serialized = JSON.stringify(data, null, 2) + '\n';
if (process.argv.includes('--check')) {
  if (text !== old) throw Error('Incident expansion is stale; run node scripts/render_anomaly_incidents.mjs');
  if (readFileSync(asset, 'utf8') !== serialized) throw Error('Downloadable incident register is stale');
  console.log(`Incident rendering current: ${data.types.length} types, ${count} mappings, ${Object.keys(data.cases).length} cases.`);
} else {
  writeFileSync(target,text);
  // The downloadable data is an asset, not a new HTML page or public route rename.
  mkdirSync(resolve(root, 'static/research'), {recursive: true});
  writeFileSync(asset, serialized);
  console.log('Updated ' + target);
}
