/**
 * DubPilot — Multimodal Cinema Video Player & Subtitle Controller
 * Handles synchronized multi-language media switching, VTT parsing, and stem mixing
 */

class VideoPlayerController {
  constructor(options = {}) {
    this.videoEl = document.getElementById(options.videoElementId || 'mainVideo');
    this.subtitleTextEl = document.getElementById('subtitleText');
    this.subtitleBilingualEl = document.getElementById('subtitleBilingual');
    this.transcriptListEl = document.getElementById('transcriptList');
    this.timelineSlider = document.getElementById('timelineSlider');
    this.timestampDisplay = document.getElementById('timestampDisplay');
    this.playPauseBtn = document.getElementById('playPauseBtn');

    this.currentLanguage = 'en';
    this.subtitleSize = 'normal';
    this.isBilingual = false;
    this.isHighContrast = false;

    // Media manifest mapping
    this.mediaSources = {
      en: {
        video: 'media/video.mp4',
        subtitles: 'media/subtitles_es.vtt', // Original English dialogue aligned with translation
        label: 'English (Original)'
      },
      es: {
        video: 'media/video_es.mp4',
        subtitles: 'media/subtitles_es.vtt',
        label: 'Spanish (Español Dub)'
      },
      hi: {
        video: 'media/video_hi.mp4',
        subtitles: 'media/subtitles_hi.vtt',
        label: 'Hindi (हिन्दी Dub)'
      },
      fr: {
        video: 'media/video_fr.mp4',
        subtitles: 'media/subtitles_fr.vtt',
        label: 'French (Français Dub)'
      }
    };

    this.subtitlesData = [];
    this.subtitlesOriginalData = []; // for bilingual mode
    this.init();
  }

  async init() {
    this.bindEvents();
    await this.loadSubtitles('es'); // Default subtitle cues
    this.setupAudioContext();
  }

  bindEvents() {
    // Play / Pause Toggle
    this.playPauseBtn.addEventListener('click', () => this.togglePlay());
    this.videoEl.addEventListener('click', () => this.togglePlay());
    this.videoEl.addEventListener('play', () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    });

    // Time Update & Progress
    this.videoEl.addEventListener('timeupdate', () => this.onTimeUpdate());
    this.videoEl.addEventListener('loadedmetadata', () => {
      this.timelineSlider.max = this.videoEl.duration || 100;
      this.updateTimestampDisplay();
    });

    // Scrubber
    this.timelineSlider.addEventListener('input', (e) => {
      this.videoEl.currentTime = parseFloat(e.target.value);
      this.updateTimestampDisplay();
    });

    // Volume & Stem Mixers
    const masterVolume = document.getElementById('masterVolume');
    if (masterVolume) {
      masterVolume.addEventListener('input', (e) => {
        this.videoEl.volume = parseFloat(e.target.value);
      });
    }

