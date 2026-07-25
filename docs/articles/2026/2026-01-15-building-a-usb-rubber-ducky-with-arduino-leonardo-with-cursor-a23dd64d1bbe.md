---
title: "Building a USB Rubber Ducky with Arduino Leonardo with Cursor."
description: "Integrating Cursor AI into your hardware hacking workflow is a game-changer. From Human Prompt to Working Code"
image: "https://cdn-images-1.medium.com/max/800/1*6r4g3udcM3RhWNY1OO2Agw.jpeg"
---

# Building a USB Rubber Ducky with Arduino Leonardo with Cursor.


<img src="https://cdn-images-1.medium.com/max/800/1*6r4g3udcM3RhWNY1OO2Agw.jpeg" alt="Cover image" width="1360" height="768" loading="eager" fetchpriority="high" decoding="async" />

:::info Article Metadata
- **Category:** CTI
- **Source article:** [https://medium.com/@1200km/building-a-usb-rubber-ducky-with-arduino-leonardo-with-cursor-a23dd64d1bbe](https://medium.com/@1200km/building-a-usb-rubber-ducky-with-arduino-leonardo-with-cursor-a23dd64d1bbe)
- **Published:** 2026-01-15
- **Preserved media:** 3 image(s), including cover images, screenshots, diagrams, and infographics where present.
- **Preserved technical blocks:** 3 code/configuration block(s).
:::

## Ecosystem Fit

This page mirrors the original Medium article into the 1200km.com Docusaurus ecosystem. The original article flow, images, screenshots, infographics, and technical blocks are preserved from the export.

### Integrating Cursor AI into your hardware hacking workflow is a game-changer. From Human Prompt to Working Code

## Introduction

The USB Rubber Ducky is a well-known penetration testing tool that emulates a USB keyboard to execute keystroke-based attacks. While the original Hak5 USB Rubber Ducky is a commercial device, you can build your own using an Arduino Leonardo or Arduino Micro for a fraction of the cost. Like this:

<img src="https://cdn-images-1.medium.com/max/800/1*jJOCPmvZ7N9LUl0yWsZ0-w.png" alt="Article image" width="1264" height="293" loading="lazy" decoding="async" />

In this comprehensive guide, we’ll explore how to set up an Arduino-based Rubber Ducky, integrate it with Cursor IDE for seamless development, and discuss its applications in penetration testing.

## What is a USB Rubber Ducky?

A USB Rubber Ducky is a Human Interface Device (HID) that appears to the operating system as a standard USB keyboard. When plugged into a computer, it can execute pre-programmed keystrokes at incredible speed (up to 1000 words per minute), making it an effective tool for:

- **Penetration Testing**: Testing physical security and social engineering defenses

- **Security Audits**: Demonstrating vulnerabilities in system configurations

- **Red Team Exercises**: Simulating real-world attack scenarios

- **Educational Purposes**: Understanding HID attacks and defenses

## Why Arduino Leonardo/Micro?

The Arduino Leonardo and Arduino Micro are ideal for building a DIY Rubber Ducky because:

- **Native USB Support**: Both boards use the ATmega32u4 microcontroller with built-in USB functionality

- **HID Capability**: Can natively act as a keyboard, mouse, or other HID device

- **Cost-Effective**: Significantly cheaper than commercial alternatives

- **Customizable**: Fully programmable and adaptable to specific needs

- **Open Source**: Complete control over the firmware and payloads

## Complete Setup Guide

### Project Initialization

Create a new directory for your Rubber Ducky project:

```text
mkdir
 RubberDucky
cd
 RubberDucky
```

- Open**Cursor IDE**and create a new Arduino project (or open your existing sketch).

```text
cursor
 .
```

- Connect your**Arduino Leonardo**to your computer using a USB data cable.

- In Cursor, use**plain-language prompts**to generate or improve your sketch.

<img src="https://cdn-images-1.medium.com/max/800/1*yb-lC-Fntc43T5gigch9YA.png" alt="Article image" width="1915" height="1080" loading="lazy" decoding="async" />

## Project Timeline: From Human Prompt to Working Code

### You can review the complete original action log below:

### Pay Attention to User requests!

```text
## Phase 1: Initial Setup Request
### User Request
> "Install to this directory tool for Arduino Leonardo programming"
### Actions Taken
1.
 
**Directory Check**
   -
 Checked 
`/home/andrey/RubberDucky`
 directory
   -
 Confirmed directory was empty
2.
 
**PlatformIO Installation Decision**
   -
 Selected PlatformIO as the development tool
   -
 Chose virtual environment approach for isolation
3.
 
**Project Structure Creation**
   -
 Created 
`platformio.ini`
 configuration file
   -
 Created 
`src/main.cpp`
 with basic Arduino template
   -
 Created 
`.gitignore`
 for build artifacts
   -
 Created 
`README.md`
 with setup instructions
### Files Created
**platformio.ini**
 (Initial version):
```ini
[env:leonardo]
platform = atmelavr
board = leonardo
framework = arduino
monitor_speed = 9600
upload_protocol = avr109
upload_port = /dev/ttyACM0
build_flags = 
    -DUSB_VID=0x2341
    -DUSB_PID=0x0036
```
**src/main.cpp**
 (Initial template):
```cpp
#include &lt;Arduino.h&gt;
void setup() {
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect
  }
  Serial.println("Arduino Leonardo initialized!");
}
void loop() {
  Serial.println("Hello from Arduino Leonardo!");
  delay(1000);
}
```
### Commands Executed
```bash
# Created virtual environment
python3 -m venv venv
# Installed PlatformIO
source venv/bin/activate
pip install platformio
# Verified installation
pio --version
# Output: PlatformIO Core, version 6.1.18
```
### Result
✅ PlatformIO successfully installed and configured for Arduino Leonardo
---
## Phase 2: Device Detection and IDE Integration
### User Request
> "Run the tool. Now I have one device connected to my host, open it or add option to program this device via Cursor IDE"
### Actions Taken
1.
 
**Device Detection**
   
```bash
   pio device list
   ```
   -
 Detected Arduino Micro at 
`/dev/ttyACM0`
   -
 Confirmed compatibility with Leonardo configuration
2.
 
**Build Test**
   
```bash
   pio run
   ```
   -
 Successfully compiled project
   -
 Installed required toolchains and frameworks
3.
 
**Cursor IDE Integration**
   -
 Created 
`.vscode/`
 directory
   -
 Created 
`.vscode/settings.json`
 for PlatformIO integration
   -
 Created 
`.vscode/tasks.json`
 with build/upload tasks
   -
 Created 
`.vscode/extensions.json`
 with PlatformIO recommendation
### Files Created
**.vscode/settings.json**
:
```json
{
    "platformio-ide.autoCleanBeforeBuild": true,
    "platformio-ide.useBuiltinPIOCore": false,
    "platformio-ide.customPATH": "${workspaceFolder}/venv/bin",
    "files.associations": {
        "*.ino": "cpp",
        "*.h": "c"
    }
}
```
**.vscode/tasks.json**
:
```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "PlatformIO: Build",
            "type": "shell",
            "command": "${workspaceFolder}/venv/bin/pio",
            "args": ["run"],
            "group": {"kind": "build", "isDefault": true}
        },
        {
            "label": "PlatformIO: Upload",
            "type": "shell",
            "command": "${workspaceFolder}/venv/bin/pio",
            "args": ["run", "--target", "upload"]
        }
    ]
}
```
### Result
✅ Device detected and Cursor IDE fully configured for programming
---
## Phase 3: First Code Upload
### User Request
> "Upload this code to my device"
### Actions Taken
1.
 
**Permission Issue Encountered**
   -
 Error: 
`Permission denied`
 on 
`/dev/ttyACM0`
   -
 User not in 
`dialout`
 group
2.
 
**Permission Fix**
   
```bash
   sudo usermod -a -G dialout $USER
   ```
   -
 Added user to dialout group
   -
 Created 
`upload.sh`
 helper script for sudo access
3.
 
**Successful Upload**
   
```bash
   sudo -E env "PATH=$PATH" bash -c "source venv/bin/activate && pio run --target upload"
   ```
   -
 Uploaded successfully using sudo
   -
 Firmware verified: 3,694 bytes
### Files Created
**upload.sh**
:
```bash
#!/bin/bash
cd "$(dirname "$0")"
source venv/bin/activate
pio run --target upload
```
### Result
✅ Code successfully uploaded to Arduino Micro device
---
## Phase 4: Rubber Ducky Payload Development
### User Request
> "Create and upload to device new script: Connect as Standard Keyboard,"
> "After connection open the terminal on Linux, and write Hello world to terminal"
### Actions Taken
1.
 
**Initial Attempt - Standard Keyboard Library**
   -
 Tried to use 
`#include <Keyboard.h>`
   -
 
