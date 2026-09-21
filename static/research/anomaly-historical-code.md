# Historical query exports — superseded and unsafe to deploy

These are preserved verbatim from the pre-revision article for auditability. They contain documented syntax, schema and logic errors. Use the maintained query files and their explicit validation status instead.

## Historical block 1

```text
// HEURISTIC ANALYTIC — requires environment calibration before production deployment
// Identify RC4 TGS requests from non-machine accounts targeting non-machine services
// Alert threshold (count) MUST be validated against legitimate RC4 usage in your environment
index=wineventlog EventCode=
4769
    TicketEncryptionType=
0x17
    NOT ServiceName=
"*$"
    NOT AccountName=
"*$"
| bin _time span=
15
m
| 
stats 
dc
(
ServiceName
) AS DistinctSPNs, 
values
(
ServiceName
) AS SPNs
  
by
 AccountName, ClientAddress, _time
| 
where
 DistinctSPNs > THRESHOLD
// THRESHOLD: start high (e.g., 5) and reduce after confirming no legitimate RC4 usage
// at that volume. Do not copy this value without calibration.
```

## Historical block 2

```text
// HEURISTIC ANALYTIC — requires allowlisting of legitimate replication accounts
// before production deployment. Review all matches manually first.
index=wineventlog EventCode=
4662
    ObjectType=
"%{19195a5b-6da0-11d0-afd3-00c04fd930c9}"
    Properties=
"*1131f6aa*"
    Properties=
"*1131f6ad*"
    NOT SubjectUserName=
"*$"
          
// exclude machine accounts (DCs)
    NOT SubjectUserName 
IN
 
(
"MSOL_*"
, 
"AADConnect*"
)
  
// allowlist Entra Connect accounts
    
// Add additional allowlist entries for any tool with legitimate replication rights
| table _time, SubjectUserName, SubjectDomainName, IpAddress
```

## Historical block 3

```text
// HEURISTIC ANALYTIC — validate against environment baseline before alerting
// This combination is characteristic of PTH but not exclusive to it
// Correlate with host and user context before escalating
index=wineventlog EventCode=
4624
    LogonType=
3
    LogonProcessName=NtLmSsP
    AuthenticationPackageName=NTLM
    SubjectUserSid=
"S-1-0-0"
    NOT TargetUserName=
"*$"
   
// exclude machine account logons
| stats count 
by
 TargetUserName, WorkstationName, IpAddress
// Enrich: does TargetUserName have a prior Type 2 logon from WorkstationName?
// Absence of prior interactive logon increases confidence
```

## Historical block 4

```text
// Sentinel / KQL
// Detects: high failure spread across accounts and IPs, followed by any
// successful sign-in in the same or subsequent time window.
// Result: candidate accounts to investigate, not confirmed compromises.
let
 lookback       = 
60
m;
let
 spray_window   = 
15
m;
let
 min_accounts   = 
15
;   
// tune per tenant — lower in small tenants
let
 min_ips        = 
5
;    
// tune per tenant
let
 spray_periods =
    SigninLogs
    | 
where
 TimeGenerated > ago(lookback)
    | 
where
 ResultType !
in
 (
"0"
, 
"50140"
)   
// exclude success and "Stay signed in"
    | summarize
        FailedAccounts = dcount(UserPrincipalName),
        SourceIPs      = dcount(IPAddress)
      
by
 
bin
(
TimeGenerated, spray_window
)
    | 
where
 FailedAccounts >
= min_accounts 
and
 SourceIPs >= min_ips
    | extend WindowStart = TimeGenerated,
             WindowEnd   = TimeGenerated + 
30
m;
SigninLogs
| 
where
 TimeGenerated > ago(lookback)
| 
where
 ResultType == 
"0"
    
// successes only
| 
where
 
isnotempty
(
UserPrincipalName
)
| 
join
 kind
=inner spray_periods
    
on
 $left.
TimeGenerated 
between
 (
$right.WindowStart .. $right.WindowEnd
)
| project TimeGenerated, UserPrincipalName, IPAddress, Location,
          AppDisplayName, RiskLevelDuringSignIn, AuthenticationRequirement
| order 
by
 TimeGenerated desc
```

## Historical block 5

```text
index=wineventlog EventCode=
4769
    TicketEncryptionType=
0
x17
    
NOT
 ServiceName=
"*$"
    
NOT
 AccountName=
"*$"
| bin _time span=
15
m
| stats dc(ServiceName) 
AS
 DistinctSPNs, values(ServiceName) 
AS
 SPNs
  
by
 AccountName, ClientAddress, _time
| 
where
 DistinctSPNs > THRESHOLD
| table _time, AccountName, ClientAddress, DistinctSPNs, SPNs
```

## Historical block 6

```text
index=wineventlog EventCode=
4662
    ObjectType=
"%{19195a5b-6da0-11d0-afd3-00c04fd930c9}"
    Properties=
"*1131f6aa*"
    Properties=
"*1131f6ad*"
    NOT SubjectUserName=
"*$"
| table _time, SubjectUserName, SubjectDomainName, IpAddress
// Review all results against allowlisted replication service accounts
// before automated escalation
```

## Historical block 7

```text
index=wineventlog EventCode=4624
    LogonType=3
    LogonProcessName=NtLmSsP
    AuthenticationPackageName=NTLM
    SubjectUserSid=
"S-1-0-0"
    NOT TargetUserName=
"*$"
| stats count by TargetUserName, WorkstationName, IpAddress, ComputerName
| 
sort
 - count
```

