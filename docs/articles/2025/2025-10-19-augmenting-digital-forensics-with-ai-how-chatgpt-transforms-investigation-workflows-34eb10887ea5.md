---
title: "Augmenting Digital Forensics with AI: How ChatGPT Transforms Investigation Workflows"
description: "From evidence triage to report generation \u2014 applying large language models to real forensic cases like HackTheBox\u2019s \u201cSherlok\u201d."
image: "https://cdn-images-1.medium.com/max/800/1*6SWfX1VpZQBqtka1ZLBL8g.png"
---

# Augmenting Digital Forensics with AI: How ChatGPT Transforms Investigation Workflows


<img src="https://cdn-images-1.medium.com/max/800/1*6SWfX1VpZQBqtka1ZLBL8g.png" alt="Cover image" width="1909" height="605" loading="eager" fetchpriority="high" decoding="async" />

:::info Article Metadata
- **Category:** CTI
- **Source article:** [https://medium.com/@1200km/augmenting-digital-forensics-with-ai-how-chatgpt-transforms-investigation-workflows-34eb10887ea5](https://medium.com/@1200km/augmenting-digital-forensics-with-ai-how-chatgpt-transforms-investigation-workflows-34eb10887ea5)
- **Published:** 2025-10-19
- **Preserved media:** 4 image(s), including cover images, screenshots, diagrams, and infographics where present.
- **Preserved technical blocks:** 1 code/configuration block(s).
:::

## Ecosystem Fit

This page mirrors the original Medium article into the 1200km.com Docusaurus ecosystem. The original article flow, images, screenshots, infographics, and technical blocks are preserved from the export.

### From evidence triage to report generation — applying large language models to real forensic cases like HackTheBox’s “Sherlok”.

## About the “Sherlok” Challenge (HackTheBox)

“**Sherlok**” is an*easy-level*digital forensics challenge from**Hack The Box’s Sherlocks**series — designed to simulate a real-world investigation where an analyst must uncover evidence from a limited set of artifacts.

In this challenge, participants receive a few digital traces — such as**system logs, memory snapshots, or network captures**— and are tasked with reconstructing the attacker’s actions, identifying indicators of compromise (IoCs), and answering investigative questions.

The focus of*Sherlok*is not complex exploitation but**analytical reasoning**: understanding how to extract, correlate, and interpret forensic data to build a clear narrative of what happened.

It’s the perfect environment to demonstrate how**AI tools like ChatGPT**can assist investigators — from artifact triage and log interpretation to timeline reconstruction and report drafting.

<img src="https://cdn-images-1.medium.com/max/800/1*6SWfX1VpZQBqtka1ZLBL8g.png" alt="Article image" width="1909" height="605" loading="lazy" decoding="async" />

**Brutus**simulates a realistic but compact incident: an SSH brute-force against a Unix server that eventually yields a successful login (including root access), followed by the attacker reconnecting, creating a new account and escalating privileges. The challenge’s primary artifacts are`auth.log`(authentication events) and the`wtmp`login/logout record — ideal for teaching timeline reconstruction, brute-force detection, session correlation, and basic account persistence analysis. Because its scope is small and focused, Brutus is perfect to demonstrate how an AI assistant (ChatGPT) can help triage logs, extract timelines, suggest hypotheses (e.g., credential reuse, lateral access), and draft a concise forensic narrative — all while the analyst validates and extends those leads with tools.

**Step 1 — Upload and Analyze the Evidence with AI**
*Using ChatGPT to perform initial forensic triage on log files with next promt:*

```text
Prompt:
Archive correct 
pass
 
is
: hacktheblue
“You are a digital forensics assistant. Analyze the uploaded log file carefully.
Identify 
all
 unusual 
or
 suspicious activities, failed 
and
 successful login attempts, IP addresses, 
and
 timestamps.
Reconstruct the possible timeline of events.
Highlight signs of brute-force attacks, privilege escalation, 
or
 persistence.
Summarize the behavior 
in
 clear forensic language 
with
 evidence references 
from
 the log.
Finally, suggest additional questions 
or
 artifacts that an investigator should review 
next
.”
```

<img src="https://cdn-images-1.medium.com/max/800/1*N62016f8MFf9Yq-aflmfnA.png" alt="Article image" width="1857" height="731" loading="lazy" decoding="async" />

<img src="https://cdn-images-1.medium.com/max/800/1*LleqvhHxriMtR4o9UyduYA.png" alt="Article image" width="1906" height="882" loading="lazy" decoding="async" />

### And after a few seconds you get next response:

## Key findings (with evidence references)

All evidence below comes from the parsed`auth.log`(file name`auth.log`). Where I reference specific lines I use the line numbers in the parsed CSV produced from that file.

- **Massive automated/auth probing from single IP (likely brute-force):**

- Top IP:**65.2.161.68–214 matched events**in`auth.log`.

- Example lines (auth.log):

- `auth.log:L68`—`Mar 6 06:31:31 ip-172-31-35-28 sshd[2325]: Invalid user admin from 65.2.161.68 port 46380`(AUTH_FAIL).

- Nearby lines show repeated invalid user / failed attempts, disconnections and preauth “Bye Bye” entries from the same IP.

- Summary counts: top offender`65.2.161.68 (214)`(see top IP summary in parsed output).

- **Large number of failed authentication attempts (brute-force clusters):**

3. Detected**160 brute-force clusters**across`auth.log`. Each cluster is 5+ failed attempts from same IP within 5 minutes (heuristic). These clusters are overwhelmingly associated with`65.2.161.68`.

- Example: cluster entries around`Mar 6 06:31:31`show many`Invalid user`and`Failed password`lines from that IP.

- **Successful (local/service) sessions recorded (not necessarily remote SSH):**

4. There are*some*successful session openings in the log, e.g.:

- `auth.log:L8`—`Mar 6 06:19:01 ip-172-31-35-28 CRON[1367]: pam_unix(cron:session): session opened for user confluence(uid=998) by (uid=0)`— CRON job for`confluence`user started (PERSISTENCE / AUTH_SUCCESS tag).

- Several other`session opened for user ...`entries exist for local/system jobs — these are expected for scheduled jobs but should be considered when correlating with suspicious activity.

- **Privilege / persistence related indicators:**

5. There are**115**matched events flagged with`SU_SUDO`,`USER_MGMT`or`PERSISTENCE`patterns (e.g., sudo messages, cron sessions, authorized_keys mentions, useradd/usermod). These require review because they may indicate:

- creation of a backdoor user,

- cron-based persistence, or

- SSH key persistence via`authorized_keys`.

- Example entries include CRON session open/closed messages for`confluence`(see`auth.log:L8-L10`).

**6. wtmp entries parsed (interactive/recorded logins):**

- `wtmp`parsed into ~29 records showing types such as`USER`,`LOGIN`,`DEAD`etc. This gives interactive login history (records saved at`/mnt/data/brutus_final_output/wtmp_parsed.csv`). The`wtmp`parsing used the utmp layout consistent with your`utmp.py`helper.

- utmp

**7. Other remote IPs:**

- Second observed remote IP:**203.101.190.9**(much smaller count — 1 event in the parsed sample). The event counts show the attacker activity is dominated by the first IP.

## Reconstructed timeline (representative; exact minute granularity available in CSV)

Below is a concise reconstruction using the parsed events (representative — see CSV for full minute-by-minute sequence):

- **Mar 6 06:19:01**— CRON starts and opens sessions for`confluence`user (local scheduled job). Logged as session opened/closed (auth.log:L8–L10). This appears to be a normal cron task but we flag it for correlation because it's local privileged activity around the same window where remote attempts occur later.

- **Mar 6 06:31:31**— intense SSH probe / invalid-user attempts from**65.2.161.68**begin (auth.log:L68 and onward). Multiple`Invalid user`,`Failed password`, and preauth disconnect messages recorded. This marks the start of one large brute-force cluster.

- **Mar 6 06:31:31 → subsequent minutes**— repeated attempts continue (many clusters recorded). In many clusters each attempt is recorded as`Invalid user`or`Failed password`and the connection resets / disconnection lines appear.

- Throughout the parsed timeframe — repeated brute-force windows and many tagged`PERSISTENCE`and`SU_SUDO`events appear (these should be inspected to determine if they are legitimate system activity or post-compromise changes).

I produced the full chronological table (`auth_parsed_events.csv`) so you can step through each minute and each event line — this contains the exact file line and message to use in evidence packages.

## Signs of attacker behavior vs. normal system noise

- **Strong indicators of attack / compromise attempt:**large number of`Invalid user`/`Failed password`messages from the same external IP (65.2.161.68) in short windows →**credential stuffing / brute-force**. The volume (214 matched events) is too high for legitimate activity.

- **Unclear / suspicious but not proven:**`PERSISTENCE`matches (cron entries,`authorized_keys`) and`USER_MGMT`entries. These can be legitimate system changes (e.g., package installs, admin tasks) — they must be cross-checked with known change windows and system admins.

- **Privilege escalation signals to validate:**`sudo:`and`session opened for user root`entries — present in logs flagged — must be checked for who invoked sudo and whether the invoker was legitimate.

## Immediate containment recommendations (if system may be live/compromised)

- **Block**IP`65.2.161.68`at perimeter / host firewall (iptables / security group).

- **Disable or restrict SSH**temporarily (e.g., limit to key-based auth, disable password auth, restrict by IP).

- **Rotate credentials**for any accounts that might be targeted (especially admin or`confluence`if that service is exposed).

- **Preserve evidence**: snapshot filesystem, copy`/var/log/auth.log`,`/var/log/secure`,`/var/log/syslog`,`/etc/passwd`,`/etc/shadow`(read-only copy),`/root/.ssh/authorized_keys`,`/home/*/.ssh/authorized_keys`.

- **Isolate**the host from the network for forensic preservation if you suspect a successful compromise and need full investigation.

## Artifacts & follow-up items you should collect / review next

(These will help confirm whether an attacker achieved access, escalated privileges, or established persistence.)

- **Full raw logs**(if not already collected):

- `/var/log/auth.log`,`/var/log/secure`,`/var/log/syslog`(complete files, not just snippets).

- `/var/log/cron*`and`/var/log/messages`.

**2. SSH artifacts & user context:**

- `/root/.ssh/authorized_keys`and`/home/*/.ssh/authorized_keys`(diff against known baseline), and`.bash_history`for accounts of interest.

- `/etc/ssh/sshd_config`(to confirm PermitRootLogin, PasswordAuthentication settings).

**3. Account and sudo changes:**

- `/etc/passwd`,`/etc/shadow`,`/etc/group`(look for recently added accounts).

- `/etc/sudoers`and`/etc/sudoers.d/*`(look for unauthorized sudo grants).

**4. Service / scheduled tasks / persistence:**

- `crontab -l`for all users,`/var/spool/cron/crontabs/*`,`/etc/cron.*/*`.

- `systemctl list-unit-files --state=enabled`and`ls -la /etc/systemd/system`(new unit files).

**5. Binaries & filesystem changes:**

- `find / -mtime -7 -ls`(files modified in last 7 days) — be careful on live systems; best against snapshot.

- Check for unknown setuid binaries, newly added scripts in`/tmp`,`/var/tmp`,`/usr/local/bin`.

**6. Network/host telemetry & EDR:**

- Netflow/connection logs to see outbound connections from host to unusual hosts.

- Anti-virus / EDR alerts and recent scans.

**7. Memory image**(if possible and suspect compromise): collect`volatile`data to identify in-memory persistence, loaded suspicious binaries, and network connections.

**8. Cross-system correlation:**check logs for other infrastructure (bastion, firewall, IDS) to see if 65.2.161.68 or other IPs targeted other hosts at same time.

## Specific questions an investigator should answer next

- Did any of the brute-force clusters result in a successful remote login? (Search`Accepted password`/`Accepted publickey`entries that correlate to attacker IPs.)

- If a successful login exists: which account was used, and what was the command history / processes launched by that account?

- Are there newly added users or SSH keys that permit persistent access?

- Were any sudo or root sessions opened that were not initiated by known admins? (Check`sudo`logs,`session opened for user root`lines and map to invoking user.)

- Does the host exhibit unexplained outbound connections or scheduled tasks that contact external C2 IPs?

## Where the parsed evidence lives (on this analysis host)

- CSV of parsed auth events:`/mnt/data/brutus_final_output/auth_parsed_events.csv`

- CSV of parsed wtmp records:`/mnt/data/brutus_final_output/wtmp_parsed.csv`

- Brute-force clusters (JSON):`/mnt/data/brutus_final_output/bruteforce_clusters.json`(if present)

## Notes & limitations

- My brute-force detection used a**heuristic**(≥5 fails in 5 minutes). This is intentionally sensitive; you can increase thresholds to reduce noise.

- Timestamps in`auth.log`are syslog format without year; I assigned the current year when parsing. If events span year boundaries you should confirm the correct year against original file metadata.

- `wtmp`parsing used the utmp layout and offsets from your`utmp.py`helper; that script was used as a reference.

- utmp

- I parsed only what was uploaded. If there are other logs (webserver access/error logs, application logs for Confluence, firewall logs) they should be added to correlate indicators.

If you want, next I can (pick any or several):

- Walk through the**top 20**`**auth.log**`**lines for IP 65.2.161.68**and annotate each one (I already have a sample; I can produce a full sequence with timestamps).

- Search the parsed events for**any successful logins that originated from**`**65.2.161.68**`and highlight exactly which line(s) show an`Accepted`or`session opened`from that IP.

- Produce a**play-by-play timeline**(CSV → human timeline) that shows minute-by-minute what happened, including how many failures per minute from the top IP.

- Hunt for**evidence of persistence**by scanning the filesystem (if you upload or allow additional files):`authorized_keys`, cron directories, systemd unit files,`/tmp`, etc.

- Provide a**remediation checklist**customized to the services on the host (e.g., if Confluence is present, list Confluence-specific indicators and recommended steps).

## Now just ask box questions, and get correct answers with evidence and explanation:

<img src="https://cdn-images-1.medium.com/max/800/1*oZNywppg7YKKHTUPt_E32Q.png" alt="Article image" width="1196" height="772" loading="lazy" decoding="async" />

So fast and simple!
Welcome to AI age
