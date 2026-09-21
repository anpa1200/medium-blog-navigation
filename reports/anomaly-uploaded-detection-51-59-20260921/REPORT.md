# Sections 5.1–5.9: detection-source infographic integration

Implemented and verified locally. **Not committed, pushed or deployed by this task.**

## Result and placement decision

All nine **2400 × 3000 PNGs** from **detection_sources_5_1_to_5_9.zip** were visually inspected and imported unchanged. The source tree previously had one matching subsection graphic: the DNS entropy diagram in Section 5.7. That image is replaced while its figure ID and old SVG asset URLs remain available. The other eight source subsections gain their matching illustrations; the introductory telemetry-contract overview remains intact.

The article now contains **55 inline figures: 41 supplied images and 14 generated diagrams**. Its 32 earlier uploads, 44 historical images, article URL, headings, Section 5 prose, maintained queries, incident register and calculated research results are preserved. Existing downstream figure numbers move because eight figures were added in reading order; their stable figure IDs and anchors do not change. All 58 retired SVG asset URLs remain available.

The writer skill guided evidence-first captions, source-specific qualifications and accessible HTML text equivalents. No image-generation or editing model was used. The ZIP's README, source notes, image manifest, accessible text and synthetic calculations were imported as reference data, not executed or treated as instructions. All 14 members retain the package's original relative paths under the public uploaded-detection directory.

| Section | Original image | Placement | Screenshots |
|---|---|---|---|
| 5.1 Windows Security Event Log | individual/5_1_windows_security_event_log.png | Figure 37; new figure after subsection discussion | [390 px](uploaded-source-windows-390.png) · [1440 px](uploaded-source-windows-1440.png) |
| 5.2 Sysmon | individual/5_2_sysmon.png | Figure 38; new figure after subsection discussion | [390 px](uploaded-source-sysmon-390.png) · [1440 px](uploaded-source-sysmon-1440.png) |
| 5.3 EDR Platforms | individual/5_3_edr_platforms.png | Figure 39; new figure after subsection discussion | [390 px](uploaded-source-edr-390.png) · [1440 px](uploaded-source-edr-1440.png) |
| 5.4 Network Detection and Response | individual/5_4_network_detection_response.png | Figure 40; new figure after subsection discussion | [390 px](uploaded-source-ndr-390.png) · [1440 px](uploaded-source-ndr-1440.png) |
| 5.5 Identity and Access Management Platforms | individual/5_5_identity_access_management.png | Figure 41; new figure after subsection discussion | [390 px](uploaded-source-iam-390.png) · [1440 px](uploaded-source-iam-1440.png) |
| 5.6 Cloud Security Services | individual/5_6_cloud_security_services.png | Figure 42; new figure after subsection discussion | [390 px](uploaded-source-cloud-390.png) · [1440 px](uploaded-source-cloud-1440.png) |
| 5.7 DNS Security | individual/5_7_dns_security.png | Figure 43; replaces prior entropy graphic | [390 px](uploaded-dns-entropy-390.png) · [1440 px](uploaded-dns-entropy-1440.png) |
| 5.8 SaaS Audit Logs | individual/5_8_saas_audit_logs.png | Figure 44; new figure after subsection discussion | [390 px](uploaded-source-saas-390.png) · [1440 px](uploaded-source-saas-1440.png) |
| 5.9 Detection Source Prioritization Matrix | individual/5_9_detection_source_prioritization_matrix.png | Figure 45; new figure after subsection discussion | [390 px](uploaded-source-prioritization-390.png) · [1440 px](uploaded-source-prioritization-1440.png) |

## Technical review

These figures describe source capabilities, collection requirements and explanatory examples. They are not records from a newly exercised endpoint, identity tenant, EDR deployment, cloud account or SIEM, and no detector accuracy is inferred from documentation or rendering checks.

### 5.1 Windows events: verify channel and effective audit policy

Selected Windows Security events, with System 7045 explicitly separated. Event 4688 command-line capture requires its own policy; 4662 requires Directory Service Access auditing and a relevant SACL. These are collection prerequisites, not evidence that a particular environment is collecting the events.

A SACL selects auditing; it does not grant permissions. A successful logon or privileged session is not by itself evidence of credential theft.

[W1 · Microsoft: Security 4688](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4688) · [W2 · Microsoft: Security 4662](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4662) · [W3 · Microsoft: AD event reference](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/monitoring-active-directory-for-signs-of-compromise).

