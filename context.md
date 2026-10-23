# DubPilot: Multimodal Alexa+ Video Localization Copilot
*Amazon Developer Hackathon 2026 — Alexa+ Track & AWS Builder Mini-Challenge*

## 1. Project Purpose & Vision
DubPilot is an agentic, multimodal video localization and conversational viewing copilot designed for Amazon Alexa+ and AWS. Built for the Amazon Developer Hackathon 2026, it transforms video watching into an interactive multilingual experience. 

Using an Alexa+ simulated agent interface powered by Amazon Bedrock (Claude 3.5 Sonnet / Amazon Nova), viewers can converse naturally with their entertainment:
- **Instant Multilingual Dubbing**: Switch spoken languages on the fly (e.g., "Alexa, switch audio to Hindi" or "Dub this character in Spanish").
- **Dynamic Subtitle Orchestration**: "Make the subtitles larger", "Show bilingual subtitles", or "Explain that colloquial idiom".
- **Contextual Scene & Character Recall**: "Who is speaking right now?", "Why is he angry?", or "Replay that punchline with Spanish subtitles".
- **Autonomous Post-Production Pipeline**: Integrates with the LOCALIZE AI dubbing engine (Faster-Whisper ASR, isometric syllable synchronization, Kokoro/Edge-TTS neural synthesis, and EBU R128 audio mastering).

## 2. Architecture & Subsystems
```
┌────────────────────────────────────────────────────────────────────────┐
│                        Next.js Client Application                      │
│  - Multimodal Video Player (app/page.tsx, components/VideoPlayer.tsx)  │
│  - Alexa+ Conversational Assistant (components/AlexaCopilot.tsx)       │
│  - Multitrack Stem Audio Mixer (Dialogue Bus, Original M&E, Ducking)   │
│  - Live Agent Telemetry & Action Execution Log                         │
└──────────────────┬──────────────────────────────────▲──────────────────┘
                   │ User Utterance / Tool Call Event │ Action State Sync
                   ▼                                  │
┌─────────────────────────────────────────────────────┴──────────────────┐
│             Next.js Bedrock Route Handler (app/api/bedrock)            │
│  - Bedrock Agent Runtime (Tool Calling / Structured Output)            │
│  - Intent Parser: Audio Switching, Subtitle Formatting, Scene Query    │
│  - Fallback Resilient Bedrock Agent for zero-credential demos          │
└──────────────────┬─────────────────────────────────────────────────────┘
                   │ Dispatches Media & Translation Tasks
                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│              LOCALIZE Engine Bridge (Dubbing Pipeline)                 │
│  - Faster-Whisper ASR + Diarization                                    │
│  - Cultural Localization & Isometric Syllable Matcher                  │
│  - Neural Voice Synthesis & FFmpeg Dynamic Sidechain Bus Master        │
└────────────────────────────────────────────────────────────────────────┘
```

## 3. Technology Stack
- **Framework**: Next.js 14.2 (App Router, Server Components & Client Components).
- **Core**: TypeScript, React 18, Lucide React icons.
- **Styling (CSS)**: Tailored Vanilla CSS design system (`app/globals.css`). Dark Cinema Mode (`#07090E`), Electric Violet (`#7248EA`), Emerald Cyan (`#00D4AA`), Alexa Cyan (`#00CAEC`). Emil Kowalski tactile micro-animations (`active:scale-[0.98]`).
- **Voice & Speech**: Web Speech Recognition API + Web Speech Synthesis (Alexa voice persona) + Amazon Polly fallback.
- **AI Agent Brain**: Amazon Bedrock (`anthropic.claude-3-5-sonnet-20241022-v2:0` or `amazon.nova-pro-v1:0`) via Next.js Route Handler (`app/api/bedrock/route.ts`), with structured JSON function calling schemas.
- **Media Engine**: HTML5 Video + Web Audio Context for gapless stem switching and dynamic EBU R128 gain ducking.

## 4. Hackathon Track Alignment
- **Primary Track**: **Alexa+** (Qualifying Web-based Multimodal Agent Simulation with live voice, visual player state, and real tool execution).
- **Mini-Challenge 1**: **AWS Builder** (Amazon Bedrock Agent runtime integration, AWS SDK invocation, and architectural documentation).
- **Judging Criteria Optimization**:
  - *Technical Implementation (25%)*: Working Bedrock tool-calling agent, multitrack audio alignment, real-time subtitle sync.
  - *Design (25%)*: Glassmorphic cinema UI, WCAG AA contrast, responsive push-to-talk voice orb, instant visual feedback.
  - *Potential Impact (25%)*: Democratizing global cinema for 1.5B+ multilingual viewers and hearing/language-impaired audiences.
  - *Quality of the Idea (25%)*: Transforming passive TV viewing into active, intelligent multimodal comprehension.
  - *Bonus (up to 10%)*: Concrete Developer Tool Friction Log for Amazon Bedrock and Alexa+ SDK.

## 5. Directory Structure
```
Amazon builder basic/
├── context.md                  # High-level architecture, conventions, and stable knowledge
├── features_implemented.md     # Current functionality and verification status
├── tracker.md                  # Agent handoff log and next steps
├── friction_log.md             # Developer Tool Friction Log for 10% judging bonus
├── package.json                # Next.js scripts & dependencies
├── tsconfig.json               # TypeScript configuration
├── next.config.mjs             # Next.js configuration
├── app/
│   ├── layout.tsx              # Root HTML layout with metadata
│   ├── page.tsx                # Master Multimodal Studio page
│   ├── globals.css             # Glassmorphic Cinema design system
│   └── api/
│       └── bedrock/
│           └── route.ts        # Amazon Bedrock Converse API Route Handler
├── components/
│   ├── Header.tsx              # Navigation & AWS badges
│   ├── VideoPlayer.tsx         # Multitrack audio/video & subtitle player
│   ├── AlexaCopilot.tsx        # Alexa+ voice agent with Bedrock tool calling
│   ├── SettingsModal.tsx       # Bedrock model & AWS credentials modal
│   └── RubricGrid.tsx          # Hackathon rubric alignment cards
└── public/
    └── media/                  # Pre-dubbed multilingual video clips & VTT subtitles
```