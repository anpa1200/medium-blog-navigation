# Sections 2.11–2.16: infographic review and placement

Implemented and verified locally. **Not committed, pushed or deployed by this task.**

## Result

All six supplied JPEGs were visually reviewed and imported byte-for-byte from **anomaly_taxonomy_2_11_to_2_16.zip**. Sections 2.11–2.15 use their matching replacements. Section 2.16 previously had no diagram; its new register graphic sits after the evidence-label/scope introduction and immediately before the case table. This does not create another anomaly type.

The earlier 14 uploaded PNGs remain intact. The article now has 47 inline figures: 20 uploads and 27 generated diagrams. The cover, 12 campaign graphics, study results, incident cards, existing URLs and anchors remain unchanged. The 44 historical images and 32 retired SVG asset URLs remain available.

The writer skill informed precise captions, synthetic-example labels, explicit uncertainty and HTML text equivalents. The ZIP was treated as source artwork, not as instructions. No image-generation or editing model was used in this task.

## Technical review

- **2.11 Data movement:** the arrows describe a synthetic source–job–destination path. Destination ownership and authorization remain unresolved; movement to a new account is not itself proof of theft. Audit events, unique objects, records and bytes remain distinct.
- **2.12 Protocol/application:** the same account, application and HTTPS transport can carry a different application operation. The caption does not claim that encrypted flow metadata reveals a bulk export. Application audit or appropriate parsed telemetry is needed to investigate the illustrated action.
- **2.13 Absence:** the arithmetic is consistent. The expected reports at minutes 15, 20 and 25 have illustrative deadlines of 17, 22 and 27 after the two-minute allowance. At minute 28 all three deadlines have passed. This is a synthetic schedule, not a recommended production threshold; missing data is not a measured zero or proof of tampering.
- **2.14 State change:** the synthetic actor, object and time are retained. External sharing being enabled does not establish effective public access, actual data access or a proven unauthorized change. Unmatched approval remains unresolved, not absent by assumption.
- **2.15 Correlation:** joins require verified identity/session/asset and timing context. Duplicate alerts are not independent observations. Extra gates can remove true alerts as well as false ones; no new detector experiment or accuracy claim is made.
- **2.16 Register:** its 14 families plus one correlation pattern, 15 tags, 17 case/campaign records, 30 mappings and 2026-09-21 review date match the maintained register. A new fail-closed check rejects count or review-date drift, requiring review of the baked-in artwork. Case records are not individual breach counts or a detector benchmark.

