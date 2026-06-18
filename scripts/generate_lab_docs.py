from __future__ import annotations

import re
import json
from pathlib import Path

from bs4 import BeautifulSoup
from bs4.element import Tag


EXPORT_ROOT = Path(
    "/home/andrey/Downloads/medium-export-e081169497ae0bce4a7b8c61527792cc22bc5635d98f9052a6a6422ae08a2c27 (1)/posts"
)
SITE_ROOT = Path(__file__).resolve().parents[1]
DOCS_ROOT = SITE_ROOT / "docs" / "labs"


LABS = [
    {
        "post_id": "6dc39f0b3bb3",
        "slug": "vulnerable-windows-vm",
        "category": "Vulnerable Infrastructure",
        "repo": "",
        "repo_note": "No dedicated repository was found locally; the deployment scripts are preserved in the article body.",
    },
    {
        "post_id": "026d74697c4a",
        "slug": "safe-dvwa-ansible-lab",
        "category": "Vulnerable Web",
        "repo": "",
        "repo_note": "No dedicated repository was found locally; the Ansible flow is preserved in the article body.",
    },
    {
        "post_id": "b2ab2cdd4139",
        "slug": "hackerai-metasploitable-lab",
        "category": "AI-Assisted Pentest",
        "repo": "https://github.com/anpa1200/Hexstrike-AI-guide",
    },
    {
        "post_id": "00a9e88b3bde",
        "slug": "hexstrike-home-network-lab",
        "category": "AI-Assisted Pentest",
        "repo": "https://github.com/anpa1200/Hexstrike-AI-guide",
    },
    {
        "post_id": "67f3dae32040",
        "slug": "hexstrike-webapp-pentest-lab",
        "category": "AI-Assisted Pentest",
        "repo": "https://github.com/anpa1200/Hexstrike-AI-guide",
    },
    {
        "post_id": "6477c06f6af4",
        "slug": "hexstrike-wireless-pentest-lab",
        "category": "AI-Assisted Pentest",
        "repo": "https://github.com/anpa1200/Hexstrike-AI-guide",
    },
    {
        "post_id": "b892c07be39f",
        "slug": "hexstrike-metasploitable-lab",
        "category": "AI-Assisted Pentest",
        "repo": "https://github.com/anpa1200/Hexstrike-AI-guide",
    },
    {
        "post_id": "9290d388744c",
        "slug": "vulnerable-windows-10-lab",
        "category": "Vulnerable Infrastructure",
        "repo": "",
        "repo_note": "No dedicated repository was found locally; the Windows 10 lab build steps are preserved in the article body.",
    },
    {
        "post_id": "90034032775b",
        "slug": "vulnerable-ubuntu-server-lab",
        "category": "Vulnerable Infrastructure",
        "repo": "",
        "repo_note": "No dedicated repository was found locally; the Ubuntu lab build steps are preserved in the article body.",
    },
    {
        "post_id": "f2e1fd793ad7",
        "slug": "hexstrike-subnet-compromise-lab",
        "category": "AI-Assisted Pentest",
        "repo": "https://github.com/anpa1200/Hexstrike-AI-guide",
    },
    {
        "post_id": "b96ed2053071",
        "slug": "one-prompt-android-pt-lab",
        "category": "Mobile Security",
        "repo": "https://github.com/anpa1200/Vulnerable-APK",
    },
    {
        "post_id": "ff926fd2b3fc",
        "slug": "active-directory-one-prompt-lab",
        "category": "Active Directory",
        "repo": "",
        "repo_note": "No dedicated repository was found locally; the generated AD lab files are preserved in the article body.",
    },
    {
        "post_id": "cab28cd4ad8d",
        "slug": "active-directory-manual-lab",
        "category": "Active Directory",
        "repo": "",
        "repo_note": "No dedicated repository was found locally; the manual AD deployment flow is preserved in the article body.",
    },
    {
        "post_id": "745cfb31d7d3",
        "slug": "active-directory-pentest-lab",
        "category": "Active Directory",
        "repo": "",
        "repo_note": "No dedicated repository was found locally; the article contains the operational testing flow.",
    },
    {
        "post_id": "8de0b9ad38b7",
        "slug": "ai-black-box-active-directory-lab",
        "category": "Active Directory",
        "repo": "https://github.com/anpa1200/Hexstrike-AI-guide",
    },
    {
        "post_id": "7ec76562fa6d",
        "slug": "adcs-esc8-lab",
        "category": "Active Directory",
        "repo": "",
        "repo_note": "No dedicated repository was found locally; commands and attack flow are preserved in the article body.",
    },
    {
        "post_id": "9d1edfcd8eff",
        "slug": "vulnerable-gcp-pentest-lab",
        "category": "Cloud",
        "repo": "https://github.com/anpa1200/vulnerable-cloud-lab",
    },
    {
        "post_id": "1914f687d7fd",
        "slug": "cloud-pentest-walkthrough",
        "category": "Cloud",
        "repo": "https://github.com/anpa1200/vulnerable-cloud-lab",
    },
    {
        "post_id": "01c02eed5258",
        "slug": "ai-web-cloud-pentest-lab",
        "category": "Cloud",
        "repo": "https://github.com/anpa1200/vulnerable-cloud-lab",
    },
    {
        "post_id": "fae4fc8e3a91",
        "slug": "vulnerable-kubernetes-lab",
        "category": "Kubernetes",
        "repo": "https://github.com/anpa1200/CTI/tree/main/Kubernetes",
    },
    {
        "post_id": "56350b178af4",
        "slug": "black-box-kubernetes-pentest-playbook",
        "category": "Kubernetes",
        "repo": "https://github.com/anpa1200/CTI/tree/main/Kubernetes",
    },
    {
        "post_id": "c75a4747960e",
        "slug": "one-prompt-kubernetes-pentest",
        "category": "Kubernetes",
        "repo": "https://github.com/anpa1200/CTI/tree/main/Kubernetes",
    },
    {
        "post_id": "9e39bc3eb96d",
        "slug": "gcp-penetration-testing-attack-guide",
        "category": "Cloud",
        "repo": "https://github.com/anpa1200/vulnerable-cloud-lab",
    },
    {
        "post_id": "8fe947e8439e",
        "slug": "vulnerable-iis-sharepoint-fluent-bit-lab",
        "category": "Vulnerable Infrastructure",
        "repo": "",
        "repo_note": "No dedicated repository was found locally; Vagrant, provisioning, IIS, and Fluent Bit files are preserved in the article body.",
    },
    {
        "post_id": "4a09fff37622",
        "slug": "android-app-analysis-lab",
        "category": "Mobile Security",
        "repo": "https://github.com/anpa1200/Android-Malware-Analysis",
    },
    {
        "post_id": "7be775fc6415",
        "slug": "vulnerable-android-app-owasp-mstg",
        "category": "Mobile Security",
        "repo": "https://github.com/anpa1200/Vulnerable-APK",
    },
    {
        "post_id": "3747e96314dd",
        "slug": "vulnerable-ai-lab",
        "category": "AI Security",
        "repo": "https://github.com/anpa1200/AI-PT-Lab",
    },
    {
        "post_id": "516dbdabbf86",
        "slug": "llm-agent-attack-lab",
        "category": "AI Security",
        "repo": "https://github.com/anpa1200/AI-PT-Lab",
    },
    {
        "post_id": "38602f432e5c",
        "slug": "operation-dragonrx-lab-architecture",
        "category": "CTI Emulation",
        "repo": "https://github.com/anpa1200/dragonrx-lab",
    },
    {
        "post_id": "91339316f0df",
        "slug": "operation-dragonrx-attack-playbook",
        "category": "CTI Emulation",
        "repo": "https://github.com/anpa1200/dragonrx-lab",
    },
    {
        "post_id": "cd6e2147ce59",
        "slug": "dockerized-ai-host-vulnerability-assessment",
        "category": "Tooling",
        "repo": "https://github.com/anpa1200/AI-PT-Lab",
    },
    {
        "post_id": "9858ac96b29e",
        "slug": "vulnerable-cloud-pentest-lab-terraform",
        "category": "Cloud",
        "repo": "https://github.com/anpa1200/vulnerable-cloud-lab",
    },
]


