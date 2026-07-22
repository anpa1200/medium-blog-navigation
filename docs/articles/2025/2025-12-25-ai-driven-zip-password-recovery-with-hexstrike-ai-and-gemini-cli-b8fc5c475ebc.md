---
title: "AI-Driven ZIP Password Recovery with HexStrike-AI and Gemini-CLI"
description: "From Encrypted Archive to Flag Using LLM-Orchestrated Tooling"
image: "https://cdn-images-1.medium.com/max/800/0*ugjfFZjFfBwT__hh.png"
---

# AI-Driven ZIP Password Recovery with HexStrike-AI and Gemini-CLI


<img src="https://cdn-images-1.medium.com/max/800/0*ugjfFZjFfBwT__hh.png" alt="Cover image" width="700" height="467" loading="eager" fetchpriority="high" decoding="async" />

:::info Article Metadata
- **Category:** CTI
- **Source article:** [https://medium.com/@1200km/ai-driven-zip-password-recovery-with-hexstrike-ai-and-gemini-cli-b8fc5c475ebc](https://medium.com/@1200km/ai-driven-zip-password-recovery-with-hexstrike-ai-and-gemini-cli-b8fc5c475ebc)
- **Published:** 2025-12-25
- **Preserved media:** 6 image(s), including cover images, screenshots, diagrams, and infographics where present.
- **Preserved technical blocks:** 8 code/configuration block(s).
:::

## Ecosystem Fit

This page mirrors the original Medium article into the 1200km.com Docusaurus ecosystem. The original article flow, images, screenshots, infographics, and technical blocks are preserved from the export.

### From Encrypted Archive to Flag Using LLM-Orchestrated Tooling

<img src="https://cdn-images-1.medium.com/max/800/0*ugjfFZjFfBwT__hh.png" alt="Article image" width="700" height="467" loading="lazy" decoding="async" />

### Overview

&gt; This guide demonstrates how HexStrike-AI , orchestrated through Gemini-CLI , can autonomously solve a common security / CTF task:

&gt; Recover the contents of an encrypted ZIP archive using a known password dictionary.

What makes this workflow different is not the tools themselves — but**how the AI reasons, pivots, and adapts**when something fails.

This is a**fully authorized, local lab scenario**.

## Scenario

**Objective**

- Open an encrypted ZIP file

- Recover the password using a provided wordlist

- Extract the contents and retrieve the flag

**Inputs**

- Encrypted ZIP:
`/home/andrey/secret_file.zip`

- Password dictionary:
`/home/andrey/Documents/passwords_list.txt`

**Tooling (via HexStrike-AI)**

- `zip2john`

- `john`

- `unzip`

- `7z`

- Standard Linux utilities

## Step-by-Step Execution Flow

## 1. Task initiation (LLM-driven)

The user provides a**single high-level prompt**:

```text
Open
 encrypted zip file 
and
 find the flag 
using
 the provided password list.
```

<img src="https://cdn-images-1.medium.com/max/800/1*ANUdip5C59veqsAwPgXw1A.png" alt="Article image" width="1369" height="319" loading="lazy" decoding="async" />

No commands.
No tool selection.
No manual troubleshooting.

## 2. Tool discovery & preparation

HexStrike-AI:

- Determines that ZIP cracking requires**hash extraction**

- Locates`zip2john`automatically

- Verifies tool availability on the system

<img src="https://cdn-images-1.medium.com/max/800/1*0gFo7D_MsfBgaWqvMS00aA.png" alt="Article image" width="1712" height="795" loading="lazy" decoding="async" />

**Key point:**
The AI does*environment discovery*before acting.

## 3. ZIP hash extraction

Initial attempts fail due to incorrect paths.

HexStrike-AI:

- Enumerates`/home`

- Identifies the correct user (`andrey`)

- Locates:

- `/home/andrey/secret_file.zip`

Then successfully extracts the ZIP hash:

```text
zip2john secret_file.
zip
 > zip_hash.txt
```

## 4. Offline password cracking

HexStrike-AI selects the correct cracking strategy:

- Offline attack (safe, fast, no lockouts)

- Uses`john`with the provided wordlist

```text
john 
--wordlist=passwords_list.txt zip_hash.txt
```

**Result**

```text
Password found:
 
Israel123
```

<img src="https://cdn-images-1.medium.com/max/800/1*TRaSGxPOQBkXbiPg-xGREA.png" alt="Article image" width="1700" height="378" loading="lazy" decoding="async" />

## 5. First extraction attempt (failure handling)

The AI attempts:

```text
unzip -
P
 Israel123 secret_file
.zip
```

Failure occurs:

- Unsupported compression method (AES / method 99)

**Critical behavior:**
HexStrike-AI does**not stop**and does**not guess**.

## 6. Adaptive pivot (tool switching)

HexStrike-AI:

- Recognizes AES-encrypted ZIP

- Checks for alternative tooling

- Detects`7z`is available

- Switches extraction method automatically

```text
7z x -pIsrael123 secret_file.
zip
```

Extraction succeeds.

<img src="https://cdn-images-1.medium.com/max/800/1*8vRwcwtg6s_rZg_nplK6kw.png" alt="Article image" width="1703" height="616" loading="lazy" decoding="async" />

## 7. Flag retrieval

Final step:

```text
cat
 secret_file.txt
```

**Flag recovered**

<img src="https://cdn-images-1.medium.com/max/800/1*XqUL-oAX4gre4MnjbaOb7Q.png" alt="Article image" width="1715" height="256" loading="lazy" decoding="async" />

```text
Your
 
Flag
```

## Final Result

ItemValueZIP Password`Israel123`EncryptionZIP AESFlag`Your Flag`Attack TypeOffline dictionaryInteractionSingle promptManual interventionNone

## Why This Matters

This is**not**about cracking ZIP files.

This example demonstrates how**AI-driven execution changes security workflows**:

## What HexStrike-AI did autonomously

- Identified the correct attack class

- Located missing files

- Corrected user errors

- Selected appropriate tools

- Pivoted when a tool failed

- Completed the objective end-to-end

## What the user did

- Defined scope

- Provided a wordlist

- Issued one prompt

## Key Takeaways

- AI is not “running tools blindly”

- It performs**reasoned decision-making**

- Failures are treated as signals, not blockers

- Tool chaining is dynamic, not scripted

- This mirrors how a**real junior pentester / analyst**works — at machine speed

## Defensive Perspective

From a blue-team standpoint, this highlights why:

- Weak passwords remain dangerous even with “strong” encryption

- Offline attacks bypass rate limits entirely

- Password reuse and leaked wordlists are critical risks

## Conclusion

This lab shows how**HexStrike-AI + Gemini-CLI**can execute a complete security task:

&gt; From problem definition → tool discovery → exploitation → validation → result

All driven by**one prompt**.

This is not automation replacing expertise.
It is**expertise amplified**.
