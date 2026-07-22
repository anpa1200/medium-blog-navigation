#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path
import re
from urllib.parse import urlsplit


ROOT = Path(__file__).resolve().parents[1]
BUILD = ROOT / "build"
CATALOG = json.loads((ROOT / "src" / "data" / "article-catalog.json").read_text(encoding="utf-8"))


def main() -> int:
    failures: list[str] = []
    expected = {row["local_path"]: row for row in CATALOG}
    for relative, row in expected.items():
        path = BUILD / "read" / relative / "index.html"
        if not path.is_file():
            failures.append(f"missing article output: {relative}")
            continue
        html = path.read_text(encoding="utf-8", errors="ignore")
        canonicals = re.findall(r'<link\b[^>]*\brel=["\'][^"\']*canonical[^"\']*["\'][^>]*>', html, re.IGNORECASE)
        if len(canonicals) != 1 or row["canonical_url"] not in canonicals[0]:
            failures.append(f"{relative}: canonical mismatch")
        if len(re.findall(r"<main\b", html, re.IGNORECASE)) != 1:
            failures.append(f"{relative}: expected one main landmark")
        if len(re.findall(r"<h1\b", html, re.IGNORECASE)) != 1:
            failures.append(f"{relative}: expected one h1")
        article = re.search(r"<article\b[\s\S]*?</article>", html, re.IGNORECASE)
        for image in re.findall(r"<img\b[^>]*>", article.group(0) if article else "", re.IGNORECASE):
            if not re.search(r'''\bwidth=["']\d+["']''', image) or not re.search(r'''\bheight=["']\d+["']''', image):
                failures.append(f"{relative}: content image lacks dimensions")
                break

    html_files = sorted(BUILD.rglob("*.html"))
    for path in html_files:
        html = path.read_text(encoding="utf-8", errors="ignore")
        if re.search(r'<meta\b[^>]*\bname=["\']keywords["\']', html, re.IGNORECASE):
            failures.append(f"{path.relative_to(BUILD)}: meta keywords present")
        title_match = re.search(r"<title\b[^>]*>([\s\S]*?)</title>", html, re.IGNORECASE)
        title = title_match.group(1).strip() if title_match else ""
        if "1200km Security Research Articles" in title or title.count("| 1200km") > 1:
            failures.append(f"{path.relative_to(BUILD)}: repetitive title suffix")
        for link in re.findall(r"<a\b[^>]*>", html, re.IGNORECASE):
            if not re.search(r'\btarget=["\']_blank["\']', link, re.IGNORECASE):
                continue
            href_match = re.search(r'\bhref=["\']([^"\']+)["\']', link, re.IGNORECASE)
            href = href_match.group(1) if href_match else ""
            parsed = urlsplit(href)
            if href.startswith("/") or parsed.netloc == "1200km.com":
                failures.append(f"{path.relative_to(BUILD)}: same-origin link opens a new tab ({href})")
                break

    index = (BUILD / "index.html").read_text(encoding="utf-8")
    main = re.search(r'<main\b[^>]*id=["\']main-content["\'][^>]*>([\s\S]*)</main>', index, re.IGNORECASE)
    if not main or not re.search(r'<header\b[^>]*class=["\'][^"\']*hero', main.group(1), re.IGNORECASE) or 'id="article-library"' not in main.group(1):
        failures.append("archive index hero and library are not contained in the main landmark")

    if failures:
        print(f"Built archive validation failed ({len(failures)}):")
        for failure in failures[:100]:
            print(f"- {failure}")
        return 1
    print(f"Built archive validation passed for {len(expected)} articles and {len(html_files)} HTML documents.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
