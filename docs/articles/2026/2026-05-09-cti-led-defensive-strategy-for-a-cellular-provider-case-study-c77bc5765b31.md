---
title: "CTI-Led Defensive Strategy for a Cellular Provider (Case Study)"
description: "A full end-to-end practitioner guide for telecom core, cloud-native operations, SOC/NOC, identity, third-party access, and executive\u2026"
image: "https://cdn-images-1.medium.com/max/800/1*rJhQNIYp8Kpj1Acwmljrhg.png"
---

# CTI-Led Defensive Strategy for a Cellular Provider (Case Study)


<img src="https://cdn-images-1.medium.com/max/800/1*rJhQNIYp8Kpj1Acwmljrhg.png" alt="Cover image" width="2752" height="1536" loading="eager" fetchpriority="high" decoding="async" />

:::info Article Metadata
- **Category:** CTI
- **Source article:** [https://medium.com/@1200km/cti-led-defensive-strategy-for-a-cellular-provider-case-study-c77bc5765b31](https://medium.com/@1200km/cti-led-defensive-strategy-for-a-cellular-provider-case-study-c77bc5765b31)
- **Published:** 2026-05-09
- **Preserved media:** 20 image(s), including cover images, screenshots, diagrams, and infographics where present.
- **Preserved technical blocks:** 53 code/configuration block(s).
:::

## Ecosystem Fit

This page mirrors the original Medium article into the 1200km.com Docusaurus ecosystem. The original article flow, images, screenshots, infographics, and technical blocks are preserved from the export.

### A full end-to-end practitioner guide for telecom core, cloud-native operations, SOC/NOC, identity, third-party access, and executive decision support

**Status:**Fictional case study based on public reporting
**Handling:**Public / educational
**Audience:**CTI analysts, SOC leads, NOC leads, cloud security, identity teams, telecom core engineers, security architects, incident commanders, and executives

<img src="https://cdn-images-1.medium.com/max/800/1*rJhQNIYp8Kpj1Acwmljrhg.png" alt="Article image" width="2752" height="1536" loading="lazy" decoding="async" />

## Table of Contents

- **Executive Summary**

- **How to Read This Guide**

- **Scope, Assumptions, and Limitations**

- **Evidence and Risk Model**

- **Fictional Operating Model: MagenCell**

- **The Strategic Threat Model**

- **Public Case Evidence That Drives the Strategy**

- **Actor and Case Applicability Notes**

- **Strategic Takeaway**

- **Public Reporting Timeline Used for Analytic Context**

- **The CTI-Led Defensive Strategy**

- **Step 1: Define the Decisions Before Collecting More Data**

- **Step 2: Define Crown Jewels as Adversary Objectives**

- **Step 3: Build the Telecom-Specific Attack Surface**

- **Step 4: Build a Collection Plan Before Buying More Tools**

- **Step 5: Convert Public Reporting Into Defensible Threat Models**

- **Step 6: Build a Threat-Informed Detection Backlog**

- **ATT&CK Mapping Guardrails**

- **Step 7: Build a 30/60/90-Day Hunt Program**

- **Step 8: Map Kill Chain Phases to Defensive Actions**

- **Step 9: Use the Diamond Model for Telecom Events**

- **Step 10: Run ACH for the High-Consequence Scenarios**

- **Step 11: Build the Tactical Detection Handoff**

- **Step 12: Build Three Incident Playbooks**

- **Governance: Make CTI the Operating Layer**

- **Metrics That Matter**

- **Templates**

- **Customer Delivery Appendix****(From CTI to Operational Defense)
**Example SIEM Queries
IOC and Sandbox Output Analysis Example
TIP to SIEM Workflow
Customer Workshop Format
Before and After Example

- **Final 90-Day Implementation Plan**

- **References**

## Executive Summary

This is a flagship CTI-informed defensive strategy case study for a fictional Israeli cellular provider,**MagenCell**. It is not an incident attribution report, actor-specific assessment, or generic cybersecurity checklist. The defensive strategy below is built from public reporting on real attacks against telecommunications providers and adjacent critical infrastructure, then translated into an intelligence-led defense program for a modern cellular operator with:

- cloud-native centralized management;

- telecom core and roaming/interconnect exposure;

- public web and customer API assets;

- IT, finance, HR, SOC, and NOC environments;

- SIEM, EDR, WAF, IDS/IPS, firewalls, cloud platforms, Kubernetes, identity systems, and third-party access.

The core assessment is deliberately scoped:

**We assess that MagenCell’s priority defensive scenario is not simple website defacement or commodity malware. The priority scenario is a long-dwell intrusion that uses network devices, identity, third-party access, telecom-specific protocols, or cloud management paths to reach subscriber data, management planes, core network functions, lawful-intercept-sensitive systems, billing, or service availability. Confidence: moderate.**

This assessment is informed by public cases. It is not based on public evidence that MagenCell exists or has been directly targeted:

- U.S. government reporting states that PRC-affiliated activity publicly tracked as Salt Typhoon compromised multiple U.S. telecommunications companies and leveraged access into those networks to target victims globally, leading CISA, NSA, FBI, and partners to publish communications-infrastructure hardening guidance[[1]](https://www.cisa.gov/resources-tools/resources/enhanced-visibility-and-hardening-guidance-communications-infrastructure),[[2]](https://www.fbi.gov/file-repository/cyber-alerts/enhanced-visibility-and-hardening-guidance-for-communications-infrastructure.pdf/view),[[3]](https://www.fbi.gov/investigate/cyber/alerts/2025/fbi-seeking-tips-about-prc-targeting-of-us-telecommunications).

- CrowdStrike reported separate telecom-focused activity sets relevant to this strategy: LightBasin, publicly described in 2021 as telecom-focused activity using sector-specific protocols and tools, and LIMINAL PANDA, separately discussed by CrowdStrike with telecom-specific collection objectives. CrowdStrike has not publicly confirmed that LightBasin and LIMINAL PANDA are the same cluster. LIMINAL PANDA’s intelligence-collection motivation is assessed with high confidence, while its China-nexus attribution is low confidence[[4]](https://www.crowdstrike.com/en-us/blog/liminal-panda-telecom-sector-threats/),[[33]](https://www.crowdstrike.com/en-us/blog/an-analysis-of-lightbasin-telecommunications-attacks/).

- Cybereason’s Operation Soft Cell reporting described an espionage campaign against telecommunications providers where subscriber and call-detail data were of interest; attribution in that report should be treated as vendor assessment, not independently confirmed attribution[[5]](https://www.cybereason.com/blog/research/operation-soft-cell-a-worldwide-campaign-against-telecommunications-providers),[[28]](https://www.cybereason.com/press/cybereason-uncovers-massive-state-sponsored-espionage-operation-leveraging-privately-owned-critical-infrastructure-companies).

- Kyivstar’s December 2023 cyberattack disrupted mobile, fixed, SMS, roaming, and other services, showing that telecom cyber incidents can become national resilience events[[12]](https://www.sec.gov/Archives/edgar/data/1468091/000146809123000114/kyivstarnetworktrgted_12.htm),[[13]](https://www.sec.gov/Archives/edgar/data/2062440/000206244026000006/R32.htm),[[34]](https://www.veon.com/newsroom/press-releases/kyivstar-completes-preliminary-assessment-of-the-financial-impact-of-the-cyberattack),[[35]](https://www.veon.com/newsroom/press-releases/kyivstar-restores-services-in-all-categories-brings-99-of-mobile-network-back-on-air).

- Microsoft reported destructive activity enabled by MERCURY, now tracked as Mango Sandstorm, with DEV-1084 / Storm-1084 activity in the operation, affecting both on-premises and cloud resources, including hybrid identity paths such as Microsoft Entra Connect, formerly Azure AD Connect[[7]](https://www.microsoft.com/en-us/security/blog/2023/04/07/mercury-and-dev-1084-destructive-attack-on-hybrid-environment/).

- CISA and partners warned that Iran-based actors target organizations aligned with Iranian state interests, including organizations in Israel, and may abuse cloud service accounts after compromise[[10]](https://www.cisa.gov/news-events/cybersecurity-advisories/aa24-241a).

- CISA’s CyberAv3ngers advisory described IRGC-affiliated targeting of Israeli-made Unitronics PLCs and systems with Israeli affiliation. This is an ICS/OT case, not a telecom case; it supports the narrower judgment that Israel-linked technology can become symbolically attractive to Iranian-aligned actors[[11]](https://www.cisa.gov/sites/default/files/2024-12/aa23-335a-irgc-affiliated-cyber-actors-exploit-plcs-in-multiple-sectors.pdf).

- Mandiant reported China-nexus UNC3886 tradecraft against Fortinet and VMware technologies, including stealthy persistence in virtualized environments and a focus on environments where EDR is difficult to deploy[[6]](https://cloud.google.com/blog/topics/threat-intelligence/chinese-espionage-tactics/),[[29]](https://cloud.google.com/blog/topics/threat-intelligence/chinese-vmware-exploitation-since-2021/).

The defensive answer is to make CTI the operating layer that connects strategy, engineering, detection, hunting, incident response, and executive risk decisions. CTI should not be a PDF factory or an IOC feed. It should be the function that turns threat reporting into prioritized defensive action.

**Analytic separation:**

- **Reported:**public sources describe telecom espionage, telecom service disruption, hybrid-cloud destructive activity, Israeli-narrative cyber activity, and appliance/virtualization tradecraft.

- **Assessed by source:**vendors and governments assign actor labels and motivations with different confidence levels; this article preserves those distinctions.

- **Inferred here:**MagenCell should prioritize long-dwell telecom espionage and destructive management-plane compromise because those scenarios combine plausible likelihood with very high impact.

- **Caveat:**no public source cited here shows direct targeting of MagenCell or proves that any named actor intends to target Israeli cellular infrastructure.

## How to Read This Guide

<img src="https://cdn-images-1.medium.com/max/800/1*2YDuJLXdHXFXdSURL1rX9A.png" alt="Article image" width="1536" height="1024" loading="lazy" decoding="async" />

- **Intelligence requirements:**every workstream maps to a decision.

- **Data -&gt; information -&gt; intelligence:**raw logs do not become intelligence until analyzed for a consumer and action.

- **Kill Chain:**organize adversary activity from preparation through impact[[23]](https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-kill-chain.html),[[24]](https://www.lockheedmartin.com/content/dam/lockheed-martin/rms/documents/cyber/LM-White-Paper-Intel-Driven-Defense.pdf).

- **Diamond Model:**connect adversary, infrastructure, capability, and victim[[25]](https://www.activeresponse.org/wp-content/uploads/2013/07/diamond.pdf).

- **ACH:**test competing explanations instead of defending a favorite theory[[26]](https://www.cia.gov/resources/csi/static/Tradecraft-Primer-apr09.pdf).

- **Pyramid of Pain:**prioritize durable behavior over fragile IOCs[[22]](https://www.threathunting.net/files/A%20Framework%20for%20Cyber%20Threat%20Hunting%20Part%201_%20The%20Pyramid%20of%20Pain%20_%20Sqrrl.pdf).

- **ATT&CK:**use behavioral vocabulary carefully; mapping is not attribution[[20]](https://attack.mitre.org/),[[21]](https://www.mitre.org/focus-areas/cybersecurity/mitre-attack).

- **Confidence language:**separate evidence strength from probability[[27]](https://www.cia.gov/resources/csi/studies-in-intelligence/archives/vol-8-no-4/words-of-estimative-probability/).

- **Source discipline:**distinguish observed telemetry, vendor reporting, government attribution, and analyst inference.

- **Dissemination:**tactical, operational, and strategic consumers need different outputs from the same analysis.

## Scope, Assumptions, and Limitations

This article is a CTI-informed defensive strategy paper. It is not a formal CTI report, incident report, legal attribution product, or regulator-ready risk assessment.

The scenario is fictional. This article presents no public evidence that a company named MagenCell exists, that a specific Israeli cellular provider has been targeted by the named actors, or that any cited public case maps directly onto Israeli telecom infrastructure. The analysis uses public telecom, Israel-related, cloud, hybrid-identity, appliance, and critical-infrastructure cases as analogues to derive plausible defensive priorities.

The Israel-specific logic is therefore bounded:

- **Reported:**Microsoft and CISA describe Iranian and Iran-affiliated cyber and influence activity connected to Israel-related narratives[[8]](https://blogs.microsoft.com/on-the-issues/2024/02/06/iran-accelerates-cyber-ops-against-israel/),[[9]](https://www.cisa.gov/topics/cyber-threats-and-advisories/advanced-persistent-threats/iran),[[10]](https://www.cisa.gov/news-events/cybersecurity-advisories/aa24-241a),[[30]](https://www.gov.il/BlobFolder/reports/publish_2412/en/report2412en.pdf).

- **Reported:**CISA describes IRGC-affiliated CyberAv3ngers targeting Israeli-made Unitronics PLCs[[11]](https://www.cisa.gov/sites/default/files/2024-12/aa23-335a-irgc-affiliated-cyber-actors-exploit-plcs-in-multiple-sectors.pdf).

- **Reported:**Israel has national cyber-defense and communications-sector cyber functions, including CERT-IL and a Communications Sector Cyber Defense Unit in the Ministry of Communications[[31]](https://www.gov.il/he/departments/units/unit_cert_il),[[32]](https://www.gov.il/en/departments/Units/arc).

- **Assessed:**Israeli cellular providers are plausible targets during geopolitical tension because telecoms combine national resilience, subscriber metadata, public trust, emergency communications, and symbolic value.

- **Caveat:**The cited public evidence supports defensive prioritization by analogy. It does not prove direct targeting of Israeli cellular infrastructure by the named public cases.

- **Caveat:**The Iron Swords cyber report is used here for broad Israel-related cyber context; this article does not extract telecom-specific actor targeting from it[[30]](https://www.gov.il/BlobFolder/reports/publish_2412/en/report2412en.pdf).

- **Caveat:**The Israel-specific evidence is strongest for cyber and influence pressure against Israeli entities generally, not for cellular-provider-specific targeting.

## Evidence and Risk Model

<img src="https://cdn-images-1.medium.com/max/800/1*y8m__rA2GbdFYi8ViBJurQ.png" alt="Article image" width="1024" height="1536" loading="lazy" decoding="async" />

**This article uses these evidence labels:**

- **Reported:**stated by a public source.

- **Assessed by source:**analytic judgment made by a cited vendor, government, or researcher.

- **Inferred here:**analytic judgment made in this article from public evidence.

- **Caveat:**limitation or alternate explanation that prevents overclaiming.

**Confidence language is plain-language only:**

- **High confidence:**strong public evidence, short inference chain, and multiple credible sources or direct source access.

- **Moderate confidence:**credible public reporting, but sector-level evidence, analogical transfer, or incomplete visibility.

- **Low confidence:**plausible but thinly sourced inference.

**Likelihood and impact use these working anchors:**

Likelihood is estimated from public sector targeting, technical feasibility, exposure class, and relevance to MagenCell’s assumed architecture; it is not a statistical forecast.

- **Low likelihood:**plausible but no sector-level or victim-relevant public reporting in the last five years.

- **Medium likelihood:**credible sector-level public reporting, but no victim-specific evidence for MagenCell.

- **High likelihood:**recurring sector-level activity plus victim-specific exposure, targeting, or partner reporting.

- **Low/medium impact:**limited customer, internal IT, or reputational effect; no sustained telecom service degradation.

- **Medium/high impact:**material customer, regulatory, financial, or operational effect; recoverable without prolonged national-scale disruption.

- **Very high impact:**national resilience, emergency communications, core network, lawful-intercept-sensitive, mass subscriber-data, or prolonged service-availability consequences.

These are not actuarial probabilities. They are sector-level planning anchors for a fictional case. Confidence would increase only with victim-specific telemetry, partner reporting, regulator reporting, or incident evidence.

<img src="https://cdn-images-1.medium.com/max/800/1*5MLZXbuZOoPJqxVxxr2VNQ.png" alt="Article image" width="1536" height="1024" loading="lazy" decoding="async" />

This matrix is why the article prioritizes long-dwell telecom espionage and destructive management-plane compromise. Commodity incidents may be more frequent, but the telecom-specific scenarios create higher strategic risk.

## Fictional Operating Model: MagenCell

<img src="https://cdn-images-1.medium.com/max/800/1*Lznmp5imSn1Qz_BI5T1XKw.png" alt="Article image" width="1024" height="1536" loading="lazy" decoding="async" />

MagenCell is a fictional Israeli mobile network operator with nationwide 4G/5G services and business connectivity products. It operates:

- **Telecom core:**4G EPC and 5G core components, IMS/VoLTE, HSS/UDM/AUSF/AMF/SMF/UPF/PCF, subscriber databases, roaming/interconnect systems, DNS, SMSC/MMSC, lawful-intercept-sensitive platforms, mediation systems, billing, and CDR pipelines.

- **Centralized management:**cloud-native network management, orchestration, inventory, CI/CD, IaC, Kubernetes, and vendor-management portals.

- **Enterprise IT:**identity provider, email, finance, HR, CRM, ticketing, endpoint fleet, privileged access, document platforms, developer systems.

- **Security stack:**SOC, NOC, SIEM, EDR, WAF, IDS/IPS, NDR, firewalls, cloud security tooling, Kubernetes admission/audit controls, IAM/PAM, vulnerability management, backup and recovery platforms.

- **External exposure:**public web assets, customer apps, APIs, B2B portals, dealer portals, third-party vendor VPNs, managed-service access, cloud consoles, and roaming/interconnect links.

The business mission is not “secure everything equally.” The mission is:

**Keep Israel-connected subscribers, emergency communications, enterprise customers, and national connectivity services available and trustworthy under espionage, destructive, criminal, and influence-driven pressure.**

## The Strategic Threat Model

MagenCell should plan around four threat families.

<img src="https://cdn-images-1.medium.com/max/800/1*-4TARXqKfvnIdYRvCxz-cw.png" alt="Article image" width="1024" height="1536" loading="lazy" decoding="async" />

### 1. State-aligned telecom espionage

Public reporting on Salt Typhoon, LightBasin, LIMINAL PANDA, and Operation Soft Cell shows that telecom operators are attractive intelligence targets[[1]](https://www.cisa.gov/resources-tools/resources/enhanced-visibility-and-hardening-guidance-communications-infrastructure),[[4]](https://www.crowdstrike.com/en-us/blog/liminal-panda-telecom-sector-threats/),[[5]](https://www.cybereason.com/blog/research/operation-soft-cell-a-worldwide-campaign-against-telecommunications-providers),[[28]](https://www.cybereason.com/press/cybereason-uncovers-massive-state-sponsored-espionage-operation-leveraging-privately-owned-critical-infrastructure-companies),[[33]](https://www.crowdstrike.com/en-us/blog/an-analysis-of-lightbasin-telecommunications-attacks/). LightBasin and LIMINAL PANDA are treated here as separate reported activity sets. The target is often not the website. The target is subscriber metadata, call-detail records, network topology, lawful-intercept-sensitive systems, core network management, interconnects, and the ability to observe communications relationships.

**MagenCell assessment:**Moderate confidence that subscriber metadata, VIP targeting information, lawful-intercept-sensitive workflows, core network management, and roaming/interconnect infrastructure represent priority intelligence targets based on sector-level public reporting. Confidence would increase with victim-specific targeting evidence, partner threat intelligence, or internal telemetry.

**Defensive implication:**prioritize visibility into network devices, telecom protocol gateways, identity paths, privileged sessions, and data access patterns over commodity IOC blocking alone.

### 2. Destructive or disruptive operations during geopolitical tension

Kyivstar demonstrated that a telecom cyberattack can disrupt mobile, fixed, SMS, roaming, and customer services at national scale[[12]](https://www.sec.gov/Archives/edgar/data/1468091/000146809123000114/kyivstarnetworktrgted_12.htm),[[13]](https://www.sec.gov/Archives/edgar/data/2062440/000206244026000006/R32.htm),[[34]](https://www.veon.com/newsroom/press-releases/kyivstar-completes-preliminary-assessment-of-the-financial-impact-of-the-cyberattack),[[35]](https://www.veon.com/newsroom/press-releases/kyivstar-restores-services-in-all-categories-brings-99-of-mobile-network-back-on-air). Microsoft reporting on MERCURY / Mango Sandstorm and DEV-1084 / Storm-1084 shows destructive activity can move across on-premises and cloud resources and masquerade as ransomware[[7]](https://www.microsoft.com/en-us/security/blog/2023/04/07/mercury-and-dev-1084-destructive-attack-on-hybrid-environment/).

**MagenCell assessment:**Moderate confidence that an Israeli cellular provider must prepare for destructive pressure during geopolitical escalation, including wiper-like activity, cloud resource destruction, backup targeting, and public influence narratives. Confidence is moderate because Kyivstar and MERCURY / Mango Sandstorm plus DEV-1084 / Storm-1084 reporting show feasibility and impact, but not intent against MagenCell.

**Defensive implication:**recovery architecture, privileged-access control, immutable backups, management-plane segmentation, and crisis communications are strategic controls, not compliance extras.

### 3. Identity and third-party compromise

Telecom operations rely heavily on vendors, managed services, roaming partners, integrators, outsourced support, cloud providers, and privileged engineering access. Public reporting across telecom and hybrid-cloud incidents repeatedly shows that attackers exploit identity, exposed appliances, unpatched internet-facing systems, and trusted access paths[[1]](https://www.cisa.gov/resources-tools/resources/enhanced-visibility-and-hardening-guidance-communications-infrastructure),[[6]](https://cloud.google.com/blog/topics/threat-intelligence/chinese-espionage-tactics/),[[7]](https://www.microsoft.com/en-us/security/blog/2023/04/07/mercury-and-dev-1084-destructive-attack-on-hybrid-environment/).

**MagenCell assessment:**Moderate confidence that identity and third-party access are among the most probable initial or enabling paths into MagenCell. The evidence supports technical plausibility and broad sector relevance, but not actor-specific intent against MagenCell.

**Defensive implication:**every third-party path should be treated as an intelligence collection source and a potential intrusion path. “Vendor access” must become monitored, time-bound, behavior-modeled access.

### 4. Influence-amplified cyber activity against Israeli entities

Microsoft and CISA reporting show Iranian and Iran-affiliated actors combining cyber activity with influence operations, especially around Israel-related narratives[[8]](https://blogs.microsoft.com/on-the-issues/2024/02/06/iran-accelerates-cyber-ops-against-israel/),[[9]](https://www.cisa.gov/topics/cyber-threats-and-advisories/advanced-persistent-threats/iran),[[10]](https://www.cisa.gov/news-events/cybersecurity-advisories/aa24-241a),[[30]](https://www.gov.il/BlobFolder/reports/publish_2412/en/report2412en.pdf). CyberAv3ngers’ focus on Israeli-made PLCs illustrates how symbolic Israeli affiliation can shape victim selection, but it does not demonstrate telecom targeting[[11]](https://www.cisa.gov/sites/default/files/2024-12/aa23-335a-irgc-affiliated-cyber-actors-exploit-plcs-in-multiple-sectors.pdf).

**MagenCell assessment:**Moderate confidence that even low-sophistication incidents against MagenCell could be amplified as strategic influence events.

**Defensive implication:**CTI must support legal, communications, customer-care, SOC, and executive teams with fast truth maintenance: what happened, what did not happen, what is unknown, and what language should not be used.

## Public Case Evidence That Drives the Strategy

The cases below are not used as perfect analogies for MagenCell. They are used as public evidence to define threat-informed defensive priorities for a modern telecom operator.

### 1. Salt Typhoon / PRC Telecom Compromises

U.S. government reporting states that PRC-affiliated cyber activity compromised multiple U.S. telecommunications companies and used telecom access to target victims globally[[1]](https://www.cisa.gov/resources-tools/resources/enhanced-visibility-and-hardening-guidance-communications-infrastructure),[[2]](https://www.fbi.gov/file-repository/cyber-alerts/enhanced-visibility-and-hardening-guidance-for-communications-infrastructure.pdf/view),[[3]](https://www.fbi.gov/investigate/cyber/alerts/2025/fbi-seeking-tips-about-prc-targeting-of-us-telecommunications).

**Attack description:**
This case shows how telecom infrastructure itself can become an intelligence platform. The reported activity was not limited to ordinary IT compromise. The strategic value came from access to communications infrastructure, network devices, subscriber-related paths, and systems that can support surveillance or victim targeting.

**Defensive lesson for MagenCell:**
Treat routers, network devices, AAA infrastructure, logs, management planes, and lawful-intercept-sensitive paths as intelligence priorities — not only as operational IT assets.

### 2. LightBasin

CrowdStrike reported telecom-focused activity involving sector-specific protocols and tools, including GPRS-related paths and custom tooling for Linux and Solaris-like environments[[33]](https://www.crowdstrike.com/en-us/blog/an-analysis-of-lightbasin-telecommunications-attacks/).

**Attack description:**
LightBasin demonstrates the danger of adversaries that understand telecom architecture, not just enterprise IT. The reported activity focused on interconnects, roaming-related infrastructure, telecom protocols, and trust relationships between operators.

**Defensive lesson for MagenCell:**
Hunt across telecom-specific protocols, interconnects, Linux/Solaris-like infrastructure, roaming paths, and cross-operator trust relationships.

### 3. LIMINAL PANDA

CrowdStrike reported telecom-focused activity involving telecom protocols and tooling associated with subscriber information, call metadata, and SMS-related data. The China-nexus attribution was assessed with low confidence and should not be collapsed into the behavioral reporting[[4]](https://www.crowdstrike.com/en-us/blog/liminal-panda-telecom-sector-threats/).

**Attack description:**
This case highlights behavior that is highly relevant to telecom defense: collection of subscriber data, call metadata, and messaging-related information. The important lesson is not only “who did it,” but what the activity targeted and how telecom-specific access can be abused.

**Defensive lesson for MagenCell:**
Hunt for telecom-specific collection patterns while keeping actor attribution separate from observed behavior.

### 4. Operation Soft Cell

Cybereason reported a long-running espionage campaign against telecom providers, with apparent interest in subscriber information and CDR-like data. Actor linkage should be treated as vendor-assessed, not as independently proven fact[[5]](https://www.cybereason.com/blog/research/operation-soft-cell-a-worldwide-campaign-against-telecommunications-providers),[[28]](https://www.cybereason.com/press/cybereason-uncovers-massive-state-sponsored-espionage-operation-leveraging-privately-owned-critical-infrastructure-companies).

**Attack description:**
Operation Soft Cell is a strong example of telecom espionage focused on subscriber-level intelligence. The reported campaign shows why databases, billing systems, CDR pipelines, and subscriber-management platforms may be more valuable to an adversary than public-facing web assets.

**Defensive lesson for MagenCell:**
Monitor unusual access to subscriber metadata, CDR pipelines, HLR/HSS/UDM systems, billing platforms, and privileged database queries.

### 5. Kyivstar Cyberattack

Public filings and VEON reporting describe a major service disruption caused by a cyberattack against Kyivstar, a national telecom provider[[12]](https://www.sec.gov/Archives/edgar/data/1468091/000146809123000114/kyivstarnetworktrgted_12.htm),[[13]](https://www.sec.gov/Archives/edgar/data/2062440/000206244026000006/R32.htm),[[34]](https://www.veon.com/newsroom/press-releases/kyivstar-completes-preliminary-assessment-of-the-financial-impact-of-the-cyberattack),[[35]](https://www.veon.com/newsroom/press-releases/kyivstar-restores-services-in-all-categories-brings-99-of-mobile-network-back-on-air).

**Attack description:**
The Kyivstar case shows the destructive and operational side of telecom cyber risk. A successful attack against a telecom provider can affect national-scale service availability, customer trust, emergency communications, business continuity, and crisis management.

**Defensive lesson for MagenCell:**
Build recovery plans, backup integrity validation, management-plane isolation, and crisis decision playbooks before the incident occurs.

### 6. MERCURY / Mango Sandstorm and DEV-1084 / Storm-1084

Microsoft reported destructive activity across on-premises and cloud resources using highly privileged access[[7]](https://www.microsoft.com/en-us/security/blog/2023/04/07/mercury-and-dev-1084-destructive-attack-on-hybrid-environment/).

**Attack description:**
This case is important because it shows how destructive operations can move across hybrid environments. The attacker’s impact came from privileged access across identity, cloud, and on-premises systems, enabling deletion, disruption, and damage at scale.

**Defensive lesson for MagenCell:**
Protect hybrid identity, cloud administrator roles, Azure/AWS/GCP management planes, deletion controls, and backup controls as crown-jewel paths.

### 7. CyberAv3ngers / Iran-Linked Activity

CISA reported targeting of Israeli-made Unitronics PLCs by IRGC-affiliated cyber actors. This is an ICS/OT analogue, not a telecom case[[11]](https://www.cisa.gov/sites/default/files/2024-12/aa23-335a-irgc-affiliated-cyber-actors-exploit-plcs-in-multiple-sectors.pdf).

**Attack description:**
This case does not prove telecom targeting, but it is strategically relevant for an Israeli telecom company. It shows how Israeli affiliation, symbolic targets, and politically charged narratives can increase the likelihood of influence operations, defacement, disruption attempts, or public messaging around an intrusion.

**Defensive lesson for MagenCell:**
Expect symbolic targeting and influence amplification around Israeli affiliation, but do not treat this case as direct evidence of telecom-specific targeting.

### 8. UNC3886

Mandiant reported stealthy exploitation of Fortinet and VMware paths by a China-nexus actor, including targeting of telecom and other strategic sectors[[6]](https://cloud.google.com/blog/topics/threat-intelligence/chinese-espionage-tactics/),[[29]](https://cloud.google.com/blog/topics/threat-intelligence/chinese-vmware-exploitation-since-2021/).

**Attack description:**
UNC3886 demonstrates how advanced actors may target security appliances, virtualization infrastructure, and management systems that defenders often assume are trusted. The reported activity is especially relevant because it includes stealth, appliance exploitation, hypervisor access, and persistence in infrastructure layers that are difficult to monitor.

**Defensive lesson for MagenCell:**
Treat network security appliances, hypervisors, virtualization management, Fortinet/VMware paths, and appliance logs as Tier-0-like defensive priorities.

## Actor and Case Applicability Notes

Use these notes before turning public reporting into internal priority.

<img src="https://cdn-images-1.medium.com/max/800/1*IIBx7MMnzGVgFT6qlExf_g.png" alt="Article image" width="1024" height="1536" loading="lazy" decoding="async" />

**Salt Typhoon / PRC telecom activity:**strong relevance to telecom network visibility, network devices, lawful-intercept-sensitive paths, call data, and management-plane hardening. The public official reporting cited here is strongest for U.S. telecommunications compromise and global victim targeting, not direct Israeli telecom targeting[[1]](https://www.cisa.gov/resources-tools/resources/enhanced-visibility-and-hardening-guidance-communications-infrastructure),[[3]](https://www.fbi.gov/investigate/cyber/alerts/2025/fbi-seeking-tips-about-prc-targeting-of-us-telecommunications).

**LightBasin:**strong relevance to telecom-specific tradecraft, interconnects, GPRS-related paths, and Linux/Solaris-like infrastructure. Treat it as a separate reported activity set, not as confirmed lineage for LIMINAL PANDA[[33]](https://www.crowdstrike.com/en-us/blog/an-analysis-of-lightbasin-telecommunications-attacks/).

**LIMINAL PANDA:**strong relevance to telecom-specific collection objectives, including subscriber information, call metadata, SMS, and telecom protocol use. CrowdStrike assesses intelligence-collection motivation with high confidence and China-nexus attribution with low confidence. CrowdStrike has not publicly confirmed LightBasin and LIMINAL PANDA are the same cluster[[4]](https://www.crowdstrike.com/en-us/blog/liminal-panda-telecom-sector-threats/).

**Operation Soft Cell:**strong relevance to CDR and subscriber-data defense. Attribution should be written as Cybereason-assessed rather than confirmed by this article[[5]](https://www.cybereason.com/blog/research/operation-soft-cell-a-worldwide-campaign-against-telecommunications-providers),[[28]](https://www.cybereason.com/press/cybereason-uncovers-massive-state-sponsored-espionage-operation-leveraging-privately-owned-critical-infrastructure-companies).

**Kyivstar:**strong relevance to service continuity, recovery, national-scale customer impact, and crisis communications. This case supports disruptive-impact planning, not actor attribution unless separate sources are cited[[12]](https://www.sec.gov/Archives/edgar/data/1468091/000146809123000114/kyivstarnetworktrgted_12.htm),[[13]](https://www.sec.gov/Archives/edgar/data/2062440/000206244026000006/R32.htm),[[34]](https://www.veon.com/newsroom/press-releases/kyivstar-completes-preliminary-assessment-of-the-financial-impact-of-the-cyberattack),[[35]](https://www.veon.com/newsroom/press-releases/kyivstar-restores-services-in-all-categories-brings-99-of-mobile-network-back-on-air).

**MERCURY / Mango Sandstorm and DEV-1084 / Storm-1084:**strong relevance to hybrid identity, cloud destruction, backup targeting, and ransomware-like cover narratives. It is not telecom-specific, so this article uses it as a cloud/hybrid-identity destructive-path analogue[[7]](https://www.microsoft.com/en-us/security/blog/2023/04/07/mercury-and-dev-1084-destructive-attack-on-hybrid-environment/).

**CyberAv3ngers:**relevant to Israeli-affiliation symbolism and influence amplification. It is weak evidence for cellular telecom targeting because the public advisory concerns Israeli-made PLCs and ICS/OT exposure[[11]](https://www.cisa.gov/sites/default/files/2024-12/aa23-335a-irgc-affiliated-cyber-actors-exploit-plcs-in-multiple-sectors.pdf).

**UNC3886:**relevant to network appliances, hypervisors, Fortinet/VMware paths, and stealth in environments where EDR coverage is weak. It supports treating appliance and virtualization management as Tier-0-like in telecom[[6]](https://cloud.google.com/blog/topics/threat-intelligence/chinese-espionage-tactics/),[[29]](https://cloud.google.com/blog/topics/threat-intelligence/chinese-vmware-exploitation-since-2021/).

## Strategic Takeaway

These cases point to one central conclusion: a telecom defense strategy cannot focus only on endpoints, web applications, malware hashes, or commodity IOCs.

<img src="https://cdn-images-1.medium.com/max/800/1*rz02eSyrqmpAKgYMxtHdNA.png" alt="Article image" width="1024" height="1536" loading="lazy" decoding="async" />

For MagenCell, the highest-value defensive priorities are:

- telecom-specific protocols and interconnects

- subscriber metadata and CDR-like data

- lawful-intercept-sensitive workflows

- network devices and management planes

- AAA, IAM, and privileged access paths

- cloud and hybrid identity control planes

- virtualization and security appliances

- backup, recovery, and crisis decision processes

The goal is not to copy public cases one-to-one. The goal is to extract durable defensive priorities from real-world telecom, hybrid, espionage, and destructive cyber operations.

## Public Reporting Timeline Used for Analytic Context

This timeline is not a campaign timeline for MagenCell. It is a public-reporting sequence used to justify defensive priorities.

- **Approximately 2012, alleged activity start; June 2019, public report:**Cybereason published Operation Soft Cell in June 2019 and assessed, from forensic artifacts, that activity dated back to approximately 2012. The case is relevant because it involved telecom providers and interest in CDR and sensitive subscriber-related data[[5]](https://www.cybereason.com/blog/research/operation-soft-cell-a-worldwide-campaign-against-telecommunications-providers),[[28]](https://www.cybereason.com/press/cybereason-uncovers-massive-state-sponsored-espionage-operation-leveraging-privately-owned-critical-infrastructure-companies).

- **2021 onward, reported by Mandiant:**UNC3886 activity against VMware and related appliance/virtualization paths illustrates long-lived stealth in infrastructure where standard endpoint controls may be weak[[29]](https://cloud.google.com/blog/topics/threat-intelligence/chinese-vmware-exploitation-since-2021/).

- **December 2023, reported by VEON:**Kyivstar suffered a cyberattack disrupting mobile, fixed, SMS, roaming, and other services; later public reporting described restoration across service categories[[12]](https://www.sec.gov/Archives/edgar/data/1468091/000146809123000114/kyivstarnetworktrgted_12.htm),[[13]](https://www.sec.gov/Archives/edgar/data/2062440/000206244026000006/R32.htm),[[34]](https://www.veon.com/newsroom/press-releases/kyivstar-completes-preliminary-assessment-of-the-financial-impact-of-the-cyberattack),[[35]](https://www.veon.com/newsroom/press-releases/kyivstar-restores-services-in-all-categories-brings-99-of-mobile-network-back-on-air).

- **2023–2024, reported by Microsoft and CISA:**Iranian and Iran-affiliated activity against Israel-related targets and narratives increased the relevance of influence-amplified cyber scenarios[[8]](https://blogs.microsoft.com/on-the-issues/2024/02/06/iran-accelerates-cyber-ops-against-israel/),[[9]](https://www.cisa.gov/topics/cyber-threats-and-advisories/advanced-persistent-threats/iran),[[10]](https://www.cisa.gov/news-events/cybersecurity-advisories/aa24-241a),[[30]](https://www.gov.il/BlobFolder/reports/publish_2412/en/report2412en.pdf).

- **December 3, 2024, reported by CISA/FBI/NSA and partners:**U.S. government guidance on PRC telecom compromise and Salt Typhoon-style activity reinforced the need for telecom network visibility, hardening, and network-device monitoring[[1]](https://www.cisa.gov/resources-tools/resources/enhanced-visibility-and-hardening-guidance-communications-infrastructure),[[2]](https://www.fbi.gov/file-repository/cyber-alerts/enhanced-visibility-and-hardening-guidance-for-communications-infrastructure.pdf/view).

- **April 24, 2025, reported by FBI:**FBI issued a public service announcement seeking tips about PRC-affiliated Salt Typhoon activity, stating that the campaign compromised multiple U.S. telecommunications companies and leveraged access into those networks to target victims globally[[3]](https://www.fbi.gov/investigate/cyber/alerts/2025/fbi-seeking-tips-about-prc-targeting-of-us-telecommunications).

## The CTI-Led Defensive Strategy

The strategy has twelve steps. Each step creates a specific intelligence output and a specific defensive action.

## Step 1: Define the Decisions Before Collecting More Data

**Theory anchor:**CTI starts with intelligence requirements. In Sherman Kent-style analysis, intelligence serves a decision; it is not collected because it is interesting[[27]](https://www.cia.gov/resources/csi/studies-in-intelligence/archives/vol-8-no-4/words-of-estimative-probability/). A PIR is a decision-linked knowledge gap, so the first defensive move is to define what leadership, SOC, NOC, cloud, identity, and telecom-core teams must decide.

[**Applying Sherman Kent’s Analytic Discipline to CTI: A Practical Analyst Guide**
[Estimative language, evidence discipline, and analytic integrity for cyber threat intelligence](2026-05-10-applying-sherman-kent-s-analytic-discipline-to-cti-a-practical-analyst-guide-33142ad7553b.md)

Start with the decisions MagenCell needs to make. Do not start with feeds.

### PIR and SIR Definitions

FIRST’s CTI curriculum treats Priority Intelligence Requirements as decision-quality questions that should be limited, scoped to key decision points or courses of action, and continually refined as the operating environment changes[[39]](https://www.first.org/global/sigs/cti/curriculum/pir). NATO-style intelligence doctrine uses the same basic logic: PIRs express the commander’s priority intelligence needs, while Specific Intelligence Requirements support and complement each PIR with more detailed information needs that guide collection, processing, and analysis[[40]](https://coi.nato.int/EWCOI/EW%20COI%20Shared%20Documents/WGs/NEWWG/EW%20Policy%20and%20Doctrine%20Panel%20%28EWPDP%29/AJP%203.6%20-%20EW%20Doctrine/AJP-3.6%20References/20160222_NU_AJP_2%20EdA%20V2_Intelligence%2C%20counter-intelligence%20ans%20security.pdf).

**For this strategy:**

- **PIR:**the decision-level intelligence question that a senior consumer needs answered.

- **SIR:**the specific information requirement that decomposes the PIR into collectible evidence.

- **Collection task:**the concrete data request, log source, hunt query, partner question, or vendor evidence needed to answer the SIR.

**Example:**

**PIR**:
Which third-party access paths could provide privileged access to core network, cloud, Kubernetes, or management systems?

**SIRs:
**- Which vendors have standing VPN, ZTNA, PAM, or cloud-console access?
- Which vendor accounts can reach network management, Kubernetes, backup, or telecom-core support systems?
- Which vendor sessions occurred outside approved change windows in the last 90 days?
Collection tasks:
- Pull VPN/ZTNA logs for all vendor identities.
- Export PAM session records and approvals for privileged vendor sessions.
- Join vendor access events with NOC change tickets and cloud IAM role assignments.

### Priority Intelligence Requirements

Use these as the initial PIR register:

**PIR-1:**Which threat actors or activity clusters are most likely to target MagenCell’s telecom core, subscriber metadata, or management plane in the next 12 months?
**Supported decision:**investment priority for telecom-core monitoring, identity controls, and vendor-access hardening.

**PIR-2:**Which adversary TTPs reported in telecom attacks are most applicable to MagenCell’s current architecture?
**Supported decision:**detection engineering backlog and hunt plan.

**PIR-3:**Which internal systems would allow an adversary to move from IT or cloud access into telecom service impact?
**Supported decision:**segmentation, PAM, backup, and incident-containment design.

**PIR-4**: Which third-party access paths could provide privileged access to core network, cloud, Kubernetes, or management systems?
**Supported decision**: vendor-access redesign and monitoring requirements.

**PIR-5:**What would indicate that MagenCell is being targeted for espionage rather than commodity crime?
**Supported decision:**escalation threshold from SOC incident to intelligence-led incident command.

**PIR-6:**What would indicate destructive pre-positioning?
**Supported decision:**emergency containment, backup lockdown, NOC/SOC joint response, and executive notification.

**PIR-7:**What incident facts must be known within the first 24 hours to support customer, regulator, and public communications?
**Supported decision:**legal, executive, and communications response.

### Specific Intelligence Requirements

Use SIRs to turn each PIR into evidence the SOC, NOC, cloud, identity, telecom-core, legal, or communications teams can actually collect.

**PIR-1 SIRs:**likely threat actors or activity clusters
- Which public telecom-focused activity clusters have reported objectives matching subscriber metadata, call data, roaming, interconnect, or management-plane access?
- Which actors or clusters have reported interest in Israeli, Israel-linked, communications, cloud, or critical-infrastructure targets?
- Which peer telecom providers, vendors, or sector partners have reported targeting, credential theft, vulnerability exploitation, or suspicious infrastructure relevant to MagenCell?
- Which actor motivations are assessed by source as espionage, disruption, criminal profit, influence, or mixed intent?

**PIR-2 SIRs**: applicable adversary TTPs
- Which reported TTPs map to MagenCell’s actual platforms: routers, firewalls, VPNs, identity, cloud, Kubernetes, telecom-core systems, web apps, or vendor portals?
- Which techniques require telemetry MagenCell already collects, and which require new logging or partner data?
- Which TTPs are durable enough to become detection or hunt logic rather than short-lived IOC checks?
- Which ATT&CK Enterprise, Mobile, or ICS matrix applies to the observed behavior?

**PIR-3 SIRs:**paths from IT or cloud into telecom impact
- Which identities, service accounts, groups, or roles bridge enterprise IT, cloud management, Kubernetes, and telecom operations?
- Which CI/CD, IaC, orchestration, or NOC tools can push configuration or code into production telecom systems?
- Which backup, monitoring, logging, or EDR management systems could be disabled from IT or cloud access?
- Which network paths allow movement from user, server, or cloud environments into management networks or core-support systems?

**PIR-4 SIRs:**third-party access paths
- Which vendors, integrators, roaming partners, managed-service providers, or support teams have privileged access?
- Which access methods are used: VPN, ZTNA, PAM, remote desktop, SSH, cloud console, vendor portal, API key, or support tooling?
- Which vendor accounts can reach crown jewels such as network management, Kubernetes, backups, subscriber data, billing, or mediation?
- Which vendor sessions occurred outside approved support windows, from new devices, from unusual geographies, or without matching tickets?

**PIR-5 SIRs:**espionage versus commodity crime
- Is the activity focused on subscriber metadata, CDRs, VIP identifiers, roaming/interconnect, lawful-intercept-sensitive workflows, or topology rather than ordinary IT assets?
- Are queries, exports, or account changes selective and intelligence-oriented rather than broad monetization or encryption behavior?
- Is there evidence of long-dwell persistence, stealthy collection, log tampering, or quiet privilege maintenance?
- Do infrastructure, timing, targeting, or TTPs overlap with public telecom espionage reporting without forcing attribution?

**PIR-6 SIRs:**destructive pre-positioning
- Are privileged identities modifying backup retention, immutability, logging, EDR, cloud security, or recovery settings?
- Are there mass-delete tests, snapshot deletions, namespace deletions, storage changes, or automation runs inconsistent with approved change windows?
- Are cloud, Kubernetes, NOC, or network-management roles being escalated shortly before sensitive operational periods?
- Are ransomware-like artifacts accompanied by destructive sequencing, recovery inhibition, or influence-operation indicators?

**PIR-7 SIRs:**first-24-hour public and regulator facts
- Which services are confirmed affected: mobile voice, fixed voice, SMS, roaming, data, customer portal, billing, emergency communications, or enterprise services?
- Which facts are confirmed, assessed, unknown, or explicitly ruled out?
- Is there evidence of subscriber-data exposure, lawful-intercept-sensitive workflow exposure, or customer-impacting integrity loss?
- What timelines, affected systems, containment actions, customer impacts, and regulator-notification triggers can be stated without overclaiming?

### Good CTI behavior

For every PIR, define:

- the consumer;

- the decision;

- the time horizon;

- the evidence required;

- the SIRs and collection tasks;

- the confidence threshold;

- the expected action.

If no one will act on the answer, it is not a priority intelligence requirement.

<img src="https://cdn-images-1.medium.com/max/800/1*9ZHBvt8ydEi9dRlc8tiXZw.png" alt="Article image" width="1536" height="1024" loading="lazy" decoding="async" />

## Step 2: Define Crown Jewels as Adversary Objectives

**Theory anchor:**Crown-jewel analysis becomes useful only when assets are translated into adversary objectives. This is where Kent’s “so what” discipline and the Diamond Model meet: the victim feature matters because it explains why an adversary would care about a system, data set, or management plane[[25]](https://www.activeresponse.org/wp-content/uploads/2013/07/diamond.pdf),[[27]](https://www.cia.gov/resources/csi/studies-in-intelligence/archives/vol-8-no-4/words-of-estimative-probability/).

Most asset inventories describe business ownership. CTI needs a second view: why would an adversary care?

**For MagenCell, the crown jewels are:**

- **Subscriber identity and metadata:**IMSI, MSISDN, IMEI, CDRs, location-related metadata, roaming records, customer identity, VIP identifiers.

- **Telecom core functions:**HSS/UDM/AUSF, AMF/MME, SMF/PGW, UPF/SGW, PCF/PCRF, IMS/VoLTE, DNS, SMSC, mediation.

- **Management and orchestration:**network management systems, cloud management, Kubernetes clusters, CI/CD, IaC, secrets stores, vendor management portals.

- **Privileged identity:**IdP, PAM, AD/Microsoft Entra ID, service principals, Microsoft Entra Connect or equivalent sync systems, break-glass accounts, TACACS/RADIUS.

- **Network infrastructure:**routers, firewalls, VPN concentrators, load balancers, BGP/DNS, interconnects, SEPP/roaming gateways, management networks.

- **Revenue and trust systems:**billing, CRM, finance, dealer portals, SIM/eSIM provisioning, customer apps, web APIs.

- **Continuity systems:**backups, recovery orchestration, monitoring, logging, SIEM, EDR management, golden images, emergency communications workflows.

<img src="https://cdn-images-1.medium.com/max/800/1*LSQSOD0umoca0nEtZP2YJw.png" alt="Article image" width="1024" height="1536" loading="lazy" decoding="async" />

## Analyst rule

<img src="https://cdn-images-1.medium.com/max/800/1*gex7J36neb0LLHXJRTojaA.png" alt="Article image" width="1024" height="1536" loading="lazy" decoding="async" />

Do not mark an asset as critical only because it is expensive. Mark it critical when compromise enables one of the following:

- subscriber surveillance;

- service outage;

- loss of integrity in provisioning or billing;

- privileged movement to core systems;

- destruction of recovery capability;

- regulatory or public-trust crisis;

- access to national-security-sensitive communications.

## Step 3: Build the Telecom-Specific Attack Surface

**Theory anchor:**Attack-surface analysis connects adversary opportunity to Kill Chain phases. Reconnaissance, delivery, exploitation, installation, command and control, and actions on objectives all depend on exposed paths[[23]](https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-kill-chain.html),[[24]](https://www.lockheedmartin.com/content/dam/lockheed-martin/rms/documents/cyber/LM-White-Paper-Intel-Driven-Defense.pdf). In telecom, those paths include public IT, cloud, Kubernetes, network devices, core functions, interconnects, and vendor management.

A normal enterprise attack surface inventory is not enough for a cellular provider. Build four views.

<img src="https://cdn-images-1.medium.com/max/800/1*PWPIojhxrh2v8insXEGpdg.png" alt="Article image" width="1536" height="1024" loading="lazy" decoding="async" />

### View 1: Public and customer-facing exposure

**Include:**

- public websites;

- customer apps;

- API gateways;

- dealer portals;

- payment flows;

- SIM/eSIM activation and self-service;

- web admin panels;

- WAF-protected applications;

- exposed VPN and SSO endpoints;

- cloud-hosted public services.

**Intelligence-driven questions:**

- Which public assets expose identity, SIM/eSIM, billing, or support workflows?

- Which public APIs can trigger provisioning changes?

- Which legacy applications exist outside normal CI/CD?

- What WAF events correlate with known telecom-targeting campaigns?

### View 2: Enterprise IT and identity

**Include:**

- IdP;

- email and collaboration;

- HR and finance;

- service desk;

- endpoint fleet;

- privileged admin groups;

- SaaS applications;

- developer platforms;

- secrets and CI/CD.

**Intelligence-driven questions:**

- Which IT identities can reach network management or cloud management?

- Which helpdesk workflows can reset privileged accounts?

- Which service accounts bridge IT and telecom operations?

- Which OAuth apps or service principals have dangerous standing privileges?

### View 3: Telecom core and interconnect

**Include**:

- 4G/5G core;

- IMS/VoLTE;

- roaming and interconnect;

- Diameter, GTP, SCTP, SS7, SIP, DNS, BGP;

- subscriber databases;

- CDR mediation;

- lawful-intercept-sensitive workflows;

- NOC systems;

- network management systems.

**Intelligence-driven questions:**

- Which systems can query subscriber identity or location-related metadata?

- Which protocols cross trust boundaries with partners?

- Which management systems can push configuration at scale?

- Which logs would show abnormal CDR access, roaming manipulation, or control-plane probing?

### View 4: Cloud-native management and Kubernetes

**Include**:

- cloud IAM;

- Kubernetes API servers;

- container registries;

- admission controllers;

- service meshes;

- secrets stores;

- IaC pipelines;

- observability stacks;

- managed databases;

- backup vaults;

- privileged automation.

**Intelligence-driven questions:**

- Which cloud roles can delete production resources?

- Which Kubernetes service accounts can access secrets or exec into network-function workloads?

- Which CI/CD workflows can deploy to core-management clusters?

- Which logs would survive if the attacker deletes cloud resources?

## Step 4: Build a Collection Plan Before Buying More Tools

**Theory anchor:**Collection planning is the intelligence cycle applied to defense. More feeds do not automatically create intelligence. The analyst must define what evidence would answer each PIR, where that evidence should exist, whether the organization collects it, and what confidence can be assigned if the evidence is missing.

The problem in telecom is rarely a total absence of tools. It is that telemetry is siloed between SOC, NOC, cloud, identity, vendors, and telecom engineers.

### Internal collection priorities

**Collect and normalize:**

- SIEM alerts and raw logs;

- EDR process, command-line, network, and identity telemetry;

- firewall, IDS/IPS, NDR, and NetFlow;

- WAF and API gateway events;

- DNS resolver and authoritative DNS logs;

- router, switch, firewall, VPN, and load-balancer configuration changes;

- TACACS/RADIUS/AAA logs;

- privileged access session recordings;

- cloud audit logs and admin activity;

- Kubernetes audit logs and admission events;

- container image provenance and registry events;

- CI/CD deployment events;

- IdP authentication, MFA, token, and OAuth consent logs;

- PAM checkout, approval, and session logs;

- HSS/UDM/HLR, CDR, mediation, billing, and CRM access logs;

- NOC change tickets and maintenance windows;

- vendor remote-access events.

### External collection priorities

**Track:**

- CISA, NSA, FBI, CERT-IL, NCSC, ENISA, GSMA, Israeli Ministry of Communications, and sector advisories[[1]](https://www.cisa.gov/resources-tools/resources/enhanced-visibility-and-hardening-guidance-communications-infrastructure),[[2]](https://www.fbi.gov/file-repository/cyber-alerts/enhanced-visibility-and-hardening-guidance-for-communications-infrastructure.pdf/view),[[9]](https://www.cisa.gov/topics/cyber-threats-and-advisories/advanced-persistent-threats/iran),[[14]](https://www.gsma.com/solutions-and-impact/technologies/security/gsma-mobile-telecommunications-security-landscape-2025/),[[16]](https://www.enisa.europa.eu/publications/5g-matrix/enisa-5g-security-controls-matrix-paper.pdf),[[17]](https://www.standict.eu/sites/default/files/2021-02/ENISA%205G%20Threat%20Landscape%20-%20Update.pdf),[[31]](https://www.gov.il/he/departments/units/unit_cert_il),[[32]](https://www.gov.il/en/departments/Units/arc);

- vendor reporting from Mandiant, CrowdStrike, Microsoft, Cisco Talos, Cybereason, and telecom equipment vendors[[4]](https://www.crowdstrike.com/en-us/blog/liminal-panda-telecom-sector-threats/),[[5]](https://www.cybereason.com/blog/research/operation-soft-cell-a-worldwide-campaign-against-telecommunications-providers),[[6]](https://cloud.google.com/blog/topics/threat-intelligence/chinese-espionage-tactics/),[[7]](https://www.microsoft.com/en-us/security/blog/2023/04/07/mercury-and-dev-1084-destructive-attack-on-hybrid-environment/),[[8]](https://blogs.microsoft.com/on-the-issues/2024/02/06/iran-accelerates-cyber-ops-against-israel/);

- vulnerabilities affecting routers, firewalls, VPNs, hypervisors, Kubernetes, cloud identity, and telecom platforms;

- public reporting on telecom attacks;

- dark web and leak-site references to MagenCell, vendors, domains, employee credentials, or customer data;

- typosquatting and phishing infrastructure targeting MagenCell brands;

- attacks against peer telecom providers and Israeli critical infrastructure.

### Collection discipline

Every collected source should be tagged:

```text
Source:
Source type:
Access level:
Reliability:
Timeliness:
Relevant PIR:
Handling:
Action enabled:
Known gaps:
```

If a feed cannot answer a PIR or drive a defensive action, demote it.

## Step 5: Convert Public Reporting Into Defensible Threat Models

**Theory anchor:**Public reporting becomes intelligence only after it is transformed into scoped hypotheses, assumptions, confidence language, and defensive implications. Kent-style discipline prevents analysts from turning “a vendor reported this somewhere” into “this will happen to us”[[26]](https://www.cia.gov/resources/csi/static/Tradecraft-Primer-apr09.pdf),[[27]](https://www.cia.gov/resources/csi/studies-in-intelligence/archives/vol-8-no-4/words-of-estimative-probability/).

Do not copy public reports into slides. Convert them into defensive hypotheses.

### Example: Salt Typhoon -&gt; MagenCell hypothesis

**Public reporting:**

- U.S. government reporting states that PRC-affiliated Salt Typhoon activity compromised multiple U.S. telecommunications companies and leveraged access into those networks to target victims globally.

- CISA and partners emphasized enhanced visibility and hardening for communications infrastructure[[1]](https://www.cisa.gov/resources-tools/resources/enhanced-visibility-and-hardening-guidance-communications-infrastructure),[[2]](https://www.fbi.gov/file-repository/cyber-alerts/enhanced-visibility-and-hardening-guidance-for-communications-infrastructure.pdf/view),[[3]](https://www.fbi.gov/investigate/cyber/alerts/2025/fbi-seeking-tips-about-prc-targeting-of-us-telecommunications).

**MagenCell hypothesis:**

**H1**: A state-aligned actor seeking strategic intelligence would prioritize MagenCell’s network devices, AAA paths, telecom management systems, subscriber metadata stores, and lawful-intercept-sensitive workflows.
**Confidence:**Moderate.
**Why not high:**Public reporting confirms telecom targeting globally, but not MagenCell-specific targeting.
**Collection needed:**suspicious network-device admin activity, anomalous subscriber-data queries, unexplained management-plane access, telecom-core reconnaissance, partner reporting.

### Example: Kyivstar -&gt; MagenCell hypothesis

**Public reporting:**

- Kyivstar suffered a major cyberattack disrupting mobile, fixed, SMS, roaming, and related services[[12]](https://www.sec.gov/Archives/edgar/data/1468091/000146809123000114/kyivstarnetworktrgted_12.htm),[[13]](https://www.sec.gov/Archives/edgar/data/2062440/000206244026000006/R32.htm),[[34]](https://www.veon.com/newsroom/press-releases/kyivstar-completes-preliminary-assessment-of-the-financial-impact-of-the-cyberattack),[[35]](https://www.veon.com/newsroom/press-releases/kyivstar-restores-services-in-all-categories-brings-99-of-mobile-network-back-on-air).

**MagenCell hypothesis:**

**H1**: During geopolitical escalation, a destructive actor may target MagenCell’s management plane, identity systems, backups, and telecom core support systems to create service disruption and public fear.
**Confidence:**Moderate.
**Why not high:**Kyivstar proves feasibility and impact, not intent against MagenCell.
**Collection needed:**privilege escalation toward backup systems, mass deletion attempts, EDR tampering, NOC tooling abuse, unusual access to orchestration and cloud management.

### Example: MERCURY / Mango Sandstorm and DEV-1084 / Storm-1084 -&gt; MagenCell hypothesis

**Public reporting:**

- Microsoft reported destructive activity enabled by MERCURY, now tracked as Mango Sandstorm, with DEV-1084 / Storm-1084 activity in the operation, including movement from on-premises identity into cloud resources[[7]](https://www.microsoft.com/en-us/security/blog/2023/04/07/mercury-and-dev-1084-destructive-attack-on-hybrid-environment/).

**MagenCell hypothesis:**

**H1**: An actor with privileged identity access could move from enterprise IT into cloud management and destroy cloud-native telecom management resources.
**Confidence in path exploitability**: High, based on Microsoft’s reporting and the known strategic importance of hybrid identity.
Confidence in actor intent against MagenCell: Moderate, because the public evidence shows feasibility and impact, not MagenCell-specific intent.
**Collection needed:**Microsoft Entra Connect anomalies, service principal abuse, privileged cloud role changes, mass deletion operations, backup-policy tampering.

## Step 6: Build a Threat-Informed Detection Backlog

<img src="https://cdn-images-1.medium.com/max/800/1*CCRvpWcI8p63YOoToIjnIA.png" alt="Article image" width="1536" height="1024" loading="lazy" decoding="async" />

**Theory anchor:**The Pyramid of Pain says durable behavior is more valuable than fragile indicators[[22]](https://www.threathunting.net/files/A%20Framework%20for%20Cyber%20Threat%20Hunting%20Part%201_%20The%20Pyramid%20of%20Pain%20_%20Sqrrl.pdf). ATT&CK gives defenders a shared vocabulary for behavior, but a technique mapping is not attribution[[20]](https://attack.mitre.org/),[[21]](https://www.mitre.org/focus-areas/cybersecurity/mitre-attack). The detection backlog should therefore prioritize adversary behaviors that matter to MagenCell’s crown jewels.

Detection should be prioritized by public telecom attack evidence and MagenCell crown jewels, not by random rule availability.

### Detection theme 1: network-device and management-plane compromise

Driven by Salt Typhoon guidance and UNC3886-style appliance/virtualization tradecraft[[1]](https://www.cisa.gov/resources-tools/resources/enhanced-visibility-and-hardening-guidance-communications-infrastructure),[[2]](https://www.fbi.gov/file-repository/cyber-alerts/enhanced-visibility-and-hardening-guidance-for-communications-infrastructure.pdf/view),[[3]](https://www.fbi.gov/investigate/cyber/alerts/2025/fbi-seeking-tips-about-prc-targeting-of-us-telecommunications),[[6]](https://cloud.google.com/blog/topics/threat-intelligence/chinese-espionage-tactics/).

**Build detections for:**

- new local users on routers, firewalls, VPNs, load balancers, and management appliances;

- configuration changes outside approved windows;

- AAA bypass, fallback authentication, or unexplained TACACS/RADIUS failures;

- unusual outbound traffic from management devices;

- unexpected tunnels, GRE/IPsec changes, or route changes;

- firmware image changes or unauthorized package/module loading;

- disabled logging, log destination changes, or time-sync manipulation;

- management access from non-admin networks;

- administrative commands inconsistent with the operator’s role.

**Required data:**

- network device syslog;

- AAA logs;

- config backups and diffs;

- NetFlow/NDR;

- firewall logs;

- NOC change tickets;

- privileged-session logs.

### Detection theme 2: telecom core reconnaissance and subscriber-data access

Driven by Operation Soft Cell and telecom-specific espionage reporting[[5]](https://www.cybereason.com/blog/research/operation-soft-cell-a-worldwide-campaign-against-telecommunications-providers),[[28]](https://www.cybereason.com/press/cybereason-uncovers-massive-state-sponsored-espionage-operation-leveraging-privately-owned-critical-infrastructure-companies).

**Build detections for:**

- abnormal CDR query volume;

- unusual access to HLR/HSS/UDM or subscriber databases;

- queries targeting VIP, government, defense, journalist, or executive subscriber groups;

- access to mediation systems outside normal job functions;

- roaming/interconnect anomalies;

- unexpected Diameter/GTP/SCTP/SIP traffic patterns;

- bulk export from billing, CRM, or CDR platforms;

- new service accounts with access to subscriber data;

- privilege changes in telecom application databases.

**Required data:**

- application logs from telecom core platforms;

- database audit logs;

- CDR mediation logs;

- IAM/PAM events;

- network telemetry around interconnect systems;

- NOC tickets and approved maintenance windows.

### Detection theme 3: hybrid identity and cloud destruction paths

Driven by Microsoft MERCURY / Mango Sandstorm and DEV-1084 / Storm-1084 reporting[[7]](https://www.microsoft.com/en-us/security/blog/2023/04/07/mercury-and-dev-1084-destructive-attack-on-hybrid-environment/).

**Build detections for:**

- access to identity sync systems by unusual accounts;

- extraction or modification of privileged cloud credentials;

- service principal credential changes;

- new federated trust relationships;

- mass deletion of virtual machines, storage, Kubernetes resources, snapshots, backup vaults, or network objects;

- disabling EDR, cloud security, logging, or retention policies;

- changes to backup immutability or retention;

- high-risk role assignments in cloud IAM;

- suspicious use of automation from CI/CD runners or management hosts.

**Required data:**

- cloud audit logs;

- Entra ID/Azure AD, AWS IAM, or GCP IAM logs;

- PAM logs;

- EDR telemetry;

- Kubernetes audit logs;

- CI/CD logs;

- backup-platform logs.

### Detection theme 4: Kubernetes and cloud-native management abuse

Driven by MagenCell’s architecture and public cloud/hybrid destructive reporting.

**Build detections for:**

- `kubectl exec`into sensitive network-function pods;

- access to Kubernetes secrets by unusual service accounts;

- creation of privileged pods;

- hostPath mounts in production clusters;

- admission controller bypass attempts;

- new cluster-admin bindings;

- image pulls from untrusted registries;

- unsigned or unapproved images in production;

- unexpected changes to service mesh policies;

- deletion of namespaces, persistent volumes, or secrets;

- suspicious use of CI/CD deploy tokens.

**Required data:**

- Kubernetes audit logs;

- admission controller logs;

- container runtime events;

- registry logs;

- CI/CD events;

- cloud IAM logs;

- secrets manager access logs.

### Detection theme 5: public web and customer API compromise

Driven by telecom breach history and the fact that public apps can trigger SIM, billing, identity, or provisioning workflows.

**Build detections for:**

- WAF SQL injection, SSRF, deserialization, auth bypass, API enumeration, and credential stuffing patterns;

- abnormal SIM/eSIM activation attempts;

- unusual account recovery flows;

- dealer portal access anomalies;

- API tokens used from new geographies or hosting providers;

- large customer-data export attempts;

- payment or billing changes at abnormal scale;

- web admin logins without corresponding ticket or change.

**Required data:**

- WAF logs;

- API gateway logs;

- IdP events;

- CRM/billing logs;

- fraud telemetry;

- customer-care system logs;

- bot-management telemetry.

### Detection theme 6: third-party and vendor access abuse

Driven by telecom dependency realities and public reporting on trusted-access paths.

**Build detections for:**

- vendor VPN access outside approved windows;

- vendor access from new countries, ASNs, or devices;

- privilege escalation after vendor login;

- file transfer from core-management networks;

- remote desktop or SSH session fan-out;

- vendor account use without a change ticket;

- dormant vendor account reactivation;

- third-party support tools running on sensitive hosts;

- unmanaged devices accessing privileged portals.

**Required data:**

- VPN/ZTNA logs;

- PAM session logs;

- IdP device posture;

- EDR telemetry;

- change-management system;

- vendor identity inventory.

## ATT&CK Mapping Guardrails

ATT&CK should map**observed behavior**, not analyst assumptions.

Use the right matrix:

- **Enterprise ATT&CK**— IT, cloud, identity, Kubernetes, network devices, telecom-support servers.

- **Mobile ATT&CK**— handsets, customer apps, mobile endpoint behavior.

- **ICS ATT&CK**— real OT/ICS systems: PLCs, HMIs, facility controls, power/building systems.

Do**not**map telecom-core activity to Mobile or ICS only because the victim is a mobile operator.

<img src="https://cdn-images-1.medium.com/max/800/1*I10vAdrNcViz89awJYIuRQ.png" alt="Article image" width="1536" height="1024" loading="lazy" decoding="async" />

## Mapping Examples

### 1. Phishing or vendor-support impersonation

- **Mapping:**T1566 Phishing / T1566.002 Spearphishing Link

- **Evidence:**email, lure, URL, credential-harvest page, identity logs

- **Caveat:**supports initial access, not attribution

### 2. New privileged cloud role or service-principal credential

- **Mapping:**T1078.004 Cloud Accounts / T1098.001 Additional Cloud Credentials

- **Evidence:**cloud IAM logs, identity audit logs, change-ticket comparison

- **Caveat:**use cloud sub-techniques only when cloud credential abuse is proven

### 3. Mass deletion of cloud resources, backups, snapshots, or Kubernetes objects

- **Mapping:**T1485 Data Destruction / T1490 Inhibit System Recovery

- **Evidence:**cloud audit logs, backup logs, command source, identity path

- **Caveat:**destruction alone does not prove state intent

### 4. Kubernetes secret access by unusual service account

- **Mapping:**T1552.007 Container and Cloud Secrets

- **Evidence:**Kubernetes audit logs, RBAC, service account, secret access event

- **Caveat:**do not map if only application symptoms exist

### 5. Network-device config change outside approved window

- **Mapping:**

- T1601.001 Patch System Image — if firmware/system image changed

- T1556.004 Network Device Authentication — if auth behavior changed

- **Evidence:**config diff, AAA logs, management source, NOC change record

- **Caveat:**generic config change is not enough

### 6. Bulk CDR, billing, CRM, or subscriber metadata export

- **Mapping:**T1213 Data from Information Repositories; T1041 only if C2 egress is proven

- **Evidence:**database audit logs, query scope, export destination, account role

- **Caveat:**supports espionage hypothesis, not attribution

## Matrix-Specific Examples

### Enterprise

- **Web shell on customer/dealer/API/support portal**

- **Mapping:**T1505.003 Web Shell

- **Evidence:**artifact, file-write event, process execution, inbound request path

- **Caveat:**proves intrusion/persistence, not actor identity

- **Credential stuffing or password spraying**

- **Mapping:**T1110 / T1110.003

- **Evidence:**auth logs, failed-login pattern, source infrastructure, target accounts

- **Caveat:**common activity, not telecom-specific by itself

### Mobile

- **Fake or compromised branded Android app requesting device admin**

- **Mapping:**T1626.001 Device Administrator Permissions

- **Evidence:**app sample, manifest, permission request, user grant

- **Caveat:**applies to mobile endpoints, not telecom core

- **Mobile app/malware collecting location or protected user data**

- **Mapping:**T1430 Location Tracking / T1636 Protected User Data

- **Evidence:**permissions, OS telemetry, API calls, data access, exfil path

- **Caveat:**do not confuse handset collection with operator-side subscriber metadata access

### ICS

- **Engineering workstation or vendor session downloads logic to PLC/controller**

- **Mapping:**T0843 Program Download / T0821 Modify Controller Tasking

- **Evidence:**workstation logs, controller logs, project diff, vendor session, ticket

- **Caveat:**only for real OT/ICS assets

- **Unauthorized HMI/PLC command changes physical process state**

- **Mapping:**T0831 Manipulation of Control / T0803 Block Command Message

- **Evidence:**HMI logs, historian data, controller history, process state

- **Caveat:**use only when physical process control is involved

- **Critical OT service stopped**

- **Mapping:**T0881 Service Stop

- **Evidence:**service logs, process telemetry, command source, OT impact

- **Caveat:**choose ICS only when OT context exists

### Worked Example

**Observed:**Service principal logs in from unusual ASN, adds a client secret, and assigns a high-privilege cloud role.

**Evidence:**

- Service-principal sign-in event

- Credential-add event

- Role-assignment event

- No change ticket

- Unusual ASN

**Supported mapping:**

- T1078.004 Cloud Accounts

- T1098.001 Additional Cloud Credentials

**Caveat:**proves cloud identity abuse and persistence/access expansion, not actor identity or destructive intent.

### IOC Handling

Public telecom IOCs should not be blindly blocklisted.

Use IOCs as**triage aids**. Prioritize:

- Durable TTPs

- Identity paths

- Crown-jewel access patterns

- Context, expiration, ownership checks, and false-positive review

Public IOCs from telecom cases should not be blindly blocklisted. Hashes, IPs, and domains need context, expiration, ownership checks, and false-positive review. For this strategy, IOCs are triage aids; durable TTPs, identity paths, and crown-jewel access patterns drive the defensive backlog.

## Step 7: Build a 30/60/90-Day Hunt Program

**Theory anchor:**Threat hunting is hypothesis testing against telemetry. It should not be random searching or dashboard browsing. A hunt is strongest when it answers a PIR, tests a public-reporting-derived hypothesis, and produces either a finding, a detection, or a documented collection gap[[26]](https://www.cia.gov/resources/csi/static/Tradecraft-Primer-apr09.pdf).

Threat hunting should answer PIRs, not generate random findings.

<img src="https://cdn-images-1.medium.com/max/800/1*9NMjxPUizj6vF-OOExJFng.png" alt="Article image" width="1536" height="1024" loading="lazy" decoding="async" />

### First 30 days: visibility and compromise assessment

**Hunts**:

- network device admin activity inconsistent with NOC change tickets;

- privileged cloud role changes and service principal modifications;

- suspicious access to subscriber metadata and CDR systems;

- vendor access into management networks outside support windows;

- unapproved Kubernetes cluster-admin bindings;

- disabled or missing logs from critical systems;

- internet-exposed management interfaces.

**Deliverable:**

```text
30-day compromise assessment:
-
 
What was checked:
-
 
What was not visible:
-
 
Suspicious findings:
-
 
Confirmed benign:
-
 
Unresolved:
-
 
Immediate containment recommendations:
-
 
Collection gaps:
```

### Days 31–60: threat-specific hunts

**Hunts:**

- Salt Typhoon-inspired network-device and AAA anomalies[[1]](https://www.cisa.gov/resources-tools/resources/enhanced-visibility-and-hardening-guidance-communications-infrastructure),[[2]](https://www.fbi.gov/file-repository/cyber-alerts/enhanced-visibility-and-hardening-guidance-for-communications-infrastructure.pdf/view),[[3]](https://www.fbi.gov/investigate/cyber/alerts/2025/fbi-seeking-tips-about-prc-targeting-of-us-telecommunications);

- telecom-core reconnaissance and metadata access patterns;

- UNC3886-inspired hypervisor and network-appliance persistence checks[[6]](https://cloud.google.com/blog/topics/threat-intelligence/chinese-espionage-tactics/);

- MERCURY / Mango Sandstorm and DEV-1084 / Storm-1084-inspired hybrid identity and cloud deletion paths[[7]](https://www.microsoft.com/en-us/security/blog/2023/04/07/mercury-and-dev-1084-destructive-attack-on-hybrid-environment/);

- Iranian influence-linked prepositioning and web defacement/data-leak indicators.

**Deliverable:**

```text
Threat-informed hunt report:
-
 
Threat driver:
-
 
Hypothesis:
-
 
Data sources:
-
 
Query logic:
-
 
Findings:
-
 
Confidence:
-
 
False-positive risk:
-
 
Detection backlog:
-
 
Engineering gaps:
```

### Days 61–90: operationalization

**Actions:**

- convert successful hunts into SIEM detections;

- map detections to ATT&CK techniques and data sources[[20]](https://attack.mitre.org/),[[21]](https://www.mitre.org/focus-areas/cybersecurity/mitre-attack);

- create NOC/SOC joint escalation thresholds;

- build dashboards for crown-jewel access;

- create incident playbooks for telecom espionage, cloud destruction, and third-party compromise;

- brief executives on residual risk and investment needs.

**Deliverable**:

```text
90-day CTI-led defense package:
-
 
Priority threats:
-
 
Validated telemetry:
-
 
New detections:
-
 
Remaining gaps:
-
 
Top 10 engineering fixes:
-
 
Incident playbooks:
-
 
Executive risk narrative:
```

## Step 8: Map Kill Chain Phases to Defensive Actions

**Theory anchor:**The Cyber Kill Chain helps defenders identify where adversary activity can be observed, disrupted, or forced into higher-cost behavior[[23]](https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-kill-chain.html),[[24]](https://www.lockheedmartin.com/content/dam/lockheed-martin/rms/documents/cyber/LM-White-Paper-Intel-Driven-Defense.pdf). The goal is not to fill every box mechanically; the goal is to connect each phase to concrete telemetry, controls, owners, and response decisions.

Use the Kill Chain to decide where MagenCell can disrupt the adversary earliest.

[**CTI Kill Chain: An Analyst Guide With Real-World Evidence**
[Mapping adversary behavior from preparation to impact without overstating the evidence](2026-05-09-cti-kill-chain-an-analyst-guide-with-real-world-evidence-c3bef6fd2979.md)

<img src="https://cdn-images-1.medium.com/max/800/1*wSjRcQGAnOae_0nm-pjU8A.png" alt="Article image" width="1536" height="1024" loading="lazy" decoding="async" />

### Reconnaissance and precursors

**Likely evidence:**

- typosquatting;

- phishing infrastructure;

- exposed management panels;

- credential leaks;

- scanning of VPN, firewall, router, API, Kubernetes, and cloud endpoints;

- social media targeting of NOC, SOC, telecom engineers, executives, and helpdesk staff.

**Defensive actions:**

- brand and domain monitoring;

- exposed service inventory;

- leaked credential monitoring;

- phishing lure collection;

- executive and engineer targeting watchlist;

- third-party exposure review.

### Weaponization and delivery

**Likely evidence:**

- telecom-themed phishing;

- vendor support impersonation;

- malicious OAuth apps;

- exploitation of edge devices;

- API abuse;

- weaponized remote monitoring tools;

- supply-chain or vendor portal abuse.

**Defensive actions:**

- phishing-resistant MFA;

- OAuth app governance;

- edge-device patch SLAs;

- WAF/API rules tied to CTI;

- allowlisted vendor access;

- attachment/link detonation;

- external attack surface management.

### Exploitation and installation

**Likely evidence:**

- web shell activity;

- appliance compromise;

- privileged account creation;

- endpoint persistence;

- Kubernetes secret theft;

- unauthorized management agents;

- new SSH keys or admin users.

**Defensive actions:**

- EDR containment playbooks;

- network-device config diffing;

- Kubernetes audit monitoring;

- privileged account review;

- golden-image validation;

- vulnerability-specific hunts.

### Command and control

**Likely evidence:**

- outbound traffic from management devices;

- cloud-hosted C2;

- VPN tunnels;

- unusual DNS;

- long-lived encrypted sessions;

- compromised vendor tooling.

**Defensive actions:**

- egress controls for management networks;

- DNS analytics;

- NDR behavior models;

- proxy logging;

- cloud C2 detection;

- vendor tool allowlisting.

### Actions on objectives

**Likely objectives:**

- subscriber metadata theft;

- CDR access;

- service disruption;

- cloud resource deletion;

- backup destruction;

- SIM/eSIM manipulation;

- billing fraud;

- influence operations;

- persistence for future crisis.

**Defensive actions:**

- crown-jewel access monitoring;

- backup immutability;

- crisis communications plan;

- NOC/SOC joint command;

- customer-impact detection;

- regulator notification playbooks;

- threat-informed recovery drills.

## Step 9: Use the Diamond Model for Telecom Events

**Theory anchor:**The Diamond Model keeps four analytic features visible: adversary, capability, infrastructure, and victim[[25]](https://www.activeresponse.org/wp-content/uploads/2013/07/diamond.pdf). This prevents CTI from collapsing a tool name, IP address, vendor label, and victim sector into one overconfident story.

<img src="https://cdn-images-1.medium.com/max/800/1*D3pbI0I5UaC8VNej7bfyzw.png" alt="Article image" width="1536" height="1024" loading="lazy" decoding="async" />

For every suspicious event, record:

```text
Event:
Timestamp:
Kill Chain phase:
```

```text
Adversary:
- Known:
- Assessed:
- Unknown:
```

```text
Capability:
- Tool:
- Technique:
- Malware:
- Exploit:
- Account or credential:
```

```text
Infrastructure:
- IP/domain:
- ASN/cloud:
- VPN/proxy:
- Telecom protocol path:
- Vendor access path:
```

```text
Victim:
- Business unit:
- System:
- Data:
- Crown jewel relevance:
```

```text
Meta-features:
- Direction:
- Result:
- Methodology:
- Confidence:
- Source:
- Collection gap:
```

## Why this matters

**Diamond Model discipline prevents sloppy statements like:**

&gt; “This is Salt Typhoon because it touched a router.”

**Better:**

&gt; “The event involves unauthorized router administration and logging gaps that are consistent with telecom espionage tradecraft described in public Salt Typhoon guidance. We do not attribute this event to Salt Typhoon. Confidence : moderate for suspicious management-plane activity; low for actor attribution.”

## Step 10: Run ACH for the High-Consequence Scenarios

**Theory anchor:**Analysis of Competing Hypotheses is a bias-control method[[26]](https://www.cia.gov/resources/csi/static/Tradecraft-Primer-apr09.pdf). It reduces confirmation bias by asking which hypothesis is least inconsistent with the evidence, rather than asking how to prove the favorite theory.

Use Analysis of Competing Hypotheses when the decision is expensive or public.

### Scenario: unusual access to subscriber metadata

**Hypotheses:**

```text
H1: State-aligned espionage targeting subscriber metadata.
H2: Insider misuse or contractor misuse.
H3: Misconfigured reporting job or billing analytics process.
H4: Criminal data theft for fraud or resale.
```

**Diagnostic evidence:**

- source account and role;

- query scope;

- VIP targeting;

- timing;

- data export destination;

- relationship to maintenance ticket;

- prior access pattern;

- host and network telemetry;

- external infrastructure;

- whether follow-on actions occurred.

**Analytic rule:**

Do not choose the most dramatic hypothesis. Choose the one best supported by diagnostic evidence.

### Scenario: cloud resources deleted

**Hypotheses**:

```text
H1:
 Destructive actor 
using
 compromised privileged identity.
H2:
 failed automation 
or
 IaC pipeline.
H3:
 malicious insider.
H4:
 vendor 
error
.
```

**Diagnostic evidence:**

- authentication path;

- change ticket;

- command source;

- service principal or human account;

- MFA status;

- deletion sequence;

- backup tampering;

- EDR or identity alerts;

- external communications or extortion note.

## Step 11: Build the Tactical Detection Handoff

**Theory anchor:**Dissemination must fit the consumer. Strategic intelligence supports executive risk decisions; operational intelligence supports program priority; tactical intelligence must be implementable by SOC, NOC, detection engineering, cloud, identity, and telecom-core teams.

CTI should hand engineering teams a usable detection package, not a paragraph.

**Use this template**:

```text
Detection title:
Threat driver:
Relevant public reporting:
PIR supported:
Crown jewel protected:
```

```text
Behavior to detect:
ATT&CK mapping:
Pyramid level:
Expected data sources:
```

```text
Detection logic:
- Required fields:
- Join conditions:
- Time window:
- Suppression logic:
- Known false positives:
```

```text
Severity:
Confidence:
Escalation path:
```

```text
Validation:
- Test data:
- Purple-team procedure:
- Owner:
- Review date:
```

### Example detection handoff

```text
Detection title:
Unauthorized privileged access 
to
 subscriber metadata systems
```

```text
Threat driver:
Operation Soft Cell-style telecom espionage and subscriber metadata targeting.
```

```text
PIR supported:
PIR-5: What indicates espionage rather than commodity crime?
```

```text
Crown jewel protected:
CDR, subscriber identity, billing, mediation, HSS/UDM-adjacent data.
```

```text
Behavior to detect:
Privileged or service-account queries against subscriber metadata outside normal job, volume, ticket, or source-host profile.
```

```text
ATT&CK mapping:
Credentialed access and collection behavior; map exact techniques only when host and application evidence supports them.
```

```text
Pyramid level:
Behavior/TTP, not raw IOC.
```

```text
Expected data sources:
Database audit logs, IAM, PAM, application logs, NOC tickets, EDR, NetFlow.
```

```text
Known false positives:
Regulatory data requests, billing reconciliation, fraud investigations, emergency support tasks.
```

```text
Escalation:
SOC triage -> NOC validation -> CTI assessment -> incident commander if unexplained access targets sensitive subscriber sets.
```

## Step 12: Build Three Incident Playbooks

**Theory anchor:**Incident playbooks convert intelligence into rehearsed courses of action. For telecom, response cannot be SOC-only: NOC, core engineering, cloud, identity, legal, customer care, executive leadership, and communications must work from the same evidence and confidence model.

MagenCell needs three strategic playbooks before the incident.

### Playbook A: telecom espionage in the core

**Trigger:**

- unexplained access to subscriber metadata;

- telecom-core management anomalies;

- suspicious roaming/interconnect activity;

- network-device compromise;

- abnormal CDR access;

- partner warning.

**First 24 hours:**

- preserve logs and configs;

- freeze relevant account changes;

- validate NOC maintenance windows;

- isolate suspicious management paths without disrupting service;

- begin subscriber-data access review;

- assign CTI to build event timeline and Diamond Model;

- notify legal and executive crisis leads if sensitive data or lawful-intercept-sensitive workflows may be involved.

**Do not:**

- reboot network devices before preserving volatile evidence;

- publicly attribute;

- assume all unusual telecom protocol activity is malicious;

- block interconnect traffic without NOC service-impact review.

### Playbook B: destructive cloud or management-plane activity

**Trigger:**

- mass deletion attempts;

- cloud admin role abuse;

- backup retention changes;

- EDR/logging disabled;

- Kubernetes production namespace deletion;

- identity sync compromise;

- ransomware or wiper signals.

**First 24 hours:**

- activate incident command;

- lock backup policies;

- preserve cloud audit logs;

- disable risky service principals;

- rotate break-glass credentials under controlled process;

- isolate management networks;

- validate recovery points;

- prepare customer-impact communications.

**Do not:**

- destroy forensic evidence during emergency rebuild;

- restore into the same compromised identity plane;

- assume ransom note equals criminal motivation;

- delay executive notification if service impact is plausible.

### Playbook C: third-party access compromise

**Trigger**:

- vendor login outside approved window;

- access from new device or country;

- unexpected privilege escalation;

- vendor session touching crown jewels;

- file transfer from management network;

- vendor notifies of breach.

**First 24 hours:**

- suspend or restrict vendor access;

- preserve session logs;

- identify all systems touched;

- review associated change tickets;

- require vendor incident statement;

- rotate credentials and API keys;

- hunt for persistence created during vendor session;

- review contractual notification requirements.

**Do not:**

- disable all vendors blindly if it threatens service restoration;

- accept “no impact” without logs;

- treat vendor identity as lower risk than employee identity.

## Governance: Make CTI the Operating Layer

CTI should sit between the threat environment and the defensive system.

### Weekly CTI operating rhythm

```text
Monday:
-
 Review 
new
 telecom, Israel, cloud, 
identity
, 
and
 vendor
-
access reporting.
-
 
Update
 PIR status.
-
 
Select
 
one
 hunt hypothesis.
```

```text
Tuesday:
- CTI + SOC detection engineering session.
- Convert one public TTP into one internal detection or hunt.
```

```text
Wednesday:
- CTI + NOC session.
- Review management-plane anomalies, maintenance windows, and device hardening.
```

```text
Thursday:
- CTI + cloud/IAM/Kubernetes session.
- Review privileged cloud actions, service principals, secrets, and cluster admin events.
```

```text
Friday:
- Executive risk note.
- What changed, what matters, what needs action.
```

### Monthly CTI products

- strategic threat brief for executives;

- operational threat model update for SOC/NOC/cloud/IAM;

- detection backlog update;

- third-party risk intelligence note;

- crown-jewel access review;

- collection gap register;

- incident exercise inject based on a public telecom case.

## Metrics That Matter

Avoid measuring CTI by report count.

**Measure**:

- percentage of PIRs with current answers;

- number of detections created from priority threat reporting;

- detection coverage for crown-jewel paths;

- time from public advisory to internal exposure assessment;

- percentage of vendor privileged sessions monitored;

- percentage of critical systems with immutable recovery;

- number of high-risk service principals reviewed;

- number of NOC/SOC joint investigations completed;

- mean time to answer “are we affected?”;

- number of executive decisions supported by CTI.

## Executive Brief Template

```text
Title:
Threat-informed defensive priority for MagenCell
```

```text
Bottom line:
We assess with [confidence] that [threat] is relevant to [business risk] because [evidence].
```

```text
Why it matters:
- Customer/service impact:
- Regulatory impact:
- National resilience impact:
- Financial impact:
```

```text
What changed:
- New public reporting:
- Internal exposure:
- Detection or collection gap:
```

```text
What we know:
- Fact:
- Fact:
```

```text
What we assess:
- Assessment:
- Confidence:
```

```text
What we do not know:
- Gap:
- Gap:
```

```text
Recommended decision:
- Approve:
- Defer:
- Accept risk:
```

```text
Action owner:
Deadline:
```

### SOC/NOC Joint Triage Template

```text
Alert or anomaly:
Timestamp:
Source system:
Detected by:
```

```text
NOC context:
- Maintenance window:
- Change ticket:
- Expected operator:
- Expected source:
- Service impact:
```

```text
SOC context:
- Identity risk:
- Endpoint risk:
- Network risk:
- Cloud risk:
- Known threat match:
```

```text
CTI context:
- Relevant public reporting:
- Relevant PIR:
- Similar public cases:
- ATT&CK mapping:
- Confidence:
```

```text
Decision:
- Benign:
- Suspicious:
- Incident:
- Intelligence gap:
```

```text
Next action:
Owner:
Deadline:
```

### Collection Gap Register Template

```text
Gap
:
Related 
PIR
:
Crown jewel 
affected
:
Threat 
scenario
:
Current 
visibility
:
Missing 
visibility
:
Operational 
impact
:
Risk if 
unresolved
:
Required 
owner
:
Target 
date
:
Compensating 
control
:
Status
:
```

## Customer Delivery Appendix

This section translates the strategy into how it would be delivered inside a customer environment. It is written for a consulting, customer-success, or embedded CTI role where the analyst must move from public reporting to customer-specific detections, hunts, briefings, and measurable outcomes.

### Terms Used in This Appendix

- **PIR (Priority Intelligence Requirement)****:**a decision-level intelligence question that a senior consumer needs answered, scoped to a key decision point or course of action.

- **SIR (Specific Intelligence Requirement)****:**a narrower, collection-focused knowledge gap derived from a PIR, defining what internal telemetry, data source, or external feed would answer that requirement. SIRs decompose PIRs into collectible evidence and guide collection, processing, and analysis.

- **Collection task:**the concrete data request, log source, hunt query, partner question, or vendor evidence needed to answer the SIR.

## Example SIEM Queries

These examples are intentionally platform-neutral. Field names should be mapped to the customer’s SIEM schema, whether the environment uses Microsoft Sentinel/KQL, Splunk SPL, Elastic, Chronicle, QRadar, or another platform. The pseudo-query syntax below uses a generic pipe-and-filter notation; it is not valid syntax for any specific platform and must be translated before deployment.

### Query 1: Unusual Privileged Access to Subscriber Metadata

Purpose: identify privileged or service-account access to CDR, HSS/UDM-adjacent, billing, CRM, mediation, or subscriber metadata stores outside normal role, source, time, or ticket context.

```text
Data sources:
- Database audit logs
- PAM logs
- IAM/IdP logs
- Application logs 
from
 billing, CRM, mediation, HLR/HSS/UDM-adjacent systems
- NOC 
or
 ITSM change tickets
Pseudo-query:
subscriber_data_access
| 
where
 system 
in
 (
"CDR"
, 
"billing"
, 
"CRM"
, 
"mediation"
, 
"HLR"
, 
"HSS"
, 
"UDM"
, 
"subscriber_db"
)
| 
where
 action 
in
 (
"SELECT"
, 
"EXPORT"
, 
"BULK_QUERY"
, 
"REPORT_RUN"
, 
"API_READ"
)
| 
where
 account_type 
in
 (
"privileged"
, 
"service_account"
, 
"vendor"
, 
"admin"
)
| 
join
 pam_sessions 
on
 account, session_id
| 
join
 change_tickets 
on
 ticket_id
| 
where
 ticket_id 
is
 
null
   
or
 access_time outside approved_window
   
or
 source_host 
not
 
in
 approved_admin_hosts
   
or
 query_volume > 
baseline
(
account, system, 
30
d
) * 3
   
or
 target_subscriber_group 
in
 (
"executive"
, 
"government"
, 
"defense"
, 
"journalist"
, 
"VIP"
)
| summarize first_seen, last_seen, systems, query_count, export_count, source_hosts
    
by
 account, source_ip, ticket_id
```

**Note**:`baseline()`is a pseudocode placeholder. Implement using the SIEM's statistical baseline, machine-learning anomaly, or percentile function against 30 days of historical access data for the same account and system pair.

**Triage notes:**

- First validate maintenance windows, fraud investigations, billing reconciliation, regulatory requests, and emergency support.

- Escalate when access is unexplained, selective against sensitive subscriber groups, or paired with new privileges, export destinations, or log changes.

- Map to collection or exfiltration behavior only after database, application, and network evidence support that claim.

### Query 2: Cloud Deletion or IAM Escalation

Purpose: detect destructive pre-positioning or cloud-management compromise through privileged role assignment, service-principal credential changes, backup tampering, or resource deletion.

```text
Data sources:
- Cloud audit logs
- Entra ID / AWS IAM / GCP IAM logs
- CI/CD logs
- PAM logs
- Backup platform logs
- Kubernetes audit logs
Pseudo-query:
cloud_admin_activity
| 
where
 action 
in
 (
    
"AddRoleAssignment"
,
    
"CreateAccessKey"
,
    
"AddServicePrincipalCredential"
,
    
"UpdateFederatedTrust"
,
    
"DeleteVM"
,
    
"DeleteStorage"
,
    
"DeleteSnapshot"
,
    
"DeleteBackupVault"
,
    
"UpdateBackupRetention"
,
    
"DisableLogging"
,
    
"DeleteKubernetesNamespace"
,
    
"DeletePersistentVolume"
  
)
| 
where
 actor 
not
 
in
 approved_automation_identities
   
or
 source_ip 
not
 
in
 approved_admin_networks
   
or
 mfa_status !
= 
"satisfied"
   
or
 change_ticket 
is
 
null
   
or
 action_time outside approved_window
| summarize actions, affected_resources, first_seen, last_seen
    
by
 actor, source_ip, cloud_account, change_ticket
```

**Sequencing logic:**

```text
Detect identity escalation followed 
by
 destructive action.
The highest-severity signal 
is
 an identity 
or
 credential escalation 
event
 followed within a 
short
 window 
by
 a destructive 
or
 recovery-inhibiting action 
from
 the same actor.
Step
 
1
 
event
:
- action 
in
 (
"AddRoleAssignment"
, 
"AddServicePrincipalCredential"
, 
"CreateAccessKey"
, 
"UpdateFederatedTrust"
)
Step
 
2
 
event
:
- action 
in
 (
"DeleteVM"
, 
"DeleteStorage"
, 
"DeleteSnapshot"
, 
"DeleteBackupVault"
, 
"UpdateBackupRetention"
, 
"DisableLogging"
)
Correlation:
- same actor 
and
 source_ip;
- 
Step
 
2
 occurs within 
4
 hours 
of
 
Step
 
1
.
Platform-specific implementation examples:
- Splunk SPL: transaction, stats-based sessionization, 
or
 sequence-style correlation.
- Microsoft Sentinel KQL: time-windowed 
join
 
on
 actor 
and
 source_ip.
- Elastic EQL: sequence 
with
 maxspan=
4
h.
- Chronicle YARA-L: multi-
event
 rule 
with
 time-window condition.
- QRadar AQL: multi-
event
 correlation rule.
```

**Triage notes:**

- Treat identity escalation followed by backup, logging, snapshot, or production deletion activity as high severity.

- Check whether the actor is a CI/CD runner, break-glass account, managed service identity, or human administrator.

- Do not restore into the same identity plane until privileged access, federation, and service-principal credentials are reviewed.

### Query 3: Vendor Access Outside Maintenance Windows

Purpose: detect third-party access that touches crown-jewel paths without an approved support window, expected source, device posture, or ticket.

```text
Data sources:
- VPN/ZTNA logs
- PAM session logs
- IdP logs
- EDR 
or
 device posture
- Firewall 
or
 NetFlow
- NOC/ITSM change tickets
Pseudo-query:
vendor_remote_access
| 
where
 identity_type == 
"vendor"
| 
join
 change_tickets 
on
 vendor_name, ticket_id
| 
join
 privileged_sessions 
on
 account, session_id
| 
where
 ticket_id 
is
 
null
   
or
 login_time outside approved_window
   
or
 source_country 
not
 
in
 approved_vendor_countries
   
or
 device_compliance != 
"compliant"
   
or
 accessed_zone 
in
 (
"network_management"
, 
"telecom_core_support"
,
                        
"kubernetes_admin"
, 
"backup_admin"
, 
"subscriber_data"
)
   
or
 distinct_destination_host_count > 
baseline
(
account, 
30
d
) * 2
| summarize accessed_zones, hosts, commands, bytes_out, first_seen, last_seen
    
by
 vendor_name, account, source_ip, ticket_id
```

**Note**:`distinct_destination_host_count`is the count of unique internal hosts or network zones accessed within a single vendor session. Implement it by counting distinct destination hosts or destination security zones per session ID within PAM or ZTNA logs.`baseline()`is a pseudocode placeholder for the customer's historical percentile for the same account over 30 days.

**Triage notes:**

- Validate against emergency support, planned maintenance, and vendor escalation records.

- Escalate when vendor access reaches subscriber data, backup systems, cloud admin, Kubernetes admin, or network management without a clear business reason.

- Preserve session recording, command history, file-transfer logs, and any artifacts created during the session.

## IOC and Sandbox Output Analysis Example

<img src="https://cdn-images-1.medium.com/max/800/1*QO7bJjqWmALpw7lVyI93mQ.png" alt="Article image" width="1536" height="1024" loading="lazy" decoding="async" />

An IOC should not move directly from a public report, sandbox run, or threat feed into a production blocklist. The analyst should turn the IOC into a scoped judgment and, where useful, a hunt hypothesis.

**Input**:
- Suspicious domain, IP, URL, file hash, certificate, user-agent, mutex, or sandbox-extracted callback.

**Step 1:**Preserve Context
- Where did it come from: public report, vendor feed, malware sandbox, SOC alert, partner tip, customer telemetry?
- What was the original claim: C2, phishing, malware delivery, scanner, staging server, exfiltration, or unknown?
- What handling restrictions apply?

**Step 2**: Enrich
- Passive DNS, WHOIS/RDAP, registrar, nameservers, ASN, hosting provider.
- First seen / last seen.
- TLS certificate, JA3/JA4 where available, favicon hash, redirect chain.
- File metadata, signer, compile time, imports, strings, contacted infrastructure, sandbox behavior.
- Reputation across multiple sources, not one score.
- Internal sightings in DNS, proxy, EDR, firewall, email, WAF, and cloud logs.

**Step 3:**Validate
- Is the IOC still live?
- Is it shared infrastructure, CDN, VPN, sinkhole, scanner, parked domain, or legitimate SaaS?
- Does the sandbox behavior match the public claim?
- Is the internal hit a real connection, blocked attempt, DNS prefetch, security scanner, or analyst lookup?

**Step 4:**Score
- Relevance to MagenCell crown jewels.
- Confidence in maliciousness.
- Recency and activity window.
- Specificity: dedicated infrastructure versus shared hosting.
- Internal exposure: seen internally, blocked at edge, or only external reporting.
- Operational risk of blocking.

**Scoring decision heuristic:**
- High tier requires both high confidence in maliciousness and high relevance to MagenCell crown jewels. Neither factor alone is sufficient.
- A high-confidence IOC with low crown-jewel relevance, or a high-relevance IOC with low maliciousness confidence, defaults to medium tier.
- Confirmed internal sightings, meaning real connections rather than prefetch or scanner lookups, can promote a medium-tier IOC to high tier.
- High operational risk of blocking, such as shared CDN infrastructure or critical SaaS, can demote a high-tier IOC to medium-tier action even when confidence and relevance are high. In that case, monitor and hunt rather than block.

**Step 5: Act**
- High confidence and high relevance: block with expiry, open SOC case, hunt related infrastructure, brief owner.
- Medium confidence: create hunt hypothesis, monitor, enrich related infrastructure, avoid broad blocking.
- Low confidence: record as context, do not alert unless correlated with behavior.

**Example output:**
The domain is assessed as suspicious with moderate confidence. It appeared in sandbox output from a telecom-themed lure, resolves to recently created infrastructure, and has no legitimate business relationship with MagenCell. No internal connections are observed. Action: monitor and hunt for related domains, certificate reuse, and email delivery attempts; do not block business-critical shared infrastructure without additional evidence.

## TIP to SIEM Workflow

Use this workflow to prevent CTI from becoming either a passive feed or an unreviewed blocklist.

<img src="https://cdn-images-1.medium.com/max/800/1*HAFUgOys4YzPelw0giCSjg.png" alt="Article image" width="1024" height="1536" loading="lazy" decoding="async" />

```text
Public CTI / vendor report / sandbox output
        |
        v
Source validation
- Who reported it?
- What confidence and evidence are provided?
- Is it government, vendor, partner, internal telemetry, or open source?
        |
        v
Relevance assessment
- Does it affect telecom, Israel-linked risk, cloud, identity, vendor access, Kubernetes, or crown jewels?
- Is it actor reporting, vulnerability reporting, IOC reporting, or TTP reporting?
        |
        v
PIR and SIR mapping
- Which PIR does it help answer?
- Which SIR can be collected internally?
- What decision could change?
        |
        v
Enrichment and normalization
- Enrich IOCs.
- Extract TTPs.
- Map platforms and required logs.
- Set confidence, expiration, and handling.
        |
        v
TIP
- Store source, tags, confidence, sightings, related infrastructure, ATT&CK mapping, expiry, and owner.
- Do not promote indicators to blocking or alerting without confidence, expiry, owner, and false-positive review.
        |
        v
SIEM / hunt / detection engineering
- Build detection or hunt.
- Test against historical telemetry.
- Define false positives and severity.
- Attach escalation path.
        |
        v
SOC / NOC workflow
- Triage alert.
- Validate business context.
- Correlate identity, endpoint, network, cloud, and telecom evidence.
- Escalate to incident command if thresholds are met.
        |
        v
Feedback loop
- Was it useful?
- What false positives appeared?
- What telemetry was missing?
- Should the PIR, SIR, detection, or collection plan change?
```

## Customer Workshop Format

The first customer engagement should create a shared operating picture before writing detections. A practical rhythm:

**Day 1: executive and security-lead discovery**
- Confirm business priorities, crown jewels, risk appetite, regulatory constraints, and current pain points.
- Identify the decisions leadership expects CTI to support.
- Agree on the initial PIR list and confidence language.

**Day 2: telemetry and architecture review**
- Review SIEM, EDR, identity, cloud, Kubernetes, firewall, WAF, NDR, PAM, backup, and telecom-core logging.
- Identify which logs are searchable, retained, normalized, and trusted.
- Build the first collection gap register.

**Day 3: SOC/NOC and telecom-core sessions**
- Walk through NOC change workflows, maintenance windows, network-device administration, and telecom-core access paths.
- Map legitimate access patterns for subscriber metadata, CDR mediation, HLR/HSS/UDM-adjacent systems, and roaming/interconnect platforms: who accesses these systems, from which hosts, under which ticket types, and at what volume. This baseline is required to tune Query 1 for the specific customer environment.
- Identify where SOC alerts need NOC context before escalation.
- Define joint triage fields and escalation thresholds.

**Day 4: identity, cloud, Kubernetes, and third-party access review**
- Review privileged identity, service principals, break-glass accounts, Microsoft Entra Connect or equivalent sync systems, PAM, and vendor access.
- Identify paths from enterprise IT into management plane, cloud deletion, backup tampering, or telecom service impact.

**Day 5: detection backlog and executive readout**
- Present top threat scenarios, validated telemetry, missing visibility, and initial hunt hypotheses.
- Prioritize 5–10 detections or hunts by risk and feasibility.
- Deliver an executive brief with decisions required, owners, and timeline.

**Expected outputs:**

- approved PIRs and SIRs;

- crown-jewel map;

- telemetry coverage map;

- collection gap register;

- prioritized detection and hunt backlog;

- SOC/NOC triage workflow;

- executive risk note.

## Before and After Example

<img src="https://cdn-images-1.medium.com/max/800/1*_qKQA5Bmrdx9wetUEogyIQ.png" alt="Article image" width="1536" height="1024" loading="lazy" decoding="async" />

### Before:

The customer has 200 raw telecom-related IOCs from public reports, vendor feeds, sandbox output, and informal sharing. The SOC has no clear way to decide which IOCs matter, which are stale, which are shared infrastructure, or which should become detections.

**CTI work:**
- Deduplicate and enrich all IOCs.
- Remove expired, parked, shared, sinkholed, and low-confidence indicators.
- Map remaining indicators to PIRs, crown jewels, and public reporting.
- Separate IOCs from TTPs.
- Review internal sightings across DNS, proxy, firewall, EDR, email, WAF, and cloud logs.
- Convert relevant behavior into hunt hypotheses.

### After:

**- 5 prioritized hunt hypotheses:**
1. suspicious network-device administration;
2. anomalous subscriber metadata access;
3. cloud IAM escalation followed by deletion or backup tampering;
4. vendor access outside maintenance windows;
5. telecom-themed phishing or customer API abuse.
**- 3 SIEM detections:**
1. privileged subscriber-data access without ticket or baseline match;
2. cloud role or service-principal change followed by destructive action;
3. vendor privileged session touching crown-jewel networks outside approved window.
**- 2 collection gaps:**
1. missing database audit logs for one subscriber-data platform;
2. incomplete PAM coverage for vendor emergency sessions.
**- 1 executive risk decision:**
approve a 30-day remediation effort for vendor-access monitoring and subscriber-data audit logging before expanding IOC ingestion

## Final 90-Day Implementation Plan

### Days 1–15: establish CTI command of the problem

- approve PIRs;

- define crown jewels;

- inventory telemetry;

- map third-party privileged access;

- identify top 20 internet-exposed assets;

- identify identity paths into telecom core and cloud management;

- build a source register;

- brief SOC/NOC/cloud/IAM leaders.

### Days 16–30: run first compromise assessment

- hunt network-device admin anomalies;

- review cloud privileged changes;

- inspect subscriber metadata access;

- validate backup immutability;

- review Kubernetes cluster-admin bindings;

- check logging survival for critical systems;

- create first executive risk note.

### Days 31–60: engineer priority detections

- deploy detections for network-device config changes;

- deploy detections for unusual subscriber-data access;

- deploy detections for cloud deletion and IAM escalation;

- deploy detections for vendor access outside approved windows;

- build WAF/API detections for customer portal abuse;

- start SOC/NOC weekly joint review.

### Days 61–90: exercise and institutionalize

- run tabletop: Salt Typhoon-style telecom espionage;

- run tabletop: Kyivstar-style destructive outage;

- run tabletop: vendor compromise into management plane;

- validate restore from immutable backup;

- update incident playbooks;

- publish CTI-led detection coverage map;

- present board-level residual risk.

## Final Assessment

MagenCell should treat CTI as a defensive operating system, not as a reporting function. The public record shows that telecom providers face actors who understand their sector: subscriber metadata, telecom-specific protocols, management planes, network devices, cloud control planes, identity bridges, and third-party support paths.

The best defensive strategy is therefore not “buy more tools.” It is:

- define decision-oriented intelligence requirements;

- map crown jewels as adversary objectives;

- collect telemetry from SOC, NOC, cloud, identity, Kubernetes, telecom core, and vendors;

- turn public reporting into internal hypotheses;

- hunt against those hypotheses;

- convert hunts into detections;

- exercise destructive and espionage scenarios;

- brief each consumer in the form they can act on;

- preserve uncertainty and confidence language.

Used this way, CTI changes the defender’s posture from reactive alert handling to threat-informed resilience.

## References

[1][CISA, Enhanced Visibility and Hardening Guidance for Communications Infrastructure](https://www.cisa.gov/resources-tools/resources/enhanced-visibility-and-hardening-guidance-communications-infrastructure)

[2][FBI, Enhanced Visibility and Hardening Guidance PDF](https://www.fbi.gov/file-repository/cyber-alerts/enhanced-visibility-and-hardening-guidance-for-communications-infrastructure.pdf/view)

[3][FBI, PRC targeting of U.S. telecommunications](https://www.fbi.gov/investigate/cyber/alerts/2025/fbi-seeking-tips-about-prc-targeting-of-us-telecommunications)

[4][CrowdStrike, LIMINAL PANDA and telecom sector threats](https://www.crowdstrike.com/en-us/blog/liminal-panda-telecom-sector-threats/)

[5][Cybereason, Operation Soft Cell: A Worldwide Campaign Against Telecommunications Providers](https://www.cybereason.com/blog/research/operation-soft-cell-a-worldwide-campaign-against-telecommunications-providers)

[6][Mandiant, Chinese cyber espionage tactics / UNC3886](https://cloud.google.com/blog/topics/threat-intelligence/chinese-espionage-tactics/)

[7][Microsoft, MERCURY and DEV-1084 destructive attack on hybrid environment](https://www.microsoft.com/en-us/security/blog/2023/04/07/mercury-and-dev-1084-destructive-attack-on-hybrid-environment/)

[8][Microsoft, Iran accelerates cyber operations against Israel](https://blogs.microsoft.com/on-the-issues/2024/02/06/iran-accelerates-cyber-ops-against-israel/)

[9][CISA, Iran Threat Overview and Advisories](https://www.cisa.gov/topics/cyber-threats-and-advisories/advanced-persistent-threats/iran)

[10][CISA, Iran-based cyber actors enabling ransomware attacks](https://www.cisa.gov/news-events/cybersecurity-advisories/aa24-241a)

[11][CISA, IRGC-affiliated CyberAv3ngers advisory](https://www.cisa.gov/sites/default/files/2024-12/aa23-335a-irgc-affiliated-cyber-actors-exploit-plcs-in-multiple-sectors.pdf)(AA23–335A was originally published December 1, 2023; CISA lists a December 18, 2024 update at the current PDF path.)

[12][VEON SEC filing, Kyivstar network targeted by widespread cyberattack](https://www.sec.gov/Archives/edgar/data/1468091/000146809123000114/kyivstarnetworktrgted_12.htm)

[13][VEON SEC filing, Kyivstar cyber incident recovery and impact](https://www.sec.gov/Archives/edgar/data/2062440/000206244026000006/R32.htm)

[14][GSMA, Mobile Telecommunications Security Landscape 2025](https://www.gsma.com/solutions-and-impact/technologies/security/gsma-mobile-telecommunications-security-landscape-2025/)

[15][GSMA, Mobile Telecommunications Security Landscape 2023 PDF](https://www.gsma.com/security/wp-content/uploads/2023/02/GSMA-Mobile-Telecommunications-Security-Landscape-2023_v1_for-website.pdf)

[16][ENISA, 5G Security Controls Matrix](https://www.enisa.europa.eu/publications/5g-matrix/enisa-5g-security-controls-matrix-paper.pdf)

[17][ENISA, 5G Threat Landscape update](https://www.standict.eu/sites/default/files/2021-02/ENISA%205G%20Threat%20Landscape%20-%20Update.pdf)

[18][CISA, Cross-Sector Cybersecurity Performance Goals](https://www.cisa.gov/cybersecurity-performance-goals)

[19][CISA, Cross-Sector CPGs FAQ](https://www.cisa.gov/cross-sector-cybersecurity-performance-goals/frequently-asked-questions)

[20][MITRE ATT&CK](https://attack.mitre.org/)

[21][MITRE, ATT&CK overview](https://www.mitre.org/focus-areas/cybersecurity/mitre-attack)

[22][David Bianco / Sqrrl, The Pyramid of Pain](https://www.threathunting.net/files/A%20Framework%20for%20Cyber%20Threat%20Hunting%20Part%201_%20The%20Pyramid%20of%20Pain%20_%20Sqrrl.pdf)

[23][Lockheed Martin, Cyber Kill Chain](https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-kill-chain.html)

[24][Hutchins, Cloppert, and Amin, Intelligence-Driven Computer Network Defense Informed by Analysis of Adversary Campaigns and Intrusion Kill Chains](https://www.lockheedmartin.com/content/dam/lockheed-martin/rms/documents/cyber/LM-White-Paper-Intel-Driven-Defense.pdf)

[25][Caltagirone, Pendergast, and Betz, The Diamond Model of Intrusion Analysis](https://www.activeresponse.org/wp-content/uploads/2013/07/diamond.pdf)

[26][CIA, A Tradecraft Primer: Structured Analytic Techniques for Improving Intelligence Analysis](https://www.cia.gov/resources/csi/static/Tradecraft-Primer-apr09.pdf)

[27][CIA, Sherman Kent, Words of Estimative Probability](https://www.cia.gov/resources/csi/studies-in-intelligence/archives/vol-8-no-4/words-of-estimative-probability/)

[28][Cybereason press release, Operation Soft Cell](https://www.cybereason.com/press/cybereason-uncovers-massive-state-sponsored-espionage-operation-leveraging-privately-owned-critical-infrastructure-companies)

[29][Mandiant, UNC3886 Exploiting CVE-2023–34048 Since Late 2021](https://cloud.google.com/blog/topics/threat-intelligence/chinese-vmware-exploitation-since-2021/)

[30][Israel National Cyber Directorate, Iron Swords War in Cyber Sphere](https://www.gov.il/BlobFolder/reports/publish_2412/en/report2412en.pdf)

[31][Israel National Cyber Directorate, CERT-IL](https://www.gov.il/he/departments/units/unit_cert_il)

[32][Israel Ministry of Communications, Engineering Administration](https://www.gov.il/en/departments/Units/arc)

[33][CrowdStrike, An Analysis of LightBasin Telecommunications Attacks](https://www.crowdstrike.com/en-us/blog/an-analysis-of-lightbasin-telecommunications-attacks/)

[34][VEON, Kyivstar Completes Preliminary Assessment of the Financial Impact of the Cyberattack](https://www.veon.com/newsroom/press-releases/kyivstar-completes-preliminary-assessment-of-the-financial-impact-of-the-cyberattack)

[35][VEON, Kyivstar restores services in all categories, brings 99% of mobile network back on air](https://www.veon.com/newsroom/press-releases/kyivstar-restores-services-in-all-categories-brings-99-of-mobile-network-back-on-air)

[36][MITRE ATT&CK, Enterprise Matrix](https://attack.mitre.org/matrices/enterprise/)

[37][MITRE ATT&CK, Mobile Matrix](https://attack.mitre.org/matrices/mobile/)

[38][MITRE ATT&CK, ICS Matrix](https://attack.mitre.org/matrices/ics/)

[39][FIRST CTI SIG Curriculum, Priority Intelligence Requirement](https://www.first.org/global/sigs/cti/curriculum/pir)

[40][NATO AJP-2, Intelligence, Counter-Intelligence and Security](https://coi.nato.int/EWCOI/EW%20COI%20Shared%20Documents/WGs/NEWWG/EW%20Policy%20and%20Doctrine%20Panel%20%28EWPDP%29/AJP%203.6%20-%20EW%20Doctrine/AJP-3.6%20References/20160222_NU_AJP_2%20EdA%20V2_Intelligence%2C%20counter-intelligence%20ans%20security.pdf)

## Follow for practical cybersecurity research

If you’re interested in**Offensive security,****AI security, real-world attack simulations, CTI, and detection engineering**— this is exactly what I focus on.

Stay connected:

→**Subscribe on Medium:**[medium.com/@1200km](https://medium.com/@1200km)
→**Connect on LinkedIn:**[andrey-pautov](https://www.linkedin.com/in/andrey-pautov/)
→**GitHub — tools & labs:**[github.com/anpa1200](https://github.com/anpa1200)
→**Contact:**[1200km@gmail.com](mailto:1200km@gmail.com)
