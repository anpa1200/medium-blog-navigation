from __future__ import annotations

from email.utils import parsedate_to_datetime
import json
import re
from pathlib import Path
from urllib.parse import urlsplit, urlunsplit
from urllib.request import Request, urlopen
from xml.etree import ElementTree as ET

from bs4 import BeautifulSoup

from article_taxonomy import category_for_taxonomy, tags_for
from bs4.element import Tag


SITE_ROOT = Path(__file__).resolve().parents[1]
EXPORT_ROOT = SITE_ROOT.parent / "medium-export" / "posts"
ARTICLES_ROOT = SITE_ROOT / "docs" / "articles"
CATALOG_PATH = SITE_ROOT / "src" / "data" / "article-catalog.json"
MEDIUM_RSS_URL = "https://medium.com/feed/@1200km"
RSS_NAMESPACES = {
    "content": "http://purl.org/rss/1.0/modules/content/",
}


def md_escape(text: str) -> str:
    text = text.replace("\u00a0", " ").replace("\u200a", " ")
    text = text.replace("<", "&lt;").replace(">", "&gt;")
    text = text.replace("{", "&#123;").replace("}", "&#125;")
    return text.strip()


def slugify(text: str) -> str:
    text = text.lower().replace("&", " and ")
    text = re.sub(r"[^a-z0-9]+", "-", text).strip("-")
    return re.sub(r"-{2,}", "-", text)[:90].strip("-") or "article"


def post_id_from_path(path: Path) -> str:
    return path.stem.rsplit("-", 1)[-1]


def inline_md(node) -> str:
    if isinstance(node, str):
        return md_escape(node)
    if not isinstance(node, Tag):
        return ""

    text = "".join(inline_md(child) for child in node.children)
    name = node.name.lower()
    href = node.get("href")

    if name in {"strong", "b"}:
        return f"**{text}**"
    if name in {"em", "i"}:
        return f"*{text}*"
    if name == "code":
        return f"`{text.replace('`', '\\`')}`"
    if name == "br":
        return "\n"
    if name == "a" and href:
        if href.startswith("#"):
            return text
        href = href.rstrip(".,")
        if not re.match(r"^(https?|mailto|tel):", href):
            return text
        if href.startswith("https://anpa1200.github.io/"):
            href = href.replace("https://anpa1200.github.io/", "https://1200km.com/", 1)
        if href.startswith("https://1200km.com/"):
            return f'<a href="{href}" target="_self">{text}</a>'
        return f"[{text}]({href})"
    return text


def title_for(soup: BeautifulSoup, fallback: str) -> str:
    for selector in ["h1.p-name", "h3.graf--title", "title"]:
        node = soup.select_one(selector)
        if node:
            return md_escape(node.get_text(" ", strip=True))
    return fallback


def summary_for(soup: BeautifulSoup) -> str:
    node = soup.select_one("[data-field=subtitle]")
    if node:
        return md_escape(node.get_text(" ", strip=True))
    first_p = soup.select_one("section.e-content p")
    return md_escape(first_p.get_text(" ", strip=True)) if first_p else ""


def cover_image(soup: BeautifulSoup) -> str:
    img = next((item for item in soup.select("section.e-content img") if not is_tracking_image(item)), None)
    img = img or next((item for item in soup.find_all("img") if not is_tracking_image(item)), None)
    return img.get("src", "") if img else ""


def is_tracking_image(img: Tag) -> bool:
    src = str(img.get("src") or "")
    return "medium.com/_/stat" in src or (img.get("width") == "1" and img.get("height") == "1")


def image_markdown(node: Tag) -> str:
    img = node if node.name == "img" else node.find("img")
    if not img or not img.get("src") or is_tracking_image(img):
        return ""
    figcaption = node.find("figcaption") if node.name == "figure" else None
    caption = md_escape(figcaption.get_text(" ", strip=True)) if figcaption else ""
    alt = md_escape(img.get("alt") or caption or "Article image")
    lines = [f"![{alt}]({img['src']})"]
    if caption:
        lines.append(f"*{caption}*")
    return "\n".join(lines)


