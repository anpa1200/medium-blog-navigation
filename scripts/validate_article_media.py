from __future__ import annotations

import argparse
import concurrent.futures
from dataclasses import dataclass
import re
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import unquote, urlsplit
from urllib.request import Request, urlopen


SITE_ROOT = Path(__file__).resolve().parents[1]
DOCS_ROOT = SITE_ROOT / "docs"
SRC_ROOT = SITE_ROOT / "src"
STATIC_ROOT = SITE_ROOT / "static"
REPORT_PATH = DOCS_ROOT / "media-validation.md"

MARKDOWN_IMAGE_RE = re.compile(r"!\[[^\]]*\]\(([^)\s]+)(?:\s+\"[^\"]*\")?\)")
FRONTMATTER_IMAGE_RE = re.compile(r"^image:\s*[\"']?([^\"'\n]+)[\"']?\s*$", re.MULTILINE)
HTML_IMAGE_RE = re.compile(r"<img\b[^>]*\bsrc=[\"']([^\"']+)[\"']", re.IGNORECASE)
CSS_URL_RE = re.compile(r"url\([\"']?([^\"')]+)[\"']?\)")
FENCED_CODE_RE = re.compile(r"```.*?```", re.DOTALL)


@dataclass(frozen=True)
class MediaRef:
    owner: Path
    url: str
    kind: str


@dataclass(frozen=True)
class CheckResult:
    url: str
    ok: bool
    status: str
    detail: str


def clean_ref(raw: str) -> str:
    raw = raw.strip()
    if raw.startswith("<") and raw.endswith(">"):
        raw = raw[1:-1]
    return raw.replace("&amp;", "&")


def iter_markdown_refs() -> list[MediaRef]:
    refs: list[MediaRef] = []
    for path in sorted(DOCS_ROOT.rglob("*.md")):
        if path == REPORT_PATH:
            continue
        text = path.read_text(encoding="utf-8", errors="ignore")
        searchable_text = FENCED_CODE_RE.sub("", text)
        frontmatter_text = frontmatter(searchable_text)
        for match in MARKDOWN_IMAGE_RE.finditer(searchable_text):
            refs.append(MediaRef(path, clean_ref(match.group(1)), "markdown-image"))
        for match in HTML_IMAGE_RE.finditer(searchable_text):
            refs.append(MediaRef(path, clean_ref(match.group(1)), "html-image"))
        for match in FRONTMATTER_IMAGE_RE.finditer(frontmatter_text):
            refs.append(MediaRef(path, clean_ref(match.group(1)), "frontmatter-image"))
    return refs


def frontmatter(text: str) -> str:
    if not text.startswith("---\n"):
        return ""
    end = text.find("\n---", 4)
    return text[4:end] if end != -1 else ""


def iter_css_refs() -> list[MediaRef]:
    refs: list[MediaRef] = []
    for path in sorted(SRC_ROOT.rglob("*.css")):
        text = path.read_text(encoding="utf-8", errors="ignore")
        for match in CSS_URL_RE.finditer(text):
            url = clean_ref(match.group(1))
            if url.startswith("data:"):
                continue
            refs.append(MediaRef(path, url, "css-url"))
    return refs


def is_remote(url: str) -> bool:
    return url.startswith("http://") or url.startswith("https://")


def local_target(ref: MediaRef) -> Path | None:
    url = unquote(ref.url.split("#", 1)[0].split("?", 1)[0])
    if not url or url.startswith("data:") or is_remote(url):
        return None
    if url.startswith("/"):
        return STATIC_ROOT / url.lstrip("/")
    if ref.kind == "css-url":
        return (ref.owner.parent / url).resolve()
    return (ref.owner.parent / url).resolve()


