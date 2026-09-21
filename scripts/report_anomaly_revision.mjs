#!/usr/bin/env node
// Evidence inventory, not a release or publication command.
import {execFileSync} from 'node:child_process';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';

const root=resolve(fileURLToPath(new URL('..',import.meta.url)));
const report='reports/anomaly-technical-revision-20260921';
const git=args=>execFileSync('git',args,{cwd:root,encoding:'utf8'});
const json=path=>JSON.parse(readFileSync(resolve(root,path)));
const write=(name,data)=>writeFileSync(resolve(root,report,name),JSON.stringify(data,null,2)+'\n');
mkdirSync(resolve(root,report),{recursive:true});
const baseline=json('research/anomaly-revision/original-inventory.json').baseline_commit||json('research/anomaly-revision/issues.json').baseline_commit;
const fields=['id','local_path','slug','canonical_url','preferred_canonical_url','source_url'];
const project=rows=>rows.map(row=>Object.fromEntries(fields.map(key=>[key,row[key]??null]))).sort((a,b)=>a.id.localeCompare(b.id));
const before=project(JSON.parse(git(['show',`${baseline}:src/data/article-catalog.json`])));
const after=project(json('src/data/article-catalog.json'));
assert.deepEqual(after,before,'Existing article routes or canonical identities changed');
write('url-preservation.json',{baseline_commit:baseline,scope:'All 192 articles in this archive, not every page in the separate main-site repository.',count:after.length,unchanged:true,before,after});
const files=[...new Set([...git(['diff','--name-only','HEAD','-z']).split('\0'),...git(['ls-files','--others','--exclude-standard','-z']).split('\0')])].filter(Boolean).sort();
const entries=files.filter(path=>!path.startsWith(report+'/')).map(path=>{
  const bytes=readFileSync(resolve(root,path));
  return {path,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')};
});
write('changed-files.json',{recorded_at:new Date().toISOString(),baseline_commit:baseline,branch:git(['branch','--show-current']).trim(),scope:'Changed/new deliverable files excluding this self-referential report directory; ignored dependencies, build output, recording cache and Python caches excluded.',count:entries.length,files:entries});
console.log(`Evidence inventory: ${entries.length} changed/new deliverables; ${after.length} article URL identities unchanged.`);
