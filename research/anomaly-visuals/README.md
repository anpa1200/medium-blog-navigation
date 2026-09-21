# Anomaly research visual edition

43 original replacement figures are integrated into the existing article, not a new page. Each has a desktop SVG and a separate narrow-layout SVG. The old 44 images remain intact in the historical appendix; they have not been certified by creating replacements.

## Sources and evidence boundaries

- `figures.mjs` is the authored specification: placement, wording, source links, evidence label and interpretation boundary.
- `scripts/lib/anomaly-visuals.mjs` renders editable, self-contained SVG. No image model, remote font, tracking code, embedded script or external raster is involved.
- Family diagrams are author-proposed operational schematics. NIST supports the anomaly-detection foundation, not an official standardized 14-family taxonomy or these exact candidate methods. Their adjacent incident cards retain the source-reported examples and limitations.
- The 12 campaign diagrams distinguish a source-reported observation from the author's detection hypothesis. They are not victim-telemetry reconstructions. Incident durations and detector success rates have not been invented.
- Functional/replay counts and statistical bars are read from the committed reports. Drawing the figures does not execute KQL or establish production accuracy. The single-ticket miss and the gate's seven-lost-true-alert trade-off remain explicit.
- Base-rate arithmetic and DNS-label examples are synthetic explanatory calculations. They are not incident measurements or operational thresholds.
- All source hashes, numerical inputs and asset hashes are in `static/research/anomaly-visuals/manifest.json`. The PNG cover has a separate source-SVG/hash binding in `cover-provenance.json`.

## Regeneration

```bash
npm run research:revision:render
node scripts/check_anomaly_visuals_browser.mjs --assets-only --export-cover \
  --playwright /absolute/path/to/playwright/index.mjs
npm run research:anomalies:check
node scripts/verify_anomaly_visuals.mjs
```

The browser checker needs Playwright and Chromium/Google Chrome. Its defaults match this workstation; override `--playwright` when using another installation. Full article checks use read-only shell assets from the adjacent `anomaly-revision-release` checkout or `--site-root`. Builds need the archive's locked Node dependencies. Scripts write only generated assets, local build output and verification reports; they do not publish.

The release runner stores full command output under `reports/anomaly-visuals-20260921/`. Browser checks cover actual text bounds and overlap in all 86 SVGs, local loading of all 43 figures in six viewport/theme combinations, aspect ratios, page overflow and JavaScript errors. Contact sheets and full-size screenshots support manual review. These checks establish rendering and consistency, not an independent factual certification.

## Editing discipline

Edit the authored figure specification, not generated SVG or manifest files. Keep figure numbers in reading order and insertions outside managed incident blocks. Run the evidence checks after changing the research data. Preserve existing URLs, anchors, incident cards, queries and historical media. Do not silently replace missing measurements with schematic numbers. A new fact or incident requires a supporting primary source and review of both the text and diagram.

Each inline figure includes a source-linked caption, text equivalent and a full-size SVG link. `<picture>` chooses the narrow layout on smaller screens. The old-media accordion contains only historical images; no current diagram is hidden inside it.