def md_escape(text: str) -> str:
    text = text.replace("\u00a0", " ").replace("\u200a", " ")
    text = text.replace("<", "&lt;").replace(">", "&gt;")
    text = text.replace("{", "&#123;").replace("}", "&#125;")
    return text.strip()


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


def file_for_post(post_id: str) -> Path:
    matches = sorted(EXPORT_ROOT.glob(f"*{post_id}.html"))
    if not matches:
        raise FileNotFoundError(post_id)
    return matches[0]


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


def image_markdown(node: Tag) -> str:
    img = node if node.name == "img" else node.find("img")
    if not img:
        return ""
    src = img.get("src")
    if not src:
        return ""
    caption = ""
    figcaption = node.find("figcaption") if node.name == "figure" else None
    if figcaption:
        caption = md_escape(figcaption.get_text(" ", strip=True))
    alt = md_escape(img.get("alt") or caption or "Article screenshot")
    lines = [f"![{alt}]({src})"]
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
    if name in {"blockquote"} or "graf--blockquote" in classes:
        text = md_escape(node.get_text(" ", strip=True))
        return "\n".join(f"> {line}" for line in text.splitlines())
    if name in {"h1", "h2", "h3", "h4"}:
        text = md_escape(node.get_text(" ", strip=True))
        if not seen_title[0] and text == title:
            seen_title[0] = True
            return ""
        level = {"h1": "#", "h2": "##", "h3": "##", "h4": "###"}[name]
        return f"{level} {text}"
    if name == "li" or "graf--li" in classes:
        text = inline_md(node)
        return f"- {text}"
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
    slug = re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")
    return f"https://medium.com/@1200km/{slug}-{post_id}"