def block_to_md(node: Tag, title: str, seen_title: list[bool]) -> str:
    name = node.name.lower()
    classes = set(node.get("class", []))

    if name == "figure" or "graf--figure" in classes:
        return image_markdown(node)
    if name == "pre" or "graf--pre" in classes:
        code = node.get_text("\n", strip=False).strip("\n")
        return f"```text\n{code}\n```"
    if name == "blockquote" or "graf--blockquote" in classes:
        text = md_escape(node.get_text(" ", strip=True))
        return "\n".join(f"> {line}" for line in text.splitlines())
    if name in {"ul", "ol"}:
        lines = []
        for index, item in enumerate(node.find_all("li", recursive=False), start=1):
            text = inline_md(item)
            if not text:
                continue
            marker = f"{index}." if name == "ol" else "-"
            lines.append(f"{marker} {text}")
        return "\n".join(lines)
    if name in {"h1", "h2", "h3", "h4"}:
        text = md_escape(node.get_text(" ", strip=True))
        if not text:
            return ""
        if not seen_title[0] and text == title:
            seen_title[0] = True
            return ""
        level = {"h1": "#", "h2": "##", "h3": "##", "h4": "###"}[name]
        return f"{level} {text}"
    if name == "li" or "graf--li" in classes:
        text = inline_md(node)
        return f"- {text}" if text else ""
    if name in {"p", "div"} or "graf--p" in classes:
        text = inline_md(node)
        if not text or text == "Type caption for image (optional)":
            return ""
        return text
    return ""


def article_body(soup: BeautifulSoup, title: str, cover: str = "") -> str:
    content = soup.select_one("section.e-content") or soup
    nodes = content.select(".graf")
    if not nodes:
        nodes = [child for child in content.children if isinstance(child, Tag)]
    seen_title = [False]
    blocks: list[str] = []
    seen_follow_section = False
    cover_pending = bool(cover)
    for node in nodes:
        text = node.get_text(" ", strip=True)
        if text in {"Follow My Work", "Andrey Pautov"}:
            seen_follow_section = True
            continue
        if seen_follow_section and (
            text.startswith("Portfolio / Knowledge Base:")
            or text.startswith("Medium:")
            or text.startswith("GitHub:")
            or text.startswith("LinkedIn:")
        ):
            continue
        if "Portfolio / Knowledge Base:" in text or "buy me a coffee" in text:
            continue
        if "was originally published in" in text and "on Medium" in text:
            continue
        if cover_pending:
            image = node if node.name == "img" else node.find("img")
            if image and image.get("src") == cover:
                cover_pending = False
                continue
        block = block_to_md(node, title, seen_title).strip()
        if block:
            blocks.append(block)
    return "\n\n".join(blocks).strip()


def medium_url(title: str, post_id: str) -> str:
    return f"https://medium.com/@1200km/{slugify(title)}-{post_id}"


def clean_url(url: str) -> str:
    parts = urlsplit(url)
    return urlunsplit((parts.scheme, parts.netloc, parts.path, "", ""))


def publication_platform(url: str) -> str:
    host = urlsplit(url).netloc.lower().removeprefix("www.")
    if host == "medium.com":
        return "Medium"
    if host == "infosecwriteups.com":
        return "InfoSec Write-ups"
    if host == "bugbountywriteup.com":
        return "Bug Bounty Writeups"
    return host


def canonical_governance(row: dict) -> dict:
    local_url = f"https://1200km.com/articles/read/{row['year']}/{row['slug']}"
    return {
        "canonical_url": local_url,
        "canonical_owner": "1200km.com",
        "preferred_canonical_url": local_url,
        "original_publication_url": row["source_url"],
        "original_publication_platform": publication_platform(row["source_url"]),
        "canonical_migration_status": "migration-pending",
        "external_canonical_verified": False,
        "external_canonical_verified_at": None,
        "migration_note": (
            "Local self-canonical is deliberate. The external publication canonical "
            "has not been verified or changed, so migration remains pending."
        ),
        "source_platform": publication_platform(row["source_url"]),
        "source_repository": "anpa1200/medium-blog-navigation",
        "collection_tier": "archive",
        "updated_at": row["date"],
    }


def category_for(title: str, text: str) -> str:
    return category_for_taxonomy(title, text)


def sanitize_generated_markdown(path: Path) -> None:
    lines = path.read_text(encoding="utf-8").splitlines()
    out: list[str] = []
    in_code = False
    for line in lines:
        if line.startswith("```"):
            in_code = not in_code
            out.append(line)
            continue
        if in_code:
            out.append(line)
            continue
        line = re.sub(r"\]\((https?://[^)]+?)\.\)", r"](\1)", line)
        line = re.sub(r"\[([^\]]+)\]\(#[0-9a-fA-F]{3,8}\)", r"\1", line)
        line = re.sub(r"\[([^\]]+)\]\((?!https?://|mailto:|tel:|#)([^)]+)\)", r"\1", line)
        line = line.replace("<", "&lt;").replace(">", "&gt;")
        out.append(line)
    path.write_text("\n".join(out) + "\n", encoding="utf-8")


