#!/usr/bin/env node
// Render maintained prose/query sources into one existing article; no new HTML routes.
import {readFileSync,writeFileSync,mkdirSync,existsSync,readdirSync} from 'node:fs';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import Slugger from 'github-slugger';

const root=resolve(fileURLToPath(new URL('..',import.meta.url)));
const read=p=>readFileSync(resolve(root,p),'utf8');
const revision='research/anomaly-revision';
const validation='research/anomaly-validation';
const data=JSON.parse(read('research/anomaly-incidents.json'));
const article=JSON.parse(read('src/data/article-catalog.json')).find(r=>r.id===data.article_id);
const path=`docs/articles/${article.local_path}.md`;
const old=read(path);
const inventory=JSON.parse(read(`${revision}/original-inventory.json`));
const sourceBlock=old.match(/<!-- anomaly-evidence:sources:start -->[\s\S]*?<!-- anomaly-evidence:sources:end -->/)[0];
const prefix=old.slice(0,old.indexOf('## 3. Mapping'));
if(!prefix)throw Error('Missing section boundary');
let body=readdirSync(resolve(root,revision)).filter(n=>/^\d\d-.*\.md$/.test(n)).sort().map(n=>read(`${revision}/${n}`).trim()).join('\n\n')+'\n';
body=body.replace(/<!-- anomaly-evidence:sources:start -->[\s\S]*?<!-- anomaly-evidence:sources:end -->/,()=>sourceBlock);
const queries={};
body=body.replace(/<!-- validated-query:([a-z-]+) -->/g,(_,name)=>{
  const text=read(`${validation}/queries/${name}.kql`).trim();queries[name]=text;
  return `<!-- query-source:${name}:start -->\n\`\`\`kusto\n${text}\n\`\`\`\n<!-- query-source:${name}:end -->`;
});
const functionalPath=`${validation}/results/functional-results.json`;
const functional=existsSync(resolve(root,functionalPath))?JSON.parse(read(functionalPath)):null;
let result='**Engine validation pending.** No successful target-engine run is claimed. See the downloadable execution report for attempted tests and any errors.';
if(functional?.functional_passed){
  for(const name of ['run_validation.py','contracts.json','datasets.json']){
    const actual=createHash('sha256').update(read(`${validation}/${name}`)).digest('hex');
    if(actual!==functional.implementation_sha256?.[name])throw Error('Functional results stale for '+name);
  }
  for(const [name,text] of Object.entries(queries)){
    const actual=createHash('sha256').update(read(`${validation}/queries/${name}.kql`)).digest('hex');
    if(actual!==functional.query_sha256[`${name}.kql`])throw Error('Results stale for '+name);
  }
  result=`**Measured functional result:** ${functional.synthetic_tests.filter(x=>x.passed).length}/${functional.synthetic_tests.length} synthetic KQL regression cases and ${functional.offline_checks.filter(x=>x.passed).length}/${functional.offline_checks.length} offline checks passed. This is test-suite completion, not a detection-accuracy percentage.\n\n| Public lab recording | Input records | Query output rows | Interpretation |\n|---|---:|---:|---|\n`;
  for(const r of functional.public_recordings)result+=`| ${r.id} | ${r.input_records} | ${r.output_rows} | ${r.id==='kerberoasting'?'Low-volume case falls below the breadth threshold; known blind spot.':'Candidate observations, not individually labeled true positives.'} |\n`;
  result+='\nFull outputs, input-record hashes, query hashes, engine identity and limits are in the [functional report](https://1200km.com/articles/research/anomaly-validation/functional-results.json).';
}
body=body.replace('<!-- validated-results -->',()=>result);
const study=JSON.parse(read(`${validation}/results/synthetic-study.json`));
if(createHash('sha256').update(read(`${validation}/statistical_study.py`)).digest('hex')!==study.implementation_sha256)throw Error('Synthetic study results stale');
let stats=`**Synthetic experiment, not enterprise performance:** ${study.dataset_rows} entity-days across ${study.selection_and_splits.entities} generated entities. Training uses days 0–27, validation 28–41 and the frozen test 42–55. The test contains ${study.test_positives} labeled generated attack entity-days and ${study.test_negatives} generated benign entity-days. Parameters are selected on validation, not the test; gated MAD reuses the ungated threshold to isolate the gate's effect.\n\n| Model | TP | FP | FN | TN | Precision | Recall |\n|---|---:|---:|---:|---:|---:|---:|\n`;
for(const row of study.models){const r=row.test;stats+=`| ${row.model} | ${r.tp} | ${r.fp} | ${r.fn} | ${r.tn} | ${(100*r.precision).toFixed(1)}% | ${(100*r.recall).toFixed(1)}% |\n`;}
stats+='\nIn this constructed example, robust scale is not a free improvement: role variation, sparse counts, scheduled work and legitimate test-period drift affect the results. Corroboration removes both benign alerts and generated attacks. The generator deliberately makes the corroborating signal more likely for attacks; its apparent usefulness is therefore an assumption of this toy world, not a discovery about real telemetry. Read the [study specification and results](https://1200km.com/articles/research/anomaly-validation/synthetic-study.json) and [generated dataset](https://1200km.com/articles/research/anomaly-validation/synthetic-study.csv). Reproduce with `python3 research/anomaly-validation/statistical_study.py`.';
body=body.replace('<!-- statistical-results -->',()=>stats);
body=body.replace('<!-- historical-media -->',()=>'<details>\n<summary>Historical figures from the original edition — superseded, not implementation guidance</summary>\n\n'+inventory.images.slice(1).map((image,i)=>`**Historical figure ${i+2}.** Original illustration retained; consult the corrected text for current definitions, event fields and evidence boundaries.\n\n${image}`).join('\n\n')+'\n\n</details>');
function anchors(text){
  const s=new Slugger(),ids=[];
  text=text.replace(/^```[^\n]*\n[\s\S]*?^```[ \t]*$/gm,'');
  // Docusaurus strips H1 IDs; the retained title fragment needs an explicit span.
  for(const m of text.matchAll(/^#{2,6} (.+)$/gm)){const id=m[1].match(/\{#([^}]+)\}/);ids.push(id?id[1]:s.slug(m[1]));}
  for(const m of text.matchAll(/<span id="([^"]+)">/g))ids.push(m[1]);
  return ids;
}
const present=new Set(anchors(prefix+body));
const missing=inventory.anchors.filter(id=>!present.has(id));
body=body.replace('<!-- preserved-anchors -->',()=>missing.map(id=>`<span id="${id}"></span>`).join('\n'));
const output=(prefix+body).replace(/\[([^\]]+)\]\((https:\/\/1200km\.com\/[^\s)]*)\)/g,
  (_,label,url)=>`<a href="${url}" target="_self">${label}</a>`);