### 5.2 Sysmon: event availability depends on configuration

Ten selected Sysmon event families, not an exhaustive inventory or guaranteed local collection. Verify the installed version and filters. Empty inferred start-module fields and unresolved call traces do not, by themselves, prove injected code; image-load records do not guarantee manual-mapping coverage.

A documented event type is not proof that your sensor generates, forwards or retains it. Test the actual configuration before claiming detection coverage.

[S1 · Microsoft: Sysmon events](https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon).

### 5.3 EDR: separate event identity from process correlation

DeviceProcessEvents is a Microsoft-specific example. Its documented unique-event key is ReportId + DeviceName + Timestamp; the displayed DeviceId + Timestamp pair is context, not a replacement event key. ProcessUniqueId and InitiatingProcessUniqueId identify process instances, not individual event records.

A table name or vendor alert does not establish complete telemetry or a confirmed intrusion. Missing fields must remain unknown, not silently fabricated.

[E1 · Microsoft: DeviceProcessEvents](https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-deviceprocessevents-table).

### 5.4 Network visibility depends on the observation point

The Zeek sensor receives a TAP/SPAN traffic copy; the drawing does not place it inline. dns.log uses TTLs, not TTL. TLS fields and fingerprints depend on protocol, analyzers and configuration. A JA3/JA4 fingerprint is neither an actor identity nor proof of malware.

Placement, packet loss and encryption constrain visibility. Connection metadata alone cannot reveal encrypted application payloads or establish estate-wide coverage.

