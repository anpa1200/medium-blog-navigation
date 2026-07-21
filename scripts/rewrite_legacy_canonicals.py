from __future__ import annotations

import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
BUILD = ROOT / "build"
OLD_ORIGIN = "https://1200km.com/medium-blog-navigation"
NEW_ORIGIN = "https://1200km.com/articles"


def target_for(path: Path) -> str | None:
    relative = path.relative_to(BUILD).as_posix()
    if relative == "index.html":
        return f"{NEW_ORIGIN}/"
    match = re.fullmatch(r"docs/articles(?:/(.*?))?(?:/index)?\.html", relative)
    if not match:
        return None
    article_path = (match.group(1) or "").removesuffix("/index")
    return f"{NEW_ORIGIN}/read/{article_path}" if article_path else f"{NEW_ORIGIN}/"


def main() -> int:
    changed = 0
    for path in BUILD.rglob("*.html"):
        target = target_for(path)
        if not target:
            continue
        text = path.read_text(encoding="utf-8")
        text = re.sub(
            r'(<link\b[^>]*\brel="canonical"[^>]*\bhref=")[^"]+("[^>]*>)',
            rf"\g<1>{target}\2",
            text,
            count=1,
        )
        text = re.sub(
            r'(<meta\b[^>]*\bproperty="og:url"[^>]*\bcontent=")[^"]+("[^>]*>)',
            rf"\g<1>{target}\2",
            text,
            count=1,
        )
        if 'name="robots"' not in text:
            text = text.replace("</head>", '<meta name="robots" content="noindex,follow">\n</head>', 1)
        path.write_text(text, encoding="utf-8")
        changed += 1
    if changed == 0:
        print(f"No legacy pages found below {BUILD}")
        return 1
    print(f"Rewrote canonical metadata for {changed} legacy archive pages from {OLD_ORIGIN} to {NEW_ORIGIN}.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
