// User-supplied incident artwork, visually reviewed without altering original pixels.
// SOURCES.md is provenance material, not instructions or independent verification.
const source=(label,url)=>({label,url});
export const incidentSourceKey=source('Supplied source key: S01–S14','https://1200km.com/articles/research/anomaly-visuals/uploaded-incident-sources.md');
export const incidentSourceNotes={file:'uploaded-incident-sources.md',original:'SOURCES.md'};
export const incidentUploads=[
  {
    id:'case-sunburst',original:'4_1_sunburst_unc2452.png',file:'uploaded-case-sunburst.png',sourceCodes:['S01'],
    title:'SUNBURST: encoded DNS is evidence, not a verdict',
    caption:'Source-reported SUNBURST behavior, with a separate proposed detection hypothesis. The arrows summarize a mechanism, not a replay of one victim’s timeline. No measured entropy cutoff or validation of the author’s proposed detector is implied.',
    transcript:[
      'Reported activity: a trojanized SolarWinds component activated after a delay and communicated encoded information through DNS names. The solid panel describes public reporting, not newly collected telemetry.',
      'Proposed hypothesis: investigate the combination of DNS-label structure, destination novelty and originating-process context. These features require locally defined baselines and collection coverage.',
      'Technical boundary: missing image-load records do not rule out manual loading. An executable name, a long label or an entropy value alone does not identify SUNBURST.',
      'Interpretation: combine evidence and test benign alternatives. The dashed hypothesis panel is an analytical proposal, not a measured detector result.'
    ],
    sources:[source('S01 · Mandiant: SUNBURST technical details','https://cloud.google.com/blog/topics/threat-intelligence/sunburst-additional-technical-details/')]
  },
  {
    id:'case-exchange',original:'4_2_hafnium_exchange_proxylogon.png',file:'uploaded-case-exchange.png',sourceCodes:['S02'],
    title:'Exchange: distinguish HAFNIUM from broader exploitation',
    caption:'The initial Microsoft report attributes Exchange exploitation and webshells to HAFNIUM; the separately linked post-exploitation report covers multiple actors. Do not assign every later observation to HAFNIUM. The detection panel is a proposal, not a reproduced intrusion.',
    transcript:[
      'Reported activity: exploitation of on-premises Exchange servers enabled webshell deployment and subsequent access. Original HAFNIUM reporting and broader Exchange exploitation are distinct evidence scopes.',
      'Proposed hypothesis: correlate unusual HTTP activity, ASPX file writes and a web-worker process spawning a shell or a later descendant, using the server role and application context.',
      'Technical boundary: ordinary IIS access logs do not capture arbitrary request bodies. Security 4688, Sysmon process-creation events and EDR records have different schemas and collection requirements.',
      'Interpretation: verify process ancestry and legitimate administration. The same process names or HTTP status do not establish an intrusion or actor attribution.'
    ],
    sources:[source('S02 · Microsoft: initial HAFNIUM investigation','https://www.microsoft.com/en-us/security/blog/2021/03/02/hafnium-targeting-exchange-servers/'),source('Supplement · Microsoft: broader Exchange post-exploitation','https://www.microsoft.com/en-us/security/blog/2021/03/25/analyzing-attacks-taking-advantage-of-the-exchange-server-vulnerabilities/')]
  },
  {
    id:'case-conti',original:'4_3_conti_bazarcall.png',file:'uploaded-case-conti.png',sourceCodes:['S03'],
    title:'BazarCall to Conti: one documented investigation',
    caption:'The illustrated BazarCall, Trickbot, Cobalt Strike and Conti activity belongs to the selected investigation, not a universal affiliate playbook. Defender 5001 reports disabled real-time protection; 5007 reports configuration changes. Neither event alone proves malicious intent.',
    transcript:[
      'Reported activity: The DFIR Report documented a BazarCall intrusion involving Trickbot, Cobalt Strike and eventual Conti ransomware activity. This is one investigation, not an aggregate sequence observed in every Conti case.',
      'Proposed hypothesis: join enumeration, remote administration, share access, security changes and subsequent activity using the relevant host and account, with bounded event time.',
      'Technical boundary: Defender event 5001 concerns real-time protection being disabled; event 5007 concerns configuration changes. The provider, event fields and before/after state matter.',
      'Interpretation: approved administrative tools, maintenance and backup changes can resemble parts of the pattern. The hypothesis has not been replayed against the private victim environment.'
    ],
    sources:[source('S03 · The DFIR Report: BazarCall to Conti','https://thedfirreport.com/2021/08/01/bazarcall-to-conti-ransomware-via-trickbot-and-cobalt-strike/'),source('Supplement · Microsoft: Defender event meanings','https://learn.microsoft.com/en-us/defender-endpoint/troubleshoot-microsoft-defender-antivirus')]
  },
  {
    id:'case-oilrig',original:'4_4_oilrig_rdat_dns.png',file:'uploaded-case-oilrig.png',sourceCodes:['S04'],
    title:'OilRig-associated RDAT: identify the actual channel',
    caption:'Read the HTTP, DNS and email/EWS branches as available mechanisms, not mandatory successive stages or mutually exclusive variants: Unit 42 reports that the same EWS sample also supported HTTP and DNS tunneling. The channel must be established for the actual sample and activity.',
    transcript:[
      'Reported activity: Unit 42 investigated OilRig-associated RDAT at a telecommunications organization. The graphic separates HTTP, DNS and email/EWS communication, including a BMP steganography mechanism.',
      'Clarification to the graphic’s different-variants shorthand: these are not mutually exclusive capabilities. Unit 42 explicitly reports HTTP and DNS support in the same EWS-capable sample. Available capabilities do not prove every channel was used in one intrusion.',
      'Proposed hypothesis: inspect the relevant protocol structure, timing, destinations and endpoint evidence for that sample. A DNS-only analytic does not cover an email channel.',
      'Technical boundary: a TXT-to-A query ratio is not a verdict, and DNSpionage is not interchangeable with this RDAT attribution. The hypothesis panel does not establish a measured threshold.'
    ],
    sources:[source('S04 · Unit 42: RDAT channels and steganography','https://unit42.paloaltonetworks.com/oilrig-novel-c2-channel-steganography/')]
  },
  {
    id:'case-moveit',original:'4_5_moveit_cl0p_lemurloot.png',file:'uploaded-case-moveit.png',sourceCodes:['S05'],
    title:'MOVEit: follow application and database evidence',
    caption:'LEMURLOOT’s Health Check Service account is a MOVEit application account, not a Windows local account. Windows Security 4720 does not represent this SQL-backed operation. Access to Azure settings in the application database is not evidence of a particular configuration-file read.',
    transcript:[
      'Reported activity: Mandiant described exploitation of MOVEit Transfer and the LEMURLOOT webshell, database interactions, an application account and data theft.',
      'Proposed hypothesis: correlate webshell access, application-account or session changes, database activity and exports. Establish the entity joins rather than assuming one HTTP request explains every later event.',
      'Technical boundary: Health Check Service is the application-account name in this account of the intrusion. A familiar-looking name is not independently malicious, and Windows account-creation event 4720 is the wrong expected source.',
      'Interpretation: use MOVEit and database records for application changes. Distinguish application settings, actual exports and destination ownership; no query performance or victim replay is claimed.'
    ],
    sources:[source('S05 · Mandiant: MOVEit and LEMURLOOT','https://cloud.google.com/blog/topics/threat-intelligence/zero-day-moveit-data-theft')]
  },
  {
    id:'case-midnight',original:'4_6_midnight_blizzard_cozy_bear.png',file:'uploaded-case-midnight.png',sourceCodes:['S06'],
    title:'Midnight Blizzard: preserve identity and permission context',
    caption:'Microsoft reported password spraying against a legacy test account without MFA, residential proxies and abuse of Exchange full_access_as_app access. This is not a generic Graph mail-scope example. Missing account history is a cold-start limitation, not evidence that activity is benign.',
    transcript:[
      'Reported activity: the investigation connects a compromised legacy test account, password spraying and residential proxy infrastructure to application-mediated mailbox access.',
      'Permission detail: the relevant Exchange permission was full_access_as_app, with EWS activity. Do not silently substitute a Microsoft Graph permission with a similar-looking purpose.',
      'Proposed hypothesis: correlate authentication failures, application consent, ownership and credential changes with subsequent mailbox actions using real tenant and account identifiers.',
      'Interpretation: sparse account history limits anomaly baselines. A new network location is not proof of the person’s physical location, and the graphic does not independently resolve vendor actor-name equivalence.'
    ],
    sources:[source('S06 · Microsoft: Midnight Blizzard responder guidance','https://www.microsoft.com/en-us/security/blog/2024/01/25/midnight-blizzard-guidance-for-responders-on-nation-state-attack/')]
  },
  {
    id:'case-unc3944',original:'4_7_scattered_spider_unc3944.png',file:'uploaded-case-unc3944.png',sourceCodes:['S07'],
    title:'UNC3944: correlate identity changes and SaaS activity',
    caption:'This graphic summarizes Mandiant’s June 2024 campaign reporting, which includes 2023 observations; it is not a single dated victim timeline. Scattered Spider and UNC3944 naming does not establish identical cluster membership. Cloud-to-cloud transfers may bypass endpoint visibility while leaving identity, application or provider records.',
    transcript:[
      'Reported activity: Mandiant described help-desk social engineering, identity abuse and SaaS data theft, including use of legitimate integration services such as Airbyte and Fivetran.',
      'Proposed hypothesis: join factor changes, authenticated sessions, new application relationships and sensitive actions with verified tenant, identity and resource keys.',
      'Technical boundary: a provider-mediated transfer need not cross a monitored workstation. This does not mean every provider, identity or application audit source is blind.',
      'Interpretation: approved recovery, migration and integration can create similar records. Vendor threat-cluster labels are not automatically exact membership equivalents, and this is not a measured detection result.'
    ],
    sources:[source('S07 · Mandiant: UNC3944 targets SaaS','https://cloud.google.com/blog/topics/threat-intelligence/unc3944-targets-saas-applications/')]
  },
  {
    id:'case-storm',original:'4_8_storm0558_oauth_campaigns.png',file:'uploaded-case-storm.png',sourceCodes:['S08','S09'],
    title:'Storm campaigns: keep token abuse and OAuth cases separate',
    caption:'Storm-0558 forged tokens using an acquired signing key; it did not forge the key. The CSRB account of Big Yellow Taxi and MailItemsAccessed is linked separately from S08/S09. Storm-1283 OAuth cryptomining is a separate campaign, not a later attack stage. No validation of the author’s proposed detector is implied.',
    transcript:[
      'Reported Storm-0558 activity: access to a signing key enabled forged tokens and mailbox access. The graphic distinguishes the attacker workflow from the customer-side detection account.',
      'Source-attributed detection account: the CSRB describes State Department discovery involving Big Yellow Taxi and MailItemsAccessed. Its PDF could not be retrieved for a fresh full-text review during this integration; this account is retained from the sourced article, not newly independently verified here.',
      'Separate report: Microsoft’s Storm-1283 OAuth-abuse account concerns a financially motivated campaign including Azure cryptomining. It is not a continuation of the Storm-0558 intrusion.',
      'Proposed hypothesis: combine workload audit events, identity context and application activity. The private customer query and its performance denominator are not published here; no benchmark or victim replay is asserted.'
    ],
    sources:[source('S08 · Microsoft: Storm-0558 email intrusion','https://www.microsoft.com/en-us/msrc/blog/2023/07/microsoft-mitigates-china-based-threat-actor-storm-0558-targeting-of-customer-email'),source('S09 · Microsoft: separate OAuth campaigns','https://www.microsoft.com/en-us/security/blog/2023/12/12/threat-actors-misuse-oauth-applications-to-automate-financially-driven-attacks/'),source('Supplement · CSRB: customer-side detection account','https://www.cisa.gov/sites/default/files/2024-03/CSRB%20Review%20of%20the%20Summer%202023%20MEO%20Intrusion%20Final_508c.pdf')]
  },
  {
    id:'case-volt',original:'4_9_volt_typhoon.png',file:'uploaded-case-volt.png',sourceCodes:['S10'],
    title:'Volt Typhoon: distinguish initiation and execution hosts',
    caption:'IFM means Install From Media: creating domain-controller installation media, not a complete recovery backup. The execution host for the illustrated ntdsutil operation is the domain controller; remote initiation can occur elsewhere. A non-DC-only filter would miss that execution context.',
    transcript:[
      'Reported activity: Microsoft described living-off-the-land operations, including ntdsutil IFM use to obtain sensitive Active Directory data on domain controllers.',
      'Proposed hypothesis: review IFM creation on the DC, the principal, approved maintenance purpose and subsequent movement of generated data. Distinguish where remote activity is initiated from where the process actually runs.',
      'Technical clarification: the graphic’s backup-capability shorthand refers to IFM installation media, not a full recovery backup. It is a legitimate administrative capability whose purpose and handling must be established.',
      'Telemetry boundary: Security event 1102 and System / Eventlog event 104 are channel-specific log-clear records, not interchangeable universal evidence of all clearing. Approved maintenance is a competing explanation.'
    ],
    sources:[source('S10 · Microsoft: Volt Typhoon investigation','https://www.microsoft.com/en-us/security/blog/2023/05/24/volt-typhoon-targets-us-critical-infrastructure-with-living-off-the-land-techniques/'),source('Supplement · Microsoft: IFM command','https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2012-r2-and-2012/cc732530(v=ws.11)')]
  },
  {
    id:'case-apt41',original:'4_10_apt41_messagetap_database.png',file:'uploaded-case-apt41.png',sourceCodes:['S11','S12'],
    title:'APT41: two investigations, not one constructed chain',
    caption:'The 2019 MESSAGETAP and 2024 SQLULDR2/PINEGROVE reports describe separate investigations, not consecutive stages. MESSAGETAP’s configuration files were read and then removed; their later absence would not disprove execution. Neither libpcap loading nor cloud-storage use alone proves theft.',
    transcript:[
      '2019 account: MESSAGETAP was an ELF data-mining tool on Linux SMS servers, using packet capture and configured selection criteria. Its configuration was consumed and then removed.',
      '2024 account: a separate investigation described SQLULDR2 exports from Oracle databases and PINEGROVE transfers to OneDrive. Do not combine these accounts into a single observed intrusion sequence.',
      'Proposed hypotheses: for the first case, inspect process provenance, capture activity and outputs; for the second, correlate database exports, staging and destination-account evidence.',
      'Interpretation: legitimate capture libraries, database export tools and cloud storage need context. APT41 and Winnti naming is not independent proof of exact group membership, and no detector benchmark is shown.'
    ],
    sources:[source('S11 · Mandiant: MESSAGETAP (2019)','https://cloud.google.com/blog/topics/threat-intelligence/messagetap-who-is-reading-your-text-messages/'),source('S12 · Mandiant: APT41 database theft (2024)','https://cloud.google.com/blog/topics/threat-intelligence/apt41-arisen-from-dust')]
  },
  {
    id:'case-impacket',original:'4_11_cisa_aa22_277a_impacket.png',file:'uploaded-case-impacket.png',sourceCodes:['S13'],
    title:'CISA AA22-277A: tool use is not attribution',
    caption:'A source-attributed summary of AA22-277A, not a named-actor attribution or exact causal timeline. The official advisory and PDF returned access errors during this integration, so its full text was not independently re-read. The proposed analytic still requires mode-specific evidence: secretsdump does not always mean DCSync.',
    transcript:[
      'Source-attributed activity: the article’s CISA AA22-277A account concerns Impacket use and data theft at a defense-industrial-base organization without assigning a named threat actor.',
      'The diagram groups reported observations for teaching; it does not prove that every observation occurred in the illustrated order or shares a single causal chain. Full advisory access was unavailable for this integration review.',
      'Proposed hypothesis: correlate remote logons, process ancestry and credential-access or export evidence for the actual execution mode and host.',
      'Technical boundary: secretsdump can operate without DCSync. Ordinary wmiexec does not imply a permanent WMI subscription, and WMI 5861 subscription evidence is not a generic wmiexec event. Ports alone do not prove DRSUAPI use.'
    ],
    sources:[source('S13 · CISA / FBI / NSA: AA22-277A','https://www.cisa.gov/news-events/cybersecurity-advisories/aa22-277a')]
  },
  {
    id:'case-3cx',original:'4_12_3cx_supply_chain.png',file:'uploaded-case-3cx.png',sourceCodes:['S14'],
    title:'3CX: a valid signature is not a benign verdict',
    caption:'SentinelOne reported behavioral detections from 22 March 2023, before its 29 March disclosure. In the Windows chain, GitHub-hosted icons carried encoded C2 information, not executable payloads. That initial report did not settle actor attribution; the article’s DPRK/Lazarus label is not independently established by this graphic.',
    transcript:[
      'Reported activity: the trojanized 3CX desktop application participated in a supply-chain attack despite signed binaries. SentinelOne reported behavioral detections before its public write-up.',
      'Windows mechanism: icon files hosted on GitHub contained appended encoded information that the malware decoded into command-and-control addresses. The icons were not themselves the later executable payloads.',
      'Proposed hypothesis: investigate changes in destinations and later execution associated with a normally trusted application, retaining signer, process and network context.',
      'Interpretation: a signature validates a signing relationship, not benign behavior. The initial vendor investigation left attribution open; its detection account is not an independently reproduced comparison of EDR products.'
    ],
    sources:[source('S14 · SentinelOne: 3CX investigation','https://www.sentinelone.com/blog/smoothoperator-ongoing-campaign-trojanizes-3cx-software-in-software-supply-chain-attack/')]
  }
].map(f=>({...f,sources:[...f.sources,incidentSourceKey]}));
