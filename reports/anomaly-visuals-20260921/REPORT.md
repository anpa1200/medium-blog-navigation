# Anomaly research: inline infographic replacement

Local implementation and verification report. **Not committed, pushed or deployed by this task.** The already published edition remains unchanged until a separate release.

## Delivered

- 43 new source-linked figures, placed inline in reading order: concepts and base rates, 14 operational families plus multi-event correlation, ATT&CK mapping, 12 campaign summaries, telemetry, DNS entropy, four credential techniques, observability, analytic validation and statistical results.
- 86 self-contained SVGs: an 800-pixel desktop layout and a separately reflowed 400-pixel narrow layout for every figure.
- One local PNG cover, bound to its source SVG by SHA-256; no raster-image generation model was used.
- Every figure has an evidence label, caption, source links, accessible text equivalent and full-size link. Current figures are not hidden in accordions.
- All 44 original images, including the old cover, remain in the historical appendix. The catalog correctly counts 87 image instances: 43 current + 44 historical. Existing URLs, anchors, topic tags, incident cards and maintained query files are preserved.

The writer skill informed the distinction between source-reported incidents, author-proposed detection interpretations, exact explanatory arithmetic, recorded execution results and synthetic statistics. The graphics do not upgrade the evidence status of their inputs.

## Validation

Overall local gate: **PASS**.

| Check | Result | Evidence |
|---|---|---|
| research-and-visuals | PASS (1s) | [research-and-visuals.log](research-and-visuals.log) |
| archive | PASS (1s) | [archive.log](archive.log) |
| media | PASS (0s) | [media.log](media.log) |
| legacy-build | PASS (74s); 89 identical build assets | [legacy-build.log](legacy-build.log) |
| embedded-build | PASS (69s); 89 identical build assets | [embedded-build.log](embedded-build.log) |
| rendered-article | PASS (0s) | [rendered-article.log](rendered-article.log) |
| visual-browser | PASS (17s) | [visual-browser.log](visual-browser.log) |
| whitespace | PASS (0s) | [whitespace.log](whitespace.log) |

Browser asset checks: 86 SVG variants; 0 clipping/overlap failures. Article configurations: 6, covering 390, 768 and 1440 pixels in light/dark themes. The checker verifies image loading, responsive variants, aspect ratios, page overflow, 43 inline figures, all 44 preserved historical images and JavaScript errors. See [machine-readable gate](verification.json), [browser report](browser-validation.json), and contact sheets [1](contact-sheet-1.png), [2](contact-sheet-2.png), [3](contact-sheet-3.png), [4](contact-sheet-4.png), [5](contact-sheet-5.png), [6](contact-sheet-6.png).

## Factual and numerical review

- Incident figures mirror the revised manuscript, with separate source-reported and inferred panels. They do not invent a victim timeline or claim a proposed rule detected an incident.
- The source review rechecked MITRE's v19/v19.2 release notes, Microsoft event/Sysmon references, Midnight Blizzard and Volt Typhoon reporting, Mandiant MOVEit/SUNBURST/UNC3944/APT41 reports, Unit 42 RDAT, the DFIR Report Conti case and SentinelOne 3CX reporting.
- CISA's direct PDF/advisory fetches returned access errors in this run. Indexed content from the same official CSRB PDF supports the Big Yellow Taxi/MailItemsAccessed account; CISA's indexed AA22-277A PDF supports the unnamed-actor Impacket case. This is not reported as a successful new full-document download. Original primary links are retained.
- Base-rate example: 90 / (90 + 10,000) = 0.89% precision. These are assumed explanatory inputs.
- DNS examples are computed from their displayed labels: aaaa = 0, abab = 1, abcd = 2 bits/character. High character entropy is not a maliciousness verdict.
- Functional/replay figures read the existing report: 34/34 KQL cases, 8/8 offline checks; replay outputs 4/11 DCSync, 24/32 LSASS and 0/1 Kerberoasting input records. Output rows are not true-positive counts. No new KQL run is claimed.
- Statistical charts read the committed generated dataset's results. The gate removes 77 false alerts and seven true alerts relative to ungated entity-MAD. Both precision and recall, plus TP/FP/FN/TN, remain visible. No production performance is claimed.

## Improvements made during verification

Actual browser geometry caught two wrapping problems; both were corrected. Four-step flows were widened into a two-row desktop layout for readable labels. The embedded archive gate caught new-tab behavior on internal SVG links; the component now follows same-origin navigation policy. Neither a compiler success nor a green source test was treated as a substitute for browser checks.

## Placement inventory

