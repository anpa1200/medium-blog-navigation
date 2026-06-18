from __future__ import annotations

import json
import re
from pathlib import Path

from bs4 import BeautifulSoup
from bs4.element import Tag


EXPORT_ROOT = Path(
    "/home/andrey/Downloads/medium-export-e081169497ae0bce4a7b8c61527792cc22bc5635d98f9052a6a6422ae08a2c27 (1)/posts"
)
SITE_ROOT = Path(__file__).resolve().parents[1]
ARTICLES_ROOT = SITE_ROOT / "docs" / "articles"


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
    img = soup.select_one("section.e-content img") or soup.find("img")
    return img.get("src", "") if img else ""


def image_markdown(node: Tag) -> str:
    img = node if node.name == "img" else node.find("img")
    if not img or not img.get("src"):
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


def article_body(soup: BeautifulSoup, title: str) -> str:
    content = soup.select_one("section.e-content") or soup
    nodes = content.select(".graf")
    seen_title = [False]
    blocks: list[str] = []
    for node in nodes:
        text = node.get_text(" ", strip=True)
        if text in {"Follow My Work", "Andrey Pautov"}:
            continue
        if "Portfolio / Knowledge Base:" in text or "buy me a coffee" in text:
            continue
        block = block_to_md(node, title, seen_title).strip()
        if block:
            blocks.append(block)
    return "\n\n".join(blocks).strip()


def medium_url(title: str, post_id: str) -> str:
    return f"https://medium.com/@1200km/{slugify(title)}-{post_id}"


def category_for(title: str, text: str) -> str:
    hay = f"{title} {text}".lower()
    if any(k in hay for k in ["cti", "threat intelligence", "apt", "attribution", "ioc"]):
        return "CTI"
    if any(k in hay for k in ["malware", "apk", "reverse", "static analysis", "unpacker"]):
        return "Malware"
    if any(k in hay for k in ["kubernetes", "eks", "cloud", "aws", "gcp", "terraform"]):
        return "Cloud & Kubernetes"
    if any(k in hay for k in ["active directory", "adcs", "windows lab", "metasploitable", "pentest", "burp", "nmap", "hydra", "sqlmap"]):
        return "Offensive Security"
    if any(k in hay for k in ["detection", "sigma", "soc", "siem", "hunting", "fluent bit"]):
        return "Detection Engineering"
    if any(k in hay for k in ["ai", "llm", "gemini", "hexstrike", "cursor"]):
        return "AI Security"
    return "Security Research"


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
        line = line.replace("<", "&lt;").replace(">", "&gt;")
        out.append(line)
    path.write_text("\n".join(out) + "\n", encoding="utf-8")


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

{article_body(soup, title)}
"""
        out_path.write_text(content, encoding="utf-8")
        sanitize_generated_markdown(out_path)

    return {
        "title": title,
        "date": date,
        "year": year,
        "slug": slug,
        "path": out_path,
        "images": images,
        "code": code_blocks,
        "category": category,
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


def main() -> None:
    ARTICLES_ROOT.mkdir(parents=True, exist_ok=True)
    posts = sorted(path for path in EXPORT_ROOT.glob("*.html") if not path.name.startswith("draft_"))
    rows = [write_article(path) for path in posts]
    write_category_files({row["year"] for row in rows})
    write_index(rows)
    print(f"Generated article archive for {len(rows)} posts.")
    print(f"Images: {sum(row['images'] for row in rows)}")
    print(f"Code blocks: {sum(row['code'] for row in rows)}")
    for year in sorted({row["year"] for row in rows}, reverse=True):
        print(f"{year}: {sum(1 for row in rows if row['year'] == year)}")


if __name__ == "__main__":
    main()
