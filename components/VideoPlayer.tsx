'use client';

import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Play, Pause, Volume2, Film } from 'lucide-react';

export interface VideoPlayerRef {
  switchLanguage: (lang: string) => Promise<void>;
  seek: (seconds: number) => void;
  setSubtitleStyle: (options: { size?: string; high_contrast?: boolean; bilingual?: boolean }) => void;
  duckAudio: (level: number) => void;
  getState: () => { currentTime: number; duration: number; paused: boolean; currentLanguage: string };
}

interface SubtitleCue {
  start: number;
  end: number;
  text: string;
}

const MEDIA_SOURCES: Record<string, { video: string; subtitles: string; label: string }> = {
  en: { video: '/media/video.mp4', subtitles: '/media/subtitles_es.vtt', label: 'English (Orig)' },
  es: { video: '/media/video_es.mp4', subtitles: '/media/subtitles_es.vtt', label: 'Español' },
  hi: { video: '/media/video_hi.mp4', subtitles: '/media/subtitles_hi.vtt', label: 'हिन्दी' },
  fr: { video: '/media/video_fr.mp4', subtitles: '/media/subtitles_fr.vtt', label: 'Français' },
};

function parseVTT(vttText: string): SubtitleCue[] {
  const lines = vttText.split(/\r?\n/);
  const cues: SubtitleCue[] = [];
  let currentCue: SubtitleCue | null = null;

  function timeStrToSeconds(str: string): number {
    const parts = str.split(':');
    if (parts.length === 3) {
      return parseFloat(parts[0]) * 3600 + parseFloat(parts[1]) * 60 + parseFloat(parts[2]);
    } else if (parts.length === 2) {
      return parseFloat(parts[0]) * 60 + parseFloat(parts[1]);
    }
    return 0;
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line === 'WEBVTT') continue;

    if (line.includes('-->')) {
      const [startStr, endStr] = line.split('-->').map((s) => s.trim());
      currentCue = {
        start: timeStrToSeconds(startStr),
        end: timeStrToSeconds(endStr),
        text: '',
      };
    } else if (currentCue) {
      if (/^\d+$/.test(line)) continue;
      currentCue.text += (currentCue.text ? ' ' : '') + line;
      if (i === lines.length - 1 || !lines[i + 1].trim()) {
        cues.push(currentCue);
        currentCue = null;
      }
    }
  }
  return cues;
}

