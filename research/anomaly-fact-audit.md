# Anomaly research: reconciled factual and implementation audit

Revision date: 2026-09-21. Author: Andrey Pautov. Baseline: `3656ca970ae839081af078f486cf542e9105044b`.

## Evidence boundary

This replaces the earlier blanket-open audit with finding-level dispositions. 36 existing findings and 16 external-review rows are cross-referenced, not counted as 52 unique factual defects. Additional findings and external dependencies are recorded separately. A textual correction is not a production validation result. This is an author/assistant revision, not independent peer-review certification.

The article now distinguishes source-reported incidents, inferred detectors, synthetic functional fixtures, public lab-recording replay and a synthetic statistical experiment. No production accuracy percentage is assigned. The Medium edition has not been modified by this revision.

## Current validation

- Canonical KQL files: 8, using explicit normalized schemas rather than unspecified native connector tables.
- Real Kusto functional execution: passed; 34/34 synthetic regression cases.
- Offline counterexamples: 8/8.
- Public recordings: 3, pinned to a repository commit and verified SHA-256 digests. These do not provide a representative negative corpus or per-event malicious labels.
- Native Sentinel ingestion, Splunk execution, production precision/recall and automated containment safety: not established.

The single-ticket Kerberoasting recording produces no breadth-rule match. DCSync records without suitable logons retain unresolved source IPs. Neither limitation is repaired by fabricating events or enrichment.

## Dispositions

- corrected_in_revision: 54
- documented_conflict_not_resolved_upstream: 1
- historical_not_revalidated: 1
- not_established: 2
- requires_publication_access: 1

These counts are ledger entries, not unique defects, detection accuracy, or a percentage of research correctness.

