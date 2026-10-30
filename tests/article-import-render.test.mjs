import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {load} from 'cheerio';

const cases = [
  ['2026-01-23-deploy-a-complete-active-directory-pentest-lab-in-one-prompt-with-cursor-ai-ff926fd2b3fc', 32],
  ['2026-01-24-active-directory-lab-for-pentest-manual-deployment-guide-cab28cd4ad8d'],
  ['2026-02-05-warning-i-just-built-real-malware-by-using-just-human-language-prompts-8949628dee19'],
];
function blocks(markdown) {
  const output = []; let fenceLength = 0; let lines = [];
  for (const line of markdown.split('\n')) {
    const match = line.match(/^(`{3,})(.*)$/);
    if (!fenceLength && match) fenceLength = match[1].length;
    else if (fenceLength && match && match[1].length >= fenceLength && !match[2].trim()) {
      output.push(lines.join('\n')); lines = []; fenceLength = 0;
    } else if (fenceLength) lines.push(line);
  }
  assert.equal(fenceLength, 0, 'every fence closes');
  return output;
}
test('rendered imported code preserves lines, embedded fences and prose spacing', () => {
  for (const [slug, count] of cases) {
    const markdown = readFileSync(`docs/articles/2026/${slug}.md`, 'utf8');
    const $ = load(readFileSync(`build/read/2026/${slug}/index.html`, 'utf8'));
    const expected = blocks(markdown);
    const actual = $('article pre code').toArray().map(node => {
      const lines = $(node).find('.token-line').toArray();
      return lines.length ? lines.map(line => $(line).text()).join('\n') : $(node).text().replace(/\n$/, '');
    });
    assert.deepEqual(actual, expected, slug);
    if (count) {
      assert.equal(actual.length, count);
      assert.equal(actual[0], 'mkdir DC_simulator\ncd DC_simulator\ncursor .');
      assert.ok(actual[1].includes('You are tasked with creating a **fully automated deployment system**'));
      assert.ok($('article').text().includes('spent days setting'));
      assert.ok(!$('article h1, article h2, article h3').toArray().some(node => /^(forwarded\)|NAT\)|installed|retry)$/.test($(node).text().replace('​', ''))));
    }
  }
});
