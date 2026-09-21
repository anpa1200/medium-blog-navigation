import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {figures,base,entropy} from '../research/anomaly-visuals/figures.mjs';
import {insertFigures,renderFigure} from '../scripts/lib/anomaly-visuals.mjs';
import {imageMetadata} from '../scripts/lib/uploaded-image-metadata.mjs';
import {validateRegisterSnapshot,registerUpload} from '../research/anomaly-visuals/uploaded-taxonomy-continuation.mjs';
import {incidentUploads,incidentSourceNotes} from '../research/anomaly-visuals/uploaded-incidents.mjs';
import {detectionUploads,detectionDocuments,detectionSources,validateDetectionCalculations} from '../research/anomaly-visuals/uploaded-detection-sources.mjs';
import {credentialUploads,credentialDocuments,credentialSources,validateCredentialMasks} from '../research/anomaly-visuals/uploaded-credentials.mjs';
const root=new URL('../',import.meta.url),read=p=>readFileSync(new URL(p,root),'utf8'),json=p=>JSON.parse(read(p));
const manifest=json('static/research/anomaly-visuals/manifest.json');
const article=json('src/data/article-catalog.json').find(x=>x.id==='90df8b6dea12');
const text=read(`docs/articles/${article.local_path}.md`);
const hash=s=>createHash('sha256').update(s).digest('hex');

test('caption links and scrolling tables retain keyboard and non-color affordances',()=>{
  const css=read('src/css/custom.css');
  assert.match(css,/\.anomaly-figure figcaption a,[\s\S]*?text-decoration: underline/);
  assert.match(css,/table:focus-visible/);
  assert.match(read('src/theme/MDXComponents/index.js'),/<table tabIndex=\{0\}/);
  assert.match(read('src/components/ResearchFigure/index.js'),/<pre tabIndex=\{0\}/);
});

