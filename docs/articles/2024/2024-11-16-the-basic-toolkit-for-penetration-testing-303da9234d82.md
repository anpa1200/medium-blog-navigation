---
title: "The Basic Toolkit for Penetration Testing"
description: "Unlocking Vulnerabilities: A Comprehensive Guide to Essential Tools for Pen Testing"
image: "https://cdn-images-1.medium.com/max/800/0*vpcuMQzXsepR78_C.jpg"
---

# The Basic Toolkit for Penetration Testing


<img src="https://cdn-images-1.medium.com/max/800/0*vpcuMQzXsepR78_C.jpg" alt="Cover image" width="1120" height="1120" loading="eager" fetchpriority="high" decoding="async" />

:::info Article Metadata
- **Category:** CTI
- **Source article:** [https://medium.com/@1200km/the-basic-toolkit-for-penetration-testing-303da9234d82](https://medium.com/@1200km/the-basic-toolkit-for-penetration-testing-303da9234d82)
- **Published:** 2024-11-16
- **Preserved media:** 22 image(s), including cover images, screenshots, diagrams, and infographics where present.
- **Preserved technical blocks:** 0 code/configuration block(s).
:::

## Ecosystem Fit

This page mirrors the original Medium article into the 1200km.com Docusaurus ecosystem. The original article flow, images, screenshots, infographics, and technical blocks are preserved from the export.

### Unlocking Vulnerabilities: A Comprehensive Guide to Essential Tools for Pen Testing

### Introduction

- Penetration testing is the cornerstone of identifying and addressing vulnerabilities in systems.

- Success depends not only on skills but also on having the right tools tailored to each phase of the pen-testing lifecycle.

## Linux Configuration

Penetration testers often use Linux as their base OS. Here are essential tools for configuring and optimizing your Linux environment for pen-testing:

## Kali Linux: The Standard for Penetration Testing

<img src="https://cdn-images-1.medium.com/max/800/0*BT4NPbYBnOXkgId5.png" alt="Article image" width="1980" height="1320" loading="lazy" decoding="async" />

**What is Kali Linux?**
Kali Linux is a Debian-based Linux distribution designed specifically for penetration testing and security auditing. It comes pre-installed with hundreds of tools for various security tasks.

[Official site here:](https://www.kali.org/)

- *My full guide about Kali linux under construction*

**Key Features of Kali Linux**

- **Pre-Installed Tools**: Includes Nmap, Metasploit, Burp Suite, and more, covering everything from reconnaissance to exploitation.

- **Wide Community Support**: Extensive documentation and an active user community make it ideal for beginners.

- **Rolling Updates**: Always up-to-date with the latest security tools and features.

- **Customizability**: Offers a variety of desktop environments and installation options, including VirtualBox images and WSL (Windows Subsystem for Linux).

**When to Choose Kali Linux**

- You are new to penetration testing and need a straightforward, ready-to-use environment.

- You require a versatile distribution that works out of the box on various platforms.

## Parrot Security OS: Lightweight and Privacy-Focused

<img src="https://cdn-images-1.medium.com/max/800/0*tqNC8Xf-BhBM7egr" alt="Article image" width="800" height="533" loading="lazy" decoding="async" />

**What is Parrot Security OS?**
Parrot Security OS is another Debian-based distribution tailored for penetration testers and security researchers, with a strong emphasis on privacy and anonymity.

[Official site here](https://parrotsec.org/):

- *My full guide about Parrot OS under construction*

**Key Features of Parrot Security OS**

- **Anonymity Tools**: Built-in Tor and anonymous browsing tools for stealth operations.

- **Lightweight Design**: Consumes fewer resources compared to Kali, making it ideal for older hardware or virtual machines.

- **Pre-Configured Security Tools**: Includes tools for pen-testing, forensics, and reverse engineering.

- **Sandboxing Features**: Provides a more secure testing environment through isolation.

**When to Choose Parrot Security OS**

- You prioritize privacy and anonymity in your penetration testing tasks.

- You need a lightweight alternative to Kali Linux for lower-spec systems.

## BlackArch Linux: A Robust Choice for Advanced Penetration Testers

<img src="https://cdn-images-1.medium.com/max/800/0*9zGohcPcxemjHELI.png" alt="Article image" width="512" height="512" loading="lazy" decoding="async" />

In addition to**Kali Linux**,**Parrot Security OS**, and custom setups with Debian/Ubuntu,**BlackArch Linux**is a powerful option for penetration testers, especially those looking for a highly customizable and extensive toolkit.

### What is BlackArch Linux?

BlackArch Linux is a lightweight, Arch Linux-based distribution tailored for penetration testers and security researchers. It provides a repository of over 3,000 security tools, making it one of the most extensive options available.

[Official site is here:](https://blackarch.org/)

*My full guide about BlackArch is under construction*

### Key Features of BlackArch Linux

- **Extensive Toolset**:

- The largest repository of penetration testing and security tools, including categories like forensics, exploitation, web application testing, and reverse engineering.

**2. Highly Customizable**:

- Built on Arch Linux, it allows users to fine-tune their environment for performance and specific needs.

**3. Minimalist Design**:

- Starts as a minimal installation, enabling users to add only the components and tools they need.

**4. Compatibility with Arch Linux**:

- Users can install BlackArch tools on top of an existing Arch Linux installation.

**5. Advanced Package Management**:

- Leverages the Pacman package manager for efficient installation and updates.

### When to Choose BlackArch Linux

- You’re an experienced Linux user comfortable with Arch Linux and its command-line package management.

- You require an extensive, modular toolkit for specialized penetration testing tasks.

- You prefer a distribution that can integrate seamlessly with an existing Arch Linux environment.

## Debian/Ubuntu + Custom Setup: Build Your Own Toolkit

<img src="https://cdn-images-1.medium.com/max/800/0*QT8CVUqJIZqH8LV1.png" alt="Article image" width="350" height="350" loading="lazy" decoding="async" />

**What is a Custom Debian/Ubuntu Setup?**
A custom setup allows you to use Debian or Ubuntu as the base OS and selectively install only the tools you need, creating a streamlined, personalized pen-testing environment.

*Full guide how to customise your Ubuntu for Pen Test under construction*

**Key Features of a Custom Debian/Ubuntu Setup**

- **Full Control**: Install only the tools and packages you require for specific tasks.

- **Stable and Reliable**: Based on robust, well-supported Linux distributions.

- **Broad Compatibility**: Works well on various hardware and virtual machines.

- **Wide Software Support**: Access to extensive software repositories and package managers (e.g., APT).

**When to Choose a Custom Debian/Ubuntu Setup**

- You prefer a lightweight and minimalist environment tailored to your workflow.

- You already have experience configuring Linux systems from scratch.

## Comparison with Kali, Arch, Parrot and Custom

- **Kali Linux**: Ideal for beginners with its user-friendly interface and broad community support.

- **Parrot Security OS**: Focuses on privacy and anonymity, making it great for scenarios requiring stealth.

- **BlackArch Linux**: Best suited for advanced users who need maximum flexibility and a large repository of tools.

- **Debian/Ubuntu + Custom Setup**: Create your pen-testing toolkit by installing necessary tools.

## Tools

## Reconnaissance and OSINT Tools

Effective penetration testing starts with gathering intelligence about the target system.

[**Full guide to recconnaissance here:**](2024-11-10-web-applications-penetretion-testing-stage-1-reconnaissance-6b6b7aae0399.md)

**OWASP Amass:**is an open-source tool for in-depth domain reconnaissance, asset discovery, and network mapping.

<img src="https://cdn-images-1.medium.com/max/800/0*L0lpOJGf4aw1N0cv" alt="Article image" width="225" height="225" loading="lazy" decoding="async" />

[**Full guide to OWASP Amass here**](2024-11-06-owasp-amass-project-guide-94bd55521f91.md)

[Official site here](https://owasp.org/www-project-amass/)

[**theHarvester:**](2024-11-07-theharvester-your-essential-tool-for-osint-and-reconnaissance-in-cybersecurity-10aa6d76f5b3.md)is an open-source reconnaissance tool for gathering domain-related data, including emails, subdomains, and IPs.

<img src="https://cdn-images-1.medium.com/max/800/1*t_oaaW3j8CifxRzdBXwt3g.png" alt="Article image" width="174" height="189" loading="lazy" decoding="async" />

[**Full guide to theHarvester here**](2024-11-07-theharvester-your-essential-tool-for-osint-and-reconnaissance-in-cybersecurity-10aa6d76f5b3.md)

[Official site here](https://github.com/laramies/theHarvester)

**Sublist3r**:An open-source reconnaissance tool for discovering subdomains associated with a target domain.

<img src="https://cdn-images-1.medium.com/max/800/1*5kjErqH4pCMm2laIwET0xA.png" alt="Article image" width="289" height="111" loading="lazy" decoding="async" />

[**Full guide to Sublist3r here**](2024-11-07-sublist3r-your-essential-tool-for-subdomain-enumeration-c1910121d712.md)**:**

[Official site here](https://github.com/aboul3la/Sublist3r)

[**Shodan**](2024-10-24-shodan-guide-how-you-can-find-everything-640f47f41bbe.md): is a search engine for internet-connected devices, enabling users to discover exposed servers, IoT devices, webcams, and industrial systems.

<img src="https://cdn-images-1.medium.com/max/800/0*zhQ6FlZnHSECUDrW" alt="Article image" width="256" height="256" loading="lazy" decoding="async" />

[**Full explanation about Shodan here:**](2024-10-24-shodan-guide-how-you-can-find-everything-640f47f41bbe.md)

[Official site here](https://www.shodan.io/)

**Censys:**a comprehensive cybersecurity platform, offers an expansive view of the internet’s infrastructure.

<img src="https://cdn-images-1.medium.com/max/800/1*CvXmoHe66ZiCHgZY4a9bmw.png" alt="Article image" width="187" height="188" loading="lazy" decoding="async" />

[**Full explanation about Cencys here**](2024-11-10-censys-for-enhanced-cybersecurity-insight-533df14794bd.md)**:**

[Official site here](https://censys.com/)

**Recon-ng**: Modular OSINT framework.

**Hunter.io**is a tool for finding and verifying professional email addresses linked to specific domains

**Maltego**: Visual link analysis for OSINT investigations.

**SpiderFoot**: Automated reconnaissance tool with integration capabilities.

## Vulnerability Scanning and Enumeration

[**Full guide to Scanning and Vulnerability Assessment here**](2024-11-13-web-applications-penetretion-testing-stage-2-scanning-and-vulnerability-assessment-15021e81c130.md)

### Network Scanning

**Basic Command Line Tools for Network Exploration:**Ping, Netdiscover, Whois, nslookup:

[**Full explanation about this tool here:**](2024-11-09-mastering-the-basics-essential-cli-tools-for-reconnaissance-in-penetration-testing-ee7fd9e36394.md)

**Nmap**: Nmap (Network Mapper) is an open-source Powerful tool used for network discovery and security auditing, allowing users to scan for open ports, identify services, and detect operating systems on target systems. (**Zenmap**: GUI version of Nmap.)

<img src="https://cdn-images-1.medium.com/max/800/0*jwHMlTNwJgCUSiy0.png" alt="Article image" width="256" height="256" loading="lazy" decoding="async" />

[**Full explanation about Nmap here:**](2024-10-26-mastering-nmap-a-comprehensive-guide-to-network-exploration-and-security-auditing-part-1-f36d74d1b2c0.md)

[Official site here](https://nmap.org/)

**WhatWeb**: Command-line tool for tech stack fingerprinting.

<img src="https://cdn-images-1.medium.com/max/800/1*NdxsRw0Xb-dmCNPTd2p02Q.png" alt="Article image" width="202" height="186" loading="lazy" decoding="async" />

[**Full explanation about WhatWeb here**](2024-11-10-unlocking-web-intelligence-a-deep-dive-into-whatweb-8ee4e64ce411.md)

[Official site here](https://whatweb.net/)

**Nikto:**A web server scanner which performs comprehensive tests against web servers for multiple items, including over 6700 potentially dangerous files/programs.

<img src="https://cdn-images-1.medium.com/max/800/0*svW8hPvEdycxkU46.png" alt="Article image" width="256" height="256" loading="lazy" decoding="async" />

[**Full guide to scanning Web App with Nikto here:**](2024-11-12-nikto-uncovering-web-server-vulnerabilities-with-an-open-source-scanner-6d2d2fbc1e21.md)

[Official site here:](https://www.cirt.net/Nikto2)

**OWASP ZAP:**Provides automated scanners and a set of tools for manual vulnerability testing.

<img src="https://cdn-images-1.medium.com/max/800/0*PvyGz4m5hLK5ZB6O.png" alt="Article image" width="230" height="200" loading="lazy" decoding="async" />

[**Full guide to scanning Web App with OWASP ZAP here:**](2024-11-12-owasp-zap-a-comprehensive-guide-to-web-application-security-testing-6c247f4be39b.md)

[Official site here](https://www.zaproxy.org/)

**SQLMap**: Automates SQL injection testing and even allows exploitation of detected vulnerabilities.

<img src="https://cdn-images-1.medium.com/max/800/0*NNxKHUU7WIHzauVu" alt="Article image" width="225" height="225" loading="lazy" decoding="async" />

[**Full explanation about SQLMap here**](2024-11-04-sqlmap-a-deep-dive-into-automated-sql-injection-testing-part-1-basic-wizard-6dd540363c83.md)

[Official site here:](https://sqlmap.org/)

**Dirbuster**: Brute-forces directories and files using wordlists.

<img src="https://cdn-images-1.medium.com/max/800/1*f4PiJAClDULPwCeMhcXYlg.png" alt="Article image" width="192" height="185" loading="lazy" decoding="async" />

- [**Full explanation about Dirbuster here**](2024-11-10-mastering-dirbuster-a-strategic-approach-to-uncovering-hidden-web-assets-31c8406a892b.md)

- [Official site here](https://www.kali.org/tools/dirbuster/)

**Burp Suite:**Burp Suite is a comprehensive web application security testing platform developed by PortSwigger. It is designed to provide a variety of tools that allow security professionals to perform extensive testing of web applications.

<img src="https://cdn-images-1.medium.com/max/800/0*a3CjGA-FDHRNZzoH.png" alt="Article image" width="256" height="256" loading="lazy" decoding="async" />

[**Full guide to scanning Web App with BurpSuite here:**](2024-11-11-mastering-burp-suite-vulnerability-scanner-019ed82c8bac.md)

[**How to use burp to crack Web Authentication interface here**](2024-10-24-cracking-web-interfaces-with-burp-suite-a-comprehensive-tutorial-33087bb286b0.md)

[Official site here](https://portswigger.net/burp)

[**Wappalyzer**](https://www.wappalyzer.com/): Browser extension to identify technologies on web pages.

Very good and powerfull but not free.

[**BuiltWith**](https://builtwith.com/): Analyzes the tech stack and integrations used by websites.

## Password Cracking

**Aircrack-ng**: Suite for WiFi network security testing and password recovery

<img src="https://cdn-images-1.medium.com/max/800/0*P51NE3MJQS5kmA38.png" alt="Article image" width="256" height="256" loading="lazy" decoding="async" />

[**Full guide to Aircrack-ng here:**](2024-10-17-wifi-cracking-with-aircrack-ng-d51cf98c789f.md)

[Official site here](https://www.aircrack-ng.org/)

**John the Ripper**: Ultimate Password cracking tool.

<img src="https://cdn-images-1.medium.com/max/800/0*nJbgsF4HyneRKKFr.png" alt="Article image" width="256" height="256" loading="lazy" decoding="async" />

[**Full guide to John the Ripper here:**](2024-11-15-mastering-john-the-ripper-a-complete-guide-to-password-cracking-e42d68239c71.md)

[Official site here](https://www.openwall.com/john/)

**Hashcat**: GPU-accelerated password recovery tool.

<img src="https://cdn-images-1.medium.com/max/800/0*tU6a8mjfGXwgVyeK.jpeg" alt="Article image" width="256" height="256" loading="lazy" decoding="async" />

[**Full guide to Hashcat here:**](2024-11-03-breaking-the-code-how-to-use-hashcat-for-effective-password-cracking-15f8da8facb8.md)

[Official site here:](https://hashcat.net/hashcat/)

**Hydra**: Network logon cracker supporting different protocols.

<img src="https://cdn-images-1.medium.com/max/800/0*2xGfRZy9aHUMlAQk.png" alt="Article image" width="256" height="256" loading="lazy" decoding="async" />

[**Full guide to Hydra here:**](2024-11-01-mastering-hydra-the-ultimate-guide-to-network-logon-cracking-182579dbaed1.md)

[Official site here](https://www.hydradongle.com/)

### Exploitation Tools

**Metasploit Framework**: Comprehensive tool for finding and exploiting vulnerabilities.

<img src="https://cdn-images-1.medium.com/max/800/0*CQzEDc_187sMj1ci.png" alt="Article image" width="256" height="256" loading="lazy" decoding="async" />

**Full guide to Metasploit is under construction**

[Cracking SSH with Metasploit here](2024-10-23-cracking-ssh-with-metasploit-a-step-by-step-guide-to-exploiting-weak-credentials-3ec6ef4cee5b.md)

### Post-Exploitation and Lateral Movement Tools

Once inside the system, leverage these tools for privilege escalation and persistence:

- **Mimikatz**: Extracts passwords and hashes from Windows systems.

- **BloodHound**: Graphical tool for mapping Active Directory privileges.

- **Cobalt Strike**: Advanced threat emulation and post-exploitation framework.

- **Empire**: PowerShell and Python post-exploitation agent.

- **LinPEAS**/**WinPEAS**: Privilege escalation enumeration scripts.

### Cloud and API Penetration Testing Tools

- **Postman**: API testing platform.

- **Pacu**: AWS-specific security auditing toolkit.

- **ScoutSuite**: Multi-cloud environment security auditing tool.

- **CloudSploit**: Scans for cloud configuration weaknesses.

### To be continued…

## Good luck

1200km@gmail.com
