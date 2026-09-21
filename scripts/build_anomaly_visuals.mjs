#!/usr/bin/env node
import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {figures} from '../research/anomaly-visuals/figures.mjs';
import {renderFigure} from './lib/anomaly-visuals.mjs';
import {imageMetadata} from './lib/uploaded-image-metadata.mjs';
const root=new URL('../',import.meta.url), check=process.argv.includes('--check');
const hash=s=>createHash('sha256').update(s).digest('hex');
const out='static/research/anomaly-visuals/';
const provenance=JSON.parse(readFileSync(new URL('research/anomaly-visuals/uploads-provenance.json',root)));
const manifest={schema_version:1,revision:'2026-09-21',scope:'Author-reviewed diagrams tied to the revised manuscript and versioned evidence. Not independent certification or production validation.',source_sha256:{},figures:[]};
manifest.source_sha256['research/anomaly-visuals/uploaded-credentials.mjs']=hash(readFileSync(new URL('research/anomaly-visuals/uploaded-credentials.mjs',root)));
for(const path of ['research/anomaly-visuals/figures.mjs','research/anomaly-visuals/uploaded-figures.mjs','research/anomaly-visuals/uploaded-taxonomy-continuation.mjs','research/anomaly-visuals/uploaded-incidents.mjs','research/anomaly-visuals/uploaded-detection-sources.mjs','research/anomaly-visuals/uploads-provenance.json','scripts/lib/uploaded-image-metadata.mjs','scripts/lib/anomaly-visuals.mjs','research/anomaly-revision/family-contracts.json','research/anomaly-incidents.json','research/anomaly-validation/results/functional-results.json','research/anomaly-validation/results/synthetic-study.json'])manifest.source_sha256[path]=hash(readFileSync(new URL(path,root)));
for(const p of provenance.documents||[]){
  const path=out+p.file,bytes=readFileSync(new URL(path,root));
  if(bytes.length!==p.bytes||hash(bytes)!==p.sha256)throw Error('Changed supplied source notes: '+p.file);
  manifest.source_sha256[path]=p.sha256;
}
function save(path,data){
  const url=new URL(path,root);
  if(check){if(!existsSync(url)||readFileSync(url,'utf8')!==data)throw Error('Stale visual asset: '+path);}
  else {mkdirSync(new URL('.',url),{recursive:true});writeFileSync(url,data);}
}
for(const [i,f] of figures.entries()){
  const entry={...f,number:i+1,assets:{}};
  if(f.upload){
    const p=provenance.images.find(x=>x.id===f.id&&x.file===f.upload);
    if(!p)throw Error('Missing upload provenance: '+f.id);
    const bytes=readFileSync(new URL(out+f.upload,root));
    const metadata=imageMetadata(bytes);
    if(hash(bytes)!==p.sha256||metadata.width!==p.width||metadata.height!==p.height||(p.format&&p.format!==metadata.format))throw Error('Changed upload: '+f.id);
    entry.assets.desktop={name:p.file,...metadata,sha256:p.sha256};
    entry.assets.mobile={...entry.assets.desktop};
    entry.provenance={original:p.original,import:p.import};
    manifest.figures.push(entry);continue;
  }
  for(const [variant,mobile] of [['desktop',false],['mobile',true]]){
    const r=renderFigure(f,mobile),name=`${f.id}${mobile?'-mobile':''}.svg`;
    save(out+name,r.svg);entry.assets[variant]={name,width:r.width,height:r.height,sha256:hash(r.svg)};
  }
  manifest.figures.push(entry);
}
save(out+'manifest.json',JSON.stringify(manifest,null,2)+'\n');
const catalog=JSON.parse(readFileSync(new URL('src/data/article-catalog.json',root)));
catalog.find(r=>r.id==='90df8b6dea12').images=figures.length+44;
save('src/data/article-catalog.json',JSON.stringify(catalog,null,2)+'\n');
console.log(`${check?'Verified':'Rendered'} ${figures.length} figures: ${figures.filter(f=>!f.upload).length*2} active SVG variants and ${figures.filter(f=>f.upload).length} unchanged uploaded images.`);
