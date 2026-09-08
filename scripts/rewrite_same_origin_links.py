#!/usr/bin/env python3
from __future__ import annotations

import argparse
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

    def markdown_image(match: re.Match[str]) -> str:
        nonlocal count
        count += 1
        return f'![{match.group(2)}]({match.group(1)})'

    def html_tag(match: re.Match[str]) -> str:
        nonlocal count
        tag = match.group(0)
        href = re.search(
            r'\bhref=["\'](?:https://1200km\.com)?(/[^"\']*)["\']',
            tag,
            flags=re.IGNORECASE,
        )
        if not href:
            return tag
        count += 1
        path = href.group(1)
        tag = re.sub(r'\s+target=["\'][^"\']*["\']', '', tag, flags=re.IGNORECASE)
        tag = re.sub(
            r'\bhref=["\'][^"\']*["\']',
            f'href="https://1200km.com{path}"',
            tag,
            count=1,
            flags=re.IGNORECASE,
        )
        return f'{tag[:-1].rstrip()} target="_self">'

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
    text = re.sub(
        r'!<a\s+href="https://1200km\.com(/[^"\s]+)"\s+target="_self">([^<]+)</a>',
        markdown_image,
        text,
        flags=re.IGNORECASE,
    )
    text = re.sub(
        r"(?<!!)\[([^\]]+)\]\((?:https://1200km\.com)?(/[^)\s]*)\)",
        markdown,
        text,
    )
    text = re.sub(r'<a\b[^>]*>', html_tag, text, flags=re.IGNORECASE)
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
    parser = argparse.ArgumentParser(description="Normalize links that target the 1200km origin.")
    parser.add_argument("--check", action="store_true", help="Fail instead of writing when normalization is required.")
    args = parser.parse_args()
    changed = 0
    replacements = 0
    drifted: list[Path] = []
    for path in sorted(DOCS.rglob("*.md")):
        before = path.read_text(encoding="utf-8")
        after, count = rewrite(before)
        if after != before:
            changed += 1
            drifted.append(path.relative_to(ROOT))
            if not args.check:
                path.write_text(after, encoding="utf-8")
        replacements += count
    if args.check and drifted:
        print("Same-origin link normalization is required:")
        for path in drifted[:20]:
            print(f"- {path}")
        return 1
    print(f"Inspected {replacements} same-origin links; changed {changed} Markdown files.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
