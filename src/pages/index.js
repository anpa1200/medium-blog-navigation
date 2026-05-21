import React, {useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import clsx from 'clsx';

const profileUrl = 'https://medium.com/@1200km';
const masterIndexUrl =
  'https://medium.com/@1200km/navigate-my-blog-all-articles-by-topic-ffd800ef5480';

const depthRank = {
  'Short guide': 1,
  Article: 2,
  'Full guide': 3,
  'Full-long guide': 4,
};

const latestArticles = [
  {
    title: 'The Intelligent Shield. OpenCTI',
    url: 'https://medium.com/@1200km/the-intelligent-shield-057c9b4b9394',
    date: '2026-05-21',
    depth: 'Full guide',
    minutes: 'RSS-derived: about 7.3k words',
    topics: ['CTI', 'OpenCTI', 'AI enrichment', 'Threat intelligence'],
    summary:
      'OpenCTI deployment and AI-driven enrichment guide covering STIX 2.1, connectors, feeds, confidence scoring, hardening, and operational runbooks.',
  },
  {
    title: 'CTI Analyst Field Manual - Complete Reference',
    url: 'https://medium.com/@1200km/cti-analyst-field-manual-complete-reference-ef2a370bb21f',
    date: '2026-05-18',
    depth: 'Short guide',
    minutes: 'RSS item has no full body',
    topics: ['CTI', 'Reference', 'Field manual'],
    summary:
      'Entry point for the CTI Analyst Field Manual, intended as a reference map rather than a single deep technical walkthrough.',
  },
  {
    title: 'Customer-Driven AI CTI Project',
    url: 'https://medium.com/@1200km/customer-driven-ai-cti-project-c0db3cdc1830',
    date: '2026-05-13',
    depth: 'Article',
    minutes: 'RSS-derived: about 2.2k words',
    topics: ['CTI', 'AI', 'Detection engineering', 'Project workflow'],
    summary:
      'Overview and workflow quick reference for a gate-controlled CTI-to-detection project model.',
  },
  {
    title: 'Customer-Driven AI CTI Project Template: Part 2B - Reference Toolkit',
    url: 'https://medium.com/@1200km/customer-driven-ai-cti-project-template-part-2b-reference-toolkit-3a56fab0b943',
    date: '2026-05-12',
    depth: 'Full-long guide',
    minutes: 'RSS-derived: about 12.7k words',
    topics: ['CTI', 'Detection engineering', 'Templates', 'Validation gates'],
    summary:
      'Reference toolkit for CTI-to-detection execution, including artifacts, validation gates, and reusable delivery material.',
  },
  {
    title: 'Customer-Driven AI CTI Project Template. Part 2A: Phase-by-Phase Execution Guide',
    url: 'https://medium.com/@1200km/customer-driven-ai-cti-project-template-part-2a-phase-by-phase-execution-guide-f9751a8bcb59',
    date: '2026-05-12',
    depth: 'Full-long guide',
    minutes: 'RSS-derived: about 12.6k words',
    topics: ['CTI', 'Detection engineering', 'Execution guide', 'AI workflow'],
    summary:
      'Phase-by-phase implementation guide for moving from intelligence requirements to hunts, detections, and customer delivery.',
  },
  {
    title: 'Customer-Driven AI CTI Project Template. Part 1: Foundations',
    url: 'https://medium.com/@1200km/customer-driven-ai-cti-project-template-part-1-foundations-745861507d03',
    date: '2026-05-11',
    depth: 'Full-long guide',
    minutes: 'RSS-derived: about 11.3k words',
    topics: ['CTI', 'Methodology', 'Foundations', 'AI workflow'],
    summary:
      'Foundational methodology for a customer-driven AI CTI lifecycle with strict validation gates.',
  },
  {
    title: "Applying Sherman Kent's Analytic Discipline to CTI: A Practical Analyst Guide",
    url: 'https://medium.com/@1200km/applying-sherman-kents-analytic-discipline-to-cti-a-practical-analyst-guide-33142ad7553b',
    date: '2026-05-10',
    depth: 'Full guide',
    minutes: 'RSS-derived: about 5.9k words',
    topics: ['CTI', 'Analytic discipline', 'Estimative language'],
    summary:
      'Practical guide to evidence discipline, confidence language, and analytic integrity for CTI production.',
  },
  {
    title: 'CTI-Led Defensive Strategy for a Cellular Provider (Case Study)',
    url: 'https://infosecwriteups.com/cti-led-defensive-strategy-for-a-fictional-cellular-provider-case-study-c77bc5765b31',
    date: '2026-05-09',
    depth: 'Full-long guide',
    minutes: 'RSS-derived: about 12.4k words',
    topics: ['CTI', 'Telecom', '5G', 'Defensive strategy'],
    summary:
      'End-to-end telecom case study for core network, cloud operations, SOC/NOC, identity, third-party access, and executive decision support.',
  },
  {
    title: 'CTI Kill Chain: An Analyst Guide With Real-World Evidence',
    url: 'https://medium.com/@1200km/cti-kill-chain-an-analyst-guide-with-real-world-evidence-c3bef6fd2979',
    date: '2026-05-09',
    depth: 'Short guide',
    minutes: 'RSS item has no full body',
    topics: ['CTI', 'Kill chain', 'Evidence'],
    summary:
      'Analyst-oriented guide to using kill-chain thinking with real-world evidence and defensible CTI structure.',
  },
  {
    title: 'Manual CTI vs. AI-Assisted CTI: A Step-by-Step Clock Comparison',
    url: 'https://medium.com/@1200km/manual-cti-vs-ai-assisted-cti-a-step-by-step-clock-comparison-ee08325203fc',
    date: '2026-05-08',
    depth: 'Full guide',
    minutes: 'RSS-derived: about 6.8k words',
    topics: ['CTI', 'AI workflow', 'Analyst productivity'],
    summary:
      'Side-by-side comparison of manual CTI work and AI-assisted CTI, focused on which steps compress and which risks remain.',
  },
];

const featuredArticles = [
  {
    title: 'Navigate My Blog: All Articles by Topic',
    url: masterIndexUrl,
    date: '2026-03-16',
    depth: 'Article',
    topics: ['Master index', '100+ posts', 'Navigation'],
    summary:
      'The original Medium master index that groups the full blog into 18 topic-based sections.',
  },
  {
    title: 'AI in Offensive Operations: How Threat Actors Use Artificial Intelligence',
    url: 'https://medium.com/@1200km/ai-in-offensive-operations-how-threat-actors-use-artificial-intelligence-4eaeeaf029a9',
    date: '2026-04',
    depth: 'Full-long guide',
    topics: ['AI misuse', 'Threat actors', 'Research report'],
    summary:
      'Evidence-based research report on attacker AI use, named incidents, provider disclosures, TTPs, and forecast judgments.',
  },
  {
    title: 'Android APK Analysis Tool: AI-Powered Static Malware Analysis in Your Terminal',
    url: 'https://medium.com/@1200km/android-apk-analysis-tool-ai-powered-static-malware-analysis-in-your-terminal-4beb239dad12',
    date: '2026-04-07',
    depth: 'Full guide',
    topics: ['Malware analysis', 'Android', 'AI tooling'],
    summary:
      'Practical guide to static APK analysis with YARA, semantic scoring, VirusTotal, multi-provider AI, and Frida hooks.',
  },
  {
    title: 'ATT&CK as a Working Tool: Theory and Hands-On Practical Usage',
    url: 'https://medium.com/@1200km/att-ck-as-a-working-tool-theory-and-hands-on-practical-usage-d63835c9f101',
    date: '2026-03-19',
    depth: 'Full-long guide',
    topics: ['MITRE ATT&CK', 'CTI', 'Detection engineering'],
    summary:
      'Practitioner guide for using ATT&CK in CTI mapping, gap analysis, detection engineering, hunting, and emulation.',
  },
  {
    title: 'Attribution Methodology: How to Build, Defend, and Challenge a Threat Actor Attribution',
    url: 'https://medium.com/@1200km/attribution-methodology-how-to-build-defend-and-challenge-a-threat-actor-attribution-071066437ced',
    date: '2026-03-20',
    depth: 'Full guide',
    topics: ['CTI', 'Attribution', 'Analytic discipline'],
    summary:
      'Attribution framework covering evidence types, confidence, false flags, cluster-level vs incident-level claims, and common mistakes.',
  },
  {
    title: 'Infrastructure Pivoting: How CTI Analysts Expand From a Single IOC to a Full Attacker Network',
    url: 'https://infosecwriteups.com/infrastructure-pivoting-how-cti-analysts-expand-from-a-single-ioc-to-a-full-attacker-network',
    date: '2026-03',
    depth: 'Full guide',
    topics: ['CTI', 'Infrastructure', 'Pivoting'],
    summary:
      'Field guide for pivoting from a single IOC through passive DNS, reverse IP, ASN reuse, TLS certificates, and internet-wide search.',
  },
  {
    title: 'CVSS v4.0: The Practical Field Guide for Vulnerability Management',
    url: 'https://medium.com/bugbountywriteup/cvss-v4-0-the-practical-field-guide-for-vulnerability-management-5b5a59728456',
    date: '2026-03',
    depth: 'Full guide',
    topics: ['Vulnerability management', 'CVSS v4.0', 'Risk prioritization'],
    summary:
      'Practical guide to CVSS-B, CVSS-BT, CVSS-BTE, KEV, EPSS, environmental scoring, and operational prioritization.',
  },
  {
    title: 'I Built an AI-Powered Malware Debugger That Explains Every Function It Sees',
    url: 'https://medium.com/@1200km/ai-powered-malware-debugger-that-explains-every-function-it-sees-2a28ef75df8a',
    date: '2026-03',
    depth: 'Full guide',
    topics: ['Malware analysis', 'Reverse engineering', 'AI tooling'],
    summary:
      'Engineering walkthrough for AIDebug: FLIRT matching, malware pattern detection, CFG visualization, Frida hooks, and reporting.',
  },
  {
    title: "StratusAI: I Built an AI-Powered Cloud Security Scanner for AWS and GCP - Here's Everything",
    url: 'https://medium.com/@1200km/stratusai-i-built-an-ai-powered-cloud-security-scanner-for-aws-and-gcp-heres-everything-89c6702d3b84',
    date: '2026-03',
    depth: 'Full guide',
    topics: ['Cloud security', 'AWS', 'GCP', 'AI tooling'],
    summary:
      'Engineering walkthrough for a multi-cloud scanner with AWS and GCP modules, LLM routing, Terraform deployment, and tests.',
  },
];

const topicGroups = [
  {
    title: 'CTI & Threat Intelligence',
    anchor: 'd5de',
    description:
      'Threat intelligence tradecraft, actor research, telecom threat mapping, attribution, infrastructure pivoting, ATT&CK, and CTI-to-detection work.',
    primaryTags: ['CTI', 'Detection', 'Attribution'],
    depth: 'Full guide',
    articles: [
      'The Intelligent Shield. OpenCTI',
      'Customer-Driven AI CTI Project Template. Part 1: Foundations',
      'Customer-Driven AI CTI Project Template. Part 2A: Phase-by-Phase Execution Guide',
      'Customer-Driven AI CTI Project Template: Part 2B - Reference Toolkit',
      'Applying Sherman Kent’s Analytic Discipline to CTI',
      'CTI-Led Defensive Strategy for a Cellular Provider',
      'Manual CTI vs. AI-Assisted CTI',
      'ATT&CK as a Working Tool',
      'Attribution Methodology',
      'Infrastructure Pivoting',
    ],
  },
  {
    title: 'AI in Cybersecurity & HexStrike-AI',
    anchor: 'cbd9',
    description:
      'Big-picture AI security, HexStrike-AI setup, MCP/Cursor workflows, Gemini/OpenAI/Llama configuration, and productivity frameworks.',
    primaryTags: ['AI security', 'HexStrike', 'MCP'],
    depth: 'Full guide',
    articles: [
      'The AI Revolution in Cybersecurity',
      'HexStrike-AI: A Force Multiplier for Red Teams',
      'HexStrike AI: Install, Configure, and Run MCP with Gemini, OpenAI, Cursor, Llama',
      'HexStrike on Kali Linux 2025.4',
      'HexStrike + Gemini vs. HackerAI',
      'The 20x Employee',
    ],
  },
  {
    title: 'AI-Driven Pentesting & Exploitation',
    anchor: 'bd1c',
    description:
      'Hands-on AI-assisted pentesting workflows for network discovery, web apps, wireless, SMB/SSH, password recovery, cloud scanning, and lab exploitation.',
    primaryTags: ['Pentest', 'AI workflow', 'Labs'],
    depth: 'Full guide',
    articles: [
      'AI-Driven Pentesting at Home',
      'AI-Driven Web Application Pentesting with HexStrike-AI',
      'AI-Driven Wireless Penetration Testing',
      'HexStrike + Cursor full subnet compromise',
      'AI-Assisted Web and Cloud Penetration Testing',
      'StratusAI',
    ],
  },
  {
    title: 'Burp Suite, Web Scanners & LLM/MCP',
    anchor: '5f91',
    description:
      'Burp Suite, scanner interpretation, MCP integrations, payload planning, and classic web scanner guides.',
    primaryTags: ['Web security', 'Burp', 'MCP'],
    depth: 'Article',
    articles: [
      'Getting More from Burp Suite with LLMs',
      'Burp Suite MCP + Gemini CLI',
      'Mastering Burp Suite Vulnerability Scanner',
      'Cracking Web Interfaces with Burp Suite',
    ],
  },
  {
    title: 'Reconnaissance & OSINT',
    anchor: '3d70',
    description:
      'Target discovery, Shodan, Censys, theHarvester, Sublist3r, Amass, SpiderFoot, WhatWeb, and LLM-assisted recon planning.',
    primaryTags: ['Recon', 'OSINT', 'Attack surface'],
    depth: 'Article',
    articles: ['Nmap Meets ChatGPT', 'Shodan', 'theHarvester', 'Sublist3r', 'OWASP Amass', 'SpiderFoot', 'Censys', 'WhatWeb'],
  },
  {
    title: 'Nmap & Network Scanning',
    anchor: 'a40c',
    description:
      'Nmap fundamentals, service detection, version probing, scripts, scan strategy, and network assessment syntax.',
    primaryTags: ['Nmap', 'Network scanning'],
    depth: 'Full guide',
    articles: ['Mastering Nmap Part 1', 'Mastering Nmap Part 2', 'Mastering Nmap Part 3', 'Mastering Nmap Part 4: Scripts'],
  },
  {
    title: 'Web Application Security (Non-AI)',
    anchor: '771b',
    description:
      'Traditional web testing with OWASP ZAP, SQLMap, DirBuster, Nikto, and staged reconnaissance-to-scanning methodology.',
    primaryTags: ['Web security', 'OWASP', 'SQL injection'],
    depth: 'Full guide',
    articles: ['OWASP ZAP', 'SQLMap Part 1', 'SQLMap Part 2', 'DirBuster', 'Nikto', 'Web App PT Stage 1', 'Web App PT Stage 2'],
  },
  {
    title: 'Metasploit & Exploitation',
    anchor: '5d95',
    description:
      'Metasploit foundations, auxiliary modules, exploit modules, and practical SSH/FTP/Telnet exploitation workflows.',
    primaryTags: ['Metasploit', 'Exploitation'],
    depth: 'Full guide',
    articles: ['Metasploit Part 1', 'Auxiliary modules', 'Exploit modules', 'SSH exploitation', 'FTP exploitation', 'Telnet cracking'],
  },
  {
    title: 'Password & Credential Cracking',
    anchor: 'e4de',
    description:
      'John the Ripper, Hashcat, Hydra, WiFi cracking, PDF/Office/ZIP recovery, RDP, RTSP, and custom wordlist generation.',
    primaryTags: ['Passwords', 'Credentials', 'Cracking'],
    depth: 'Full guide',
    articles: ['John the Ripper', 'Hashcat', 'Hydra', 'Aircrack-ng', 'PDF cracking', 'Office document cracking', 'RTSP brute force', 'Personal Pass Generator'],
  },
  {
    title: 'Active Directory & Red Team',
    anchor: '0e7b',
    description:
      'AD penetration testing, ADCS ESC8, certificate abuse, lab deployment, and MITRE ATT&CK tool mapping for red teams.',
    primaryTags: ['Active Directory', 'Red team', 'ADCS'],
    depth: 'Full guide',
    articles: ['Active Directory Penetration Testing', 'ADCS ESC8', 'AD lab in Cursor AI', 'Tools by MITRE ATT&CK'],
  },
  {
    title: 'Cloud & Kubernetes Security',
    anchor: '5693',
    description:
      'GCP pentesting, vulnerable cloud labs, Kubernetes lab design, black-box K8s playbooks, and cloud-native detection.',
    primaryTags: ['Cloud', 'Kubernetes', 'GCP'],
    depth: 'Full guide',
    articles: ['GCP Pentesting', 'Vulnerable GCP lab', 'Vulnerable cloud lab', 'Vulnerable Kubernetes lab', 'Black-box Kubernetes PT', 'Cloud-native security'],
  },
  {
    title: 'Labs & Training Environments',
    anchor: '4b5d',
    description:
      'Vulnerable Ubuntu and Windows labs, IIS/SharePoint lab, DVWA automation, DragonRx, vulnerable AI lab, and one-prompt training environments.',
    primaryTags: ['Labs', 'Training', 'Terraform'],
    depth: 'Full guide',
    articles: ['Vulnerable Ubuntu lab', 'Vulnerable Windows lab', 'IIS SharePoint lab', 'DVWA with Ansible', 'Vulnerable AI Lab', 'Operation DragonRx'],
  },
  {
    title: 'Malware Analysis & Forensics',
    anchor: '3936',
    description:
      'Static malware analysis, file metadata, strings, obfuscation, automated triage tools, Android APK analysis, and AI-assisted forensics.',
    primaryTags: ['Malware', 'Forensics', 'Static analysis'],
    depth: 'Full guide',
    articles: ['Android APK Analysis Tool', 'AIDebug', 'Static Malware Analysis', 'File Fingerprinting', 'Strings Analysis', 'Obfuscation', 'Digital Forensics with AI'],
  },
  {
    title: 'Threat Hunting & Detection',
    anchor: 'b40e',
    description:
      'Endpoint hunting, protocol-level hunting, Pyramid of Pain, single-event and correlation detection rules, and CI/CD defense.',
    primaryTags: ['Threat hunting', 'Detection', 'SOC'],
    depth: 'Full guide',
    articles: ['Endpoint Threat Hunting', 'Wireshark threat hunting', 'Pyramid of Pain', 'Single-event detection', 'Correlation detection', 'CI/CD defense'],
  },
  {
    title: 'Tool Development & Cursor AI',
    anchor: '8d93',
    description:
      'Building security tools and payload workflows with Cursor AI, including Android Rubber Ducky payloads and Arduino Leonardo hardware builds.',
    primaryTags: ['Tooling', 'Cursor AI', 'Payloads'],
    depth: 'Article',
    articles: ['Android Rubber Ducky payloads in Cursor AI', 'USB Rubber Ducky with Arduino Leonardo'],
  },
  {
    title: 'SOC, Awareness & Best Practices',
    anchor: 'c203',
    description:
      'SOC Tier 1 onboarding, awareness, phishing protection, OWASP Top 10 secure coding, server hardening, and baseline PT toolkits.',
    primaryTags: ['SOC', 'Awareness', 'Secure coding'],
    depth: 'Article',
    articles: ['SOC Tier 1 onboarding', 'Information Security Awareness', 'Phishing awareness', 'OWASP Top 10', 'Server hardening', 'Basic PT toolkit'],
  },
  {
    title: 'Logging, DevOps & XPLG',
    anchor: 'f0cd',
    description:
      'Fluent Bit, AWS EKS log shipping, Kubernetes DaemonSets, EKS control-plane logs, XPLG integration, and Linux reporting tools.',
    primaryTags: ['Logging', 'DevOps', 'XPLG'],
    depth: 'Article',
    articles: ['Fluent Bit Windows service', 'Fluent Bit on AWS EKS', 'Fluent Bit Kubernetes DaemonSet', 'EKS logs to XPLG', 'syscheck_beauty'],
  },
  {
    title: 'Reader Input & Meta',
    anchor: 'f11a',
    description:
      'Feedback, future topic requests, and meta-navigation material for the blog.',
    primaryTags: ['Meta', 'Feedback'],
    depth: 'Short guide',
    articles: ['What Do You Want to Read?'],
  },
];

const directLinks = [
  ...latestArticles,
  ...featuredArticles,
  {
    title: 'The AI Revolution in Cybersecurity: A Comprehensive Journey Through Modern AI-Driven Security Operations',
    url: 'https://medium.com/@1200km/the-ai-revolution-in-cybersecurity-31e44704d51a',
    depth: 'Full-long guide',
    topics: ['AI security'],
  },
  {
    title: 'HexStrike-AI: A Force Multiplier for Red Teams - and a Dangerous Shift in the Threat Landscape',
    url: 'https://medium.com/@1200km/hexstrike-ai-a-force-multiplier-for-red-teams-and-a-dangerous-shift-in-the-threat-landscape-3e1d4e86f3ae',
    depth: 'Full guide',
    topics: ['HexStrike', 'Red team'],
  },
  {
    title: 'AI-Driven Pentesting at Home: Using HexStrike-AI for Full Network Discovery and Exploitation',
    url: 'https://medium.com/@1200km/ai-driven-pentesting-at-home-using-hexstrike-ai-for-full-network-discovery-and-exploitation-00a9e88b3bde',
    depth: 'Full guide',
    topics: ['Pentesting', 'HexStrike'],
  },
  {
    title: 'AI-Driven Web Application Pentesting with HexStrike-AI',
    url: 'https://medium.com/@1200km/ai-driven-web-application-pentesting-with-hexstrike-ai-67f3dae32040',
    depth: 'Full guide',
    topics: ['Web security', 'HexStrike'],
  },
  {
    title: 'Mastering John the Ripper: A Complete Guide to Password Cracking',
    url: 'https://medium.com/@1200km/mastering-john-the-ripper-a-complete-guide-to-password-cracking-e42d68239c71',
    depth: 'Full guide',
    topics: ['Passwords'],
  },
  {
    title: 'Breaking the Code: How to Use Hashcat for Effective Password Cracking',
    url: 'https://medium.com/@1200km/breaking-the-code-how-to-use-hashcat-for-effective-password-cracking-15f8da8facb8',
    depth: 'Full guide',
    topics: ['Passwords'],
  },
  {
    title: 'Mastering Hydra: The Ultimate Guide to Network Logon Cracking',
    url: 'https://medium.com/@1200km/mastering-hydra-the-ultimate-guide-to-network-logon-cracking-182579dbaed1',
    depth: 'Full guide',
    topics: ['Credentials'],
  },
];

function ArticleCard({article, compact = false}) {
  return (
    <article className={clsx('article-card', compact && 'article-card--compact')}>
      <div className="article-card__topline">
        <span className={clsx('depth-badge', `depth-badge--${depthRank[article.depth] || 2}`)}>
          {article.depth}
        </span>
        {article.date && <span className="article-date">{article.date}</span>}
      </div>
      <h3>
        <a href={article.url}>{article.title}</a>
      </h3>
      {article.summary && <p>{article.summary}</p>}
      {article.minutes && <p className="article-meta">{article.minutes}</p>}
      {article.topics && (
        <div className="tag-row">
          {article.topics.map((topic) => (
            <span key={topic}>{topic}</span>
          ))}
        </div>
      )}
    </article>
  );
}

function TopicGroup({group}) {
  const sectionUrl = `${masterIndexUrl}#${group.anchor}`;
  return (
    <article className="topic-card">
      <div className="topic-card__header">
        <h3>{group.title}</h3>
        <span className="depth-badge depth-badge--3">{group.depth}</span>
      </div>
      <p>{group.description}</p>
      <div className="tag-row">
        {group.primaryTags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <ul>
        {group.articles.map((article) => (
          <li key={article}>{article}</li>
        ))}
      </ul>
      <a className="topic-link" href={sectionUrl}>
        Open this section in the Medium master index
      </a>
    </article>
  );
}

export default function Home() {
  const [depth, setDepth] = useState('All');
  const allCards = useMemo(() => [...latestArticles, ...featuredArticles], []);
  const filtered = depth === 'All' ? allCards : allCards.filter((article) => article.depth === depth);

  return (
    <Layout
      title="Medium Blog Navigator"
      description="Structured navigation for Andrey Pautov's Medium cybersecurity articles"
    >
      <header className="hero hero--blog">
        <div className="container">
          <p className="eyebrow">Medium blog navigation</p>
          <h1>One map for the cybersecurity blog.</h1>
          <p className="hero-subtitle">
            A Docusaurus navigation layer for Andrey Pautov's Medium articles:
            newest posts, deep CTI guides, AI-assisted security workflows, red-team labs,
            malware analysis, cloud security, and role-based reading paths.
          </p>
          <div className="hero-actions">
            <a className="button button--primary button--lg" href={profileUrl}>
              Open Medium profile
            </a>
            <a className="button button--secondary button--lg" href={masterIndexUrl}>
              Open original master index
            </a>
            <Link className="button button--outline button--lg" to="/docs/reading-paths">
              Reading paths
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="section">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Latest from RSS</p>
                <h2>Newest articles, sorted by publish date</h2>
              </div>
              <p>
                RSS snapshot analyzed on 2026-05-21. Labels are based on available
                body length and article role.
              </p>
            </div>
            <div className="article-grid">
              {latestArticles.map((article) => (
                <ArticleCard key={article.url} article={article} />
              ))}
            </div>
          </div>
        </section>

        <section className="section section--muted">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Depth labels</p>
                <h2>Filter high-signal articles by format</h2>
              </div>
              <div className="filter-row" role="group" aria-label="Filter by article depth">
                {['All', 'Short guide', 'Article', 'Full guide', 'Full-long guide'].map((option) => (
                  <button
                    key={option}
                    className={clsx('filter-button', depth === option && 'filter-button--active')}
                    type="button"
                    onClick={() => setDepth(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div className="article-grid article-grid--two">
              {filtered.map((article) => (
                <ArticleCard key={`${article.url}-${article.title}`} article={article} compact />
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Complete topic navigation</p>
                <h2>18 Medium blog groups</h2>
              </div>
              <p>
                These groups mirror the Medium master index and give direct section
                links for the full 100+ article map.
              </p>
            </div>
            <div className="topic-grid">
              {topicGroups.map((group) => (
                <TopicGroup key={group.title} group={group} />
              ))}
            </div>
          </div>
        </section>

        <section className="section section--muted">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Direct links</p>
                <h2>High-confidence article URLs</h2>
              </div>
              <p>
                Direct article links verified from RSS, Medium search results, and
                the existing Medium master index.
              </p>
            </div>
            <div className="direct-link-list">
              {directLinks.map((article) => (
                <a key={`${article.title}-${article.url}`} href={article.url}>
                  <span>{article.title}</span>
                  <small>{article.depth}</small>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