test('55 distinct figures cover definitions, topics, register, campaigns, sources and credential attacks',()=>{
  assert.equal(figures.length,55);assert.equal(new Set(figures.map(f=>f.id)).size,55);
  const types=json('research/anomaly-incidents.json').types;
  assert.deepEqual(figures.filter(f=>f.id.startsWith('family-')).map(f=>f.id.slice(7)),types.map(t=>t.id));
  assert.equal(figures.filter(f=>f.id.startsWith('case-')).length,12);
});
test('every figure is inline exactly once, in numbered reading order, before the historical appendix',()=>{
  const refs=[...text.matchAll(/<ResearchFigure id="([^"]+)" \/>/g)].map(x=>x[1]);
  assert.deepEqual(refs,figures.map(f=>f.id));
  assert.equal(insertFigures(text),text);
  const historical=text.indexOf('### 9.8 Historical illustrations');
  for(const f of figures){const at=text.indexOf(`<ResearchFigure id="${f.id}" />`);assert.ok(at<historical);assert.ok(text.includes(f.before));}
});
test('figure placements fail closed if a required boundary changes',()=>{
  assert.throws(()=>insertFigures(text.replace('### 6.2 DCSync','### 6.2 Renamed')),/placement/);
});
test('each graphic has evidence labels, source links, a boundary and accessible metadata',()=>{
  for(const f of figures){
    assert.ok(f.evidence&&f.caption.length>50&&f.boundary.length>35&&f.section&&f.sources.length);
    for(const s of f.sources){assert.equal(new URL(s.url).protocol,'https:');assert.ok(s.label);}
    if(f.upload){assert.ok(f.transcript.length>=3);continue;}
    for(const narrow of [false,true]){
      const {svg,width,height}=renderFigure(f,narrow);
      assert.match(svg,/<title id="title">/);assert.match(svg,/<desc id="desc">/);
      assert.match(svg,/role="img" aria-labelledby="title desc"/);
      assert.ok(width>0&&height>0);
      assert.ok(!/<(?:script|foreignObject|image)\b|\son[a-z]+\s*=|(?:javascript|data):/i.test(svg));
    }
  }
});
test('20 active SVG variants and 45 original PNG/JPEG uploads match evidence hashes',()=>{
  assert.equal(manifest.figures.length,55);
  assert.equal(figures.filter(f=>!f.upload).length*2,20);
  assert.equal(figures.filter(f=>f.upload).length,45);
  for(const [path,expected] of Object.entries(manifest.source_sha256))assert.equal(hash(read(path)),expected,path);
  for(const f of manifest.figures)for(const [variant,a] of Object.entries(f.assets)){
    const path='static/research/anomaly-visuals/'+a.name;assert.ok(existsSync(new URL(path,root)));
    assert.equal(hash(readFileSync(new URL(path,root))),a.sha256);
    if(f.upload){assert.equal(a.format,imageMetadata(readFileSync(new URL(path,root))).format);continue;}
    assert.equal(read(path),renderFigure(f,variant==='mobile').svg);
  }
});
test('base-rate arithmetic and entropy examples are exact',()=>{
  assert.equal(base.fp,10000);assert.equal(base.tp,90);assert.equal(base.fn,10);assert.equal(base.tn,990000);
  assert.equal((base.precision*100).toFixed(2),'0.89');
  assert.equal(Math.abs(entropy('aaaa')),0);assert.equal(entropy('abab'),1);assert.equal(entropy('abcd'),2);
});
test('the social-preview PNG is bound to the current SVG and catalog metadata',()=>{
  const p=json('static/research/anomaly-visuals/cover-provenance.json');
  assert.equal(hash(read(`static/research/anomaly-visuals/${p.source}`)),p.source_sha256);
  assert.equal(hash(readFileSync(new URL('static/research/anomaly-visuals/research-map.png',root))),p.png_sha256);
  assert.equal(article.cover_image,'https://1200km.com/articles/research/anomaly-visuals/research-map.png');
  assert.equal(article.images,99);
});
test('measured visuals use the recorded outputs without concealing the zero-match case',()=>{
  const d=figures.find(f=>f.id==='validation-levels').data;
  assert.deepEqual([d.kqlPassed,d.kqlTotal,d.offlinePassed,d.offlineTotal],[34,34,8,8]);
  assert.deepEqual(d.replay.find(r=>r.id==='kerberoasting'),{id:'kerberoasting',input:1,output:0});
  const s=json('research/anomaly-validation/results/synthetic-study.json');
  assert.deepEqual(figures.find(f=>f.id==='study-results').data,s.models.map(r=>({model:r.model,...r.test})));
  for(const row of s.models){const r=row.test;assert.equal(r.precision,r.tp/(r.tp+r.fp));assert.equal(r.recall,r.tp/(r.tp+r.fn));assert.equal(r.tp+r.fn,s.test_positives);assert.equal(r.fp+r.tn,s.test_negatives);}
  const u=s.models.find(r=>r.model==='entity-mad').test,g=s.models.find(r=>r.model==='entity-mad-gated').test;
  assert.equal(u.fp-g.fp,77);assert.equal(u.tp-g.tp,7);
});
test('no old images or measured query evidence is overwritten by the visual replacement',()=>{
  const inv=json('research/anomaly-revision/original-inventory.json');
  const appendix=text.slice(text.indexOf('### 9.8 Historical illustrations'));
  for(const img of inv.images)assert.ok(appendix.includes(img));
  assert.equal((appendix.match(/<img\b/g)||[]).length,44);
  assert.ok(text.includes('55 inline figures'));
});
test('all user originals have unchanged bytes and verified PNG/JPEG dimensions',()=>{
  const provenance=json('research/anomaly-visuals/uploads-provenance.json');
  assert.equal(provenance.images.length,45);
  assert.equal(provenance.archives.length,5);
  for(const p of provenance.images){
    const bytes=readFileSync(new URL('static/research/anomaly-visuals/'+p.file,root));
    assert.equal(hash(bytes),p.sha256);assert.equal(bytes.length,p.bytes);
    const metadata=imageMetadata(bytes);
    assert.deepEqual([metadata.width,metadata.height],[p.width,p.height]);
  }
});
test('uploaded concepts and taxonomy figures appear in their exact sections',()=>{
  const uploaded=figures.filter(f=>f.upload);assert.equal(uploaded.length,45);
  for(const id of ['statistical-forms','definition-contextual','definition-collective','definition-correlation']){
    const pos=text.indexOf(`<ResearchFigure id="${id}" />`);
    assert.ok(pos>text.indexOf('### 1.1 Definitions')&&pos<text.indexOf('### 1.2 The Central Tension'));
  }
  assert.deepEqual(uploaded.filter(f=>f.id.startsWith('family-')).map(f=>f.section.split(' ')[0]),Array.from({length:15},(_,i)=>`2.${i+1}`));
  for(let n=11;n<=15;n++){
    const f=uploaded.find(f=>f.section.startsWith(`2.${n} `));
    const pos=text.indexOf(`<ResearchFigure id="${f.id}" />`);
    assert.ok(pos>text.indexOf(`### 2.${n} `)&&pos<text.indexOf(`### 2.${n+1} `));
  }
  const registerPos=text.indexOf('<ResearchFigure id="incident-register" />');
  assert.ok(registerPos>text.indexOf('### 2.16 Incident register'));
  assert.ok(registerPos<text.indexOf('| Case / campaign record |'));
  assert.ok(figures.find(f=>f.id==='definition-contextual').caption.includes('Install From Media'));
  assert.ok(figures.find(f=>f.id==='definition-collective').caption.includes('assumptions'));
  assert.ok(figures.find(f=>f.id==='family-rare-process-service').caption.includes('not a 5% attack probability'));
});
test('malformed or truncated raster headers fail closed',()=>{
  for(const bytes of [Buffer.alloc(0),Buffer.from('not an image'),Buffer.from('ffd8ffe00000','hex'),Buffer.from('89504e470d0a1a0a','hex')])assert.throws(()=>imageMetadata(bytes),/Unsupported or malformed/);
});
test('the register image is tied to real counts and fails closed on count/date changes',()=>{
  const data=json('research/anomaly-incidents.json');
  assert.doesNotThrow(()=>validateRegisterSnapshot(data));
  assert.equal(registerUpload.registerSnapshot.families,14);
  const mutations=[d=>d.types.push({...d.types[0],id:'new-family'}),d=>d.types[0].examples.pop(),d=>delete d.cases[Object.keys(d.cases)[0]],d=>{d.reviewed_at='2026-09-22';}];
  for(const mutate of mutations){const changed=structuredClone(data);mutate(changed);assert.throws(()=>validateRegisterSnapshot(changed),/graphic is stale/);}
  assert.equal(figures.find(f=>f.id==='incident-register').evidence,'ARTICLE SCOPE SNAPSHOT · USER-SUPPLIED');
});
test('absence timing and correlation caveats match the supplied illustrations',()=>{
  assert.deepEqual([15,20,25].map(t=>t+2),[17,22,27]);
  assert.ok([17,22,27].every(deadline=>28>deadline));
  const absence=figures.find(f=>f.id==='family-negative-absence');
  assert.ok(absence.caption.includes('minute 28'));
  assert.ok(absence.transcript.some(t=>t.includes('17, 22 and 27')));
  assert.ok(figures.find(f=>f.id==='family-multi-event-correlation').caption.includes('not another anomaly family'));
});
test('replaced SVG asset URLs and the old combined-figure anchor remain available',()=>{
  assert.ok(figures.some(f=>f.id==='statistical-forms'));
  const retired=['statistical-forms','dns-entropy',...figures.filter(f=>f.upload&&(f.id.startsWith('family-')||f.id.startsWith('case-')||f.id.startsWith('credential-'))).map(f=>f.id)];
  assert.equal(retired.length*2,66);
  for(const id of retired)for(const suffix of ['', '-mobile'])assert.ok(existsSync(new URL(`static/research/anomaly-visuals/${id}${suffix}.svg`,root)));
});
test('critical incident corrections retain the right source and scope',()=>{
  const storm=figures.find(f=>f.id==='case-storm');
  assert.ok(storm.sources.some(s=>s.url.startsWith('https://www.cisa.gov/')&&s.url.endsWith('.pdf')));
  assert.ok(storm.transcript.some(t=>t.includes('Big Yellow Taxi')));
  assert.ok(storm.boundary.includes('separate campaign'));
  assert.ok(storm.caption.includes('author’s proposed detector'));
  assert.ok(figures.find(f=>f.id==='case-midnight').transcript.some(t=>t.includes('full_access_as_app')));
  assert.ok(figures.find(f=>f.id==='case-moveit').boundary.includes('SQL-backed'));
  assert.ok(figures.find(f=>f.id==='case-volt').transcript.some(t=>t.includes('on the DC')));
});
test('all 12 incident uploads replace only their matching Section 4 figures',()=>{
  const cases=figures.filter(f=>f.id.startsWith('case-'));
  assert.deepEqual(cases.map(f=>f.id),incidentUploads.map(f=>f.id));
  assert.equal(cases.length,12);
  for(const [i,f] of cases.entries()){
    assert.ok(f.section.startsWith(`4.${i+1} `));
    assert.ok(f.upload&&!f.panels);
    assert.equal(f.evidence,'SOURCE-REPORTED + AUTHOR INFERENCE · USER-SUPPLIED');
    const pos=text.indexOf(`<ResearchFigure id="${f.id}" />`);
    assert.ok(pos>text.indexOf(`### 4.${i+1} `)&&pos<text.indexOf(f.before));
    const a=manifest.figures.find(x=>x.id===f.id).assets.desktop;
    assert.deepEqual([a.width,a.height,a.format],[2400,3000,'png']);
  }
});
test('supplied source key stays byte-bound and all S01-S14 codes resolve near their images',()=>{
  const p=json('research/anomaly-visuals/uploads-provenance.json').documents.filter(p=>p.file===incidentSourceNotes.file);
  assert.equal(p.length,1);assert.equal(p[0].file,incidentSourceNotes.file);
  const path='static/research/anomaly-visuals/'+p[0].file,notes=read(path);
  assert.equal(hash(notes),p[0].sha256);
  assert.equal(Buffer.byteLength(notes),p[0].bytes);
  assert.equal(manifest.source_sha256[path],p[0].sha256);
  assert.match(p[0].import,/not instructions or independent validation/);
  const codes=incidentUploads.flatMap(f=>f.sourceCodes);
  assert.deepEqual(codes,Array.from({length:14},(_,i)=>`S${String(i+1).padStart(2,'0')}`));
  for(const f of incidentUploads)for(const code of f.sourceCodes){
    assert.ok(notes.includes(`### [${code}]`));
    assert.equal(f.sources.filter(s=>s.label.startsWith(code+' ·')).length,1);
    assert.ok(notes.includes(f.sources.find(s=>s.label.startsWith(code+' ·')).url));
  }
});
test('incident captions qualify channel overlap, separate reports, source limits and attribution',()=>{
  const by=id=>figures.find(f=>f.id===id);
  assert.match(by('case-oilrig').caption,/same EWS sample also supported HTTP and DNS/);
  assert.match(by('case-storm').caption,/separate campaign/);
  assert.match(by('case-apt41').caption,/separate investigations/);
  assert.match(by('case-volt').caption,/Install From Media/);
  assert.match(by('case-impacket').caption,/full text was not independently re-read/);
  assert.ok(by('case-storm').transcript.some(t=>t.includes('could not be retrieved')));
  assert.match(by('case-3cx').caption,/did not settle actor attribution/);
  assert.match(by('case-conti').caption,/5001.*disabled real-time protection; 5007.*configuration changes/);
});
test('nine detection-source graphics occupy exactly their matching subsections without changing prose',()=>{
  const sources=figures.filter(f=>/^5\.\d /.test(f.section));
  assert.deepEqual(sources.map(f=>f.id),detectionUploads.map(f=>f.id));
  for(const [i,f] of sources.entries()){
    assert.ok(f.section.startsWith(`5.${i+1} `));
    const at=text.indexOf(`<ResearchFigure id="${f.id}" />`);
    assert.ok(at>text.indexOf(`### 5.${i+1} `)&&at<text.indexOf(f.before));
    const a=manifest.figures.find(m=>m.id===f.id).assets.desktop;
    assert.deepEqual([a.width,a.height,a.format],[2400,3000,'png']);
  }
  const body=text.slice(text.indexOf('## 5. Detection by Log Source'),text.indexOf('## 6. Credential-Based')).replace(/^<ResearchFigure id="[a-z0-9-]+" \/>\n\n/gm,'').trim();
  assert.equal(body,read('research/anomaly-revision/05-telemetry.md').trim());
  assert.ok(figures.find(f=>f.id==='telemetry-contract'&&!f.upload));
  assert.equal(sources.filter(f=>f.id==='dns-entropy').length,1);
});
test('all 14 detection-package members match supplied metadata and retained document hashes',()=>{
  const packageRoot='static/research/anomaly-visuals/uploaded-detection/';
  const supplied=json(packageRoot+'manifest.json'),transcripts=json(packageRoot+'accessible_text.json');
  const p=json('research/anomaly-visuals/uploads-provenance.json');
  assert.equal(supplied.length,9);assert.equal(transcripts.length,9);assert.equal(p.documents.length,11);
  for(const f of detectionUploads){
    const record=supplied.find(r=>r.section===f.section.split(' ')[0]);
    const bytes=readFileSync(new URL('static/research/anomaly-visuals/'+f.file,root));
    assert.equal(hash(bytes),record.sha256);
    assert.ok(f.original.endsWith('/'+record.filename));
    assert.deepEqual([record.width,record.height],[2400,3000]);
    const t=transcripts.find(t=>t.section===record.section);
    assert.ok(t.text.includes(record.section)&&t.text.length>500);
  }
  for(const f of detectionDocuments){
    const path='static/research/anomaly-visuals/'+f.file,bytes=readFileSync(new URL(path,root));
    const record=p.documents.find(p=>p.file===f.file);
    assert.equal(record.sha256,hash(bytes));assert.equal(record.bytes,bytes.length);
    assert.equal(manifest.source_sha256[path],record.sha256);
  }
});
test('DNS and SaaS synthetic figures fail closed if baked-in values or units drift',()=>{
  const data=json('static/research/anomaly-visuals/uploaded-detection/synthetic_calculations.json');
  const checked=validateDetectionCalculations(data,entropy);
  assert.deepEqual(figures.find(f=>f.id==='dns-entropy').data,checked.dns);
  assert.deepEqual(figures.find(f=>f.id==='source-saas').data,checked.saas);
  for(const mutate of [d=>d.dns[1].label='aaaa',d=>d.dns[1].frequencies.a=3,d=>d.dns[2].empirical_entropy_bits_per_character=3,d=>d.saas.audit_events=1,d=>d.saas.records[1].illustrative_event_id='E1',d=>d.saas.distinct_objects=3,d=>d.saas.transferred_bytes=0,d=>d.saas.unknown_is_not_zero=false]){
    const bad=structuredClone(data);mutate(bad);assert.throws(()=>validateDetectionCalculations(bad,entropy));
  }
});
test('source guides resolve their codes and keep EDR keys, cloud limits and planning scope explicit',()=>{
  const notes=read('static/research/anomaly-visuals/uploaded-detection/SOURCES_AND_EVIDENCE_NOTES.md');
  for(const f of detectionUploads)for(const code of f.sourceCodes){
    assert.ok(notes.includes(`### [${code}]`));
    assert.ok(detectionSources[code]?.url.startsWith('https://'));
    if(code!=='A')assert.ok(f.sources.some(s=>s.label.startsWith(code+' ·')));
  }
  const by=id=>figures.find(f=>f.id===id);
  assert.match(by('source-edr').caption,/ReportId \+ DeviceName \+ Timestamp/);
  assert.match(by('source-cloud').boundary,/No cloud account was exercised/);
  assert.match(by('source-ndr').caption,/TAP\/SPAN traffic copy/);
  assert.match(by('source-saas').caption,/unknown transferred bytes—not zero/);
  assert.match(by('source-prioritization').caption,/not.*endorsement or validation/);
});
test('four credential uploads replace their matching figures without changing Section 6 prose or numbering',()=>{
  const selected=figures.filter(f=>f.id.startsWith('credential-'));
  assert.deepEqual(selected.map(f=>f.id),credentialUploads.map(f=>f.id));
  for(const [i,f] of selected.entries()){
    assert.ok(f.upload&&!f.panels&&!f.steps);
    const at=text.indexOf(`<ResearchFigure id="${f.id}" />`);
    assert.ok(at>text.indexOf(`### 6.${i+1} `)&&at<text.indexOf(f.before));
    const m=manifest.figures.find(m=>m.id===f.id);
    assert.equal(m.number,46+i);
    assert.deepEqual([m.assets.desktop.width,m.assets.desktop.height,m.assets.desktop.format],[2400,3000,'png']);
  }
  const body=text.slice(text.indexOf('## 6. Credential-Based'),text.indexOf('## 7. How Attackers')).replace(/^<ResearchFigure id="[a-z0-9-]+" \/>\n\n/gm,'').trim();
  assert.equal(body,read('research/anomaly-revision/06-credentials.md').trim());
});
test('all nine credential-package members retain their original paths and hashes',()=>{
  const prefix='static/research/anomaly-visuals/',dir=prefix+'uploaded-credentials/';
  const supplied=json(dir+'manifest.json'),transcripts=json(dir+'accessible_text.json');
  const p=json('research/anomaly-visuals/uploads-provenance.json');
  assert.equal(supplied.length,4);assert.deepEqual(Object.keys(transcripts),['6.1','6.2','6.3','6.4']);
  for(const f of credentialUploads){
    const section=f.section.split(' ')[0],entry=supplied.find(r=>r.section===section);
    assert.equal(entry.file,f.original);assert.equal(f.file,'uploaded-credentials/'+entry.file);
    assert.equal(hash(readFileSync(new URL(prefix+f.file,root))),entry.sha256);
    assert.deepEqual([entry.width,entry.height],[2400,3000]);
    assert.ok(transcripts[section].includes(section)&&transcripts[section].length>500);
  }
  for(const f of credentialDocuments){
    const path=prefix+f.file,bytes=readFileSync(new URL(path,root)),record=p.documents.find(r=>r.file===f.file);
    assert.equal(hash(bytes),record.sha256);assert.equal(bytes.length,record.bytes);
    assert.equal(manifest.source_sha256[path],record.sha256);
  }
});
test('LSASS masks are independently recomputed and incorrect components fail even with validated true',()=>{
  const data=json('static/research/anomaly-visuals/uploaded-credentials/bitmask_checks.json');
  const checked=validateCredentialMasks(data);
  assert.deepEqual(checked.map(r=>r.decimal),[4112,5136]);
  assert.deepEqual(figures.find(f=>f.id==='credential-lsass').data,checked);
  assert.deepEqual(validateCredentialMasks({...data,validated:false}),checked);
  for(const mutate of [d=>d.PROCESS_VM_READ='0x0020',d=>d.PROCESS_QUERY_INFORMATION='0x0800',d=>d.PROCESS_QUERY_LIMITED_INFORMATION='0x2000',d=>d['0x1010_components'].push('0x0400'),d=>d['0x1410_components'].pop(),d=>d['0x1010_components']=['0x1000','0x0010','0x0010']]){
    const bad=structuredClone(data);mutate(bad);assert.throws(()=>validateCredentialMasks(bad));
  }
});
test('credential sources and captions retain field meanings, uncertainty and existing replay limits',()=>{
  const notes=read('static/research/anomaly-visuals/uploaded-credentials/SOURCES_AND_EVIDENCE_NOTES.md');
  for(const f of credentialUploads)for(const code of f.sourceCodes){
    assert.ok(notes.includes(`**[${code}]`));assert.ok(notes.includes(credentialSources[code].url));
    if(code!=='A')assert.ok(f.sources.some(s=>s.label.startsWith(code+' ·')));
  }
  const by=id=>figures.find(f=>f.id===id);
  assert.match(by('credential-kerberoast').caption,/zero matches.*no new replay/);
  assert.match(by('credential-kerberoast').caption,/not the supported-encryption-types bitmask/);
  assert.match(by('credential-dcsync').caption,/no native client-IP.*unresolved or ambiguous/);
  assert.match(by('credential-dcsync').boundary,/SACL selects auditing/);
  assert.match(by('credential-pth').caption,/host-local, not cross-host/);
  assert.match(by('credential-lsass').caption,/granted rights do not prove they were exercised/);
  for(const guid of ['1131f6aa-9c07-11d1-f79f-00c04fc2dcd2','1131f6ad-9c07-11d1-f79f-00c04fc2dcd2','89e95b76-444d-4c62-991a-0facbeda640c'])assert.ok(by('credential-dcsync').transcript.some(t=>t.includes(guid)));
});
