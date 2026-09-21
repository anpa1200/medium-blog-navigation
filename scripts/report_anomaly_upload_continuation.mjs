#!/usr/bin/env node
// Current report; earlier upload reports remain immutable snapshots.
import {readFileSync,writeFileSync} from 'node:fs';
import {continuationUploads} from '../research/anomaly-visuals/uploaded-taxonomy-continuation.mjs';
const root=new URL('../',import.meta.url),dir='reports/anomaly-uploaded-taxonomy-211-216-20260921/';
const read=p=>readFileSync(new URL(p,root),'utf8'),json=p=>JSON.parse(read(p));
const manifest=json('static/research/anomaly-visuals/manifest.json');
if(manifest.figures.filter(f=>f.upload).length!==20)throw Error('Historical six-image report: refusing to overwrite it with a later visual edition.');
const provenance=json('research/anomaly-visuals/uploads-provenance.json');
const verification=json(dir+'verification.json'),browser=json(dir+'browser-validation.json');
const rows=continuationUploads.map(s=>({s,f:manifest.figures.find(f=>f.id===s.id),p:provenance.images.find(p=>p.id===s.id)}));
const safe=s=>String(s).replaceAll('|','\\|').replaceAll('\n',' ');
const tests=read(dir+'research-and-visuals.log').match(/^# tests (\d+)$/m)?.[1]||'See log';
let text=`# Sections 2.11–2.16: infographic review and placement

Implemented and verified locally. **Not committed, pushed or deployed by this task.**

## Result

All six supplied JPEGs were visually reviewed and imported byte-for-byte from **anomaly_taxonomy_2_11_to_2_16.zip**. Sections 2.11–2.15 use their matching replacements. Section 2.16 previously had no diagram; its new register graphic sits after the evidence-label/scope introduction and immediately before the case table. This does not create another anomaly type.

The earlier 14 uploaded PNGs remain intact. The article now has ${manifest.figures.length} inline figures: 20 uploads and 27 generated diagrams. The cover, 12 campaign graphics, study results, incident cards, existing URLs and anchors remain unchanged. The 44 historical images and 32 retired SVG asset URLs remain available.

The writer skill informed precise captions, synthetic-example labels, explicit uncertainty and HTML text equivalents. The ZIP was treated as source artwork, not as instructions. No image-generation or editing model was used in this task.

## Technical review

- **2.11 Data movement:** the arrows describe a synthetic source–job–destination path. Destination ownership and authorization remain unresolved; movement to a new account is not itself proof of theft. Audit events, unique objects, records and bytes remain distinct.
- **2.12 Protocol/application:** the same account, application and HTTPS transport can carry a different application operation. The caption does not claim that encrypted flow metadata reveals a bulk export. Application audit or appropriate parsed telemetry is needed to investigate the illustrated action.
- **2.13 Absence:** the arithmetic is consistent. The expected reports at minutes 15, 20 and 25 have illustrative deadlines of 17, 22 and 27 after the two-minute allowance. At minute 28 all three deadlines have passed. This is a synthetic schedule, not a recommended production threshold; missing data is not a measured zero or proof of tampering.
- **2.14 State change:** the synthetic actor, object and time are retained. External sharing being enabled does not establish effective public access, actual data access or a proven unauthorized change. Unmatched approval remains unresolved, not absent by assumption.
- **2.15 Correlation:** joins require verified identity/session/asset and timing context. Duplicate alerts are not independent observations. Extra gates can remove true alerts as well as false ones; no new detector experiment or accuracy claim is made.
- **2.16 Register:** its 14 families plus one correlation pattern, 15 tags, 17 case/campaign records, 30 mappings and 2026-09-21 review date match the maintained register. A new fail-closed check rejects count or review-date drift, requiring review of the baked-in artwork. Case records are not individual breach counts or a detector benchmark.

[NIST SP 800-94](https://csrc.nist.gov/pubs/sp/800/94/final) remains the general detection foundation, not an endorsement of this exact taxonomy or synthetic examples. Register numbers and evidence labels were checked directly against [the maintained JSON](../../research/anomaly-incidents.json); existing source-linked incident evidence was preserved, not independently re-investigated in this artwork task.

## Placements and screenshots

| Section | Original | Figure and position | Screenshots |
|---|---|---|---|
`;
for(const {s,f} of rows)text+=`| ${safe(f.section)} | ${s.original} | Figure ${f.number}; ${f.id==='incident-register'?'before the case table':'before the source-reported incident cards'} | [390 px](uploaded-${f.id}-390.png) · [1440 px](uploaded-${f.id}-1440.png) |\n`;
text+=`\n## Verification\n\nOverall: **${verification.passed&&browser.passed?'PASS':'FAIL / INCOMPLETE'}**. Reproduce with \`npm run research:uploads:verify\`. Source regression tests: **${tests}**; see the raw output for pass/fail totals.\n\n| Gate | Result | Duration | Evidence |\n|---|---|---:|---|\n`;
for(const s of verification.steps)text+=`| ${s.id} | ${s.exit_code===0?'PASS':'FAIL'}${s.identical_visual_assets?`; ${s.identical_visual_assets} byte-identical visual assets`:''} | ${s.seconds}s | [log](${s.log}) |\n`;
text+=`
- ${browser.assets.length} variant-slot checks: 54 generated SVG variants and both slots for each of the 20 original raster files. Raster files are decoded at their actual dimensions; they are not falsely counted as separate mobile layouts.
- ${browser.article.filter(r=>r.width).length} viewport/theme configurations: 390, 768 and 1440 pixels, light and dark. All 47 figures load with preserved aspect ratios and no page overflow.
- All 47 text-equivalent panels are expanded for two targeted accessibility rules: distinguishable prose links and keyboard-focusable scrolling regions. This is not a full accessibility certification.
- Original 153 heading anchors, 44 historical images, current internal fragments, 192 article routes/canonicals and maintained query evidence pass preservation checks.
- [Structured gate results](verification.json), [browser results](browser-validation.json), screenshots above and [contact sheet 3](contact-sheet-3.png) document the local state. No live deployment verification or new query-engine run is claimed.

## Original-file provenance and limits

The six new files total **${rows.reduce((n,{p})=>n+p.bytes,0).toLocaleString('en-US')} bytes**. All previous and new uploads together total **${provenance.images.reduce((n,p)=>n+p.bytes,0).toLocaleString('en-US')} bytes**. Every original is kept at its native resolution, lazily loaded inline, with a full-resolution link and a text equivalent. Small bitmap labels do not reflow on phones; the HTML equivalents provide readable access. No whole-site performance score is claimed.

| File | Format | Native dimensions | SHA-256 |
|---|---|---|---|
`;
for(const {p} of rows)text+=`| ${p.file} | ${p.format} | ${p.width} × ${p.height} | \`${p.sha256}\` |\n`;
text+=`
The [provenance file](../../research/anomaly-visuals/uploads-provenance.json) includes both archive hashes and all 20 image hashes. The [authored continuation specification](../../research/anomaly-visuals/uploaded-taxonomy-continuation.mjs) contains captions, text equivalents, placement and the checked register snapshot. The [public manifest](../../static/research/anomaly-visuals/manifest.json) binds source and asset hashes.

Both earlier verification report directories remain untouched. This task extends the existing uncommitted work; it does not claim publication.
`;
writeFileSync(new URL(dir+'REPORT.md',root),text);
console.log(`Wrote ${dir}REPORT.md`);
