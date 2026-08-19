"""Shared taxonomy rules for the local 1200km article archive."""

from __future__ import annotations

import re


TAXONOMY_RULES: tuple[tuple[str, tuple[str, ...]], ...] = (
    ("Course Review", ("course review", "completed the course", "course exceeded my expectations")),
    ("CTI", (
        "cti", "threat intelligence", "cyber intelligence", "adversarygraph", "apt", "muddywater",
        "sandworm", "handala", "threat actor", "ioc", "attribution", "kill chain", "pyramid of pain",
        "dragonrx", "desert hydra", "threat landscape",
    )),
    ("AI Security", (
        "artificial intelligence", "ai", "llm", "cursor", "gemini", "hexstrike", "hackerai", "mcp",
        "codex", "deepseek", "agentic", "one-prompt", "ai-powered", "ai-assisted", "generative ai",
    )),
    ("Malware Analysis", (
        "malware", "apk", "reverse engineering", "static analysis", "static malware", "unpacker", "unpacking",
        "agenttesla", "dearsteeler", "shlayer", "keylogger", "trojan",
    )),
    ("Cloud & Kubernetes", (
        "kubernetes", "eks", "cloud", "aws", "gcp", "terraform", "docker", "container", "cluster",
    )),
    ("Mobile Security", ("android", "apk", "mobile")),
    ("Web Application Security", (
        "web application", "web applications", "burp", "dvwa", "owasp zap", "nikto", "dirbuster", "sqlmap",
        "sql injection", "sharepoint", "iis", "whatweb",
    )),
    ("Detection Engineering", (
        "detection", "telemetry", "siem", "soc", "threat hunting", "hunting", "logging", "fluent bit",
        "correlation", "atomic standard", "alerting",
    )),
    ("Offensive Security", (
        "penetration", "pentest", "metasploit", "adcs", "active directory", "exploit", "red team", "hacking",
        "vulnerable", "attack guide", "rubber ducky", "aircrack", "ssh", "ftp", "telnet", "rtsp", "rdp", "smb",
    )),
    ("Password Security", (
        "password", "cracking", "hashcat", "john the ripper", "hydra", "crowbar", "brute-force", "credential",
        "pass generator", "ppg", "2john",
    )),
    ("OSINT & Reconnaissance", (
        "osint", "reconnaissance", "shodan", "censys", "spiderfoot", "theharvester", "sublist3r", "amass",
        "exposure map", "attack surface", "network exploration",
    )),
    ("Network Security", (
        "network", "wifi", "wireless", "nmap", "ssh", "ftp", "telnet", "rtsp", "rdp", "smb", "5g", "4g", "lte",
    )),
    ("Vulnerability Management", (
        "vulnerability", "vulnerabilities", "cvss", "cve", "security assessment", "hardening", "secure boot",
        "security flaws",
    )),
    ("Digital Forensics", ("forensics", "dfir", "investigation", "evidence", "incident response")),
    ("Security Awareness", ("phishing", "awareness", "employees")),
    ("Secure Coding", ("secure coding", "bugs to breaches", "owasp top 10")),
    ("Hardware Security", ("embedded", "hardware", "firmware", "arduino", "rubber ducky", "cellular")),
    ("Windows Security", ("windows", "active directory", "adcs", "iis", "rdp")),
    ("Linux Security", ("linux", "ubuntu", "kali")),
    ("Security Labs & Training", (
        "lab", "training", "walkthrough", "playground", "virtual machine", "environment", "reproducible",
    )),
    ("Security Tooling", ("tool", "framework", "scanner", "debugger", "analyzer", "platform", "opencti")),
    ("Governance & Risk", ("ciso", "executive", "strategy", "iso 27001", "risk", "resilience")),
    ("Platform & Publishing", ("pending status", "navigate my blog", "blog", "publishing", "projects, guides")),
)


def _haystack(title: str, summary: str = "") -> str:
    return re.sub(r"\s+", " ", f"{title} {summary}".lower()).strip()


def _matches(hay: str, pattern: str) -> bool:
    # Short tokens such as ``ai`` and ``apt`` must not match inside words like
    # "training", "applications", or "painting".
    if pattern in {"ai", "apt", "cti", "ioc"}:
        return bool(re.search(rf"\b{re.escape(pattern)}\b", hay))
    return pattern in hay


def tags_for(title: str, summary: str = "") -> list[str]:
    """Return stable, human-readable tags; a row may match many rules."""
    hay = _haystack(title, summary)
    tags = [label for label, patterns in TAXONOMY_RULES if any(_matches(hay, pattern) for pattern in patterns)]
    if not tags:
        tags = ["Security fundamentals"]
    return tags


def category_for_taxonomy(title: str, summary: str = "") -> str:
    """Choose the most useful primary facet while retaining all tags."""
    tags = tags_for(title, summary)
    if "Platform & Publishing" in tags:
        return "Platform & Publishing"
    # CTI is the evidence-led parent discipline for articles that also discuss AI,
    # detection, or offensive workflows.
    if "CTI" in tags:
        return "CTI"
    for preferred in (
        "AI Security", "Malware Analysis", "Course Review", "Cloud & Kubernetes", "Mobile Security",
        "Web Application Security", "Detection Engineering", "Offensive Security",
        "Password Security", "OSINT & Reconnaissance", "Network Security",
        "Vulnerability Management", "Digital Forensics", "Security Awareness",
        "Secure Coding", "Hardware Security", "Windows Security", "Linux Security",
        "Security Labs & Training", "Security Tooling", "Governance & Risk",
    ):
        if preferred in tags:
            return preferred
    return tags[0]
