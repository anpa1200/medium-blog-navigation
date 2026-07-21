#!/usr/bin/env python3
"""Remove stale Docusaurus output before changing deployment modes."""

from pathlib import Path
import shutil


build = Path("build")
if build.exists():
    shutil.rmtree(build)