def check_remote(url: str, timeout: int) -> CheckResult:
    headers = {
        "User-Agent": "Mozilla/5.0 (compatible; 1200km-media-validator/1.0)",
        "Accept": "image/*,*/*;q=0.8",
    }
    last_error = "remote check failed"
    for _attempt in range(2):
        for method, extra_headers in (("HEAD", {}), ("GET", {"Range": "bytes=0-0"})):
            request = Request(url, method=method, headers={**headers, **extra_headers})
            try:
                with urlopen(request, timeout=timeout) as response:
                    status = getattr(response, "status", 200)
                    if 200 <= status < 400:
                        content_type = response.headers.get("content-type", "")
                        return CheckResult(url, True, str(status), content_type)
                    return CheckResult(url, False, str(status), "unexpected HTTP status")
            except HTTPError as exc:
                if method == "HEAD" and exc.code in {403, 405, 429, 500, 502, 503, 504}:
                    continue
                return CheckResult(url, False, str(exc.code), exc.reason or "HTTP error")
            except (URLError, TimeoutError, OSError) as exc:
                reason = getattr(exc, "reason", exc)
                last_error = str(reason)
                if method == "HEAD":
                    continue
    return CheckResult(url, False, "error", last_error)


def write_report(
    refs: list[MediaRef],
    missing_local: list[tuple[MediaRef, Path]],
    remote_results: list[CheckResult],
    skipped_remote: int,
) -> None:
    remote_failures = [result for result in remote_results if not result.ok]
    docs_count = len(list(DOCS_ROOT.rglob("*.md"))) - 1
    unique_remote = {ref.url for ref in refs if is_remote(ref.url)}
    unique_local = {str(local_target(ref)) for ref in refs if local_target(ref) is not None}

    lines = [
        "---",
        'title: "Media Validation"',
        "---",
        "",
        "# Media Validation",
        "",
        "Generated deterministically from the current source inventory.",
        "",
        "## Summary",
        "",
        f"- Markdown documents checked: {docs_count}",
        f"- Media references checked: {len(refs)}",
        f"- Unique remote image URLs: {len(unique_remote)}",
        f"- Unique local image/CSS paths: {len(unique_local)}",
        f"- Missing local files: {len(missing_local)}",
        f"- Remote failures: {len(remote_failures)}",
        f"- Remote checks skipped: {skipped_remote}",
        "",
    ]

    if missing_local:
        lines.extend(["## Missing Local Files", ""])
        for ref, target in missing_local[:100]:
            lines.append(f"- `{ref.owner.relative_to(SITE_ROOT)}` -> `{ref.url}` -> `{target}`")
        if len(missing_local) > 100:
            lines.append(f"- ... {len(missing_local) - 100} more")
        lines.append("")

    if remote_failures:
        lines.extend(["## Remote Failures", ""])
        for result in remote_failures[:100]:
            lines.append(f"- `{result.status}` {result.url} - {result.detail}")
        if len(remote_failures) > 100:
            lines.append(f"- ... {len(remote_failures) - 100} more")
        lines.append("")

    if not missing_local and not remote_failures:
        lines.extend(
            [
                "## Result",
                "",
                "All local media references resolved and all checked remote image URLs responded successfully.",
                "",
            ]
        )

    REPORT_PATH.write_text("\n".join(lines), encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate article screenshots and site media references.")
    parser.add_argument("--timeout", type=int, default=20, help="Remote request timeout in seconds.")
    parser.add_argument("--workers", type=int, default=12, help="Remote validation worker count.")
    parser.add_argument("--local-only", action="store_true", help="Skip remote URL checks.")
    args = parser.parse_args()

    refs = iter_markdown_refs() + iter_css_refs()
    local_refs = [(ref, local_target(ref)) for ref in refs if local_target(ref) is not None]
    missing_local = [(ref, target) for ref, target in local_refs if target and not target.exists()]

    remote_results: list[CheckResult] = []
    skipped_remote = 0
    remote_urls = sorted({ref.url for ref in refs if is_remote(ref.url)})
    if args.local_only:
        skipped_remote = len(remote_urls)
    else:
        with concurrent.futures.ThreadPoolExecutor(max_workers=args.workers) as executor:
            checks = [executor.submit(check_remote, url, args.timeout) for url in remote_urls]
            for check in concurrent.futures.as_completed(checks):
                remote_results.append(check.result())

    remote_results.sort(key=lambda result: result.url)
    write_report(refs, missing_local, remote_results, skipped_remote)

    print(f"Media references: {len(refs)}")
    print(f"Missing local files: {len(missing_local)}")
    print(f"Remote failures: {sum(1 for result in remote_results if not result.ok)}")
    print(f"Report: {REPORT_PATH.relative_to(SITE_ROOT)}")
    return 1 if missing_local or any(not result.ok for result in remote_results) else 0


if __name__ == "__main__":
    raise SystemExit(main())
