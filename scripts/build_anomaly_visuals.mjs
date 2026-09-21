#!/usr/bin/env node
import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {figures} from '../research/anomaly-visuals/figures.mjs';
import {renderFigure} from './lib/anomaly-visuals.mjs';
const root=new URL('../',import.meta.url), check=process.argv.includes('--check');
const hash=s=>createHash('sha256').update(s).digest('hex');
const out='static/research/anomaly-visuals/';
const manifest={schema_version:1,revision:'2026-09-21',scope:'Author-reviewed diagrams tied to the revised manuscript and versioned evidence. Not independent certification or production validation.',source_sha256:{},figures:[]};
for(const path of ['research/anomaly-visuals/figures.mjs','scripts/lib/anomaly-visuals.mjs','research/anomaly-revision/family-contracts.json','research/anomaly-incidents.json','research/anomaly-validation/results/functional-results.json','research/anomaly-validation/results/synthetic-study.json'])manifest.source_sha256[path]=hash(readFileSync(new URL(path,root)));
function save(path,data){
  const url=new URL(path,root);
  if(check){if(!existsSync(url)||readFileSync(url,'utf8')!==data)throw Error('Stale visual asset: '+path);}
  else {mkdirSync(new URL('.',url),{recursive:true});writeFileSync(url,data);}
}
for(const [i,f] of figures.entries()){
  const entry={...f,number:i+1,assets:{}};
  for(const [variant,mobile] of [['desktop',false],['mobile',true]]){
    const r=renderFigure(f,mobile),name=`${f.id}${mobile?'-mobile':''}.svg`;
    save(out+name,r.svg);entry.assets[variant]={name,width:r.width,height:r.height,sha256:hash(r.svg)};
  }
  manifest.figures.push(entry);
}
save(out+'manifest.json',JSON.stringify(manifest,null,2)+'\n');
console.log(`${check?'Verified':'Rendered'} ${figures.length} figures / ${figures.length*2} SVG assets with evidence-bound manifest.`);
