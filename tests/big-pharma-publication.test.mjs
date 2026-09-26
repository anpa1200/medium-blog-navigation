import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const read=p=>readFileSync(new URL(`../${p}`,import.meta.url),'utf8');
const slug='cyberattacks-on-big-pharma-and-its-ecosystem';
const source=read(`docs/articles/2026/${slug}.md`);
const manifest=JSON.parse(read('static/article-assets/big-pharma/publication.json'));

test('supplied cover and infographics retain original bytes and dimensions',()=>{
 assert.equal(manifest.images.length,3);
 for(const img of manifest.images){
  const bytes=readFileSync(new URL(`../static/article-assets/big-pharma/${img.file}`,import.meta.url));
  assert.equal(createHash('sha256').update(bytes).digest('hex'),img.sha256);
  assert.equal(bytes.readUInt32BE(16),img.width);assert.equal(bytes.readUInt32BE(20),img.height);
  assert.ok(source.includes(`width="${img.width}" height="${img.height}"`));
 }
 assert.ok(source.indexOf('why-pharma-is-targeted.png')>source.indexOf('## Why pharmaceutical organizations are targeted'));
 assert.ok(source.indexOf('pharmaceutical-attack-surface.png')>source.indexOf('## The pharmaceutical attack surface'));
 assert.match(source,/Lash Group is a Cencora subsidiary/);
 assert.match(source,/not a reconstructed intrusion chain/);
});

test('publication preserves evidence boundaries and integrates real internal routes',()=>{
 assert.equal((source.match(/^# /gm)||[]).length,1);
 assert.match(source,/25 September 2026/);
 assert.match(source,/\$22 million ransom/);
 assert.match(source,/interest-free provider loans/);
 assert.match(source,/192\.7 million/);
 assert.match(source,/As mapped by CISA/);
 assert.doesNotMatch(source,/TheUSERS007|techcommunity\.microsoft\.com/);
 assert.ok((source.match(/href="https:\/\/1200km\.com\//g)||[]).length>=70);
 for(const id of manifest.technique_ids)assert.ok(source.includes(`/threat-matrix/techniques/${id}/`),id);
 for(const id of manifest.actor_ids)assert.ok(source.includes(`/threat-matrix/actors/${id}/`),id);
 assert.match(source,/## Follow My Work[\s\S]*1200km@gmail.com/);
});

test('built article has one title, working fragments, accessible figures and preserved source citations',()=>{
 const html=read(`build/read/2026/${slug}/index.html`);
 const ids=new Set([...html.matchAll(/\bid="([^"\s]+)"/g)].map(m=>m[1]));
 assert.equal((html.match(/<h1\b/g)||[]).length,1);
 for(const match of html.matchAll(/href="#([^\"]+)"/g))assert.ok(ids.has(decodeURIComponent(match[1])),match[1]);
 assert.equal((html.match(/<figure\b/g)||[]).length,2);
 assert.equal((html.match(/<figcaption\b/g)||[]).length,2);
 assert.doesNotMatch(html,/<a\b[^>]*>[^<]*<a\b/);
 for(const link of ['www.sec.gov/Archives','www.finance.senate.gov','www.cisa.gov/','attack.mitre.org/','www.hhs.gov/'])assert.ok(html.includes(link),link);
});