[N1 · Zeek DNS reference (pinned 8.2.1)](https://docs.zeek.org/en/v8.2.1/reference/logs/dns.html) · [N2 · Zeek TLS reference (8.2.0)](https://docs.zeek.org/en/v8.2.0/reference/logs/ssl.html) · [N3 · Cloudflare: JA4](https://blog.cloudflare.com/ja4-signals/).

### 5.5 Identity events: inspect the actor, target and outcome

The three Okta event names are catalog entries, not attack verdicts. Read outcome and actor/target context before inferring abuse. Entra risk detections combine different signal types; denying an MFA challenge is not automatically a suspicious-activity report or proof of MFA fatigue.

Approved support, recovery and privilege changes can produce similar records. Validate the tenant, session, configuration and retained events before correlating activity.

[I1 · Microsoft: Entra risk detections](https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-risks) · [I2 · Okta: event catalog](https://developer.okta.com/docs/reference/api/event-types/).

### 5.6 Cloud evidence: distinguish raw events and provider findings

Control-plane events, resource data events and native findings need separate collection checks. AWS documentation still lists GenerateDbAuthToken in GuardDuty guidance while RDS states CloudTrail does not track token generation. This unresolved discrepancy is not permission to assume an exported event exists.

A native finding is not a raw audit record. No cloud account was exercised here, and no detector dependent on the disputed token-generation event was implemented.

[C1 · AWS: CloudTrail data events](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-data-events-with-cloudtrail.html) · [C2 · AWS: GuardDuty IAM findings](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_finding-types-iam.html) · [C3 · AWS: RDS IAM authentication limits](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.html).

### 5.7 DNS entropy measures symbol distribution, not intent

The synthetic labels aaaa, abab and abcd have empirical character entropies of 0, 1 and 2 bits per character. These exact calculations match the supplied bars and are not incident measurements or alert thresholds. A structured string can have high empirical entropy.

For nonempty labels of length n over alphabet A, H ≤ log₂(min(n, |A|)). This bound and the three examples do not establish a useful tunneling detector.

[N1 · Zeek DNS reference (pinned 8.2.1)](https://docs.zeek.org/en/v8.2.1/reference/logs/dns.html) · [D1 · Supplied synthetic calculations](https://1200km.com/articles/research/anomaly-visuals/uploaded-detection/synthetic_calculations.json).

### 5.8 SaaS audit: events, objects and transferred bytes differ

Three synthetic, distinct FileDownloaded audit records refer to object A: three events, one distinct object identifier, and unknown transferred bytes—not zero. This is not a tenant replay. OfficeObjectId is not a byte counter, and object size alone may not equal the bytes actually transferred.

Deduplicate evidence records separately from counting objects. Quantify bytes only from validated counters or explicitly qualified enrichment, retaining unknown values.

[O1 · Microsoft: OfficeActivity schema](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/tables/officeactivity) · [Supplement · Microsoft: audit operations](https://learn.microsoft.com/en-us/purview/audit-log-activities) · [Supplement · Microsoft: MailItemsAccessed](https://learn.microsoft.com/en-us/purview/audit-log-investigate-accounts) · [Synthetic event-count calculation](https://1200km.com/articles/research/anomaly-visuals/uploaded-detection/synthetic_calculations.json).

### 5.9 Prioritize sources using measured local value

Five planning questions, not measured product rankings, fidelity scores or a universal rollout sequence. The matrix summarizes the article’s proposed framework; NIST supports general IDPS planning, not an endorsement or validation of this exact five-row design.

Pilot a defined use case, measure local costs and outcomes, and assign collection ownership. A numbered planning row is not a calibrated priority score.

[P1 · NIST SP 800-94](https://csrc.nist.gov/pubs/sp/800/94/final).

## Source and arithmetic verification

The relevant Microsoft, Okta, AWS, Zeek, Cloudflare and NIST references were consulted for this integration. Verification is bounded to the displayed claims, not every page of every product manual. Notable checks and qualifications:

- Microsoft documents the DeviceProcessEvents event key as ReportId with DeviceName and Timestamp. The figure's DeviceId/time and process-instance fields are context and correlation fields, not replacement event identifiers.
- The supplied Zeek master DNS URL was not retrievable through the browser tool. The nearby N1 link uses the accessible pinned 8.2.1 DNS documentation, where TTLs was verified. The supplied notes are retained unchanged, including their original master URL. N2 remains the supplied 8.2.0 TLS reference; no one-version universal schema is implied.
- Both conflicting AWS statements about GenerateDbAuthToken were located. This does not establish that a customer-exported CloudTrail event exists, and no detector dependent on it was implemented.
- The OfficeActivity schema is supplemented with Microsoft's operation catalog and mailbox guidance for the named workload operations. This does not assert that any particular tenant collects all of them.
- DNS entropy is recomputed from the literal character counts: aaaa = 0, abab = 1, abcd = 2 bits per character. These are synthetic strings, not observed domains or a detector calibration dataset.
- The synthetic SaaS records have three distinct evidence IDs and one object identifier. Their transferred-byte value is null/unknown, not zero; event count and object size are not equivalent to actual transfer volume.
- Eight mutation checks reject drift in the baked-in DNS and SaaS values, duplicate illustrative evidence IDs, wrong object counts and conversion of unknown bytes into zero. This is a consistency check on the figures, not a test against production telemetry.

## Local verification

Overall: **PASS**. Source regression tests: **33**. Reproduce with: npm run research:uploads:verify.

| Gate | Result | Duration | Evidence |
|---|---|---:|---|
| research-and-visuals | PASS | 1s | [log](research-and-visuals.log) |
| archive | PASS | 1s | [log](archive.log) |
| media | PASS | 0s | [log](media.log) |
| legacy-build | PASS; 136 byte-identical assets including nested package files | 96s | [log](legacy-build.log) |
| embedded-build | PASS; 136 byte-identical assets including nested package files | 75s | [log](embedded-build.log) |
| rendered-article | PASS | 0s | [log](rendered-article.log) |
| visual-browser | PASS | 96s | [log](visual-browser.log) |
| whitespace | PASS | 0s | [log](whitespace.log) |

- 110 asset-variant slots checked: 28 active generated SVG variants plus both slots for each of the 41 original rasters. The same raster is reused across viewports; this is not 82 different raster designs.
- 6 viewport/theme configurations: 390, 768 and 1440 pixels in light and dark themes. All 55 figures decode with preserved aspect ratios and no page overflow or JavaScript errors.
- All 55 HTML text-equivalent panels are expanded for two targeted accessibility rules, covering distinguishable prose links and keyboard-focusable scrolling regions. This is not a full accessibility certification.
- Section 5 prose is compared directly against its maintained source with figure tags removed. All nine new section placements, the preserved DNS anchor, image dimensions, source-code resolution, package metadata and document hashes have regression checks.
- Original 153 heading anchors, 192 article routes/canonicals, 44 historical images, current fragments, incident mappings and maintained query evidence pass preservation checks. The catalog now records 99 article images: 55 current plus 44 historical.
- [Structured gate results](verification.json), [browser results](browser-validation.json), [contact sheet 5](contact-sheet-5.png), [contact sheet 6](contact-sheet-6.png) and the per-figure screenshots above document the local state. No CI, production deployment or new query-engine run is claimed.

## Original-file provenance and size

The nine new images total **13,932,124 bytes**; all 41 uploaded images total **28,814,526 bytes**. Originals are lazy-loaded inline with full-resolution links. Small bitmap labels do not reflow on phones; the HTML equivalents provide readable access. Images were not compressed or redrawn, and no whole-site performance score is claimed.

| Original file | Native dimensions | SHA-256 |
|---|---|---|
| individual/5_1_windows_security_event_log.png | 2400 × 3000 | a2c64643abcdef1cd6c6ef8a189d84fdaa236210d2a04de27cf5821ed4dbe19b |
| individual/5_2_sysmon.png | 2400 × 3000 | 29507bce8480ed7242c4c244a8cf3a2e60e8b1de78a3a1ec92d8fd391f8666e5 |
| individual/5_3_edr_platforms.png | 2400 × 3000 | 9e05628c26494d7ed11a5ec5b8cb6a3b2dcffbcfe2e2aa0bf97f2faccd34a720 |
| individual/5_4_network_detection_response.png | 2400 × 3000 | db16117c6b7b3dedf1608af148edab6cdf5384548fb97978f473300ab6872b18 |
| individual/5_5_identity_access_management.png | 2400 × 3000 | 9dd80ba590da502e0721437ddedaad5236c319e6d4788f730c9b16f55a432837 |
| individual/5_6_cloud_security_services.png | 2400 × 3000 | 59b48d66ca6c02250981b69a4792565754645a412e394470000440863621b990 |
| individual/5_7_dns_security.png | 2400 × 3000 | 30f973d02bf2a30ea165028749a888536af6d0a2362069fc330410a05303e64e |
| individual/5_8_saas_audit_logs.png | 2400 × 3000 | 4b1c82dc144925edde6aba73a4648b0129762584589406dc3eadb4eea8d864b8 |
| individual/5_9_detection_source_prioritization_matrix.png | 2400 × 3000 | 45ba8e6150e4fce2fff5f403326cc6181ba0870525c1c7f1d9cd330a08ca2a7e |

### Preserved supporting files

- [README.md](../../static/research/anomaly-visuals/uploaded-detection/README.md): 1224 bytes; SHA-256 8779ae2bf1fbdadc2f334c3a10a05adcb5c1aa242841f948864937c1d16be009.
- [SOURCES_AND_EVIDENCE_NOTES.md](../../static/research/anomaly-visuals/uploaded-detection/SOURCES_AND_EVIDENCE_NOTES.md): 6125 bytes; SHA-256 21f782e9d55fe6a8237f2d2eafa13bc20b3114c6908b0c533cb5dc5b80145c7f.
- [manifest.json](../../static/research/anomaly-visuals/uploaded-detection/manifest.json): 2421 bytes; SHA-256 54a643b7a4c1db131b25329fb7455ff511b9ab4f094ea73feb1864b7c13fc150.
- [accessible_text.json](../../static/research/anomaly-visuals/uploaded-detection/accessible_text.json): 13568 bytes; SHA-256 1e921626c1e638664a65377f5cf572b81b10eb60ad8903699396e3dee4237b2f.
- [synthetic_calculations.json](../../static/research/anomaly-visuals/uploaded-detection/synthetic_calculations.json): 1140 bytes; SHA-256 ecd374efd64d42bceb7d14fe2276dbde2933489dc07c4d22f42aa5ea49f4731f.

ZIP SHA-256: **84591587a1a9b1d6703aecfdd9e9ad3fc397153572264669668d14784c0c4a5d**. The importer compares the nine originals with the supplied manifest before copying; the build verifier recursively checks that the entire public package survives both builds byte-for-byte.

[Provenance](../../research/anomaly-visuals/uploads-provenance.json), [authored source-guide specifications](../../research/anomaly-visuals/uploaded-detection-sources.mjs) and the [public manifest](../../static/research/anomaly-visuals/manifest.json) bind the placements, captions, calculations and assets.

Earlier verification directories remain historical snapshots. This task extends the existing uncommitted work and makes no claim that these images are already published.
