from __future__ import annotations

import json
from pathlib import Path
from urllib.parse import urlsplit


MIGRATION_STATUSES = {
    "local-confirmed", "external-still-canonical", "migration-pending",
    "external-uncontrolled", "local-noindex", "historical-copy",
}


ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "src" / "data" / "article-catalog.json"
ARTICLES = ROOT / "docs" / "articles"


def main() -> int:
    errors: list[str] = []
    rows = json.loads(CATALOG.read_text(encoding="utf-8"))
    ids: set[str] = set()
    paths: set[str] = set()

    for index, row in enumerate(rows):
        label = row.get("id") or f"row {index}"
        required = {
            "id", "title", "published_at", "year", "category", "slug",
            "local_path", "source_url", "images", "code_blocks",
            "canonical_url", "canonical_owner", "preferred_canonical_url",
            "original_publication_url", "original_publication_platform",
            "canonical_migration_status", "external_canonical_verified",
            "external_canonical_verified_at", "migration_note", "source_platform",
            "source_repository", "collection_tier", "updated_at",
        }
        missing = sorted(required - set(row))
        if missing:
            errors.append(f"{label}: missing {', '.join(missing)}")
            continue
        if row["id"] in ids:
            errors.append(f"{label}: duplicate article ID")
        ids.add(row["id"])
        if row["local_path"] in paths:
            errors.append(f"{label}: duplicate local path {row['local_path']}")
        paths.add(row["local_path"])
        if row["local_path"] != f"{row['year']}/{row['slug']}":
            errors.append(f"{label}: local_path does not match year/slug")
        target = ARTICLES / f"{row['local_path']}.md"
        if not target.is_file():
            errors.append(f"{label}: missing {target.relative_to(ROOT)}")
        source = urlsplit(row["source_url"])
        if source.scheme != "https" or not source.netloc:
            errors.append(f"{label}: invalid source_url")
        canonical = urlsplit(row["canonical_url"])
        expected_canonical = f"https://1200km.com/articles/read/{row['local_path']}"
        if row["canonical_url"] != expected_canonical:
            errors.append(f"{label}: canonical_url is not the local article route")
        if row["preferred_canonical_url"] != row["canonical_url"]:
            errors.append(f"{label}: preferred canonical disagrees with canonical_url")
        if canonical.scheme != "https" or canonical.netloc != "1200km.com":
            errors.append(f"{label}: canonical_url is not on the public origin")
        if row["original_publication_url"] != row["source_url"]:
            errors.append(f"{label}: source and original publication disagree")
        if row["canonical_migration_status"] not in MIGRATION_STATUSES:
            errors.append(f"{label}: unknown canonical migration status")
        if not isinstance(row["external_canonical_verified"], bool):
            errors.append(f"{label}: external_canonical_verified must be boolean")
        if row["external_canonical_verified"] and not row["external_canonical_verified_at"]:
            errors.append(f"{label}: verified external canonical has no verification date")
        if not row["external_canonical_verified"] and row["canonical_migration_status"] == "local-confirmed":
            errors.append(f"{label}: local-confirmed requires external canonical verification")
        if row["collection_tier"] not in {"core", "reference", "archive"}:
            errors.append(f"{label}: unknown collection tier")
        if not isinstance(row.get("tags"), list) or not row["tags"] or len(set(row["tags"])) != len(row["tags"]):
            errors.append(f"{label}: tags must be a non-empty unique list")
        if row.get("category") == "Security Research":
            errors.append(f"{label}: generic Security Research category is not allowed")
        if not isinstance(row["images"], int) or row["images"] < 0:
            errors.append(f"{label}: invalid image count")
        if not isinstance(row["code_blocks"], int) or row["code_blocks"] < 0:
            errors.append(f"{label}: invalid code-block count")

    article_files = {
        str(path.relative_to(ARTICLES).with_suffix(""))
        for path in ARTICLES.glob("*/*.md")
    }
    orphaned = sorted(article_files - paths)
    if orphaned:
        errors.append(f"catalog is missing {len(orphaned)} article file(s): {', '.join(orphaned[:5])}")
    if not rows:
        errors.append("article catalog is empty")

    if errors:
        print("Article archive validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"Article archive validation passed: {len(rows)} unique local articles.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
