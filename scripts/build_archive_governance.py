#!/usr/bin/env python3
from __future__ import annotations

import argparse
import csv
import json
from pathlib import Path
from urllib.parse import urlsplit


ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "src" / "data" / "article-catalog.json"
REPORT = ROOT / "reports" / "article-canonical-migration.csv"
STATIC_FACTS = ROOT / "static" / "archive-facts.json"


def platform(url: str) -> str:
    host = urlsplit(url).netloc.lower().removeprefix("www.")
    return {
        "medium.com": "Medium",
        "infosecwriteups.com": "InfoSec Write-ups",
        "bugbountywriteup.com": "Bug Bounty Writeups",
    }.get(host, host)


def governed(row: dict) -> dict:
    local = f"https://1200km.com/articles/read/{row['local_path']}"
    source = row["source_url"]
    result = dict(row)
    result.update({
        "canonical_url": local,
        "canonical_owner": "1200km.com",
        "preferred_canonical_url": local,
        "original_publication_url": source,
        "original_publication_platform": platform(source),
        "canonical_migration_status": row.get("canonical_migration_status", "migration-pending"),
        "external_canonical_verified": row.get("external_canonical_verified", False),
        "external_canonical_verified_at": row.get("external_canonical_verified_at"),
        "migration_note": row.get("migration_note") or (
            "Local self-canonical is deliberate. The external publication canonical "
            "has not been verified or changed, so migration remains pending."
        ),
        "source_platform": platform(source),
        "source_repository": "anpa1200/medium-blog-navigation",
        "collection_tier": row.get("collection_tier", "archive"),
        "updated_at": row.get("updated_at", row["published_at"]),
    })
    return result


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--update-catalog", action="store_true")
    args = parser.parse_args()
    rows = json.loads(CATALOG.read_text(encoding="utf-8"))
    if args.update_catalog:
        rows = [governed(row) for row in rows]
        CATALOG.write_text(json.dumps(rows, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    REPORT.parent.mkdir(parents=True, exist_ok=True)
    with REPORT.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=[
            "article_id", "local_url", "external_url", "preferred_canonical",
            "migration_status", "external_verified", "verified_at", "action_required",
        ], lineterminator="\n")
        writer.writeheader()
        for row in rows:
            verified = row.get("external_canonical_verified", False)
            status = row.get("canonical_migration_status", "")
            writer.writerow({
                "article_id": row["id"],
                "local_url": row.get("canonical_url", ""),
                "external_url": row.get("original_publication_url", row["source_url"]),
                "preferred_canonical": row.get("preferred_canonical_url", ""),
                "migration_status": status,
                "external_verified": str(verified).lower(),
                "verified_at": row.get("external_canonical_verified_at") or "",
                "action_required": "none" if verified and status == "local-confirmed" else "verify external rendered canonical and update publication settings",
            })

    facts = {
        "article_count": len(rows),
        "catalog_path": "src/data/article-catalog.json",
        "canonical_status_counts": {},
        "external_canonical_verified": sum(1 for row in rows if row.get("external_canonical_verified")),
    }
    for row in rows:
        status = row.get("canonical_migration_status", "missing")
        facts["canonical_status_counts"][status] = facts["canonical_status_counts"].get(status, 0) + 1
    STATIC_FACTS.write_text(json.dumps(facts, indent=2) + "\n", encoding="utf-8")
    print(f"Archive governance report written for {len(rows)} articles; {facts['external_canonical_verified']} external canonicals verified.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
