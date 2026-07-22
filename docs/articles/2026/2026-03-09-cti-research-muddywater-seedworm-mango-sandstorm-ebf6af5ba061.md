---
title: "CTI Research: MuddyWater/Seedworm (Mango Sandstorm)"
description: "Evidence-Labeled Threat Intelligence Assessment and SOC Defensive Guidance (2017 \u2014 March 2026)"
image: "https://cdn-images-1.medium.com/max/800/1*JX0SIm-8jz5EP_OXL6soMQ.png"
---

# CTI Research: MuddyWater/Seedworm (Mango Sandstorm)


<img src="https://cdn-images-1.medium.com/max/800/1*JX0SIm-8jz5EP_OXL6soMQ.png" alt="Cover image" width="2752" height="1536" loading="eager" fetchpriority="high" decoding="async" />

:::info Article Metadata
- **Category:** CTI
- **Source article:** [https://medium.com/@1200km/cti-research-muddywater-seedworm-mango-sandstorm-ebf6af5ba061](https://medium.com/@1200km/cti-research-muddywater-seedworm-mango-sandstorm-ebf6af5ba061)
- **Published:** 2026-03-09
- **Preserved media:** 10 image(s), including cover images, screenshots, diagrams, and infographics where present.
- **Preserved technical blocks:** 0 code/configuration block(s).
:::

## Ecosystem Fit

This page mirrors the original Medium article into the 1200km.com Docusaurus ecosystem. The original article flow, images, screenshots, infographics, and technical blocks are preserved from the export.

### Evidence-Labeled Threat Intelligence Assessment and SOC Defensive Guidance (2017 — March 2026)

<img src="https://cdn-images-1.medium.com/max/800/1*JX0SIm-8jz5EP_OXL6soMQ.png" alt="Article image" width="2752" height="1536" loading="lazy" decoding="async" />

**PDF here:**

[**CTI/muddywater-seedworm at main · anpa1200/CTI**
*Open-source cyber threat intelligence reports: evidence-labeled assessments, SOC-oriented guidance, and defensive…*github.com](https://github.com/anpa1200/CTI/tree/main/muddywater-seedworm)[](https://github.com/anpa1200/CTI/tree/main/muddywater-seedworm)

## Table of Contents

- **Report Metadata**

- **Methodology & Evidence Labels**

- **Confidence & What Changes Confidence**

- **Executive Summary**

- **Actor: Identifiers and Aliases**

- **Key Judgments with Confidence Levels**

- **Attribution: Pillar-by-Pillar Analysis**

- **Operations Timeline 2017–2026**

- **Confirmed vs Unconfirmed Facts Matrix**

- **Critical Errors in the Public Corpus**

- **Malware and Tooling Portfolio**

- **Deep Technical Analysis of Key Families**

- **Targeting and Victimology**

- **Evolution of Operational Doctrine**

- **Initial Access and Privilege Escalation**

- **Detection Engineering: SOC-Ready Rules**

- **Mini Playbook: First 30 Minutes**

- **Practical Defensive Actions: 30 Days**

- **Intelligence Gaps**

- **Appendix A: IOC Compendium**

- **Appendix B: MITRE ATT&CK Mapping**

- **References**

## Report Metadata

- **Document classification:**Public-release CTI product. All sources are open and publicly available.

- **Author:**Andrey Pautov

- **Date:**March 7, 2026

- **Assessment window:**2017 — March 2026

- **Evidence cutoff (collection freeze):**March 7, 2026 (UTC)

- **Analytic intent:**Convert public-source reporting into evidence-labeled, SOC-actionable CTI for defenders.

- **Scope note:**Selected late-2025 to early-2026 campaign details remain single-source primary reporting and are treated as hunting hypotheses unless independently replicated.

## Methodology & Evidence Labels

This document uses six evidence labels applied consistently to factual and analytical claims.

- **Observed:**direct technical artifacts in primary reporting, such as samples, reverse engineering, and telemetry.

- **Reported:**documented by authoritative sources where full victim-side telemetry is not fully public.

- **Observed/Reported:**combined label used when part of the detail is directly observed and part is documented through high-quality vendor reporting.

- **Assessed:**analytical conclusion synthesized from multiple Observed and Reported items; not standalone proof.

- **Partially Corroborated:**at least one technical artifact is available, but the full kill chain is not publicly confirmed.

- **Claimed:**assertions without independent technical validation.

Additional notation used throughout:

- **[single-source primary reporting]:**evidentiary caveat for findings currently supported by one primary technical source.

- **[CORRECTION] marker:**indicates errors identified in prior CTI materials, including earlier report versions.

&gt; Analytic rule: vendor naming overlap indicates cluster convergence, not guaranteed incident-level identity.

## Confidence & What Changes Confidence

- **High confidence:**multi-source convergence across government and independent technical reporting.

- **Medium-High confidence:**strong convergence with minor incident-level gaps.

- **Medium confidence:**technically plausible but still limited by source breadth or replication depth.

- **Low confidence:**claim-led narratives without sufficient technical corroboration.

**What increases confidence:**

- Independent victim-side telemetry publication.

- Malware samples with reproducible reverse engineering.

- Time-overlapping infrastructure reuse across campaigns.

- Cross-vendor replication of the same technical findings.

- Convergent legal or government attribution statements.

**What decreases confidence:**

- Single-source findings without independent replication.

- Circular citation chains.

- Attribution claims not anchored to technical evidence.

- Incident narratives with incomplete forensic artifacts.

## Executive Summary

&gt; Scope note for this summary. Some 2025–2026 events mentioned below rely on a single primary technical source. Where this is the case, it is explicitly indicated in the relevant sections. All items presented below as facts are supported by primary reporting; analytical conclusions are marked as [Assessed] .

MuddyWater (MITRE ATT&CK G0069) is one of the most active cyber-espionage clusters publicly attributed to Iran’s Ministry of Intelligence and Security (MOIS) in joint US/UK advisories.[R1](https://www.cybercom.mil/Media/News/Article/2897570/iranian-intel-cyber-suite-of-malware-uses-open-source-tools/)[R4](https://www.ncsc.gov.uk/pdfs/news/joint-advisory-observes-muddywater-actors-conducting-cyber-espionage.pdf)The group has been documented since November 2017, with operations continuing through March 2026.

**Three documented evolutionary phases:**

**Phase I (2017–2022).**Script-centric operations based on PowerShell/VBS. Core toolset: POWERSTATS, PowGoop, Small Sieve, Canopy/Starwhale, Mori.[R1](https://www.ncsc.gov.uk/files/NCSC-Malware-Analysis-Report-Small-Sieve.pdf)[R4](https://unit42.paloaltonetworks.com/unit42-muddywater-operations-in-lebanon-and-oman/)

**Phase II (2023–2024).**[Assessed] A doctrinal shift toward abuse of legitimate RMM tools, documented by multiple independent teams.[R10](https://harfanglab.io/insidethelab/muddywater-rmm-campaign/)[R12](https://www.cisa.gov/news-events/cybersecurity-advisories/aa24-241a)In parallel, the first custom backdoor of the new era emerged: BugSleep/MuddyRot, independently documented by Check Point Research and Sekoia TDR in July 2024.[R14](https://blog.sekoia.io/muddywater-replaces-atera-by-custom-muddyrot-implant-in-a-recent-campaign/)

**Phase III (2024–2026, through March 2026).**Rapid custom malware iteration while retaining RMM components in selected campaigns. Rust became a preferred language; Telegram bots were used for C2; documented modern components and campaigns include PYTRIC, Operation Quicksand, MuddyViper/Fooder, StealthCache, Phoenix v4, and RustyWater.[R13](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/)[R17](https://www.group-ib.com/blog/muddywater-espionage/)[R19](https://www.seqrite.com/blog/ung0801-tracking-threat-clusters-obsessed-with-av-icon-spoofing-targeting-israel/)Operation Olalampo is the most recent documented campaign at the time of writing**[single-source primary reporting: Group-IB]**.[R21](https://www.group-ib.com/blog/muddywater-operation-olalampo/)

**Most significant 2025 finding.**Amazon Threat Intelligence (CYBERWARCON, November 2025) documented a correlation between MuddyWater infrastructure and access to a Jerusalem CCTV server days before Iran’s June 2025 missile strike on the city. Amazon uses the term**“cyber-enabled kinetic targeting.”**The correlation is documented; asserting proven real-time operational coordination is a stronger claim than what the published data directly supports.[R22](https://aws.amazon.com/blogs/security/new-amazon-threat-intelligence-findings-nation-state-actors-bridging-cyber-and-kinetic-warfare/)

**[Assessed] Key defender takeaway.**MuddyWater changes its primary intrusion toolset approximately every 6–12 months. Signature/IOC-only detection with long update cycles will consistently lag behind. Behavioral analytics, strict RMM governance, and identity hardening are the most durable defensive investments.

<img src="https://cdn-images-1.medium.com/max/800/1*OH89bfRcs3a7DKCe6wGtbg.png" alt="Article image" width="1536" height="1024" loading="lazy" decoding="async" />

## Actor: Identifiers and Aliases

### Official Identification

**MITRE ATT&CK:**G0069 — MuddyWater. Defined as a “subordinate element within Iran’s Ministry of Intelligence and Security (MOIS).” Active since at least 2017.[R6](https://attack.mitre.org/groups/G0069/)

### Alias Mapping — Primary Vendor Sources Only

- **MuddyWater**
Vendor source: Unit 42 / Palo Alto Networks.
Primary report/profile: Unit 42, November 2017[R5](https://unit42.paloaltonetworks.com/unit42-muddywater-operations-in-lebanon-and-oman/).
Notes: Original public naming.

- **Seedworm**
Vendor source: Cross-vendor historical alias (commonly associated with Symantec usage).
Primary report/profile: MITRE ATT&CK G0069 alias mapping[R6](https://attack.mitre.org/groups/G0069/).
Notes: Widely used equivalent identifier; direct Symantec primary profile is outside the current reference set.

- **TEMP.Zagros**
Vendor source: Mandiant / FireEye (historical).
Primary report/profile: Cross-vendor historical alias mapping in ATT&CK profile[R6](https://attack.mitre.org/groups/G0069/).
Notes: Legacy alias; direct original Mandiant publication is not included in this reference set.

- **Static Kitten**
Vendor source: CrowdStrike.
Primary report/profile: Direct primary CrowdStrike profile is not publicly available. Alias is reproduced in cross-vendor mappings, including Unit 42 Boggy Serpens profile[R23](https://unit42.paloaltonetworks.com/threat-actor-groups-tracked-by-palo-alto-networks-unit-42/)and MITRE ATT&CK G0069[R6](https://attack.mitre.org/groups/G0069/).
Notes:**[cross-vendor mapped alias]**Lower source quality than entries with direct vendor primary reports; use with caution.

- **MERCURY**
Vendor source: Microsoft (historical taxonomy).
Primary report/profile: Microsoft naming taxonomy history[R7](https://learn.microsoft.com/en-us/unified-secops/microsoft-threat-actor-naming).
Notes: Legacy Microsoft designation replaced by Mango Sandstorm.

- **Mango Sandstorm**
Vendor source: Microsoft.
Primary report/profile: Current Microsoft profile[R6](https://learn.microsoft.com/en-us/unified-secops/microsoft-threat-actor-naming).
Notes: Current Microsoft taxonomy standard.

- **Earth Vetala**
Vendor source: Trend Micro.
Primary report/profile: Trend Micro Research, March 5, 2021: “Earth Vetala — MuddyWater Continues to Target Organizations in the Middle East”[R24](https://www.trendmicro.com/en_us/research/21/c/earth-vetala---muddywater-continues-to-target-organizations-in-t.html).
Notes: Trend Micro attributes with moderate confidence: “we believe…this newly identified activity is connected to MuddyWater.”

- **Boggy Serpens**
Vendor source: Unit 42 / Palo Alto Networks.
Primary report/profile: Unit 42 Threat Actor Groups page; Timely Threat Intel GitHub 2024[R23](https://unit42.paloaltonetworks.com/threat-actor-groups-tracked-by-palo-alto-networks-unit-42/).
Notes: “Boggy Serpens is the name we use to track a state-sponsored Iranian threat actor also known as MuddyWater or TA450.”

- **COBALT ULSTER**
Vendor source: Secureworks CTU.
Primary report/profile: Secureworks Threat Profile: COBALT ULSTER[R25](https://www.secureworks.com/research/threat-profiles/cobalt-ulster).
Notes: “Since at least 2017, COBALT ULSTER has targeted various government, telecommunications, oil and gas, and education organizations…”

- **TA450**
Vendor source: Proofpoint.
Primary report/profile: Proofpoint campaign tracking, 2024[R10](https://www.proofpoint.com/uk/blog/threat-insight/security-brief-ta450-uses-embedded-links-pdf-attachments-latest-campaign).
Notes: Campaign-level tracking, not an actor-level alias.

- **MUDDYCOAST**
Vendor source: Group-IB.
Primary report/profile: Group-IB infrastructure report, 2025[R13](https://www.group-ib.com/blog/muddywater-infrastructure-malware/).
Notes: Used in current Group-IB reporting.

<img src="https://cdn-images-1.medium.com/max/800/1*bn5T-51WB9etiRdnM4t3ag.png" alt="Article image" width="1536" height="1024" loading="lazy" decoding="async" />

## Key Judgments with Confidence Levels

**Judgment 1.**Cluster-level attribution to MOIS is robust. Multilateral US/UK government attribution combined with independent technical convergence from 10+ vendors supports high confidence at the cluster level.**Confidence: High.**[R1](https://www.cybercom.mil/Media/News/Article/2897570/iranian-intel-cyber-suite-of-malware-uses-open-source-tools/)[R4](https://attack.mitre.org/groups/G0069/)

**Judgment 2.**The three-phase doctrinal evolution is chronologically substantiated. The transition from scripts to RMM abuse to custom implants is a documented sequence.**Confidence: High.**[R1](https://www.proofpoint.com/uk/blog/threat-insight/security-brief-ta450-uses-embedded-links-pdf-attachments-latest-campaign)[R11](https://research.checkpoint.com/2024/new-bugsleep-backdoor-deployed-in-recent-muddywater-campaigns/)[R15](https://www.group-ib.com/blog/muddywater-operation-olalampo/)

**Judgment 3.**[Assessed] RMM abuse represents a doctrinal shift, not a one-off tactic. Basis: independently documented by Proofpoint, HarfangLab, Group-IB, and ESET across different campaigns with shared logic. Caveat: “doctrinal” is an analytical synthesis, not a directly verifiable internal organizational fact.**Confidence: High for the tactic; Medium for the “doctrinal” characterization.**[R10](https://harfanglab.io/insidethelab/muddywater-rmm-campaign/)[R13](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/)

**Judgment 4.**BugSleep/MuddyRot is validated by two independent teams (Check Point Research and Sekoia TDR) that reverse engineered the same implant separately.**Confidence: High.**[R14](https://blog.sekoia.io/muddywater-replaces-atera-by-custom-muddyrot-implant-in-a-recent-campaign/)

**Judgment 5.**MuddyViper/Fooder (ESET, December 2025) is validated with detailed technical analysis. Campaign timeframe: September 30, 2024 to March 18, 2025.**Confidence: High.**[R16](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/)

**Judgment 6.**[Assessed] MuddyWater likely operated as an Initial Access Broker for Lyceum (an OilRig/APT34 subgroup) in January–February 2025. ESET explicitly frames this as “likely.”**Confidence: Medium-High.**[R16](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/)

**Judgment 7.**Amazon Threat Intelligence documented correlation between MuddyWater infrastructure and CCTV access in Jerusalem days before Iran’s June 23, 2025 missile strike. Correlation is documented in a primary source; proven real-time operational coordination is a stronger claim and should be handled cautiously.**Confidence for correlation: High. Confidence for causality: Medium.**[R22](https://aws.amazon.com/blogs/security/new-amazon-threat-intelligence-findings-nation-state-actors-bridging-cyber-and-kinetic-warfare/)

**Judgment 8.**Operation Olalampo (Group-IB, February 2026) is a detailed primary report with Telegram telemetry and technical analysis.**[single-source primary reporting at time of writing]**Independent replication remains limited.**Confidence: Medium-High.**[R21](https://www.group-ib.com/blog/muddywater-operation-olalampo/)

**Judgment 9.**RustyWater/Archer RAT/RUSTRIC is independently documented by CloudSEK (January 2026)[R19](https://www.cloudsek.com/blog/reborn-in-rust-muddywater-evolves-tooling-with-rustywater-implant)and Seqrite Labs (December 2025, as RUSTRIC under UNG0801)[R20](https://www.seqrite.com/blog/ung0801-tracking-threat-clusters-obsessed-with-av-icon-spoofing-targeting-israel/). Group-IB further linked CHAR to the same development environment via the`Jacob`variable.**Confidence: Medium-High.**[R19](https://www.seqrite.com/blog/ung0801-tracking-threat-clusters-obsessed-with-av-icon-spoofing-targeting-israel/)[R21](https://www.group-ib.com/blog/muddywater-operation-olalampo/)

**Judgment 10.**PYTRIC (Seqrite Labs, UNG0801) is a destructive PyInstaller implant. Seqrite attributes it to a “West Asia threat cluster” without directly naming MuddyWater.**[single-source primary reporting]**Direct attribution of PYTRIC to MuddyWater requires additional validation.**Confidence for PYTRIC destructive functionality: High. Confidence for MuddyWater attribution: Low-Medium.**[R20](https://www.seqrite.com/blog/ung0801-tracking-threat-clusters-obsessed-with-av-icon-spoofing-targeting-israel/)

## Attribution: Pillar-by-Pillar Analysis

### Pillar 1: Joint US/UK Government Attribution

[Observed/Reported] In the joint advisory AA22–055A (February 24, 2022), CISA, FBI, NSA, USCYBERCOM, and NCSC-UK publicly attributed MuddyWater as a “subordinate element within the Iranian Ministry of Intelligence and Security (MOIS).”[R1](https://www.cybercom.mil/Media/News/Article/2897570/iranian-intel-cyber-suite-of-malware-uses-open-source-tools/)[R4](https://www.ncsc.gov.uk/pdfs/news/joint-advisory-observes-muddywater-actors-conducting-cyber-espionage.pdf)This reflects multiple US and UK government agencies, but not all Five Eyes partners.

**Chronological nuance.**CISA dates the active MuddyWater-MOIS linkage to “since approximately 2018.”[R1](https://www.cisa.gov/news-events/cybersecurity-advisories/aa22-055a)Unit 42 first documented the cluster publicly in November 2017.[R5](https://unit42.paloaltonetworks.com/unit42-muddywater-operations-in-lebanon-and-oman/)This is not contradictory: 2017 reflects first publicly observed operations; 2018 reflects formal government dating of MOIS linkage.

### Pillar 2: Technical Continuity

[Observed/Reported] Tooling fingerprints are traceable across all three phases. Key markers include:

- Mutex patterns “DocumentUpdater” and “PackageManager” independently documented by Check Point Research and Sekoia TDR for BugSleep/MuddyRot.[R14](https://blog.sekoia.io/muddywater-replaces-atera-by-custom-muddyrot-implant-in-a-recent-campaign/)

- String obfuscation by subtracting a fixed value (3, 4, 5, or 6), recurring across multiple tool generations.[R14](https://blog.sekoia.io/muddywater-replaces-atera-by-custom-muddyrot-implant-in-a-recent-campaign/)

- Developer variable`Jacob`in Rust library paths: CHAR (Group-IB) and BlackBeard/RUSTRIC (CloudSEK) share development-environment artifacts.[R21](https://www.cloudsek.com/blog/reborn-in-rust-muddywater-evolves-tooling-with-rustywater-implant)

- CNG API usage for encryption, which ESET describes as “unique to Iran-aligned groups.”[R16](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/)

- Macro logic (4-level nested loops, WriteHexToFile, UserForm1.TextBox1.Text parsing) in Olalampo matching historical campaign patterns.[R21](https://www.group-ib.com/blog/muddywater-operation-olalampo/)

### Pillar 3: Cross-Vendor Convergence

[Reported] More than 10 independent technical teams attribute overlapping campaigns to a single cluster: Unit 42, Cisco Talos, Proofpoint, HarfangLab, Check Point Research, Sekoia TDR, Group-IB, ESET, CloudSEK, Seqrite Labs, Amazon Threat Intelligence, Microsoft.[R1](https://unit42.paloaltonetworks.com/unit42-muddywater-operations-in-lebanon-and-oman/)[R10](https://harfanglab.io/insidethelab/muddywater-rmm-campaign/)[R14](https://blog.sekoia.io/muddywater-replaces-atera-by-custom-muddyrot-implant-in-a-recent-campaign/)[R16](https://www.cloudsek.com/blog/reborn-in-rust-muddywater-evolves-tooling-with-rustywater-implant)[R20](https://www.group-ib.com/blog/muddywater-operation-olalampo/)[R22](https://aws.amazon.com/blogs/security/new-amazon-threat-intelligence-findings-nation-state-actors-bridging-cyber-and-kinetic-warfare/)

**Incident-Level Caveat
A subset of late 2025 to early 2026 campaign details remains [single-source primary reporting]. Use these as hunting hypotheses, not as standalone attribution support for legal or policy documents.**

## Operations Timeline 2017–2026

### 2017–2018: Public Emergence

[Reported] Unit 42 (Palo Alto Networks) documented the cluster in November 2017: attacks against Middle East organizations from February to October 2017 using POWERSTATS.[R5](https://unit42.paloaltonetworks.com/unit42-muddywater-operations-in-lebanon-and-oman/)

[Reported] Early target scope included government organizations in Saudi Arabia, Iraq, Israel, Pakistan, Afghanistan, the UAE, Austria, and other countries.[R5](https://www.cisa.gov/news-events/cybersecurity-advisories/aa22-055a)

### 2019–2020: Expansion and First Public CVE Exploitation

[Observed/Reported] Use of CVE-2020–1472 (Zerologon) and CVE-2020–0688 (Microsoft Exchange RCE) is documented in AA22–055A.[R1](https://www.cisa.gov/news-events/cybersecurity-advisories/aa22-055a)

[Reported] Secureworks CTU documented COBALT ULSTER campaign activity (January 2020) targeting government entities in Turkey, Jordan, and Iraq.[R25](https://www.secureworks.com/research/threat-profiles/cobalt-ulster)

[Reported] 360 Threat Intelligence Center reported MuddyWater RMM usage as early as 2020.[R13](https://www.group-ib.com/blog/muddywater-infrastructure-malware/)

### 2021: Earth Vetala and Campaign Continuity

[Reported] Trend Micro (March 5, 2021) documented Earth Vetala activity targeting organizations in the UAE, Saudi Arabia, Israel, and Azerbaijan using ScreenConnect and RemoteUtilities. Attribution to MuddyWater is framed at “moderate confidence.”[R24](https://www.trendmicro.com/en_us/research/21/c/earth-vetala---muddywater-continues-to-target-organizations-in-t.html)

### 2021–2022: Consolidation in Government Advisories

[Observed/Reported] CNMF (January 12, 2022) published MuddyWater malware samples to VirusTotal, an uncommon level of public disclosure.[R2](https://www.ncsc.gov.uk/files/NCSC-Malware-Analysis-Report-Small-Sieve.pdf)

[Observed/Reported] AA22–055A (February 24, 2022) delivered formal interagency public attribution to MOIS and detailed TTP documentation for PowGoop, Small Sieve, Canopy/Starwhale, Mori, and POWERSTATS.[R1](https://www.cisa.gov/news-events/cybersecurity-advisories/aa22-055a)

[Reported]**Operation Quicksand.**MuddyWater used a Thanos ransomware variant delivered via PowGoop in destructive attacks against Israeli organizations.[R16](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/)This documents destructive capability beyond a purely espionage profile.

### 2023–2024: Peak RMM Campaigns and BugSleep

[Observed/Reported] HarfangLab (April 2024) documented SimpleHelp and Atera campaigns where compromised corporate email accounts distributed links to RMM agents through file-sharing services (Egnyte, OneHub, Mega).[R11](https://harfanglab.io/insidethelab/muddywater-rmm-campaign/)

[Observed/Reported] Proofpoint (TA450, March 2024) documented PDF attachments containing embedded links leading to RMM agent delivery.[R10](https://www.proofpoint.com/uk/blog/threat-insight/security-brief-ta450-uses-embedded-links-pdf-attachments-latest-campaign)

[Observed/Reported] Check Point Research (July 15, 2024) published the first detailed BugSleep analysis: custom C/C++ backdoor deployed since May 2024. From February to July 2024, more than 50 phishing emails were observed across 10+ sectors with hundreds of recipients.[R14](https://research.checkpoint.com/2024/new-bugsleep-backdoor-deployed-in-recent-muddywater-campaigns/)

[Observed/Reported] Sekoia TDR (July 2024) independently documented the same implant under the name MuddyRot, with matching characteristics: mutex “DocumentUpdater,” TCP port 443, and identical string obfuscation logic.[R15](https://blog.sekoia.io/muddywater-replaces-atera-by-custom-muddyrot-implant-in-a-recent-campaign/)

**Discovery attribution note.**Some sources indicate ClearSky (Israel) published IOCs for the new MuddyWater campaign on June 9, 2024, before full technical analyses. Check Point Research[R14](https://research.checkpoint.com/2024/new-bugsleep-backdoor-deployed-in-recent-muddywater-campaigns/)and Sekoia TDR[R15](https://blog.sekoia.io/muddywater-replaces-atera-by-custom-muddyrot-implant-in-a-recent-campaign/)independently delivered full reverse engineering in July 2024. These are distinct forms of contribution. A direct primary ClearSky report link from June 9 is not included in the reviewed corpus; that date appears in secondary reporting.

### 2024–2025: MuddyViper/Fooder and Cooperation with Lyceum

[Observed/Reported] ESET Research (December 2, 2025) documented campaigns against Israeli critical infrastructure organizations (technology, engineering, manufacturing, local government, education) and a technology company in Egypt. Campaign timeframe: September 30, 2024 to March 18, 2025.[R16](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/)

[Reported] In January–February 2025, MuddyWater likely acted as an Initial Access Broker in an Israeli manufacturing organization: deploying Syncro RMM, then PDQ and a custom Mimikatz loader. Stolen credentials were likely used by Lyceum (OilRig subgroup; also tracked as HEXANE / Storm-0133) for deeper penetration. ESET explicitly uses “likely.”[R16](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/)

[Observed/Reported] ESET reported that operators deliberately avoided interactive keyboard sessions, suggesting improved operational discipline.[R16](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/)

### 2025 (May–June): Correlation with Kinetic Strike

[Reported] Amazon Threat Intelligence (CYBERWARCON, November 19, 2025):[R22](https://aws.amazon.com/blogs/security/new-amazon-threat-intelligence-findings-nation-state-actors-bridging-cyber-and-kinetic-warfare/)

- May 13, 2025: MuddyWater prepared C2 server IP 18[.]219.14.54.

- June 17, 2025: via this server, operators accessed another compromised server with live CCTV feeds from Jerusalem.

- June 23, 2025: Iran launched missile strikes on Jerusalem; Israeli officials publicly stated that hacked cameras were used for “real-time intelligence gathering.”

Amazon uses the term**“cyber-enabled kinetic targeting”**and describes this as a “fundamental shift in the nature of nation-state cyber attacks.”[R22](https://aws.amazon.com/blogs/security/new-amazon-threat-intelligence-findings-nation-state-actors-bridging-cyber-and-kinetic-warfare/)

Documented elements include timestamp correlation, C2 infrastructure, and public statements by Israeli officials. Real-time operational coordination between MuddyWater and missile units is a stronger claim and is not directly proven by the published Amazon data.

**[CORRECTION to previous versions of this report and the source draft]**The CCTV narrative was previously marked as “Not corroborated.” That is incorrect: it is documented in a primary Amazon Threat Intelligence publication with specific dates and IOCs.

### 2025 (October): Phoenix v4 and NordVPN OPSEC

[Reported] Group-IB (October 22, 2025) documented a Phoenix v4 phishing campaign targeting MENA government and international organizations. Compromised email infrastructure was used; operators employed NordVPN to obscure source IPs. PDB paths confirm family lineage: phoenixV2 -&gt; V3 -&gt; V4.[R18](https://www.group-ib.com/blog/muddywater-espionage/)**[single-source primary reporting]**

[Reported] Cyberthint (October 2025) independently documented Phoenix v4 with a Chromium_Stealer payload masquerading as a calculator application.[R26](https://cyberthint.io/updated-muddywater-analysis-2025/)Two independent sources increase confidence in September–October 2025 Phoenix v4 activity.

### 2025 (November–December): RustyWater and Operation IconCat

[Observed/Reported] Seqrite Labs (December 21, 2025): Operation IconCat / UNG0801. Two tools targeting Israeli organizations since November 2025:

- **RUSTRIC**(Rust RAT): reconnaissance, enumeration of 28 AV products, C2 communications, SentinelOne icon spoofing.[R20](https://www.seqrite.com/blog/ung0801-tracking-threat-clusters-obsessed-with-av-icon-spoofing-targeting-israel/)

- **PYTRIC**(PyInstaller Python implant): full system wipe, backup deletion, Telegram C2, Check Point icon spoofing.[R20](https://www.seqrite.com/blog/ung0801-tracking-threat-clusters-obsessed-with-av-icon-spoofing-targeting-israel/)

Seqrite attributes this to a “West Asia threat actor” without directly naming MuddyWater.**[single-source primary reporting]**

[Observed/Reported] CloudSEK (January 9, 2026): RustyWater/Archer RAT, delivered via phishing email titled “Cybersecurity Guidelines” from a compromised TMCell domain (Altyn Asyr CJSC, Turkmenistan). VBA macro WriteHexToFile dropped`reddit.exe`with Cloudflare branding. C2: nomercys.it[.]com.[R19](https://www.cloudsek.com/blog/reborn-in-rust-muddywater-evolves-tooling-with-rustywater-implant)

[Assessed] The RUSTRIC (Seqrite) and RustyWater (CloudSEK) linkage is supported by technical overlap; Group-IB explicitly ties their development environment to CHAR through the`Jacob`variable.[R19](https://www.seqrite.com/blog/ung0801-tracking-threat-clusters-obsessed-with-av-icon-spoofing-targeting-israel/)[R21](https://www.group-ib.com/blog/muddywater-operation-olalampo/)

### 2026 (January–February): Operation Olalampo

[Observed/Reported] Group-IB (February 20, 2026): Operation Olalampo, attributed to MuddyWater with high confidence. Earliest indicators: January 26, 2026. Geographic focus: predominantly MENA.**[single-source primary reporting]**[R21](https://www.group-ib.com/blog/muddywater-operation-olalampo/)

Three documented attack chains:

- Excel lure (energy/maritime company) -&gt; CHAR (Rust backdoor with Telegram C2).

- Lure document -&gt; GhostFetch (memory execution) -&gt; GhostBackDoor.

- Word lure (airline tickets, reports) -&gt; HTTP_VIP -&gt; AnyDesk (return to RMM abuse pattern).

In parallel with phishing, Group-IB reported active exploitation of recently disclosed vulnerabilities on public-facing servers (specific CVEs not publicly disclosed).

**Telegram telemetry:**Group-IB tracked bot`stager_51_bot`, enabling direct observation of post-exploitation commands. The bot also showed activity in late 2025, indicating infrastructure reuse.[R21](https://www.group-ib.com/blog/muddywater-operation-olalampo/)

<img src="https://cdn-images-1.medium.com/max/800/1*WiaQgwmFzmq6jpCEKsnJEg.png" alt="Article image" width="1536" height="1024" loading="lazy" decoding="async" />

## Confirmed vs Unconfirmed Facts Matrix

### Confirmed (High Confidence Unless Noted)

- **MOIS attribution at cluster level**
Status: ✅ Confirmed.
Confidence: High.
Primary sources:[R1](https://www.cybercom.mil/Media/News/Article/2897570/iranian-intel-cyber-suite-of-malware-uses-open-source-tools/)[R4](https://attack.mitre.org/groups/G0069/).

- **POWERSTATS, PowGoop, Small Sieve, Canopy, Mori**
Status: ✅ Confirmed.
Confidence: High.
Primary sources:[R1](https://www.ncsc.gov.uk/files/NCSC-Malware-Analysis-Report-Small-Sieve.pdf)[R4](https://unit42.paloaltonetworks.com/unit42-muddywater-operations-in-lebanon-and-oman/).

- **CVE-2020–1472 and CVE-2020–0688 exploitation**
Status: ✅ Confirmed.
Confidence: High.
Primary sources: AA22–055A[R1](https://www.cisa.gov/news-events/cybersecurity-advisories/aa22-055a).

- **Operation Quicksand (Thanos ransomware, Israel)**
Status: ✅ Confirmed.
Confidence: High.
Primary sources:[R16](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/).

- **RMM abuse as a documented tactic**
Status: ✅ Confirmed.
Confidence: High.
Primary sources:[R10](https://harfanglab.io/insidethelab/muddywater-rmm-campaign/)[R13](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/).

- **BugSleep / MuddyRot (July 2024)**
Status: ✅ Confirmed.
Confidence: High.
Primary sources: Check Point[R14](https://research.checkpoint.com/2024/new-bugsleep-backdoor-deployed-in-recent-muddywater-campaigns/)and Sekoia[R15](https://blog.sekoia.io/muddywater-replaces-atera-by-custom-muddyrot-implant-in-a-recent-campaign/), independently.

- **MuddyViper / Fooder (September 2024 to March 2025)**
Status: ✅ Confirmed.
Confidence: High.
Primary sources: ESET detailed analysis[R16](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/).

- **VAXOne, CE-Notes, LP-Notes, Blub**
Status: ✅ Confirmed.
Confidence: High.
Primary sources: ESET[R16](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/).

- **Jerusalem CCTV / kinetic correlation (June 2025)**
Status: ✅ Confirmed (correlation).
Confidence: High for correlation; Medium for causality.
Primary sources: Amazon Threat Intelligence primary report[R22](https://aws.amazon.com/blogs/security/new-amazon-threat-intelligence-findings-nation-state-actors-bridging-cyber-and-kinetic-warfare/).

### Partially Confirmed / Partial

- **IAB cooperation with Lyceum (January to February 2025)**
Status: ✅ Partially confirmed.
Confidence: Medium-High.
Primary sources: ESET with “likely” caveat[R16](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/).

- **Phoenix v4 (October 2025)**
Status: ✅ Partially confirmed.
Confidence: Medium-High.
Primary sources: Group-IB[R18](https://www.group-ib.com/blog/muddywater-espionage/)and Cyberthint[R26](https://cyberthint.io/updated-muddywater-analysis-2025/), independently.

- **RustyWater / Archer RAT / RUSTRIC**
Status: ✅ Partially confirmed.
Confidence: Medium-High.
Primary sources: CloudSEK[R19](https://www.cloudsek.com/blog/reborn-in-rust-muddywater-evolves-tooling-with-rustywater-implant)and Seqrite Labs[R20](https://www.seqrite.com/blog/ung0801-tracking-threat-clusters-obsessed-with-av-icon-spoofing-targeting-israel/), independently.

- **Operation Olalampo: GhostFetch, CHAR, HTTP_VIP**
Status: ✅ Partially confirmed.
Confidence: Medium-High.
Primary sources: Group-IB[R21](https://www.group-ib.com/blog/muddywater-operation-olalampo/)**[single-source]**.

- **CHAR and RUSTRIC shared development environment**
Status: ✅ Partially confirmed.
Confidence: Medium.
Primary sources: Group-IB and CloudSEK convergence[R21](https://www.cloudsek.com/blog/reborn-in-rust-muddywater-evolves-tooling-with-rustywater-implant).

- **StealthCache (September 2025)**
Status: ✅ Partially confirmed.
Confidence: Medium.
Primary sources: Group-IB[R13](https://www.group-ib.com/blog/muddywater-infrastructure-malware/)**[single-source]**.

- **PYTRIC as a MuddyWater tool**
Status: ⚠️ Partial.
Confidence: Low-Medium.
Primary sources: Seqrite Labs[R20](https://www.seqrite.com/blog/ung0801-tracking-threat-clusters-obsessed-with-av-icon-spoofing-targeting-israel/), with “West Asia” attribution and no direct MuddyWater attribution.

- **AI-assisted CHAR code generation (emoji debug strings)**
Status: ✅ Partially confirmed.
Confidence: Medium.
Primary sources: Group-IB primary artifact[R21](https://www.group-ib.com/blog/muddywater-operation-olalampo/)**[single-source]**.

### Not Confirmed / Incorrect

- **AI as MuddyWater’s systemic development standard**
Status: ❌ Not confirmed.
Confidence: Low.
Primary sources: Invalid extrapolation from a single artifact.

- **APT34/OilRig as a MuddyWater alias**
Status: ❌ INCORRECT.
Confidence: N/A.
Primary sources: Frequent media error; MuddyWater (MOIS, G0069) is not APT34 (IRGC, G0049).

## Critical Errors in the Public Corpus

**Error 1: APT34/OilRig as a MuddyWater alias.**Incorrect. The Register (November 2025) listed “MuddyWater (aka Seedworm, APT34, OilRig, and TA450).” APT34/OilRig is G0049, a distinct Iranian group primarily associated with IRGC rather than MOIS. Operational interaction has been observed (IAB cooperation in ESET 2025), but this does not imply identity.[R16](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/)

**Error 2: Group-IB as the primary source for BugSleep discovery.**Incorrect. The first detailed technical BugSleep analysis was published by Check Point Research (July 15, 2024), with parallel independent analysis by Sekoia TDR. Group-IB described BugSleep later in a broader September 2025 infrastructure context.[R14](https://blog.sekoia.io/muddywater-replaces-atera-by-custom-muddyrot-implant-in-a-recent-campaign/)

**Error 3: RMM abuse “started” in 2023.**Inaccurate. Group-IB reports MuddyWater RMM usage as early as 2020.[R13](https://www.group-ib.com/blog/muddywater-infrastructure-malware/)2023 reflects scale escalation and broader public visibility, not first appearance.

**Error 4: CCTV narrative as “unverified.”**This appeared in the source draft. Incorrect: it is documented in Amazon Threat Intelligence primary reporting with explicit dates and IOCs.[R22](https://aws.amazon.com/blogs/security/new-amazon-threat-intelligence-findings-nation-state-actors-bridging-cyber-and-kinetic-warfare/)

**Error 5: Earth Vetala, Boggy Serpens, COBALT ULSTER without primary vendor references.**Corrected in version 4.0: all three aliases now map to primary vendor reporting.[R24](https://unit42.paloaltonetworks.com/threat-actor-groups-tracked-by-palo-alto-networks-unit-42/)[R25](https://www.secureworks.com/research/threat-profiles/cobalt-ulster)

## Malware and Tooling Portfolio

### Historical Stack (2017–2022)

**POWERSTATS**
**Function**: PowerShell backdoor.
**Key technical characteristics**: group flagship since 2017; credential theft from email and social services.
**Hash**: 8674058edfbe636e550109fabb6403827c1bba4ab08833e9692099c96a43497a
**Primary sources**:[R5](https://www.cisa.gov/news-events/cybersecurity-advisories/aa22-055a)[R4](https://www.ncsc.gov.uk/pdfs/news/joint-advisory-observes-muddywater-actors-conducting-cyber-espionage.pdf).

### PowGoop

<img src="https://cdn-images-1.medium.com/max/800/1*UBG7eS1iFm1gSU9xCGJyFQ.png" alt="Article image" width="1315" height="636" loading="lazy" decoding="async" />

**Function**: Loader with DLL side-loading.
**Key technical characteristics**: masquerades as Google Update; encrypted C2 commands; variant used in Operation Quicksand.
**Hash**: b154d3fd88767776b1e36113c479ef3487ceda0f6e4fc80cef85ba539a589555
**Primary sources**:[R1](https://www.ncsc.gov.uk/pdfs/news/joint-advisory-observes-muddywater-actors-conducting-cyber-espionage.pdf).

**Small Sieve**
**Function**: Python backdoor.
**Key technical characteristics**: NSIS installer`gram_app.exe`; Telegram Bot API C2;`OutlookMicrosift`registry key typo.
**Primary sources**:[R1](https://www.ncsc.gov.uk/files/NCSC-Malware-Analysis-Report-Small-Sieve.pdf).

**Canopy/Starwhale**
**Function**: VBS/WSF chain.
**Key technical characteristics**: WSF scripts via Excel; collects hostname, IP, and username.
**Primary sources**:[R1](https://www.ncsc.gov.uk/pdfs/news/joint-advisory-observes-muddywater-actors-conducting-cyber-espionage.pdf).

**Mori**
Function: DNS tunneling backdoor.
Key technical characteristics: DLL`FML.dll`with junk-data concealment.
Primary sources:[R1](https://www.ncsc.gov.uk/pdfs/news/joint-advisory-observes-muddywater-actors-conducting-cyber-espionage.pdf).

### RMM Tooling (documented from 2020, peak in 2023–2024)

**Atera Agent**
**Role**: Legitimate RMM.
**Primary sources**:[R10](https://harfanglab.io/insidethelab/muddywater-rmm-campaign/)[R16](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/).

**ScreenConnect**
**Role**: Legitimate RMM.
**Primary sources**:[R14](https://www.trendmicro.com/en_us/research/21/c/earth-vetala---muddywater-continues-to-target-organizations-in-t.html).

**SimpleHelp**
**Role**: Legitimate RMM.
**Primary sources**:[R11](https://blog.sekoia.io/muddywater-replaces-atera-by-custom-muddyrot-implant-in-a-recent-campaign/).

**Syncro**
**Role**: Legitimate RMM.
**Primary sources**:[R10](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/).

**RemoteUtilities**
**Role**: Legitimate RMM.
Primary sources:[R11](https://www.trendmicro.com/en_us/research/21/c/earth-vetala---muddywater-continues-to-target-organizations-in-t.html).

**Level, PDQ**
**Role**: Legitimate admin/RMM tools.
**Primary sources**:[R16](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/).

**AnyDesk**
**Role**: Legitimate remote tool.
**Primary sources**: Deployed by HTTP_VIP in Olalampo[R21](https://www.group-ib.com/blog/muddywater-operation-olalampo/).

## Modern Custom Stack (2024–2026)

**BugSleep / MuddyRot**

<img src="https://cdn-images-1.medium.com/max/800/1*n8idBbbPbPomUqDEX5jhoA.png" alt="Article image" width="1315" height="636" loading="lazy" decoding="async" />

**Period**: since May 2024.
**Function**: C/C++ backdoor.
**Key technical characteristics**: mutex`DocumentUpdater`/`PackageManager`; repeated Sleep calls; subtraction-based obfuscation (3-6); injection into`msedge`,`chrome`,`anydesk`,`onedrive`,`powershell`.
**Hash**: 94278fa01900fdbfb58d2e373895c045c69c01915edc5349cd6f3e5b7130c472
**Primary sources**: Check Point[R14](https://research.checkpoint.com/2024/new-bugsleep-backdoor-deployed-in-recent-muddywater-campaigns/); Sekoia[R15](https://blog.sekoia.io/muddywater-replaces-atera-by-custom-muddyrot-implant-in-a-recent-campaign/).

**StealthCache**

<img src="https://cdn-images-1.medium.com/max/800/1*Qvq3yfeMpofOcDvxwzYCNQ.png" alt="Article image" width="1315" height="636" loading="lazy" decoding="async" />

**Period**: 2024–2025.
**Function**: Advanced backdoor.
**Key technical characteristics**: HTTP(S) to`/aq36`; C2`netivtech[.]org`; sample`wtsapi.dll`.
**Hash**: 5f22f4c4fdb36c4f0ea3248abb00521e39008c1fb4c97e1b4a9c7b9ef0b691c2
**Primary sources:**Group-IB[R13](https://www.group-ib.com/blog/muddywater-infrastructure-malware/).

**Fooder**

<img src="https://cdn-images-1.medium.com/max/800/1*tSM7tPy2n9ozORid_8YRfA.png" alt="Article image" width="1315" height="636" loading="lazy" decoding="async" />

**Period**: September 2024 to March 2025.
**Function**: 64-bit C/C++ loader.
**Key technical characteristics**: reflective in-memory payload loading; Snake-game variant; CNG API.
Hash:**47B70C47BEB33E88B4197D6AF1B768230E51B067
Primary sources**: ESET[R16](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/).

**MuddyViper**
**Period**: September 2024 to March 2025.
**Function**: C/C++ backdoor.
**Key technical characteristics**: 20 commands; CNG API; theft of Windows credentials and browser data.
**Primary sources:**ESET[R16](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/).

**VAXOne**
**Period**: 2024–2025.
**Function**: Backdoor.
**Key technical characteristics**: masquerades as Veeam, AnyDesk, Xerox, OneDrive.
**Primary sources**: ESET[R16](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/).

**CE-Notes**
**Period**: 2024–2025.
**Function**: Chrome stealer.
**Key technical characteristics**: bypasses app-bound encryption; extraction from Local State.
**Primary sources**: ESET[R16](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/).

**LP-Notes**
**Period**: 2024–2025.
**Function**: Credential stealer.
**Key technical characteristics**: fake Windows Security prompt.
**Primary sources**: ESET[R16](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/).

**Blub**
**Period**: 2024–2025.
**Function**: Browser stealer.
**Key technical characteristics**: C/C++; targets Chrome, Edge, Firefox, Opera.
**Primary sources**: ESET[R16](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/).

**Phoenix v4**

<img src="https://cdn-images-1.medium.com/max/800/1*b9v31J1Wq9tNG2aF4EZwbQ.png" alt="Article image" width="1315" height="636" loading="lazy" decoding="async" />

**Period**: October 2025.
**Function**: Backdoor.
**Key technical characteristics**:`/register`plus`/iamalive`beaconing; PDB`phoenixV4`; NordVPN OPSEC.
**Hash**:6de859a27ccc784689e8748cef536e32780e498a
**Primary sources**: Group-IB[R18](https://www.group-ib.com/blog/muddywater-espionage/); Cyberthint[R26](https://cyberthint.io/updated-muddywater-analysis-2025/).

**PYTRIC**
**Period**: since November 2025.
**Function**: Python wiper.
**Key technical characteristics**: PyInstaller; full system wipe; backup deletion; Telegram C2.
**Primary sources:**Seqrite Labs[R20](https://www.seqrite.com/blog/ung0801-tracking-threat-clusters-obsessed-with-av-icon-spoofing-targeting-israel/).
**Attribution caveat**:**MW attribution: low-medium**.

**RUSTRIC / RustyWater / Archer RAT**

<img src="https://cdn-images-1.medium.com/max/800/1*HRsENuD-NOtTKHF1X9mONg.png" alt="Article image" width="1315" height="636" loading="lazy" decoding="async" />

**Period**: since November 2025.
**Function**: Rust RAT.
**Key technical characteristics**: VEH anti-debugging; more than 25 AV detections; XOR encryption; registry persistence; C2`nomercys.it[.]com`.
**Hash:**a2001892410e9f34ff0d02c8bc9e7c53b0bd10da58461e1e9eab26bdbf410c79
**Primary sources**: CloudSEK[R19](https://www.cloudsek.com/blog/reborn-in-rust-muddywater-evolves-tooling-with-rustywater-implant); Seqrite Labs[R20](https://www.seqrite.com/blog/ung0801-tracking-threat-clusters-obsessed-with-av-icon-spoofing-targeting-israel/).

**GhostFetch**
**Period**: since January 2026.
**Function**: Loader.
**Key technical characteristics**: mouse/screen checks; sandbox evasion; in-memory GhostBackDoor loading.
**Primary sources**: Group-IB[R21](https://www.group-ib.com/blog/muddywater-operation-olalampo/).

**GhostBackDoor**
**Period**: since January 2026.
**Function**: Advanced backdoor.
**Key technical characteristics**: interactive shell; file operations.
**Primary sources**: Group-IB[R21](https://www.group-ib.com/blog/muddywater-operation-olalampo/).

**HTTP_VIP**
**Period**: since January 2026.
**Function**: Native downloader.
**Key technical characteristics**: system recon; C2`codefusiontech[.]org`; deploys AnyDesk.
**Primary sources**: Group-IB[R21](https://www.group-ib.com/blog/muddywater-operation-olalampo/).

**CHAR**
**Period**: since January 2026.
**Function**: Rust backdoor.
**Key technical characteristics**: Telegram bot`stager_51_bot`; SOCKS5; browser data theft; emoji debug strings.
**Primary sources**: Group-IB[R21](https://www.group-ib.com/blog/muddywater-operation-olalampo/).

## Deep Technical Analysis of Key Families

### BugSleep / MuddyRot — Independent Dual-Team Validation

BugSleep analysis quality is strengthened by independent reverse engineering from Check Point Research and Sekoia TDR with matching findings.

**[Observed] Shared characteristics:**

- x64 C implant with reverse shell, file upload/download, and persistence.

- Mutex`DocumentUpdater`(or`PackageManager`) reported by both vendors.[R14](https://blog.sekoia.io/muddywater-replaces-atera-by-custom-muddyrot-implant-in-a-recent-campaign/)

- String obfuscation by subtracting fixed integers (3, 4, 5, or 6) from each character.

- Initial C2 packet includes`hostname/username`victim fingerprint.

- Raw TCP C2 over port 443.

- Multiple versions with rapid iterative fixes.

**[Observed/Reported] Check Point-specific details:**injection into`msedge.exe`,`chrome.exe`,`opera.exe`,`anydesk.exe`,`onedrive.exe`,`powershell.exe`.[R14](https://research.checkpoint.com/2024/new-bugsleep-backdoor-deployed-in-recent-muddywater-campaigns/)

**[Assessed] Doctrinal nuance:**In 2024, MuddyWater used BugSleep primarily against Israeli targets while continuing RMM deployment against Saudi targets, indicating payload differentiation by victim profile.[R14](https://research.checkpoint.com/2024/new-bugsleep-backdoor-deployed-in-recent-muddywater-campaigns/)

### MuddyViper/Fooder — In-Memory Architecture with Game-Themed Evasion

**[Observed/Reported] Fooder:**

- 64-bit C/C++ loader using reflective in-memory payload loading, minimizing on-disk artifacts.

- Custom delay logic based on Snake game mechanics plus Sleep API for layered sandbox evasion.

- CNG API usage; ESET notes this is “unique to Iran-aligned groups and somewhat atypical across the broader threat landscape.”[R16](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/)

**[Observed/Reported] MuddyViper:**

- 20-command feature set: system collection, file/shell execution, file transfer, Windows credential theft, browser data theft.

- Same CNG API pattern and fake Windows Security prompt behavior.

**[Assessed] Operational maturity indicator:**deliberate avoidance of interactive keyboard sessions suggests improved OPSEC discipline.[R16](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/)

### Operation Olalampo — First Publicly Documented Telegram-C2 in MuddyWater Toolkit

**[Observed/Reported, single-source: Group-IB] CHAR:**

- Controlled via Telegram bot`stager_51_bot`; bot monitoring enabled direct observation of post-exploitation commands.

- Supported actions: directory changes, cmd.exe/PowerShell execution, SOCKS5 activation, browser data collection,`sh.exe`launch.

- Debug strings contain four emoji instances. Group-IB assessment: “adversary likely used an AI model to generate specific code segments and failed to sanitize the debug strings.”[R21](https://www.group-ib.com/blog/muddywater-operation-olalampo/)

- Development environment overlaps with RUSTRIC/RustyWater via shared`Jacob`Rust library path artifacts.[R21](https://www.cloudsek.com/blog/reborn-in-rust-muddywater-evolves-tooling-with-rustywater-implant)

Critical caveat: all Operation Olalampo analysis in this report is treated as**[single-source primary reporting]**and should be used as priority hunting guidance until independently replicated.

### Amazon CYBERWARCON 2025: Documented Correlation with Kinetic Strike

**[Reported] Date-specific documented facts:**

- May 13, 2025: C2 server created (IP: 18[.]219.14.54).[R22](https://aws.amazon.com/blogs/security/new-amazon-threat-intelligence-findings-nation-state-actors-bridging-cyber-and-kinetic-warfare/)

- June 17, 2025: access obtained to a CCTV server carrying live Jerusalem feeds.[R22](https://aws.amazon.com/blogs/security/new-amazon-threat-intelligence-findings-nation-state-actors-bridging-cyber-and-kinetic-warfare/)

- June 23, 2025: Iran launched missile strikes on Jerusalem; Israeli officials publicly reported use of hacked cameras.[R22](https://aws.amazon.com/blogs/security/new-amazon-threat-intelligence-findings-nation-state-actors-bridging-cyber-and-kinetic-warfare/)

**[Assessed] Threat-model implication:**organizations operating surveillance, IoT, or sensor networks in conflict-prone regions should treat MuddyWater as a potential threat regardless of sector.

## Targeting and Victimology

### Geographic Focus

[Reported] Israel — sharply elevated priority after October 2023; present across documented campaigns in 2024–2026.[R14](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/)[R18](https://www.cloudsek.com/blog/reborn-in-rust-muddywater-evolves-tooling-with-rustywater-implant)[R20](https://www.group-ib.com/blog/muddywater-operation-olalampo/)[R22](https://aws.amazon.com/blogs/security/new-amazon-threat-intelligence-findings-nation-state-actors-bridging-cyber-and-kinetic-warfare/)

[Reported] Broader MENA region: Saudi Arabia, Egypt, UAE, Jordan, Azerbaijan as recurrent strategic targets.[R10](https://www.group-ib.com/blog/muddywater-infrastructure-malware/)[R16](https://www.group-ib.com/blog/muddywater-operation-olalampo/)

[Reported] Turkmenistan — compromised TMCell account in RustyWater campaign.[R19](https://www.cloudsek.com/blog/reborn-in-rust-muddywater-evolves-tooling-with-rustywater-implant)

[Reported] Turkey, Jordan, Iraq — documented by Secureworks in 2020.[R25](https://www.secureworks.com/research/threat-profiles/cobalt-ulster)

[Reported] India and Portugal — observed in BugSleep 2024 campaign activity.[R14](https://research.checkpoint.com/2024/new-bugsleep-backdoor-deployed-in-recent-muddywater-campaigns/)

[Reported] Europe and North America — periodic presence in earlier campaign phases.[R1](https://unit42.paloaltonetworks.com/unit42-muddywater-operations-in-lebanon-and-oman/)

### Sectoral Focus

According to INCD (Israel National Cyber Directorate): local government, civil aviation, tourism, healthcare, telecommunications, IT, and SMEs. ESET reports include technology, engineering, manufacturing, and education. Group-IB emphasizes government, energy, finance, and critical infrastructure. Amazon highlights CCTV and IoT operators.[R16](https://www.group-ib.com/blog/muddywater-espionage/)[R21](https://aws.amazon.com/blogs/security/new-amazon-threat-intelligence-findings-nation-state-actors-bridging-cyber-and-kinetic-warfare/)

### [Assessed] Operational Motivation

- Strategic intelligence collection for MOIS: policy, defense programs, diplomatic communications.

- [Partially Corroborated] Access handoff to other Iranian actors (IAB function for Lyceum).[R16](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/)

- [Reported] Potential intelligence support to kinetic operations via compromised CCTV access has been publicly discussed in Amazon Threat Intelligence reporting, though direct operational coordination is not publicly proven.[R22](https://aws.amazon.com/blogs/security/new-amazon-threat-intelligence-findings-nation-state-actors-bridging-cyber-and-kinetic-warfare/)

- Destructive capability as a contingency option (Operation Quicksand, PYTRIC).[R16](https://www.seqrite.com/blog/ung0801-tracking-threat-clusters-obsessed-with-av-icon-spoofing-targeting-israel/)

## Evolution of Operational Doctrine

### Phase I (2017–2022): Script-Centric Operations

[Observed/Reported] Spearphishing with lure documents, multi-stage script chains (PowerShell, VBS, WSF), DLL side-loading, and DNS tunneling. Broad custom tooling with moderate technical complexity.[R1](https://www.ncsc.gov.uk/files/NCSC-Malware-Analysis-Report-Small-Sieve.pdf)[R4](https://unit42.paloaltonetworks.com/unit42-muddywater-operations-in-lebanon-and-oman/)

### Phase II (2023–2024): Trusted-Tool Model

[Observed/Reported] Abuse of legitimate RMM tools as a primary initial-access channel. Delivery via compromised corporate email accounts and file-sharing services (Egnyte, OneHub, Mega). BugSleep served as a partial RMM replacement for high-priority targets.[R10](https://harfanglab.io/insidethelab/muddywater-rmm-campaign/)[R14](https://blog.sekoia.io/muddywater-replaces-atera-by-custom-muddyrot-implant-in-a-recent-campaign/)

**[CORRECTION to source draft]**Group-IB documents RMM usage from 2020.[R13](https://www.group-ib.com/blog/muddywater-infrastructure-malware/)2023 reflects scale and visibility escalation, not first tactic appearance.

### Phase III (2024–2026): Iterative Custom Development

[Observed/Reported] Return to custom malware while retaining RMM in selected campaigns. Rust as a preferred implementation language (RustyWater, CHAR); in-memory execution as baseline; Telegram bot C2; rapid iterative development cycles; limited evidence of AI-assisted code generation (single documented artifact level).[R16](https://www.cloudsek.com/blog/reborn-in-rust-muddywater-evolves-tooling-with-rustywater-implant)[R20](https://www.group-ib.com/blog/muddywater-operation-olalampo/)

**[Assessed] Doctrinal constant:**priority on long-term low-noise access over high-noise immediate impact. Destructive operations (Operation Quicksand, PYTRIC) are documented as reserve capability, not systemic baseline behavior.

## Initial Access and Privilege Escalation

### Documented Initial Access Vectors

[Observed/Reported] Spearphishing via compromised corporate email accounts.[R11](https://research.checkpoint.com/2024/new-bugsleep-backdoor-deployed-in-recent-muddywater-campaigns/)[R18](https://www.group-ib.com/blog/muddywater-espionage/)

[Observed/Reported] PDF attachments with embedded links -&gt; file-sharing services -&gt; RMM agent deployment.[R10](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/)

[Observed/Reported] Word/Excel documents with VBA macros (WriteHexToFile, UserForm1.TextBox1.Text, four-level nested loops).[R19](https://www.group-ib.com/blog/muddywater-operation-olalampo/)

[Observed/Reported] CVE exploitation: CVE-2020–1472, CVE-2020–0688 (AA22–055A); recent CVEs on public-facing servers in Olalampo (specific CVEs undisclosed).[R1](https://www.group-ib.com/blog/muddywater-operation-olalampo/)

[Reported] VPN infrastructure vulnerability exploitation.[R16](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/)

### Documented Persistence Methods

[Observed/Reported] Scheduled tasks:`MicrosoftVersionUpdater`,`DocumentUpdater`,`OutlookMicrosift`.[R3](https://www.group-ib.com/blog/muddywater-operation-olalampo/)

[Observed/Reported] Windows Run keys (RustyWater, Phoenix v4).[R18](https://www.cloudsek.com/blog/reborn-in-rust-muddywater-evolves-tooling-with-rustywater-implant)

[Observed/Reported] Deployment of legitimate RMM agents as long-term backdoor channels.[R10](https://harfanglab.io/insidethelab/muddywater-rmm-campaign/)

[Reported] Registration of RMM accounts using compromised corporate email credentials.[R13](https://www.group-ib.com/blog/muddywater-infrastructure-malware/)

### Documented Credential Theft

[Observed/Reported] CE-Notes (Chrome app-bound encryption bypass), LP-Notes (fake Windows Security dialog), Blub (Chrome/Edge/Firefox/Opera), MuddyViper built-in credential module.[R16](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/)

[Reported] Custom Mimikatz loader (disguised as`.txt`certificates) in IAB scenario with Lyceum.[R16](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/)

## Detection Engineering: SOC-Ready Rules

### High-Priority Detections (Immediate Deployment)

**RMM control:**

- Unauthorized installation/execution of Atera, ScreenConnect, SimpleHelp, Syncro, RemoteUtilities, Level, PDQ, AnyDesk.[R10](https://harfanglab.io/insidethelab/muddywater-rmm-campaign/)[R16](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/)

- RMM account registration from corporate domains outside standard business workflows (potential account compromise).[R13](https://www.group-ib.com/blog/muddywater-infrastructure-malware/)

- `powershell.exe`or`cmd.exe`spawned by RMM agent processes.

**Delivery chain:**

- PDF/Office -&gt; external file-sharing service (Egnyte, OneHub, Mega, Dropbox) -&gt; executable drop.[R10](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/)

- VBA macro usage with`WriteHexToFile`or`UserForm1.TextBox1.Text`patterns.[R19](https://www.group-ib.com/blog/muddywater-operation-olalampo/)

- Four-level nested loop pattern in macro code (MuddyWater-specific indicator).[R21](https://www.group-ib.com/blog/muddywater-operation-olalampo/)

**Malware behavior:**

- Mutex creation:`DocumentUpdater`or`PackageManager`in newly launched processes.[R14](https://blog.sekoia.io/muddywater-replaces-atera-by-custom-muddyrot-implant-in-a-recent-campaign/)

- More than 10 consecutive Sleep API calls in first 60 seconds of new process execution.[R14](https://blog.sekoia.io/muddywater-replaces-atera-by-custom-muddyrot-implant-in-a-recent-campaign/)[R16](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/)

- Injection into`msedge.exe`,`chrome.exe`,`opera.exe`,`anydesk.exe`,`onedrive.exe`,`powershell.exe`from unsigned or atypical parent processes.[R14](https://research.checkpoint.com/2024/new-bugsleep-backdoor-deployed-in-recent-muddywater-campaigns/)

- Telegram API calls (`api.telegram.org`) initiated by atypical system processes.[R3](https://www.group-ib.com/blog/muddywater-operation-olalampo/)

**Persistence:**

- Scheduled tasks:`MicrosoftVersionUpdater`,`DocumentUpdater`,`PackageManager`,`OutlookMicrosift`.[R3](https://www.group-ib.com/blog/muddywater-operation-olalampo/)

- Run-key persistence created by binaries from ProgramData, Downloads, or Temp.

**Credential theft:**

- Access to`%LOCALAPPDATA%\Google\Chrome\User Data\Local State`by unusual processes.[R16](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/)

- Fake Windows Security prompt behavior outside trusted system processes.[R16](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/)

- Access to browser`Login Data`by non-standard processes.[R16](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/)

**IoT/CCTV vector (from Amazon findings):**

- Unauthorized connections to CCTV servers from unknown external IPs.[R22](https://aws.amazon.com/blogs/security/new-amazon-threat-intelligence-findings-nation-state-actors-bridging-cyber-and-kinetic-warfare/)

- Anomalous outbound traffic from DVR/NVR and IP camera devices.

### Hunting Indicators (Medium Priority)

- Rust-compiled binaries (Rust artifacts in PE sections) in environments where Rust tooling is not business-normal.[R19](https://www.group-ib.com/blog/muddywater-operation-olalampo/)

- AV vendor icon spoofing (Check Point, SentinelOne) in PE metadata.[R20](https://www.seqrite.com/blog/ung0801-tracking-threat-clusters-obsessed-with-av-icon-spoofing-targeting-israel/)

- PyInstaller binaries containing backup discovery/deletion logic.[R20](https://www.seqrite.com/blog/ung0801-tracking-threat-clusters-obsessed-with-av-icon-spoofing-targeting-israel/)

- Early-process Vectored Exception Handler (VEH) registration.[R19](https://www.cloudsek.com/blog/reborn-in-rust-muddywater-evolves-tooling-with-rustywater-implant)

- Programmatic checks for screen resolution and mouse activity.[R21](https://www.group-ib.com/blog/muddywater-operation-olalampo/)

- C2 domains (validate before blocking):`netivtech[.]org`,`codefusiontech[.]org`,`nomercys.it[.]com`.

## Mini Playbook: First 30 Minutes

- **Isolate**the suspected endpoint and disable all active RMM channels on that host.

- **Revoke**active sessions/tokens and rotate high-risk credentials.

- **Block**suspicious egress paths: known/suspected C2 endpoints, file-sharing services (Egnyte, OneHub, Mega), and Telegram API access from atypical processes.

- **Capture**volatile state: process tree, network connections, scheduled tasks, autoruns, loaded modules.

- **Verify**CCTV/IoT infrastructure for unauthorized external access.

- **Preserve**forensic artifacts before any cleanup actions.

- **Hunt**lateral movement using admin-tool telemetry, credential reuse, and anomalous authentication events from patient zero.

- **Validate**backup integrity and isolation from compromised hosts (wiper resilience).

- **Recover**only after complete scoping of compromise boundaries.

## Practical Defensive Actions: 30 Days

- **RMM allowlisting.**Enforce strict approved-RMM inventory; block all non-approved agents at endpoint policy and DNS layers.

- **Behavioral email security.**SPF/DKIM/DMARC do not stop phishing from compromised legitimate accounts; sender-behavior anomaly detection is required.

- **Identity hardening.**Deploy phishing-resistant MFA (FIDO2/hardware keys), token/session controls, and Privileged Access Workstations for administrators.

- **Credential store protection.**Restrict process access to Chrome Local State and Login Data.

- **IoT/CCTV audit.**Inventory and segment surveillance systems; monitor anomalous external connections.

- **Patch prioritization.**Prioritize VPN infrastructure and public-facing servers.

- **Behavioral detections.**Monitor injection, unusual parent-child process chains, admin-tool pivots, and Telegram API usage by atypical processes.

- **Tabletop exercise.**Scenario: phishing -&gt; RMM -&gt; credential theft -&gt; lateral movement -&gt; IAB handoff to secondary actor.

- **Segmentation.**Apply egress restrictions for file-sharing services, Telegram, and external IoT communication paths.

- **Backup isolation.**Ensure backups are physically/logically isolated against wiper scenarios.

## Intelligence Gaps

- Specific CVEs exploited against public-facing servers in Operation Olalampo are not disclosed.[R21](https://www.group-ib.com/blog/muddywater-operation-olalampo/)

- Kalim backdoor (invoked by CHAR) is named, but no complete public technical analysis is available.[R21](https://www.group-ib.com/blog/muddywater-operation-olalampo/)

- PYTRIC direct attribution to MuddyWater requires independent confirmation.[R20](https://www.seqrite.com/blog/ung0801-tracking-threat-clusters-obsessed-with-av-icon-spoofing-targeting-israel/)

- StealthCache technical analysis outside Group-IB remains limited.[R13](https://www.group-ib.com/blog/muddywater-infrastructure-malware/)

- Mechanisms of MuddyWater-Lyceum coordination in IAB scenarios are not deeply documented.[R16](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/)

- CCTV-vector scale remains uncertain; the Amazon-documented case is the only currently public example.

- Operation Olalampo overall still awaits broad independent technical replication.

## Appendix A: IOC Compendium

&gt; Warning. Network IOCs age rapidly. Always validate against current threat intelligence before enforcing blocking controls.

### Stable Host-Oriented Indicators

- Mutexes:`DocumentUpdater`,`PackageManager`.[R14](https://blog.sekoia.io/muddywater-replaces-atera-by-custom-muddyrot-implant-in-a-recent-campaign/)

- Registry key:`OutlookMicrosift`(intentional typo; Small Sieve).[R1](https://www.ncsc.gov.uk/files/NCSC-Malware-Analysis-Report-Small-Sieve.pdf)

- Scheduled task names:`MicrosoftVersionUpdater`.[R21](https://www.group-ib.com/blog/muddywater-operation-olalampo/)

- File name:`reddit.exe`with Cloudflare icon (RustyWater).[R19](https://www.cloudsek.com/blog/reborn-in-rust-muddywater-evolves-tooling-with-rustywater-implant)

- `Jacob`variable in Rust library paths (CHAR, RUSTRIC).[R19](https://www.group-ib.com/blog/muddywater-operation-olalampo/)

- Document metadata tags:`DontAsk`,`Jacob`(Olalampo).[R21](https://www.group-ib.com/blog/muddywater-operation-olalampo/)

- DLL name:`FML.dll`(Mori).[R1](https://www.cisa.gov/news-events/cybersecurity-advisories/aa22-055a)

- DLL name:`wtsapi.dll`(StealthCache).[R13](https://www.group-ib.com/blog/muddywater-infrastructure-malware/)

### Network Indicators (Validate Recency)

- `netivtech[.]org`- StealthCache C2 (September 2025).[R13](https://www.group-ib.com/blog/muddywater-infrastructure-malware/)

- `codefusiontech[.]org`- HTTP_VIP C2 (January 2026).[R21](https://www.group-ib.com/blog/muddywater-operation-olalampo/)

- `nomercys.it[.]com`- RustyWater C2 (January 2026).[R19](https://www.cloudsek.com/blog/reborn-in-rust-muddywater-evolves-tooling-with-rustywater-implant)

- `18[.]219.14.54`- MuddyWater C2 IP (May–June 2025).[R22](https://aws.amazon.com/blogs/security/new-amazon-threat-intelligence-findings-nation-state-actors-bridging-cyber-and-kinetic-warfare/)

- `stager_51_bot`- CHAR Telegram bot username.[R21](https://www.group-ib.com/blog/muddywater-operation-olalampo/)

### Family Names for Retrospective Hunting

Historical (2017–2022): POWERSTATS, PowGoop, Small Sieve/`gram_app.exe`, Canopy/Starwhale, Mori/`FML.dll`.

2024–2026: BugSleep/MuddyRot, StealthCache/`wtsapi.dll`, Phoenix v4, Fooder, MuddyViper, VAXOne, CE-Notes, LP-Notes, Blub, PYTRIC, RUSTRIC/RustyWater/Archer RAT, GhostFetch, GhostBackDoor, HTTP_VIP, CHAR, Kalim.

## Appendix B: MITRE ATT&CK Mapping

&gt; Mapping is based on techniques documented in primary sources. Rows where ATT&CK alignment is approximate are marked [approx] .

### Initial Access

- **T1566.001 — Spearphishing Attachment**: PDF/Office with macros.[R1](https://www.proofpoint.com/uk/blog/threat-insight/security-brief-ta450-uses-embedded-links-pdf-attachments-latest-campaign)

- **T1566.002 — Spearphishing Link**: PDF embedded links to file-sharing services.[R10](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/)

- **T1190 — Exploit Public-Facing Application**: CVE-2020–1472, CVE-2020–0688, and recent CVEs in Olalampo.[R1](https://www.group-ib.com/blog/muddywater-operation-olalampo/)

- **T1078 — Valid Accounts**: compromised corporate accounts.[R11](https://research.checkpoint.com/2024/new-bugsleep-backdoor-deployed-in-recent-muddywater-campaigns/)

### Execution

- **T1059.001 — PowerShell**.[R1](https://unit42.paloaltonetworks.com/unit42-muddywater-operations-in-lebanon-and-oman/)

- **T1059.005 — VBScript/VBA**: Canopy/Starwhale and macro execution chains.[R1](https://www.ncsc.gov.uk/pdfs/news/joint-advisory-observes-muddywater-actors-conducting-cyber-espionage.pdf)

- **T1059.003 — Command and Scripting Interpreter: Windows Command Shell**: CMD execution across multiple campaigns.[R14](https://www.group-ib.com/blog/muddywater-operation-olalampo/)

- **T1204.002 — User Execution: Malicious File**: lure document execution.[R10](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/)

### Persistence

- **T1053.005 — Scheduled Task/Job: Scheduled Task**:`MicrosoftVersionUpdater`,`DocumentUpdater`.[R3](https://www.group-ib.com/blog/muddywater-operation-olalampo/)

- **T1547.001 — Boot or Logon Autostart Execution: Registry Run Keys / Startup Folder**: RustyWater and Phoenix v4.[R18](https://www.cloudsek.com/blog/reborn-in-rust-muddywater-evolves-tooling-with-rustywater-implant)

### Defense Evasion

- **T1055 — Process Injection**: BugSleep injection into browser/admin processes.[R14](https://research.checkpoint.com/2024/new-bugsleep-backdoor-deployed-in-recent-muddywater-campaigns/)

- **T1036 — Masquerading**: VAXOne as Veeam/AnyDesk;`reddit.exe`with Cloudflare icon.[R16](https://www.cloudsek.com/blog/reborn-in-rust-muddywater-evolves-tooling-with-rustywater-implant)

- **T1027 — Obfuscated Files or Information**: XOR/subtraction-based obfuscation.[R14](https://blog.sekoia.io/muddywater-replaces-atera-by-custom-muddyrot-implant-in-a-recent-campaign/)[R19](https://www.cloudsek.com/blog/reborn-in-rust-muddywater-evolves-tooling-with-rustywater-implant)

- **T1497.003 — Virtualization/Sandbox Evasion: Time Based Evasion**: Sleep API and game-based delay logic.[R14](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/)

- **T1574.002 — Hijack Execution Flow: DLL Side-Loading**: PowGoop chain.[R1](https://www.ncsc.gov.uk/pdfs/news/joint-advisory-observes-muddywater-actors-conducting-cyber-espionage.pdf)

### Credential Access

- **T1003 — OS Credential Dumping**: custom Mimikatz loader.[R16](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/)

- **T1555.003 — Credentials from Password Stores: Credentials from Web Browsers**: CE-Notes, Blub, MuddyViper.[R16](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/)

- **T1056.002 [approx] — Input Capture: GUI Input Capture**: LP-Notes/MuddyViper fake dialogs. Note: fake Windows Security prompt is deception-based credential harvesting; strict T1056.002 alignment remains debatable.[R16](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/)

### Command and Control (C2)

- **T1071.001 — Application Layer Protocol: Web Protocols**: HTTP/S.[R13](https://www.group-ib.com/blog/muddywater-espionage/)[R21](https://www.group-ib.com/blog/muddywater-operation-olalampo/)

- **T1573 — Encrypted Channel**usage.[R16](https://www.cloudsek.com/blog/reborn-in-rust-muddywater-evolves-tooling-with-rustywater-implant)

- **T1102 — Web Service**: Telegram Bot API for CHAR, Small Sieve, and PYTRIC.[R3](https://www.seqrite.com/blog/ung0801-tracking-threat-clusters-obsessed-with-av-icon-spoofing-targeting-israel/)[R21](https://www.group-ib.com/blog/muddywater-operation-olalampo/)

- **T1090.001 — Proxy: Internal Proxy (SOCKS)**: CHAR and go-socks5 usage.[R16](https://www.group-ib.com/blog/muddywater-operation-olalampo/)

### Collection

- **T1005 — Data from Local System**.[R16](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/)

### Exfiltration

- **T1048 — Exfiltration Over Alternative Protocol**.[R16](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/)

- **T1567 — Exfiltration Over Web Service**.[R16](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/)

### Impact

- **T1485 [approx] — Data Destruction**: PYTRIC (MuddyWater attribution remains low-medium confidence).[R20](https://www.seqrite.com/blog/ung0801-tracking-threat-clusters-obsessed-with-av-icon-spoofing-targeting-israel/)

## References

[**R1**](https://www.cisa.gov/news-events/cybersecurity-advisories/aa22-055a)CISA/FBI/NSA/USCYBERCOM/NCSC-UK.*Iranian Government-Sponsored Actors Conduct Cyber Operations Against Global Government and Commercial Networks (AA22–055A).*February 24, 2022.
[https://www.cisa.gov/news-events/cybersecurity-advisories/aa22-055a](https://www.cisa.gov/news-events/cybersecurity-advisories/aa22-055a)

[**R2**](https://www.cybercom.mil/Media/News/Article/2897570/iranian-intel-cyber-suite-of-malware-uses-open-source-tools/)USCYBERCOM/CNMF.*Iranian Intel Cyber Suite of Malware Uses Open Source Tools.*January 12, 2022.
[https://www.cybercom.mil/Media/News/Article/2897570/iranian-intel-cyber-suite-of-malware-uses-open-source-tools/](https://www.cybercom.mil/Media/News/Article/2897570/iranian-intel-cyber-suite-of-malware-uses-open-source-tools/)

[**R3**](https://www.ncsc.gov.uk/files/NCSC-Malware-Analysis-Report-Small-Sieve.pdf)NCSC-UK.*Malware Analysis Report: Small Sieve.*
[https://www.ncsc.gov.uk/files/NCSC-Malware-Analysis-Report-Small-Sieve.pdf](https://www.ncsc.gov.uk/files/NCSC-Malware-Analysis-Report-Small-Sieve.pdf)

[**R4**](https://www.ncsc.gov.uk/pdfs/news/joint-advisory-observes-muddywater-actors-conducting-cyber-espionage.pdf)NCSC/CISA/FBI/NSA/CYBERCOM.*Joint Advisory: MuddyWater Cyber Espionage Operations.*
[https://www.ncsc.gov.uk/pdfs/news/joint-advisory-observes-muddywater-actors-conducting-cyber-espionage.pdf](https://www.ncsc.gov.uk/pdfs/news/joint-advisory-observes-muddywater-actors-conducting-cyber-espionage.pdf)

[**R5**](https://unit42.paloaltonetworks.com/unit42-muddywater-operations-in-lebanon-and-oman/)Unit 42 / Palo Alto Networks.*Threat Group Behind Wave of Espionage Attacks*(first public MuddyWater documentation, November 2017).
[https://unit42.paloaltonetworks.com/unit42-muddywater-operations-in-lebanon-and-oman/](https://unit42.paloaltonetworks.com/unit42-muddywater-operations-in-lebanon-and-oman/)

[**R6**](https://attack.mitre.org/groups/G0069/)MITRE ATT&CK.*G0069 — MuddyWater.*
[https://attack.mitre.org/groups/G0069/](https://attack.mitre.org/groups/G0069/)

[**R7**](https://learn.microsoft.com/en-us/unified-secops/microsoft-threat-actor-naming)Microsoft Security.*Threat actor naming taxonomy*(Mango Sandstorm).
[https://learn.microsoft.com/en-us/unified-secops/microsoft-threat-actor-naming](https://learn.microsoft.com/en-us/unified-secops/microsoft-threat-actor-naming)

[**R8**](https://www.microsoft.com/en-gb/security/security-insider/intelligence-reports/iran-surges-cyber-enabled-influence-operations-in-support-of-hamas/)Microsoft Threat Intelligence.*Iran surges cyber-enabled influence operations in support of Hamas.*
[https://www.microsoft.com/en-gb/security/security-insider/intelligence-reports/iran-surges-cyber-enabled-influence-operations-in-support-of-hamas/](https://www.microsoft.com/en-gb/security/security-insider/intelligence-reports/iran-surges-cyber-enabled-influence-operations-in-support-of-hamas/)

[**R9**](https://blog.talosintelligence.com/iranian-supergroup-muddywater/)Cisco Talos.*Iranian supergroup MuddyWater.*
[https://blog.talosintelligence.com/iranian-supergroup-muddywater/](https://blog.talosintelligence.com/iranian-supergroup-muddywater/)

[**R10**](https://www.proofpoint.com/uk/blog/threat-insight/security-brief-ta450-uses-embedded-links-pdf-attachments-latest-campaign)Proofpoint.*Security Brief: TA450 uses embedded links in PDF attachments.*2024.
[https://www.proofpoint.com/uk/blog/threat-insight/security-brief-ta450-uses-embedded-links-pdf-attachments-latest-campaign](https://www.proofpoint.com/uk/blog/threat-insight/security-brief-ta450-uses-embedded-links-pdf-attachments-latest-campaign)

[**R11**](https://harfanglab.io/insidethelab/muddywater-rmm-campaign/)HarfangLab.*MuddyWater’s latest campaign: from phishing to persistence through RMM abuse.*April 2024.
[https://harfanglab.io/insidethelab/muddywater-rmm-campaign/](https://harfanglab.io/insidethelab/muddywater-rmm-campaign/)

[**R12**](https://www.cisa.gov/news-events/cybersecurity-advisories/aa24-241a)CISA.*Iran-based cyber actors conduct cyber operations against multiple US critical infrastructure sectors (AA24–241A).*2024.
[https://www.cisa.gov/news-events/cybersecurity-advisories/aa24-241a](https://www.cisa.gov/news-events/cybersecurity-advisories/aa24-241a)

[**R13**](https://www.group-ib.com/blog/muddywater-infrastructure-malware/)Group-IB.*Tracking MuddyWater in Action: Infrastructure, Malware and Operations during 2025.*September 30, 2025.
[https://www.group-ib.com/blog/muddywater-infrastructure-malware/](https://www.group-ib.com/blog/muddywater-infrastructure-malware/)

[**R14**](https://research.checkpoint.com/2024/new-bugsleep-backdoor-deployed-in-recent-muddywater-campaigns/)Check Point Research.*New BugSleep Backdoor Deployed in Recent MuddyWater Campaigns.*July 15, 2024.
[https://research.checkpoint.com/2024/new-bugsleep-backdoor-deployed-in-recent-muddywater-campaigns/](https://research.checkpoint.com/2024/new-bugsleep-backdoor-deployed-in-recent-muddywater-campaigns/)

[**R15**](https://blog.sekoia.io/muddywater-replaces-atera-by-custom-muddyrot-implant-in-a-recent-campaign/)Sekoia TDR.*MuddyWater replaces Atera by custom MuddyRot implant in a recent campaign.*July 2024.
[https://blog.sekoia.io/muddywater-replaces-atera-by-custom-muddyrot-implant-in-a-recent-campaign/](https://blog.sekoia.io/muddywater-replaces-atera-by-custom-muddyrot-implant-in-a-recent-campaign/)

[**R16**](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/)ESET Research.*MuddyWater: Snakes by the riverbank.*December 2, 2025.
[https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/](https://www.welivesecurity.com/en/eset-research/muddywater-snakes-riverbank/)

[**R17**](https://cloud.google.com/blog/topics/threat-intelligence/threat-actor-usage-of-ai-tools)Google Threat Intelligence Group.*Adversarial misuse of generative AI.*2024.
[https://cloud.google.com/blog/topics/threat-intelligence/threat-actor-usage-of-ai-tools](https://cloud.google.com/blog/topics/threat-intelligence/threat-actor-usage-of-ai-tools)

[**R18**](https://www.group-ib.com/blog/muddywater-espionage/)Group-IB.*MuddyWater Phoenix Backdoor Campaign (October 2025).*
[https://www.group-ib.com/blog/muddywater-espionage/](https://www.group-ib.com/blog/muddywater-espionage/)

[**R19**](https://www.cloudsek.com/blog/reborn-in-rust-muddywater-evolves-tooling-with-rustywater-implant)CloudSEK TRIAD.*Reborn in Rust: Muddy Water Evolves Tooling with RustyWater Implant.*January 9, 2026.
[https://www.cloudsek.com/blog/reborn-in-rust-muddywater-evolves-tooling-with-rustywater-implant](https://www.cloudsek.com/blog/reborn-in-rust-muddywater-evolves-tooling-with-rustywater-implant)

[**R20**](https://www.seqrite.com/blog/ung0801-tracking-threat-clusters-obsessed-with-av-icon-spoofing-targeting-israel/)Seqrite Labs APT Team.*UNG0801: Tracking Threat Clusters Obsessed with AV Icon Spoofing Targeting Israel (PYTRIC + RUSTRIC / Operation IconCat).*December 21, 2025.
[https://www.seqrite.com/blog/ung0801-tracking-threat-clusters-obsessed-with-av-icon-spoofing-targeting-israel/](https://www.seqrite.com/blog/ung0801-tracking-threat-clusters-obsessed-with-av-icon-spoofing-targeting-israel/)

[**R21**](https://www.group-ib.com/blog/muddywater-operation-olalampo/)Group-IB.*Operation Olalampo: Inside MuddyWater’s Latest Campaign.*February 20, 2026.
[https://www.group-ib.com/blog/muddywater-operation-olalampo/](https://www.group-ib.com/blog/muddywater-operation-olalampo/)

[**R22**](https://aws.amazon.com/blogs/security/new-amazon-threat-intelligence-findings-nation-state-actors-bridging-cyber-and-kinetic-warfare/)Amazon Threat Intelligence / AWS Security.*New Amazon Threat Intelligence findings: Nation-state actors bridging cyber and kinetic warfare.*CYBERWARCON, published November 19, 2025.
[https://aws.amazon.com/blogs/security/new-amazon-threat-intelligence-findings-nation-state-actors-bridging-cyber-and-kinetic-warfare/](https://aws.amazon.com/blogs/security/new-amazon-threat-intelligence-findings-nation-state-actors-bridging-cyber-and-kinetic-warfare/)

[**R23**](https://unit42.paloaltonetworks.com/threat-actor-groups-tracked-by-palo-alto-networks-unit-42/)Unit 42 / Palo Alto Networks.*Threat Actor Groups Tracked by Palo Alto Networks Unit 42*(Boggy Serpens profile, updated August 2025).
[https://unit42.paloaltonetworks.com/threat-actor-groups-tracked-by-palo-alto-networks-unit-42/](https://unit42.paloaltonetworks.com/threat-actor-groups-tracked-by-palo-alto-networks-unit-42/)

[**R24**](https://www.trendmicro.com/en_us/research/21/c/earth-vetala---muddywater-continues-to-target-organizations-in-t.html)Trend Micro Research.*Earth Vetala — MuddyWater Continues to Target Organizations in the Middle East.*March 5, 2021.
[https://www.trendmicro.com/en_us/research/21/c/earth-vetala---muddywater-continues-to-target-organizations-in-t.html](https://www.trendmicro.com/en_us/research/21/c/earth-vetala---muddywater-continues-to-target-organizations-in-t.html)

[**R25**](https://www.secureworks.com/research/threat-profiles/cobalt-ulster)Secureworks CTU.*COBALT ULSTER Threat Profile.*
[https://www.secureworks.com/research/threat-profiles/cobalt-ulster](https://www.secureworks.com/research/threat-profiles/cobalt-ulster)

[**R26**](https://cyberthint.io/updated-muddywater-analysis-2025/)Cyberthint.*Updated MuddyWater Analysis 2025: Compromised Mail Accounts and New Tooling.*October 2025.
[https://cyberthint.io/updated-muddywater-analysis-2025/](https://cyberthint.io/updated-muddywater-analysis-2025/)

*Evidence cutoff: March 7, 2026 (UTC). All sources are publicly available. This is an open-source intelligence analysis product. Reliability labels [Observed], [Reported], [Observed/Reported], [Assessed], [Partially Corroborated], and [Claimed] are used throughout; [single-source primary reporting] is applied as an additional evidentiary caveat where relevant.*

*Disclaimer: Do not use information marked as [single-source primary reporting], [Partially Corroborated], or with Low-Medium confidence as the sole basis for legal, policy, or regulatory attribution statements.*
