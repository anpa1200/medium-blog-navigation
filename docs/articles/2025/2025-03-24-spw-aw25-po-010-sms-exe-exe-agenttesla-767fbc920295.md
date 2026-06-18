---
title: "SPW AW25 \u2014 PO.010 SMS.exe.exe (AgentTesla)"
description: "Malware research report"
image: "https://cdn-images-1.medium.com/max/800/0*b5wShQn46BSJdxLI"
---

# SPW AW25 — PO.010 SMS.exe.exe (AgentTesla)


![Cover image](https://cdn-images-1.medium.com/max/800/0*b5wShQn46BSJdxLI)

:::info Article Metadata
- **Category:** CTI
- **Source article:** [https://medium.com/@1200km/spw-aw25-po-010-sms-exe-exe-agenttesla-767fbc920295](https://medium.com/@1200km/spw-aw25-po-010-sms-exe-exe-agenttesla-767fbc920295)
- **Published:** 2025-03-24
- **Preserved media:** 45 image(s), including cover images, screenshots, diagrams, and infographics where present.
- **Preserved technical blocks:** 5 code/configuration block(s).
:::

## Ecosystem Fit

This page mirrors the original Medium article into the 1200km.com Docusaurus ecosystem. The original article flow, images, screenshots, infographics, and technical blocks are preserved from the export.

## SPW AW25 — PO.010 SMS.exe.exe

### Malware research report

1200km@gmail.com

![Article image](https://cdn-images-1.medium.com/max/800/0*b5wShQn46BSJdxLI)

### Summary

### Malware Overview

### Static Analysis

### Threat Intelligence Lookup

### Dynamic Analysis

### Yara Rules

### Conclusion

## Summary

As cybercriminals continue to exploit every opportunity to breach systems and steal sensitive information,**AgentTesla**remains one of the most persistent and widely used malware strains in the wild. Distributed mainly through phishing emails and malicious attachments, AgentTesla disguises itself as legitimate content — such as invoices, shipping notices, or business correspondence — tricking users into executing the payload.

Once installed, this malware quietly begins harvesting**usernames, passwords, credit card details, and other sensitive information**stored in the victim’s browser, email clients, and applications. It also records keystrokes and monitors clipboard data to capture anything typed or copied, including login credentials and crypto wallet addresses.

Cybersecurity researchers have observed how**AgentTesla’s operators leverage current events and social engineering**tactics to enhance the malware’s spread, often tailoring campaigns to specific industries or global crises. The stolen data is then exfiltrated to remote servers, where attackers can use it for further criminal activities, such as**financial fraud, unauthorized access, or selling it on underground forums**.

AgentTesla’s ability to**evade traditional antivirus solutions**, coupled with its continuous evolution and ease of use, ensures that it remains a potent tool in the hands of cybercriminals — and a serious threat to users and organizations worldwide.

## Sample Analyzed

- **Sample Analyzed:**SPW AW25 — PO.010 SMS.exe.exe

- **Analysis Tools:**Custom-built tool

[(Link to this tool here)](https://github.com/anpa1200/Malware_analysis/blob/main/Basic_inf_gathering)

![Article image](https://cdn-images-1.medium.com/max/800/1*t7tmz2lZUCCW7NA0m7bXDg.png)

**File Name**: SPW AW25 — PO.010 SMS.exe.exe
**File Path**: /home/sulik/Documents/MalwareAnalysis/SPW AW25 — PO.010 SMS.exe.exe
**MD5:**7c89b48a2752a771eb6457fe2fea1d8e
**SHA-1:**afb602ef798b23f400fd3d474cb570aa781797c4
**SHA-256:**3d1e16dec7f88b3ccdf7197c64a6eea6a7d3599c12f34893d60012ffd61f15ce
**File Size:**1482240 bytes (1.41 MB)
**File Type:**application/vnd.microsoft.portable-executable
**Entropy:**7.85 (⚠️ High (Possible Packing/Encryption))
**Permissions:**-rw-rw-r —
**PE Compilation Timestamp:**2024–09–20 08:52:48 (✅ Legit)

**File SPW AW25 — PO.010 SMS.exe.exe has hight entropy level, this file possible Packed or Obfuscated.**

**Basic file information (CFF)**

![Article image](https://cdn-images-1.medium.com/max/800/1*3-mIu9ILdrtEUNFt1a92Tw.png)

DOS header:

![Article image](https://cdn-images-1.medium.com/max/800/1*wfFckGcLFBpG1ir3Bmynvg.png)

File header (NT)

![Article image](https://cdn-images-1.medium.com/max/800/1*Lc9rHtwWIRWbguU50EacaA.png)

The import table contains only a limited number of DLL references.

![Article image](https://cdn-images-1.medium.com/max/800/1*b4iH-mrcN8klg3fh_MiAIw.png)

This file is probably packed or obfuscated. You can try one of my favorite platforms to unpack this file:[https://www.unpac.me/](https://www.unpac.me/)

## 🔍 UnpacMe — What Is It?

**UnpacMe**is an**online malware unpacking and analysis platform**. It’s designed to**automatically unpack**packed or obfuscated**PE (Portable Executable)**files and provide**cleaned, unpacked samples**for deeper analysis.

![Article image](https://cdn-images-1.medium.com/max/800/1*RXmFEKOUREzSeODYBeNt6g.png)

Upload file:

![Article image](https://cdn-images-1.medium.com/max/800/1*eMYQZC6KFDcKnJ-vFxNXGw.png)

### The unpacked files are now available for download and further analysis.

First: d1f4761e2e1e15fe454a70864c3aa1da7d6dc90582222bbd7e6d53d0bbee6f62

![Article image](https://cdn-images-1.medium.com/max/800/1*m1b5jiHgh94kI7ee6pG4FA.png)

Rename the file to a more concise name, for example, Example1.exe.

The file was subsequently scanned on VirusTotal to determine its detection status and gather preliminary threat intelligence.

![Article image](https://cdn-images-1.medium.com/max/800/1*WrRFIrVj5ig2RFlYpMdE8g.png)

This file is obfuscated using SmartAssembly, a .NET obfuscator and packer developed by Red Gate Software.

![Article image](https://cdn-images-1.medium.com/max/800/1*7X9COC0ldilGS9xMMFm3hg.png)

**SmartAssembly**is a**.NET obfuscator and packer**developed by**Red Gate Software**. It’s designed to**protect .NET applications**from reverse engineering by making the code**harder to decompile or analyze**.

For deobfuscation of this file, utilize de4dot, a well-regarded open-source tool for reversing .NET obfuscation :[https://github.com/de4dot/de4dot](https://github.com/de4dot/de4dot)

**de4dot**is an**open-source .NET deobfuscator**used to**reverse obfuscation**applied to**.NET assemblies**. It’s popular among malware analysts and reverse engineers to**unpack and clean**obfuscated .NET malware for easier analysis.

![Article image](https://cdn-images-1.medium.com/max/800/1*EU1ep2CHn8w7ci8xCyBLNA.png)

No dedicated protector has been detected at this stage.

![Article image](https://cdn-images-1.medium.com/max/800/1*O8jVdYl4U15jvp0lR67ajg.png)

Next, we will extract the deobfuscated strings using a straightforward tool.

![Article image](https://cdn-images-1.medium.com/max/800/1*6pVhzS7OtNeFoEdgvwR2Fw.png)

The deobfuscated strings will be further analyzed using AI-driven techniques to identify hidden patterns and potential indicators of malicious behavior.

**WINDOWS_API_COMMANDS**

- **GetPixel**: Retrieves the color of a pixel at a specified location from a device context (usually the screen or an image).

- **SetPixel**: Sets the color of a pixel at a specified location.

- **Sleep**: Suspends execution for a specified time (milliseconds), often used to delay or throttle execution.

- **getModuleHandle**: Retrieves a handle to a loaded module (DLL or EXE) in the current process.

These suggest**interaction with the screen (reading and modifying pixels)**and**some control over process timing and module handling**.

**CMD_COMMANDS**

- **Call**: Invokes a batch file or function within a batch file.

- **Color**: Sets the text color of the console.

- **Convert**: Usually used to convert file systems (e.g., FAT to NTFS).

- **Copy**: Copies files or folders.

- **Exit**: Terminates the command interpreter or a script.

- **Type**: Displays the contents of a text file.

These are basic**file manipulation and console control commands**, commonly seen in**batch scripting**or when a DLL is used to execute system commands.

**Likely Functionality of This DLL**

This DLL appears to have capabilities for:

- **Screen manipulation or monitoring**— using`GetPixel`and`SetPixel`(could be for capturing screen data, automation, or visual changes).

- **Process or execution control**— via`Sleep`and`getModuleHandle`.

- **Interacting with the Windows command line**— possibly**executing scripts or commands**for file management, console manipulation, or running other executables.

**Potential Use Cases:**

- **Automation tools**(e.g., screen-based bots or macros).

- **Simple remote administration tools (RATs)**or**malware**(if used maliciously to manipulate screen and run commands).

- **Scripting support DLL**for a larger application that performs file operations and screen interactions.

### Next file is:

**1f4334739853d5429d42f45cad3420878dea54aa1399c2d2461cd2b5e7862459**

![Article image](https://cdn-images-1.medium.com/max/800/1*MdgWg7K8-9TA7PDJtacAXQ.png)

The file has been renamed to exampe2.exe for clarity in subsequent analysis.

![Article image](https://cdn-images-1.medium.com/max/800/1*tI4t3aLO7-M-F2kqL1mQ1A.png)

Open in CFF:

![Article image](https://cdn-images-1.medium.com/max/800/1*Rq5TJGe5i-_N6hs7bP_XSA.png)

The original filename is**ChomeSetup(1).exe**; let’s rename the file for clarity.
A suspiciously high level of entropy was observed, indicating potential packing or obfuscation.

![Article image](https://cdn-images-1.medium.com/max/800/1*QSwwQEcdbF0BUkqyyFj_BA.png)

The .text section, containing the raw executable code, appears to be packed, suggesting an additional layer of obfuscation that may require further unpacking for detailed analysis.

![Article image](https://cdn-images-1.medium.com/max/800/1*ApmlW8S_9cMgYQK6LRMioQ.png)

Next, the de4dot tool was applied to attempt deobfuscation of the packed code.

![Article image](https://cdn-images-1.medium.com/max/800/1*_Q2Wy8V7Ri6-NkjS0U-7AQ.png)

DeepSea Obfuscator was found and cleaned

![Article image](https://cdn-images-1.medium.com/max/800/1*QOrUhNE0N49LUDbhW9Wsgw.png)

DeepSea Obfuscator was detected and its obfuscation layer was successfully removed.

![Article image](https://cdn-images-1.medium.com/max/800/1*hp7rCQDff98HpYWDK5IxhQ.png)

An additional tier of packing was detected, necessitating further unpacking to expose the underlying code structure.

![Article image](https://cdn-images-1.medium.com/max/800/1*NkmCF2eQhg_VZXNvHYcstw.png)

The next file, exhibiting similar characteristics to those from the previous tier of packing, was downloaded and renamed to Tyrone.dll for further analysis.

![Article image](https://cdn-images-1.medium.com/max/800/1*ByKjrQ6W1iV1QJywnlgB1g.png)

A quick scan was performed using VirusTotal to assess the file’s detection status.

![Article image](https://cdn-images-1.medium.com/max/800/1*WwStwB80k9qs9EHHlOYzjA.png)

Analysis using DIE (Detect It Easy) indicates that the file is obfuscated.

![Article image](https://cdn-images-1.medium.com/max/800/1*RkTk1XLx3QmENaWAoY4HZg.png)

The file was then processed with de4dot to remove the obfuscation, revealing its underlying structure and clarifying the embedded metadata for further analysis.

![Article image](https://cdn-images-1.medium.com/max/800/1*vM9pBwymQXutqPtGOYRtFg.png)

Next, extract the strings from both the obfuscated and deobfuscated files, then perform a comparative analysis to highlight differences in structure and reveal critical insights into the malware’s underlying functionality.

![Article image](https://cdn-images-1.medium.com/max/800/1*0cTjT4ATqkwIDzZn2vkXsQ.png)

### Tyron1.txt — Obfuscated/Baseline State

- File contains**heavily obfuscated strings**, patterns like`*_~@`,`XT8`, and hex-like sequences dominate.

- Embedded .NET metadata is present:**System.Reflection**,**System.Windows.Forms**,**System.Drawing**,**mscorlib**, etc.

- Names like**Tyrone.dll**and many**random-looking base64-style strings**suggest**.NET assembly obfuscation**.

- Functionality hints:

- Mentions of`WebClient`,`System.Net`,`DownloadFile`,`Process`,`System.Threading.Thread`, and`System.IO`imply possible**network capabilities, file handling, and process/thread management**.

- Presence of`Mutex`suggests**anti-multi-instance or anti-analysis**logic.

- Various`System.Security.*`,`System.Runtime.InteropServices`, and`LoadLibraryA`/`GetProcAddress`references indicate**potential for native code interop**(P/Invoke), possibly**unpacking or injection mechanisms**.

- Common malware techniques visible:**Memory manipulation, encoding/decoding (Base64), resource management, error handling, obfuscation**.

### Tyron2.txt — After Deobfuscation

- File still includes PE header and section names, but:

- Strings are**more readable and organized**.

- Many**deobfuscated .NET references**appear in clean form (e.g.,`System.Resources.ResourceReader`,`System.Globalization.CultureInfo`,`System.Drawing.Size`).

- There are**key-value-like entries**resembling**resource entries**, configuration settings, or possibly decrypted**embedded resources**.

- Cleaned references to**System.Resources**,**System.CodeDom**,**System.Globalization**, etc., show**metadata and reflection usage**clearly.

### Comparative Insights

**Obfuscation Layer Removed**: Tyron2.txt clearly shows**decrypted/decoded**metadata and strings, which in Tyron1.txt were**heavily obfuscated**or encrypted.

**Post-Deobfuscation Reveal**:

- File likely uses**resource-based storage**(e.g., embedded encrypted data in resources).

- Heavy usage of**system libraries**,**reflection**, and**resource access**, typical in**malicious loaders or droppers**.

**Potential Malicious Behavior**:

- Download and execution of payloads (`WebClient`,`DownloadFile`,`ProcessStartInfo`,`Start`,`LoadLibraryA`).

- Use of**mutex**,**encoding**, and**thread manipulation**— common anti-analysis or persistence tactics.

- Strings like`ApplicationException`,`MessageBox`, and`Environment.Exit`suggest it**handles errors silently or gracefully exits**— again typical of malware trying to avoid attention.

### Conclusion

- **Tyron1.txt**: Obfuscated version of a likely**.NET-based dropper or loader**with signs of malicious behavior.

- **Tyron2.txt**: Post-deobfuscation, the functionality becomes clearer, confirming**network communication, reflection-based loading, and system interaction**.

- The code structure and patterns are**very characteristic of malware**— particularly**commodity malware loaders or information stealers**.

- If these are indeed from malware analysis, it’s likely a**.NET-based malware**employing**heavy obfuscation, dynamic resource loading, and potential payload injection**.

### Lets download and analyse next file:

![Article image](https://cdn-images-1.medium.com/max/800/1*MTxhWbErpJu8gWLlBstfyQ.png)

Perform a quick analysis using VirusTotal to assess the file’s detection status and gather initial threat intelligence.

![Article image](https://cdn-images-1.medium.com/max/800/1*F1UDgoy66l8JFUNLa6U5rQ.png)

&gt; The file is confirmed to be obfuscated, indicating efforts to evade analysis or detection.

![Article image](https://cdn-images-1.medium.com/max/800/1*ax69I2C7M4TwD7VcvCnscg.png)

Lets rename this file to AgentTesla.exe

![Article image](https://cdn-images-1.medium.com/max/800/1*YEx9FQ4HV3cKYNoK3Ek1ew.png)

Attempt deobfuscation using de4dot (or your chosen tool).

![Article image](https://cdn-images-1.medium.com/max/800/1*ha-16kalJdiEQ-oG4ENgJw.png)

### Comparative Analysis of AgentTesla.txt vs AgentTesla2.txt

### Quick Overview

Both files are**string dumps from the same malware sample: Agent Tesla**, a well-known**.NET-based Remote Access Trojan (RAT)**and info-stealer. They contain**different levels of deobfuscation**or**string parsing clarity**.

FileStateKey Differences**AgentTesla.txtPartially Obfuscated**Raw method tokens, numeric IDs, scattered string references**AgentTesla2.txtDeobfuscated/Parsed**Clean class, method, and variable names; organized structures

### Key Similarities

- Both contain:

- **PE headers**(e.g.,`"This program cannot be run in DOS mode."`)

- PE**sections**:`.text`,`.rsrc`,`.reloc`.

- References to**.NET CLR v4.0.30319**, confirming it’s a**.NET executable**.

- Method tokens:`$$method0x600...`, typical for**decompiled .NET binaries**.

- Use of**HMACSHA1**,**SHA256**,**RijndaelManaged**— points to**encryption and hashing**for payloads or data theft.

- **System.IO**,**System.Net**,**System.Windows.Forms**,**System.Threading**,**System.Xml**,**System.Management**, etc. — indicating a wide range of system interactions.

### Key Differences

### AgentTesla.txt (Obfuscated State)

- Many**raw method references**: e.g.,`$$method0x6000190-1`, no clear mappings to what they do.

- Variable names are**meaningless**, such as`AdXaxFT50`,`Cg9pvSzv61`, etc.

- Contains**lower-level structure**: GUIDs, Base64-like strings, and**Win32 API calls**(e.g.,`kernel32`,`user32`,`Advapi32`,`GetModuleHandle`, etc.).

- **Indicators of Cryptography**:`HMAC`,`SHA1Managed`,`RijndaelManaged`,`ComputeHash`,`FromBase64String`.

- **Potential Persistence & Keylogging**: Hooks (`SetWindowsHookEx`,`GetKeyboardState`), file handling, clipboard access, and email exfiltration (`SmtpSSL`,`MailMessage`).

- Obfuscation shows use of**packers/protectors**or**manual obfuscation**to deter reverse engineering.

### AgentTesla2.txt (Deobfuscated State)

- Contains**clarified class/method names**:

- Example:`get_AdXaxFT50`,`get_UInt32_0`,`get_Byte_0`,`GClass10`,`GDelegate0`.

- Organized structure:**class numbers and variable names**give clear**hierarchical structure**(e.g.,`GClass0`,`GClass1`,`GStruct0`).

- **Dynamic loading & interop clearly visible**: e.g.,`Marshal`,`CreateThread`,`VirtualMemoryRead`,`MapViewOfFile`.

- **Clear exfiltration targets**:

- `PublicIpAddressGrab`,`Clipboard`,`KeyloggerInterval`,`SmtpPassword`,`VaultGetItem`,`CreateFile`,`GetLastAccessTime`, etc.

- **Behavioral Indicators**:

- References to**screen capture**,**clipboard logging**,**file system monitoring**,**registry access**,**password vault stealing**, and**network credential harvesting**.

### Behavioral Profile (Both Files)

- **Malicious Intent Confirmed**: Clear evidence of**password stealing**,**network credential access**,**keylogging**, and**data exfiltration**.

- Uses**email via SMTP**for exfiltration: strings like`SmtpSSL`,`SmtpPort`,`SmtpClient`,`SmtpPassword`.

- Interaction with**Windows vaults and secure storage**:`VaultEnumerateItems`,`VaultGetItem`,`passwordVaultPtr`.

- Heavy use of**reflection**and**dynamic invocation**:`GetType`,`GetField`,`MethodInfo`, common for**anti-analysis**or**dynamic payload execution**.

- Interaction with**Windows APIs**for low-level access:**file mapping**,**memory read/write**,**process injection potential**.

### Conclusion

- **AgentTesla.txt**: Obfuscated,**raw dump**. More chaotic, hard to analyze quickly.

- **AgentTesla2.txt**: Deobfuscated with**structured, clear view**of malware logic.

- Both confirm**classic Agent Tesla functionality**:**data theft, persistence, and evasion**.

- **No strange unrelated text**like in the Tyron files (no HIV-related filler), suggesting**more professionally maintained malware**.

**Tyrone.dll comparision**

After complete unpacking, three files named Tyrone.dll were identified. However, a hash comparison revealed that one of these files has a different hash, suggesting potential variations in functionality or configuration that merit further investigation.

![Article image](https://cdn-images-1.medium.com/max/800/1*0XN2n3UyorEWctemVbHLxA.png)

One of the Tyrone.dll files has already been analyzed, so the next step is to examine the remaining file for further discrepancies.

![Article image](https://cdn-images-1.medium.com/max/800/1*JTgm43Z88vrsxxvo0pPbxw.png)

The remaining Tyrone.dll sample is also obfuscated. Preliminary analysis indicates that it appears to exhibit similar functionality to the previously analyzed Tyrone.dll files, suggesting a consistent operational role across these components.

## Static Analysis Summary

### Two Tiers of Packing (Revised)

- **First Tier (Outer Layer):**
Upon depacking the primary executable, five separate files were extracted. The high entropy of the outer layer initially signaled that the file was packed or encrypted, which aligns with standard obfuscation methods to hinder static analysis.

- **Second Tier (Inner Layer):**
Among the extracted files, one was found to be further packed. This secondary packed file required an additional round of unpacking, revealing deeper nested code structures and embedded resources. This process highlights the multi-layered approach employed by the malware to complicate analysis.

![Article image](https://cdn-images-1.medium.com/max/800/1*xsgUjzu2EPSFBH32E_dqpw.png)

### Multiple Layers of Obfuscation

- **Obfuscation Techniques:**
The malware uses tools like SmartAssembly for .NET obfuscation, alongside custom string encoding and encryption methods.

- **Layered Defense:**
Initial analysis reveals heavily obfuscated strings and metadata. After applying deobfuscation (e.g., using de4dot), clearer .NET references (such as those to System.Reflection, System.Drawing, etc.) and structured resource entries become visible, exposing the underlying malicious logic.

### Functionality of Depacked and Deobfuscated Files

- **Primary Executable (SPW AW25 — PO.010 SMS.exe.exe):**

- Initially obscured by packing and obfuscation, it reveals calls to Windows API functions like**GetPixel/SetPixel**(suggesting screen interaction),**Sleep**(timing control), and**getModuleHandle**(module management).

- Basic file operations and command executions (via CMD commands) hint at its role in initiating further malicious actions.

- **DLL Components (e.g., Tyrone.dll):**

- Post-deobfuscation, these DLLs exhibit functionality for dynamic resource loading and extended system interactions.

- They reference network communication methods (such as WebClient/DownloadFile) and include elements like mutex usage, reflection, and P/Invoke techniques, which are typical for payload loaders or droppers.

- **AgentTesla Components:**

- Separate analysis of related string dumps (AgentTesla.txt vs. AgentTesla2.txt) confirms classic remote access and info-stealing capabilities.

- Obfuscated states hide critical functions (keylogging, clipboard monitoring, and exfiltration routines) that are clearly revealed upon deobfuscation.

### Probable Behavior and Functionality of the Malware

- **Multi-Stage Deployment:**
The sample appears to operate as a multi-layered .NET malware loader or dropper, using successive unpacking and deobfuscation to reveal deeper levels of malicious code.

- **Malicious Capabilities:**

- **Screen Interaction & Process Control:**The use of Windows API functions (e.g., GetPixel/SetPixel) implies potential screen monitoring or manipulation.

- **Network & File Operations:**Decrypted strings reveal capabilities for file management, dynamic payload download, and process/thread management, suggesting remote administration or data exfiltration functionalities.

- **Anti-Analysis Measures:**Techniques like mutex usage, reflection, and heavy obfuscation serve to hinder reverse engineering and evade detection.

- **Overall Impact:**
The combination of these behaviors is consistent with malware designed for persistence, covert operation, and data theft — characteristics seen in known families like AgentTesla.

### Conclusion

The static analysis of SPW AW25 — PO.010 SMS.exe.exe reveals a sophisticated .NET-based malware that employs at least two tiers of packing along with multiple layers of obfuscation. Each depacked and deobfuscated file — whether it is the main executable or the accompanying DLLs — contributes to a coordinated malicious framework. The sample demonstrates functionalities ranging from screen and process manipulation to network communications and data exfiltration, consistent with modern droppers or information stealers designed to evade analysis and detection.

## Threat Intelligence Lookup: AgentTesla

- **Name**: AgentTesla

- **Type**: Remote Access Trojan (RAT), Infostealer

- **First Seen**: 2014

- **Status**: Active, widespread

- **Distribution Methods**:

- Phishing emails with malicious attachments (Office docs, executables in ZIP/RAR)

- Malicious links

- Exploit-based payloads (**CVE-2017–11882**,**CVE-2017–0199**)

### Key Capabilities:

- Credential theft (browsers, email clients, FTP, VPN)

- Keylogging

- Clipboard monitoring (crypto theft)

- Data exfiltration (SMTP, FTP, HTTP)

- Persistence via registry/run keys, scheduled tasks

### Exploitation:

- Uses**Office document exploits**to achieve code execution without macros.

- Frequently**obfuscated**with packers (e.g., Themida, UPX).

- Exploits human factors through**social engineering and topical lures**(e.g., invoices, shipment notices).

### Targets:

- Global, across multiple industries

- Especially prevalent in**SMBs**,**logistics**,**finance**, and**manufacturing**

### TTPs (Tactics, Techniques, Procedures):

- **Initial Access**: Phishing, Exploit Docs (T1566, T1203)

- **Execution**: User Execution, Exploit Office Apps (T1204, T1203)

- **Credential Access**: Credential Dumping, Input Capture (T1003, T1056)

- **Exfiltration**: Exfil via C2 (SMTP, FTP) (T1041)

### IOCs (Common Indicators):

- Domains/IPs for C2 communication (dynamic, often changing)

- Unusual SMTP/FTP traffic

- File hashes (vary per campaign; detection via behavior preferred)

## Dynamic Analysis

### 1. Pre-Execution Confirmation

- **Snapshot Verification:**
Ensure the system snapshot is intact and all necessary monitoring tools are operational.

**Analysis Tool:**Procmon Log Analysis
**File Type:**Executable (.exe)
**Environment:**Windows 10

**Process tree:**

![Article image](https://cdn-images-1.medium.com/max/800/1*UnwJ525zGq1hMk9X8IWLag.png)

### Performed a drill-down to the processes:

```text
"C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe" 
Add
-
MpPreference 
-
ExclusionPath "C:\Users\Malware\Desktop\Sample2\SPW AW25 - PO.010 SMS.exe.exe"
```

### Explanation:

This PowerShell command uses**Windows Defender’s configuration utility**(`Add-MpPreference`) to add an**exclusion**for the malware’s own file path.

- **Command Breakdown:**

- `Add-MpPreference`— A PowerShell cmdlet used to change Microsoft Defender settings.

- `-ExclusionPath`— Specifies a folder or file path that Defender will ignore during scans.

- `"C:\Users\Malware\Desktop\Sample2\SPW AW25 - PO.010 SMS.exe.exe"`— The malware's exact file path being excluded.

### Impact:

- This action**disables detection**of the malware by**Microsoft Defender Antivirus**, allowing it to operate undetected.

- It is a classic**defense evasion technique**— self-whitelisting to avoid quarantine or deletion.

### Security Implication:

- This is a**red flag behavior**typical of malicious software aiming to**persist longer**on the system without interference.

- It also indicates the malware has sufficient permissions to modify Defender preferences (likely running with**elevated privileges**).

Next

```text
C:\Windows\system32\conhost.exe 0xffffffff -ForceV1
```

**What is**`**conhost.exe**`**?**

- Legitimate**Windows Console Host**process.

- It acts as an**interface between the Command Prompt (cmd.exe)**or other console-based applications and the Windows GUI.

- **Supports input/output rendering**, especially for older console apps.

**Malware**may spawn`conhost.exe`to**hide PowerShell or cmd execution**, making it less visible in task managers.

- The**NT-style path (**`**\??\**`**)**and`**-ForceV1**`flag suggest**low-level, intentional use**, likely**not initiated by a user**, but by**malicious code**.

- It could be**masking command execution**, or**attaching to a spawned shell**(e.g., PowerShell), especially after spawning it via`CreateProcess`.

**Next**

```text
C:
\Windows\System32\WindowsPowerShell\v1.
0
\powershell.exe
" Add-MpPreference -ExclusionPath "
C:\Users\Malware\AppData\Roaming\IbwIIBmUDWimTZ.exe
"
```

- This action**disables detection**of the malware by**Microsoft Defender Antivirus**, allowing it to operate undetected.(like first process)

We can see same actions for next files:

wlBldyvi.exe, SPW AW25 — PO.010 SMS.exe.exe,

```text
"C:\Windows\System32\schtasks.exe" 
/
Create
 
/
TN "Updates\IbwIIBmUDWimTZ" 
/
XML "C:\Users\Malware\AppData\Local\Temp\tmpBF68.tmp"
```

**Component Explanation
****schtasks.exe —**A legitimate Windows utility used to create, delete, or modify scheduled tasks. Frequently abused by malware for persistence.
**/Create**— Instructs schtasks to create a new scheduled task.
**/TN “Updates\\IbwIIBmUDWimTZ”**— Assigns a task name. It’s placed under the Updates folder. The name IbwIIBmUDWimTZ is likely randomized to avoid detection.
**/XML “C:\\Users\\Malware\\AppData\\Local\\Temp\\tmpBF68.tmp**” — The task’s configuration is provided via an XML file, located in the Temp directory. This file defines what the task does (e.g., what binary to execute, triggers, conditions).

**Task scheduler:**

![Article image](https://cdn-images-1.medium.com/max/800/1*1JOAMMg3MGVopxp_3cIFQw.png)

![Article image](https://cdn-images-1.medium.com/max/800/1*lEK-ccu85gMIVl_-XLdHPw.png)

**Found two identical files (same hash):**

![Article image](https://cdn-images-1.medium.com/max/800/1*IgkK41SQj0uzhNofz6Ek6w.png)

**This file was excluded from Defender scanning in a previous task.**

Virus total check:

![Article image](https://cdn-images-1.medium.com/max/800/1*s45-whBfhIapslq9e1PO1g.png)

The file, likely a version of ChromeSetup(1).exe, was analyzed during the Static Analysis stage.

**“Execution of the child file demonstrates identical functionality.”**

![Article image](https://cdn-images-1.medium.com/max/800/1*Qwu0IHbAMV_MxDuCcyXRVQ.png)

The behavior diagram below illustrates the file’s execution flow.

![Article image](https://cdn-images-1.medium.com/max/800/1*fjF4kjDG5YE9aLSXYrbenw.png)

Network:

03/24/25 09:06:21 AM [ DNS Server] Received A request for domain ‘api.ipify.org’.
03/24/25 09:06:22 AM [ Diverter] SPW AW25 — PO.010 SMS.exe.exe (2428) requested TCP 192.0.2.123:443

fakeNet

![Article image](https://cdn-images-1.medium.com/max/800/1*EJ4G9eqbSYCJkM-spOvM5A.png)

Real Net:

![Article image](https://cdn-images-1.medium.com/max/800/1*8G_A5f_KTW12RXeQHE3z6g.png)

### Below is the summary of the dynamic analysis conducted on the sample.

**Behavioral Characteristics:**

- **Data Exfiltration:**Agent Tesla is designed to steal sensitive information such as credentials, keystrokes, and clipboard data from infected systems.​

- **Persistence Mechanisms:**The malware establishes persistence by creating scheduled tasks and modifying registry keys to ensure it runs at startup.​

- **Defense Evasion:**It employs techniques to evade detection, including adding exclusions to Windows Defender settings via PowerShell commands.​

**Network Indicators:**

- **C2 Communication:**The sample communicates with command and control servers to exfiltrate collected data. Notable indicators include:​

- **IP Address:**104.26.12.205 (on this sample)

**File System Activity:**

- **Dropped Files:**The malware drops executable files in the`AppData\Roaming`directory, such as`IbwIIBmUDWimTZ.exe`, which are used to carry out its malicious activities.

### YARA -rules

```text
rule 
AgentTesla_SPWAW25_FullDetection
{
    meta:
        description 
=
 
"Detects Agent Tesla variant SPW AW25 - PO.010 SMS.exe.exe using hash, behavior, and IoCs"
        author 
=
 
"Malware Researcher"
        malware_family 
=
 
"Agent Tesla"
        md5 
=
 
"7c89b48a2752a771eb6457fe2fea1d8e"
        sha1 
=
 
"afb602ef798b23f400fd3d474cb570aa781797c4"
        sha256 
=
 
"3d1e16dec7f88b3ccdf7197c64a6eea6a7d3599c12f34893d60012ffd61f15ce"
        reference 
=
 
"Full Malware Research Report"
    strings:
        
// Unique and high-confidence IoCs
        
$p1
 
=
 
"Add-MpPreference"
 wide ascii
        
$p2
 
=
 
"ExclusionPath"
 wide ascii
        
$s1
 
=
 
"schtasks.exe"
 wide ascii
        
$s2
 
=
 
"/Create /TN 
\"
Updates
\\
IbwIIBmUDWimTZ
\"
"
 wide ascii
        
$s3
 
=
 
"tmpBF68.tmp"
 wide ascii
        
$f1
 
=
 
"IbwIIBmUDWimTZ.exe"
 wide ascii
        
$api1
 
=
 
"GetPixel"
 wide ascii
        
$api2
 
=
 
"SetPixel"
 wide ascii
        
$api3
 
=
 
"Sleep"
 wide ascii
        
$api4
 
=
 
"getModuleHandle"
 wide ascii
        
$comm1
 
=
 
"smtp."
 wide ascii
        
$comm2
 
=
 
"MailMessage"
 wide ascii
        
$vault
 
=
 
"VaultGetItem"
 wide ascii
        
$net
 
=
 
"api.ipify.org"
 ascii
        
$ip
 
=
 
"104.26.12.205"
 ascii
    condition:
        uint32(
0
) 
==
 
0x5A4D
 and
        (
            hash.md5(
0
, filesize) 
==
 
"7c89b48a2752a771eb6457fe2fea1d8e"
 or
            (
                
7
 of (
$p
*
, 
$s
*
, 
$f
*
, 
$api
*
, 
$comm
*
, 
$vault
, 
$net
, 
$ip
)
            )
        )
}
```

## Conclusion

AgentTesla continues to be a major cyber threat due to its effectiveness in stealing sensitive information and its widespread use in phishing campaigns. Its constant evolution, ease of use, and ability to bypass traditional defenses make it a favored tool among cybercriminals. Vigilance, up-to-date security measures, and user awareness are key to defending against this persistent malware.

## References

**Tools Used:**
Process Monitor (Procmon) — Sysinternals
Wireshark / tshark — Network analysis tools
VirusTotal — Malware hash and detection analysis
CFF Explorer — PE (Portable Executable) analysis tool
Regshot — Registry monitoring
FakeNet — Network simulation tool
Custom string analysis tools (String_Analyser)
**Threat Intelligence Sources:
**Any.Run Sandbox Analysis
VirusTotal
Abuse.ch MalwareBazaar
CyberSec Sentinel
SecurityOnline.info
Emerging Threats IDS Signatures
Malwarebytes Threat Intelligence Blog
**Additional Documentation:
**MITRE ATT&CK Framework —[https://attack.mitre.org](https://attack.mitre.org)
Sysinternals Suite Documentation — Microsoft

### Andrey Pautov 1200km@gmail.com
