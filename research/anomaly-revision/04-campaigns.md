## 4. Evidence Register: Real APT Campaigns and Documented Anomaly Patterns

These investigations illustrate opportunities and limitations. **Source-reported** means the named investigator reports the activity; **inferred** means a detection hypothesis developed here. None of the following accounts represents a replay of a victim's private telemetry.

### 4.1 SUNBURST / UNC2452 (2020)

**Source-reported:** Mandiant documented a trojanized SolarWinds component, delayed activation and encoded information in DNS names. Its initial investigation also described TEARDROP reading a file with a likely fake JPEG header before loading a payload; the executable itself should not be described as a JPEG. [Initial investigation](https://cloud.google.com/blog/topics/threat-intelligence/evasive-attacker-leverages-solarwinds-supply-chain-compromises-with-sunburst-backdoor/), [technical follow-up](https://cloud.google.com/blog/topics/threat-intelligence/sunburst-additional-technical-details/).

**Inferred:** investigate DNS-label structure, destination novelty and the originating process together. Dormancy complicates short lookbacks but does not itself supply an outbound-network observation. Neither the source nor this research establishes a universal entropy cutoff, an above-baseline entropy measurement at victims, or inevitable detection by a DNS analytic. Sysmon image-load telemetry is not a guarantee of visibility into manual or reflective loading.

### 4.2 HAFNIUM / Exchange ProxyLogon (2021)

**Source-reported:** Microsoft described exploitation of Exchange vulnerabilities followed by webshell deployment. Its separate post-exploitation investigation described multiple actors and tools; observations from that broader set must not all be attributed to HAFNIUM. [HAFNIUM investigation](https://www.microsoft.com/en-us/security/blog/2021/03/02/hafnium-targeting-exchange-servers/), [post-exploitation analysis](https://www.microsoft.com/en-us/security/blog/2021/03/25/analyzing-attacks-taking-advantage-of-the-exchange-server-vulnerabilities/).

**Inferred:** correlate unusual web requests, ASPX writes, and shell execution descending from a web worker. Ordinary IIS logs do not contain arbitrary request bodies. Process fields differ between native 4688, Sysmon and EDR schemas; normalize them explicitly. Custom applications may legitimately invoke shells, so role and change context matter. Later native IIS-module campaigns are a separate evidence set; no claim about them is derived from the original HAFNIUM report here.

### 4.3 Conti Ransomware (2021–2022)

**Source-reported:** the selected BazarCall investigation describes a progression through Trickbot and Cobalt Strike to Conti. It is one intrusion account, not a composite timeline for every Conti affiliate. The earlier IcedID-proxy detail and unmatched elapsed-time claims are not retained as facts of this incident. [The DFIR Report](https://thedfirreport.com/2021/08/01/bazarcall-to-conti-ransomware-via-trickbot-and-cobalt-strike/).

**Inferred:** correlate enumeration, remote administration, share access, service creation and security-setting changes by identity and host. AdFind prevalence must be measured locally; its execution does not guarantee that every EDR alerts. Shadow-copy deletion can occur during legitimate administration. For Defender, collect its own Operational channel: event 5001 reports disabled real-time protection and 5007 a configuration change. Registry telemetry can supplement these records but does not replace them. [Defender event reference](https://learn.microsoft.com/en-us/defender-endpoint/troubleshoot-microsoft-defender-antivirus).

### 4.4 APT34 / OilRig DNS Tunneling (2018–2024)

**Source-reported:** Unit 42's RDAT investigation describes OilRig-associated tooling with several communication mechanisms and an email/steganography variant. Mechanisms differ by sample and version. The separate Talos DNSpionage investigation does not, by itself, establish an OilRig attribution. [RDAT investigation](https://unit42.paloaltonetworks.com/oilrig-novel-c2-channel-steganography/), [DNSpionage investigation](https://blog.talosintelligence.com/dnspionage-campaign-targets-middle-east/).

**Inferred:** evaluate label structure, unique-label counts, record types, timing, destinations and process context. TXT-heavy legitimate workloads exist; a TXT:A ratio above one is not intrinsically malicious. Full labels are necessary for label-entropy analysis, not for every possible endpoint, traffic-volume or DNS-behavior detector. No universal label-length, entropy or cadence threshold is validated here.

### 4.5 MOVEit / Cl0p Campaign (2023)

**Source-reported:** Mandiant described exploitation of MOVEit Transfer and LEMURLOOT, including its custom HTTP headers, database interaction and creation of a MOVEit application account named `HealthCheckService` / `Health Check Service`. It also described retrieval of Azure storage settings from the database. This is not evidence that a Windows user was created or that a particular configuration file was read. [Mandiant investigation](https://cloud.google.com/blog/topics/threat-intelligence/zero-day-moveit-data-theft).

**Inferred:** correlate webshell writes/access, application account and session changes, database activity and exports. Windows event 4720 does not represent this SQL-backed account operation. A familiar-looking name alone is not proof of a malicious account, and a normal HTTP status does not establish benign use.

### 4.6 Midnight Blizzard / Cozy Bear (2023–2024)

**Source-reported:** Microsoft described password spraying against a legacy test account without MFA, residential proxies, malicious applications and Exchange `full_access_as_app` permission abuse. Generic Microsoft Graph mail scopes must not be substituted for the incident's actual permission. [January 25 investigation](https://www.microsoft.com/en-us/security/blog/2024/01/25/midnight-blizzard-guidance-for-responders-on-nation-state-attack/).

Microsoft's March update separately reported that some activity, including password sprays, increased by as much as tenfold in February relative to January. This is not a January observation or a measurement of total attack volume. [March update](https://msrc.microsoft.com/blog/2024/03/update-on-microsoft-actions-following-attack-by-nation-state-actor-midnight-blizzard/).

**Inferred:** combine tenant/account-level failures with consent, application ownership, credentials and EWS access. Provider-wide visibility can add context that a tenant lacks; this does not establish that tenant-local analytics cannot detect distributed activity. Missing prior history is a cold-start problem, not proof of innocence.

### 4.7 Scattered Spider / UNC3944 (2023)

**Source-reported:** Mandiant's June 2024 investigation describes help-desk social engineering, identity abuse and SaaS data theft involving legitimate integration tools. Its cluster label should not be treated as identical membership across every vendor name or as proof of attribution for every publicly named victim. [UNC3944 investigation](https://cloud.google.com/blog/topics/threat-intelligence/unc3944-targets-saas-applications/).

**Inferred:** join factor changes to subsequent sessions and sensitive application actions using actual account and tenant keys. A failed MFA event is not necessarily a denied push or a fraud report. Provider-side transfers may bypass the customer's endpoint and perimeter monitoring, but visibility varies: identity, application, connector, provider and destination records may still exist. Do not claim that an extortion demand is the only possible discovery path.

### 4.8 Storm-0558 and OAuth Abuse Campaigns (2023)

**Source-reported — Storm-0558:** the actor used an acquired Microsoft account consumer signing key to forge tokens. The key was not itself forged. The CSRB documents the State Department's June 2023 discovery and alerts from its custom **Big Yellow Taxi** rule using `MailItemsAccessed`. Customer-side detection did work; failure by the provider to discover the compromise independently is a different claim. [CSRB investigation, incident narrative](https://www.cisa.gov/sites/default/files/2024-03/CSRB%20Review%20of%20the%20Summer%202023%20MEO%20Intrusion%20Final_508c.pdf).

This is an important positive example of the article's thesis: available audit data, a contextual analytic and analyst investigation contributed to discovery. However, the public account does not provide the complete production query, thresholds, negative corpus or denominator needed to reproduce its performance. This article does not reconstruct the private rule or assign it precision/recall. Historical licensing constraints must not be presented as current product requirements. [Current mailbox-audit guidance](https://learn.microsoft.com/en-us/purview/audit-log-investigate-accounts).

**Source-reported — Storm-1283:** this separate financially motivated activity involved OAuth applications and Azure compute used for cryptomining. It is not part of the Storm-0558 intrusion. [Microsoft, December 12, 2023](https://www.microsoft.com/en-us/security/blog/2023/12/12/threat-actors-misuse-oauth-applications-to-automate-financially-driven-attacks/).

**Inferred:** unexpected application-to-resource relationships can guide investigation. VM creation by a service principal is also normal automation; principal ownership, role, change history and workload purpose are essential.

### 4.9 Volt Typhoon (2023–2024)

**Source-reported:** Microsoft describes credential extraction with `ntdsutil` IFM against domain controllers, alongside living-off-the-land activity and proxy infrastructure. The execution host and any remote initiation host must be distinguished. [Microsoft, May 24, 2023](https://www.microsoft.com/en-us/security/blog/2023/05/24/volt-typhoon-targets-us-critical-infrastructure-with-living-off-the-land-techniques/).

**Inferred:** examine IFM creation **on a domain controller** by an unexpected principal or outside approved backup activity, particularly with subsequent staging and movement. A non-DC-only filter misses the relevant execution context. Process arguments are useful but not the only evidence: file, authentication, network and change records can contribute.

For log clearing, distinguish Security event **1102** from **104** in the System channel from the Eventlog provider. Record which channel was cleared; do not map `wevtutil cl System` to Security 1102. Collection gaps require independent health evidence before attributing intentional impairment. Legitimate maintenance remains a competing explanation. [Security 1102 reference](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-1102).

### 4.10 APT41 / Winnti — MESSAGETAP and Database Exfiltration {#410-apt41--winnti--messagetap-2019-and-m-trends-2025-exfiltration-2024}

**Source-reported — MESSAGETAP:** Mandiant describes a 64-bit ELF data miner on Linux SMS servers. It checks for configuration files, reads and removes them after loading, then uses libpcap to inspect traffic and save selected content. The polling phase is not a continuing configuration refresh, and the report does not describe the program as a shared library. [Mandiant, October 2019](https://cloud.google.com/blog/topics/threat-intelligence/messagetap-who-is-reading-your-text-messages/).

**Inferred:** investigate unexpected packet-capture capability, process provenance and sensitive output files. Merely loading libpcap is not proof of malicious behavior; capturing packets can be part of legitimate operations.

**Source-reported — database theft:** Mandiant's July 2024 APT41 investigation describes SQLULDR2 for Oracle data export and PINEGROVE for transfer to OneDrive. This directly supports the account; a generic M-Trends citation is insufficient. [APT41 Has Arisen From the DUST](https://cloud.google.com/blog/topics/threat-intelligence/apt41-arisen-from-dust).

**Inferred:** evaluate unexpected exports and new storage destinations against the database server's role and approved jobs. Both an export utility and cloud storage can be legitimate.

### 4.11 CISA AA22–277A — Impacket Lateral Movement in Defense Industrial Base Compromise (2022)

The advisory reports Impacket and data theft without assigning a named actor. Tool names do not identify an execution mode: `secretsdump.py` is not synonymous with DCSync, and ordinary `wmiexec.py` execution is not a permanent WMI event subscription. [CISA AA22–277A](https://www.cisa.gov/news-events/cybersecurity-advisories/aa22-277a).

**Inferred:** correlate remote logons and WMI-related process ancestry; examine replication-specific evidence where DCSync is suspected. WMI Operational 5861 concerns permanent subscription activity, not every remote WMI execution. TCP/135 followed by dynamic RPC ports is not sufficient to identify DRSUAPI. Event 4662 also needs configured auditing and source enrichment, discussed below.

### 4.12 Lazarus Group / DPRK — 3CX Supply Chain (2023)

**Source-reported:** SentinelOne reported behavioral detections starting March 22, before public disclosure of the compromised 3CX application. In the Windows chain, GitHub-hosted icon files carried encoded C2 information; they should not be described as executable content downloaded from GitHub. [SentinelOne investigation](https://www.sentinelone.com/blog/smoothoperator-ongoing-campaign-trojanizes-3cx-software-in-software-supply-chain-attack/).

**Inferred:** investigate unusual destinations and subsequent execution associated with a normally trusted application. A valid signature is not a benign verdict. Vendor-reported detection is evidence of those observations, not an independent comparison of all EDR products or proof that a proposed destination-rarity rule would perform equally well.
