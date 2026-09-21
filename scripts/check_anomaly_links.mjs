#!/usr/bin/env node
// Read-only, bounded public HTTP checks. Does not test the unpublished article.
import {readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const data = JSON.parse(readFileSync(resolve(root, 'research/anomaly-incidents.json')));
const catalog = JSON.parse(readFileSync(resolve(root, 'src/data/article-catalog.json')));
const targets = new Map();
function add(url, kind) {
  const parsed = new URL(url);
  const anchor = decodeURIComponent(parsed.hash.slice(1));
  parsed.hash = '';
  const base = parsed.href;
  if (!targets.has(base)) targets.set(base, {url: base, kinds: [], anchors: []});
  const target = targets.get(base);
  if (!target.kinds.includes(kind)) target.kinds.push(kind);
  if (anchor && !target.anchors.includes(anchor)) target.anchors.push(anchor);
}
Object.values(data.sources).forEach(source => add(source.url, 'primary-source'));
if (process.argv.includes('--revision')) {
  const article = catalog.find(row => row.id === data.article_id);
  const markdown = readFileSync(resolve(root, `docs/articles/${article.local_path}.md`), 'utf8');
  for (const match of markdown.matchAll(/\]\((https:\/\/[^\s)]+)\)/g)) {
    const url = new URL(match[1]);
    // New local assets are verified in the build, not falsely checked as already deployed.
    if (url.hostname !== '1200km.com' && !url.hostname.endsWith('medium.com') && !url.hostname.endsWith('linkedin.com')) add(url.href, 'revision-reference');
  }
}
for (const type of data.types) {
  add(`https://1200km.com/anomaly-detection-atlas/statistical-anomaly-taxonomy/#${type.atlas}`, 'atlas');
  type.article_links.forEach(id => add(`https://1200km.com/articles/read/${catalog.find(row => row.id === id).local_path}/`, 'related-article'));
}
Object.keys(data.attack).forEach(id => {
  add(`https://1200km.com/threat-matrix/techniques/${id}/`, 'ecosystem-attack');
  add(`https://attack.mitre.org/techniques/${id.replace('.', '/')}/`, 'official-attack');
});
const results = [];
const pending = [...targets.values()];
async function worker() {
  while (pending.length) {
    const target = pending.shift();
    const start = Date.now();
    try {
      const response = await fetch(target.url, {signal: AbortSignal.timeout(25000), headers: {'User-Agent': '1200km-research-link-check/1.0'}});
      const bytes = Buffer.from(await response.arrayBuffer());
      const html = bytes.toString('utf8');
      const missingAnchors = target.anchors.filter(anchor => !html.includes(`id="${anchor}"`) && !html.includes(`id='${anchor}'`));
      const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.replace(/\s+/g, ' ').trim() || null;
      const soft404 = !!title && /page not found|^404\b|^access denied|^just a moment/i.test(title);
      const isHTML = /text\/html/i.test(response.headers.get('content-type') || '');
      const metaRefresh = /<meta\b[^>]*http-equiv=["']refresh["']/i.test(html);
      const validContent = bytes.length > 0 && (!isHTML || (!!title && !metaRefresh));
      const result = {...target, status: response.status, final_url: response.url, content_type: response.headers.get('content-type'), title, meta_refresh: metaRefresh, valid_content: validContent, missing_anchors: missingAnchors, bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex'), elapsed_ms: Date.now() - start, ok: response.status === 200 && validContent && !soft404 && !missingAnchors.length};
      results.push(result);
      console.log(`${result.ok ? 'PASS' : 'FAIL'} ${response.status} ${target.url}${missingAnchors.length ? ' missing: ' + missingAnchors.join(', ') : ''}`);
    } catch (error) {
      results.push({...target, ok: false, error: error.message, elapsed_ms: Date.now() - start});
      console.log(`FAIL ${target.url}: ${error.message}`);
    }
  }
}
await Promise.all(Array.from({length: 4}, () => worker()));
results.sort((a,b) => a.url.localeCompare(b.url));
const failed = results.filter(result => !result.ok);
const report = {checked_at: new Date().toISOString(), scope: 'Public link availability, destination identity and Atlas fragments; not independent reproduction of incident claims or publication verification.', total: results.length, passed: results.length - failed.length, failed: failed.length, results};
const reportDir = resolve(root, process.argv.includes('--revision') ? 'reports/anomaly-technical-revision-20260921' : 'reports/anomaly-incidents-20260921');
mkdirSync(reportDir, {recursive: true});
writeFileSync(resolve(reportDir, 'link-check.json'), JSON.stringify(report, null, 2) + '\n');
console.log(`RESULT ${report.passed}/${report.total} passed; ${report.failed} require review.`);
process.exitCode = failed.length ? 1 : 0;
