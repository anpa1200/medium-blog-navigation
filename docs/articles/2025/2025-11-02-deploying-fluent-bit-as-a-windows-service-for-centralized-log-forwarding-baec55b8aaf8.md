---
title: "Deploying Fluent Bit as a Windows Service for Centralized Log Forwarding"
description: "A step-by-step guide to collecting Windows Event Logs and securely shipping them to PortX \u2014 XPLG (other log collector) using Fluent Bit"
image: "https://cdn-images-1.medium.com/max/800/1*vuUYM2SZXzjvFRMo9PkK2A.png"
---

# Deploying Fluent Bit as a Windows Service for Centralized Log Forwarding


<img src="https://cdn-images-1.medium.com/max/800/1*vuUYM2SZXzjvFRMo9PkK2A.png" alt="Cover image" width="1078" height="261" loading="eager" fetchpriority="high" decoding="async" />

:::info Article Metadata
- **Category:** CTI
- **Source article:** [https://medium.com/@1200km/deploying-fluent-bit-as-a-windows-service-for-centralized-log-forwarding-baec55b8aaf8](https://medium.com/@1200km/deploying-fluent-bit-as-a-windows-service-for-centralized-log-forwarding-baec55b8aaf8)
- **Published:** 2025-11-02
- **Preserved media:** 7 image(s), including cover images, screenshots, diagrams, and infographics where present.
- **Preserved technical blocks:** 11 code/configuration block(s).
:::

## Ecosystem Fit

This page mirrors the original Medium article into the 1200km.com Docusaurus ecosystem. The original article flow, images, screenshots, infographics, and technical blocks are preserved from the export.

### A step-by-step guide to collecting Windows Event Logs and securely shipping them to PortX — XPLG (other log collector) using Fluent Bit

### Overview

Fluent Bit is a lightweight log forwarder that can collect, filter, and ship logs from Windows to your central logging platform (PortX/XpoLog in your case).

You’ll install it as a**Windows service**so that it starts automatically and continuously forwards logs.

### 1. Folder Structure

Create the following structure under C:\fluent-bit\:

```text
C:
\fluent-bit\
│
├── bin\
│   └── fluent-bit.exe
│
├── conf\
│   ├── fluent-bit.conf       ← (your main config file: fb.conf)
│   ├── parsers.conf          ← 
optional
, 
if
 you define extra parsers
│   └── plugins.conf          ← 
optional
, 
for
 external plugins
│
└── storage\
    └── (
auto
-created 
by
 Fluent Bit)
```

## 2. Install Fluent Bit

- Download the latest**Fluent Bit Windows zip**from
[https://fluentbit.io/download/](https://fluentbit.io/download/)

<img src="https://cdn-images-1.medium.com/max/800/1*9xWw5bNpolbteAC8TrJNrQ.png" alt="Article image" width="1038" height="502" loading="lazy" decoding="async" />

2. Extract the archive into`C:\fluent-bit\`.

3. Confirm that`C:\fluent-bit\bin\fluent-bit.exe`exists.

4. Configure your FluentBit

For example, my configuration:

```text
[
SERVICE
]
    
# Flush
    
# =====
    
# set an interval of seconds before to flush records to a destination
    flush        
5
    
# Daemon
    
# ======
    
# instruct Fluent Bit to run in foreground or background mode.
    daemon       Off
    
# Log_Level
    
# =========
    
# Set the verbosity level of the service, values can be:
    
#
    
# - error
    
# - warning
    
# - info
    
# - debug
    
# - trace
    
#
    
# by default 'info' is set, that means it includes 'error' and 'warning'.
    log_level    info
    
# Parsers File
    
# ============
    
# specify an optional 'Parsers' configuration file
    parsers_file parsers.conf
    
# Plugins File
    
# ============
    
# specify an optional 'Plugins' configuration file to load external plugins.
    plugins_file plugins.conf
    
# HTTP Server
    
# ===========
    
# Enable/Disable the built-in HTTP Server for metrics
    http_server  
On
    http_listen  
0.0
.
0.0
    http_port    
2020
    
# Storage
    
# =======
    
# Fluent Bit can use memory and filesystem buffering based mechanisms
    
#
    
# - https://docs.fluentbit.io/manual/administration/buffering-and-storage
    
#
    
# storage metrics
    
# ---------------
    
# publish storage pipeline metrics in '/api/v1/storage'. The metrics are
    
# exported only if the 'http_server' option is enabled.
    
#
    storage.metrics 
on
    
# storage.path
    
# ------------
    
# absolute file system path to store filesystem data buffers (chunks).
    
#
    storage.path 
C
:
\fluent-bit\storage
    
# storage.sync
    
# ------------
    
# configure the synchronization mode used to store the data into the
    
# filesystem. It can take the values normal or full.
    
#
    storage.sync full
    
# storage.checksum
    
# ----------------
    
# enable the data integrity check when writing and reading data from the
    
# filesystem. The storage layer uses the CRC32 algorithm.
    
#
    
# storage.checksum off
    
# storage.backlog.mem_limit
    
# -------------------------
    
# if storage.path is set, Fluent Bit will look for data chunks that were
    
# not delivered and are still in the storage layer, these are called
    
# backlog data. This option configure a hint of maximum value of memory
    
# to use when processing these records.
    
#
    storage.backlog.mem_limit 
128
M
[
INPUT
]
    Name         winlog
    tag          winlog
    Channels     Security,Application,System
    Interval_Sec 
1
    DB           
C
:
\fluent-bit\winlog.sqlite
    storage.
type
 filesystem
    Mem_Buf_Limit 
128
M
#[INPUT]
#    name      tail
#    path      [ENTER_ABSOLUTE_PATH_TO_LOGS]
#    storage.type filesystem
#    DB           C:\fluent-bit\tail.sqlite
#    Path_key    filepath
#    Mem_Buf_Limit 128M
#[FILTER]
#    Name modify
#    Match tail
#    Add fluentbittype tail
[
FILTER
]
    Name modify
    Match winlog
    Add fluentbittype winlog
    Copy Channel filepath
[
OUTPUT
]
    Name http
    Match *
    Host 
172.16
.
11.1
    Port 
30443
    URI /logeye/api/logger.jsp?token
=
53
db5aff-
207
b-
457
e-
9
a19-
5
db73e24a864
    Format json
    header_tag message
    tls 
On
    tls.verify Off
    Retry_Limit 
False
    storage.total_limit_size 
10
G
```

5. Copy your`fb.conf`file into
`C:\fluent-bit\conf\fluent-bit.conf`.

### 3. Verify Configuration

Run this command manually to ensure the configuration is valid:

```text
cd
 C:\fluent-bit\bin
.\fluent-bit.exe -c 
"C:\fluent-bit\conf\fluent-bit.conf"
```

You should see log lines like:

<img src="https://cdn-images-1.medium.com/max/800/1*7HxD6wOGrHsx42dPe5Z5eA.png" alt="Article image" width="957" height="758" loading="lazy" decoding="async" />

Stop with**Ctrl + C**when ready.

### 4. Install as a Windows Service

Run the following**in an elevated PowerShell or CMD**(as Administrator):

```text
sc 
create
 fluent
-
bit binpath
=
 "\"C:\fluent
-
bit\bin\fluent
-
bit.exe\" -c \"C:\fluent
-
bit\conf\fluent
-
bit.conf\"" 
start
=
 auto
sc description fluent
-
bit "Fluent Bit: Log Forwarder to PortX"
sc failure fluent
-
bit reset
=
 
86400
 actions
=
 restart
/
0
/
restart
/
0
/
restart
/
900
```

<img src="https://cdn-images-1.medium.com/max/800/1*H4vQKGkt_p_6IvRXNuZbNQ.png" alt="Article image" width="930" height="467" loading="lazy" decoding="async" />

Then start it:

```text
sc 
start
 fluent
-
bit
```

Check status:

```text
sc 
query
 fluent-bit
```

You should see:

<img src="https://cdn-images-1.medium.com/max/800/1*JKvSnKrVAbggnC1GMa-3fA.png" alt="Article image" width="921" height="346" loading="lazy" decoding="async" />

### 5. GUI Verification

Open**Services (services.msc)**→ locate**fluent-bit**
→ ensure:

- **Startup Type**= Automatic

- **Service Status**= Running

- **Path to executable**=
“C:\fluent-bit\bin\fluent-bit.exe” -c “C:\fluent-bit\conf\fluent-bit.conf”

<img src="https://cdn-images-1.medium.com/max/800/1*NKtcbgatw7yhwTy5iGUo8A.png" alt="Article image" width="777" height="576" loading="lazy" decoding="async" />

## Troubleshooting: Error 1057 / Error 1067

## 1. Check your Fluent Bit configuration

- Run interactively to reveal the real error:

```text
cd
 C:\fluent-bit\bin .\fluent-bit.exe -c 
"C:\fluent-bit\conf\fluent-bit.conf"
```

- Look for syntax issues, wrong indentation, or unsupported parameters.

- Common problems: wrong section names (`[SERVICE]`,`[INPUT]`, etc.), missing paths, or duplicate directives.

## 2. Check HTTPS output configuration

If you send logs via HTTPS, confirm these lines are correct:

```text
[
OUTPUT
]
    Name  http
    tls   
On
    tls.verify Off   
# or On if you have valid CA chain
```

- A wrong or unreachable HTTPS endpoint can make Fluent Bit exit instantly → error 1067.

- Test reachability:

```text
Test-NetConnection 
172.16
.11
.1
 -Port 
30443
 curl -k https:
//172.16.11.1:30443/
```

## 3. If you copied the Fluent Bit working directory from another machine

Remove any**persistent data**before starting the service:

```text
del
 /Q 
"C:\fluent-bit\storage\*"
del
 /Q 
"C:\fluent-bit\*.sqlite"
```

- Old checkpoint or DB files (e.g.,`winlog.sqlite`,`tail.sqlite`) tied to another system path can crash initialization.

## 4. Verify all file paths

Ensure every referenced path exists and is accessible by the service account:

- `C:\fluent-bit\bin\fluent-bit.exe`

- `C:\fluent-bit\conf\fluent-bit.conf`

- `C:\fluent-bit\storage\`

- `C:\fluent-bit\winlog.sqlite`(auto-created but needs folder write rights)

- Optional:`C:\fluent-bit\tail.sqlite`

Use**absolute paths**only — relative paths often cause Error 1057 (bad command line) or Error 1067 (crash).

## Extra quick checks

<img src="https://cdn-images-1.medium.com/max/800/1*q6sGj8kf8OgXuxdk7E0LHw.png" alt="Article image" width="948" height="753" loading="lazy" decoding="async" />

## If all above fails

- Delete and recreate the service cleanly:

```text
sc stop fluent
-
bit sc 
delete
 fluent
-
bit sc 
create
 fluent
-
bit binpath
=
 "\"C:\fluent
-
bit\bin\fluent
-
bit.exe\" -c \"C:\fluent
-
bit\conf\fluent
-
bit.conf\"" 
start
=
 auto sc 
start
 fluent
-
bit
```

2. Watch live logs interactively again to pinpoint the crash reason.
