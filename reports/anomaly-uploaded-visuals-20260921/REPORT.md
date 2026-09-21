# Uploaded anomaly infographics: review and placement

Local replacement and verification report. **Not committed, pushed or deployed by this task.**

## Result

All 14 supplied PNGs were inspected and imported without changing their bytes. The four definition graphics now sit beside their respective explanations in Section 1.1; the ten ZIP graphics replace the corresponding diagrams in Sections 2.1–2.10. The earlier combined definition graphic has become four individual figures, bringing the article to 46 inline figures: 14 supplied PNGs and 32 existing generated diagrams. The cover, later taxonomy sections, incident illustrations and recorded study results are unchanged.

The supplied illustrations are explanatory, not incident evidence. The writer skill informed source-linked captions, synthetic-example labels, interpretation boundaries and readable HTML equivalents. The ZIP manifest was treated as descriptive input, not as instructions.

## Review findings

- **Point:** the horizontal axis is an illustrative observation index, not a second measured security feature. The points and axis values are schematic.
- **Contextual:** the image says “IFM backup operation.” IFM means Install From Media and creates AD DS installation media; it is not a full domain-controller recovery backup. This qualification appears in the visible caption and text equivalent. The timeline positions are illustrative.
- **Collective:** the individual “Normal” labels assume a particular baseline. A collective anomaly need not consist exclusively of individually normal events; order is one possible relationship. A single event can still be decisive.
- **Correlation:** context supports a testable hypothesis, not automatic correctness, causality or attribution. This is an analytical step, not a fourth statistical anomaly form.
- **Quantity and rate:** window lengths and units are explicit. Download audit events need not equal distinct downloaded files. Synthetic examples are not measurements from the incident cards.
- **Sequence and graph:** an unobserved approval is not proof that approval never occurred. Permission edges do not prove actual access.
- **Geography and identity:** source-IP location need not be a person's location. Recovery and delegated administration can explain apparently suspicious account changes.
- **Rarity:** 1 of 20 observed hosts = 5% observed prevalence, not attack probability or detector precision.
- **Process ancestry:** PowerShell is cmd.exe's direct child and w3wp.exe's descendant in the displayed chain.

