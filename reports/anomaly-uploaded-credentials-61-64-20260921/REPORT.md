# Sections 6.1–6.4: credential-attack infographic integration

Implemented and verified locally. **Not committed, pushed or deployed by this task.**

## Result

All four supplied 2400 × 3000 PNGs were visually reviewed and replace the matching generated figures in Sections 6.1–6.4. Figure numbers 46–49 and their existing IDs/anchors are unchanged. All original bytes, five supporting files and their relative package paths are retained under uploaded-credentials. The eight superseded SVG URLs remain available rather than being deleted.

The article retains 55 inline figures: **45 supplied images and 10 generated diagrams**. The previous 41 uploads, Section 6 prose, historical images, article URL, maintained queries and recorded results are preserved. The writer skill guided evidence-first captions, limitations and readable HTML text equivalents. No image generation or pixel editing was used. The supplied source notes were treated as reference data, not instructions or independent proof of validation.

| Section | Placement | Original file | Screenshots |
|---|---|---|---|
| 6.1 Kerberoasting | Figure 46; after subsection discussion | individual/6_1_kerberoasting.png | [390 px](uploaded-credential-kerberoast-390.png) · [1440 px](uploaded-credential-kerberoast-1440.png) |
| 6.2 DCSync | Figure 47; after subsection discussion | individual/6_2_dcsync.png | [390 px](uploaded-credential-dcsync-390.png) · [1440 px](uploaded-credential-dcsync-1440.png) |
| 6.3 Pass-the-Hash | Figure 48; after subsection discussion | individual/6_3_pass_the_hash.png | [390 px](uploaded-credential-pth-390.png) · [1440 px](uploaded-credential-pth-1440.png) |
| 6.4 LSASS Credential Dumping (Sysmon Event 10) | Figure 49; after subsection discussion | individual/6_4_lsass_credential_dumping.png | [390 px](uploaded-credential-lsass-390.png) · [1440 px](uploaded-credential-lsass-1440.png) |

## Technical review

These are conceptual investigation guides, not tested attack runs, calibrated detectors or newly observed incidents. Microsoft event/rights references and MITRE technique pages were consulted for the displayed claims. No live credentials were used and no attack, SIEM ingestion or Kusto-engine test was performed.

### 6.1 Kerberoasting

Event 4769 supports investigation of service-ticket requests, not proof of offline password recovery. Ticket-encryption values 0x17, 0x11 and 0x12 denote RC4-HMAC, AES128 and AES256; they are not the supported-encryption-types bitmask. An RC4-only filter misses AES requests. The existing one-record replay still returns zero matches for the service-breadth rule; no new replay was run.

Breadth and novelty need a workload baseline. Low-volume targeting can evade breadth rules, and a name ending in $ is not a blanket safe exclusion.

