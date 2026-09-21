# Sections 4.1–4.12: incident infographic review and placement

Implemented and verified locally. **Not committed, pushed or deployed by this task.**

## Result

All 12 supplied PNGs from **incident_infographics_4_1_to_4_12.zip** were visually inspected, imported byte-for-byte at their native **2400 × 3000** resolution and placed in their matching incident sections. They replace the 12 former generated campaign figures; they do not add unrelated figures or change the article URL, headings or incident prose.

The earlier 20 uploads remain intact. The article still contains **47 inline figures**: **32 uploads** and **15 generated diagrams**. All 44 historical images and 56 retired SVG asset URLs remain available. The article cover, source incident register, taxonomy tags, maintained queries and calculated research results were not changed.

Each new figure has a source-linked caption, an evidence label distinguishing reported activity from proposed detection logic, a full-resolution link and an expandable HTML text equivalent. Source identifiers S01–S14 resolve through links immediately below the relevant image. The ZIP's SOURCES.md is preserved unchanged as [uploaded-incident-sources.md](../../static/research/anomaly-visuals/uploaded-incident-sources.md), including its original review limitations. It was treated as supplied reference material, not instructions or proof of independent verification.

The writer skill informed the evidence boundaries and explanatory captions. No image-generation or editing model was used; original pixels are unchanged. Captions, rather than silent image modifications, qualify the shorthand described below.

## Placement and screenshots

Each replacement occupies the existing figure slot after that incident's discussion and before the next section. Existing figure IDs and numbering remain stable.

| Section | Original PNG | Figure | Rendered screenshots |
|---|---|---|---|
| 4.1 SUNBURST | 4_1_sunburst_unc2452.png | 24: case-sunburst | [390 px](uploaded-case-sunburst-390.png) · [1440 px](uploaded-case-sunburst-1440.png) |
| 4.2 HAFNIUM / Exchange | 4_2_hafnium_exchange_proxylogon.png | 25: case-exchange | [390 px](uploaded-case-exchange-390.png) · [1440 px](uploaded-case-exchange-1440.png) |
| 4.3 Conti | 4_3_conti_bazarcall.png | 26: case-conti | [390 px](uploaded-case-conti-390.png) · [1440 px](uploaded-case-conti-1440.png) |
| 4.4 OilRig | 4_4_oilrig_rdat_dns.png | 27: case-oilrig | [390 px](uploaded-case-oilrig-390.png) · [1440 px](uploaded-case-oilrig-1440.png) |
| 4.5 MOVEit | 4_5_moveit_cl0p_lemurloot.png | 28: case-moveit | [390 px](uploaded-case-moveit-390.png) · [1440 px](uploaded-case-moveit-1440.png) |
| 4.6 Midnight Blizzard | 4_6_midnight_blizzard_cozy_bear.png | 29: case-midnight | [390 px](uploaded-case-midnight-390.png) · [1440 px](uploaded-case-midnight-1440.png) |
| 4.7 UNC3944 | 4_7_scattered_spider_unc3944.png | 30: case-unc3944 | [390 px](uploaded-case-unc3944-390.png) · [1440 px](uploaded-case-unc3944-1440.png) |
| 4.8 Storm-0558 | 4_8_storm0558_oauth_campaigns.png | 31: case-storm | [390 px](uploaded-case-storm-390.png) · [1440 px](uploaded-case-storm-1440.png) |
| 4.9 Volt Typhoon | 4_9_volt_typhoon.png | 32: case-volt | [390 px](uploaded-case-volt-390.png) · [1440 px](uploaded-case-volt-1440.png) |
| 4.10 APT41 | 4_10_apt41_messagetap_database.png | 33: case-apt41 | [390 px](uploaded-case-apt41-390.png) · [1440 px](uploaded-case-apt41-1440.png) |
| 4.11 CISA AA22-277A | 4_11_cisa_aa22_277a_impacket.png | 34: case-impacket | [390 px](uploaded-case-impacket-390.png) · [1440 px](uploaded-case-impacket-1440.png) |
| 4.12 3CX | 4_12_3cx_supply_chain.png | 35: case-3cx | [390 px](uploaded-case-3cx-390.png) · [1440 px](uploaded-case-3cx-1440.png) |