def fallback_markdown_summary(text: str, title: str) -> str:
    in_frontmatter = False
    in_code = False
    for index, raw_line in enumerate(text.splitlines()):
        line = raw_line.strip()
        if index == 0 and line == "---":
            in_frontmatter = True
            continue
        if in_frontmatter:
            if line == "---":
                in_frontmatter = False
            continue
        if line.startswith("```"):
            in_code = not in_code
            continue
        if in_code or not line or line.startswith(("#", "- **", ":::", "![", ">")):
            continue
        plain = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", line)
        plain = re.sub(r"[*_`]", "", plain).strip()
        if plain.startswith("This page mirrors the original Medium RSS article"):
            continue
        if len(plain) >= 60:
            return plain[:217].rstrip(" ,.;:") + ("…" if len(plain) > 217 else "")
    return f"{title}. Full local security research article preserved in the 1200km archive."


def maintain_generated_markdown(path: Path, title: str, supplied_summary: str) -> str:
    text = path.read_text(encoding="utf-8")
    supplied_summary = supplied_summary.strip()
    if supplied_summary.startswith("This page mirrors the original Medium RSS article"):
        supplied_summary = ""
    summary = supplied_summary or fallback_markdown_summary(text, title)
    summary = re.sub(r"\\([&*_#])", r"\1", summary)

    def replace_description(match: re.Match[str]) -> str:
        current = match.group(0)
        value = current.partition(":")[2].strip()
        needs_replacement = (
            value in {'""', "''"}
            or "This page mirrors the original Medium RSS article" in value
            or bool(re.search(r'\\[^"\\/bfnrtu]', value))
        )
        if not needs_replacement:
            return current
        return f"description: {json.dumps(summary, ensure_ascii=False)}"

    text = re.sub(
        r'^description:[^\n]*$',
        replace_description,
        text,
        count=1,
        flags=re.MULTILINE,
    )
    path.write_text(text, encoding="utf-8")
    return summary


def write_article(path: Path) -> dict:
    soup = BeautifulSoup(path.read_text(errors="ignore"), "html.parser")
    post_id = post_id_from_path(path)
    title = title_for(soup, path.stem)
    summary = summary_for(soup)
    date = path.name[:10] if path.name[:4].isdigit() else "undated"
    year = date[:4] if date[:4].isdigit() else "undated"
    slug = f"{date}-{slugify(title)}-{post_id}" if date != "undated" else f"{slugify(title)}-{post_id}"
    out_dir = ARTICLES_ROOT / year
    out_dir.mkdir(parents=True, exist_ok=True)
    out_path = out_dir / f"{slug}.md"
    images = len(soup.find_all("img"))
    code_blocks = len(soup.find_all("pre"))
    cover = cover_image(soup)
    body_text = soup.get_text(" ", strip=True)[:5000]
    category = category_for(title, body_text)

    if not out_path.exists():
        fm = {
            "title": title,
            "description": summary,
        }
        if cover:
            fm["image"] = cover
        frontmatter = "---\n" + "\n".join(f"{k}: {json.dumps(v)}" for k, v in fm.items()) + "\n---"
        cover_block = f"\n\n![Cover image]({cover})\n" if cover else ""
        content = f"""{frontmatter}

# {title}
{cover_block}
:::info Article Metadata
- **Category:** {category}
- **Source article:** [{medium_url(title, post_id)}]({medium_url(title, post_id)})
- **Published:** {date}
- **Preserved media:** {images} image(s), including cover images, screenshots, diagrams, and infographics where present.
- **Preserved technical blocks:** {code_blocks} code/configuration block(s).
:::

## Ecosystem Fit

This page mirrors the original Medium article into the 1200km.com Docusaurus ecosystem. The original article flow, images, screenshots, infographics, and technical blocks are preserved from the export.

{article_body(soup, title, cover)}
"""
        out_path.write_text(content, encoding="utf-8")
        sanitize_generated_markdown(out_path)

    return {
        "id": post_id,
        "title": title,
        "summary": summary,
        "date": date,
        "year": year,
        "slug": slug,
        "path": out_path,
        "images": images,
        "code": code_blocks,
        "category": category,
        "source_url": medium_url(title, post_id),
        "cover_image": cover,
    }


