#!/usr/bin/env node
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const read = path => readFileSync(resolve(root, path), 'utf8');
const data = JSON.parse(read('research/anomaly-incidents.json'));
const catalog = JSON.parse(read('src/data/article-catalog.json'));
const article = catalog.find(row => row.id === data.article_id);
const path = `docs/articles/${article.local_path}.md`;
const markdown = read(path);
const baseline = '869e5abd9f806f3de7d800f3b4f0f3ec867b2923';
const original = execFileSync('git', ['show', `${baseline}:${path}`], {cwd: root, encoding: 'utf8'});
const oldCatalog = JSON.parse(execFileSync('git', ['show', `${baseline}:src/data/article-catalog.json`], {cwd: root, encoding: 'utf8'}));
const matches = (text, re) => [...text.matchAll(re)];
const unique = (items, label) => assert.equal(new Set(items).size, items.length, `Duplicate ${label}`);
const textFields = (value, fields, label) => fields.forEach(field => assert.ok(typeof value[field] === 'string' && value[field].trim(), `${label}: missing ${field}`));
const typeIDs = new Set(data.types.map(type => type.id));
const usedCases = new Set();
const usedSources = new Set();
const usedTechniques = new Set();
const relatedArticles = new Set();
let mappings = 0;
assert.equal(data.schema_version, 1);
assert.equal(data.types.length, 15);
unique(data.types.map(type => type.id), 'type IDs');
for (const [id, source] of Object.entries(data.sources)) {
  textFields(source, ['title', 'publisher', 'published', 'url'], id);
  assert.match(source.published, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(new Date(source.published).toISOString().slice(0, 10), source.published);
  assert.ok(source.published <= data.reviewed_at, `Future source date ${id}`);
  assert.equal(new URL(source.url).protocol, 'https:');
}
for (const [id, record] of Object.entries(data.cases)) {
  textFields(record, ['name', 'period', 'kind', 'attribution'], id);
  assert.ok(['incident', 'campaign', 'incident-series'].includes(record.kind));
  assert.ok(record.sources.length);
  record.sources.forEach(source => {
    assert.ok(data.sources[source], `Unknown source ${source}`);
    usedSources.add(source);
  });
}
for (const type of data.types) {
  assert.equal(type.examples.length, 2, `Coverage ${type.id}`);
  unique(type.examples.map(example => example.case), `${type.id} examples`);
  assert.ok(type.tags.length && type.forms.length && type.related.length && type.article_links.length);
  type.forms.forEach(form => assert.ok(['point', 'contextual', 'collective'].includes(form)));
  type.tags.forEach(tag => assert.ok(markdown.includes(`{#tag-${tag}}`), `Missing tag ${tag}`));
  type.related.forEach(id => assert.ok(id !== type.id && typeIDs.has(id), `Invalid related type ${id}`));
  type.article_links.forEach(id => relatedArticles.add(id));
  for (const example of type.examples) {
    mappings++;
    textFields(example, ['observed', 'interpretation', 'telemetry', 'limit'], type.id);
    assert.ok(data.cases[example.case], `Unknown case ${example.case}`);
    usedCases.add(example.case);
    example.attack.forEach(id => {
      assert.match(id, /^T\d{4}(\.\d{3})?$/);
      assert.ok(data.attack[id], `Unknown technique ${id}`);
      usedTechniques.add(id);
    });
    assert.ok(markdown.includes(`{#case-${type.id}-${example.case}}`));
  }
}
assert.equal(mappings, 30);
assert.equal(usedCases.size, 17);
assert.equal(usedCases.size, Object.keys(data.cases).length, 'Unused case');
assert.equal(usedSources.size, Object.keys(data.sources).length, 'Unused source');
assert.equal(usedTechniques.size, Object.keys(data.attack).length, 'Unused technique');
for (const migration of data.attack_migrations) {
  assert.ok(data.attack[migration.current], 'Missing replacement technique');
  assert.ok(!data.attack[migration.previous], 'Superseded technique still used in new mappings');
}
assert.equal(relatedArticles.size, 4);
for (const id of relatedArticles) {
  const other = catalog.find(row => row.id === id);
  assert.ok(other, `Missing article ${id}`);
  assert.ok(read(`docs/articles/${other.local_path}.md`).includes(`/articles/read/${article.local_path}/#anomaly-`), `Missing return link ${id}`);
}
// Technical revision is authorized; routes/canonicals and historical evidence stay intact.
// New publications are allowed; every baseline route and canonical must survive.
assert.equal(new Set(catalog.map(row => row.id)).size, catalog.length, 'Duplicate article IDs');
const routeIdentity = row => [row.id, row.slug, row.local_path, row.canonical_url, row.preferred_canonical_url, row.published_at];
assert.deepEqual(oldCatalog.map(old => {
  const current = catalog.find(row => row.id === old.id);
  assert.ok(current, `Missing preserved article ${old.id}`);
  return routeIdentity(current);
}), oldCatalog.map(routeIdentity));
const images = text => matches(text, /<img\b[^>]*\bsrc="([^"]+)"[^>]*>/g).map(match => match[1]);
const code = text => matches(text, /^```[^\n]*\n[\s\S]*?^```[ \t]*$/gm).map(match => match[0]);
assert.deepEqual(images(markdown), images(original), 'Original media changed');
assert.equal(images(markdown).length, 44);
const historical = read('static/research/anomaly-historical-code.md');
assert.deepEqual(code(historical), code(original), 'Historical technical evidence changed');
assert.equal(code(historical).length, 11);
assert.equal(matches(markdown, /^```kusto$/gm).length, 8, 'Missing maintained query examples');
for (const block of matches(markdown, /<!-- query-source:([a-z-]+):start -->\n```kusto\n([\s\S]*?)\n```\n<!-- query-source:\1:end -->/g)) {
  assert.equal(block[2], read(`research/anomaly-validation/queries/${block[1]}.kql`).trim(), `Query drift ${block[1]}`);
}
assert.equal(matches(markdown.replace(/^```[^\n]*\n[\s\S]*?^```[ \t]*$/gm, ''), /^# /gm).length, 1);
assert.ok(article.tags.includes('Anomaly Detection') && article.tags.includes('MITRE ATT&CK'));
assert.ok(markdown.includes(`title: "${article.title}"`));
assert.ok(markdown.includes(`description: "${article.summary}"`));
assert.deepEqual(JSON.parse(read('static/research/anomaly-incidents.json')), data);
const explicitIDs = matches(markdown, /\{#([^}]+)\}|<span id="([^"]+)">/g).map(match => match[1] || match[2]);
unique(explicitIDs, 'explicit anchors');
console.log(`PASS evidence: ${data.types.length} types, ${mappings} mappings, ${usedCases.size} distinct cases, ${usedSources.size} sources, ${usedTechniques.size} techniques.`);
console.log(`PASS integration: ${relatedArticles.size} reciprocal article links, linked tags, source/asset parity, one authored H1.`);
console.log(`PASS preservation: all ${oldCatalog.length} baseline article routes/canonicals unchanged; ${catalog.length - oldCatalog.length} new articles; 44 historical images retained, 11 superseded blocks archived, 8 maintained KQL examples.`);

if (process.argv.includes('--built')) {
  const candidatePaths = [`build/read/${article.local_path}.html`, `build/read/${article.local_path}/index.html`];
  const builtPath = candidatePaths.find(path => existsSync(resolve(root, path)));
  assert.ok(builtPath, 'Run build:embedded before --built');
  const html = read(builtPath);
  const IDs = matches(html, /\bid="([^"]+)"/g).map(match => match[1]);
  unique(IDs, 'rendered IDs');
  const anchors = new Set(IDs);
  for (const id of explicitIDs) assert.ok(anchors.has(id), `Missing rendered anchor ${id}`);
  const decode = text => text.replaceAll('&amp;', '&').replaceAll('&#x27;', "'").replaceAll('&quot;', '"');
  const links = matches(html, /\bhref="([^"]+)"/g).map(match => decode(match[1]));
  let checked = 0;
  for (const link of links) {
    const url = new URL(link, `https://1200km.com/articles/read/${article.local_path}/`);
    if (url.hash && url.origin === 'https://1200km.com' && url.pathname.replace(/\/$/, '') === `/articles/read/${article.local_path}`) {
      checked++;
      assert.ok(anchors.has(decodeURIComponent(url.hash.slice(1))), `Broken local fragment ${link}`);
    }
  }
  assert.equal(matches(html, /<h1(?:\s|>)/g).length, 1);
  assert.deepEqual(JSON.parse(read('build/research/anomaly-incidents.json')), data);
  assert.ok(read('build/index.html').includes('Anomaly Detection'), 'Catalog tag missing from rendered archive');
  console.log(`PASS rendered article: ${checked} self-fragment links, ${explicitIDs.length} explicit anchors, one H1, downloadable JSON and catalog tags.`);
}
