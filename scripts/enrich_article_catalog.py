#!/usr/bin/env python3
"""Apply the shared taxonomy to the committed article catalog."""

import json
from pathlib import Path

from article_taxonomy import category_for_taxonomy, tags_for


ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "src" / "data" / "article-catalog.json"


def main() -> None:
    rows = json.loads(CATALOG.read_text(encoding="utf-8"))
    for row in rows:
        summary = row.get("summary", "")
        row["category"] = category_for_taxonomy(row["title"], summary)
        row["tags"] = tags_for(row["title"], summary)
    CATALOG.write_text(json.dumps(rows, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Enriched {len(rows)} article records with taxonomy tags.")


if __name__ == "__main__":
    main()
