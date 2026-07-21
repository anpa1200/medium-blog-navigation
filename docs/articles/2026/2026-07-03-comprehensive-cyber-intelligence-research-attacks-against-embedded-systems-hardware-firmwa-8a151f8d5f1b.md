---
title: "Comprehensive Cyber Intelligence Research: Attacks Against Embedded Systems, Hardware, Firmware\u2026"
description: ""
image: "https://cdn-images-1.medium.com/max/1024/1*igBKySDQUuXS4X3AYyE0kg.png"
---

# Comprehensive Cyber Intelligence Research: Attacks Against Embedded Systems, Hardware, Firmware…


![Cover image](https://cdn-images-1.medium.com/max/1024/1*igBKySDQUuXS4X3AYyE0kg.png)

:::info Article Metadata
- **Category:** CTI
- **Source article:** [https://infosecwriteups.com/comprehensive-cyber-intelligence-research-attacks-against-embedded-systems-hardware-firmware-8a151f8d5f1b](https://infosecwriteups.com/comprehensive-cyber-intelligence-research-attacks-against-embedded-systems-hardware-firmware-8a151f8d5f1b)
- **Published:** 2026-07-03
- **Preserved media:** 49 image(s), including cover images, screenshots, diagrams, and infographics where present.
- **Preserved technical blocks:** 0 code/configuration block(s).
:::

## Ecosystem Fit

This page mirrors the original Medium RSS article into the 1200km.com Docusaurus ecosystem. The article flow, images, screenshots, infographics, and technical blocks are preserved from the Medium feed.

## Comprehensive Cyber Intelligence Research: Attacks Against Embedded Systems, Hardware, Firmware, and Hardware Vendors

Date: 2026–07–02 Version: Final source-verified edition

![Article image](https://cdn-images-1.medium.com/max/1024/1*igBKySDQUuXS4X3AYyE0kg.png)

&gt; Confidence scale used in this report:

- **Confirmed**— corroborated by a primary/authoritative source (vendor PSIRT, CISA, NVD, MITRE, named research lab).
- **High confidence**— multiple independent secondary sources agree; consistent with primary reporting.
- **Assessed**— analyst judgment/inference from available evidence.

## Table of contents

1. **Executive intelligence judgment**
2. **Scope**
3. **Strategic threat model**
4. **Highest-priority intelligence findings****
**1. Edge devices are the leading practical attack path
2. Post-compromise persistence is the real risk, not only initial CVE exploitation
3. BMC compromise has become a practical enterprise concern
4. UEFI and boot trust remain fragile
5. Silicon, microcode, GPU, and confidential-computing vulnerabilities change the trust boundary
6. SOHO and IoT devices are now strategic proxy infrastructure
7. OT/IoT firmware risk is more about lifecycle than a single mega-CVE
5. **Vendor and ecosystem risk matrix**
6. **Campaign and case-study intelligence****
**Volt Typhoon and KV Botnet
ArcaneDoor and FIRESTARTER
UNC3886 on Juniper routers
UNC5221 and Ivanti Connect Secure
UNC4841 and Barracuda ESG
Sandworm, Cyclops Blink, and AcidRain
7. **Vulnerability classes that matter most**
8. **Priority collection requirements****
**Asset inventory
Threat-intelligence monitoring
Detection telemetry
9. **Defensive operating model****
**Immediate priorities
Firmware and hardware priorities
Incident-response priorities
10. **Prioritized risk ranking**
11. **Intelligence gaps and validation tasks**
12. **Research conclusion**
13. **Source base**

## Executive intelligence judgment

The dominant security risk for embedded and hardware-adjacent environments is no longer theoretical firmware compromise. It is operational compromise of high-trust devices that sit outside normal endpoint telemetry: VPN gateways, firewalls, routers, BMCs, UEFI boot paths, GPU/AI accelerators, SOHO infrastructure, and OT/IoT devices.

![Article image](https://cdn-images-1.medium.com/max/1024/1*WmVtMkZWR1elwgbgnYZsAw.png)

The highest-confidence trend across government advisories, vendor incident reports, and research-lab disclosures is that adversaries increasingly use these systems as initial-access points, covert relay infrastructure, persistence anchors, and surveillance positions.

The most urgent enterprise risk is internet-facing network edge infrastructure. CISA, Mandiant/Google, Cisco, Fortinet, Palo Alto, Ivanti, Barracuda, Juniper, and multiple national cyber agencies converge on the same finding: VPNs, firewalls, routers, mail-security appliances, and unsupported edge devices are disproportionately exploited because they broker trust, hold credentials, inspect traffic, and often lack EDR-grade visibility.[**CISA Binding Operational Directive (BOD) 26–02**](https://www.cisa.gov/news-events/directives/bod-26-02-mitigating-risk-end-support-edge-devices)**, issued February 5, 2026 (Confirmed)**, formalizes end-of-support edge hardware and software as a federal priority: 3-month inventory, 12-month decommissioning for listed EOS devices, 18-month decommission-or-replace for all EOS edge devices, and 24-month continuous lifecycle management.

The second strategic risk is below-OS compromise.

![Article image](https://cdn-images-1.medium.com/max/1024/1*LxYMY83fOVVO3zAD3pLq0A.png)

UEFI bootkits, Secure Boot bypasses,[PixieFail](https://thehackernews.com/2024/01/pixiefail-uefi-flaws-expose-millions-of.html)-style preboot network bugs,[LogoFAIL](https://www.kaspersky.com/blog/logofail-uefi-vulnerabilities/50160/)image-parser vulnerabilities, AMI MegaRAC BMC[authentication bypass](https://beyondmachines.net/event_details/critical-authentication-bypass-vulnerability-in-ami-megarac-bmc-software-r-z-3-c-r),[Cisco FIRESTARTER persistence](https://www.cisa.gov/news-events/analysis-reports/ar26-113a), and[FortiGate symlink persistence](https://www.sentinelone.com/vulnerability-database/cve-2025-68686/)show that patching the primary OS or applying a single vendor update may not evict an attacker. Some compromise scenarios require reimage, clean firmware replacement, credential rotation, certificate rotation, and attestation review.

The third strategic risk is inherited component exposure. Many organizations do not know whether their device fleet embeds AMI MegaRAC, EDK II/TianoCore, libssh2, vulnerable GPU drivers, outdated Linux kernels, OpenSSL/mbedTLS variants, or OEM-specific UEFI code. This weak mapping is what turns a component CVE into a months-long downstream remediation problem.

## Scope

This report covers cyber intelligence on attacks and vulnerabilities affecting:

- **Embedded systems:**routers, firewalls, VPN appliances, switches, SOHO devices, IP cameras, NVRs, IoT gateways, cellular routers, OT devices, PLC-adjacent infrastructure, BMS/BAS devices, and medical/IoMT systems.
- **Hardware and firmware:**UEFI/BIOS, Secure Boot, bootloaders, BMCs, CPU microcode, GPU local memory and drivers, silicon trust anchors, secure enclaves, trusted execution environments, management controllers, and firmware update chains.
- **Hardware and appliance vendors:**Cisco, Fortinet, Palo Alto Networks, Ivanti, Juniper, Barracuda, WatchGuard, ASUS, NETGEAR, DrayTek, AMI, Supermicro, Gigabyte, AMD, Intel, NVIDIA, Arm, Qualcomm, Apple, Imagination Technologies, Siemens, Schneider Electric, Rockwell, and other OT/IoT vendors.
- **Threat actors and campaigns:**PRC-linked Volt Typhoon/KV Botnet, UNC3886, UNC5221, UNC4841, Sandworm/Cyclops Blink, UAT-4356/ArcaneDoor/FIRESTARTER, destructive modem-router operations such as AcidRain, Mirai-derived IoT botnets, and ransomware/financial groups exploiting edge devices.

## Strategic threat model

### What adversaries want from embedded and hardware systems

![Article image](https://cdn-images-1.medium.com/max/1024/1*1x86Shq6jHmz-FQc98HJTA.png)

1. **Initial access:**exploit exposed VPN, firewall, router, mail-security, MDM, and management appliances before defenders see endpoint alerts.
2. **Credential access:**steal VPN secrets, firewall configs, authentication cookies, certificates, local admin hashes, SSH keys, cloud integration credentials, and service-account secrets.
3. **Covert relay:**use SOHO routers, cameras, NVRs, and compromised appliances as operational relay infrastructure to mask attribution and bypass IP-reputation controls.
4. **Persistence:**implant firmware, alter startup scripts, abuse symlinks, patch appliance processes, modify boot paths, or compromise BMC/UEFI layers.
5. **Traffic visibility:**observe or tamper with firewall, VPN, router, mail gateway, and SD-WAN flows.
6. **Lateral movement:**pivot from trusted edge devices into Active Directory, management networks, cloud control planes, OT jump hosts, and virtualization infrastructure.
7. **Destruction and disruption:**wipe modems, break communications, reload firewalls, disable logging, or use IoT botnets for DDoS.

### Why embedded systems are attractive

![Article image](https://cdn-images-1.medium.com/max/1024/1*YQx3yfjfxU80ZbMD-Hj0wQ.png)

- They sit at trust boundaries and often face the internet.
- They are rarely covered by normal EDR.
- Logging is thin, vendor-specific, and often volatile.
- Many run old Linux, VxWorks, BSD, BusyBox, RTOS, or vendor-forked code.
- Patching is slower because updates depend on OEM validation, maintenance windows, and hardware support.
- End-of-life hardware often remains in production for years.
- Firmware supply chains obscure inherited components.
- Admins often treat appliances as “black boxes” rather than Tier-0 systems.

## Highest-priority intelligence findings

### 1. Edge devices are the leading practical attack path

[Mandiant M-Trends 2025](https://services.google.com/fh/files/misc/m-trends-2025-en.pdf)reported that the most frequently exploited vulnerabilities in its 2024 investigations affected security devices typically placed at the network edge, and that several were zero-days (Confirmed).

![Article image](https://cdn-images-1.medium.com/max/672/1*TfMDubGVQrHsJF8tGSjgxQ.png)

[CISA’s BOD 26–02](https://www.cisa.gov/news-events/directives/bod-26-02-mitigating-risk-end-support-edge-devices)escalates the same issue to federal operational policy: unsupported firewalls, routers, load balancers, VPN gateways, and similar edge assets must be inventoried, upgraded, replaced, or otherwise mitigated on a defined two-year timeline (Confirmed).

**High-confidence examples (all Confirmed via NVD/vendor advisories):**

- Palo Alto PAN-OS GlobalProtect[**CVE-2024–3400**](https://security.paloaltonetworks.com/CVE-2024-3400), used in[Operation MidnightEclipse](https://unit42.paloaltonetworks.com/cve-2024-3400/).

![Article image](https://cdn-images-1.medium.com/max/1024/1*YSWyTJddFB_kl1nicb3s-g.png)

Ivanti Connect Secure and Policy Secure exploitation chains, including**CVE-2023–46805 + CVE-2024–21887**and later[**CVE-2025–22457**](https://forums.ivanti.com/s/article/April-Security-Advisory-Ivanti-Connect-Secure-Policy-Secure-ZTA-Gateways-CVE-2025-22457).

![Article image](https://cdn-images-1.medium.com/max/1024/1*rHkg8_mMNjKrqoaahIjUHg.png)

[Cisco IOS XE**CVE-2023–20198 + CVE-2023–20273**.](https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-iosxe-webui-privesc-j22SaA4z)

![Article image](https://cdn-images-1.medium.com/max/1024/1*N5aowm60lUnsZCLUqeWAcg.png)

Cisco ASA/FTD[ArcaneDoor](https://blog.talosintelligence.com/arcanedoor-new-espionage-focused-campaign-found-targeting-perimeter-network-devices/)and later**CVE-2025–20333 / CVE-2025–20362**/[FIRESTARTER](https://www.cisa.gov/news-events/analysis-reports/ar26-113a)activity. Per[CISA AR26–113A](https://www.cisa.gov/news-events/analysis-reports/ar26-113a), CVE-2025–20333 is a missing-authorization flaw (CWE-862) and CVE-2025–20362 is a buffer overflow (CWE-120); some press coverage labels them in the reverse order, so cite CISA’s classification.

![Article image](https://cdn-images-1.medium.com/max/1024/1*BgKYz_CHBUjpWHF2NuUhuA.png)

Fortinet FortiOS/FortiProxy SSL-VPN exploitation and symlink persistence.

![Article image](https://cdn-images-1.medium.com/max/1024/1*zwVZYUac3mqQE3Vo8_SBxA.png)

Barracuda ESG[**CVE-2023–2868**](https://www.barracuda.com/company/legal/esg-vulnerability), where replacement rather than patch-only remediation became necessary.

![Article image](https://cdn-images-1.medium.com/max/1024/1*CYATdQ__-9pVJ3ylw69HxA.png)

**Assessment:**exposed edge appliances should be classified as Tier-0. They are closer to domain controllers than to ordinary infrastructure because compromise can reveal identity material and traffic secrets.

### 2. Post-compromise persistence is the real risk, not only initial CVE exploitation

Several incidents show attackers altering device state in ways that survive normal operations:

[**Cisco FIRESTARTER**](https://www.cisa.gov/news-events/analysis-reports/ar26-113a)**(Confirmed).**A Linux ELF backdoor for Cisco ASA/FTD/Firepower disclosed jointly by CISA and NCSC-UK on April 23, 2026 (AR26–113A). Initial access was via CVE-2025–20333 and/or CVE-2025–20362; the actor first deployed the**LINE VIPER**user-mode shellcode loader, then dropped**FIRESTARTER**as the durable foothold. FIRESTARTER hooks LINA (the core ASA process), re-launches on termination, and survives reboots, software upgrades, and patching. Per[CISA](https://www.cisa.gov/news-events/news/cisa-warns-firestarter-malware-targeting-cisco-asa-including-firepower-and-secure-firewall-products)/[Cisco](https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-asaftd-persist-CISAED25-03), reliable removal requires a hard power cycle**plus**reimage to fixed software. Activity was observed as recently as March 2026. Attributed to UAT-4356 ([Cisco Talos](https://blog.talosintelligence.com/uat-4356-firestarter/)) / Storm-1849 (Microsoft), overlapping[ArcaneDoor](https://blog.talosintelligence.com/arcanedoor-new-espionage-focused-campaign-found-targeting-perimeter-network-devices/).

![Article image](https://cdn-images-1.medium.com/max/1024/1*yu6k3Wqkwijw1StXpkvbkw.png)

[**Fortinet SSL-VPN symlink persistence**](https://fortiguard.fortinet.com/psirt/FG-IR-25-934)**.**Prior exploitation could leave read-only filesystem access surviving ordinary patching (Confirmed; FG-IR-25–934, CVE-2025–68686).

![Article image](https://cdn-images-1.medium.com/max/1024/1*Ka33eziBsdAQKEHhE_qBUw.png)

[**Barracuda ESG**](https://www.barracuda.com/company/legal/esg-vulnerability)**.**Vendor recommended replacement of affected appliances after CVE-2023–2868 compromise (Confirmed).

![Article image](https://cdn-images-1.medium.com/max/1024/1*4tdu0VvpzS1ZVctHXsH74A.png)

[**BlackLotus**](https://www.eset.com/us/about/newsroom/research/eset-research-analyzes-blacklotus-a-uefi-bootkit-that-can-bypass-uefi-secure-boot-on-fully-patched-systems/)**.**Used Secure Boot bypass ([CVE-2022–21894](https://www.microsoft.com/en-us/security/blog/2023/04/11/guidance-for-investigating-attacks-using-cve-2022-21894-the-blacklotus-campaign/)) and boot-chain manipulation (Confirmed).

![Article image](https://cdn-images-1.medium.com/max/1024/1*rGPY4AyUo3lKreMXmkmKLQ.png)

[**UNC3886**](https://attack.mitre.org/groups/G1048/)**.**Deployed TINYSHELL-based backdoors on Juniper Junos routers and disabled logging (Confirmed;[MITRE C0056 “RedPenguin”](https://attack.mitre.org/campaigns/C0056/)).

![Article image](https://cdn-images-1.medium.com/max/1024/1*WNPtOrShogejGlWQ53KYdA.png)

[**Cyclops Blink**](https://media.defense.gov/2022/Feb/23/2002943421/-1/-1/0/CSA_NEW_SANDWORM_MALWARE_CYCLOPS_BLINK_REPLACES_VPNFILTER_20220223.PDF)**.**Modular network-device malware with persistence on firewall/router appliances (Confirmed).

![Article image](https://cdn-images-1.medium.com/max/1024/1*_bFIN029krOUVCSou3n6TA.png)

**Assessment:**IR playbooks must separate “vulnerability remediation” from “attacker eviction.” For embedded assets, eviction may require reimaging, clean firmware replacement, factory reset, config rebuild, credential rotation, and forensic validation.

### 3. BMC compromise has become a practical enterprise concern

![Article image](https://cdn-images-1.medium.com/max/1024/1*6jmTAtyW-qSVBXkpzVIQgA.png)

**AMI MegaRAC SPx**[**CVE-2024–54085**](https://nvd.nist.gov/vuln/detail/CVE-2024-54085)**(Confirmed).**A remote authentication-bypass-by-spoofing in the Redfish Host Interface, CVSS v4.0 10.0.[Eclypsium](https://eclypsium.com/blog/ami-megarac-vulnerabilities-bmc-part-3/)disclosed it and AMI shipped fixes in March 2025; CISA added it to the[KEV catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)on June 25, 2025 based on evidence of active exploitation — the first BMC vulnerability in the KEV. It affects BMC firmware used across many downstream server OEMs.

Impact model:

- Power control, remote console, virtual media, firmware updates, and host telemetry can be abused.
- The BMC can become a stealth persistence layer even if the host OS is rebuilt.
- Downstream patching depends on OEMs, not only AMI, so coverage is uneven.
- Exposure of Redfish/IPMI interfaces to untrusted networks is a critical architecture failure (&gt;1,000 exposed instances were observed on Shodan at disclosure).

**Assessment:**BMC networks must be isolated, monitored, and inventoried at firmware-version granularity.

### 4. UEFI and boot trust remain fragile

BlackLotus, LogoFAIL, PixieFail, Bootkitty, and the 2026 Secure Boot certificate migration point to one conclusion: Secure Boot is a system, not a switch. It depends on firmware quality, revocation state, db/dbx/KEK state, bootloader servicing, OEM firmware updates, and downstream integration.

**Important cases (all Confirmed):**

[**BlackLotus**](https://www.eset.com/us/about/newsroom/research/eset-research-analyzes-blacklotus-a-uefi-bootkit-that-can-bypass-uefi-secure-boot-on-fully-patched-systems/)exploited[CVE-2022–21894](https://www.microsoft.com/en-us/security/blog/2023/04/11/guidance-for-investigating-attacks-using-cve-2022-21894-the-blacklotus-campaign/)to bypass Secure Boot and install a UEFI bootkit.

![Article image](https://cdn-images-1.medium.com/proxy/1*rGPY4AyUo3lKreMXmkmKLQ.png)

[**LogoFAIL**](https://www.binarly.io/reports/logofail)exposed UEFI image-parser vulnerabilities across firmware supply chains.

![Article image](https://cdn-images-1.medium.com/max/1024/1*1ZSKpJbKe8GazYUSVvYobw.png)

[**PixieFail**](https://blog.quarkslab.com/pixiefail-nine-vulnerabilities-in-tianocores-edk-ii-ipv6-network-stack.html)exposed nine vulnerabilities in EDK II’s IPv6 network stack used during PXE/preboot.

![Article image](https://cdn-images-1.medium.com/max/1024/1*BPUhdhGrV2CQ-kgQ2e3r0Q.png)

[**Bootkitty**](https://www.binarly.io/blog/logofail-exploited-deploy-bootkitty-first-uefi-bootkit-linux)demonstrated a Linux UEFI bootkit and LogoFAIL-related exploitation paths.

![Article image](https://cdn-images-1.medium.com/max/1024/1*JHgKRBKO0E4FfigYXei9dg.png)

[**Secure Boot 2011 certificate expiry**](https://support.microsoft.com/en-us/topic/windows-secure-boot-certificate-expiration-and-ca-updates-7ff40d33-95dc-4c3c-8725-a9b95457578e)**.**Microsoft Corporation**KEK CA 2011**expired**June 24, 2026**;**Microsoft Corporation UEFI CA 2011**on**June 27, 2026**;**Microsoft Windows Production PCA 2011**expires**October 19, 2026**. Devices without the 2023 CAs keep booting but lose the ability to receive future Secure Boot db/dbx and revocation updates, and Linux shim binaries signed only with the 2023 key will not boot on un-migrated firmware.

**Assessment:**maintain a Secure Boot state inventory (enabled status, db/dbx/KEK versions, 2011-vs-2023 certificates, shim/bootloader versions, attestation evidence). This is a firmware lifecycle problem, not only a Windows or Linux patching problem.

### 5. Silicon, microcode, GPU, and confidential-computing vulnerabilities change the trust boundary

Recent CPU/GPU research shows hardware isolation assumptions can fail:

[**AMD EntrySign / CVE-2024–36347 (AMD-SB-7033)**](https://www.amd.com/en/resources/product-security/bulletin/amd-sb-7033.html)**(Confirmed).**Improper microcode signature verification (weak AES-CMAC-based hashing, reused NIST example key) lets a ring-0 attacker load malicious/forged microcode on Zen 1–5. The companion SEV-firmware issue is[CVE-2024–56161 (AMD-SB-3019)](https://www.amd.com/en/resources/product-security/bulletin/amd-sb-3019.html). Full fix requires an OEM BIOS/PI firmware update.

![Article image](https://cdn-images-1.medium.com/max/1024/1*0lEXSglpGqlpyYbG2jgMVg.png)

[**AMD SEV-SNP “Fabricked” / CVE-2025–54510 (AMD-SB-3034)**](https://www.amd.com/en/resources/product-security/bulletin/amd-sb-3034.html)**(Confirmed).**A missing-lock check in AMD Secure Processor firmware lets a privileged attacker alter MMIO routing and compromise SEV-SNP guest integrity; researchers (ETH Zurich) confirmed on Zen 5 EPYC, with firmware fixes also listed for Zen 3/4. CVSS 5.9 (Medium).

![Article image](https://cdn-images-1.medium.com/max/1024/1*cW2equc_u5eU5_rAR4JS0Q.png)

[**Intel Downfall / Gather Data Sampling / CVE-2022–40982**](https://www.intel.com/content/www/us/en/developer/articles/technical/software-security-guidance/advisory-guidance/gather-data-sampling.html)**(Confirmed).**Local side-channel can infer stale vector-register data across security boundaries.

![Article image](https://cdn-images-1.medium.com/max/1024/1*-SrLnGOKJ3G55spnE8jSLg.png)

**AMD Zenbleed and Inception (Confirmed).**Speculative-execution / microarchitectural leakage across AMD CPU families.

![Article image](https://cdn-images-1.medium.com/max/1024/1*osM1py7Jd1K8Hkfxs7G0mw.png)

[**Trail of Bits LeftoverLocals / CVE-2023–4969**](https://blog.trailofbits.com/2024/01/16/leftoverlocals-listening-to-llm-responses-through-leaked-gpu-local-memory/)**(Confirmed).**GPU local-memory leakage across Apple, Qualcomm, AMD, and Imagination GPUs, with special relevance to LLM/ML inference confidentiality.

![Article image](https://cdn-images-1.medium.com/max/1024/1*ZTSx7QuU535_5kQjWyyNcw.png)

[**NVIDIA Jetson Linux/NvGPU bulletins**show embedded GPU stacks can contain privilege-escalation and isolation flaws.](https://www.sentinelone.com/vulnerability-database/cve-2024-0126/)

![Article image](https://cdn-images-1.medium.com/max/1024/1*WMnTcZi6KkSE8jJToQ81RA.png)

**Assessment:**hardware isolation is not binary. For cloud, AI, and edge compute, firmware/microcode currency and tenant-isolation policy are part of the security boundary. Note most of these require local/privileged access — they are trust-boundary and confidential-computing risks, not remote pre-auth RCE.

### 6. SOHO and IoT devices are now strategic proxy infrastructure

PRC-linked[Volt Typhoon](https://www.cisa.gov/news-events/cybersecurity-advisories/aa24-038a)/[KV Botnet](https://attack.mitre.org/campaigns/C0035/)operations,[DOJ disruption activity](https://www.justice.gov/archives/opa/pr/us-government-disrupts-botnet-peoples-republic-china-used-conceal-hacking-critical), MITRE campaign mapping (C0035), and joint advisories show compromised SOHO routers and IoT devices being used to hide C2 and target critical infrastructure — not commodity DDoS (Confirmed).

**Relevant cases:**

[KV Botnet](https://attack.mitre.org/campaigns/C0035/)activity against end-of-life Cisco, NETGEAR, DrayTek, and similar SOHO equipment.

![Article image](https://cdn-images-1.medium.com/max/1024/1*fhxZd0RNKqSDRqxj-eokiQ.png)

[Cyclops Blink](https://www.trendmicro.com/en_us/research/22/c/cyclops-blink-sets-sights-on-asus-routers--.html)on WatchGuard and ASUS devices, linked to Sandworm.

![Article image](https://cdn-images-1.medium.com/proxy/1*_bFIN029krOUVCSou3n6TA.png)

[InfectedSlurs](https://www.akamai.com/blog/security-research/new-rce-botnet-spreads-mirai-via-zero-days)Mirai-derived botnet exploiting router and NVR zero-days.

![Article image](https://cdn-images-1.medium.com/max/1024/1*wNpidsK9is7u81MHbLvkbA.png)

[AcidRain](https://www.sentinelone.com/labs/acidrain-a-modem-wiper-rains-down-on-europe/)wiper against Viasat KA-SAT modems, with spillover effects across Europe.

![Article image](https://cdn-images-1.medium.com/max/1024/1*smAw5LVJzhsf_0hdIMlacQ.png)

**Assessment:**do not ignore home-office routers and unmanaged ISP devices when employees, executives, admins, or OT maintainers access sensitive environments remotely.

### 7. OT/IoT firmware risk is more about lifecycle than a single mega-CVE

Forescout, Claroty, Nozomi, and CISA ICS advisories show persistent risk in OT/IoT and cyber-physical systems:

Forescout’s[*Rough Around the Edges*](https://www.forescout.com/press-releases/ot-iot-router-firmware-outdated-software-vulnerabilities/)research found popular OT/IoT router firmware images containing outdated components and many exploitable n-day vulnerabilities (Confirmed).

![Article image](https://cdn-images-1.medium.com/max/1024/1*83TA1F_C-IAPwv2uux1Mdw.png)

Forescout’s[2025 threat report](https://www.forescout.com/blog/2025-threat-report-exploitation-grows-across-it-iot-and-ot/)highlights growing exploitation across IT, IoT, OT, and IoMT (Confirmed).

- [Claroty Team82’s disclosure dashboard](https://claroty.com/team82/disclosure-dashboard)tracks hundreds of cyber-physical vulnerabilities across vendors (Confirmed).
- [Nozomi’s February 2026 OT/IoT report](https://www.nozominetworks.com/ot-iot-cybersecurity-trends-insights-february-2026)uses customer telemetry and honeypots (Confirmed).
- [CISA ICS advisories](https://www.cisa.gov/news-events/ics-advisories)continue to cover Siemens, Schneider Electric, Rockwell, Delta, and niche vendors (Confirmed).

**Assessment:**the main control failure is weak asset intelligence — unknown firmware versions, unsupported devices, weak segmentation, exposed management, and missing compensating controls where patching is unsafe or impossible.

## Vendor and ecosystem risk matrix

![Article image](https://cdn-images-1.medium.com/max/1024/1*nRCGtn7_5n1vYXZKEBpyGg.png)

## Campaign and case-study intelligence

## Volt Typhoon and KV Botnet

![Article image](https://cdn-images-1.medium.com/max/1024/1*uzS055AQuoa7uSlMVpdJ3g.png)

- **Actor type:**PRC state-sponsored.
- **Targets:**critical infrastructure — communications, energy, transportation, water, Guam-related and other strategic networks.
- **Infrastructure:**compromised SOHO/edge devices, including end-of-life Cisco and NETGEAR equipment, to hide origin and blend with legitimate traffic ([CISA AA24–038A](https://www.cisa.gov/news-events/cybersecurity-advisories/aa24-038a);[MITRE C0035](https://attack.mitre.org/campaigns/C0035/)).
- **Tradecraft:**living-off-the-land after access; proxying through compromised SOHO devices; long-term pre-positioning over smash-and-grab.
- **Defender priorities:**inventory remote-access paths and third-party connections; monitor for appliance-originated outbound anomalies; reduce IP-reputation dependence; replace unsupported gear in sensitive contexts.

## ArcaneDoor and FIRESTARTER

![Article image](https://cdn-images-1.medium.com/max/1024/1*ukq-jk8I7OFeMUgF2eBVOg.png)

- **Actor type:**state-sponsored, tracked as UAT-4356 ([Cisco Talos](https://blog.talosintelligence.com/uat-4356-firestarter/)) / Storm-1849 (Microsoft).
- **Targets:**Cisco ASA, FTD, Firepower, perimeter devices.
- **Tradecraft:**appliance-native malware (LINE VIPER loader → FIRESTARTER persistence); survives reboots, upgrades, and patching; LINA hooking; re-access without re-exploitation.
- **Defender priorities:**use Cisco/CISA detection guidance and fixed releases; treat patched devices as potentially compromised if exposed during exploitation windows; preserve volatile evidence (avoid hard power cycles before collection); hard power cycle**plus**reimage to fixed code for eviction; rotate credentials, certificates, and VPN secrets.

## UNC3886 on Juniper routers

![Article image](https://cdn-images-1.medium.com/max/1024/1*olfebpY46JWZkGYupa1EcA.png)

- **Actor type:**China-nexus espionage ([MITRE G1048](https://attack.mitre.org/groups/G1048/); Campaign[C0056 “RedPenguin”](https://attack.mitre.org/campaigns/C0056/)).
- **Targets:**Juniper Junos routers, especially older/EOL MX devices.
- **Tradecraft:**TINYSHELL-based passive/active backdoors; scripts that disable logging; network-device-native persistence.
- **Defender priorities:**monitor router filesystem integrity and config drift; retire unsupported hardware; export logs off-device to tamper-resistant storage; treat routers as monitored servers.

## UNC5221 and Ivanti Connect Secure

![Article image](https://cdn-images-1.medium.com/max/1024/1*SO3I5JMOAgh9OlqoyepYqQ.png)

- **Actor type:**suspected China-nexus espionage.
- **Targets:**Ivanti Connect Secure VPN appliances.
- **Tradecraft:**[CVE-2025–22457](https://forums.ivanti.com/s/article/April-Security-Advisory-Ivanti-Connect-Secure-Policy-Secure-ZTA-Gateways-CVE-2025-22457)exploitation;[TRAILBLAZE and BRUSHFIRE](https://cloud.google.com/blog/topics/threat-intelligence/china-nexus-exploiting-critical-ivanti-vulnerability)malware alongside SPAWN-ecosystem tooling; targeting EOL/outdated versions.
- **Defender priorities:**run the Ivanti Integrity Checker Tool; patch to supported trains; rebuild appliances where evidence indicates durable compromise.

## UNC4841 and Barracuda ESG

![Article image](https://cdn-images-1.medium.com/max/1024/1*ZzzZ9IBztOUnsohk-lZs9Q.png)

- **Actor type:**suspected China-nexus espionage.
- **Targets:**Barracuda Email Security Gateway appliances.
- **Tradecraft:**[CVE-2023–2868](https://www.barracuda.com/company/legal/esg-vulnerability)command injection via attachment parsing;[on-appliance malware](https://cloud.google.com/blog/topics/threat-intelligence/barracuda-esg-exploited-globally/); data theft and lateral movement from the mail-gateway position.
- **Defender priorities:**follow[Barracuda replacement guidance](https://www.barracuda.com/company/legal/esg-vulnerability); review mail logs, forwarding rules, admin accounts, and credential reuse.

## Sandworm, Cyclops Blink, and AcidRain

![Article image](https://cdn-images-1.medium.com/max/1024/1*95RlSU3LpMPqjSpx7doIvQ.png)

- **Actor type:**Russian state-linked; wartime destructive activity.
- **Targets:**WatchGuard/ASUS routers, firewalls, modems, communications infrastructure.
- **Tradecraft:**[Cyclops Blink](https://media.defense.gov/2022/Feb/23/2002943421/-1/-1/0/CSA_NEW_SANDWORM_MALWARE_CYCLOPS_BLINK_REPLACES_VPNFILTER_20220223.PDF)modular network-device malware; router/firewall botnets;[AcidRain](https://www.sentinelone.com/labs/acidrain-a-modem-wiper-rains-down-on-europe/)destructive modem wiping in the Viasat KA-SAT incident.
- **Defender priorities:**maintain offline config backups for critical comms devices; segment satellite/telecom modems and remote-management paths; hold replacement stock for critical field devices.

## Vulnerability classes that matter most

![Article image](https://cdn-images-1.medium.com/max/1024/1*uUo7K9N2_G4CVgrViPrSQw.png)

## Priority collection requirements

### Asset inventory

![Article image](https://cdn-images-1.medium.com/max/1024/1*gNlB0wVnlgpSlw9M4EcbWw.png)

- Vendor, model, hardware revision, serial number.
- Firmware, BIOS/UEFI, bootloader, BMC, microcode, GPU driver, and OS versions.
- Enabled features: SSL-VPN, GlobalProtect, Web UI, Redfish, IPMI, SSH, SNMP, PXE, captive portal, SD-WAN management, remote console.
- External and management-plane exposure.
- End-of-support / end-of-life status.
- Inherited components: AMI MegaRAC, EDK II, OpenSSL, mbedTLS, libssh2, BusyBox, Linux kernel, vendor SDKs.
- Secure Boot state: enabled; db/dbx/KEK versions; 2011-vs-2023 Microsoft certificates; shim/bootloader versions.

### Threat-intelligence monitoring

![Article image](https://cdn-images-1.medium.com/max/1024/1*cdLoG62qcA4CgwtNfS3_tA.png)

- CISA KEV additions for appliance, firmware, OT/IoT, and hardware vendors.
- Vendor PSIRT feeds: Cisco, Fortinet, Palo Alto, Ivanti, Juniper, Barracuda, AMI, Supermicro, Gigabyte, AMD, Intel, NVIDIA, Arm, Qualcomm, Apple.
- Research/vendor intel: Mandiant/Google, Cisco Talos, Unit 42, Microsoft MSTIC, ESET, Binarly, Eclypsium, Quarkslab, Trail of Bits, Akamai, Forescout, Claroty, Nozomi.
- Shadowserver exposure data and Censys/Shodan-style scans.
- Exploit/PoC availability, with care around malicious PoC repositories.

### Detection telemetry

![Article image](https://cdn-images-1.medium.com/max/1024/1*6_QX2y5QctoD2PlWislTxA.png)

- Appliance config changes.
- New admin users, SSH keys, API tokens, certificates, VPN accounts.
- Unexpected enablement of remote-access features.
- Off-device logs from routers, firewalls, VPNs, BMCs, OT gateways.
- BMC Redfish/IPMI login anomalies.
- Firewall/VPN outbound connections to unusual destinations.
- Startup-script changes, symlinks, mount-list changes, webshells, altered init scripts.
- Secure Boot/dbx and bootloader changes.
- Firmware update and rollback events.
- Hypervisor and GPU memory-isolation alerts for AI/shared compute.

## Defensive operating model

### Immediate priorities

![Article image](https://cdn-images-1.medium.com/max/1024/1*OqIWcsQxRCpWPS5hGwNIHg.png)

1. Identify all internet-facing VPNs, firewalls, routers, mail gateways, load balancers, MDM appliances, and BMCs.
2. Remove or restrict public management interfaces.
3. Replace unsupported edge devices or isolate them behind compensating controls until replacement.
4. Patch known-exploited edge CVEs per CISA KEV and vendor emergency advisories.
5. For devices exposed during active exploitation windows, assume compromise until validated.
6. Rotate secrets stored on compromised or exposed appliances.
7. Export logs off-device to tamper-resistant storage.

### Firmware and hardware priorities

![Article image](https://cdn-images-1.medium.com/max/1024/1*1BVA9iNryrPfHLP1xNvJ8Q.png)

1. Build a firmware-aware inventory.
2. Track UEFI, BMC, microcode, GPU firmware/driver, bootloader, dbx, and Secure Boot certificate states.
3. Apply OEM BIOS/BMC updates for AMI MegaRAC, EDK II/PixieFail, LogoFAIL, AMD microcode (SB-7033), SEV-SNP (SB-3034), Intel side-channel, and GPU bulletins.
4. Audit Secure Boot 2011→2023 certificate migration, especially after the June 24 / June 27, 2026 KEK/UEFI CA expirations and the October 19, 2026 Production PCA expiration.
5. Implement measured boot and remote attestation where available.
6. Disable PXE/network boot where not needed.
7. Lock JTAG/SWD/UART/debug ports and document exceptions.

### Incident-response priorities

![Article image](https://cdn-images-1.medium.com/max/1024/1*acynDT25BEHe636NWdDvcA.png)

1. Preserve volatile evidence before patch/reboot/reimage where possible (for FIRESTARTER, avoid hard power cycles before core-dump collection).
2. Determine whether the vendor has warned about persistence.
3. Distinguish patch-only from patch-plus-validation and reimage/replace cases.
4. Rebuild from known-good firmware and configuration where trust is broken.
5. Rotate credentials, VPN secrets, certificates, API tokens, and service accounts.
6. Hunt for lateral movement from the appliance into identity, virtualization, cloud, and OT environments.
7. Retire unsupported hardware after compromise rather than preserving it.

## Prioritized risk ranking

![Article image](https://cdn-images-1.medium.com/max/1024/1*NsS6TiHyCuBYCoTL79ictA.png)

## Intelligence gaps and validation tasks

- Exact affected/fixed versions for new 2026 edge-appliance CVEs.
- Whether each vendor has confirmed exploitation, only scanning, or only theoretical exposure.
- Authenticity, safety, and functionality of public PoCs.
- Downstream OEM patch status for AMI MegaRAC and UEFI component fixes.
- Secure Boot 2023 certificate migration status across older OEM fleets and Linux shim ecosystems (post-June/October 2026 expirations).
- GPU/AI workload isolation fixes across cloud, edge, embedded, and workstation deployments.
- OT/IoT vendor remediation status where CISA ICS advisories lag disclosures.
- **Citation validation completed on 2026–07–02:**Cisco Talos FIRESTARTER, Cisco persistence advisory, Fortinet FG-IR-25–934, Ivanti advisory URL, and Nozomi February 2026 report were resolved and archived as PDFs.

## Research conclusion

The embedded and hardware attack surface should be managed as a combined “firmware + edge + management-plane” risk domain. Treating routers, firewalls, BMCs, UEFI, and embedded devices as ordinary IT assets produces systematic under-response. The adversary pattern is clear: exploit the least-monitored, highest-trust system; persist in appliance or firmware state; disable or evade logging; use the position for credential theft, proxying, and lateral movement; then survive ordinary patch workflows — as FIRESTARTER made concrete in 2026.

### Minimum mature program:

- Feature-aware edge inventory.
- Firmware-aware asset inventory.
- CISA KEV and vendor PSIRT-driven patching.
- End-of-support device retirement (BOD 26–02 model).
- Isolated management networks.
- Off-device logs.
- Measured boot and attestation.
- BMC isolation and monitoring.
- Secure Boot certificate migration tracking.
- Reimage/replace playbooks for appliance and firmware compromise.

Organizations that cannot answer “which exposed devices run which firmware, which enabled services, and which inherited components” are exposed to the exact failure mode seen repeatedly in Cisco, Fortinet, Ivanti, Palo Alto, Barracuda, Juniper, AMI, and UEFI ecosystem incidents.

## Source base

Primary and high-value sources. URLs corrected and verified where marked ✓.

**CISA**

- [Known Exploited Vulnerabilities (KEV) Catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)✓
- [BOD 26–02,*Mitigating Risk From End-of-Support Edge Devices*(canonical directive page)](https://www.cisa.gov/news-events/directives/bod-26-02-mitigating-risk-end-support-edge-devices)✓
- [*Reducing the Attack Surface for End-of-Support Edge Devices*(joint fact sheet, PDF)](https://www.ic3.gov/CSA/2026/260205.pdf)✓
- [Joint advisory AA24–038A, Volt Typhoon critical-infrastructure compromise](https://www.cisa.gov/news-events/cybersecurity-advisories/aa24-038a)✓
- [FIRESTARTER Malware Analysis Report AR26–113A](https://www.cisa.gov/news-events/analysis-reports/ar26-113a)✓
- [FIRESTARTER news release](https://www.cisa.gov/news-events/news/cisa-warns-firestarter-malware-targeting-cisco-asa-including-firepower-and-secure-firewall-products)✓
- [ICS advisories index](https://www.cisa.gov/news-events/ics-advisories)✓

**Mandiant / Google Threat Intelligence**

- [M-Trends 2025 (PDF)](https://services.google.com/fh/files/misc/m-trends-2025-en.pdf)✓
- [Ivanti CVE-2025–22457 / UNC5221](https://cloud.google.com/blog/topics/threat-intelligence/china-nexus-exploiting-critical-ivanti-vulnerability)✓
- [Barracuda ESG / UNC4841](https://cloud.google.com/blog/topics/threat-intelligence/barracuda-esg-exploited-globally/)✓
- [UNC3886 Juniper router backdoors (*Ghost in the Router*)](https://cloud.google.com/blog/topics/threat-intelligence/china-nexus-espionage-targets-juniper-routers)✓

**Cisco / Talos**

- [Talos ArcaneDoor](https://blog.talosintelligence.com/arcanedoor-new-espionage-focused-campaign-found-targeting-perimeter-network-devices/)✓
- [Talos FIRESTARTER analysis (April 2026)](https://blog.talosintelligence.com/uat-4356-firestarter/)✓
- [Cisco persistence advisory,](https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-asaftd-persist-CISAED25-03)[cisco-sa-asaftd-persist-CISAED25-03](https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-asaftd-persist-CISAED25-03)✓
- [Cisco Security Advisories portal](https://sec.cloudapps.cisco.com/security/center/publicationListing.x)✓

**Fortinet**

- [SSL-VPN symlink persistence advisory FG-IR-25–934 (CVE-2025–68686)](https://fortiguard.fortinet.com/psirt/FG-IR-25-934)✓
- [PSIRT threat-actor activity analysis](https://www.fortinet.com/blog/psirt-blogs)✓ (blog index)

**Palo Alto Networks**

- [Unit 42 Operation MidnightEclipse (CVE-2024–3400)](https://unit42.paloaltonetworks.com/cve-2024-3400/)✓
- [CVE-2024–3400 advisory](https://security.paloaltonetworks.com/CVE-2024-3400)✓

**Ivanti / Barracuda**

- [Ivanti CVE-2025–22457 advisory](https://forums.ivanti.com/s/article/April-Security-Advisory-Ivanti-Connect-Secure-Policy-Secure-ZTA-Gateways-CVE-2025-22457)✓
- [Barracuda ESG CVE-2023–2868 advisory](https://www.barracuda.com/company/legal/esg-vulnerability)✓ (Barracuda trust/advisory page)

**UEFI / boot chain**

- [ESET BlackLotus research](https://www.eset.com/us/about/newsroom/research/eset-research-analyzes-blacklotus-a-uefi-bootkit-that-can-bypass-uefi-secure-boot-on-fully-patched-systems/)✓
- [Microsoft BlackLotus / CVE-2022–21894 guidance](https://www.microsoft.com/en-us/security/blog/2023/04/11/guidance-for-investigating-attacks-using-cve-2022-21894-the-blacklotus-campaign/)✓
- [NSA BlackLotus mitigation guide (PDF)](https://media.defense.gov/2023/Jun/22/2003245723/-1/-1/0/CSI_BlackLotus_Mitigation_Guide.PDF)✓
- [Binarly LogoFAIL report hub](https://www.binarly.io/reports/logofail)✓
- [Binarly Bootkitty / LogoFAIL exploitation](https://www.binarly.io/blog/logofail-exploited-deploy-bootkitty-first-uefi-bootkit-linux)✓
- [Quarkslab PixieFail](https://blog.quarkslab.com/pixiefail-nine-vulnerabilities-in-tianocores-edk-ii-ipv6-network-stack.html)✓
- [CERT/CC PixieFail VU#132380](https://www.kb.cert.org/vuls/id/132380)✓
- [Microsoft Secure Boot certificate expiration guidance](https://support.microsoft.com/en-us/topic/windows-secure-boot-certificate-expiration-and-ca-updates-7ff40d33-95dc-4c3c-8725-a9b95457578e)✓
- [Microsoft Secure Boot “Act now” 2026 guidance](https://techcommunity.microsoft.com/blog/windows-itpro-blog/act-now-secure-boot-certificates-expire-in-june-2026/4426856)✓
- [Red Hat Secure Boot certificate expiration (2026)](https://www.redhat.com/en/blog/expiration-secure-boot-signing-certificates-2026)✓
- [Google Cloud Shielded VM Secure Boot certificate expiration guide](https://docs.cloud.google.com/compute/docs/security/ms-secure-boot-certificates-expiration)✓

**BMC / silicon / GPU**

- [Eclypsium AMI MegaRAC BMC&C Part 3](https://eclypsium.com/blog/ami-megarac-vulnerabilities-bmc-part-3/)✓
- [NVD CVE-2024–54085](https://nvd.nist.gov/vuln/detail/CVE-2024-54085)✓
- [AMD-SB-7033 microcode signature verification (EntrySign, CVE-2024–36347)](https://www.amd.com/en/resources/product-security/bulletin/amd-sb-7033.html)✓
- [AMD-SB-3019 SEV firmware (EntrySign companion, CVE-2024–56161)](https://www.amd.com/en/resources/product-security/bulletin/amd-sb-3019.html)✓
- [Google Security Research EntrySign advisory](https://github.com/google/security-research/security/advisories/GHSA-4xq7-4mgh-gp6w)✓
- [AMD-SB-3034 SEV-SNP routing misconfiguration (“Fabricked”, CVE-2025–54510)](https://www.amd.com/en/resources/product-security/bulletin/amd-sb-3034.html)✓
- [Intel Gather Data Sampling / Downfall (CVE-2022–40982)](https://www.intel.com/content/www/us/en/developer/articles/technical/software-security-guidance/advisory-guidance/gather-data-sampling.html)✓
- [Trail of Bits LeftoverLocals (CVE-2023–4969)](https://blog.trailofbits.com/2024/01/16/leftoverlocals-listening-to-llm-responses-through-leaked-gpu-local-memory/)✓
- [LeftoverLocals technical site](https://leftoverlocals.com/)✓

**SOHO / IoT / OT**

- [SentinelOne AcidRain](https://www.sentinelone.com/labs/acidrain-a-modem-wiper-rains-down-on-europe/)✓
- [Joint Cyclops Blink advisory (PDF)](https://media.defense.gov/2022/Feb/23/2002943421/-1/-1/0/CSA_NEW_SANDWORM_MALWARE_CYCLOPS_BLINK_REPLACES_VPNFILTER_20220223.PDF)✓
- [Trend Micro Cyclops Blink / ASUS](https://www.trendmicro.com/en_us/research/22/c/cyclops-blink-sets-sights-on-asus-routers--.html)✓
- [DOJ KV Botnet disruption](https://www.justice.gov/archives/opa/pr/us-government-disrupts-botnet-peoples-republic-china-used-conceal-hacking-critical)✓
- [MITRE ATT&CK KV Botnet campaign C0035](https://attack.mitre.org/campaigns/C0035/)✓
- [MITRE ATT&CK UNC3886 (Group G1048)](https://attack.mitre.org/groups/G1048/)✓
- [MITRE ATT&CK RedPenguin (Campaign C0056, attributed to UNC3886)](https://attack.mitre.org/campaigns/C0056/)✓*(added; original draft referenced “MITRE RedPenguin” without a URL)*
- [Akamai InfectedSlurs / Mirai zero-day](https://www.akamai.com/blog/security-research/new-rce-botnet-spreads-mirai-via-zero-days)✓
- [Forescout*Rough Around the Edges*OT/IoT router firmware](https://www.forescout.com/press-releases/ot-iot-router-firmware-outdated-software-vulnerabilities/)✓
- [Forescout 2025 threat report](https://www.forescout.com/blog/2025-threat-report-exploitation-grows-across-it-iot-and-ot/)✓
- [Forescout riskiest connected devices 2025](https://www.forescout.com/research-labs/the-riskiest-devices-of-2025/)✓
- [Claroty Team82 disclosure dashboard](https://claroty.com/team82/disclosure-dashboard)✓
- [Nozomi OT/IoT cybersecurity trends (Feb 2026)](https://www.nozominetworks.com/ot-iot-cybersecurity-trends-insights-february-2026)✓

## Follow for practical cybersecurity research

If you’re interested in**Offensive security,****AI security, real-world attack simulations, CTI, and detection engineering**— this is exactly what I focus on.

### Stay connected:

I publish practical cybersecurity research, CTI workflows, detection engineering notes, malware analysis projects, OpenCTI work, cloud and Kubernetes security research, AI-assisted security tooling, labs, and technical guides.
