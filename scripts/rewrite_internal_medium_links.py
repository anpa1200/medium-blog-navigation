from __future__ import annotations

import os
import re
from urllib.parse import parse_qs, unquote, urlparse
from pathlib import Path


SITE_ROOT = Path(__file__).resolve().parents[1]
ARTICLES_ROOT = SITE_ROOT / "docs" / "articles"
DOC_ROOTS = [SITE_ROOT / "docs" / "articles", SITE_ROOT / "docs" / "labs"]

POST_ID_RE = re.compile(r"([0-9a-f]{12})", re.IGNORECASE)
MEDIUM_HOST_RE = re.compile(
    r"^https?://(?:www\.)?(?:medium\.com|infosecwriteups\.com)/",
    re.IGNORECASE,
)
MARKDOWN_LINK_RE = re.compile(r"\[([^\]]*)\]\((https?://[^)\s]+)\)")
BARE_MEDIUM_URL_RE = re.compile(
    r"(?<!\]\()https?://(?:www\.)?(?:medium\.com|infosecwriteups\.com)/[^\s<>)\]\"']*[0-9a-f]{12}[^\s<>)\]\"']*",
    re.IGNORECASE,
)
CARD_FRAGMENT_RE = re.compile(
    r"(?P<title>\*[^*\n]+?\*)"
    r"(?P<host>(?:medium|infosecwriteups)\.com)"
    r"\]\((?P<url>https?://[^)\s]+)\)"
    r"(?:\[\]\((?P<empty>[^)]*)\))?",
    re.IGNORECASE,
)


def article_targets() -> tuple[dict[str, Path], dict[str, Path]]:
    targets: dict[str, Path] = {}
    slug_targets: dict[str, Path] = {}
    for path in ARTICLES_ROOT.rglob("*.md"):
        if path.name == "index.md":
            continue
        match = re.search(r"([0-9a-f]{12})\.md$", path.name, re.IGNORECASE)
        if match:
            targets[match.group(1).lower()] = path
            slug = re.sub(r"^\d{4}-\d{2}-\d{2}-", "", path.stem)
            slug = re.sub(r"-[0-9a-f]{12}$", "", slug, flags=re.IGNORECASE)
            slug_targets[slug] = path
    return targets, slug_targets


def embedded_medium_url(url: str) -> str:
    parsed = urlparse(url)
    if parsed.netloc.lower() in {"www.google.com", "google.com"}:
        query = parse_qs(parsed.query).get("q", [""])[0]
        if "medium.com/" in query or "infosecwriteups.com/" in query:
            return unquote(query)
    return unquote(url)


def post_id_from_url(url: str) -> str | None:
    url = embedded_medium_url(url)
    if not MEDIUM_HOST_RE.match(url):
        return None
    matches = POST_ID_RE.findall(url)
    return matches[-1].lower() if matches else None


def slug_from_url(url: str) -> str | None:
    url = embedded_medium_url(url)
    if not MEDIUM_HOST_RE.match(url):
        return None
    parsed = urlparse(url)
    segment = parsed.path.rstrip("/").rsplit("/", 1)[-1]
    segment = re.sub(r"-[0-9a-f]{12}$", "", segment, flags=re.IGNORECASE)
    return segment or None


def target_from_url(url: str, targets: dict[str, Path], slug_targets: dict[str, Path]) -> Path | None:
    post_id = post_id_from_url(url)
    if post_id and post_id in targets:
        return targets[post_id]

    slug = slug_from_url(url)
    if not slug:
        return None
    if slug in slug_targets:
        return slug_targets[slug]

    candidates = [
        path
        for article_slug, path in slug_targets.items()
        if len(slug) >= 20 and (slug.startswith(article_slug) or article_slug.startswith(slug))
    ]
    return candidates[0] if len(candidates) == 1 else None


def doc_link(source: Path, target: Path) -> str:
    return os.path.relpath(target, start=source.parent).replace(os.sep, "/")


def rewrite_line(
    line: str,
    source: Path,
    targets: dict[str, Path],
    slug_targets: dict[str, Path],
) -> tuple[str, int]:
    if "**Source article:**" in line:
        return line, 0

    replacements = 0

    def replace_card_fragment(match: re.Match[str]) -> str:
        nonlocal replacements
        title, url = match.group("title"), match.group("url")
        target = target_from_url(url, targets, slug_targets)
        if not target:
            return match.group(0)
        replacements += 1
        label = title.strip("*")
        return f"[{label}]({doc_link(source, target)})"

    line = CARD_FRAGMENT_RE.sub(replace_card_fragment, line)

    def replace_markdown(match: re.Match[str]) -> str:
        nonlocal replacements
        label, url = match.group(1), match.group(2)
        target = target_from_url(url, targets, slug_targets)
        if not target:
            return match.group(0)
        local_link = doc_link(source, target)
        replacements += 1
        if embedded_medium_url(label) == embedded_medium_url(url):
            label = local_link
        return f"[{label}]({local_link})"

    line = MARKDOWN_LINK_RE.sub(replace_markdown, line)

    def replace_bare(match: re.Match[str]) -> str:
        nonlocal replacements
        url = match.group(0)
        target = target_from_url(url, targets, slug_targets)
        if not target:
            return url
        replacements += 1
        return doc_link(source, target)

    line = BARE_MEDIUM_URL_RE.sub(replace_bare, line)
    return line, replacements


def rewrite_file(path: Path, targets: dict[str, Path], slug_targets: dict[str, Path]) -> int:
    lines = path.read_text(encoding="utf-8").splitlines()
    out: list[str] = []
    replacements = 0

    for line in lines:
        new_line, count = rewrite_line(line, path, targets, slug_targets)
        replacements += count
        out.append(new_line)

    if replacements:
        path.write_text("\n".join(out) + "\n", encoding="utf-8")
    return replacements


def main() -> None:
    targets, slug_targets = article_targets()
    total_files = 0
    total_replacements = 0

    for root in DOC_ROOTS:
        for path in root.rglob("*.md"):
            count = rewrite_file(path, targets, slug_targets)
            if count:
                total_files += 1
                total_replacements += count
                print(f"{path.relative_to(SITE_ROOT)}: {count}")

    print(f"article targets: {len(targets)}")
    print(f"files changed: {total_files}")
    print(f"links rewritten: {total_replacements}")


if __name__ == "__main__":
    main()
