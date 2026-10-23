# DubPilot — Brand Identity & Design System Specification
> Canonical Brand Book, Voice Architecture & Visual System

---

## 1. Brand Identity Overview

| Element | Specification |
| :--- | :--- |
| **Brand Name** | **DubPilot** |
| **Parent Platform** | Amazon Alexa+ & AWS Bedrock Ecosystem |
| **Category** | Multimodal Conversational Cinema & Autonomous Video Localization |
| **Tagline** | *Conversational Cinema. Boundless Language.* |
| **Mission** | To eradicate language and cognitive barriers in global cinema by giving every viewer an intuitive, conversational voice copilot capable of real-time multi-track dubbing, contextual recall, and intelligent subtitle orchestration. |
| **Brand Truth** | Cinema is humanity's shared visual language. Spoken dialogue and cultural vernacular should enrich the visual story—never alienate the audience. |

---

## 2. Brand Strategy & Positioning

### The Friction We Eradicate
1. **The Subtitle Split-Attention Deficit**: Viewers spend 60% of foreign-language screen time reading text at the bottom of the frame instead of absorbing cinematographic nuance, actor micro-expressions, and visual composition.
2. **Robotic & Asynchronous Dubs**: Traditional dubbing suffers from syllable drift, robotic synthetic tones, and unnatural cadence that shatters viewer immersion.
3. **Passive Incomprehension**: When a foreign colloquialism, historical idiom, or complex character motive arises, viewers have no immediate way to ask without pausing, unlocking a phone, and breaking the cinematic spell.

### The Wedge & Transformation
- **Instant Conversational Control**: "Alexa, switch audio to Hindi", "Make subtitles larger", "Explain that Italian idiom", "Replay that punchline with Spanish captions".
- **Collision-Free Audio Etiquette**: The copilot detects playback velocity in real time; it renders visual telemetry silently during active dialogue and only speaks synthesized responses when the movie is paused.

### Brand Archetypes
- **Primary Archetype: The Master Craftsman** (Precision acoustic mastering, EBU R128 loudness discipline, isometric syllable synchronization).
- **Secondary Archetype: The Cultured Sage** (Fluent in global idioms, multilingual context, and cinematographic storytelling).

---

## 3. Brand Voice & Messaging Framework

### Tone Dials

```
Empathetic & Culturally Attuned  ───●───────────  Clinical & Detached     (90% Warm)
Decisive & Prompt               ───────●───────  Verbose & Hesitant      (92% Direct)
Cinematic & Architectural       ──●─────────────  Corporate & Generic     (95% Craft)
Plainspoken Vernacular          ───●───────────  Academic Jargon         (88% Clear)
```

### Messaging Pillars

- **The Hook (7 Words)**:  
  *Talk to your cinema. Hear every world.*

- **The 30-Second Elevator Pitch**:  
  *DubPilot is an agentic multimodal viewing copilot engineered for Amazon Alexa+ and powered by AWS Bedrock. By combining instant neural multi-track voice switching, isometric syllable synchronization, and dynamic subtitle orchestration, DubPilot turns foreign film watching into a fluid conversational experience. Viewers can switch languages, clarify idioms, and navigate scenes simply by speaking naturally to Alexa.*

- **Official Media Boilerplate (50 Words)**:  
  *DubPilot transforms global entertainment through an Alexa+ simulated agent and Amazon Bedrock models. It provides real-time multi-language voice dub switching, intelligent subtitle formatting, and contextual character recall with sub-120ms tool execution, connecting 1.5B+ multilingual viewers directly with global cinematic art.*

### Vocabulary Rules

| Never Say (AI Slop & Corporate Fluff) | Say Instead (Concrete Acoustic & Agentic Reality) |
| :--- | :--- |
| "Revolutionary AI dubbing" | "Isometric syllable-matched neural dubbing" |
| "Seamless user experience" | "Zero-latency track switching with playhead preservation" |
| "Delve into cinema" | "Conversational scene recall & cultural context" |
| "Game-changing solution" | "Multimodal voice agent with AWS Bedrock tool dispatch" |
| "Cutting-edge technology" | "EBU R128 audio mastering & Bedrock Claude 3.5 Sonnet agent" |

---

## 4. Visual Identity & Dual-Sphere Design System

DubPilot operates across two deliberate visual spheres:

1. **Sphere I: The Editorial Monograph (Venetian Gallery Mode)**  
   *Used for the brand showcase, public exhibitions, white papers, and design system presentations.*  
   Reads like a luxury printed architecture book: warm paper canvas, deep ink black, sand dividers, sharp 0px corners, and single-weight 400 typography spanning 14px to 250px. Zero box-shadows; depth is created purely by surface contrast.

2. **Sphere II: The Cinema Darkroom (Multimodal Studio Mode)**  
   *Used for the active video playback UI, audio stem mixer, and Alexa+ copilot interface.*  
   Optimized for dark cinematic viewing: deep onyx background (`#07090E`), Alexa Cyan (`#00CAEC`) accents, and tactile micro-animations.

