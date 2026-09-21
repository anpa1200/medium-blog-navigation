import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {figures,base,entropy} from '../research/anomaly-visuals/figures.mjs';
import {insertFigures,renderFigure} from '../scripts/lib/anomaly-visuals.mjs';
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

test('43 distinct figures cover all 15 topics and 12 campaign subsections',()=>{
  assert.equal(figures.length,43);assert.equal(new Set(figures.map(f=>f.id)).size,43);
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
    for(const narrow of [false,true]){
      const {svg,width,height}=renderFigure(f,narrow);
      assert.match(svg,/<title id="title">/);assert.match(svg,/<desc id="desc">/);
      assert.match(svg,/role="img" aria-labelledby="title desc"/);
      assert.ok(width>0&&height>0);
      assert.ok(!/<(?:script|foreignObject|image)\b|\son[a-z]+\s*=|(?:javascript|data):/i.test(svg));
    }
  }
});
test('86 local SVGs match deterministic rendering and evidence hashes',()=>{
  assert.equal(manifest.figures.length,43);
  for(const [path,expected] of Object.entries(manifest.source_sha256))assert.equal(hash(read(path)),expected,path);
  for(const f of manifest.figures)for(const [variant,a] of Object.entries(f.assets)){
    const path='static/research/anomaly-visuals/'+a.name;assert.ok(existsSync(new URL(path,root)));
    assert.equal(hash(read(path)),a.sha256);assert.equal(read(path),renderFigure(f,variant==='mobile').svg);
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
  assert.equal(article.images,87);
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
  assert.ok(text.includes('43 new inline diagrams'));
});
test('critical incident corrections retain the right source and scope',()=>{
  const storm=figures.find(f=>f.id==='case-storm');
  assert.ok(storm.sources.some(s=>s.url.startsWith('https://www.cisa.gov/')&&s.url.endsWith('.pdf')));
  assert.ok(storm.panels[0].text.includes('Big Yellow Taxi'));
  assert.ok(storm.boundary.includes('separate campaign'));
  assert.ok(storm.caption.includes('author’s proposed detector'));
  assert.ok(figures.find(f=>f.id==='case-midnight').panels[0].text.includes('full_access_as_app'));
  assert.ok(figures.find(f=>f.id==='case-moveit').boundary.includes('SQL-backed'));
  assert.ok(figures.find(f=>f.id==='case-volt').panels[1].text.includes('on the DC'));
});