| ID | Priority | Finding | Resolution and evidence location | Status |
|---|---|---|---|---|
| R01 | P2 | Intro/index: only 14 operational headings covered | Scope indexed as 14 operational families plus correlation; 15 navigation tags retained. **§2** | corrected_in_revision |
| R02 | P1 | §1/§10: hypothesis “substantially true”; incidents “confirm” detectability | Conditional hypothesis and conclusion replace population-level detectability claims. **§1; §10** | corrected_in_revision |
| R03 | P2 | §2/§5.9: High/Medium/Low stability, fidelity and FP risk | Unmeasured FP/stability/fidelity rankings replaced by requirements and competing explanations. **§2; §5.9** | corrected_in_revision |
| R04 | P2 | §3: ATT&CK lifecycle; Kerberoasting under privilege escalation | Nonsequential tactic mapping pinned to Enterprise ATT&CK v19.2; Kerberoasting under Credential Access. **§3; §6.1** | corrected_in_revision |
| R05 | P1 | §4.1: TEARDROP disguised as a JPEG | TEARDROP executable distinguished from the input file with a likely fake JPEG header. **§4.1** | corrected_in_revision |
| R06 | P1 | §4.1/§10: SUNBURST above-baseline entropy and assured DNS detection | No SUNBURST entropy range, victim baseline or guaranteed entropy-detector success asserted. **§4.1; §10** | corrected_in_revision |
| R07 | P1 | §4.2/§8/§9: web-server child shells have near-zero legitimate prevalence | Web-worker child shells are scoped hunting candidates with benign alternatives. **§4.2; §8.2** | corrected_in_revision |
| R08 | P2 | §4.2: native IIS module activity attributed through original HAFNIUM source | HAFNIUM separated from broader Exchange post-exploitation and later native-module claims. **§4.2** | corrected_in_revision |
| R09 | P1 | §4.3: one Conti narrative combines specific tools, proxy paths and timing from multiple reports | Conti account anchored to one BazarCall/Trickbot investigation; unmatched proxy/timing details excluded. **§4.3** | corrected_in_revision |
| R10 | P1 | §4.3/§9: AdFind causes every EDR to fire; workstation shadow-copy deletion is effectively never legitimate | No universal EDR detection or near-zero legitimate snapshot-deletion claim. **§4.3; §9.2** | corrected_in_revision |
| R11 | P1 | §4.4: DNSpionage folded into APT34/OilRig | DNSpionage is not assigned to OilRig from the Talos report; RDAT mechanisms remain variant-specific. **§4.4** | corrected_in_revision |
| R12 | P1 | §4.4: TXT:A ratio >1 abnormal for any legitimate service; no full QNAME means tunneling is undetectable | No universal TXT:A threshold or assertion that missing QNAME defeats all possible detection. **§4.4** | corrected_in_revision |
| R13 | P1 | §4.8/§10: Volt Typhoon citation links to Midnight Blizzard; detection possible only with command-line logging | Correct Volt Typhoon source; IFM on DC context and multiple evidence sources. **§4.9** | corrected_in_revision |
| R14 | P1 | §4.9: MESSAGETAP is a shared library with a continuing 30-second configuration refresh | MESSAGETAP described as ELF data miner; initial config loading/deletion distinguished from continuous refresh. **§4.10** | corrected_in_revision |
| R15 | P1 | §4.11: secretsdump means DCSync; WMI 5861 associated with wmiexec | Impacket tool/mode distinction; WMI subscription and RPC-port inference boundaries. **§4.11** | corrected_in_revision |
| R16 | P1 | §5.1: universal default Windows audit settings, including 4688 | Effective audit prerequisites replace blanket defaults; 4776 authority and 4648 corrected. **§5.1** | corrected_in_revision |
| R17 | P1 | §5.2: `StartModule = "Unknown"` indicates shellcode | Unresolved Sysmon start module is not shellcode proof. **§5.2** | corrected_in_revision |
| R18 | P1 | §4/§5/§9: Sysmon 7 sees in-memory loaders; Sysmon command lines require Windows 4688 GPO | Sysmon versus native 4688 configuration separated; manual-load coverage not guaranteed. **§5.2** | corrected_in_revision |
| R19 | P1 | §5.4: `dns.log` has `TTL`; JA3/JA3S are baseline `ssl.log` fields | Zeek TTLs corrected; fingerprint/package and analyzer prerequisites documented. **§5.4** | corrected_in_revision |
| R20 | P2 | §5.3–5.6: exact vendor counts, dates, model inventories, alert labels and license dependencies | Unverified vendor counts, dates, model inventories, hard-coded learning periods and licensing removed from operational guidance. **§5.3–5.6** | corrected_in_revision |
| R21 | P1 | §5.5: every Entra risk detection is an anomaly model; MFA denial equals user-reported suspicious activity | Risk signal classes and MFA failure versus user-reported fraud distinguished. **§5.5** | corrected_in_revision |
| R22 | P2 | §5.5: exact Okta event identifiers | Valid Okta event names retained; outcome interpretation qualified. **§5.5** | corrected_in_revision |
| R23 | P1 | §5.6: `GenerateDbAuthToken` as a CloudTrail API anomaly | Both conflicting AWS documents cited; no token-generation CloudTrail detector is offered. **§5.6** | documented_conflict_not_resolved_upstream |
| R24 | P2 | §5.7: entropy measures string randomness; short human labels establish a threshold | Entropy defined as character-frequency statistic with length/alphabet bound; implementation tested. **§5.7; §8.2** | corrected_in_revision |
| R25 | P1 | §6.1: all service tickets encrypted with NTLM hash; regular-user service-ticket requests abnormal | RC4/AES service-key distinction, ordinary TGS requests and low-volume coverage limits. **§6.1; §8.2** | corrected_in_revision |
| R26 | P1 | §6.2: SACL grants SYSTEM audit rights; all machine accounts excluded | SACL auditing versus permission explained; blanket account-name exclusions removed. **§6.2** | corrected_in_revision |
| R27 | P1 | §6.2/§8: DCSync query outputs `IpAddress` from 4662, requires both GUIDs in one event, omits stated access-mask check | DCSync access bit, separate rights, same-DC bounded logon correlation and unresolved/ambiguous output tested. **§6.2; §8.2** | corrected_in_revision |
| R28 | P1 | §6.3: PtH sends the NTLM hash directly; S-1-0-0 proves no interactive source logon | NTLM challenge-response distinguished from directly sending hash; null SID not source-session proof. **§6.3** | corrected_in_revision |
| R29 | P1 | §6.4/§8: unknown call trace proves injection; trusted image-path allowlist proves benign | Unresolved call trace and trusted filenames/paths are not malicious/benign verdicts. **§6.4** | corrected_in_revision |
| R30 | P1 | §8: preserved query exports split tokens/operators; undeclared `THRESHOLD` / server-list placeholders | Broken legacy blocks archived; eight single-source normalized-schema KQL examples execute in a real Kusto engine. **§8** | corrected_in_revision |
| R31 | P1 | §8 password spray: time-range expression used as join key, tenant-wide aggregation loses affected identity | Password-spray equality keys, attempted-account membership and time ordering tested. **§8.2** | corrected_in_revision |
| R32 | P1 | §8: result 50140 treated as success; all nonzero codes treated as bad passwords | Result 0 success; 50126 selected invalid-credential class; 50140 and policy errors excluded. **§8.2** | corrected_in_revision |
| R33 | P1 | §8 bulk download: calendar-day baseline vs rolling 24 hours; inner join; positive stdev filter | Calendar-day alignment, completeness, cold starts, zero MAD and future exclusion tested. **§8.2** | corrected_in_revision |
| R34 | P1 | §8 hybrid gating: precision improves without losing recall | No free precision/recall improvement promised; synthetic gate ablation exposes lost positives. **§8.1; §9.6** | corrected_in_revision |
| R35 | P1 | §9/§10: no single anomaly should cause investigation; other sections call single events near-deterministic | Investigation, incident declaration and containment separated; no blanket single-signal suppression. **§9.4; §10** | corrected_in_revision |
| R36 | P1 | §10: Midnight Blizzard defeats per-tenant analytics; SaaS-native theft creates no signals without SaaS audit | Tenant-local and SaaS visibility limitations qualified; no universal absence claim. **§4.6–4.7; §10** | corrected_in_revision |
| E01 (overlaps R02) | P2 | Midnight Blizzard February metric | Already removed before this revision; now cited accurately to the March update with its limited scope. **§4.6** | corrected_in_revision |
| E02 (overlaps R21) | P1 | Midnight Blizzard permission | Already corrected before this revision; full_access_as_app retained explicitly. **§4.6** | corrected_in_revision |
| E03 (overlaps R02) | P1 | Storm-0558 signing key and detection | Acquired key/forged tokens preserved; CSRB customer detection and Big Yellow Taxi added without inventing a private rule. **§4.8** | corrected_in_revision |
| E04 (overlaps R20) | P2 | Storm-1283 citation | December 12, 2023 Microsoft report retained; distinct campaign from Storm-0558. **§4.8** | corrected_in_revision |
| E05 (overlaps R13) | P1 | Volt Typhoon IFM execution host | DC execution versus remote initiation distinguished; non-DC-only detector not offered. **§4.9** | corrected_in_revision |
| E06 (overlaps R16) | P2 | System versus Security clearing | Eventlog System 104 distinguished from Security 1102; actual cleared channel required. **§4.9; §5.1** | corrected_in_revision |
| E07 (overlaps R16) | P2 | Event 4648 defaults | Audit Logon membership documented; effective-policy verification replaces universal defaults. **§5.1** | corrected_in_revision |
| E08 (overlaps R10) | P2 | Defender native events | Operational 5001/5007 included; configuration change not automatically malicious. **§4.3; §5.1** | corrected_in_revision |
| E09 (overlaps R09) | P2 | Conti merged tools/timeline | Single-investigation account; IcedID detail not attributed to BazarCall/Trickbot case. **§4.3** | corrected_in_revision |
| E10 (overlaps R02) | P2 | 3CX chronology and icon content | March 22 behavioral detections precede disclosure; icon-based C2 information distinguished from executable download. **§4.12** | corrected_in_revision |
| E11 (overlaps R16) | P1 | MOVEit account and Windows 4720 | Already corrected before revision; application-database operation retained explicitly. **§4.5** | corrected_in_revision |
| E12 (overlaps R25) | P2 | RC4-only Kerberoasting | AES-inclusive request-breadth view, krbtgt exclusion and measured low-volume miss. **§6.1; §8.2** | corrected_in_revision |
| E13 (overlaps R28) | P2 | PtH source-side view | Type 9/seclogo included as non-universal, non-exclusive hunting view. **§6.3; §8.2** | corrected_in_revision |
| E14 (overlaps R19) | P2 | JA3/JA4 currency | TLS-extension-order issue and implementation dependency documented; fingerprint is not attribution. **§5.4** | corrected_in_revision |
| E15 (overlaps R24) | P2 | TF-IDF and model assumptions | Feature weighting separated from clustering; count dispersion and zero-MAD caveats; synthetic comparison. **§2; §9.2–9.6** | corrected_in_revision |
| E16 (overlaps R03) | P2 | Inconsistent examples | Aligned download windows/units, server peers, SSH ancestry, point/context distinctions and service-principal flow example corrected. **§1–2** | corrected_in_revision |
| A01 | P2 | Unsupported victim counts, NSA rare-URI cutoff and exact Conti timing | Unsupported numeric claims are not retained as established incident facts. **§4.1–4.3** | corrected_in_revision |
| A02 | P1 | MOVEit configuration-file claim and named UNC3944 victim attribution | Use documented database settings and source-scoped cluster account; do not carry unmatched filename/victim assertions forward. **§4.5; §4.7** | corrected_in_revision |
| A03 | P2 | APT41 SQLULDR2/PINEGROVE and Unit 42 title/URL mismatch | Direct July 2024 APT41 report and specific RDAT investigation replace generic/mismatched sources. **§4.4; §4.10; §11** | corrected_in_revision |
| A04 | P1 | Historical infographics can contradict corrected prose | All 44 original media references, including the old cover, are retained in the superseded historical appendix. A separate set of 43 author-reviewed, source-linked inline diagrams replaces their instructional role. Numerical figures are generated from versioned evidence. The old raster illustrations themselves remain unvalidated; replacement does not certify their contents. **§9.8** | historical_not_revalidated |
| V01 | P1 | Production ingestion/thresholds/accuracy | Normalized-schema functional tests and public lab replay do not establish live Sentinel/Splunk ingestion, production precision, recall or containment safety. **§8.3; §9.6** | not_established |
| V02 | P1 | Medium edition synchronization | Prepared correction notice; no Medium modification or synchronization claimed. **§9.7** | requires_publication_access |
| V03 | P2 | Independent factual certification | This is a source-grounded author/assistant revision and reproducible test package, not an independent peer-review certification or 100-percent factual guarantee. **audit** | not_established |

## Reproduction and supporting artifacts

See `research/anomaly-validation/README.md` in the source repository, the downloadable `anomaly-validation/bundle.json`, canonical query files, functional outputs, dataset manifest and synthetic-study inputs/results. Query hashes bind the reported engine run to the published snippets. Historical query exports are explicitly superseded in `anomaly-historical-code.md`.

## Publication boundary

The original article URL, existing article routes/canonicals, all prior heading anchors, 15 anomaly tags and 30 incident mappings are preserved. All 44 original images, including the old cover, remain in a clearly superseded historical appendix. They have not received a new visual fact audit and are not current implementation guidance. A separate set of 43 author-reviewed, source-linked diagrams is now placed inline; its desktop/mobile SVGs and numerical inputs are bound by the `anomaly-visuals/manifest.json` evidence manifest. This replacement does not certify the historical images or establish production accuracy.

Build checks and local browser verification are reported separately from query execution. A repository revision is not evidence of deployment or of a synchronized Medium edition.
