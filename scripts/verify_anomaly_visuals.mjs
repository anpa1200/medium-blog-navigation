#!/usr/bin/env node
// Local verification with persistent raw logs. Does not commit, push or deploy.
import {spawn} from 'node:child_process';
import {readFileSync,writeFileSync,mkdirSync,readdirSync} from 'node:fs';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const root=resolve(fileURLToPath(new URL('..',import.meta.url)));
const reportArg=process.argv.indexOf('--report-dir');
const dir=resolve(root,reportArg<0?'reports/anomaly-uploaded-credentials-61-64-20260921':process.argv[reportArg+1]);mkdirSync(dir,{recursive:true});
function assetFiles(folder,prefix=''){
  return readdirSync(folder,{withFileTypes:true}).flatMap(e=>{
    if(e.isDirectory())return assetFiles(resolve(folder,e.name),prefix+e.name+'/');
    if(!e.isFile())throw Error('Unexpected non-file visual asset: '+e.name);
    return [prefix+e.name];
  });
}
const steps=[
  ['research-and-visuals','npm',['run','research:anomalies:check']],
  ['archive','npm',['run','validate:archive']],
  ['media','npm',['run','validate:media:local']],
  ['legacy-build','npm',['run','build:legacy']],
  ['embedded-build','npm',['run','build:embedded']],
  ['rendered-article','node',['scripts/validate_anomaly_incidents.mjs','--built']],
  ['visual-browser','node',['scripts/check_anomaly_visuals_browser.mjs','--report-dir',dir]],
  ['whitespace','git',['diff','--check']]
];
const result={started_at:new Date().toISOString(),scope:'Local source, build, asset and browser checks; no deployment or new engine run.',steps:[],passed:false};
for(const [id,command,args] of steps){
  const start=Date.now();console.log(`START ${id}`);
  const output=await new Promise(resolveResult=>{
    const child=spawn(command,args,{cwd:root,env:process.env,stdio:['ignore','pipe','pipe']});
    let log='';child.stdout.on('data',d=>{log+=d;process.stdout.write(d);});child.stderr.on('data',d=>{log+=d;process.stderr.write(d);});
    child.on('error',e=>resolveResult({code:1,log:log+'\n'+e.stack}));child.on('close',code=>resolveResult({code,log}));
  });
  writeFileSync(resolve(dir,id+'.log'),output.log);
  result.steps.push({id,command:[command,...args].join(' '),exit_code:output.code,seconds:Math.round((Date.now()-start)/1000),log:id+'.log',sha256:createHash('sha256').update(output.log).digest('hex')});
  if(output.code!==0){process.exitCode=1;break;}
  if(id.endsWith('-build')){
    const files=assetFiles(resolve(root,'static/research/anomaly-visuals'));
    for(const name of files){
      const src=readFileSync(resolve(root,'static/research/anomaly-visuals',name));
      const built=readFileSync(resolve(root,'build/research/anomaly-visuals',name));
      if(!src.equals(built))throw Error(`Build asset mismatch: ${name}`);
    }
    result.steps.at(-1).identical_visual_assets=files.length;
  }
}
result.finished_at=new Date().toISOString();result.passed=result.steps.length===steps.length&&result.steps.every(s=>s.exit_code===0);
writeFileSync(resolve(dir,'verification.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result,null,2));
