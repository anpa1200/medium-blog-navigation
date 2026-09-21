## 6. Credential-Based Attacks: Detection Engineering Deep Dive

### 6.1 Kerberoasting

Kerberoasting obtains service-ticket material for offline password recovery. The service key depends on the encryption type: RC4-HMAC and AES must not be explained as the same NTLM-hash encryption mechanism. Ordinary users requesting service tickets is normal authentication behavior. [MITRE T1558.003](https://attack.mitre.org/techniques/T1558/003/).

Event 4769 can support investigation when the relevant DC auditing is enabled. Preserve requester identity, source address, target service, encryption type, result and event version. A rule limited to RC4 (`0x17`) cannot claim AES (`0x11`/`0x12`) coverage. Broader request breadth and novelty can be considered across encryption types; a low-volume targeted request may evade either approach.

Do not exclude every machine account or service merely because its name ends in `$`. Such filtering is an explicit scope reduction with blind spots, not a proof of legitimacy. Section 8 excludes `krbtgt` from its service-breadth example, keeps computer principals visible, and reports encryption types rather than treating RC4 as a verdict. The distinct-service count is only as meaningful as the service identifier emitted by the source.

### 6.2 DCSync

Replication abuse uses directory replication permissions to retrieve credential material. A tool name alone does not establish this mode. For event 4662, configure Directory Service Access auditing and an applicable SACL on the domain object. The SACL controls auditing; the DACL and effective directory permissions determine access. [Microsoft 4662 reference](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4662).

Relevant extended-right GUIDs include Get-Changes (`1131f6aa-9c07-11d1-f79f-00c04fc2dcd2`), Get-Changes-All (`1131f6ad-9c07-11d1-f79f-00c04fc2dcd2`) and Get-Changes-In-Filtered-Set (`89e95b76-444d-4c62-991a-0facbeda640c`). Interpret these with the control-access bit (`0x100`), object type and complete session evidence. They need not all appear in one event, and one matching right does not prove successful credential extraction.

Event 4662 has no native client-IP field. Correlate to a suitable logon record using the same DC, normalized logon identifier and bounded event time. Preserve unresolved or ambiguous correlations rather than dropping the candidate or inventing an address. Validate parser aliases and logon-ID reuse.

Approved replication should be an inventory-backed, time-bounded principal/source relationship. Entra Connect, backup and identity systems need verified exceptions—not blanket `MSOL_*`, `AADConnect*` or computer-account exclusions. Compromise of an approved source remains a blind spot. The provided rule reports candidates; it does not silently discard approved-looking accounts.

### 6.3 Pass-the-Hash

Pass-the-Hash uses captured credential material to perform authentication without the cleartext password. It does not transmit the NTLM hash directly as a password; distinguish the hash from the challenge-response exchange. [MITRE T1550.002](https://attack.mitre.org/techniques/T1550/002/).

Target-side NTLM network logons (4624, type 3) are common and do not by themselves identify PtH. A null subject SID or zero key length is not proof that there was no earlier interactive session on the source. Source-side type 9 (`NewCredentials`) with `seclogo` is a useful additional hunting view for some implementations, but can also occur with legitimate alternate-credential workflows. Other PtH implementations need not produce that pattern. [Microsoft 4624 fields](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4624).

Correlate identity, source process, destination, authentication and authorized administration. Absence of a prior event is meaningful only with adequate collection, retention and clock alignment. Section 8 intentionally returns two different evidence classes, not a binary PtH classification.

### 6.4 LSASS Credential Dumping (Sysmon Event 10)

LSASS process access can support credential-access investigations, but legitimate security and diagnostic software also accesses it. `GrantedAccess` is a bitmask: `0x1010` combines VM read and limited query information; `0x1410` additionally includes query information. These masks do not certify malicious intent. [Microsoft process-access rights](https://learn.microsoft.com/en-us/windows/win32/procthread/process-security-and-access-rights).

Use the source/target process identifiers, actual access rights, signer/hash, ancestry, call trace and available memory evidence. An unresolved call trace is not proof of injection. A familiar filename, signature or trusted directory is not a safe universal exclusion. Exceptions require provenance, scope, owner, expiry and periodic review; they can otherwise conceal abuse of a trusted process.
