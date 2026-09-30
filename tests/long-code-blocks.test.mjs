import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import test from 'node:test';
import {load} from 'cheerio';

const cases = [
  ['2026-03-30-android-malware-analysis-a-practical-guide-for-security-analysts-9cda5efb181d', 12000, 1300000],
  ['2026-01-08-hexstrike-cursor-mcp-from-single-target-full-subnet-compromise-lab-pt-walkthrough-f2e1fd793ad7', 3000, 300000],
  ['2026-02-02-building-a-vulnerable-kubernetes-lab-a-complete-guide-to-25-critical-security-issues-fae4fc8e3a91', 8000, 500000],
];

function largeFences(markdown) {
  const blocks = [];
  let active = false;
  let lines = [];
  for (const line of markdown.split('\n')) {
    if (line.startsWith('```')) {
      if (active) {
        const text = lines.join('\n');
        if (lines.length > 150 || text.length > 12000) blocks.push(text);
        lines = [];
      }
      active = !active;
    } else if (active) {
      lines.push(line);
    }
  }
  return blocks;
}

test('large article code stays complete while Prism token nodes are bounded', () => {
  for (const [slug, maxTags, maxBytes] of cases) {
    const markdown = readFileSync(join('docs/articles/2026', slug + '.md'), 'utf8');
    const html = readFileSync(join('build/read/2026', slug, 'index.html'), 'utf8');
    const expected = largeFences(markdown);
    const $ = load(html);
    const details = $('details.plain-large-code').toArray();
    assert.ok(expected.length > 0, slug);
    assert.equal(details.length, expected.length, slug);
    for (let index = 0; index < details.length; index += 1) {
      const detail = $(details[index]);
      assert.equal(detail.find('pre code').text().replace(/\n$/, ''), expected[index].replace(/\n$/, ''), `${slug} block ${index}`);
      assert.equal(detail.find('.token').length, 0, `${slug} block ${index}`);
      assert.equal(detail.find('button[type=button]').length, 1, `${slug} copy control ${index}`);
    }
    assert.ok((html.match(/<\w+\b/g) || []).length < maxTags, slug);
    assert.ok(Buffer.byteLength(html) < maxBytes, slug);
    assert.ok($('.theme-code-block .token').length > 0, `${slug}: shorter code still highlighted`);
  }
});