**Error**
: 
`Keyboard.h: No such file or directory`
   -
 PlatformIO doesn't include standard Arduino Keyboard library for Leonardo
2.
 
**Library Research**
   -
 Searched for HID libraries compatible with PlatformIO
   -
 Found HID-Project library as solution
3.
 
**HID-Project Library Integration**
   -
 Updated 
`platformio.ini`
 to include library:
     ```ini
     lib_deps = 
         nicohood/HID-Project@^2.8.4
     ```
   - Updated code to use `BootKeyboard` from HID-Project
4.
 
**Code Development**
   -
 Implemented keyboard initialization
   -
 Added delays for system recognition
   -
 Implemented Ctrl+Alt+T for terminal opening
   -
 Added "Hello world" typing functionality
### Files Modified
**platformio.ini**
 (Updated):
```ini
[env:leonardo]
platform = atmelavr
board = leonardo
framework = arduino
; USB Configuration
board_build.usb_product = "Arduino Leonardo"
board_build.usb_vid = 0x2341
board_build.usb_pid = 0x0036
; Libraries
lib_deps = 
    nicohood/HID-Project@^2.8.4
monitor_speed = 9600
upload_protocol = avr109
upload_port = /dev/ttyACM0
```
**src/main.cpp**
 (Rubber Ducky Payload):
