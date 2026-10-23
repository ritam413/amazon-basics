# DubPilot — 3-Minute Conversational Demo Speech & Screen Choreography
> **Brand Voice Framework**: Master Craftsman + Cultured Sage | **Anti-Slop Certified**  
> **Format**: Conversational Ad Narrative with Exact Screen & Button Direction  
> **Target Audience**: Amazon Developer Hackathon 2026 Judges (Alexa+ Track & AWS Builder Challenge)  
> **Total Target Duration**: 3 Minutes (180 Seconds) | **Pacing**: 140 words/min with acoustic pauses

---

## The 10-Second Judge Hook Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│ [00:00 - 00:10] THE HOOK (JUDGES UNDERSTAND IN 10 SECONDS)             │
│ "How many times have you watched a masterwork in global cinema...      │
│  only to spend 90 minutes reading white text at the bottom of the     │
│  frame instead of looking at the actors' eyes?"                       │
│                                                                        │
│ ➔ Screen: Cinema Darkroom Studio (http://localhost:3000/)              │
│ ➔ Action: Video playing in original English, subtitles running         │
│ ➔ Takeaway: Subtitle split-attention deficit solved by DubPilot       │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Minute-by-Minute Master Choreography

### Act I: The Problem & The Voice Orb [00:00 – 00:35]
*Goal: Hook the judges in 10 seconds flat, establish the human friction, and awaken the Alexa+ copilot.*

| Time | Screen & Target URL | Exact Button / Action to Trigger | What the Screen Shows |
| :--- | :--- | :--- | :--- |
| **00:00 - 00:10** | **Cinema Darkroom Studio**<br>`http://localhost:3000/` | **Click:** `Play` button on video player | Video begins playing scene dialogue in original English. Subtitle bar active. Onyx black canvas (`#07090E`). |
| **00:10 - 00:25** | Same | **Hover:** Over the pulsating **Alexa Cyan Voice Orb** (`#00CAEC`) on the right-hand panel | Orb pulses with soft radial cyan glow (`0 0 30px rgba(0,202,236,0.3)`). Status indicator reads: *"Tap orb or say 'Alexa...'"* |
| **00:25 - 00:35** | Same | **Click:** Alexa Voice Orb or click the **"Switch to Hindi"** Quick Chip | Orb transitions to spinning cyan ring (`orbitRing`). Chat feed scrolls with user utterance: *"Alexa, switch audio to Hindi."* |

#### Spoken Script (Conversational Ad Tone)
> **[00:00 - 00:10]** *(Warm, intimate, direct eye contact with the judges)*  
> "How many times have you watched a masterwork in global cinema... only to spend 90 minutes reading white text at the bottom of the frame instead of looking at the actors' eyes?  
> That split-attention deficit breaks the magic of cinema. Cinema is humanity's shared visual language, but spoken dialogue still locks billions out.  
>
> **[00:10 - 00:25]** *(Leaning in slightly, conversational pace)*  
> What if you didn't have to choose between reading a translated script or suffering through robotic, desynchronized dubs? What if you could simply talk to your movie?  
>
> **[00:25 - 00:35]** *(Pointing towards the Alexa Cyan Voice Orb)*  
> Meet **DubPilot**—an agentic multimodal viewing copilot engineered for Alexa+ and powered by AWS Bedrock. Watch what happens when I ask Alexa to break the language wall in real time."

---

### Act II: Isometric Syllable Sync & Zero-Latency Track Switching [00:35 – 01:20]
*Goal: Showcase technical acoustic authority (EBU R128 loudness, playhead preservation, no syllable drift).*

| Time | Screen & Target URL | Exact Button / Action to Trigger | What the Screen Shows |
| :--- | :--- | :--- | :--- |
| **00:35 - 00:55** | **Cinema Darkroom Studio**<br>`http://localhost:3000/` | **Observe:** Audio track switches to Hindi instantly | Playhead stays at the exact millisecond (`currentTime` preserved). Spoken dialogue switches to fluent Hindi neural dub. Hindi Devanagari subtitles sync immediately. |
| **00:55 - 01:05** | Same | **Click:** **"Español"** language tab on the Multitrack Audio Bar (under video) | Audio switches to Spanish dialogue stem. Vocal timbre and emotional cadence match the actor. Dialogue Stem meter (`#00D4AA`) dances dynamically. |
| **01:05 - 01:20** | Same | **Point:** To the **Audio Stem Visualizer** (Dialogue vs. Background M&E) | Visualizer shows separate meters for Dialogue Stem (`1.0x`) and Music & Effects (`0.8x`). Dialogue ducks over ambient music with studio precision. |

#### Spoken Script
> **[00:35 - 00:55]** *(Enthusiastic yet steady)*  
> "Listen to that. Notice two critical things:  
> First—zero playback interruption. The playhead didn't reset, freeze, or stutter; it preserved the exact millisecond.  
> Second—this isn't generic synthetic text-to-speech. This is **isometric syllable synchronization**. The localized Hindi phrase matches the physical lip closures and vocal cadence of the original actor on screen.  
>
> **[00:55 - 01:20]** *(Clicking the Spanish tab, pausing 2 seconds to let audio breathe)*  
> Now let's switch to Spanish. *[Audio plays in Spanish]*.  
> Notice how the background music and Foley effects remain intact? Through our dynamic stem separator and EBU R128 loudness mastering, the dialogue bus ducks over the score with broadcast precision. The actor sounds authentic in Mumbai, Madrid, or Paris."

---

### Act III: Subtitle Orchestration & AWS Bedrock Tool Calling [01:20 – 02:05]
*Goal: Demonstrate the AI agent brain, sub-120ms tool execution, and contextual cultural recall.*

| Time | Screen & Target URL | Exact Button / Action to Trigger | What the Screen Shows |
| :--- | :--- | :--- | :--- |
| **01:20 - 01:40** | **Cinema Darkroom Studio**<br>`http://localhost:3000/` | **Click:** **"Make subtitles larger"** Quick Chip or type in chat bar | Telemetry card logs tool dispatch: `adjust_subtitles({ size: "large" })`. Subtitles on video viewport instantly expand to 24px with high-contrast backing. |
| **01:40 - 01:55** | Same | **Click:** Alexa Voice Orb and speak: *"Explain that cultural idiom"* | Bedrock Converse API triggers tool: `explain_cultural_context`. Alexa responds with contextual meaning of the phrase in the chat feed. |
| **01:55 - 02:05** | Same | **Inspect:** The **Live Bedrock Telemetry Card** (Violet `#7248EA` badge) | Telemetry card displays: Model `anthropic.claude-3-5-sonnet`, Tool `explain_cultural_context`, Latency `118ms`, Status `Executed (200 OK)`. |

#### Spoken Script
> **[01:20 - 01:40]** *(Conversational, sharing an insight)*  
> "Accessibility isn't one-size-fits-all. Some of us watch from across the living room couch; some of us are language learners.  
> If I say: *'Alexa, make the subtitles larger,'* watch the prompt feed.  
> Sub-120 milliseconds. The Bedrock agent identifies the intent, dispatches the `adjust_subtitles` schema, and re-renders the subtitle canvas with high-contrast legibility.  
>
> **[01:40 - 02:05]** *(Tapping the Bedrock Telemetry block)*  
> But cinema is more than words—it’s culture. When a foreign idiom flies by, you don't have to pause the film and Google it on your phone. You ask Alexa.  
> Right here in the Bedrock Telemetry block, you can see AWS Bedrock running Claude 3.5 Sonnet, analyzing the current scene timestamp, and translating cultural context into plain English—in under 120 milliseconds."

---

### Act IV: Collision-Free Audio Etiquette & Smart Playback Guard [02:05 – 02:35]
*Goal: Demonstrate deep UX craft—preventing Alexa voiceover and movie dialogue from colliding.*

| Time | Screen & Target URL | Exact Button / Action to Trigger | What the Screen Shows |
| :--- | :--- | :--- | :--- |
| **02:05 - 02:20** | **Cinema Darkroom Studio**<br>`http://localhost:3000/` | **Click:** **"Replay last line"** chip **while video is playing** | Video replays previous 5 seconds. Alexa's textual answer renders silently in the feed; **no Alexa voiceover plays** because movie audio is active. |
| **02:20 - 02:35** | Same | **Click:** `Pause` button on video, then ask: *"Who is speaking right now?"* | Video pauses. Alexa's voice synthesizes out loud with warm conversational clarity: *"That is the lead detective questioning the suspect."* |

#### Spoken Script
> **[02:05 - 02:20]** *(Lowering tone thoughtfully)*  
> "Now, here is the invisible engineering detail that sets DubPilot apart from every other AI demo you'll judge today: **Sonic Etiquette**.  
> The number one flaw in multimodal voice agents is audio collision. If you're watching a movie and Alexa starts loudly talking over the actor's dialogue, the immersion is destroyed.  
>
> **[02:20 - 02:35]** *(Smiling, demonstrating the pause)*  
> In DubPilot, our audio coordinator checks video velocity in real time. If the movie is playing dialogue, Alexa executes silent visual telemetry in the feed.  
> Only when you pause the film does Alexa speak aloud with natural conversational audio. It respects the sacred acoustic space of the cinema."

---

### Act V: The Brand Monograph & Final Hook [02:35 – 03:00]
*Goal: Showcase Sphere I (the Venetian editorial gallery monograph), brand craft, and close on an unforgettable line.*

| Time | Screen & Target URL | Exact Button / Action to Trigger | What the Screen Shows |
| :--- | :--- | :--- | :--- |
| **02:35 - 02:48** | **Click:** **"Brand Monograph →"** button in top header | Navigates to `/showcase` (`showcase.html`) | Full-bleed Venetian architectural gallery mode: Canvas Beige (`#E4E0DB`), Ink Black (`#0D0E13`), Lausanne 400 headline (250px), brutalist screening hall photo. |
| **02:48 - 02:55** | **Editorial Monograph**<br>`http://localhost:3000/showcase` | **Scroll down:** To the **Interactive Type Scaler & Token Swatches** | Slider smoothly scales headline from 14px to 250px. Zero drop-shadows; tactile architectural contrast. |
| **02:55 - 03:00** | Same | **Hold camera:** On the final brand manifesto quote: *"Cinema is humanity's shared visual language."* | Camera frames the centered brand closing statement and AWS Bedrock & Alexa+ badges. |

#### Spoken Script
> **[02:35 - 02:48]** *(Stepping back, speaking with architectural pride)*  
> "Finally, let's step into **Sphere I: The DubPilot Monograph**.  
> This isn't just an app—it's a comprehensive design system inspired by Venetian gallery architecture. Warm paper canvas, razor-sharp 0px geometry, and single-weight 400 typography that treats cinema localization with the dignity of fine art.  
>
> **[02:48 - 03:00]** *(Closing directly to the judges with warmth and conviction)*  
> For over a century, language has drawn borders around cinema.  
> With Amazon Alexa+ and AWS Bedrock, DubPilot erases those borders forever.  
> **Talk to your cinema. Hear every world.**  
> Thank you."

---

## 30-Second Emergency Elevator Version (If Running Out of Time)

> "How many times have you watched a great foreign film, only to spend the whole night reading subtitles instead of watching the actors?  
> **DubPilot** turns video watching into an active conversation on Alexa+ powered by AWS Bedrock.  
> Simply speak to switch between isometric syllable-synchronized dubs in Hindi, Spanish, or French—with zero playback interruption. Subtitles adapt dynamically, idioms are explained instantly, and our smart audio etiquette ensures Alexa never talks over the dialogue.  
> It’s conversational cinema. Boundless language. Running on Bedrock today."

---

## Technical & Brand Vocabulary Rules (What to Say vs. What to Avoid)

| ❌ NEVER SAY (Corporate AI Slop) | ✅ SAY INSTEAD (DubPilot Brand Reality) |
| :--- | :--- |
| *"Revolutionary AI dubbing"* | *"Isometric syllable-matched neural dubbing"* |
| *"Seamless user experience"* | *"Zero-latency track switching with playhead preservation"* |
| *"Delve into cinema"* | *"Conversational scene recall and cultural context"* |
| *"Game-changing AI solution"* | *"Multimodal voice agent with AWS Bedrock tool dispatch"* |
| *"Cutting-edge technology"* | *"EBU R128 audio mastering and Bedrock Claude 3.5 Sonnet agent"* |