[K1 · Microsoft: Security 4769](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4769) · [K2 · MITRE: Kerberoasting](https://attack.mitre.org/techniques/T1558/003/) · [Existing replay results — not rerun](https://1200km.com/articles/research/anomaly-validation/functional-results.json).

### 6.2 DCSync

The arrows show enrichment, not event chronology. Correlate 4662 SubjectLogonId with a suitable preceding 4624 TargetLogonId on the same DC, with normalized identifiers, consistent identity and bounded time. Event 4662 has no native client-IP field; retain unresolved or ambiguous matches. One replication-right observation does not prove credential extraction.

A SACL selects auditing; effective permissions govern access. Verify approved principal–source relationships without treating an approved source as uncompromisable.

[D1 · Microsoft: Security 4662](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4662) · [D2 · MITRE: DCSync](https://attack.mitre.org/techniques/T1003/006/) · [D3 · Microsoft: Get-Changes](https://learn.microsoft.com/en-us/windows/win32/adschema/r-ds-replication-get-changes) · [D4 · Microsoft: Get-Changes-All](https://learn.microsoft.com/en-us/windows/win32/adschema/r-ds-replication-get-changes-all) · [D5 · Microsoft: Get-Changes-In-Filtered-Set](https://learn.microsoft.com/en-us/windows/win32/adschema/r-ds-replication-get-changes-in-filtered-set) · [W1 · Microsoft: Security 4624](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4624).

### 6.3 Pass-the-Hash

Source-side 4624 type 9 with seclogo and target-side type 3 with NTLM are distinct hunting views, not two required stages or a binary PtH classifier. Type 9 outbound-account fields can differ from the local identity. Logon IDs are host-local, not cross-host join keys; neither view alone establishes hash reuse.

NTLM uses challenge–response; the stored hash is not transmitted as a password. Validate authorization and collection before assigning intent or interpreting missing events.

[H1 · MITRE: Pass the Hash](https://attack.mitre.org/techniques/T1550/002/) · [H2 · Microsoft: NTLM](https://learn.microsoft.com/en-us/windows/win32/secauthn/microsoft-ntlm) · [W1 · Microsoft: Security 4624](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4624) · [W2 · Microsoft: local logon sessions](https://learn.microsoft.com/en-us/windows/win32/secauthn/lsa-logon-sessions).

### 6.4 LSASS Credential Dumping (Sysmon Event 10)

Sysmon Event 10 records process access, not each memory read or successful credential extraction. The displayed masks decompose exactly: 0x1010 = 0x1000 | 0x0010; 0x1410 = 0x1000 | 0x0400 | 0x0010. Arithmetic is independently checked, but granted rights do not prove they were exercised. Signer, hash and ancestry may require separate telemetry enrichment.

These masks are examples, not exhaustive coverage. An unresolved call trace or familiar signer is not a verdict; validate provenance, collection and scoped exceptions.

[S1 · Microsoft: Sysmon ProcessAccess](https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon#event-id-10-processaccess) · [P1 · Microsoft: process-access rights](https://learn.microsoft.com/en-us/windows/win32/procthread/process-security-and-access-rights) · [L1 · MITRE: LSASS Memory](https://attack.mitre.org/techniques/T1003/001/) · [Supplied bitmask examples — independently recalculated](https://1200km.com/articles/research/anomaly-visuals/uploaded-credentials/bitmask_checks.json).

### Source-specific qualifications

- Kerberoasting values refer to TicketEncryptionType, not a supported-types mask. Microsoft's 4769 page currently has inconsistent RC4 hexadecimal values in its advertised-types table; its ticket-encryption table supports 0x17. No changed RC4 constant was inferred from that discrepancy. ServiceName can identify the account or computer rather than a unique SPN. The existing one-record, zero-match replay remains a documented breadth-rule blind spot, not a new experiment.
- The three replication GUIDs were checked against Microsoft's extended-right references. DCSync arrows mean enrichment, not chronological ordering. A suitable same-DC logon match can still be unresolved or ambiguous; neither a right GUID nor a successful join proves extracted secrets.
- Pass-the-Hash cards are two investigative views. Type 9 can carry different outbound credentials from the local identity, and LSA logon identifiers are local. The seclogo pattern is implementation-dependent guidance retained from the article, not a universal signature established by this import.
- Sysmon 10 describes process access. Rights, their exercise, memory reads and recovered credentials are different claims. Signer/hash and ancestry may need separate enrichment. The masks are illustrative, not exhaustive coverage.

### Independently recomputed mask arithmetic

| Mask | Components combined with bitwise OR | Decimal result |
|---|---|---:|
| 0x1010 | 0x1000 OR 0x0010 | 4112 |
| 0x1410 | 0x1000 OR 0x0400 OR 0x0010 | 5136 |

The supplied validated flag is not accepted as proof. Tests recompute both values and reject six mutations to rights or component lists, including a duplicate component that would leave the OR result unchanged. This is arithmetic and consistency verification, not evidence of process access or credential theft.

## Verification

Overall: **PASS**. Source regression tests: **37**. Reproduce with npm run research:uploads:verify.

| Gate | Result | Duration | Evidence |
|---|---|---:|---|
| research-and-visuals | PASS | 1s | [log](research-and-visuals.log) |
| archive | PASS | 1s | [log](archive.log) |
| media | PASS | 0s | [log](media.log) |
| legacy-build | PASS; 145 byte-identical public files | 82s | [log](legacy-build.log) |
| embedded-build | PASS; 145 byte-identical public files | 70s | [log](embedded-build.log) |
| rendered-article | PASS | 0s | [log](rendered-article.log) |
| visual-browser | PASS | 99s | [log](visual-browser.log) |
| whitespace | PASS | 0s | [log](whitespace.log) |

- 110 variant slots checked: 20 active SVG variants and both slots for each of 45 unchanged raster images. A reused raster is not a separate mobile design.
- Six width/theme configurations: 390, 768 and 1440 pixels in light and dark themes. All 55 figures load with correct aspect ratios; no page overflow or JavaScript errors were reported.
- All 55 text-equivalent panels are expanded for two targeted accessibility rules concerning prose links and keyboard-focusable scrolling regions. This is not full accessibility certification. Dense bitmap labels do not reflow; HTML equivalents and full-resolution links provide alternatives.
- Section 6 prose matches its maintained source after removing figure tags. Tests cover exact subsection placement, unchanged figure numbers, source codes, all package hashes and 2400 × 3000 dimensions.
- A direct unzip -p / cmp comparison against the original ZIP passed for all nine imported members, independently of the supplied manifest and extracted-directory hashes.
- Preservation checks cover 153 original heading anchors, 192 article routes/canonicals, 44 historical images and the existing query evidence. The article catalog remains at 99 images: 55 inline plus 44 historical. All 66 retired SVG asset URLs remain available.
- [Structured verification](verification.json), [browser results](browser-validation.json), [contact sheet 6](contact-sheet-6.png) and [contact sheet 7](contact-sheet-7.png), together with the eight screenshots above, record the local rendering. No production publication is claimed.

## Provenance

The four new PNGs total **5,821,968 bytes**. All 45 supplied images total **34,636,494 bytes**. Files are unchanged, not recompressed. Inline images are lazy-loaded; no whole-site performance benchmark was run.

| Original | Dimensions | SHA-256 |
|---|---|---|
| individual/6_1_kerberoasting.png | 2400 × 3000 | ec5ce685e2b3c48375f0d80c33fa72d8f8e55263357d5abdad5398ef032eab13 |
| individual/6_2_dcsync.png | 2400 × 3000 | 7b59d8f067154f360d3e1c2502f03b3ffabd11ed37e5dee355dc539552b565d6 |
| individual/6_3_pass_the_hash.png | 2400 × 3000 | aadc9b65ab97cc7030ab61a90a0bd3efe856ba9271a9f2484942dc6351cdde7b |
| individual/6_4_lsass_credential_dumping.png | 2400 × 3000 | f04a18cbde5e9077d40eff7e3d9435473e0b302d2585c83455adbea1ef6cdafe |

### Supporting files

- [README.md](../../static/research/anomaly-visuals/uploaded-credentials/README.md): 832 bytes; SHA-256 d18db6450761d37b92c3425a5e9c23a98225bbfdcde726672c610e8f57210846.
- [SOURCES_AND_EVIDENCE_NOTES.md](../../static/research/anomaly-visuals/uploaded-credentials/SOURCES_AND_EVIDENCE_NOTES.md): 5777 bytes; SHA-256 76082b7b6bea739dca7e5749128ed4ce9b46ecbeb3071f46bcff0229d1d1aa94.
- [accessible_text.json](../../static/research/anomaly-visuals/uploaded-credentials/accessible_text.json): 5850 bytes; SHA-256 eebc4420c62eb0d27df467c577ed4037f9ae01d96672c9ef4d05f2d79b547439.
- [bitmask_checks.json](../../static/research/anomaly-visuals/uploaded-credentials/bitmask_checks.json): 374 bytes; SHA-256 64480120abcfb955784a98042aac04a6e30780088045ba5f3a44d4ce74abb3c7.
- [manifest.json](../../static/research/anomaly-visuals/uploaded-credentials/manifest.json): 1044 bytes; SHA-256 583ec0ce0f5ce34da4dae4feb8bfd64b8efa6872d44c1fbe7f5f11d8f599331d.

ZIP SHA-256: **1cd4e18499e8cc3d0d638215102db2fc70944fc6fe605f68f3eba34283ecc1c9**. The importer checks supplied image metadata and hashes before copying. Build verification recursively compares every public visual file with its built copy.

[Provenance](../../research/anomaly-visuals/uploads-provenance.json), [reviewed specifications](../../research/anomaly-visuals/uploaded-credentials.mjs) and [public visual manifest](../../static/research/anomaly-visuals/manifest.json) bind the local edition. Earlier batch reports remain untouched historical snapshots.