```cpp
#include &lt;Arduino.h&gt;
#include &lt;HID-Project.h&gt;
#include &lt;HID-Settings.h&gt;
void setup() {
  // Initialize keyboard
  BootKeyboard.begin();
  
  // Wait for the system to recognize the keyboard
  delay(2000);
  
  // Open terminal: Ctrl+Alt+T (on most Linux systems)
  BootKeyboard.press(KEY_LEFT_CTRL);
  BootKeyboard.press(KEY_LEFT_ALT);
  BootKeyboard.press('t');
  delay(100);
  BootKeyboard.releaseAll();
  
  // Wait for terminal to open
  delay(1000);
  
  // Type "Hello world"
  BootKeyboard.print("Hello world");
  
  // Press Enter to execute
  BootKeyboard.press(KEY_RETURN);
  delay(100);
  BootKeyboard.releaseAll();
  
  // End keyboard control
  BootKeyboard.end();
}
void loop() {
  // Do nothing - script runs once
  delay(1000);
}
```
### Commands Executed
```bash
# Library installation
pio lib install "nicohood/HID-Project@^2.8.4"
# Build test
pio run
# Output: [SUCCESS] - 5,980 bytes compiled
# Upload with sudo
echo '****' | sudo -S env "PATH=$PATH" bash -c \
  "source venv/bin/activate && pio run --target upload"
# Output: [SUCCESS] - Firmware uploaded and verified
```
### Key Learnings
1.
 
**Library Selection**
: Standard Arduino Keyboard library not available in PlatformIO
2.
 
**HID-Project**
: Provides 
`BootKeyboard`
 class with similar API
3.
 
**Key Constants**
: Uses 
`KEY_LEFT_CTRL`
, 
`KEY_LEFT_ALT`
, 
`KEY_RETURN`
 from HID-Project
4.
 
**Timing**
: Delays crucial for system to recognize HID device
### Result
✅ Rubber Ducky payload successfully created and uploaded
---
```

## ✅ Rubber Ducky payload successfully created and uploaded!

## Stay tuned for my next posts on how to use a Rubber Ducky for penetration testing, including mobile penetration testing.
