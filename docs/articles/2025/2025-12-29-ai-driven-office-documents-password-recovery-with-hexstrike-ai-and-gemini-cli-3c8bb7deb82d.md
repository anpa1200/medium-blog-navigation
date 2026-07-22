---
title: "AI-Driven Office Documents Password Recovery with HexStrike-AI and Gemini-CLI"
description: "From Encrypted Document to Readable Content Using LLM-Orchestrated Tooling"
image: "https://cdn-images-1.medium.com/max/800/0*NEMwBOBGpCmEwBNd.png"
---

# AI-Driven Office Documents Password Recovery with HexStrike-AI and Gemini-CLI


<img src="https://cdn-images-1.medium.com/max/800/0*NEMwBOBGpCmEwBNd.png" alt="Cover image" width="700" height="467" loading="eager" fetchpriority="high" decoding="async" />

:::info Article Metadata
- **Category:** CTI
- **Source article:** [https://medium.com/@1200km/ai-driven-office-documents-password-recovery-with-hexstrike-ai-and-gemini-cli-3c8bb7deb82d](https://medium.com/@1200km/ai-driven-office-documents-password-recovery-with-hexstrike-ai-and-gemini-cli-3c8bb7deb82d)
- **Published:** 2025-12-29
- **Preserved media:** 8 image(s), including cover images, screenshots, diagrams, and infographics where present.
- **Preserved technical blocks:** 3 code/configuration block(s).
:::

## Ecosystem Fit

This page mirrors the original Medium article into the 1200km.com Docusaurus ecosystem. The original article flow, images, screenshots, infographics, and technical blocks are preserved from the export.

### From Encrypted Document to Readable Content Using LLM-Orchestrated Tooling

<img src="https://cdn-images-1.medium.com/max/800/0*NEMwBOBGpCmEwBNd.png" alt="Article image" width="700" height="467" loading="lazy" decoding="async" />

## Overview

This guide shows how HexStrike-AI, orchestrated through Gemini-CLI, can autonomously handle a common,**authorized**security task:

**Regain access to a password-protected DOCX you own**(or are explicitly authorized to access),**identify the encryption scheme**, and**restore usability**— without handholding.

The core value here is not “magic cracking.” It’s the AI’s ability to**reason**,**validate assumptions**, and**pivot**when reality disagrees with the first plan.

This is a fully authorized, local scenario.

**Full guide how to install and use HexstrikeAI here:**

[**HexStrike on Kali Linux 2025.4: A Comprehensive Guide**](2025-12-18-hexstrike-ai-install-configure-and-run-mcp-with-gemini-openai-cursor-llama-85a0e5752949.md)

**Manual Office file Password cracking. Guide with real life examples here:|
**[../2024/2024-10-28-office-file-doc-docx-ppt-password-cracking-guide-with-real-life-examples-f8e356144ca4.md](../2024/2024-10-28-office-file-doc-docx-ppt-password-cracking-guide-with-real-life-examples-f8e356144ca4.md)

## Scenario

### Objective

- Confirm a DOCX file is encrypted and determine*how*

- Distinguish between**user password**vs**owner password / permissions**

- Restore access**using known credentials**(password manager candidates, documented passphrases, owner-provided secrets)

- Extract the content and retrieve the flag (CTF-style)*after access is legitimately obtained*

### Inputs

- Encrypted file:
`/home/andrey/my_secret_file.txt`

<img src="https://cdn-images-1.medium.com/max/800/1*kduNgL5-qOphNtjqD8Y5Gw.png" alt="Article image" width="574" height="587" loading="lazy" decoding="async" />

- Password Dictionary:
`/home/andrey/Documents/passwords_list.txt`

<img src="https://cdn-images-1.medium.com/max/800/1*lMl1ct5sA5HuWnB6xkYy6g.png" alt="Article image" width="897" height="538" loading="lazy" decoding="async" />

## Step-by-Step Execution Flow

- Run the HexstrikeAI server

```text
hexstrike_server
```

<img src="https://cdn-images-1.medium.com/max/800/1*TogAVXnHW6s_p2I_SU9lUw.png" alt="Article image" width="1527" height="748" loading="lazy" decoding="async" />

- Run Gemini-CLI

```text
gemeni-cli
```

<img src="https://cdn-images-1.medium.com/max/800/1*KSvr7YDPe9YldkqTmp52rQ.png" alt="Article image" width="1730" height="550" loading="lazy" decoding="async" />

### Promt:

```text
@hexstrike Crack password of /home/andrey/Documents/my_secret_file.txt. use passwords list /home/andrey/Documents/password_list.txt
```

## Execution Flow:

### 1) Task initiation (single high-level prompt)

You issued one objective:

- Recover access to /home/andrey/Documents/my_secret_file.txt using a provided candidate list

- Proceed until the document content is readable

No manual tool selection, no pre-planned commands.

<img src="https://cdn-images-1.medium.com/max/800/1*lU5QSvvGyWBxHEsz1IC6xg.png" alt="Article image" width="1268" height="318" loading="lazy" decoding="async" />

### 2) Tool capability gap identified

HexStrike initially reported it didn’t have a dedicated “crack docx” tool.

**AI behavior:**rather than stopping, it shifted to a plan that starts with**deriving a verification artifact**from the docx (a representation suitable for offline validation).

### 3) First failure: write location permissions

The AI attempted to save output under a system directory (`/usr/lib/...`) and hit**Permission denied**.

**Pivot:**it switched to a user-writable temp directory under the Gemini working area and retried.

### 4) Second failure: dependency not in PATH

The helper utility needed for extraction wasn’t callable directly (**command not found**).

**Pivot:**the AI performed filesystem discovery, located the tool in a non-PATH location, and re-ran it using the full path.

<img src="https://cdn-images-1.medium.com/max/800/1*PvX9xRmJWkkf2_3NJ9quIQ.png" alt="Article image" width="1710" height="259" loading="lazy" decoding="async" />

### 5) Extraction succeeded (hash/verification artifact produced)

With the correct tool path and a writable output directory, the AI generated the intermediate artifact successfully and prepared it for offline checking.

### 6) Offline candidate validation (dictionary replay)

The AI ran an**offline candidate check**using:

- The extracted artifact from the DOCX file

- The provided wordlist

**Failure:**wordlist path mismatch (`password_list.txt`vs`passwords_list.txt`).

**Pivot:**it listed`~/Documents`, confirmed the actual filename, and reran with the corrected path.

### 7) Success: password recovered

After correcting the wordlist filename, the run completed and returned a valid password for the File:

- **Recovered password:**`MyStrongPass`

<img src="https://cdn-images-1.medium.com/max/800/1*39QwyfsDFB64CHq4YCLJag.png" alt="Article image" width="1733" height="792" loading="lazy" decoding="async" />

## Conclusion

This DOCX flow demonstrates the real advantage of AI-orchestrated tooling: not the individual utilities, but the system’s ability to**self-correct**and still reach the objective from a single high-level instruction.

The key outcome is the closed-loop troubleshooting behavior:

- **Precondition validation:**it verifies that the target file and the candidate list exist, are readable, and are correctly referenced (paths, filenames, permissions).

- **Environment discovery:**when a required dependency or capability is missing, it doesn’t stall — it enumerates what is available and adjusts the plan accordingly.

- **Error-driven adaptation:**permission issues, missing binaries, and incorrect assumptions (for example, a wrong filename in the prompt) are treated as telemetry. The AI diagnoses the failure, applies the minimal correction, and retries.

- **End-to-end convergence:**the workflow remains goal-driven (recover access → validate → extract content) rather than tool-driven, which prevents “random command spam.”

This is what “one prompt success” actually means in practice: the user defines scope and intent once, and the AI handles the messy middle — environment quirks, path mistakes, and execution pivots — until it reaches a verified result.
