#!/usr/bin/env python3
"""Build small web-delivery derivatives; retain and verify supplied PNG originals."""
import hashlib
import json
from pathlib import Path

from PIL import Image

root = Path(__file__).resolve().parents[1]
assets = root / "static/article-assets/big-pharma"
manifest_path = assets / "publication.json"
manifest = json.loads(manifest_path.read_text())
derivatives = []
for original in manifest["images"]:
    source = assets / original["file"]
    assert hashlib.sha256(source.read_bytes()).hexdigest() == original["sha256"]
    with Image.open(source) as opened:
        image = opened.convert("RGB")
        assert image.size == (original["width"], original["height"])
        variants = [(source.stem + ".webp", image.width)]
        if source.stem == "cover":
            variants += [("cover-800.webp", 800), ("cover-card.webp", 480)]
        for name, width in variants:
            resized = image if width == image.width else image.resize(
                (width, round(image.height * width / image.width)), Image.Resampling.LANCZOS
            )
            target = assets / name
            resized.save(target, "WEBP", quality=88, method=6)
            data = target.read_bytes()
            derivatives.append({
                "file": name, "original": original["file"],
                "width": resized.width, "height": resized.height,
                "bytes": len(data), "sha256": hashlib.sha256(data).hexdigest(),
                "transformation": "WebP quality 88, method 6; Lanczos resizing only for smaller cover variants. No cropping, redrawing, or content edits."
            })
manifest["display_derivatives"] = derivatives
manifest_path.write_text(json.dumps(manifest, indent=2) + "\n")
for row in derivatives:
    print(f'{row["file"]}: {row["width"]}x{row["height"]}, {row["bytes"]:,} bytes')