| Figure | Graphic | Article location | Evidence label |
|---:|---|---|---|
| 1 | [From anomaly to investigation](../../static/research/anomaly-visuals/research-map.svg) | Introduction | CONCEPTUAL MODEL |
| 2 | [Three statistical forms](../../static/research/anomaly-visuals/statistical-forms.svg) | 1.1 Definitions | CONCEPTUAL MODEL |
| 3 | [Rare events change alert precision](../../static/research/anomaly-visuals/base-rate.svg) | 1.2 The Central Tension | ILLUSTRATIVE ARITHMETIC |
| 4 | [How much moved?](../../static/research/anomaly-visuals/family-volumetric.svg) | 2.1 Volumetric | SCHEMATIC · NOT OBSERVED DATA |
| 5 | [How often did it happen?](../../static/research/anomaly-visuals/family-frequency-rate.svg) | 2.2 Frequency / Rate | SCHEMATIC · NOT OBSERVED DATA |
| 6 | [Does the timing fit the task?](../../static/research/anomaly-visuals/family-temporal.svg) | 2.3 Temporal | SCHEMATIC · NOT OBSERVED DATA |
| 7 | [Compare the right peers](../../static/research/anomaly-visuals/family-peer-group.svg) | 2.4 Peer-Group | SCHEMATIC · NOT OBSERVED DATA |
| 8 | [Order adds context](../../static/research/anomaly-visuals/family-sequence.svg) | 2.5 Sequence | SCHEMATIC · NOT OBSERVED DATA |
| 9 | [A new edge is a question](../../static/research/anomaly-visuals/family-graph-relationship.svg) | 2.6 Graph / Relationship | SCHEMATIC · NOT OBSERVED DATA |
| 10 | [Network location is uncertain](../../static/research/anomaly-visuals/family-geographic-asn.svg) | 2.7 Geographic / ASN | SCHEMATIC · NOT OBSERVED DATA |
| 11 | [Review identity and access changes](../../static/research/anomaly-visuals/family-identity-access.svg) | 2.8 Identity / Access | SCHEMATIC · NOT OBSERVED DATA |
| 12 | [Rare does not mean malicious](../../static/research/anomaly-visuals/family-rare-process-service.svg) | 2.9 Rare Process / Service | SCHEMATIC · NOT OBSERVED DATA |
| 13 | [Direct child is not any descendant](../../static/research/anomaly-visuals/family-parent-child.svg) | 2.10 Parent-Child Execution | SCHEMATIC · NOT OBSERVED DATA |
| 14 | [Track source, destination and units](../../static/research/anomaly-visuals/family-data-movement.svg) | 2.11 Data Movement | SCHEMATIC · NOT OBSERVED DATA |
| 15 | [Inspect usage, not just the port](../../static/research/anomaly-visuals/family-protocol-application.svg) | 2.12 Protocol / Application Usage | SCHEMATIC · NOT OBSERVED DATA |
| 16 | [No event is not the same as no activity](../../static/research/anomaly-visuals/family-negative-absence.svg) | 2.13 Negative Anomaly (Absence) | SCHEMATIC · NOT OBSERVED DATA |
| 17 | [Compare before and after](../../static/research/anomaly-visuals/family-state-change.svg) | 2.14 State-Change | SCHEMATIC · NOT OBSERVED DATA |
| 18 | [Join evidence without inventing a chain](../../static/research/anomaly-visuals/family-multi-event-correlation.svg) | 2.15 Multi-Event Correlation | SCHEMATIC · NOT OBSERVED DATA |
| 19 | [Map behavior, then ask what is measurable](../../static/research/anomaly-visuals/attack-mapping.svg) | 3. ATT&CK mapping | CONCEPTUAL MODEL |
| 20 | [SUNBURST: observation is not an entropy score](../../static/research/anomaly-visuals/case-sunburst.svg) | 4.1 SUNBURST | SOURCE-REPORTED + AUTHOR INFERENCE |
| 21 | [Exchange: keep campaign evidence separate](../../static/research/anomaly-visuals/case-exchange.svg) | 4.2 HAFNIUM / Exchange | SOURCE-REPORTED + AUTHOR INFERENCE |
| 22 | [BazarCall to Conti: one intrusion account](../../static/research/anomaly-visuals/case-conti.svg) | 4.3 Conti | SOURCE-REPORTED + AUTHOR INFERENCE |
| 23 | [OilRig-associated RDAT: variants matter](../../static/research/anomaly-visuals/case-oilrig.svg) | 4.4 OilRig | SOURCE-REPORTED + AUTHOR INFERENCE |
| 24 | [MOVEit: application account, not Windows user](../../static/research/anomaly-visuals/case-moveit.svg) | 4.5 MOVEit | SOURCE-REPORTED + AUTHOR INFERENCE |
| 25 | [Midnight Blizzard: preserve the actual permission](../../static/research/anomaly-visuals/case-midnight.svg) | 4.6 Midnight Blizzard | SOURCE-REPORTED + AUTHOR INFERENCE |
| 26 | [UNC3944: look across identity and SaaS](../../static/research/anomaly-visuals/case-unc3944.svg) | 4.7 UNC3944 | SOURCE-REPORTED + AUTHOR INFERENCE |
| 27 | [Storm-0558: customer-side detection did work](../../static/research/anomaly-visuals/case-storm.svg) | 4.8 Storm-0558 | SOURCE-REPORTED + AUTHOR INFERENCE |
| 28 | [Volt Typhoon: the execution host matters](../../static/research/anomaly-visuals/case-volt.svg) | 4.9 Volt Typhoon | SOURCE-REPORTED + AUTHOR INFERENCE |
| 29 | [APT41: two accounts, not one invented chain](../../static/research/anomaly-visuals/case-apt41.svg) | 4.10 APT41 | SOURCE-REPORTED + AUTHOR INFERENCE |
| 30 | [Impacket is a toolkit, not an attribution](../../static/research/anomaly-visuals/case-impacket.svg) | 4.11 CISA AA22-277A | SOURCE-REPORTED + AUTHOR INFERENCE |
| 31 | [3CX: a signature is not a benign verdict](../../static/research/anomaly-visuals/case-3cx.svg) | 4.12 3CX | SOURCE-REPORTED + AUTHOR INFERENCE |
| 32 | [A field name is not a collection guarantee](../../static/research/anomaly-visuals/telemetry-contract.svg) | 5. Telemetry contracts | CONCEPTUAL MODEL |
| 33 | [High entropy is not proof of tunneling](../../static/research/anomaly-visuals/dns-entropy.svg) | 5.7 DNS entropy | EXACT MATH · SYNTHETIC LABELS |
| 34 | [Kerberoasting: request evidence versus outcome](../../static/research/anomaly-visuals/credential-kerberoast.svg) | 6.1 Kerberoasting | CONCEPTUAL MODEL |
| 35 | [DCSync: keep source correlation honest](../../static/research/anomaly-visuals/credential-dcsync.svg) | 6.2 DCSync | CONCEPTUAL MODEL |
| 36 | [Pass-the-Hash: two hunting views, no single verdict](../../static/research/anomaly-visuals/credential-pth.svg) | 6.3 Pass-the-Hash | TELEMETRY MODEL · NOT CLASSIFICATION |
| 37 | [LSASS process access needs provenance](../../static/research/anomaly-visuals/credential-lsass.svg) | 6.4 LSASS | CONCEPTUAL MODEL |
| 38 | [A detector can miss at different layers](../../static/research/anomaly-visuals/visibility-limits.svg) | 7. Visibility limits | CONCEPTUAL MODEL |
| 39 | [Make the analytic reproducible](../../static/research/anomaly-visuals/analytic-contract.svg) | 8.1 Design patterns | CONCEPTUAL MODEL |
| 40 | [What the tests actually establish](../../static/research/anomaly-visuals/validation-levels.svg) | 8.3 Evidence levels | RECORDED RESULTS · SCOPED CLAIMS |
| 41 | [Close the loop before operational use](../../static/research/anomaly-visuals/operational-workflow.svg) | 9.5 Validation workflow | CONCEPTUAL MODEL |
| 42 | [Freeze the experiment before the test](../../static/research/anomaly-visuals/study-splits.svg) | 9.6 Synthetic study design | SEEDED SYNTHETIC EXPERIMENT |
| 43 | [Corroboration reduces alerts and recall](../../static/research/anomaly-visuals/study-results.svg) | 9.6 Synthetic study results | SYNTHETIC RESULTS · NOT PRODUCTION |

## Reproduce / change

See [visual-authoring instructions](../../research/anomaly-visuals/README.md), [authored specifications](../../research/anomaly-visuals/figures.mjs), and [evidence/asset manifest](../../static/research/anomaly-visuals/manifest.json). Edit the specification and regenerate, rather than editing SVG labels by hand. The manifest and regression suite fail on stale numbers or evidence hashes.

## Limits

This is an author/assistant factual and rendering review, not independent certification of absolute correctness. The operational-family diagrams are a proposed taxonomy, not a NIST standard. Historical raster images remain unvalidated and explicitly superseded. The Medium edition, native Sentinel ingestion, real-world detection accuracy, automatic containment safety and the previously documented AWS source conflict are unchanged.
