# Credential-based attacks — source register and evidence notes

Sections 6.1–6.4. Prepared 21 September 2026.

These four graphics are conceptual detection-engineering references. They are not incident reconstructions, executable detection rules, measured coverage claims, or production accuracy results. The diagrams and explanatory layouts are newly composed for this set. Section numbering follows the 1200km.com article below.

## Source register

**[A] Andrey Pautov, 1200km.com — Malicious Activity as a Statistical Signal: Anomaly Detection Engineering, Sections 6.1–6.4.**
https://1200km.com/articles/read/2026/2026-04-20-malicious-activity-as-a-statistical-signal-a-detection-engineering-analysis-of-anomaly-bas-90df8b6dea12/

**[K1] Microsoft — Event 4769: A Kerberos service ticket was requested.**
https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4769

**[K2] MITRE ATT&CK — T1558.003, Kerberoasting.**
https://attack.mitre.org/techniques/T1558/003/

**[D1] Microsoft — Event 4662: An operation was performed on an object.**
https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4662

**[D2] MITRE ATT&CK — T1003.006, DCSync.**
https://attack.mitre.org/techniques/T1003/006/

**[D3] Microsoft — DS-Replication-Get-Changes extended right.**
https://learn.microsoft.com/en-us/windows/win32/adschema/r-ds-replication-get-changes

**[D4] Microsoft — DS-Replication-Get-Changes-All extended right.**
https://learn.microsoft.com/en-us/windows/win32/adschema/r-ds-replication-get-changes-all

**[D5] Microsoft — DS-Replication-Get-Changes-In-Filtered-Set extended right.**
https://learn.microsoft.com/en-us/windows/win32/adschema/r-ds-replication-get-changes-in-filtered-set

**[W1] Microsoft — Event 4624: An account was successfully logged on.**
https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4624

**[W2] Microsoft — LSA Logon Sessions.**
https://learn.microsoft.com/en-us/windows/win32/secauthn/lsa-logon-sessions

**[H1] MITRE ATT&CK — T1550.002, Pass the Hash.**
https://attack.mitre.org/techniques/T1550/002/

**[H2] Microsoft — Microsoft NTLM.**
https://learn.microsoft.com/en-us/windows/win32/secauthn/microsoft-ntlm

**[S1] Microsoft Sysinternals — Sysmon, Event ID 10: ProcessAccess.**
https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon#event-id-10-processaccess

**[P1] Microsoft — Process Security and Access Rights.**
https://learn.microsoft.com/en-us/windows/win32/procthread/process-security-and-access-rights

**[L1] MITRE ATT&CK — T1003.001, LSASS Memory.**
https://attack.mitre.org/techniques/T1003/001/

## Evidence notes by infographic

### 6.1 — Kerberoasting

The diagram follows an analyst's workflow, not a mandatory attack sequence. Event 4769 describes service-ticket requests at a domain controller [K1]. Breadth and novelty are candidate features; this set supplies no calibrated thresholds. Encryption constants refer to the ticket encryption type, not the separate supported-encryption-types bitmask. RC4-HMAC is 0x17; AES128 and AES256 are 0x11 and 0x12 [K1]. RC4 and AES should not be described as the same NTLM-hash key mechanism. Ticket requests cannot establish offline password-recovery success [A, K2].

### 6.2 — DCSync

The arrows show enrichment of a directory-access observation with a suitable logon record, not event chronology. Match the same DC and normalized SubjectLogonId/TargetLogonId, and check identity consistency, temporal bounds and identifier reuse. Preserve unresolved or conflicting source attribution; an address is not always available [A, D1, W1]. SACL selection concerns auditing, not a permission grant [D1]. The listed GUIDs are the documented extended rights [D3–D5]; the table is not a Boolean assertion that all must appear in one event. Inventory-backed approval is contextual evidence, not proof of an uncompromised source [A].

### 6.3 — Pass-the-Hash

The two cards are distinct hunting views, not two required stages or a complete implementation inventory [A]. Type 9 describes NewCredentials and has outbound-account fields; type 3 describes a network logon [W1]. Local logon identifiers are not global join keys [W2]. NTLM uses a challenge–response calculation, not transmission of the stored password hash as a password [H2]. The identity and process correlation guidance is an investigative design recommendation, not a tested classifier. Missing observations require a collection and retention explanation before they support an absence claim [A].

### 6.4 — LSASS Credential Dumping

Sysmon Event 10 records process access, not each memory-read operation or extraction of credentials [S1]. PROCESS_VM_READ is 0x0010; PROCESS_QUERY_INFORMATION is 0x0400; PROCESS_QUERY_LIMITED_INFORMATION is 0x1000 [P1]. The displayed decompositions were checked with integer bitwise OR; see bitmask_checks.json. A right being present does not establish that it was exercised. Other access paths exist, so these masks are not exhaustive detection coverage. Signer/hash and process-creation context may require separate telemetry enrichment rather than fields native to every Event 10 record [S1, A].

## Scope of checks performed for this set

All four exported PNGs were opened and checked at 2400 × 3000 pixels. Text fitting was checked programmatically and the rendered layouts were visually inspected. The source references were read, and the two displayed access-mask decompositions were recalculated. No Kusto query engine, production sensor, attack execution, or operational detector was tested as part of creating these graphics.
