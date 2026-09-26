import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const root=new URL('../',import.meta.url);
const read=p=>readFileSync(new URL(p,root));
test('web-delivery derivatives are bounded and preserve links to unchanged originals',()=>{
 const manifest=JSON.parse(read('static/article-assets/big-pharma/publication.json'));
 const source=read('docs/articles/2026/cyberattacks-on-big-pharma-and-its-ecosystem.md').toString();
 assert.equal(manifest.display_derivatives.length,5);
 for(const entry of manifest.display_derivatives){
  const bytes=read('static/article-assets/big-pharma/'+entry.file);
  assert.equal(bytes.length,entry.bytes);
  assert.equal(createHash('sha256').update(bytes).digest('hex'),entry.sha256);
  assert.equal(bytes.toString('ascii',0,4),'RIFF');
  assert.equal(bytes.toString('ascii',8,16),'WEBPVP8 ');
  assert.equal(bytes.subarray(23,26).toString('hex'),'9d012a');
  assert.equal(bytes.readUInt16LE(26)&0x3fff,entry.width);
  assert.equal(bytes.readUInt16LE(28)&0x3fff,entry.height);
  assert.ok(bytes.length<250_000,entry.file+' exceeds delivery budget');
  assert.ok(manifest.images.some(original=>original.file===entry.original));
 }
 assert.match(source,/srcSet=.*cover-800\.webp/);
 for(const original of manifest.images)assert.ok(source.includes('/big-pharma/'+original.file+'" target="_self"'));
 assert.doesNotMatch(source,/require\([^)]*big-pharma\/[^)]*\.png/);
});
