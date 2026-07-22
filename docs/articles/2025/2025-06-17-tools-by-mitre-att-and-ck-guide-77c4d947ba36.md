---
title: "Tools by MITRE ATT&CK Guide"
description: "Reconnecense"
image: "https://cdn-images-1.medium.com/max/800/0*ADa5nrvprt-F6cYe.jpeg"
---

# Tools by MITRE ATT&CK Guide


<img src="https://cdn-images-1.medium.com/max/800/0*ADa5nrvprt-F6cYe.jpeg" alt="Cover image" width="1280" height="720" loading="eager" fetchpriority="high" decoding="async" />

:::info Article Metadata
- **Category:** CTI
- **Source article:** [https://medium.com/@1200km/tools-by-mitre-att-and-ck-guide-77c4d947ba36](https://medium.com/@1200km/tools-by-mitre-att-and-ck-guide-77c4d947ba36)
- **Published:** 2025-06-17
- **Preserved media:** 1 image(s), including cover images, screenshots, diagrams, and infographics where present.
- **Preserved technical blocks:** 11 code/configuration block(s).
:::

## Ecosystem Fit

This page mirrors the original Medium article into the 1200km.com Docusaurus ecosystem. The original article flow, images, screenshots, infographics, and technical blocks are preserved from the export.

### Reconnecense

## Active Scanning

### ID: T1595

### Sub-techniques: T1595.001, T1595.002, T1595.003

Adversaries may execute active reconnaissance scans to gather information that can be used during targeting. Active scans are those where the adversary probes victim infrastructure via network traffic, as opposed to other forms of reconnaissance that do not involve direct interaction.

<img src="https://cdn-images-1.medium.com/max/800/0*ADa5nrvprt-F6cYe.jpeg" alt="Article image" width="1280" height="720" loading="lazy" decoding="async" />

Adversaries may perform different forms of active scanning depending on what information they seek to gather. These scans can also be performed in various ways, including using native features of network protocols such as ICMP. Information from these scans may reveal opportunities for other forms of reconnaissance (ex: Search Open Websites/Domains or Search Open Technical Databases), establishing operational resources (ex: Develop Capabilities or Obtain Capabilities), and/or initial access (ex: External Remote Services or Exploit Public-Facing Application).

## T1595.001 — Scanning IP Blocks

### Description

This sub-technique is about identifying live hosts in a target network range. Attackers scan IP blocks to find which systems are active and reachable.

### Tools & Command Examples:

### 1. Nmap The Swiss Army knife of network scanning.

```text
nmap -sn 192.168.1.0/24         
# Ping scan for live hosts
nmap -sS -p- 10.0.0.0/8         
# Stealth scan on all ports across large block
```

**Complete guide for Nmap here:**

[**Mastering Nmap: A Comprehensive Guide to Network Exploration and Security Auditing. Part 1**
[This comprehensive post will delve into the powerful network scanning tool, Nmap, exploring its capabilities from basic…](../2024/2024-10-26-mastering-nmap-a-comprehensive-guide-to-network-exploration-and-security-auditing-part-1-f36d74d1b2c0.md)

Search for: “Network scanner”

### 2. OWASP Amass

In-depth reconnaissance, network mapping, and identifying assets associated with a target domain.

```text
$ amass intel
[...]
Usage: amass intel [options] [-whois -d DOMAIN] [-addr ADDR -asn ASN -cidr CIDR]
  -active
        Attempt certificate name grabs
  -
addr 
value
        IPs 
and
 
ranges
 (
192.168
.1
.1
-254
) separated 
by
 commas
  -asn 
value
        ASNs separated 
by
 
commas
 (
can be used multiple times
)
[...]
```

**Complete guide for Amass here:**

[**OWASP Amass Project guide**
[In-depth Attack Surface Mapping and Asset Discovery.](../2024/2024-11-06-owasp-amass-project-guide-94bd55521f91.md)

Search for: “Amass Intel”

### 3. Netdiscover ARP-based host discovery in internal networks.

```text
netdiscover -r 
192.168
.1
.0
/
24
```

**Complete guide for basic tools here:**

[**Mastering the Basics: Essential CLI Tools for Reconnaissance in Penetration Testing**
[A Comprehensive Guide to Command Line Tools for Network Exploration: How to Effectively Use Ping, Netdiscover, Whois…](../2024/2024-11-09-mastering-the-basics-essential-cli-tools-for-reconnaissance-in-penetration-testing-ee7fd9e36394.md)

## T1595.002 — Vulnerability Scanning

### Description

This involves scanning identified systems for known vulnerabilities. Vulnerability scanning is usually done after live hosts and services are identified.

### Tools & Command Examples

**1. Nessus**
Enterprise-grade vulnerability scanner with plugin support. GUI/web-based interface.

**2. OpenVAS (GVM)**
Open-source alternative to Nessus.

```text
gvm
-
start
      # 
Start
 the scanner
gvm
-
check
-
setup
```

**3. Nmap NSE Scripts**
Leverage Nmap’s scripting engine to look for vulnerabilities.

```text
nmap -sV 
--script
 vuln 
192.168
.
1.5
```

**Full guide for Nmap Scripts here:**

[**Mastering Nmap: A Comprehensive Guide to Network Exploration and Security Auditing. Part 4. Scripts**
[This a third part of comprehensive Medium post will delve into Exploring the Depths of Network Security with Nmap…](../2024/2024-10-30-mastering-nmap-a-comprehensive-guide-to-network-exploration-and-security-auditing-part-4-s-5ec77704057f.md)

**4. Nikto**
Simple scanner for web servers.

```text
nikto -h http:
//192.168.1.10
```

**Full guide for Nikto here:**

[**Nikto: Uncovering Web Server Vulnerabilities with an Open-Source Scanner**
[A Guide to Using Nikto for Identifying Security Flaws and Misconfigurations in Web Servers](../2024/2024-11-12-nikto-uncovering-web-server-vulnerabilities-with-an-open-source-scanner-6d2d2fbc1e21.md)

**5. Burp Suite Pro**
Active scanner for authenticated web application assessments.

**Complete guide for BurpSuit tools here:**

[**Mastering Burp Suite Vulnerability Scanner**
[From configuration to result analysis, discover how to leverage Burp Suite’s automatic scanner for faster and more…](../2024/2024-11-11-mastering-burp-suite-vulnerability-scanner-019ed82c8bac.md)

**6. Metasploit Framework**
A powerful exploitation platform that also includes auxiliary modules for scanning known vulnerabilities.

```text
msfconsole
use auxiliary/scanner/http/wordpress_scanner
set
 RHOSTS 192.168.1.50
run
```

**Complete guide for Metasploit here:**

[**The Ultimate Guide to Metasploit. Part 1.**
[A Complete Guide to Exploiting Vulnerabilities and Strengthening Security with Metasploit](../2024/2024-11-17-the-ultimate-guide-to-metasploit-part-1-43c8573487df.md)

## T1595.003 — Wordlist Scanning

### Description

This is used to brute-force directories, files, or parameters in web applications using known or custom wordlists.

### Tools & Command Examples

**1. FFUF (Fuzz Faster U Fool)**
Powerful and fast web fuzzer.

```text
ffuf -u https://site.com/FUZZ -w /usr/share/wordlists/dirbuster/directory-list.txt
```

**2. Gobuster**
Directory and DNS brute-forcing.

```text
gobuster 
dir
 -u http://site.com -w /usr/share/wordlists/dirb/common.txt
```

**3. Dirb**
Classic directory brute-forcer.

```text
dirb 
http:
/
/site.com /usr
/share/wordlists
/dirb/common
.txt
```

**4. Dirbuster**
Java-based GUI tool from OWASP.

**Complete guide here:**

[**Mastering DirBuster: A Strategic Approach to Uncovering Hidden Web Assets**
[A comprehensive guide to using DirBuster for uncovering hidden directories and files in web applications.](../2024/2024-11-10-mastering-dirbuster-a-strategic-approach-to-uncovering-hidden-web-assets-31c8406a892b.md)

**5. WFuzz**
Flexible fuzzing for parameters and headers.

```text
wfuzz -c -z file,
/path/
to/wordlist.
txt
 --hh=
404
 
"http://site.com/page.php?file=FUZZ"
```

**6. Burp Suite (Community or Pro)**
Use Intruder for custom wordlist scanning.

[**Mastering Burp Suite Vulnerability Scanner**
[From configuration to result analysis, discover how to leverage Burp Suite’s automatic scanner for faster and more…](../2024/2024-11-11-mastering-burp-suite-vulnerability-scanner-019ed82c8bac.md)

## Summary

This post provides a hands-on breakdown of**MITRE ATT&CK technique T1595 — Active Scanning**and its sub-techniques:

- `T1595.001 – Scanning IP Blocks`

- `T1595.002 – Vulnerability Scanning`

- `T1595.003 – Wordlist Scanning`

For each, you’ll find a clear explanation, practical tools, and real command-line examples. Whether you’re performing red team recon or strengthening your blue team detections, this guide offers a tactical starting point for scanning and enumeration.

You can explore**detailed guides on every tool**mentioned in this post — like Nmap, Amass, Nikto, FFUF, and Metasploit — on my Medium blog:

[**Andrey Pautov - Medium**
*Read writing from Andrey Pautov on Medium.*medium.com](https://medium.com/@1200km)[](https://medium.com/@1200km)

**Stay sharp, and happy hunting.**
