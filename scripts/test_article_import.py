"""Regression cases for Medium text-node, line-break, and fence preservation."""
import tempfile
import unittest
from pathlib import Path
from bs4 import BeautifulSoup
from generate_article_docs import block_to_md, inline_md, pre_text, sanitize_generated_markdown

class ArticleImportTests(unittest.TestCase):
    def node(self, html):
        return BeautifulSoup(html, 'html.parser').find()

    def test_inline_spacing(self):
        self.assertEqual(inline_md(self.node('<p>spent <strong>days</strong> setting <em>up</em> now</p>')), 'spent **days** setting *up* now')
        self.assertEqual(inline_md(self.node('<p>goal: <a href="https://example.org">one</a> prompt</p>')), 'goal: [one](https://example.org) prompt')

    def test_emphasis_with_boundary_spaces(self):
        self.assertEqual(inline_md(self.node('<p><strong>Permissions: </strong>rw</p>')), '**Permissions:** rw')
        self.assertEqual(inline_md(self.node('<p>a <em> phrase </em> b</p>')), 'a  *phrase*  b')

    def test_corpus_has_no_token_fragment_signature(self):
        for path in (Path(__file__).resolve().parents[1] / 'docs/articles').glob('*/*.md'):
            self.assertNotIn('\n \n', path.read_text(), str(path))

    def test_highlighted_shell(self):
        node = self.node('<pre><span><span class="hljs-built_in">mkdir</span> DC_simulator<br/><span>cd</span> DC_simulator<br/>cursor .</span></pre>')
        self.assertEqual(block_to_md(node, '', []), '```text\nmkdir DC_simulator\ncd DC_simulator\ncursor .\n```')

    def test_nested_br_children_and_native_newlines(self):
        self.assertEqual(pre_text(self.node('<pre>a<br>b<span>c</span></br>\nd</pre>')), 'a\nbc\nd')

    def test_link_normalization_preserves_code(self):
        from rewrite_same_origin_links import rewrite
        source = '[Home](/)\n\n````text\n```html\n<a href="/api/token">token</a>\n```\n[Local](/app)\n````\n'
        result, count = rewrite(source)
        self.assertIn('<a href="https://1200km.com/" target="_self">Home</a>', result)
        self.assertEqual(result[result.index('````'):], source[source.index('````'):])

    def test_embedded_fences(self):
        node = self.node('<pre>instructions<br/>```bash<br/>echo example<br/>```<br/>## Still code</pre>')
        result = block_to_md(node, '', [])
        self.assertEqual(result, '````text\ninstructions\n```bash\necho example\n```\n## Still code\n````')
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / 'article.md'
            source = result.replace('echo example', 'echo &lt;example&gt; {value}')
            path.write_text(source)
            sanitize_generated_markdown(path)
            self.assertEqual(path.read_text(), source+'\n')

if __name__ == '__main__':
    unittest.main()
