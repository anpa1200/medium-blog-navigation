# Anomaly research: incident evidence expansion

Review date: 2026-09-21. Author: Andrey Pautov. Implementation status: local research changes; no commit, push or deployment performed.

## Scope and editorial method

Expanded the existing *Malicious Activity as a Statistical Signal* article at its unchanged route. Coverage is **14 feature families plus multi-event correlation (15 topics)**, not every category in the companion Atlas's broader statistical taxonomy. The follow-up review found the original correlation heading had been omitted from the first expansion; it now has its own examples and tag.

The writer skill guided the evidence labels, linked contents, source register and publication structure. It did not authorize publication or rewriting the original detection code. Each new case card separates investigator-reported observations from the author's anomaly interpretation, telemetry requirements, competing explanations and ATT&CK mapping.

There are **30 case-to-topic mappings**, **17 distinct incident/campaign records** and **17 primary source documents**. These are not 30 independent incidents or a count of individual victims. Some campaign reports synthesize multiple engagements; the same campaign appears under multiple feature families. The DOJ material distinguishes a conviction from allegations in an indictment. No precision, recall, causal detector success or universal threshold was invented.

The subsequent [full factual and logic audit](../../static/research/anomaly-fact-audit.md) identified substantial open issues in the retained legacy prose and queries. Evidence-register checks do not certify those sections. The article now displays this boundary prominently.

## Coverage

| Operational anomaly type | First documented case | Second documented case |
|---|---|---|
| Volumetric | UNC5537 / Snowflake customer data theft | HTTP/2 Rapid Reset |
| Frequency / Rate | HTTP/2 Rapid Reset | Midnight Blizzard low-volume spraying |
| Temporal | SUNBURST delayed activation | Industroyer2 scheduled execution |
| Peer-Group | Ahmad Abouammo / Twitter insider case | Storm-1283 OAuth cryptomining |
| Sequence | UNC3944 help-desk, identity and SaaS activity | BazarCall to Conti |
| Graph / Relationship | Midnight Blizzard application permissions | Storm-1283 application-to-subscription access |
| Geographic / ASN | UNC5537 VPN and VPS infrastructure | Midnight Blizzard residential proxies |
| Identity / Access | UNC3944 MFA manipulation | Storm-0558 forged tokens |
| Rare Process / Service | Conti intrusion using AdFind | MESSAGETAP on SMS-center servers |
| Parent-Child Execution | Lemon Duck Exchange activity | DoejoCrypt Exchange activity |
| Data Movement | UNC5537 database exports | UNC3944 Airbyte/Fivetran exfiltration |
| Protocol / Application Usage | SUNBURST DNS coordination | OilRig-associated RDAT DNS tunneling |
| Negative / Absence | SCARLETEEL logging impairment | AuKill EDR termination incidents |
| State-Change | Storm-1283 credentials and permissions | LEMURLOOT MOVEit application accounts |
| Multi-Event Correlation (composition pattern) | UNC3944 identity-to-transfer evidence | BazarCall to Conti cross-source chain |

## Tags and crosslinks

- Eight in-article topic tags link to the relevant anomaly sections: cloud/SaaS, network, identity, endpoint, insider, OT, telemetry health and application audit.
- Point, contextual and collective labels link to the statistical definitions.
- The archive catalog includes searchable/filterable Anomaly Detection, UEBA, Incident Analysis, MITRE ATT&CK and CTI tags while retaining the original Detection Engineering and Digital Forensics tags.
- Four existing companion articles now link back contextually: insider detection, CTI-to-detection, modern detection engineering and the six-PCAP experiment.
- Every anomaly type links to a relevant Atlas section and to related anomaly types. There are 11 distinct Atlas fragment destinations.
- The new mappings link to 17 existing Threat Matrix technique pages. Current MITRE identities and labels were checked separately.
- No new HTML/tag pages were generated and no existing article URL or canonical was changed. A downloadable JSON evidence asset was added.

The live Atlas path is `/anomaly-detection-atlas/statistical-anomaly-taxonomy/`, without `/docs/`. The initial guessed path returned 404 and was corrected before handoff.

MITRE's previous T1562.001 and T1562.008 URLs returned HTTP 200 **meta-refresh stubs**, not technique pages. The new cards use their verified replacements T1685 and T1685.002. The evidence register retains the transitions. This is not a claim that every legacy ATT&CK reference in the older article has been migrated.

## Corrections accompanying the expansion

