/**
 * DubPilot — Alexa+ Multimodal Voice Agent Controller
 * Connects Speech Recognition, Amazon Bedrock Tool-Calling, and Video Player Actions
 */

class AlexaAgent {
  constructor(playerController, bedrockService) {
    this.player = playerController;
    this.bedrock = bedrockService;

    this.orbContainer = document.getElementById('alexaOrbContainer');
    this.orbStatus = document.getElementById('orbStatus');
    this.chatInput = document.getElementById('chatInput');
    this.sendBtn = document.getElementById('sendBtn');
    this.micBtn = document.getElementById('micToggleBtn');
    this.conversationFeed = document.getElementById('conversationFeed');

    this.isListening = false;
    this.synth = window.speechSynthesis;
    this.recognition = null;

    this.initSpeechRecognition();
    this.bindEvents();
  }

  initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';

      this.recognition.onstart = () => {
        this.isListening = true;
        this.setOrbState('listening', 'Listening for Alexa+ command...');
      };

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        this.chatInput.value = transcript;
        this.handleUserPrompt(transcript);
      };

      this.recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        this.setOrbState('idle', 'Ready for command');
      };

      this.recognition.onend = () => {
        this.isListening = false;
      };
    } else {
      console.log('Web Speech Recognition not supported in this browser. Voice input fallback to text.');
    }
  }

  bindEvents() {
    // Push-to-talk on Orb and Mic button
    if (this.orbContainer) {
      this.orbContainer.addEventListener('click', () => this.toggleListening());
    }
    if (this.micBtn) {
      this.micBtn.addEventListener('click', () => this.toggleListening());
    }

    // Chat text input submit
    if (this.sendBtn && this.chatInput) {
      this.sendBtn.addEventListener('click', () => {
        const val = this.chatInput.value.trim();
        if (val) {
          this.handleUserPrompt(val);
          this.chatInput.value = '';
        }
      });

      this.chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const val = this.chatInput.value.trim();
          if (val) {
            this.handleUserPrompt(val);
            this.chatInput.value = '';
          }
        }
      });
    }

    // Quick Prompt Chips
    document.querySelectorAll('.prompt-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const prompt = chip.dataset.prompt || chip.textContent.trim();
        this.handleUserPrompt(prompt);
      });
    });
  }

  toggleListening() {
    if (!this.recognition) {
      alert('Speech Recognition is unavailable in this browser. Please type in the chat bar below!');
      return;
    }

    if (this.isListening) {
      this.recognition.stop();
      this.isListening = false;
      this.setOrbState('idle', 'Ready');
    } else {
      try {
        this.recognition.start();
      } catch (e) {
        console.warn(e);
      }
    }
  }

  setOrbState(state, text) {
    if (!this.orbContainer) return;
    this.orbContainer.className = 'alexa-orb-container ' + state;
    if (this.orbStatus) {
      this.orbStatus.textContent = text;
    }
  }

  /**
   * Main conversational turn
   */
  async handleUserPrompt(userText) {
    // 1. Add user message bubble
    this.appendMessage('user', userText);

    // 2. Animate orb to Thinking
    this.setOrbState('thinking', 'Bedrock Agent Reasoning...');

    // 3. Invoke Bedrock Agent
    const videoState = this.player.getState();
    const agentResult = await this.bedrock.converse(userText, videoState);

    // 4. Dispatch Tool Actions to Video Player
    let toolExecutionStatus = 'NO_TOOL_INVOKED';
    if (agentResult.toolCall) {
      toolExecutionStatus = await this.executeToolCall(agentResult.toolCall);
    }

    // 5. Speak Alexa Voice Response ONLY if video is paused (do not speak simultaneously)
    const isVideoPlaying = this.player && this.player.videoEl && !this.player.videoEl.paused;
    if (!isVideoPlaying) {
      this.setOrbState('speaking', 'Alexa+ speaking...');
      this.speakVoice(agentResult.spokenResponse);
    } else {
      if (this.synth) this.synth.cancel();
      this.setOrbState('idle', 'Alexa+ Ready');
    }

    // 6. Add Alexa message bubble with Telemetry Block
    this.appendMessage('alexa', agentResult.spokenResponse, {
      toolCall: agentResult.toolCall,
      reasoning: agentResult.reasoning,
      latencyMs: agentResult.latencyMs,
      model: agentResult.model,
      status: toolExecutionStatus
    });

    // Reset to idle after voice finishes (or 2.5s fallback)
    setTimeout(() => {
      if (!this.synth || !this.synth.speaking) {
        this.setOrbState('idle', 'Alexa+ Ready');
      }
    }, 2500);
  }

  async executeToolCall(toolCall) {
    const { name, parameters } = toolCall;

    switch (name) {
      case 'switch_language':
        await this.player.switchLanguage(parameters.language);
        return 'SUCCESS: AUDIO_TRACK_SWITCHED';

      case 'seek_segment':
        this.player.seek(parameters.timestamp_seconds);
        return 'SUCCESS: PLAYHEAD_SEEKED';

      case 'adjust_subtitles':
        this.player.setSubtitleStyle(parameters);
        return 'SUCCESS: SUBTITLES_ADJUSTED';

      case 'duck_background_audio':
        const bgStemVolume = document.getElementById('bgStemVolume');
        if (bgStemVolume) {
          bgStemVolume.value = '0.3';
          this.player.setStemGains(1.0, 0.3);
        }
        return 'SUCCESS: AUDIO_DUCKED_-6DB';

      case 'explain_cultural_context':
        return 'SUCCESS: CONTEXT_RETRIEVED';

      default:
        console.warn('Unknown tool call:', name);
        return 'UNKNOWN_TOOL';
    }
  }

  speakVoice(text) {
    // If the video is actively playing, don't create voiceover so they don't speak simultaneously
    if (this.player && this.player.videoEl && !this.player.videoEl.paused) {
      if (this.synth) this.synth.cancel();
      this.setOrbState('idle', 'Alexa+ Ready');
      return;
    }

    if (!this.synth) return;
    this.synth.cancel(); // stop any active speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    // Pick a high-quality natural voice if available
    const voices = this.synth.getVoices();
    const naturalVoice = voices.find(v => v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Victoria'));
    if (naturalVoice) {
      utterance.voice = naturalVoice;
    }

    utterance.onend = () => {
      this.setOrbState('idle', 'Alexa+ Ready');
    };

    utterance.onerror = () => {
      this.setOrbState('idle', 'Alexa+ Ready');
    };

    this.synth.speak(utterance);
  }

  appendMessage(sender, text, telemetry = null) {
    if (!this.conversationFeed) return;

    const bubble = document.createElement('div');
    bubble.className = `message-bubble ${sender}`;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const meta = document.createElement('div');
    meta.className = 'message-meta';
    meta.textContent = sender === 'user' ? `You · ${time}` : `Alexa+ · Amazon Bedrock · ${time}`;

    const content = document.createElement('div');
    content.textContent = text;

    bubble.appendChild(meta);
    bubble.appendChild(content);

    // If telemetry exists, append structured debug block
    if (telemetry && telemetry.toolCall) {
      const telemetryBox = document.createElement('div');
      telemetryBox.className = 'tool-telemetry-box';
      telemetryBox.innerHTML = `
        <div class="telemetry-header">
          <span>⚡ TOOL_USE: ${telemetry.toolCall.name}()</span>
          <span>${telemetry.latencyMs}ms [${telemetry.status}]</span>
        </div>
        <div><strong>Parameters:</strong> ${JSON.stringify(telemetry.toolCall.parameters)}</div>
        <div><strong>Bedrock Thought:</strong> ${telemetry.reasoning}</div>
      `;
      bubble.appendChild(telemetryBox);
    }

    this.conversationFeed.appendChild(bubble);
    this.conversationFeed.scrollTop = this.conversationFeed.scrollHeight;
  }
}

window.AlexaAgent = AlexaAgent;
