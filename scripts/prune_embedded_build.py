#!/usr/bin/env python3
"""Remove legacy static snapshots from the canonical embedded archive build."""

from pathlib import Path
import shutil


legacy_docs = Path("build/docs")
if legacy_docs.exists():
    shutil.rmtree(legacy_docs)