def rss_items() -> list[dict]:
    request = Request(MEDIUM_RSS_URL, headers={"User-Agent": "Mozilla/5.0"})
    data = urlopen(request, timeout=30).read()
    root = ET.fromstring(data)
    items: list[dict] = []
    for item in root.findall("./channel/item"):
        title = item.findtext("title") or "Untitled"
        guid = item.findtext("guid") or ""
        post_id = guid.rsplit("/", 1)[-1]
        if not re.fullmatch(r"[0-9a-f]{12,}", post_id):
            continue
        pub_date = item.findtext("pubDate") or ""
        try:
            date = parsedate_to_datetime(pub_date).date().isoformat()
        except (TypeError, ValueError, IndexError):
            date = "undated"
        content = item.findtext("content:encoded", namespaces=RSS_NAMESPACES) or ""
        items.append(
            {
                "title": md_escape(title),
                "post_id": post_id,
                "date": date,
                "link": clean_url(item.findtext("link") or medium_url(title, post_id)),
                "content": content,
                "categories": [node.text or "" for node in item.findall("category")],
            }
        )
    return items


def write_rss_article(item: dict) -> dict:
    soup = BeautifulSoup(item["content"], "html.parser")
    post_id = item["post_id"]
    title = item["title"]
    summary = summary_for(soup)
    date = item["date"]
    year = date[:4] if date[:4].isdigit() else "undated"
    slug = f"{date}-{slugify(title)}-{post_id}" if date != "undated" else f"{slugify(title)}-{post_id}"
    out_dir = ARTICLES_ROOT / year
    out_dir.mkdir(parents=True, exist_ok=True)
    out_path = out_dir / f"{slug}.md"
    images = len([img for img in soup.find_all("img") if not is_tracking_image(img)])
    code_blocks = len(soup.find_all("pre"))
    cover = cover_image(soup)
    body_text = soup.get_text(" ", strip=True)[:5000]
    category = category_for(title, " ".join([body_text, *item.get("categories", [])]))
    source_url = item["link"]

    if not out_path.exists():
        fm = {
            "title": title,
            "description": summary,
        }
        if cover:
            fm["image"] = cover
        frontmatter = "---\n" + "\n".join(f"{k}: {json.dumps(v)}" for k, v in fm.items()) + "\n---"
        cover_block = f"\n\n![Cover image]({cover})\n" if cover else ""
        content = f"""{frontmatter}

# {title}
{cover_block}
:::info Article Metadata
- **Category:** {category}
- **Source article:** [{source_url}]({source_url})
- **Published:** {date}
- **Preserved media:** {images} image(s), including cover images, screenshots, diagrams, and infographics where present.
- **Preserved technical blocks:** {code_blocks} code/configuration block(s).
:::

## Ecosystem Fit

This page mirrors the original Medium RSS article into the 1200km.com Docusaurus ecosystem. The article flow, images, screenshots, infographics, and technical blocks are preserved from the Medium feed.

{article_body(soup, title, cover)}
"""
        out_path.write_text(content, encoding="utf-8")
        sanitize_generated_markdown(out_path)

    return {
        "id": post_id,
        "title": title,
        "summary": summary,
        "date": date,
        "year": year,
        "slug": slug,
        "path": out_path,
        "images": images,
        "code": code_blocks,
        "category": category,
        "source_url": source_url,
        "cover_image": cover,
    }


def frontmatter_value(text: str, key: str, default: str = "") -> str:
    match = re.search(rf"^{re.escape(key)}:\s*(.+)$", text, re.MULTILINE)
    if not match:
        return default
    raw = match.group(1).strip()
    try:
        value = json.loads(raw)
        return str(value)
    except json.JSONDecodeError:
        return raw.strip("\"'")


def read_existing_article(path: Path) -> dict:
    text = path.read_text(encoding="utf-8", errors="ignore")
    post_id = path.stem.rsplit("-", 1)[-1]
    date_match = re.match(r"(\d{4}-\d{2}-\d{2})-", path.stem)
    date = date_match.group(1) if date_match else "undated"
    year = date[:4] if date != "undated" else path.parent.name
    category_match = re.search(r"^- \*\*Category:\*\*\s*(.+)$", text, re.MULTILINE)
    source_match = re.search(r"^- \*\*Source article:\*\*\s*\[[^\]]*\]\((https?://[^)]+)\)", text, re.MULTILINE)
    images_match = re.search(r"^- \*\*Preserved media:\*\*\s*(\d+)", text, re.MULTILINE)
    code_match = re.search(r"^- \*\*Preserved technical blocks:\*\*\s*(\d+)", text, re.MULTILINE)
    title = frontmatter_value(text, "title", path.stem)
    return {
        "id": post_id,
        "title": title,
        "summary": frontmatter_value(text, "description"),
        "date": date,
        "year": year,
        "slug": path.stem,
        "path": path,
        "images": int(images_match.group(1)) if images_match else len(re.findall(r"!\[[^\]]*\]\(", text)),
        "code": int(code_match.group(1)) if code_match else text.count("```") // 2,
        "category": category_match.group(1).strip() if category_match else "Security Research",
        "source_url": source_match.group(1) if source_match else medium_url(title, post_id),
        "cover_image": frontmatter_value(text, "image"),
    }


