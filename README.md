# 🎙️ DubPilot: Multimodal Alexa+ Video Localization Copilot (Next.js Edition)
> **Amazon Developer Hackathon 2026 Submission**  
> **Primary Track:** Alexa+ (Multimodal Agent Simulation)  
> **Mini-Challenge:** AWS Builder (Amazon Bedrock Agent Integration)  
> **Bonus Opportunity:** 10% Judging Bonus via Developer Tool Friction Log (`friction_log.md`)

---

## 🌟 1. Project Overview
**DubPilot** is a multimodal, voice-and-touch video localization copilot built with **Next.js 14 (App Router)**, **TypeScript**, and **Amazon Bedrock**.

Instead of passive video streaming, DubPilot lets viewers **converse naturally with their content**:
- *"Alexa, switch audio to Hindi."* ➡️ Video instantly switches spoken language stems while preserving playhead position, synchronized with localized subtitles.
- *"Alexa, make the subtitles easier to read."* ➡️ Re-renders subtitles into large high-contrast display with bilingual captions.
- *"Alexa, replay that line."* ➡️ Jumps playback back 7 seconds to review dialogue.
- *"Alexa, duck the background music."* ➡️ Attenuates background M&E track by -6dB to maximize speech intelligibility.
- *"Alexa, who is speaking right now?"* ➡️ Amazon Bedrock queries the scene script and provides context verbally.

---

## ⚡ 2. Quick Start

### Development Server
```bash
npm install
npm run dev
```
*Opens at `http://localhost:3000`.*

### Production Build & Launch
```bash
npm run build
npm start
```

---

## 🏗️ 3. Next.js App Architecture

```
Amazon builder basic/
├── app/
│   ├── layout.tsx              # Root HTML layout with Google Fonts & metadata
│   ├── page.tsx                # Master Multimodal Studio orchestrator
│   ├── globals.css             # Glassmorphic Cinema Dark Mode design system
│   └── api/
│       └── bedrock/
│           └── route.ts        # Next.js Route Handler for AWS Bedrock Converse API
├── components/
│   ├── Header.tsx              # Brand badge, Alexa+ track indicator, Bedrock model badge
│   ├── VideoPlayer.tsx         # Gapless multitrack audio/video & subtitle player
│   ├── AlexaCopilot.tsx        # Alexa+ voice agent with Bedrock tool calling
│   ├── SettingsModal.tsx       # Bedrock model & AWS credentials configuration
│   └── RubricGrid.tsx          # Hackathon judging rubric alignment display
├── public/
│   └── media/                  # Real dubbed video clips (English, Spanish, Hindi, French) & VTT captions
├── friction_log.md             # Developer Tool Friction Log for 10% judging bonus
├── context.md                  # High-level architecture & conventions
├── features_implemented.md     # Current functionality status
└── tracker.md                  # Agent handoff log
```

---

## 🗣️ 4. Supported Conversational Commands

Try clicking or speaking any of these commands to the Alexa+ orb:
1. **"Switch to Hindi audio"** (or click `🗣️ Switch to Hindi`)
2. **"Cambiar a Español"** (or click `🇪🇸 Cambiar a Español`)
3. **"Switch to French"**
4. **"Switch back to English"**
5. **"Make subtitles larger"**
6. **"Replay last line"**
7. **"Duck background music by 6dB"**
8. **"Who is in this clip?"**

---

## 📊 5. Hackathon Judging Rubric Alignment

1. **Technical Implementation (25%)**:
   - Next.js Route Handler (`/api/bedrock`) with structured Bedrock Converse tool schemas.
   - Gapless multi-audio track switching with playhead temporal preservation.
   - Live VTT subtitle parsing and interactive clickable script transcript.
2. **Design (25%)**:
   - Glassmorphic cinema dark interface with glowing Alexa blue accents.
   - Reactive pulsing voice visualizer orb.
   - Full WCAG AA contrast compliance and Emil Kowalski tactile micro-interactions.
3. **Potential Impact (25%)**:
   - Solves video comprehension for 1.5B+ non-native English speakers.
   - Enables real-time dual-language subtitles for language learners and accessibility.
4. **Quality of the Idea (25%)**:
   - First-of-its-kind Multimodal Voice Video Copilot for Alexa+ and Fire TV / Living Room environments.
5. **Bonus (+10%)**:
   - Detailed, actionable `friction_log.md` detailing Bedrock streaming deltas and latency optimizations.