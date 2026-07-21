---
title: Blog Analysis
description: Source analysis and classification rules for the Medium blog navigator.
---

# Blog Analysis

This project maintains the local source archive for Andrey Pautov's security
articles. It preserves article bodies, images, screenshots, and technical blocks
and builds the canonical public collection at `https://1200km.com/articles/`.
The original Medium or publication URL remains available as a source link.

## Sources Used

- Medium RSS feed: `https://medium.com/feed/@1200km`
- Medium profile: `https://medium.com/@1200km`
- Medium master index: [Navigate My Blog: All Articles by Topic](https://medium.com/@1200km/navigate-my-blog-all-articles-by-topic-ffd800ef5480)
- Existing local profile content from the `anpa1200` GitHub profile repository
- Search-visible Medium article metadata for older high-signal posts

## Sorting Rules

The home page uses two sorting models:

- **Newest articles:** sorted by publish date, newest first, from the RSS feed.
- **Topic navigation and direct navigation:** sorted like the existing
  18-group Medium master index.

The topic order is not purely chronological. It is designed for navigation:

1. CTI and threat intelligence
2. AI security and HexStrike-AI
3. AI-driven pentesting and exploitation
4. Web security and scanner workflows
5. Reconnaissance and OSINT
6. Nmap and network scanning
7. Traditional web application security
8. Metasploit and exploitation
9. Password and credential cracking
10. Active Directory and red team
11. Cloud and Kubernetes security
12. Labs and training environments
13. Malware analysis and forensics
14. Threat hunting and detection
15. Tool development and Cursor AI
16. SOC, awareness, and best practices
17. Logging, DevOps, and XPLG
18. Reader input and meta

## Depth Labels

Labels are used to help readers choose the right amount of time and attention:

- **Short guide:** index page, quick reference, short orientation, or RSS item
  without enough body text to classify as a long guide.
- **Article:** conceptual or overview article, usually useful for orientation or
  decision support.
- **Full guide:** practical walkthrough or detailed practitioner guide.
- **Full-long guide:** long-form reference, series part, case study, or deep
  implementation guide.

RSS-derived labels used approximate word-count thresholds:

- Under 1,200 words: Short guide
- 1,200 to 3,500 words: Article
- 3,500 to 7,500 words: Full guide
- Over 7,500 words: Full-long guide

Some older posts were manually labeled from visible Medium metadata such as
reading time and article role.

## Practical Tags

The Docusaurus navigator adds practical tags that are easier to filter than
Medium's publication tags:

- `offensive`
- `lab`
- `cloud`
- `tool`
- `cti`
- `detection`
- `malware`
- `web`
- `osint`
- `ad`
- `passwords`
- `soc`
- `devops`
- `ai`

These tags are assigned by article role and topic group. For example,
HexStrike-AI and exploitation walkthroughs are tagged `offensive`, vulnerable
environments are tagged `lab`, AWS/GCP/Kubernetes content is tagged `cloud`,
and utility or framework posts are tagged `tool`.

## Current Blog Shape

The blog has two major eras:

- **Offensive security and tool walkthrough era:** classic tools, red-team labs,
  web security, password cracking, recon, Metasploit, AD, cloud, Kubernetes, and
  vulnerable lab building.
- **CTI and AI-assisted analyst workflow era:** OpenCTI, customer-driven CTI,
  analytic discipline, attribution, ATT&CK, infrastructure pivoting, telecom
  case studies, AI-assisted CTI, malware-analysis tooling, and vulnerability
  management.

The current direction is strongly weighted toward CTI, detection engineering,
AI-assisted security operations, and practical tool-backed research.

## Maintenance Notes

The Docusaurus archive is generated from the local Medium export plus the live
Medium RSS feed. When new articles are published:

1. Run `npm run generate:articles`.
2. Review the generated Markdown and `src/data/article-catalog.json`.
3. Run `npm run validate:archive` and `npm run validate:media:local`.
4. Run `npm run build:embedded` to verify the canonical `/articles/` output.
5. Run `npm run build:legacy` to verify the old project archive, its migration
   notice, and its canonical/noindex metadata.

`src/data/article-catalog.json` is the maintained machine-readable inventory
used by the archive homepage. The local collection is the preferred browsing
surface; publication URLs document provenance and remain available to readers.
