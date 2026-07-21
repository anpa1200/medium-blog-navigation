from __future__ import annotations

import json
from pathlib import Path
from urllib.parse import urlsplit


ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "src" / "data" / "article-catalog.json"
ARTICLES = ROOT / "docs" / "articles"


def main() -> int:
    errors: list[str] = []
    rows = json.loads(CATALOG.read_text(encoding="utf-8"))
    ids: set[str] = set()
    paths: set[str] = set()

    for index, row in enumerate(rows):
        label = row.get("id") or f"row {index}"
        required = {
            "id", "title", "published_at", "year", "category", "slug",
            "local_path", "source_url", "images", "code_blocks",
        }
        missing = sorted(required - set(row))
        if missing:
            errors.append(f"{label}: missing {', '.join(missing)}")
            continue
        if row["id"] in ids:
            errors.append(f"{label}: duplicate article ID")
        ids.add(row["id"])
        if row["local_path"] in paths:
            errors.append(f"{label}: duplicate local path {row['local_path']}")
        paths.add(row["local_path"])
        if row["local_path"] != f"{row['year']}/{row['slug']}":
            errors.append(f"{label}: local_path does not match year/slug")
        target = ARTICLES / f"{row['local_path']}.md"
        if not target.is_file():
            errors.append(f"{label}: missing {target.relative_to(ROOT)}")
        source = urlsplit(row["source_url"])
        if source.scheme != "https" or not source.netloc:
            errors.append(f"{label}: invalid source_url")
        if not isinstance(row["images"], int) or row["images"] < 0:
            errors.append(f"{label}: invalid image count")
        if not isinstance(row["code_blocks"], int) or row["code_blocks"] < 0:
            errors.append(f"{label}: invalid code-block count")

    article_files = {
        str(path.relative_to(ARTICLES).with_suffix(""))
        for path in ARTICLES.glob("*/*.md")
    }
    orphaned = sorted(article_files - paths)
    if orphaned:
        errors.append(f"catalog is missing {len(orphaned)} article file(s): {', '.join(orphaned[:5])}")
    if not rows:
        errors.append("article catalog is empty")

    if errors:
        print("Article archive validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"Article archive validation passed: {len(rows)} unique local articles.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
