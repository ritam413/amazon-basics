'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mic, Send, Zap } from 'lucide-react';
import { VideoPlayerRef } from './VideoPlayer';

interface Message {
  id: string;
  sender: 'user' | 'alexa';
  text: string;
  time: string;
  telemetry?: {
    toolCall?: { name: string; parameters: Record<string, any> };
    reasoning?: string;
    latencyMs?: number;
    model?: string;
    status?: string;
  };
}

interface AlexaCopilotProps {
  playerRef: React.RefObject<VideoPlayerRef>;
  selectedModel: string;
  useLiveProxy: boolean;
}

export default function AlexaCopilot({ playerRef, selectedModel, useLiveProxy }: AlexaCopilotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'alexa',
      text: "Hello! I'm your Multimodal Localization Copilot on Alexa+. You can speak to me or type commands to switch dubbing languages, control subtitles, replay lines, or ask about the video.",
      time: 'Ready',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [orbState, setOrbState] = useState<'idle' | 'listening' | 'thinking' | 'speaking'>('idle');
  const [orbStatusText, setOrbStatusText] = useState('Tap orb or say "Alexa..."');

  const recognitionRef = useRef<any>(null);
  const feedEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll chat feed on new messages
    feedEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Setup Web Speech Recognition
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recog = new SpeechRecognition();
        recog.continuous = false;
        recog.interimResults = false;
        recog.lang = 'en-US';

        recog.onstart = () => {
          setOrbState('listening');
          setOrbStatusText('Listening for Alexa+ command...');
        };

        recog.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          handlePrompt(transcript);
        };

        recog.onerror = (e: any) => {
          console.warn('Speech recognition error:', e);
          setOrbState('idle');
          setOrbStatusText('Tap orb or say "Alexa..."');
        };

        recog.onend = () => {
          if (orbState === 'listening') {
            setOrbState('idle');
            setOrbStatusText('Tap orb or say "Alexa..."');
          }
        };

        recognitionRef.current = recog;
      }
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech Recognition is unavailable in this browser. Please type in the chat bar below!');
      return;
    }

    if (orbState === 'listening') {
      recognitionRef.current.stop();
      setOrbState('idle');
      setOrbStatusText('Ready');
    } else {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const speakVoice = (text: string) => {
    // If the video is actively playing, don't create voiceover so they don't speak simultaneously
    const isVideoPlaying = playerRef.current ? !playerRef.current.getState().paused : false;
    if (isVideoPlaying) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setOrbState('idle');
      setOrbStatusText('Alexa+ Ready');
      return;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const naturalVoice = voices.find(
        (v) => v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')
      );
      if (naturalVoice) utterance.voice = naturalVoice;

      utterance.onend = () => {
        setOrbState('idle');
        setOrbStatusText('Alexa+ Ready');
      };

      utterance.onerror = () => {
        setOrbState('idle');
        setOrbStatusText('Alexa+ Ready');
      };

      setOrbState('speaking');
      setOrbStatusText('Alexa+ speaking...');
      window.speechSynthesis.speak(utterance);
    }
  };

  const handlePrompt = async (prompt: string) => {
    if (!prompt.trim()) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    // 1. Add user message
    const userMsg: Message = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: prompt,
      time: timeStr,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // 2. Animate orb to thinking
    setOrbState('thinking');
    setOrbStatusText('Bedrock Agent Reasoning...');

    // 3. Call Bedrock Route Handler
    const videoState = playerRef.current ? playerRef.current.getState() : {};
    let data;
    try {
      const res = await fetch('/api/bedrock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          modelId: selectedModel,
          videoState,
          useLiveProxy,
        }),
      });
      data = await res.json();
    } catch (err) {
      data = {
        spokenResponse: 'I encountered an error connecting to Amazon Bedrock.',
        reasoning: 'API Route error',
        latencyMs: 120,
      };
    }

    // 4. Dispatch tool call to Video Player
    let toolStatus = 'NO_TOOL_INVOKED';
    if (data.toolCall && playerRef.current) {
      const { name, parameters } = data.toolCall;
      if (name === 'switch_language') {
        await playerRef.current.switchLanguage(parameters.language);
        toolStatus = 'SUCCESS: AUDIO_TRACK_SWITCHED';
      } else if (name === 'seek_segment') {
        playerRef.current.seek(parameters.timestamp_seconds);
        toolStatus = 'SUCCESS: PLAYHEAD_SEEKED';
      } else if (name === 'adjust_subtitles') {
        playerRef.current.setSubtitleStyle(parameters);
        toolStatus = 'SUCCESS: SUBTITLES_ADJUSTED';
      } else if (name === 'duck_background_audio') {
        playerRef.current.duckAudio(-6);
        toolStatus = 'SUCCESS: AUDIO_DUCKED_-6DB';
      } else if (name === 'explain_cultural_context') {
        toolStatus = 'SUCCESS: CONTEXT_RETRIEVED';
      }
    }

    // 5. Speak voice response ONLY if video is paused (prevent simultaneous speech)
    const isVideoPlaying = playerRef.current ? !playerRef.current.getState().paused : false;
    if (!isVideoPlaying) {
      speakVoice(data.spokenResponse);
    } else {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setOrbState('idle');
      setOrbStatusText('Alexa+ Ready');
    }

    // 6. Add Alexa message with telemetry
    const alexaMsg: Message = {
      id: 'msg-' + (Date.now() + 1),
      sender: 'alexa',
      text: data.spokenResponse,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      telemetry: {
        toolCall: data.toolCall,
        reasoning: data.reasoning,
        latencyMs: data.latencyMs,
        model: data.model || selectedModel,
        status: toolStatus,
      },
    };
    setMessages((prev) => [...prev, alexaMsg]);
  };

  return (
    <section className="alexa-copilot-card">
      {/* Alexa Orb */}
      <div className="alexa-presence-wrapper">
        <div
          className={`alexa-orb-container ${orbState}`}
          onClick={toggleListening}
          title="Click to talk to Alexa+"
        >
          <div className="alexa-ring-animation"></div>
          <div className="alexa-orb">
            <Mic style={{ width: 32, height: 32, color: '#fff' }} />
          </div>
        </div>
        <div className="orb-status-text">{orbStatusText}</div>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="quick-prompt-ribbon">
        <button className="prompt-chip" onClick={() => handlePrompt('Switch to Hindi audio')}>
          🗣️ Switch to Hindi
        </button>
        <button className="prompt-chip" onClick={() => handlePrompt('Cambiar a Español')}>
          🇪🇸 Cambiar a Español
        </button>
        <button className="prompt-chip" onClick={() => handlePrompt('Replay that last line')}>
          ⏪ Replay last line
        </button>
        <button className="prompt-chip" onClick={() => handlePrompt('Make the subtitles larger')}>
          🔤 Make subtitles larger
        </button>
        <button className="prompt-chip" onClick={() => handlePrompt('Duck background music by 6dB')}>
          🎚️ Duck background music
        </button>
        <button className="prompt-chip" onClick={() => handlePrompt('Who is Afan Mustafa in this video?')}>
          💡 Who is in this clip?
        </button>
      </div>

      {/* Conversation Feed */}
      <div className="conversation-feed">
        {messages.map((m) => (
          <div key={m.id} className={`message-bubble ${m.sender}`}>
            <div className="message-meta">
              {m.sender === 'user' ? `You · ${m.time}` : `Alexa+ · Amazon Bedrock · ${m.time}`}
            </div>
            <div>{m.text}</div>

            {m.telemetry && m.telemetry.toolCall && (
              <div className="tool-telemetry-box">
                <div className="telemetry-header">
                  <span>⚡ TOOL_USE: {m.telemetry.toolCall.name}()</span>
                  <span>
                    {m.telemetry.latencyMs}ms [{m.telemetry.status}]
                  </span>
                </div>
                <div>
                  <strong>Parameters:</strong> {JSON.stringify(m.telemetry.toolCall.parameters)}
                </div>
                <div>
                  <strong>Bedrock Thought:</strong> {m.telemetry.reasoning}
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={feedEndRef} />
      </div>

      {/* Input Bar */}
      <div className="chat-input-bar">
        <input
          type="text"
          className="chat-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handlePrompt(inputText);
          }}
          placeholder="Ask Alexa+ (e.g. 'Switch to Spanish audio', 'Make subtitles bigger')..."
        />
        <button className="mic-toggle-btn" onClick={toggleListening} title="Speak to Alexa+">
          <Mic style={{ width: 20, height: 20 }} />
        </button>
        <button
          className="control-btn"
          onClick={() => handlePrompt(inputText)}
          style={{ background: 'var(--violet-primary)', borderRadius: 'var(--radius-md)', width: 42, height: 42 }}
          title="Send"
        >
          <Send style={{ width: 18, height: 18 }} />
        </button>
      </div>
    </section>
  );
}
