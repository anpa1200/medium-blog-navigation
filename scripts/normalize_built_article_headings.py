#!/usr/bin/env python3
"""Normalize rendered article outlines without rewriting imported source prose."""

from __future__ import annotations

import argparse
import re
from pathlib import Path


HEADING = re.compile(
    r"<h(?P<level>[1-6])(?P<attrs>\b[^>]*)>(?P<body>.*?)</h(?P=level)>",
    re.IGNORECASE | re.DOTALL,
)


def normalize_document(html: str) -> tuple[str, int]:
    seen_h1 = False
    previous_level = 0
    changes = 0

    def replace(match: re.Match[str]) -> str:
        nonlocal seen_h1, previous_level, changes
        original = int(match.group("level"))
        level = original
        if level == 1:
            if seen_h1:
                level = 2
            else:
                seen_h1 = True
        if previous_level and level > previous_level + 1:
            level = previous_level + 1
        previous_level = level
        if level != original:
            changes += 1
        return f'<h{level}{match.group("attrs")}>{match.group("body")}</h{level}>'

    return HEADING.sub(replace, html), changes


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--build", type=Path, default=Path("build"))
    args = parser.parse_args()
    embedded_root = args.build / "read"
    article_root = embedded_root if embedded_root.is_dir() else args.build / "docs"
    if not article_root.is_dir():
        raise SystemExit(f"Article build directory does not exist: {article_root}")

    files_changed = 0
    headings_changed = 0
    for path in sorted(article_root.rglob("*.html")):
        original = path.read_text(encoding="utf-8")
        normalized, count = normalize_document(original)
        if count:
            path.write_text(normalized, encoding="utf-8")
            files_changed += 1
            headings_changed += count
    print(
        f"Normalized {headings_changed} rendered headings across "
        f"{files_changed} article pages."
    )


if __name__ == "__main__":
    main()
