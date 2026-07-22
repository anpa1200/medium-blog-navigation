#!/usr/bin/env python3
from __future__ import annotations

import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"


def rewrite(text: str) -> tuple[str, int]:
    count = 0

    def markdown(match: re.Match[str]) -> str:
        nonlocal count
        count += 1
        path = match.group(2) or "/"
        return f'<a href="https://1200km.com{path}" target="_self">{match.group(1)}</a>'

    def html(match: re.Match[str]) -> str:
        nonlocal count
        count += 1
        prefix = re.sub(r'\s+target=["\'][^"\']*["\']', '', match.group(1), flags=re.IGNORECASE)
        path = match.group(2)
        return f'{prefix}href="https://1200km.com{path}" target="_self"'

    def visible_url(match: re.Match[str]) -> str:
        nonlocal count
        count += 1
        visible = match.group(2).removeprefix("https://1200km.com") or "/"
        return f'{match.group(1)}<span>{visible}</span>{match.group(3)}'

    def wrapped_visible_url(match: re.Match[str]) -> str:
        nonlocal count
        body = re.sub(r"<[^>]+>", "", match.group("body")).strip()
        if not body.startswith("https://1200km.com"):
            return match.group(0)
        count += 1
        visible = match.group("path") or "/"
        return f'{match.group("open")}<span>{visible}</span></a>'

    text = text.replace("pathname://https://1200km.com", "https://1200km.com")
    text = text.replace("https://anpa1200.github.io/", "https://1200km.com/")
    text = re.sub(r"\[([^\]]+)\]\(https://1200km\.com(/[^)\s]*)?\)", markdown, text)
    text = re.sub(r'(<a\b[^>]*?)href=["\']https://1200km\.com(/[^"\']*)["\']', html, text, flags=re.IGNORECASE)
    text = re.sub(r'(<a\b(?![^>]*\btarget=)[^>]*?)href=["\'](/[^"\']*)["\']', html, text, flags=re.IGNORECASE)
    text = re.sub(r'(<a\b[^>]*?)href=["\'](/[^"\']*)["\']\s+target=["\']_self["\']', html, text, flags=re.IGNORECASE)
    text = re.sub(
        r'(<a\b[^>]*href=["\']https://1200km\.com[^"\']*["\'][^>]*>)(https://1200km\.com[^<]*)(</a>)',
        visible_url,
        text,
        flags=re.IGNORECASE,
    )
    text = re.sub(
        r'(?P<open><a\b[^>]*href=["\']https://1200km\.com(?P<path>/[^"\']*)["\'][^>]*>)(?P<body>[\s\S]*?)</a>',
        wrapped_visible_url,
        text,
        flags=re.IGNORECASE,
    )
    return text, count


def main() -> int:
    changed = 0
    replacements = 0
    for path in sorted(DOCS.rglob("*.md")):
        before = path.read_text(encoding="utf-8")
        after, count = rewrite(before)
        if count:
            path.write_text(after, encoding="utf-8")
            changed += 1
            replacements += count
    print(f"Rewrote {replacements} same-origin links in {changed} Markdown files.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