def write_article(lab: dict) -> dict:
    source = file_for_post(lab["post_id"])
    soup = BeautifulSoup(source.read_text(errors="ignore"), "html.parser")
    title = title_for(soup, lab["slug"])
    summary = summary_for(soup)
    date = source.name[:10] if source.name[:4].isdigit() else ""
    images = len(soup.find_all("img"))
    code_blocks = len(soup.find_all("pre"))
    out = DOCS_ROOT / f"{lab['slug']}.md"
    created = False

    if not out.exists():
        repo_line = (
            f"- **Repository:** [{lab['repo']}]({lab['repo']})"
            if lab.get("repo")
            else f"- **Repository:** Not found as a dedicated local repo. {lab.get('repo_note', '')}"
        )
        body = article_body(soup, title)
        content = f"""---
id: {json.dumps(lab['slug'])}
title: {json.dumps(title)}
description: {json.dumps(summary)}
---

# {title}

:::info Lab Metadata
- **Category:** {lab['category']}
- **Source article:** [{medium_url(title, lab['post_id'])}]({medium_url(title, lab['post_id'])})
- **Published:** {date}
{repo_line}
- **Preserved media:** {images} article image(s), including screenshots and infographics where present.
- **Preserved technical blocks:** {code_blocks} code/configuration block(s).
:::

## Ecosystem Fit

This page mirrors the original Medium lab content into the 1200km knowledge base so it remains available inside the `1200km.com` documentation ecosystem. Use the linked repository when one exists; otherwise use the deployment commands and configuration blocks preserved below as the lab source of truth.

## Deployment Requirements

The full prerequisites, deployment flow, validation commands, screenshots, and operational notes are preserved from the article below. Review the repository metadata above first, then follow the article sections in order.

{body}
"""
        out.write_text(content, encoding="utf-8")
        created = True
    return {
        "slug": lab["slug"],
        "title": title,
        "category": lab["category"],
        "repo": lab.get("repo", ""),
        "date": date,
        "images": images,
        "code": code_blocks,
        "created": created,
    }


def write_index(rows: list[dict]) -> None:
    groups: dict[str, list[dict]] = {}
    for row in rows:
        groups.setdefault(row["category"], []).append(row)

    lines = [
        "---",
        'id: "index"',
        'title: "Labs and Deployment Guides"',
        'description: "1200km lab index for vulnerable environments, AI-assisted pentesting, cloud, Kubernetes, Android, and CTI emulation."',
        "---",
        "",
        "# Labs and Deployment Guides",
        "",
        "This section collects the practical labs from the Medium export into the 1200km.com Docusaurus ecosystem. Each page keeps the original article flow, command blocks, screenshots, infographics, and repository linkage where a matching implementation repo exists.",
        "",
        "## Lab Matrix",
        "",
    ]
    for category in sorted(groups):
        lines.extend([f"### {category}", ""])
        for row in sorted(groups[category], key=lambda item: item["date"]):
            repo = f" | [repo]({row['repo']})" if row["repo"] else " | repo: article-only"
            lines.append(
                f"- [{row['title']}](./{row['slug']}) - {row['date']} | {row['images']} image(s) | {row['code']} code block(s){repo}"
            )
        lines.append("")
    (DOCS_ROOT / "index.md").write_text("\n".join(lines), encoding="utf-8")


def write_sidebars(rows: list[dict]) -> None:
    categories: dict[str, list[str]] = {}
    for row in rows:
        categories.setdefault(row["category"], []).append(row["slug"])
    blocks = ["module.exports = {", "  docsSidebar: [", "    'analysis',", "    'reading-paths',", "    {", "      type: 'category',", "      label: 'Labs',", "      collapsed: false,", "      items: ["]
    blocks.append("        'labs/index',")
    for category in sorted(categories):
        blocks.extend(
            [
                "        {",
                "          type: 'category',",
                f"          label: '{category}',",
                "          collapsed: true,",
                "          items: [",
            ]
        )
        for slug in sorted(categories[category]):
            blocks.append(f"            'labs/{slug}',")
        blocks.extend(["          ],", "        },"])
    blocks.extend(["      ],", "    },", "  ],", "};", ""])
    (SITE_ROOT / "sidebars.js").write_text("\n".join(blocks), encoding="utf-8")


def main() -> None:
    DOCS_ROOT.mkdir(parents=True, exist_ok=True)
    rows = [write_article(lab) for lab in LABS]
    write_index(rows)
    write_sidebars(rows)
    created = sum(1 for row in rows if row["created"])
    print(f"Generated index/sidebar. Created {created} new lab pages, skipped {len(rows) - created} existing pages.")
    for row in rows:
        status = "created" if row["created"] else "exists"
        print(f"{status}: {row['slug']} :: {row['title']}")


if __name__ == "__main__":
    main()