### Color Tokens

| Token Name | Hex Code | HSL / RGB | Sphere Role & Semantic Purpose |
| :--- | :--- | :--- | :--- |
| `--color-canvas-beige` | `#E4E0DB` | `hsl(38, 12%, 88%)` | Monograph Page Canvas (warm paper tone) |
| `--color-ink-black` | `#0D0E13` | `hsl(230, 19%, 6%)` | Monograph Primary Text & Dark Frames |
| `--color-sand-border` | `#E0CCBB` | `hsl(28, 38%, 81%)` | Hairline dividers, table borders, icon strokes |
| `--color-warm-linen` | `#E6D7CA` | `hsl(27, 36%, 85%)` | Outlined action link borders & interactive states |
| `--color-steel-gray` | `#6E6E71` | `hsl(240, 1%, 44%)` | Monograph Secondary Text & De-emphasis |
| `--color-pure-white` | `#FFFFFF` | `hsl(0, 0%, 100%)` | Card surfaces, image bleeds, high-contrast text |
| `--color-footer-ink` | `#070707` | `hsl(0, 0%, 3%)` | Terminal dark surfaces |
| `--alexa-blue` | `#00CAEC` | `hsl(188, 100%, 46%)` | Cinema Mode Primary Voice Accent (Alexa Brand) |
| `--violet-primary` | `#7248EA` | `hsl(256, 79%, 60%)` | Bedrock AI Agent & Intelligence Accent |
| `--mint-accent` | `#00D4AA` | `hsl(168, 100%, 42%)` | Acoustic Dialogue Stem & Audio Ducking Indicator |
| `--bg-cinema-dark` | `#07090E` | `hsl(223, 33%, 4%)` | Cinema Darkroom Viewport Canvas |

### Typography Architecture

- **Primary Display & Headings**: *Lausanne / Inter*  
  - Weight: **Strictly 400** (Hierarchy achieved via extreme size jumps and negative tracking).
  - Display Scale: `250px` (tracking `-0.046em`, line-height `0.76`).
  - Section Headings: `144px` (tracking `-0.035em`, line-height `0.76`).
  - Subheadings: `24px` (tracking `-0.035em`, line-height `1.33`).
- **Running Prose & Body**:  
  - `16px` at `line-height: 1.50`, tracking `+0.006em`, max measure `520px`.
  - `14px` at `line-height: 1.88`, tracking `+0.007em`.
- **Tertiary Literary Counterpoint**: *Newsreader / Times New Roman*  
  - `16px` italic at `line-height: 1.85`, utilized for cinematic philosophy and cultural commentary.
- **Multilingual Vernacular Fonts**:
  - Devanagari: *Noto Sans Devanagari* (line-height: `1.80` expansion for matras).
  - Japanese: *Noto Sans JP*.

### Shape & Elevation Philosophy
- **Border Radius**: Sharp `0px` across cards, action links, images, and dividers.
- **Box Shadows**: `0px`. No drop-shadows or ambient blur. Depth is communicated solely through surface juxtaposition (pure white surfaces elevated against warm canvas beige, or dark overlays over golden photography).

---

## 5. Multi-Channel Touchpoints & Application Rules

### 1. The Monograph Exhibition Page (`/showcase` & `showcase.html`)
- Serves as the public manifesto and architectural proof of DubPilot.
- Highlights the intersection of spatial brutalist architecture, cinematic projection beams, and multilingual typography.
- Includes an interactive Type Scaler and Token Swatch verification inspector.

### 2. The Cinema Studio Viewport (`/` & `index.html`)
- Hosts the interactive video playback engine, multitrack audio switcher, and live Bedrock Converse tool feed.
- Audio collision prevention: Automatically silences voice synthesis when video is actively streaming dialogue.

### 3. Outlined Action Link (The Sole Interactive Button)
- Never use solid filled gradient buttons.
- Action link geometry: `1px solid var(--color-warm-linen)` border, `12px` vertical × `24px` horizontal padding, `16px` Lausanne/Inter text in `#0d0e13`.
- Hover transition: Border shifts crisply to `#0d0e13`.

---

## 6. Anti-Slop Brand Verification Checklist

- [x] Does the copy speak with concrete acoustic authority (mentioning EBU R128, syllable sync, multitrack stems, and Bedrock tools)?
- [x] Are all buttons non-filled, razor-edged (0px), and styled as outlined caption frames?
- [x] Is font weight strictly 400 across both 14px captions and 250px display headers?
- [x] Are drop-shadows and blur filters completely absent from the monograph layout?
- [x] Is the color palette strictly constrained to warm canvas beige, ink black, sand borders, and dark cinema tones?
- [x] Does Alexa+ silence its voice synthesis during active playback to prevent simultaneous dialogue collisions?
