#!/usr/bin/env node
// Local evidence only: no commit, push, deployment or query-engine execution.
import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import {credentialUploads,credentialDocuments,validateCredentialMasks} from '../research/anomaly-visuals/uploaded-credentials.mjs';
const root=new URL('../',import.meta.url),dir='reports/anomaly-uploaded-credentials-61-64-20260921/';
const read=p=>readFileSync(new URL(p,root),'utf8'),json=p=>JSON.parse(read(p));
const manifest=json('static/research/anomaly-visuals/manifest.json'),provenance=json('research/anomaly-visuals/uploads-provenance.json');
if(manifest.figures.length!==55||manifest.figures.filter(f=>f.upload).length!==45)throw Error('Report requires the 45-upload credential-guide edition.');
const verification=json(dir+'verification.json'),browser=json(dir+'browser-validation.json');
const tests=read(dir+'research-and-visuals.log').match(/^# tests (\d+)$/m)?.[1]||'See log';
const masks=validateCredentialMasks(json('static/research/anomaly-visuals/uploaded-credentials/bitmask_checks.json'));
const rows=credentialUploads.map(s=>({s,f:manifest.figures.find(f=>f.id===s.id),p:provenance.images.find(p=>p.id===s.id)}));
for(const {f} of rows)for(const width of [390,1440])if(!existsSync(new URL(`${dir}uploaded-${f.id}-${width}.png`,root)))throw Error('Missing screenshot: '+f.id);
let text=`# Sections 6.1–6.4: credential-attack infographic integration

Implemented and verified locally. **Not committed, pushed or deployed by this task.**

## Result

All four supplied 2400 × 3000 PNGs were visually reviewed and replace the matching generated figures in Sections 6.1–6.4. Figure numbers 46–49 and their existing IDs/anchors are unchanged. All original bytes, five supporting files and their relative package paths are retained under uploaded-credentials. The eight superseded SVG URLs remain available rather than being deleted.

The article retains 55 inline figures: **45 supplied images and 10 generated diagrams**. The previous 41 uploads, Section 6 prose, historical images, article URL, maintained queries and recorded results are preserved. The writer skill guided evidence-first captions, limitations and readable HTML text equivalents. No image generation or pixel editing was used. The supplied source notes were treated as reference data, not instructions or independent proof of validation.

| Section | Placement | Original file | Screenshots |
|---|---|---|---|
`;
for(const {s,f} of rows)text+=`| ${f.section} | Figure ${f.number}; after subsection discussion | ${s.original} | [390 px](uploaded-${f.id}-390.png) · [1440 px](uploaded-${f.id}-1440.png) |\n`;
text+='\n## Technical review\n\nThese are conceptual investigation guides, not tested attack runs, calibrated detectors or newly observed incidents. Microsoft event/rights references and MITRE technique pages were consulted for the displayed claims. No live credentials were used and no attack, SIEM ingestion or Kusto-engine test was performed.\n';
for(const {f} of rows){
  text+=`\n### ${f.section}\n\n${f.caption}\n\n${f.boundary}\n\n`;
  text+=f.sources.filter(s=>!s.label.startsWith('Supplied source')).map(s=>`[${s.label}](${s.url})`).join(' · ')+'.\n';
}
text+=`
### Source-specific qualifications

- Kerberoasting values refer to TicketEncryptionType, not a supported-types mask. Microsoft's 4769 page currently has inconsistent RC4 hexadecimal values in its advertised-types table; its ticket-encryption table supports 0x17. No changed RC4 constant was inferred from that discrepancy. ServiceName can identify the account or computer rather than a unique SPN. The existing one-record, zero-match replay remains a documented breadth-rule blind spot, not a new experiment.
- The three replication GUIDs were checked against Microsoft's extended-right references. DCSync arrows mean enrichment, not chronological ordering. A suitable same-DC logon match can still be unresolved or ambiguous; neither a right GUID nor a successful join proves extracted secrets.
- Pass-the-Hash cards are two investigative views. Type 9 can carry different outbound credentials from the local identity, and LSA logon identifiers are local. The seclogo pattern is implementation-dependent guidance retained from the article, not a universal signature established by this import.
- Sysmon 10 describes process access. Rights, their exercise, memory reads and recovered credentials are different claims. Signer/hash and ancestry may need separate enrichment. The masks are illustrative, not exhaustive coverage.

### Independently recomputed mask arithmetic

| Mask | Components combined with bitwise OR | Decimal result |
|---|---|---:|
`;
for(const r of masks)text+=`| ${r.mask} | ${r.components.join(' OR ')} | ${r.decimal} |\n`;
text+=`
The supplied validated flag is not accepted as proof. Tests recompute both values and reject six mutations to rights or component lists, including a duplicate component that would leave the OR result unchanged. This is arithmetic and consistency verification, not evidence of process access or credential theft.

## Verification

Overall: **${verification.passed&&browser.passed?'PASS':'FAIL / INCOMPLETE'}**. Source regression tests: **${tests}**. Reproduce with npm run research:uploads:verify.

| Gate | Result | Duration | Evidence |
|---|---|---:|---|
`;
for(const s of verification.steps)text+=`| ${s.id} | ${s.exit_code===0?'PASS':'FAIL'}${s.identical_visual_assets?`; ${s.identical_visual_assets} byte-identical public files`:''} | ${s.seconds}s | [log](${s.log}) |\n`;
text+=`
- ${browser.assets.length} variant slots checked: 20 active SVG variants and both slots for each of 45 unchanged raster images. A reused raster is not a separate mobile design.
- Six width/theme configurations: 390, 768 and 1440 pixels in light and dark themes. All 55 figures load with correct aspect ratios; no page overflow or JavaScript errors were reported.
- All 55 text-equivalent panels are expanded for two targeted accessibility rules concerning prose links and keyboard-focusable scrolling regions. This is not full accessibility certification. Dense bitmap labels do not reflow; HTML equivalents and full-resolution links provide alternatives.
- Section 6 prose matches its maintained source after removing figure tags. Tests cover exact subsection placement, unchanged figure numbers, source codes, all package hashes and 2400 × 3000 dimensions.
- A direct unzip -p / cmp comparison against the original ZIP passed for all nine imported members, independently of the supplied manifest and extracted-directory hashes.
- Preservation checks cover 153 original heading anchors, 192 article routes/canonicals, 44 historical images and the existing query evidence. The article catalog remains at 99 images: 55 inline plus 44 historical. All 66 retired SVG asset URLs remain available.
- [Structured verification](verification.json), [browser results](browser-validation.json), [contact sheet 6](contact-sheet-6.png) and [contact sheet 7](contact-sheet-7.png), together with the eight screenshots above, record the local rendering. No production publication is claimed.

## Provenance

The four new PNGs total **${rows.reduce((n,{p})=>n+p.bytes,0).toLocaleString('en-US')} bytes**. All 45 supplied images total **${provenance.images.reduce((n,p)=>n+p.bytes,0).toLocaleString('en-US')} bytes**. Files are unchanged, not recompressed. Inline images are lazy-loaded; no whole-site performance benchmark was run.

| Original | Dimensions | SHA-256 |
|---|---|---|
`;
for(const {p} of rows)text+=`| ${p.original} | ${p.width} × ${p.height} | ${p.sha256} |\n`;
text+='\n### Supporting files\n\n';
for(const d of credentialDocuments){const p=provenance.documents.find(p=>p.file===d.file);text+=`- [${d.original}](../../static/research/anomaly-visuals/${d.file}): ${p.bytes} bytes; SHA-256 ${p.sha256}.\n`;}
text+=`\nZIP SHA-256: **${provenance.archives.find(a=>a.name==='credential_attacks_6_1_to_6_4.zip').sha256}**. The importer checks supplied image metadata and hashes before copying. Build verification recursively compares every public visual file with its built copy.\n\n[Provenance](../../research/anomaly-visuals/uploads-provenance.json), [reviewed specifications](../../research/anomaly-visuals/uploaded-credentials.mjs) and [public visual manifest](../../static/research/anomaly-visuals/manifest.json) bind the local edition. Earlier batch reports remain untouched historical snapshots.\n`;
writeFileSync(new URL(dir+'REPORT.md',root),text);
console.log('Wrote '+dir+'REPORT.md');
