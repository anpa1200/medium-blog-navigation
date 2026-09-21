#!/usr/bin/env node
// Local evidence report for the source-guide edition; does not publish.
import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import {detectionUploads,detectionDocuments} from '../research/anomaly-visuals/uploaded-detection-sources.mjs';
const root=new URL('../',import.meta.url),dir='reports/anomaly-uploaded-detection-51-59-20260921/';
const read=p=>readFileSync(new URL(p,root),'utf8'),json=p=>JSON.parse(read(p));
const manifest=json('static/research/anomaly-visuals/manifest.json');
if(manifest.figures.length!==55||manifest.figures.filter(f=>f.upload).length!==41)throw Error('This report is bound to the 41-upload source-guide edition.');
const provenance=json('research/anomaly-visuals/uploads-provenance.json');
const verification=json(dir+'verification.json'),browser=json(dir+'browser-validation.json');
const rows=detectionUploads.map(s=>({s,f:manifest.figures.find(f=>f.id===s.id),p:provenance.images.find(p=>p.id===s.id)}));
const safe=s=>String(s).replaceAll('|','\\|').replaceAll('\n',' ');
const tests=read(dir+'research-and-visuals.log').match(/^# tests (\d+)$/m)?.[1]||'See log';
for(const {f} of rows)for(const width of [390,1440])if(!existsSync(new URL(`${dir}uploaded-${f.id}-${width}.png`,root)))throw Error('Missing screenshot: '+f.id);
let text=`# Sections 5.1–5.9: detection-source infographic integration

Implemented and verified locally. **Not committed, pushed or deployed by this task.**

## Result and placement decision

All nine **2400 × 3000 PNGs** from **detection_sources_5_1_to_5_9.zip** were visually inspected and imported unchanged. The source tree previously had one matching subsection graphic: the DNS entropy diagram in Section 5.7. That image is replaced while its figure ID and old SVG asset URLs remain available. The other eight source subsections gain their matching illustrations; the introductory telemetry-contract overview remains intact.

The article now contains **55 inline figures: 41 supplied images and 14 generated diagrams**. Its 32 earlier uploads, 44 historical images, article URL, headings, Section 5 prose, maintained queries, incident register and calculated research results are preserved. Existing downstream figure numbers move because eight figures were added in reading order; their stable figure IDs and anchors do not change. All 58 retired SVG asset URLs remain available.

The writer skill guided evidence-first captions, source-specific qualifications and accessible HTML text equivalents. No image-generation or editing model was used. The ZIP's README, source notes, image manifest, accessible text and synthetic calculations were imported as reference data, not executed or treated as instructions. All 14 members retain the package's original relative paths under the public uploaded-detection directory.

| Section | Original image | Placement | Screenshots |
|---|---|---|---|
`;
for(const {s,f} of rows)text+=`| ${safe(f.section)} | ${s.original} | Figure ${f.number}; ${f.id==='dns-entropy'?'replaces prior entropy graphic':'new figure after subsection discussion'} | [390 px](uploaded-${f.id}-390.png) · [1440 px](uploaded-${f.id}-1440.png) |\n`;
text+=`\n## Technical review\n\nThese figures describe source capabilities, collection requirements and explanatory examples. They are not records from a newly exercised endpoint, identity tenant, EDR deployment, cloud account or SIEM, and no detector accuracy is inferred from documentation or rendering checks.\n`;
for(const {f} of rows){
  text+=`\n### ${f.section.split(' ')[0]} ${f.title}\n\n${f.caption}\n\n${f.boundary}\n\n`;
  text+=f.sources.filter(s=>!s.label.startsWith('Supplied source')).map(s=>`[${s.label}](${s.url})`).join(' · ')+'.\n';
}
text+=`
## Source and arithmetic verification

The relevant Microsoft, Okta, AWS, Zeek, Cloudflare and NIST references were consulted for this integration. Verification is bounded to the displayed claims, not every page of every product manual. Notable checks and qualifications:

- Microsoft documents the DeviceProcessEvents event key as ReportId with DeviceName and Timestamp. The figure's DeviceId/time and process-instance fields are context and correlation fields, not replacement event identifiers.
- The supplied Zeek master DNS URL was not retrievable through the browser tool. The nearby N1 link uses the accessible pinned 8.2.1 DNS documentation, where TTLs was verified. The supplied notes are retained unchanged, including their original master URL. N2 remains the supplied 8.2.0 TLS reference; no one-version universal schema is implied.
- Both conflicting AWS statements about GenerateDbAuthToken were located. This does not establish that a customer-exported CloudTrail event exists, and no detector dependent on it was implemented.
- The OfficeActivity schema is supplemented with Microsoft's operation catalog and mailbox guidance for the named workload operations. This does not assert that any particular tenant collects all of them.
- DNS entropy is recomputed from the literal character counts: aaaa = 0, abab = 1, abcd = 2 bits per character. These are synthetic strings, not observed domains or a detector calibration dataset.
- The synthetic SaaS records have three distinct evidence IDs and one object identifier. Their transferred-byte value is null/unknown, not zero; event count and object size are not equivalent to actual transfer volume.
- Eight mutation checks reject drift in the baked-in DNS and SaaS values, duplicate illustrative evidence IDs, wrong object counts and conversion of unknown bytes into zero. This is a consistency check on the figures, not a test against production telemetry.

## Local verification

Overall: **${verification.passed&&browser.passed?'PASS':'FAIL / INCOMPLETE'}**. Source regression tests: **${tests}**. Reproduce with: npm run research:uploads:verify.

| Gate | Result | Duration | Evidence |
|---|---|---:|---|
`;
for(const s of verification.steps)text+=`| ${s.id} | ${s.exit_code===0?'PASS':'FAIL'}${s.identical_visual_assets?`; ${s.identical_visual_assets} byte-identical assets including nested package files`:''} | ${s.seconds}s | [log](${s.log}) |\n`;
text+=`
- ${browser.assets.length} asset-variant slots checked: 28 active generated SVG variants plus both slots for each of the 41 original rasters. The same raster is reused across viewports; this is not 82 different raster designs.
- ${browser.article.filter(r=>r.width).length} viewport/theme configurations: 390, 768 and 1440 pixels in light and dark themes. All 55 figures decode with preserved aspect ratios and no page overflow or JavaScript errors.
- All 55 HTML text-equivalent panels are expanded for two targeted accessibility rules, covering distinguishable prose links and keyboard-focusable scrolling regions. This is not a full accessibility certification.
- Section 5 prose is compared directly against its maintained source with figure tags removed. All nine new section placements, the preserved DNS anchor, image dimensions, source-code resolution, package metadata and document hashes have regression checks.
- Original 153 heading anchors, 192 article routes/canonicals, 44 historical images, current fragments, incident mappings and maintained query evidence pass preservation checks. The catalog now records 99 article images: 55 current plus 44 historical.
- [Structured gate results](verification.json), [browser results](browser-validation.json), [contact sheet 5](contact-sheet-5.png), [contact sheet 6](contact-sheet-6.png) and the per-figure screenshots above document the local state. No CI, production deployment or new query-engine run is claimed.

## Original-file provenance and size

The nine new images total **${rows.reduce((n,{p})=>n+p.bytes,0).toLocaleString('en-US')} bytes**; all 41 uploaded images total **${provenance.images.reduce((n,p)=>n+p.bytes,0).toLocaleString('en-US')} bytes**. Originals are lazy-loaded inline with full-resolution links. Small bitmap labels do not reflow on phones; the HTML equivalents provide readable access. Images were not compressed or redrawn, and no whole-site performance score is claimed.

| Original file | Native dimensions | SHA-256 |
|---|---|---|
`;
for(const {p} of rows)text+=`| ${p.original} | ${p.width} × ${p.height} | ${p.sha256} |\n`;
text+=`\n### Preserved supporting files\n\n`;
for(const d of detectionDocuments){const p=provenance.documents.find(p=>p.file===d.file);text+=`- [${d.original}](../../static/research/anomaly-visuals/${d.file}): ${p.bytes} bytes; SHA-256 ${p.sha256}.\n`;}
const archive=provenance.archives.find(a=>a.name==='detection_sources_5_1_to_5_9.zip');
text+=`
ZIP SHA-256: **${archive.sha256}**. The importer compares the nine originals with the supplied manifest before copying; the build verifier recursively checks that the entire public package survives both builds byte-for-byte.

[Provenance](../../research/anomaly-visuals/uploads-provenance.json), [authored source-guide specifications](../../research/anomaly-visuals/uploaded-detection-sources.mjs) and the [public manifest](../../static/research/anomaly-visuals/manifest.json) bind the placements, captions, calculations and assets.

Earlier verification directories remain historical snapshots. This task extends the existing uncommitted work and makes no claim that these images are already published.
`;
writeFileSync(new URL(dir+'REPORT.md',root),text);
console.log(`Wrote ${dir}REPORT.md`);
