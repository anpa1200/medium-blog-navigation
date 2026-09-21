import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import Slugger from 'github-slugger';

const root=new URL('../',import.meta.url);
const read=p=>readFileSync(new URL(p,root),'utf8');
const json=p=>JSON.parse(read(p));
const article=json('src/data/article-catalog.json').find(r=>r.id==='90df8b6dea12');
const text=read(`docs/articles/${article.local_path}.md`);
const historical=json('research/anomaly-revision/original-inventory.json');
const ledger=json('research/anomaly-revision/issues.json');
const functional=json('research/anomaly-validation/results/functional-results.json');
const study=json('research/anomaly-validation/results/synthetic-study.json');
const hash=s=>createHash('sha256').update(s).digest('hex');

function ids(markdown){
  const s=new Slugger(),all=[];
  for(const m of markdown.replace(/^```[^\n]*\n[\s\S]*?^```[ \t]*$/gm,'').matchAll(/^#{2,6} (.+)$/gm)){
    const explicit=m[1].match(/\{#([^}]+)\}/);all.push(explicit?explicit[1]:s.slug(m[1]));
  }
  for(const m of markdown.matchAll(/<span id="([^"]+)">/g))all.push(m[1]);
  return all;
}

test('all previous article anchors are retained without duplicates',()=>{
  const all=ids(text);assert.equal(new Set(all).size,all.length);
  for(const id of historical.anchors)assert.ok(all.includes(id),`Missing old anchor ${id}`);
});
test('local TOC fragments resolve',()=>{
  const all=new Set(ids(text));
  for(const match of text.matchAll(/\]\(#([^\s)]+)\)/g))assert.ok(all.has(match[1]),match[1]);
});
test('one title, subtitle, meaningful footer and no orphaned query placeholders',()=>{
  assert.equal((text.match(/^# /gm)||[]).length,1);
  assert.match(text,/^# .+\n\n\*\*.+\*\*/m);
  assert.match(text,/## Follow My Work[\s\S]+mailto:1200km@gmail.com/);
  assert.ok(!/<!-- validated-query:|<!-- validated-results|<!-- statistical-results/.test(text));
});
test('all original findings and review rows have reconciled dispositions',()=>{
  const issueIds=new Set(ledger.issues.map(i=>i.id));
  for(let i=1;i<=36;i++)assert.ok(issueIds.has(`R${String(i).padStart(2,'0')}`));
  for(let i=1;i<=16;i++)assert.ok(issueIds.has(`E${String(i).padStart(2,'0')}`));
  assert.equal(issueIds.size,ledger.issues.length);
  for(const issue of ledger.issues){assert.ok(issue.resolution.length>25);assert.ok(issue.location);}
  assert.equal(ledger.issues.find(i=>i.id==='R23').status,'documented_conflict_not_resolved_upstream');
});
test('rendered KQL is exactly the tested canonical query source',()=>{
  for(const name of ['run_validation.py','contracts.json','datasets.json'])assert.equal(hash(read(`research/anomaly-validation/${name}`)),functional.implementation_sha256[name]);
  let found=0;
  for(const m of text.matchAll(/<!-- query-source:([a-z-]+):start -->\n```kusto\n([\s\S]*?)\n```/g)){
    found++;const file=read(`research/anomaly-validation/queries/${m[1]}.kql`);
    assert.equal(m[2],file.trim());assert.equal(hash(file),functional.query_sha256[`${m[1]}.kql`]);
  }
  assert.equal(found,8);
  assert.ok(functional.functional_passed);
  assert.equal(functional.synthetic_tests.length,34);
  assert.ok(functional.synthetic_tests.every(r=>r.passed));
  assert.equal(functional.sentinel_ingestion_tested,false);
  assert.equal(functional.production_precision,null);
});
test('public replay preserves the single-ticket miss and real source correlation',()=>{
  const k=functional.public_recordings.find(r=>r.id==='kerberoasting');
  assert.equal(k.input_records,1);assert.equal(k.output_rows,0);
  const d=functional.public_recordings.find(r=>r.id==='dcsync');
  assert.equal(d.output.length,4);
  assert.ok(d.output.every(row=>row.SourceStatus==='correlated'&&row.SourceIP==='10.0.1.15'));
  assert.ok(functional.synthetic_tests.find(row=>row.name==='replication-missing-logon-retained').passed);
  for(const r of functional.public_recordings)assert.equal(r.output_rows,r.output.length);
});
test('synthetic study is labeled and does not hide gate recall loss',()=>{
  assert.equal(hash(read('research/anomaly-validation/statistical_study.py')),study.implementation_sha256);
  assert.equal(study.kind,'synthetic-sensitivity-experiment');
  assert.equal(hash(read('research/anomaly-validation/results/synthetic-study.csv')),study.dataset_sha256);
  const ungated=study.models.find(x=>x.model==='entity-mad').test;
  const gated=study.models.find(x=>x.model==='entity-mad-gated').test;
  assert.ok(gated.tp<ungated.tp);assert.ok(gated.fp<ungated.fp);
  for(const m of study.models){const x=m.test;assert.equal(x.tp+x.fp+x.fn+x.tn,x.evaluation_entity_days);}
  assert.match(text,/not enterprise performance/);
});
test('corrected guidance does not regress to known dangerous claims',()=>{
  const active=text.split('### 9.8 Historical illustrations')[0];
  for(const phrase of ['near-zero legitimate prevalence','improving precision without sacrificing recall',
    'Default: not enabled','clustering (K-Means, TF-IDF)','hash is presented directly','no signals in environments without SaaS']){
    assert.ok(!active.includes(phrase),phrase);
  }
  for(const phrase of ['full_access_as_app','Big Yellow Taxi','1102','104','5001','5007','TTLs','JA4','zero-MAD'])assert.ok(active.includes(phrase),phrase);
});
test('all historical images and code remain available but explicitly superseded',()=>{
  assert.deepEqual([...text.matchAll(/<img\b[^>]*>/g)].map(m=>m[0]),historical.images);
  assert.match(text,/Historical figures from the original edition — superseded/);
  assert.match(read('static/research/anomaly-historical-code.md'),/unsafe to deploy/);
});
