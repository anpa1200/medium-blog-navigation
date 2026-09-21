# Evidence-register infographics: sections 4.1–4.12

12 separate original PNGs, each 2400 × 3000 pixels. These are native full-resolution renders, not enlarged preview images.

## Scope

The images summarize the linked article and cited public investigations. Source-reported activity and proposed detection hypotheses are explicitly distinguished. The diagrams are not private victim-telemetry replays, performance benchmarks, or independent attribution findings. Case titles follow the article; names used by different vendors are not automatically exact membership equivalents.

Article: https://1200km.com/articles/read/2026/2026-04-20-malicious-activity-as-a-statistical-signal-a-detection-engineering-analysis-of-anomaly-bas-90df8b6dea12/
Reviewed article revision: 21 September 2026.

## Per-image references

### 4.1 — SUNBURST / UNC2452 / ENCODED DNS ACTIVITY
Sources: S01. Detection hypotheses and limitations are adapted from article section 4.1.

### 4.2 — HAFNIUM / EXCHANGE / PROXYLOGON
Sources: S02. Detection hypotheses and limitations are adapted from article section 4.2.

### 4.3 — CONTI RANSOMWARE / BAZARCALL CASE
Sources: S03. Detection hypotheses and limitations are adapted from article section 4.3.

### 4.4 — OILRIG / APT34 / RDAT COMMUNICATION
Sources: S04. Detection hypotheses and limitations are adapted from article section 4.4.

### 4.5 — MOVEit / Cl0p / LEMURLOOT
Sources: S05. Detection hypotheses and limitations are adapted from article section 4.5.

### 4.6 — MIDNIGHT BLIZZARD / IDENTITY TO MAIL
Sources: S06. Detection hypotheses and limitations are adapted from article section 4.6.

### 4.7 — SCATTERED SPIDER / UNC3944 / SaaS
Sources: S07. Detection hypotheses and limitations are adapted from article section 4.7.

### 4.8 — STORM-0558 / TOKEN ABUSE & DETECTION
Sources: S08, S09. Detection hypotheses and limitations are adapted from article section 4.8.

### 4.9 — VOLT TYPHOON / THE EXECUTION HOST
Sources: S10. Detection hypotheses and limitations are adapted from article section 4.9.

### 4.10 — APT41 / WINNTI / TWO INVESTIGATIONS
Sources: S11, S12. Detection hypotheses and limitations are adapted from article section 4.10.

### 4.11 — CISA AA22-277A / IMPACKET & DATA THEFT
Sources: S13. Detection hypotheses and limitations are adapted from article section 4.11.

### 4.12 — 3CX SUPPLY CHAIN / A SIGNATURE IS NOT TRUST
Sources: S14. Detection hypotheses and limitations are adapted from article section 4.12.

## Source register

### [S01] Mandiant
SUNBURST Additional Technical Details (2020-12-24).
https://cloud.google.com/blog/topics/threat-intelligence/sunburst-additional-technical-details/

### [S02] Microsoft
HAFNIUM targeting Exchange Servers with 0-day exploits (2021-03-02).
https://www.microsoft.com/en-us/security/blog/2021/03/02/hafnium-targeting-exchange-servers/

### [S03] The DFIR Report
BazarCall to Conti Ransomware via Trickbot and Cobalt Strike (2021-08-01).
https://thedfirreport.com/2021/08/01/bazarcall-to-conti-ransomware-via-trickbot-and-cobalt-strike/

### [S04] Palo Alto Networks Unit 42
OilRig Targets Middle Eastern Telecommunications Organization and Adds Novel C2 Channel with Steganography to Its Inventory (2020).
https://unit42.paloaltonetworks.com/oilrig-novel-c2-channel-steganography/

### [S05] Mandiant
Zero-Day Vulnerability in MOVEit Transfer Exploited for Data Theft (2023-06-02).
https://cloud.google.com/blog/topics/threat-intelligence/zero-day-moveit-data-theft

### [S06] Microsoft
Midnight Blizzard: Guidance for responders on nation-state attack (2024-01-25).
https://www.microsoft.com/en-us/security/blog/2024/01/25/midnight-blizzard-guidance-for-responders-on-nation-state-attack/

### [S07] Mandiant
UNC3944 Targets SaaS Applications (2024-06-13).
https://cloud.google.com/blog/topics/threat-intelligence/unc3944-targets-saas-applications/

### [S08] Microsoft
Microsoft mitigates China-based threat actor Storm-0558 targeting of customer email (2023-07-11).
https://www.microsoft.com/en-us/msrc/blog/2023/07/microsoft-mitigates-china-based-threat-actor-storm-0558-targeting-of-customer-email

### [S09] Microsoft
Threat actors misuse OAuth applications to automate financially driven attacks (2023-12-12).
https://www.microsoft.com/en-us/security/blog/2023/12/12/threat-actors-misuse-oauth-applications-to-automate-financially-driven-attacks/

### [S10] Microsoft
Volt Typhoon targets US critical infrastructure with living-off-the-land techniques (2023-05-24).
https://www.microsoft.com/en-us/security/blog/2023/05/24/volt-typhoon-targets-us-critical-infrastructure-with-living-off-the-land-techniques/

### [S11] Mandiant
MESSAGETAP: Who's Reading Your Text Messages? (2019-10-31).
https://cloud.google.com/blog/topics/threat-intelligence/messagetap-who-is-reading-your-text-messages/

### [S12] Mandiant
APT41 Has Arisen From the DUST (2024-07-18).
https://cloud.google.com/blog/topics/threat-intelligence/apt41-arisen-from-dust

### [S13] CISA / FBI / NSA
AA22-277A: Impacket and Exfiltration Tool Used to Steal Sensitive Information from Defense Industrial Base Organization (2022).
https://www.cisa.gov/news-events/cybersecurity-advisories/aa22-277a

### [S14] SentinelOne
3CX SmoothOperator | 3CXDesktopApp in Supply Chain Attack (2023-03-29).
https://www.sentinelone.com/blog/smoothoperator-ongoing-campaign-trojanizes-3cx-software-in-software-supply-chain-attack/

## Verification boundaries

The CISA AA22-277A landing page was located, but its full text was not returned during this session. Section 4.11 is therefore a source-attributed summary based on the provided article, supported by the indexed advisory and Splunk’s directly authored detection story; it is not described as an independent full advisory review.
The CSRB account of Big Yellow Taxi / MailItemsAccessed in section 4.8 is sourced through the article. The CSRB PDF was not independently re-read during this image preparation. Microsoft’s original Storm-0558 and separate Storm-1283 reporting was read.

Technical implementation boundaries are teaching notes, not claims of measured detection performance.