[NIST SP 800-94](https://csrc.nist.gov/pubs/sp/800/94/final) remains the general detection foundation, not an endorsement of this exact taxonomy or synthetic examples. Register numbers and evidence labels were checked directly against [the maintained JSON](../../research/anomaly-incidents.json); existing source-linked incident evidence was preserved, not independently re-investigated in this artwork task.

## Placements and screenshots

| Section | Original | Figure and position | Screenshots |
|---|---|---|---|
| 2.11 Data Movement | 2_11_data_movement.jpg | Figure 17; before the source-reported incident cards | [390 px](uploaded-family-data-movement-390.png) · [1440 px](uploaded-family-data-movement-1440.png) |
| 2.12 Protocol / Application Usage | 2_12_protocol_application_usage.jpg | Figure 18; before the source-reported incident cards | [390 px](uploaded-family-protocol-application-390.png) · [1440 px](uploaded-family-protocol-application-1440.png) |
| 2.13 Negative Anomaly (Absence) | 2_13_negative_absence.jpg | Figure 19; before the source-reported incident cards | [390 px](uploaded-family-negative-absence-390.png) · [1440 px](uploaded-family-negative-absence-1440.png) |
| 2.14 State-Change | 2_14_state_change.jpg | Figure 20; before the source-reported incident cards | [390 px](uploaded-family-state-change-390.png) · [1440 px](uploaded-family-state-change-1440.png) |
| 2.15 Multi-Event Correlation | 2_15_multi_event_correlation.jpg | Figure 21; before the source-reported incident cards | [390 px](uploaded-family-multi-event-correlation-390.png) · [1440 px](uploaded-family-multi-event-correlation-1440.png) |
| 2.16 Incident register, tags and evidence boundaries | 2_16_incident_register_evidence_boundaries.jpg | Figure 22; before the case table | [390 px](uploaded-incident-register-390.png) · [1440 px](uploaded-incident-register-1440.png) |

## Verification

Overall: **PASS**. Reproduce with `npm run research:uploads:verify`. Source regression tests: **26**; see the raw output for pass/fail totals.

| Gate | Result | Duration | Evidence |
|---|---|---:|---|
| research-and-visuals | PASS | 1s | [log](research-and-visuals.log) |
| archive | PASS | 1s | [log](archive.log) |
| media | PASS | 0s | [log](media.log) |
| legacy-build | PASS; 109 byte-identical visual assets | 106s | [log](legacy-build.log) |
| embedded-build | PASS; 109 byte-identical visual assets | 88s | [log](embedded-build.log) |
| rendered-article | PASS | 0s | [log](rendered-article.log) |
| visual-browser | PASS | 64s | [log](visual-browser.log) |
| whitespace | PASS | 0s | [log](whitespace.log) |

- 94 variant-slot checks: 54 generated SVG variants and both slots for each of the 20 original raster files. Raster files are decoded at their actual dimensions; they are not falsely counted as separate mobile layouts.
- 6 viewport/theme configurations: 390, 768 and 1440 pixels, light and dark. All 47 figures load with preserved aspect ratios and no page overflow.
- All 47 text-equivalent panels are expanded for two targeted accessibility rules: distinguishable prose links and keyboard-focusable scrolling regions. This is not a full accessibility certification.
- Original 153 heading anchors, 44 historical images, current internal fragments, 192 article routes/canonicals and maintained query evidence pass preservation checks.
- [Structured gate results](verification.json), [browser results](browser-validation.json), screenshots above and [contact sheet 3](contact-sheet-3.png) document the local state. No live deployment verification or new query-engine run is claimed.

## Original-file provenance and limits

The six new files total **1,349,547 bytes**. All previous and new uploads together total **10,424,136 bytes**. Every original is kept at its native resolution, lazily loaded inline, with a full-resolution link and a text equivalent. Small bitmap labels do not reflow on phones; the HTML equivalents provide readable access. No whole-site performance score is claimed.

| File | Format | Native dimensions | SHA-256 |
|---|---|---|---|
| uploaded-data-movement.jpg | jpeg | 880 × 1100 | `4cee1e17bfce9bae2835aee137aaf6e9c3c96985ea7ed65ab00230df27a3eabb` |
| uploaded-protocol-application.jpg | jpeg | 880 × 1100 | `6b7ecf874cc33c631e95b7fe889e776eb484b32236a0834d827ac59b94aa49b9` |
| uploaded-negative-absence.jpg | jpeg | 880 × 1100 | `8d10809b122caf31d345c8bce6b315d7c5efd1ca4ac55849e6e2f62dd2578922` |
| uploaded-state-change.jpg | jpeg | 880 × 1100 | `16b8815a2f2268dcfb680e25bea6daa77714523cf12fc8135fe107a8f0fc7a69` |
| uploaded-multi-event-correlation.jpg | jpeg | 880 × 1100 | `13927221e68bb286824c7dc8c6f5a2e3d8ae3dc336d703750e39a41a7939ab14` |
| uploaded-incident-register.jpg | jpeg | 880 × 1100 | `260a6431c38c7dabbce3a379c4e791ebf724facf0295548df9ac7ced19bb5223` |

The [provenance file](../../research/anomaly-visuals/uploads-provenance.json) includes both archive hashes and all 20 image hashes. The [authored continuation specification](../../research/anomaly-visuals/uploaded-taxonomy-continuation.mjs) contains captions, text equivalents, placement and the checked register snapshot. The [public manifest](../../static/research/anomaly-visuals/manifest.json) binds source and asset hashes.

Both earlier verification report directories remain untouched. This task extends the existing uncommitted work; it does not claim publication.