- Distinguished precision from false-positive rate, with explicitly illustrative arithmetic.
- Corrected LEMURLOOT's application-database account creation: Windows Event 4720 is not its expected account artifact.
- Corrected Storm-0558: an acquired signing key was used to forge tokens; the key itself was not forged.
- Replaced the Storm-1283 verification-needed placeholder with Microsoft's December 2023 primary report.
- Corrected the publication year of Mandiant's UNC3944 SaaS report to 2024.
- Removed the unsupported numeric SUNBURST entropy range as an empirical claim.
- Qualified the claim that Midnight Blizzard spraying could only be detected by the provider; corrected the associated application-permission example.
- Removed unsupported MOVEit victim/time-window precision and the February metric attributed to a January Microsoft publication.
- Corrected LSASS process-access mask descriptions using Microsoft documentation.
- Updated the current MailItemsAccessed licensing statement, keeping historical availability separate.
- Added a prominent warning before the original detection queries identifying known implementation gaps. Those queries were preserved, not silently presented as tested production rules.

## Source and generated files

| Files | Purpose |
|---|---|
| `research/anomaly-incidents.json` | Authored case, source, mapping and attribution register |
| `scripts/render_anomaly_incidents.mjs` | Idempotently renders marked article sections and downloadable JSON |
| `static/research/anomaly-incidents.json` | Public evidence asset generated from the authored register |
| Main anomaly article Markdown | New case cards, navigation, index, references and targeted corrections |
| Four companion article Markdown files | Contextual return links only |
| `src/data/article-catalog.json` | Research title, summary, searchable tags and update date |
| `scripts/validate_anomaly_incidents.mjs` | Coverage, references, reciprocal links, preservation and rendered-anchor checks |
| `scripts/check_anomaly_links.mjs` | Bounded public HTTP/content/fragment checks |
| `scripts/verify_anomaly_research.mjs` | Local verification runner with command logs and source hashes |
| `package.json` | Explicit research maintenance and validation commands |
| This report directory | Verification outputs and evidence boundaries |

## Reproduce

```bash
npm run research:anomalies:render
npm run research:anomalies:check
npm run research:anomalies:verify
npm run research:anomalies:links
```

The source-preservation test compares against commit `869e5abd9f806f3de7d800f3b4f0f3ec867b2923`; that history must be available locally. It verifies all 192 existing article routes/canonicals, the target article's 44 image references and all 11 original fenced technical blocks. A shallow clone without the baseline needs that history fetched before running the preservation check.

`verify` runs both legacy and embedded Docusaurus builds sequentially and leaves the embedded output in `build/`. Adding `-- --live` also runs public-link checks, but an external anti-bot response can stop that combined run. Use the separate local and network commands to distinguish repository failures from external availability.

## Verification evidence and boundaries

Final local results are in `validation-summary.json` and the associated `.log` files. The summary records exact commands, exit codes, elapsed times and SHA-256 hashes of the reviewed source, catalog and article.

**Final local result: 7/7 checks passed.** Both legacy and embedded builds completed without broken-anchor warnings. Embedded output validation covered 192 articles and 195 HTML documents. The additional rendered-article check verified 455 self-fragment links, 61 explicit anchors, one H1, the downloadable evidence JSON and catalog tags. Original-route, image-reference and code-block preservation checks passed. The empty `whitespace.log` is the successful output of `git diff --check`.

Public checks are in `link-check.json`: **55 of 56 destinations passed the stricter content check** on this run. All 17 Threat Matrix pages, 17 current MITRE pages, four companion article pages and 11 Atlas fragments passed. One DOJ verdict release returned HTTP 200 with an automated-access challenge/meta refresh, so it is **not counted as a successful content fetch**. Its primary reporting was reviewed through web research and corroborated by the same-day Northern District of California release and the linked indictment; no anti-bot bypass was attempted. The citation remains an official DOJ URL, not a fabricated or substituted incident.

The older, less strict check briefly counted HTTP 200 redirect/challenge stubs as success. The checker was strengthened to require substantive HTML with a title and to reject meta-refresh pages. The final JSON and log reflect the stricter test, not the earlier inflated pass count.

These checks establish source organization, link integration and local build integrity. They do **not** establish detector accuracy, independent reproduction of the incidents, browser interaction coverage, availability of every older citation, or production deployment. `validate:media:local` checks local media paths only; it does not redownload the 44 remote images.

Known older query limitations remain explicitly disclosed: password-spray join/window/account correlation, bulk-download cold-start/zero-variance/missing-day handling, and DCSync source-IP enrichment and replication allowlisting. A separate query-remediation and telemetry-validation task is required before calling those examples production-ready.

## Handoff

Worktree: `/home/andrey/wireshark/anomaly-research-update`.

Branch: `research/anomaly-incident-evidence-20260921`, based on the archive's `origin/main` snapshot above. Pending SEO worktrees and their changes were not modified. The live research article and Medium copy have **not** been updated by this task.