## Historical block 8

```text
index
=
sysmon 
EventCode
=
10
    
TargetImage
=
"*lsass.exe"
    (
GrantedAccess
=
0x1010
 
OR
 
GrantedAccess
=
0x1410
 
OR
 
GrantedAccess
=
0x0820
     
OR
 
GrantedAccess
=
0x1fffff
)
    (
CallTrace
=
"*UNKNOWN*"
 
OR
 
CallTrace
!
=
"*
\\
Windows
\\
*"
)
    
NOT
 
SourceImage
 
IN
 (
        
"C:
\\
Program Files
\\
Windows Defender
\\
MsMpEng.exe"
,
        
"C:
\\
Windows
\\
System32
\\
csrss.exe"
,
        
"C:
\\
Windows
\\
System32
\\
werfault.exe"
        
// Add EDR agent and AV paths specific to your environment
    )
|
 table _time, 
SourceImage
, 
GrantedAccess
, 
CallTrace
, 
Computer
```

## Historical block 9

```text
// Sentinel / KQL — DeviceProcessEvents (MDE)
// DETERMINISTIC RULE for production internet-facing IIS / Exchange servers
DeviceProcessEvents
| 
where
 InitiatingProcessFileName 
in
~ (
    
"w3wp.exe"
, 
"UMWorkerProcess.exe"
, 
"httpd.exe"
, 
"nginx.exe"
)
  
and
 FileName 
in
~ (
    
"cmd.exe"
, 
"powershell.exe"
, 
"wscript.exe"
,
    
"cscript.exe"
, 
"mshta.exe"
, 
"bitsadmin.exe"
)
| 
where
 DeviceName 
in
 (
known_internet_facing_servers
)  
// scope to server list
| project Timestamp, DeviceName, InitiatingProcessFileName, FileName,
          ProcessCommandLine, InitiatingProcessCommandLine
```

## Historical block 10

```text
# ILLUSTRATIVE PSEUDOCODE — not directly executable
# Integrate entropy scoring into Zeek scripted detection or SIEM enrichment
import math
from
 urllib.parse import urlparse
def 
shannon_entropy
(
s
: str) -> 
float
:
    
if
 not s:
        
return
 
0.0
    freq = {}
    
for
 c in s:
        freq[c] = freq.
get
(c, 
0
) + 
1
    
return
 -
sum
((f / 
len
(s)) * math.
log2
(f / 
len
(s)) 
for
 f in freq.
values
())
def 
extract_subdomain
(
fqdn
: str) -> str:
    
""
"Return subdomain portion (everything left of registered domain + TLD)."
""
    parts = fqdn.
rstrip
(
'.'
).
split
(
'.'
)
    
# Naive: treat last two labels as registered domain + TLD
    
# Use a public suffix list library for accurate extraction in production
    
return
 
'.'
.
join
(parts[:-
2
]) 
if
 
len
(parts) > 
2
 
else
 
''
def 
is_suspicious_dns
(
fqdn
: str, 
query_type
: str) -> 
bool
:
    subdomain = 
extract_subdomain
(fqdn)
    entropy   = 
shannon_entropy
(subdomain)
    
# Thresholds below are illustrative starting points.
    
# Calibrate against local DNS baseline before deployment.
    
# CDN subdomains and some security-vendor domains also exceed these values.
    
return
 (
        entropy > 
4.0
 
or
        
len
(subdomain) > 
30
 
or
        (query_type 
in
 (
'TXT'
, 
'NULL'
) 
and
 entropy > 
3.5
)
    )
```

## Historical block 11

```text
// Sentinel / KQL — OfficeActivity (sourced from M365 Unified Audit Log)
// 
NOTE:
 OfficeObjectId is a document URL identifier, not a byte-count field.
// This analytic uses download event count as the volume proxy.
// Thresholds (min_baseline_days, z_threshold) require per-environment tuning.
let
 min_baseline_days = 
30
;
let
 alert_window_days = 
1
;
let
 z_threshold = 
4.0
;   
// illustrative — tune after observing score distribution
let
 baseline =
    OfficeActivity
    | 
where
 TimeGenerated 
between
 (
        ago(toduration(tostring(min_baseline_days + alert_window_days
) + "d"))
        .. 
ago
(
1
d
))
    | 
where
 Operation 
in
 (
"FileDownloaded"
, 
"FileSyncDownloadedFull"
)
    | summarize DailyCount
 = count()
      
by
 UserId, bin(TimeGenerated, 
1
d)
    | summarize
        BaselineAvg  = avg(DailyCount),
        BaselineStdev = stdev(DailyCount)
      
by
 UserId;
OfficeActivity
| 
where
 TimeGenerated > ago(
1
d)
| 
where
 Operation 
in
 (
"FileDownloaded"
, 
"FileSyncDownloadedFull"
)
| summarize TodayCount
 = count() 
by
 UserId
| 
join
 kind=inner baseline 
on
 UserId
| 
where
 BaselineStdev > 
0
| extend ZScore = (TodayCount - BaselineAvg) / BaselineStdev
| 
where
 ZScore > z_threshold
| project UserId, TodayCount, BaselineAvg = round(BaselineAvg,
1
),
          BaselineStdev = round(BaselineStdev,
1
), ZScore = round(ZScore,
1
)
| order 
by
 ZScore desc
```
