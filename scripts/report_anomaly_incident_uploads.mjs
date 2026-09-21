#!/usr/bin/env node
// This edition's local integration report. No commit, push or deployment action.
import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import {incidentUploads,incidentSourceNotes} from '../research/anomaly-visuals/uploaded-incidents.mjs';
const root=new URL('../',import.meta.url),dir='reports/anomaly-uploaded-incidents-41-412-20260921/';
const read=p=>readFileSync(new URL(p,root),'utf8'),json=p=>JSON.parse(read(p));
const manifest=json('static/research/anomaly-visuals/manifest.json');
if(manifest.figures.length!==47||manifest.figures.filter(f=>f.upload).length!==32)throw Error('This report is bound to the 32-upload incident edition; do not overwrite it with a different edition.');
const provenance=json('research/anomaly-visuals/uploads-provenance.json');
const verification=json(dir+'verification.json'),browser=json(dir+'browser-validation.json');
const rows=incidentUploads.map(s=>({s,f:manifest.figures.find(f=>f.id===s.id),p:provenance.images.find(p=>p.id===s.id)}));
const safe=s=>String(s).replaceAll('|','\\|').replaceAll('\n',' ');
const tests=read(dir+'research-and-visuals.log').match(/^# tests (\d+)$/m)?.[1]||'See log';
const notes=provenance.documents.find(p=>p.file===incidentSourceNotes.file);
for(const {f} of rows)for(const width of [390,1440])if(!existsSync(new URL(`${dir}uploaded-${f.id}-${width}.png`,root)))throw Error('Missing screenshot: '+f.id);
let text=`# Sections 4.1–4.12: incident infographic review and placement

Implemented and verified locally. **Not committed, pushed or deployed by this task.**

## Result

All 12 supplied PNGs from **incident_infographics_4_1_to_4_12.zip** were visually inspected, imported byte-for-byte at their native **2400 × 3000** resolution and placed in their matching incident sections. They replace the 12 former generated campaign figures; they do not add unrelated figures or change the article URL, headings or incident prose.

The earlier 20 uploads remain intact. The article still contains **47 inline figures**: **32 uploads** and **15 generated diagrams**. All 44 historical images and 56 retired SVG asset URLs remain available. The article cover, source incident register, taxonomy tags, maintained queries and calculated research results were not changed.

Each new figure has a source-linked caption, an evidence label distinguishing reported activity from proposed detection logic, a full-resolution link and an expandable HTML text equivalent. Source identifiers S01–S14 resolve through links immediately below the relevant image. The ZIP's SOURCES.md is preserved unchanged as [uploaded-incident-sources.md](../../static/research/anomaly-visuals/uploaded-incident-sources.md), including its original review limitations. It was treated as supplied reference material, not instructions or proof of independent verification.

The writer skill informed the evidence boundaries and explanatory captions. No image-generation or editing model was used; original pixels are unchanged. Captions, rather than silent image modifications, qualify the shorthand described below.

## Placement and screenshots

Each replacement occupies the existing figure slot after that incident's discussion and before the next section. Existing figure IDs and numbering remain stable.

| Section | Original PNG | Figure | Rendered screenshots |
|---|---|---|---|
`;
for(const {s,f} of rows)text+=`| ${safe(f.section)} | ${s.original} | ${f.number}: ${f.id} | [390 px](uploaded-${f.id}-390.png) · [1440 px](uploaded-${f.id}-1440.png) |\n`;
text+=`\nManual rendered review on 21 September 2026 covered contact sheets 3–5, phone captures for Sections 4.4, 4.8 and 4.11, and desktop captures for Sections 4.10 and 4.12. Captions, source links and full-resolution links were legible and uncut. The originals were reviewed separately; small embedded bitmap labels still require zoom or the HTML equivalent on phones.\n\n## Technical review and caption decisions\n\nThese are public-source summaries and locally reviewed teaching diagrams, not independently reproduced victim incidents or validated detection rules. A rendering pass does not certify the factual content of an image.\n`;
for(const {f} of rows){
  text+=`\n### ${f.section.split(' ')[0]} ${f.title}\n\n${f.caption}\n\n${f.boundary}\n\n`;
  text+=f.sources.filter(s=>!s.label.startsWith('Supplied source')).map(s=>`[${s.label}](${s.url})`).join(' · ')+'.\n';
}
text+=`
## Source-review access boundary

The primary HTML investigations were consulted during this integration for the specific distinctions above. Supplemental Microsoft documentation was checked for Defender 5001/5007 and the broader Exchange activity. This does not constitute a complete new investigation of every claim in the original article.

Two official CISA-hosted reports could not be freshly reviewed in full. Browser retrieval failed, and direct HTTPS downloads returned **403** on 21 September 2026:

- [CSRB report, alternate official PDF path](https://www.cisa.gov/sites/default/files/2025-03/CSRBReviewOfTheSummer2023MEOIntrusion508.pdf): the Big Yellow Taxi / MailItemsAccessed account remains attributed to the already cited CSRB report. Neither the private detection query nor a performance denominator was available. A separate CSRB link was added below the figure because S08/S09 are Microsoft's reports, not the CSRB source.
- [AA22-277A official advisory PDF](https://www.cisa.gov/sites/default/files/publications/aa22-277a-impacket-and-exfiltration-tool-used-to-steal-sensitive-information-from-defense-industrial-base-organization.pdf): the figure remains a source-attributed summary, with no claim of a fresh full-advisory review or named-actor attribution.

These limits are visible in the article's caption/text equivalents, not only in this report. No source note was used to claim an access check that was not performed.

## Local verification

Overall: **${verification.passed&&browser.passed?'PASS':'FAIL / INCOMPLETE'}**. Source regression tests: **${tests}**. The pass refers to integration, preservation, hash and rendering checks, not universal factual certification or production accuracy.

Reproduce with the repository command: npm run research:uploads:verify.

| Gate | Result | Duration | Evidence |
|---|---|---:|---|
`;
for(const s of verification.steps)text+=`| ${s.id} | ${s.exit_code===0?'PASS':'FAIL'}${s.identical_visual_assets?`; ${s.identical_visual_assets} byte-identical visual assets`:''} | ${s.seconds}s | [log](${s.log}) |\n`;
text+=`
- ${browser.assets.length} variant-slot checks: 30 active SVG variants and both slots for each of the 32 original raster files. Uploads reuse the same file at every viewport; they are not separate mobile designs.
- ${browser.article.filter(r=>r.width).length} viewport/theme combinations: 390, 768 and 1440 pixels in light/dark themes. All 47 inline figures load, retain their aspect ratios and avoid horizontal page overflow.
- All 47 text-equivalent panels are expanded for two targeted accessibility rules: distinguishable prose links and keyboard-focusable scrolling regions. This is not a full accessibility audit.
- The source tests check every incident's exact section, native dimensions, evidence label, source-code mapping and retained technical caveats. Source-note and image hashes are bound to the public manifest.
- Preservation checks retain the original 153 heading anchors, 192 article routes/canonicals, 44 historical images, local fragments, incident mappings and maintained query evidence. No new query-engine experiment is claimed.
- [Structured verification](verification.json), [browser results](browser-validation.json) and the per-figure screenshots above document this local build. [Contact sheet 3](contact-sheet-3.png), [contact sheet 4](contact-sheet-4.png) and [contact sheet 5](contact-sheet-5.png) include the incident figures in reading order.

## Original-file provenance

The 12 new PNGs total **${rows.reduce((n,{p})=>n+p.bytes,0).toLocaleString('en-US')} bytes**. All 32 uploaded images total **${provenance.images.reduce((n,p)=>n+p.bytes,0).toLocaleString('en-US')} bytes**. Assets are lazy-loaded inline and retain original resolution. Small raster text does not reflow on phones; readers have full-size links and readable HTML equivalents. No whole-site speed score is claimed.

| Public file | Native dimensions | SHA-256 |
|---|---|---|
`;
for(const {p} of rows)text+=`| ${p.file} | ${p.width} × ${p.height} | ${p.sha256} |\n`;
text+=`\nSupplied source notes: **${notes.bytes} bytes**, SHA-256 **${notes.sha256}**.\n\n`;
for(const a of provenance.archives)text+=`- ${a.name}: ${a.sha256}\n`;
text+=`

[Upload provenance](../../research/anomaly-visuals/uploads-provenance.json), [authored incident specification](../../research/anomaly-visuals/uploaded-incidents.mjs) and [public manifest](../../static/research/anomaly-visuals/manifest.json) bind original names, import hashes, source links and placements.

All earlier report directories remain historical snapshots. This task extends the pre-existing uncommitted infographic work. No commit, push, CI deployment or fresh production verification was performed.
`;
writeFileSync(new URL(dir+'REPORT.md',root),text);
console.log(`Wrote ${dir}REPORT.md`);
