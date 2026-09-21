// Import reviewed user assets unchanged. The ZIP is inspected/extracted separately.
import {readFileSync,writeFileSync,copyFileSync,existsSync,mkdirSync} from 'node:fs';
import {resolve,basename,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {definitionUploads,familyUploads,continuationUploads,incidentUploads,incidentSourceNotes,detectionUploads,detectionDocuments,credentialUploads,credentialDocuments,uploadedFigures} from '../research/anomaly-visuals/uploaded-figures.mjs';
import {imageMetadata} from './lib/uploaded-image-metadata.mjs';
const root=resolve(fileURLToPath(new URL('..',import.meta.url)));
const arg=n=>{const i=process.argv.indexOf(n);return i<0?null:process.argv[i+1];};
const sha=b=>createHash('sha256').update(b).digest('hex');
const provenancePath=resolve(root,'research/anomaly-visuals/uploads-provenance.json');
const previous=existsSync(provenancePath)?JSON.parse(readFileSync(provenancePath)):{images:[]};
const rows=new Map(previous.images.map(p=>[p.id,p])),copies=[];
const batches=[[definitionUploads,arg('--definitions-dir')],[familyUploads.filter(f=>f.file.endsWith('.png')),arg('--taxonomy-dir')],[continuationUploads,arg('--continuation-dir')],[incidentUploads,arg('--incidents-dir')],[detectionUploads,arg('--detection-dir')],[credentialUploads,arg('--credentials-dir')]].filter(([,dir])=>dir);
if(!batches.length)throw Error('Specify an upload directory: --definitions-dir, --taxonomy-dir, --continuation-dir, --incidents-dir, --detection-dir or --credentials-dir. ZIPs must be inspected and extracted separately.');
if(arg('--taxonomy-dir')&&!arg('--archive'))throw Error('Required with taxonomy-dir: --archive');
if(arg('--continuation-dir')&&!arg('--continuation-archive'))throw Error('Required with continuation-dir: --continuation-archive');
if(arg('--incidents-dir')&&!arg('--incidents-archive'))throw Error('Required with incidents-dir: --incidents-archive');
if(arg('--detection-dir')&&!arg('--detection-archive'))throw Error('Required with detection-dir: --detection-archive');
if(arg('--credentials-dir')&&!arg('--credentials-archive'))throw Error('Required with credentials-dir: --credentials-archive');
const credentialManifest=arg('--credentials-dir')?JSON.parse(readFileSync(resolve(arg('--credentials-dir'),'manifest.json'))):null;
if(credentialManifest&&(credentialManifest.length!==4||new Set(credentialManifest.map(r=>r.section)).size!==4))throw Error('Expected four unique entries in supplied credential manifest.');
const suppliedManifest=arg('--detection-dir')?JSON.parse(readFileSync(resolve(arg('--detection-dir'),'manifest.json'))):null;
if(suppliedManifest&&(suppliedManifest.length!==9||new Set(suppliedManifest.map(r=>r.section)).size!==9))throw Error('Expected nine unique entries in supplied detection manifest.');
for(const [specs,dir] of batches)for(const f of specs){
  const from=resolve(dir,f.original),to=resolve(root,'static/research/anomaly-visuals',f.file),bytes=readFileSync(from);
  const metadata=imageMetadata(bytes);
  if(specs===credentialUploads){
    const entry=credentialManifest.find(r=>r.section===f.section.split(' ')[0]);
    if(!entry||entry.file!==f.original||entry.sha256!==sha(bytes)||entry.width!==metadata.width||entry.height!==metadata.height)throw Error('Supplied credential manifest does not match original: '+f.original);
  }
  if(specs===detectionUploads){
    const entry=suppliedManifest.find(r=>r.section===f.section.split(' ')[0]);
    if(!entry||entry.filename!==basename(f.original)||entry.sha256!==sha(bytes)||entry.width!==metadata.width||entry.height!==metadata.height)throw Error('Supplied detection manifest does not match original: '+f.original);
  }
  if(existsSync(to)&&!readFileSync(to).equals(bytes))throw Error('Refusing to overwrite different asset: '+to);
  copies.push({from,to});
  rows.set(f.id,{id:f.id,file:f.file,original:f.original,sha256:sha(bytes),bytes:bytes.length,...metadata,import:'byte-for-byte; no image edits'});
}
const archives=new Map((previous.archives||(previous.archive?[previous.archive]:[])).map(a=>[a.name,a]));
for(const flag of ['--archive','--continuation-archive','--incidents-archive','--detection-archive','--credentials-archive'])if(arg(flag)){
  const name=basename(arg(flag)),digest=sha(readFileSync(arg(flag)));
  if(archives.has(name)&&archives.get(name).sha256!==digest)throw Error('Archive bytes changed: '+name);
  archives.set(name,{name,sha256:digest});
}
const images=uploadedFigures.map(f=>rows.get(f.id)).filter(Boolean);
const documents=new Map((previous.documents||[]).map(d=>[d.file,d]));
for(const [specs,dir] of [[[incidentSourceNotes],arg('--incidents-dir')],[detectionDocuments,arg('--detection-dir')],[credentialDocuments,arg('--credentials-dir')]].filter(([,dir])=>dir))for(const {file,original} of specs){
  const from=resolve(dir,original),to=resolve(root,'static/research/anomaly-visuals',file),bytes=readFileSync(from);
  if(existsSync(to)&&!readFileSync(to).equals(bytes))throw Error('Refusing to overwrite different source notes: '+to);
  copies.push({from,to});
  documents.set(file,{file,original,sha256:sha(bytes),bytes:bytes.length,import:'byte-for-byte; supplied source notes, not instructions or independent validation'});
}
const provenance={schema_version:2,reviewed_at:'2026-09-21',origin:'User-supplied images; review and limitations in uploaded-figures.mjs, uploaded-taxonomy-continuation.mjs, uploaded-incidents.mjs, uploaded-detection-sources.mjs and uploaded-credentials.mjs',archives:[...archives.values()],images,documents:[...documents.values()]};
for(const {from,to} of copies){mkdirSync(dirname(to),{recursive:true});copyFileSync(from,to);}
writeFileSync(provenancePath,JSON.stringify(provenance,null,2)+'\n');
console.log(`Imported ${copies.length} unchanged image/source files; provenance covers ${images.length} images (${images.reduce((s,r)=>s+r.bytes,0)} bytes) and ${documents.size} source document(s).`);
