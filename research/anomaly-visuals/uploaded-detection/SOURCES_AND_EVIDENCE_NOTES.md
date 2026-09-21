# Source references and evidence notes

Prepared for the 1200km.com infographic series. Source review: 21 September 2026.

The PNGs are separate 2400 × 3000 images. Their source IDs resolve below. They are explanatory source guides, not tested detection rules or vendor performance measurements. No live endpoint, SIEM, cloud account or identity service was exercised to make these graphics.

## Source register

### [A] Andrey Pautov / 1200km.com — Malicious Activity as a Statistical Signal, Sections 5.1–5.9
https://1200km.com/articles/read/2026/2026-04-20-malicious-activity-as-a-statistical-signal-a-detection-engineering-analysis-of-anomaly-bas-90df8b6dea12/

### [W1] Microsoft — Event 4688, process creation and command-line inclusion
https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4688

### [W2] Microsoft — Event 4662, Directory Service Access and SACL requirements
https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4662

### [W3] Microsoft — Monitoring Active Directory for Signs of Compromise; audit categories and event reference
https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/monitoring-active-directory-for-signs-of-compromise

### [S1] Microsoft Sysinternals — Sysmon event and configuration reference
https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon

### [E1] Microsoft — DeviceProcessEvents advanced-hunting table
https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-deviceprocessevents-table

### [N1] Zeek — dns.log field reference
https://docs.zeek.org/en/master/reference/logs/dns.html

### [N2] Zeek — ssl.log and TLS visibility
https://docs.zeek.org/en/v8.2.0/reference/logs/ssl.html

### [N3] Cloudflare — JA4 fingerprints and inter-request signals
https://blog.cloudflare.com/ja4-signals/

### [I1] Microsoft — Entra ID Protection risk detections
https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-risks

### [I2] Okta — Event Types catalog
https://developer.okta.com/docs/reference/api/event-types/

### [C1] AWS — Logging CloudTrail data events
https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-data-events-with-cloudtrail.html

### [C2] AWS — GuardDuty IAM finding types
https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_finding-types-iam.html

### [C3] AWS — RDS IAM database authentication, limitations
https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.html

### [O1] Microsoft — OfficeActivity schema
https://learn.microsoft.com/en-us/azure/azure-monitor/reference/tables/officeactivity

### [P1] NIST SP 800-94 — Guide to Intrusion Detection and Prevention Systems
https://csrc.nist.gov/pubs/sp/800/94/final

### [D1] Locally calculated examples — empirical character entropy and synthetic audit counts
synthetic_calculations.json

## Boundaries and interpretation

**5.1 — Windows.** The main table is a selected Security-channel reference, not an exhaustive inventory. The System-channel 7045 comparison is explicitly separate. Effective policy, host role, event version and forwarding must be tested; a SACL controls auditing, not permissions. Group-management IDs refer to Windows security groups, not arbitrary application accounts.

**5.2 — Sysmon.** Event families describe available observation types, not guaranteed local collection. The figure does not claim complete coverage of process injection or manual mapping. Availability and fields depend on version and filtering.

**5.3 — EDR.** DeviceProcessEvents is a Microsoft-specific example. Its documentation requires ReportId to be combined with DeviceName and Timestamp when forming an event identifier; the figure does not claim ReportId alone is unique. ProcessUniqueId and InitiatingProcessUniqueId are documented process-correlation fields, not claims that all EDR products have identical schemas. Sensor completeness was not independently measured.

**5.4 — NDR.** The diagram depicts a monitored network path, with a TAP/SPAN copy for Zeek. It does not require Zeek to be inline. Visibility is limited by placement, packet loss, protocol, encryption and analyzers. Fingerprinting is not malware or actor attribution.

**5.5 — IAM.** Okta catalog names are kept literal. The observed result and associated actors must be inspected before interpreting a record as successful abuse. Entra risk detections are not all statistical anomaly detectors.

**5.6 — Cloud.** Native findings and raw exported audit records are distinct. The GenerateDbAuthToken documentation discrepancy is preserved, not resolved by assumption; no detector depending on that event was implemented here.

**5.7 — DNS.** The three labels are synthetic, four-character strings. Empirical entropy is computed exactly from character frequencies; results are 0, 1 and 2 bits per character. The labels are not incident measurements and do not establish a useful alert threshold. The finite-string bound follows because the observed support cannot exceed either string length or alphabet size.

**5.8 — SaaS.** E1, E2 and E3 are three illustrative distinct audit records for object A. This gives three events and one distinct object identifier. Transferred bytes are unknown, not zero. The example is arithmetic, not a replay of a tenant or a validated vendor-native event export.

**5.9 — Prioritization.** The matrix is a proposed planning framework based on the article and general IDPS planning considerations. It is not measured product ranking, a universal rollout sequence or a calibrated score. The pilot and ownership recommendations are design guidance.

## Reproduction checks

All nine PNGs were opened and verified; dimensions and SHA-256 hashes are recorded in manifest.json. Text layout was checked programmatically and representative pages were visually reviewed. The synthetic calculations are included as JSON. These file/rendering checks do not establish production detection accuracy.