Manual rendered review on 21 September 2026 covered contact sheets 3–5, phone captures for Sections 4.4, 4.8 and 4.11, and desktop captures for Sections 4.10 and 4.12. Captions, source links and full-resolution links were legible and uncut. The originals were reviewed separately; small embedded bitmap labels still require zoom or the HTML equivalent on phones.

## Technical review and caption decisions

These are public-source summaries and locally reviewed teaching diagrams, not independently reproduced victim incidents or validated detection rules. A rendering pass does not certify the factual content of an image.

### 4.1 SUNBURST: encoded DNS is evidence, not a verdict

Source-reported SUNBURST behavior, with a separate proposed detection hypothesis. The arrows summarize a mechanism, not a replay of one victim’s timeline. No measured entropy cutoff or validation of the author’s proposed detector is implied.

No measured victim entropy range or universal DNS cutoff is established here.

[S01 · Mandiant: SUNBURST technical details](https://cloud.google.com/blog/topics/threat-intelligence/sunburst-additional-technical-details/).

### 4.2 Exchange: distinguish HAFNIUM from broader exploitation

The initial Microsoft report attributes Exchange exploitation and webshells to HAFNIUM; the separately linked post-exploitation report covers multiple actors. Do not assign every later observation to HAFNIUM. The detection panel is a proposal, not a reproduced intrusion.

Do not assign every post-exploitation observation to HAFNIUM. Standard IIS logs do not expose arbitrary request bodies.

[S02 · Microsoft: initial HAFNIUM investigation](https://www.microsoft.com/en-us/security/blog/2021/03/02/hafnium-targeting-exchange-servers/) · [Supplement · Microsoft: broader Exchange post-exploitation](https://www.microsoft.com/en-us/security/blog/2021/03/25/analyzing-attacks-taking-advantage-of-the-exchange-server-vulnerabilities/).

### 4.3 BazarCall to Conti: one documented investigation

The illustrated BazarCall, Trickbot, Cobalt Strike and Conti activity belongs to the selected investigation, not a universal affiliate playbook. Defender 5001 reports disabled real-time protection; 5007 reports configuration changes. Neither event alone proves malicious intent.

This is not every affiliate’s timeline. Administrative tools and backup changes can be legitimate.

[S03 · The DFIR Report: BazarCall to Conti](https://thedfirreport.com/2021/08/01/bazarcall-to-conti-ransomware-via-trickbot-and-cobalt-strike/) · [Supplement · Microsoft: Defender event meanings](https://learn.microsoft.com/en-us/defender-endpoint/troubleshoot-microsoft-defender-antivirus).

### 4.4 OilRig-associated RDAT: identify the actual channel

Read the HTTP, DNS and email/EWS branches as available mechanisms, not mandatory successive stages or mutually exclusive variants: Unit 42 reports that the same EWS sample also supported HTTP and DNS tunneling. The channel must be established for the actual sample and activity.

Do not collapse every variant into DNS tunneling or treat a TXT:A ratio as a verdict.

[S04 · Unit 42: RDAT channels and steganography](https://unit42.paloaltonetworks.com/oilrig-novel-c2-channel-steganography/).

### 4.5 MOVEit: follow application and database evidence

LEMURLOOT’s Health Check Service account is a MOVEit application account, not a Windows local account. Windows Security 4720 does not represent this SQL-backed operation. Access to Azure settings in the application database is not evidence of a particular configuration-file read.

Windows Security 4720 does not describe this SQL-backed application-account creation.

[S05 · Mandiant: MOVEit and LEMURLOOT](https://cloud.google.com/blog/topics/threat-intelligence/zero-day-moveit-data-theft).

### 4.6 Midnight Blizzard: preserve identity and permission context

Microsoft reported password spraying against a legacy test account without MFA, residential proxies and abuse of Exchange full_access_as_app access. This is not a generic Graph mail-scope example. Missing account history is a cold-start limitation, not evidence that activity is benign.

Do not substitute generic Graph mail scopes. Missing history is a cold start, not evidence of innocence.

[S06 · Microsoft: Midnight Blizzard responder guidance](https://www.microsoft.com/en-us/security/blog/2024/01/25/midnight-blizzard-guidance-for-responders-on-nation-state-attack/).

### 4.7 UNC3944: correlate identity changes and SaaS activity

This graphic summarizes Mandiant’s June 2024 campaign reporting, which includes 2023 observations; it is not a single dated victim timeline. Scattered Spider and UNC3944 naming does not establish identical cluster membership. Cloud-to-cloud transfers may bypass endpoint visibility while leaving identity, application or provider records.

A transfer can bypass endpoint sensors without leaving every provider or application blind.

[S07 · Mandiant: UNC3944 targets SaaS](https://cloud.google.com/blog/topics/threat-intelligence/unc3944-targets-saas-applications/).

### 4.8 Storm campaigns: keep token abuse and OAuth cases separate

Storm-0558 forged tokens using an acquired signing key; it did not forge the key. The CSRB account of Big Yellow Taxi and MailItemsAccessed is linked separately from S08/S09. Storm-1283 OAuth cryptomining is a separate campaign, not a later attack stage. No validation of the author’s proposed detector is implied.

The private rule and performance denominator are not published here. Storm-1283 OAuth cryptomining is a separate campaign.

[S08 · Microsoft: Storm-0558 email intrusion](https://www.microsoft.com/en-us/msrc/blog/2023/07/microsoft-mitigates-china-based-threat-actor-storm-0558-targeting-of-customer-email) · [S09 · Microsoft: separate OAuth campaigns](https://www.microsoft.com/en-us/security/blog/2023/12/12/threat-actors-misuse-oauth-applications-to-automate-financially-driven-attacks/) · [Supplement · CSRB: customer-side detection account](https://www.cisa.gov/sites/default/files/2024-03/CSRB%20Review%20of%20the%20Summer%202023%20MEO%20Intrusion%20Final_508c.pdf).

### 4.9 Volt Typhoon: distinguish initiation and execution hosts

IFM means Install From Media: creating domain-controller installation media, not a complete recovery backup. The execution host for the illustrated ntdsutil operation is the domain controller; remote initiation can occur elsewhere. A non-DC-only filter would miss that execution context.

A non-DC-only filter misses this execution context. A remote initiation host is not necessarily the execution host.

[S10 · Microsoft: Volt Typhoon investigation](https://www.microsoft.com/en-us/security/blog/2023/05/24/volt-typhoon-targets-us-critical-infrastructure-with-living-off-the-land-techniques/) · [Supplement · Microsoft: IFM command](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2012-r2-and-2012/cc732530(v=ws.11)).

### 4.10 APT41: two investigations, not one constructed chain

The 2019 MESSAGETAP and 2024 SQLULDR2/PINEGROVE reports describe separate investigations, not consecutive stages. MESSAGETAP’s configuration files were read and then removed; their later absence would not disprove execution. Neither libpcap loading nor cloud-storage use alone proves theft.

Loading libpcap or using cloud storage is not proof of theft. These are separate reports, not sequential stages.

[S11 · Mandiant: MESSAGETAP (2019)](https://cloud.google.com/blog/topics/threat-intelligence/messagetap-who-is-reading-your-text-messages/) · [S12 · Mandiant: APT41 database theft (2024)](https://cloud.google.com/blog/topics/threat-intelligence/apt41-arisen-from-dust).

### 4.11 CISA AA22-277A: tool use is not attribution

A source-attributed summary of AA22-277A, not a named-actor attribution or exact causal timeline. The official advisory and PDF returned access errors during this integration, so its full text was not independently re-read. The proposed analytic still requires mode-specific evidence: secretsdump does not always mean DCSync.

secretsdump is not synonymous with DCSync. Ordinary wmiexec is not a permanent WMI subscription.

[S13 · CISA / FBI / NSA: AA22-277A](https://www.cisa.gov/news-events/cybersecurity-advisories/aa22-277a).

### 4.12 3CX: a valid signature is not a benign verdict

SentinelOne reported behavioral detections from 22 March 2023, before its 29 March disclosure. In the Windows chain, GitHub-hosted icons carried encoded C2 information, not executable payloads. That initial report did not settle actor attribution; the article’s DPRK/Lazarus label is not independently established by this graphic.

The icons were not described as executable payloads. Vendor-reported detection is not an independent EDR benchmark.

[S14 · SentinelOne: 3CX investigation](https://www.sentinelone.com/blog/smoothoperator-ongoing-campaign-trojanizes-3cx-software-in-software-supply-chain-attack/).

## Source-review access boundary

The primary HTML investigations were consulted during this integration for the specific distinctions above. Supplemental Microsoft documentation was checked for Defender 5001/5007 and the broader Exchange activity. This does not constitute a complete new investigation of every claim in the original article.

Two official CISA-hosted reports could not be freshly reviewed in full. Browser retrieval failed, and direct HTTPS downloads returned **403** on 21 September 2026:

- [CSRB report, alternate official PDF path](https://www.cisa.gov/sites/default/files/2025-03/CSRBReviewOfTheSummer2023MEOIntrusion508.pdf): the Big Yellow Taxi / MailItemsAccessed account remains attributed to the already cited CSRB report. Neither the private detection query nor a performance denominator was available. A separate CSRB link was added below the figure because S08/S09 are Microsoft's reports, not the CSRB source.
- [AA22-277A official advisory PDF](https://www.cisa.gov/sites/default/files/publications/aa22-277a-impacket-and-exfiltration-tool-used-to-steal-sensitive-information-from-defense-industrial-base-organization.pdf): the figure remains a source-attributed summary, with no claim of a fresh full-advisory review or named-actor attribution.

These limits are visible in the article's caption/text equivalents, not only in this report. No source note was used to claim an access check that was not performed.

## Local verification

Overall: **PASS**. Source regression tests: **29**. The pass refers to integration, preservation, hash and rendering checks, not universal factual certification or production accuracy.

Reproduce with the repository command: npm run research:uploads:verify.

| Gate | Result | Duration | Evidence |
|---|---|---:|---|
| research-and-visuals | PASS | 1s | [log](research-and-visuals.log) |
| archive | PASS | 1s | [log](archive.log) |
| media | PASS | 0s | [log](media.log) |
| legacy-build | PASS; 122 byte-identical visual assets | 103s | [log](legacy-build.log) |
| embedded-build | PASS; 122 byte-identical visual assets | 93s | [log](embedded-build.log) |
| rendered-article | PASS | 0s | [log](rendered-article.log) |
| visual-browser | PASS | 93s | [log](visual-browser.log) |
| whitespace | PASS | 0s | [log](whitespace.log) |

- 94 variant-slot checks: 30 active SVG variants and both slots for each of the 32 original raster files. Uploads reuse the same file at every viewport; they are not separate mobile designs.
- 6 viewport/theme combinations: 390, 768 and 1440 pixels in light/dark themes. All 47 inline figures load, retain their aspect ratios and avoid horizontal page overflow.
- All 47 text-equivalent panels are expanded for two targeted accessibility rules: distinguishable prose links and keyboard-focusable scrolling regions. This is not a full accessibility audit.
- The source tests check every incident's exact section, native dimensions, evidence label, source-code mapping and retained technical caveats. Source-note and image hashes are bound to the public manifest.
- Preservation checks retain the original 153 heading anchors, 192 article routes/canonicals, 44 historical images, local fragments, incident mappings and maintained query evidence. No new query-engine experiment is claimed.
- [Structured verification](verification.json), [browser results](browser-validation.json) and the per-figure screenshots above document this local build. [Contact sheet 3](contact-sheet-3.png), [contact sheet 4](contact-sheet-4.png) and [contact sheet 5](contact-sheet-5.png) include the incident figures in reading order.

## Original-file provenance

The 12 new PNGs total **4,458,266 bytes**. All 32 uploaded images total **14,882,402 bytes**. Assets are lazy-loaded inline and retain original resolution. Small raster text does not reflow on phones; readers have full-size links and readable HTML equivalents. No whole-site speed score is claimed.

| Public file | Native dimensions | SHA-256 |
|---|---|---|
| uploaded-case-sunburst.png | 2400 × 3000 | 8435c6f7ca35925e3efa4a057d9adec6b645dd1b85f9422c98266bb933a69ef3 |
| uploaded-case-exchange.png | 2400 × 3000 | 528af59590231deb88fa48401e5d5a2c83ce8b1b4c957b597b9041c869717225 |
| uploaded-case-conti.png | 2400 × 3000 | 8436a77b1f2ab499043fb99fe33c2b82cea918cc45044d8b9edb9fe28d0d25f0 |
| uploaded-case-oilrig.png | 2400 × 3000 | ac2fa4856bbfdce432dcbe8e1d587d6255e925e28b4911f00cf7d53115c99847 |
| uploaded-case-moveit.png | 2400 × 3000 | 6d96a2646a75dc1c83284082a2c4bd7a1feb811231f3143b5a2b1240a2d091d2 |
| uploaded-case-midnight.png | 2400 × 3000 | 335f7bd169083405f72c3beac3dfab693b7b4bb1069934beb940a199c6ffce35 |
| uploaded-case-unc3944.png | 2400 × 3000 | 905cf3773f6822317f013dd8dd3f9554109c71a7e434e3e445d91f69a4982771 |
| uploaded-case-storm.png | 2400 × 3000 | 6ec4e607848f5d1c84dc183730194291d5c42dde9f2ffd03e4725afae7ad6767 |
| uploaded-case-volt.png | 2400 × 3000 | db52c65865dae382a50176c30c996be1701ccd49d7c3ad8314c43a13f4cefb25 |
| uploaded-case-apt41.png | 2400 × 3000 | 7a60edbafae1f89e30da2d4dc3c459f53035460747a2d70063ee8795e2a61382 |
| uploaded-case-impacket.png | 2400 × 3000 | fb1b683046bfffb16dbf99cda7f853296b5a39f871969175fe3acb35d6ccbcc3 |
| uploaded-case-3cx.png | 2400 × 3000 | 9d9730c9164de6c14b01b606c3501a84ceccacb8b9adb1e4c4eaef5fa7d809f4 |

Supplied source notes: **6127 bytes**, SHA-256 **e490ecddc60bd921d9925c154835657292f0d67ac0e0bf68389d778be5f5f85d**.

- anomaly_taxonomy_2_1_to_2_10.zip: cfa274cc9925a57f2b2a77a317f6b99207c6c18863cfc22054063e45d9dcc470
- anomaly_taxonomy_2_11_to_2_16.zip: a7ac222a3cb9679174f2f06176f4e63a4df977d510f1f8c1f7bb059467154f17
- incident_infographics_4_1_to_4_12.zip: 29a91eb8e0242a0817a6d3187ddd7f6f56f08b1a79df61507471e32e50b91d04


[Upload provenance](../../research/anomaly-visuals/uploads-provenance.json), [authored incident specification](../../research/anomaly-visuals/uploaded-incidents.mjs) and [public manifest](../../static/research/anomaly-visuals/manifest.json) bind original names, import hashes, source links and placements.

All earlier report directories remain historical snapshots. This task extends the pre-existing uncommitted infographic work. No commit, push, CI deployment or fresh production verification was performed.