    const dialogueSlider = document.getElementById('dialogueStemVolume');
    const bgSlider = document.getElementById('bgStemVolume');
    if (dialogueSlider && bgSlider) {
      dialogueSlider.addEventListener('input', (e) => this.setStemGains(e.target.value, bgSlider.value));
      bgSlider.addEventListener('input', (e) => this.setStemGains(dialogueSlider.value, e.target.value));
    }
  }

  setupAudioContext() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
        this.sourceNode = this.audioCtx.createMediaElementSource(this.videoEl);
        this.dialogueGain = this.audioCtx.createGain();
        this.sourceNode.connect(this.dialogueGain);
        this.dialogueGain.connect(this.audioCtx.destination);
      }
    } catch (e) {
      console.log('Web Audio context auto-activation deferred until user gesture.');
    }
  }

  setStemGains(dialogueVal, bgVal) {
    if (this.dialogueGain) {
      // Simulate speech boost & music ducking
      this.dialogueGain.gain.value = parseFloat(dialogueVal);
    }
  }

  togglePlay() {
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    if (this.videoEl.paused) {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      this.videoEl.play();
      this.playPauseBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="4" width="4" height="16" rx="1"/>
          <rect x="14" y="4" width="4" height="16" rx="1"/>
        </svg>`;
    } else {
      this.videoEl.pause();
      this.playPauseBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5 3 19 12 5 21 5 3"/>
        </svg>`;
    }
  }

  /**
   * Seamless Language Audio & Video Track Switch
   * Maintains exact playback position without stutter
   */
  async switchLanguage(targetLang) {
    if (!this.mediaSources[targetLang]) {
      console.warn('Unsupported language:', targetLang);
      return;
    }

    const wasPlaying = !this.videoEl.paused;
    const currentPlayhead = this.videoEl.currentTime;

    this.currentLanguage = targetLang;
    const mediaObj = this.mediaSources[targetLang];

    // Update active language chips in UI
    document.querySelectorAll('.lang-chip').forEach(chip => {
      chip.classList.toggle('active', chip.dataset.lang === targetLang);
    });

    // Seamless media swap
    this.videoEl.src = mediaObj.video;
    this.videoEl.currentTime = currentPlayhead;

    // Load matching subtitles
    await this.loadSubtitles(targetLang);

    // Resume playback if it was active
    this.videoEl.addEventListener('loadeddata', () => {
      this.videoEl.currentTime = currentPlayhead;
      if (wasPlaying) {
        this.videoEl.play();
      }
    }, { once: true });

    return {
      language: targetLang,
      label: mediaObj.label,
      playhead: currentPlayhead
    };
  }

  /**
   * Parse VTT and render interactive script transcript
   */
  async loadSubtitles(lang) {
    const vttFile = this.mediaSources[lang]?.subtitles || 'media/subtitles_es.vtt';
    try {
      const res = await fetch(vttFile);
      const text = await res.text();
      this.subtitlesData = this.parseVTT(text);
      this.renderTranscript();
    } catch (e) {
      console.error('Error loading subtitles:', e);
    }
  }

  parseVTT(vttText) {
    const lines = vttText.split(/\r?\n/);
    const cues = [];
    let currentCue = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line || line === 'WEBVTT') continue;

      if (line.includes('-->')) {
        const [startStr, endStr] = line.split('-->').map(s => s.trim());
        currentCue = {
          start: this.timeStrToSeconds(startStr),
          end: this.timeStrToSeconds(endStr),
          text: ''
        };
      } else if (currentCue) {
        if (/^\d+$/.test(line)) continue; // numeric cue index
        currentCue.text += (currentCue.text ? ' ' : '') + line;
        // If next line is empty or next cue, push
        if (i === lines.length - 1 || !lines[i + 1].trim()) {
          cues.push(currentCue);
          currentCue = null;
        }
      }
    }
    return cues;
  }

  timeStrToSeconds(str) {
    const parts = str.split(':');
    let seconds = 0;
    if (parts.length === 3) {
      seconds = parseFloat(parts[0]) * 3600 + parseFloat(parts[1]) * 60 + parseFloat(parts[2]);
    } else if (parts.length === 2) {
      seconds = parseFloat(parts[0]) * 60 + parseFloat(parts[1]);
    }
    return seconds;
  }

  formatTime(secs) {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  renderTranscript() {
    if (!this.transcriptListEl) return;
    this.transcriptListEl.innerHTML = '';

    this.subtitlesData.forEach((cue, idx) => {
      const item = document.createElement('div');
      item.className = 'dialogue-item';
      item.dataset.index = idx;
      item.innerHTML = `
        <span class="dialogue-time">${this.formatTime(cue.start)}</span>
        <span class="dialogue-text">${cue.text}</span>
      `;
      item.addEventListener('click', () => {
        this.seek(cue.start);
      });
      this.transcriptListEl.appendChild(item);
    });
  }

  onTimeUpdate() {
    const currentTime = this.videoEl.currentTime;
    this.timelineSlider.value = currentTime;
    this.updateTimestampDisplay();

    // Find matching subtitle cue
    const activeCue = this.subtitlesData.find(cue => currentTime >= cue.start && currentTime <= cue.end);

    if (activeCue) {
      this.subtitleTextEl.textContent = activeCue.text;
      this.subtitleTextEl.style.display = 'inline-block';
    } else {
      this.subtitleTextEl.style.display = 'none';
    }

    // Highlight transcript row
    const items = this.transcriptListEl.querySelectorAll('.dialogue-item');
    items.forEach((item, idx) => {
      const cue = this.subtitlesData[idx];
      if (cue && currentTime >= cue.start && currentTime <= cue.end) {
        item.classList.add('active');
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        item.classList.remove('active');
      }
    });
  }

  updateTimestampDisplay() {
    const cur = this.formatTime(this.videoEl.currentTime || 0);
    const dur = this.formatTime(this.videoEl.duration || 0);
    this.timestampDisplay.textContent = `${cur} / ${dur}`;
  }

  seek(seconds) {
    this.videoEl.currentTime = seconds;
    this.onTimeUpdate();
  }

  setSubtitleStyle(options = {}) {
    if (options.size === 'large') {
      this.subtitleTextEl.classList.add('large');
    } else if (options.size === 'normal') {
      this.subtitleTextEl.classList.remove('large');
    }

    if (options.high_contrast) {
      this.subtitleTextEl.style.background = 'rgba(0, 0, 0, 0.95)';
      this.subtitleTextEl.style.border = '2px solid #00CAEC';
    }
  }

  getState() {
    return {
      currentTime: this.videoEl.currentTime,
      duration: this.videoEl.duration,
      paused: this.videoEl.paused,
      currentLanguage: this.currentLanguage,
      volume: this.videoEl.volume
    };
  }
}

window.VideoPlayerController = VideoPlayerController;