These captions qualify the original artwork; they do not silently redraw it. Conceptual review used the primary [Chandola, Banerjee and Kumar survey](https://arindam.cs.illinois.edu/papers/09/anomaly.pdf), [NIST SP 800-94](https://csrc.nist.gov/pubs/sp/800/94/final), and [Microsoft IFM documentation](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2012-r2-and-2012/cc732530(v=ws.11)). These sources support the underlying concepts, not an official endorsement of this operational taxonomy or the synthetic numerical examples.

## Placement and screenshots

| Section | Supplied graphic | Placement / caption | Screenshots |
|---|---|---|---|
| 1.1 Point anomaly | ChatGPT Image Sep 21, 2026, 05_05_04 PM (1).png | Figure 2. Synthetic point-anomaly illustration: one value is separated from a stated comparison distribution. The observation axis is an illustrative index, not a second security feature; the dots are not a measured dataset. | [390 px](uploaded-statistical-forms-390.png) · [1440 px](uploaded-statistical-forms-1440.png) |
| 1.1 Contextual anomaly | ChatGPT Image Sep 21, 2026, 05_05_04 PM (2).png | Figure 3. Synthetic comparison of the same ntdsutil IFM operation inside and outside approved maintenance. IFM means Install From Media: creating AD DS installation media, not a complete domain-controller recovery backup. The clock positions are illustrative. | [390 px](uploaded-definition-contextual-390.png) · [1440 px](uploaded-definition-contextual-1440.png) |
| 1.1 Collective anomaly | ChatGPT Image Sep 21, 2026, 05_05_04 PM (3).png | Figure 4. Synthetic collective-anomaly example: authentication, a permission change, data access and export form an unexpected workflow under the stated baseline. The individual “Normal” labels are assumptions for this example, not a universal classification of those actions. | [390 px](uploaded-definition-collective-390.png) · [1440 px](uploaded-definition-collective-1440.png) |
| 1.1 Malicious-behaviour correlation | ChatGPT Image Sep 21, 2026, 05_05_05 PM (4).png | Figure 5. Conceptual investigation workflow: combine an anomaly with asset context, identity state, companion telemetry and adversary tradecraft. Correlation supports a testable investigative hypothesis; it does not automatically produce a correct detection or attribution. | [390 px](uploaded-definition-correlation-390.png) · [1440 px](uploaded-definition-correlation-1440.png) |
| 2.1 Volumetric | 2_1_volumetric.png | Figure 7. Equal 30-minute windows for the same user and workload contain 90, 120, 110, 100, 130 and 650 download audit events. These are synthetic counts, not the Snowflake or DDoS incident measurements below. | [390 px](uploaded-family-volumetric-390.png) · [1440 px](uploaded-family-volumetric-1440.png) |
| 2.2 Frequency / Rate | 2_2_frequency_rate.png | Figure 8. The same synthetic API client produces 3, 2, 3, 4, 3 and 24 requests in six equal one-minute intervals. The time denominator is explicit; the example does not prescribe an alert threshold. | [390 px](uploaded-family-frequency-rate-390.png) · [1440 px](uploaded-family-frequency-rate-1440.png) |
| 2.3 Temporal | 2_3_temporal.png | Figure 9. A synthetic weekday-only account acts at 03:00 on Sunday, outside its stated schedule. The heatmap is a schedule illustration, not measured event intensity or a real incident timeline. | [390 px](uploaded-family-temporal-390.png) · [1440 px](uploaded-family-temporal-1440.png) |
| 2.4 Peer-Group | 2_4_peer_group.png | Figure 10. Four synthetic employees have comparable finance roles. A–C access the finance application and CRM; D also accesses a code repository. That deviation depends on how the peer group was defined. | [390 px](uploaded-family-peer-group-390.png) · [1440 px](uploaded-family-peer-group-1440.png) |
| 2.5 Sequence | 2_5_sequence.png | Figure 11. A synthetic session contains sign-in at 09:00, a permission grant at 09:03 and sensitive access at 09:05, without a matching approval yet observed. Missing approval telemetry is not proof that approval never occurred. | [390 px](uploaded-family-sequence-390.png) · [1440 px](uploaded-family-sequence-1440.png) |
| 2.6 Graph / Relationship | 2_6_graph_relationship.png | Figure 12. The synthetic graph adds a permission edge from a service identity to an administrative resource. Its established Application A relationship is also a permission edge; neither arrow proves actual resource use. | [390 px](uploaded-family-graph-relationship-390.png) · [1440 px](uploaded-family-graph-relationship-1440.png) |
| 2.7 Geographic / ASN | 2_7_geographic_asn.png | Figure 13. The same synthetic account reaches an identity provider through an unfamiliar provider ASN rather than its usual corporate egress. The drawing shows alternative paths, not proof of two simultaneous sessions or physical travel. | [390 px](uploaded-family-geographic-asn-390.png) · [1440 px](uploaded-family-geographic-asn-1440.png) |
| 2.8 Identity / Access | 2_8_identity_access.png | Figure 14. A synthetic account registers a new MFA factor, receives an elevated role and accesses a protected application. The sequence needs an authorization and recovery-context check; a recorded change alone is not a compromise finding. | [390 px](uploaded-family-identity-access-390.png) · [1440 px](uploaded-family-identity-access-1440.png) |
| 2.9 Rare Process / Service | 2_9_rare_process_service.png | Figure 15. A utility appears on 1 of 20 monitored database hosts over seven days: 5% observed host prevalence. That is not a 5% attack probability, detector precision or enterprise-wide prevalence estimate. | [390 px](uploaded-family-rare-process-service-390.png) · [1440 px](uploaded-family-rare-process-service-1440.png) |
| 2.10 Parent-Child Execution | 2_10_parent_child_execution.png | Figure 16. In the synthetic w3wp.exe → cmd.exe → powershell.exe chain, cmd.exe is the web worker’s direct child; PowerShell is its later descendant and cmd.exe’s direct child. This is not a reconstruction of the Exchange incidents below. | [390 px](uploaded-family-parent-child-390.png) · [1440 px](uploaded-family-parent-child-1440.png) |

## Verification

Local gate: **PASS**. Command: `npm run research:uploads:verify`.

| Check | Result | Duration | Raw evidence |
|---|---|---:|---|
| research-and-visuals | PASS | 1s | [output](research-and-visuals.log) |
| archive | PASS | 1s | [output](archive.log) |
| media | PASS | 0s | [output](media.log) |
| legacy-build | PASS; 103 identical visual assets | 96s | [output](legacy-build.log) |
| embedded-build | PASS; 103 identical visual assets | 71s | [output](embedded-build.log) |
| rendered-article | PASS | 0s | [output](rendered-article.log) |
| visual-browser | PASS | 40s | [output](visual-browser.log) |
| whitespace | PASS | 0s | [output](whitespace.log) |

- 64 active SVG variants checked for text bounds and overlap; 28 PNG variant slots decoded (14 unique original files).
- 6 article configurations: 390, 768 and 1440 pixels, light and dark themes. All 46 figures loaded with correct aspect ratios and no page overflow.
- All 46 text equivalents expanded in each configuration; two targeted accessibility rules check text-link distinction and keyboard-focusable scrolling regions. This is not a full accessibility certification.
- The browser checks all 153 original heading anchors exactly once and all 44 historical images. Source regressions also protect existing article URLs and measured query evidence.
- Both archive builds preserve every public visual asset, including the 22 retired SVGs. The cover is unchanged.
- [Machine-readable gate](verification.json) and [browser results](browser-validation.json) include timestamps and detailed results. No new query-engine experiment or live production verification is claimed.

## Original assets and delivery trade-offs

The uploads total **9,074,589 bytes**. The four definition images are 1122 × 1402; the ten taxonomy images are 2400 × 3000. All are local, lazily loaded inline images with original-resolution links. Mobile CSS preserves their aspect ratios but cannot reflow text inside a bitmap; some embedded labels are small at phone width. The adjacent HTML equivalents and original links address access to that information without claiming that the PNGs have a separate mobile layout. This task does not claim a Lighthouse or whole-site performance score.

Provenance is recorded in [uploads-provenance.json](../../research/anomaly-visuals/uploads-provenance.json); authored placements and transcripts are in [uploaded-figures.mjs](../../research/anomaly-visuals/uploaded-figures.mjs). Asset hashes and dimensions are bound in [the public manifest](../../static/research/anomaly-visuals/manifest.json).

No article URL or existing anchor was renamed. No unrelated article body copy, research finding, tag, crosslink or incident card was rewritten. The two generator-maintained visual inventory paragraphs were updated to reflect the new figure count. Earlier verification snapshots remain untouched.