def write_category_files(years: set[str]) -> None:
    for year in years:
        (ARTICLES_ROOT / year / "_category_.json").write_text(
            json.dumps({"label": year, "collapsed": True}, indent=2) + "\n",
            encoding="utf-8",
        )


def write_index(rows: list[dict]) -> None:
    total_images = sum(row["images"] for row in rows)
    total_code = sum(row["code"] for row in rows)
    lines = [
        "---",
        'title: "Article Archive"',
        'description: "Full local Docusaurus archive of exported Medium articles by Andrey Pautov."',
        "---",
        "",
        "# Article Archive",
        "",
        f"This archive contains `{len(rows)}` exported Medium articles converted into Docusaurus pages inside the 1200km.com ecosystem.",
        "",
        f"- Preserved images/screenshots/infographics: `{total_images}`",
        f"- Preserved code/configuration blocks: `{total_code}`",
        "- Images are referenced from their original Medium CDN URLs so covers and inline screenshots render without lossy local recompression.",
        "",
        "## Articles by Year",
        "",
    ]
    for year in sorted({row["year"] for row in rows}, reverse=True):
        lines.extend([f"### {year}", ""])
        for row in sorted([item for item in rows if item["year"] == year], key=lambda item: item["date"], reverse=True):
            rel = f"./{row['year']}/{row['slug']}"
            lines.append(
                f"- [{row['title']}]({rel}) - {row['date']} | {row['category']} | {row['images']} image(s) | {row['code']} code block(s)"
            )
        lines.append("")
    (ARTICLES_ROOT / "index.md").write_text("\n".join(lines), encoding="utf-8")


def write_catalog(rows: list[dict]) -> None:
    catalog = []
    for row in sorted(rows, key=lambda item: (item["date"], item["title"]), reverse=True):
        item = {
                "id": row["id"],
                "title": row["title"],
                "summary": row["summary"],
                "published_at": row["date"],
                "year": row["year"],
                "category": category_for_taxonomy(row["title"], row["summary"]),
                "tags": tags_for(row["title"], row["summary"]),
                "images": row["images"],
                "code_blocks": row["code"],
                "slug": row["slug"],
                "local_path": f"{row['year']}/{row['slug']}",
                "source_url": row["source_url"],
                "cover_image": row["cover_image"],
            }
        item.update(canonical_governance(row))
        catalog.append(item)
    CATALOG_PATH.parent.mkdir(parents=True, exist_ok=True)
    CATALOG_PATH.write_text(json.dumps(catalog, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def main() -> None:
    ARTICLES_ROOT.mkdir(parents=True, exist_ok=True)
    posts = sorted(path for path in EXPORT_ROOT.glob("*.html") if not path.name.startswith("draft_"))
    rows = [write_article(path) for path in posts]
    existing_ids = {post_id_from_path(path) for path in posts}
    for item in rss_items():
        if item["post_id"] not in existing_ids:
            rows.append(write_rss_article(item))
            existing_ids.add(item["post_id"])
    for path in sorted(ARTICLES_ROOT.glob("*/*.md")):
        post_id = path.stem.rsplit("-", 1)[-1]
        if post_id not in existing_ids:
            rows.append(read_existing_article(path))
            existing_ids.add(post_id)
    for row in rows:
        row["summary"] = maintain_generated_markdown(row["path"], row["title"], row["summary"])
    write_category_files({row["year"] for row in rows})
    write_index(rows)
    write_catalog(rows)
    print(f"Generated article archive for {len(rows)} posts.")
    print(f"Images: {sum(row['images'] for row in rows)}")
    print(f"Code blocks: {sum(row['code'] for row in rows)}")
    for year in sorted({row["year"] for row in rows}, reverse=True):
        print(f"{year}: {sum(1 for row in rows if row['year'] == year)}")


if __name__ == "__main__":
    main()
