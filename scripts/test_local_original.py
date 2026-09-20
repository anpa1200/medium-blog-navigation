"""First-party articles must not pretend to have a verified external canonical."""
import contextlib
import io
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
import validate_article_archive as validator


class FirstPartyArticleTests(unittest.TestCase):
    def check_row(self, **changes):
        rows = json.loads(validator.CATALOG.read_text())
        row = next(r for r in rows if r['canonical_migration_status'] == 'local-original')
        row = {**row, **changes}
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            catalog = root / 'catalog.json'
            catalog.write_text(json.dumps([row]))
            article = root / 'articles' / (row['local_path'] + '.md')
            article.parent.mkdir(parents=True)
            article.write_text('# Test\n')
            with patch.object(validator, 'CATALOG', catalog), patch.object(validator, 'ARTICLES', root / 'articles'), contextlib.redirect_stdout(io.StringIO()):
                return validator.main()

    def test_valid_original(self):
        self.assertEqual(self.check_row(), 0)

    def test_external_source_cannot_claim_original(self):
        self.assertEqual(self.check_row(source_url='https://example.com/article', original_publication_url='https://example.com/article'), 1)

    def test_external_verification_cannot_be_invented(self):
        self.assertEqual(self.check_row(external_canonical_verified=True, external_canonical_verified_at='2026-09-20'), 1)

    def test_migrated_articles_still_require_verification(self):
        self.assertEqual(self.check_row(canonical_migration_status='local-confirmed'), 1)


if __name__ == '__main__':
    unittest.main()
