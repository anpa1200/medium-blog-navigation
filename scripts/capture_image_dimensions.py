#!/usr/bin/env python3
from __future__ import annotations

import argparse
import concurrent.futures
from html import escape
from io import BytesIO
import json
import re
from pathlib import Path
from urllib.request import Request, urlopen

from bs4 import BeautifulSoup
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
EXPORTS = ROOT.parent / "medium-export" / "posts"
ARTICLES = ROOT / "docs" / "articles"
MANIFEST = ROOT / "src" / "data" / "image-dimensions.json"
IMAGE = re.compile(r"!\[([^\]]*)\]\((https?://[^)\s]+)\)")


def export_dimensions() -> dict[str, dict[str, int]]:
    dimensions: dict[str, dict[str, int]] = {}
    for path in sorted(EXPORTS.glob("*.html")):
        soup = BeautifulSoup(path.read_text(encoding="utf-8", errors="ignore"), "html.parser")
        for image in soup.find_all("img"):
            url = str(image.get("src") or "")
            width = image.get("data-width") or image.get("width")
            height = image.get("data-height") or image.get("height")
            try:
                width, height = int(width), int(height)
            except (TypeError, ValueError):
                continue
            if url and width > 0 and height > 0:
                dimensions[url] = {"width": width, "height": height, "source": "export-metadata"}
    return dimensions


def fetch_dimensions(url: str) -> tuple[str, dict[str, int] | None]:
    request = Request(url, headers={"User-Agent": "1200km-archive-image-metadata/1.0", "Accept": "image/*"})
    try:
        with urlopen(request, timeout=30) as response:
            payload = response.read(20_000_000)
        with Image.open(BytesIO(payload)) as image:
            width, height = image.size
        if width > 0 and height > 0:
            return url, {"width": width, "height": height, "source": "image-response"}
    except Exception as error:
        print(f"Unable to determine dimensions for {url}: {error}")
    return url, None


def render(alt: str, url: str, dimensions: dict[str, int], eager: bool) -> str:
    loading = 'loading="eager" fetchpriority="high"' if eager else 'loading="lazy"'
    return (
        f'<img src="{escape(url, quote=True)}" alt="{escape(alt, quote=True)}" '
        f'width="{dimensions["width"]}" height="{dimensions["height"]}" '
        f'{loading} decoding="async" />'
    )


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--workers", type=int, default=12)
    parser.add_argument("--no-fetch", action="store_true")
    args = parser.parse_args()
    dimensions = export_dimensions()
    if MANIFEST.exists():
        dimensions.update(json.loads(MANIFEST.read_text(encoding="utf-8")))

    files = sorted(path for path in ARTICLES.rglob("*.md") if path.name != "index.md")
    urls = sorted({match.group(2) for path in files for match in IMAGE.finditer(path.read_text(encoding="utf-8"))})
    missing = [url for url in urls if url not in dimensions]
    if missing and not args.no_fetch:
        with concurrent.futures.ThreadPoolExecutor(max_workers=args.workers) as executor:
            for url, value in executor.map(fetch_dimensions, missing):
                if value:
                    dimensions[url] = value

    unresolved = [url for url in urls if url not in dimensions]
    if unresolved:
        print(f"Image dimension capture failed for {len(unresolved)} URL(s).")
        for url in unresolved[:20]:
            print(f"- {url}")
        return 1

    changed = 0
    replacements = 0
    for path in files:
        text = path.read_text(encoding="utf-8")
        image_index = 0

        def replace(match: re.Match[str]) -> str:
            nonlocal image_index, replacements
            value = render(match.group(1), match.group(2), dimensions[match.group(2)], image_index == 0)
            image_index += 1
            replacements += 1
            return value

        updated = IMAGE.sub(replace, text)
        if updated != text:
            path.write_text(updated, encoding="utf-8")
            changed += 1

    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST.write_text(json.dumps(dict(sorted(dimensions.items())), indent=2) + "\n", encoding="utf-8")
    print(f"Captured {len(dimensions)} image dimension records; rewrote {replacements} images in {changed} article files.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
