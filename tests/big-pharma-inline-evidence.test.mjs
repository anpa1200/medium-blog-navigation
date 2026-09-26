import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import test from 'node:test';

const read=p=>readFileSync(new URL(`../${p}`,import.meta.url),'utf8');
const source=read('docs/articles/2026/cyberattacks-on-big-pharma-and-its-ecosystem.md');
const download=read('static/article-assets/big-pharma/research.md');
const manifest=JSON.parse(read('static/article-assets/big-pharma/publication.json'));
const evidenceColumns=[2,2,2,3,null,2];
const expectedCounts=[10,11,16,21,7,3];

for(const [edition,text] of [['published',source],['download',download]]){
 test(`${edition}: infographic replaces the redundant ASCII diagram`,()=>{
  assert.doesNotMatch(text,/```text|Researchers and partners\n\s*\||a text equivalent follows/);
  assert.match(text,/The table below explains each surface/);
  assert.match(text,/pharmaceutical-attack-surface\.png/);
 });
 test(`${edition}: all six tables have direct evidence in every row`,()=>{
  const tables=[...text.matchAll(/(?:^\|.*\n)+/gm)].map(m=>m[0].trimEnd().split('\n').slice(2));
  assert.deepEqual(tables.map(rows=>rows.length),expectedCounts);
  for(const [index,rows] of tables.entries())for(const row of rows){
   const column=evidenceColumns[index];
   const evidence=column===null?row:row.split('|')[column+1];
   assert.match(evidence,/\]\(https:\/\/(?!1200km\.com\/)[^)]+\)/,`table ${index+1}: ${row}`);
  }
  assert.match(text,/not tested detection performance/);
  assert.match(text,/not deadlines prescribed by the linked sources/);
  assert.match(text,/dossier context does not independently verify an incident/);
 });
}

test('metadata matches the download and removal of the sole code block',()=>{
 assert.equal(createHash('sha256').update(download).digest('hex'),manifest.integrated_markdown_sha256);
 assert.equal(manifest.inline_internal_links,(download.match(/\]\(https:\/\/1200km\.com\//g)||[]).length);
 assert.equal(manifest.table_evidence.body_rows,68);
 const catalog=JSON.parse(read('src/data/article-catalog.json'));
 assert.equal(catalog.find(a=>a.id==='241a0c69a53e').code_blocks,0);
});

test('actor name links retain direct advisories and claim qualifiers',()=>{
 assert.match(source,/\[Cl0p\]\(https:\/\/www\.cisa\.gov\//);
 assert.match(source,/\[ALPHV\]\(https:\/\/www\.cisa\.gov\//);
 assert.match(source,/\[ZINC\]\(https:\/\/www\.microsoft\.com\//);
 assert.match(source,/\[CERIUM\]\(https:\/\/www\.microsoft\.com\//);
 assert.match(source,/\[Qilin\]\(https:\/\/research\.checkpoint\.com\//);
 assert.match(source,/actor identity and claimed volume remain attacker-attributed/);
 assert.match(source,/As mapped by CISA/);
 assert.match(source,/not a source-assigned technique/);
 assert.match(source,/\[malicious update to Ukrainian accounting software M.E.Doc\]\(https:\/\/www\.welivesecurity\.com\//);
 assert.ok((source.match(/href="https:\/\/1200km\.com\/threat-matrix\/actors\//g)||[]).length>=18);
});