const historical='# Historical query exports — superseded and unsafe to deploy\n\nThese are preserved verbatim from the pre-revision article for auditability. They contain documented syntax, schema and logic errors. Use the maintained query files and their explicit validation status instead.\n\n'+inventory.legacy_code.map((code,i)=>`## Historical block ${i+1}\n\n${code}`).join('\n\n')+'\n';
const bundle={schema_version:1,article_id:article.id,contracts:JSON.parse(read(`${validation}/contracts.json`)),datasets:JSON.parse(read(`${validation}/datasets.json`)),queries,functional,synthetic_study:study};
const files=new Map([[path,output],['static/research/anomaly-historical-code.md',historical],['static/research/anomaly-validation/bundle.json',JSON.stringify(bundle,null,2)+'\n']]);
for(const name of ['contracts.json','datasets.json'])files.set(`static/research/anomaly-validation/${name}`,read(`${validation}/${name}`));
for(const name of ['README.md','THIRD_PARTY_NOTICES.md','SPLUNK-LICENSE.txt'])if(existsSync(resolve(root,`${validation}/${name}`)))files.set(`static/research/anomaly-validation/${name}`,read(`${validation}/${name}`));
for(const name of ['functional-results.json','synthetic-study.json','synthetic-study.csv'])if(existsSync(resolve(root,`${validation}/results/${name}`)))files.set(`static/research/anomaly-validation/${name}`,read(`${validation}/results/${name}`));
for(const [name,text] of Object.entries(queries))files.set(`static/research/anomaly-validation/${name}.kql`,text+'\n');
for(const [name,content] of files){
  if(process.argv.includes('--check')){if(!existsSync(resolve(root,name))||read(name)!==content)throw Error('Stale revision output: '+name);}
  else{mkdirSync(resolve(root,name,'..'),{recursive:true});writeFileSync(resolve(root,name),content);}
}
console.log(`Revision ${process.argv.includes('--check')?'current':'rendered'}: ${Object.keys(queries).length} canonical queries, ${inventory.images.length} preserved historical images, ${missing.length} legacy anchor aliases.`);