function formatTime(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

const VideoPlayer = forwardRef<VideoPlayerRef, { onLanguageChange?: (lang: string) => void }>((props, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);

  const [currentLang, setCurrentLang] = useState<string>('en');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [cues, setCues] = useState<SubtitleCue[]>([]);
  const [activeCueText, setActiveCueText] = useState<string>('');
  const [subtitleSize, setSubtitleSize] = useState<'normal' | 'large'>('normal');
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);
  const [dialogueVolume, setDialogueVolume] = useState<number>(1.0);
  const [bgVolume, setBgVolume] = useState<number>(0.8);

  // Load subtitles whenever language changes
  useEffect(() => {
    async function loadSubs() {
      const subUrl = MEDIA_SOURCES[currentLang]?.subtitles || '/media/subtitles_es.vtt';
      try {
        const res = await fetch(subUrl);
        const text = await res.text();
        const parsed = parseVTT(text);
        setCues(parsed);
      } catch (err) {
        console.error('Failed to load subtitles:', err);
      }
    }
    loadSubs();
  }, [currentLang]);

  // Imperative handle for parent / Alexa Agent
  useImperativeHandle(ref, () => ({
    async switchLanguage(lang: string) {
      if (!MEDIA_SOURCES[lang] || !videoRef.current) return;
      const vid = videoRef.current;
      const playhead = vid.currentTime;
      const wasPlaying = !vid.paused;

      setCurrentLang(lang);
      vid.src = MEDIA_SOURCES[lang].video;
      vid.currentTime = playhead;

      vid.onloadeddata = () => {
        vid.currentTime = playhead;
        if (wasPlaying) {
          vid.play().catch(() => {});
        }
      };
      if (props.onLanguageChange) {
        props.onLanguageChange(lang);
      }
    },
    seek(seconds: number) {
      if (videoRef.current) {
        videoRef.current.currentTime = seconds;
        setCurrentTime(seconds);
      }
    },
    setSubtitleStyle(options) {
      if (options.size === 'large') setSubtitleSize('large');
      if (options.size === 'normal') setSubtitleSize('normal');
      if (options.high_contrast !== undefined) setIsHighContrast(options.high_contrast);
    },
    duckAudio(level: number) {
      setBgVolume(0.3);
    },
    getState() {
      return {
        currentTime: videoRef.current?.currentTime || 0,
        duration: videoRef.current?.duration || 0,
        paused: videoRef.current ? videoRef.current.paused : true,
        currentLanguage: currentLang,
      };
    },
  }));

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const onTimeUpdate = () => {
    if (!videoRef.current) return;
    const ct = videoRef.current.currentTime;
    setCurrentTime(ct);

    const match = cues.find((c) => ct >= c.start && ct <= c.end);
    setActiveCueText(match ? match.text : '');
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = val;
      setCurrentTime(val);
    }
  };

  return (
    <section className="video-stage-card">
      <div className="card-header-bar">
        <div className="card-title-group">
          <h2>
            <Film style={{ width: 18, height: 18, color: 'var(--alexa-blue)' }} />
            Multimodal Cinema Viewport
          </h2>
          <p>Real-time multilingual dubbed playback with synchronized speech & captions</p>
        </div>

        {/* Language selector chips */}
        <div className="lang-selector-group">
          {Object.entries(MEDIA_SOURCES).map(([code, meta]) => (
            <button
              key={code}
              className={`lang-chip ${currentLang === code ? 'active' : ''}`}
              onClick={() => {
                if (ref && 'current' in ref && ref.current) {
                  ref.current.switchLanguage(code);
                }
              }}
            >
              {meta.label}
            </button>
          ))}
        </div>
      </div>

      {/* Video Viewport */}
      <div className="video-viewport" onClick={togglePlay}>
        <video
          ref={videoRef}
          src={MEDIA_SOURCES[currentLang]?.video || '/media/video.mp4'}
          playsInline
          preload="auto"
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={() => {
            if (videoRef.current) setDuration(videoRef.current.duration || 0);
          }}
          onPlay={() => {
            setIsPlaying(true);
            if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
              window.speechSynthesis.cancel();
            }
          }}
          onPause={() => setIsPlaying(false)}
        />

        {/* Subtitle HUD */}
        {activeCueText && (
          <div className="subtitle-hud">
            <span
              className={`subtitle-text ${subtitleSize === 'large' ? 'large' : ''}`}
              style={{
                background: isHighContrast ? 'rgba(0, 0, 0, 0.95)' : 'rgba(0, 0, 0, 0.82)',
                border: isHighContrast ? '2px solid #00CAEC' : '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {activeCueText}
            </span>
          </div>
        )}
      </div>

      {/* Video Controls Bar */}
      <div className="player-controls-bar">
        <button className="control-btn" onClick={togglePlay} title={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? (
            <Pause style={{ width: 18, height: 18, fill: 'currentColor' }} />
          ) : (
            <Play style={{ width: 18, height: 18, fill: 'currentColor' }} />
          )}
        </button>

        <div className="timeline-slider-wrapper">
          <input
            type="range"
            className="timeline-slider"
            min={0}
            max={duration || 100}
            step={0.1}
            value={currentTime}
            onChange={handleSeekChange}
          />
        </div>

        <span className="time-stamp-display">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>

        <Volume2 style={{ width: 16, height: 16, color: 'var(--text-muted)' }} />
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          defaultValue={1}
          style={{ width: 70 }}
          onChange={(e) => {
            if (videoRef.current) videoRef.current.volume = parseFloat(e.target.value);
          }}
          title="Master Volume"
        />
      </div>

      {/* Multitrack Stem Audio Mixer */}
      <div className="audio-mixer-strip">
        <div className="stem-channel">
          <div className="stem-label-row">
            <span>Dialogue Bus</span>
            <span>{dialogueVolume.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            className="stem-slider"
            min={0}
            max={1.5}
            step={0.05}
            value={dialogueVolume}
            onChange={(e) => setDialogueVolume(parseFloat(e.target.value))}
          />
        </div>

        <div className="stem-channel">
          <div className="stem-label-row">
            <span>Music & Effects (M&E)</span>
            <span>{bgVolume.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            className="stem-slider"
            min={0}
            max={1}
            step={0.05}
            value={bgVolume}
            onChange={(e) => setBgVolume(parseFloat(e.target.value))}
          />
        </div>

        <div className="stem-channel">
          <div className="stem-label-row">
            <span>Sidechain Ducking</span>
            <span style={{ color: 'var(--mint-accent)' }}>-6 dB</span>
          </div>
          <input type="range" className="stem-slider" min={-18} max={0} step={1} defaultValue={-6} disabled />
        </div>
      </div>

      {/* Interactive Script Transcript */}
      <div className="transcript-card">
        <div className="transcript-header">
          <span>Interactive Script Transcript (Click line to jump)</span>
          <span style={{ fontSize: '0.72rem', color: 'var(--alexa-blue)' }}>Faster-Whisper Checkpoint</span>
        </div>
        <div className="transcript-scroll-area" ref={transcriptRef}>
          {cues.map((cue, idx) => {
            const isActive = currentTime >= cue.start && currentTime <= cue.end;
            return (
              <div
                key={idx}
                className={`dialogue-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = cue.start;
                    setCurrentTime(cue.start);
                  }
                }}
              >
                <span className="dialogue-time">{formatTime(cue.start)}</span>
                <span className="dialogue-text">{cue.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

VideoPlayer.displayName = 'VideoPlayer';
export default VideoPlayer;
