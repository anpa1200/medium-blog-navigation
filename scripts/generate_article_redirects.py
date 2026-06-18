from __future__ import annotations

import html
from pathlib import Path


SITE_ROOT = Path(__file__).resolve().parents[1]
ARTICLES_ROOT = SITE_ROOT / "docs" / "articles"
STATIC_DOCS_ROOT = SITE_ROOT / "static" / "docs"
BASE_URL = "/medium-blog-navigation"


TEMPLATE = """<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="refresh" content="0; url={target}">
    <link rel="canonical" href="{target}">
    <title>Redirecting...</title>
    <script>window.location.replace({target_json});</script>
  </head>
  <body>
    <p>Redirecting to <a href="{target}">{target_text}</a>.</p>
  </body>
</html>
"""


def main() -> None:
    count = 0
    for article in ARTICLES_ROOT.glob("20*/*.md"):
        if article.name.startswith("_"):
            continue
        year = article.parent.name
        slug = article.stem
        target = f"{BASE_URL}/docs/articles/{year}/{slug}"
        out_dir = STATIC_DOCS_ROOT / year / slug
        out_dir.mkdir(parents=True, exist_ok=True)
        content = TEMPLATE.format(
            target=html.escape(target, quote=True),
            target_text=html.escape(target),
            target_json=repr(target),
        )
        (out_dir / "index.html").write_text(content, encoding="utf-8")
        count += 1
    print(f"Generated {count} article compatibility redirects under static/docs/YYYY/slug/.")


if __name__ == "__main__":
    main()
