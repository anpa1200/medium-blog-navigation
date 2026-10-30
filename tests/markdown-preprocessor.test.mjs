import assert from 'node:assert/strict';
import test from 'node:test';
import preprocess from '../scripts/markdown-preprocessor.cjs';
test('heading compatibility preserves code including shorter embedded fences', () => {
  const source = '# Actual heading {#actual}\n\n````text\n## Example {#literal}\n```sh\necho sample\n```\n````\n## Next {#next}\n';
  assert.equal(preprocess({fileContent: source}), source.replace('heading {#actual}', 'heading \\{#actual}').replace('Next {#next}', 'Next \\{#next}'));
});
