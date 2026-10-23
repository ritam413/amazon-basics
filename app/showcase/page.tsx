'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import './exo-ape.css';

export default function DubPilotShowcase() {
  const [scaleSize, setScaleSize] = useState<number>(144);
  const [scaleText, setScaleText] = useState<string>('DUBPILOT');

  const palette = [
    { name: 'Canvas Beige', hex: '#e4e0db', role: 'Monograph page canvas & bands' },
    { name: 'Ink Black', hex: '#0d0e13', role: 'Primary text & dark frames' },
    { name: 'Sand Border', hex: '#e0ccbb', role: 'Hairline structural dividers' },
    { name: 'Warm Linen', hex: '#e6d7ca', role: 'Outlined action borders' },
    { name: 'Steel Gray', hex: '#6e6e71', role: 'Secondary body text' },
    { name: 'Pure White', hex: '#ffffff', role: 'Surfaces & image bleeds' },
    { name: 'Footer Ink', hex: '#070707', role: 'Terminal dark footer' },
    { name: 'Alexa Cyan', hex: '#00caec', role: 'Cinema mode voice orb accent' },
    { name: 'Bedrock Violet', hex: '#7248ea', role: 'Bedrock AI agent intelligence' },
  ];

  const audioTracks = [
    { id: '001', title: 'English Master Stem', type: 'Studio Reference Dialogue & M&E Bus', format: '1080p / 48kHz Stereo', status: 'Primary Track' },
    { id: '002', title: 'Hindi Neural Dub (हिन्दी)', type: 'Isometric Syllable Sync + Neural Voice', format: 'EBU R128 Mastered', status: 'Synchronized' },
    { id: '003', title: 'Spanish Dub (Español)', type: 'Castilian Localization + Cultural Idioms', format: 'EBU R128 Mastered', status: 'Synchronized' },
    { id: '004', title: 'French Dub (Français)', type: 'Neural Lip-Matched Dialogue Bus', format: 'EBU R128 Mastered', status: 'Synchronized' },
    { id: '005', title: 'AWS Bedrock Agent Runtime', type: 'Claude 3.5 Sonnet Tool Dispatch', format: 'JSON Structured Actions', status: 'Sub-120ms Latency' },
    { id: '006', title: 'Smart Audio Collision Guard', type: 'Suppresses TTS when Video Plays', format: 'Web Audio API Guard', status: 'Zero Collision' },
  ];

  return (
    <div className="exo-ape-root">
      {/* 1. Top Navigation Bar */}
      <header className="exo-nav">
        <div className="exo-nav-brand">
          <Link href="/showcase" className="exo-wordmark">
            DubPilot
          </Link>
          <span className="exo-brand-tag">/ Multimodal Monograph · Alexa+ &amp; AWS 2026</span>
        </div>
        <nav>
          <ul className="exo-nav-links">
            <li>
              <a href="#acoustics" className="exo-nav-link">
                Acoustics
              </a>
            </li>
            <li>
              <a href="#studies" className="exo-nav-link">
                Studies
              </a>
            </li>
            <li>
              <a href="#manifest" className="exo-nav-link">
                Audio Index
              </a>
            </li>
            <li>
              <a href="#tokens" className="exo-nav-link">
                Tokens
              </a>
            </li>
            <li>
              <Link href="/" className="exo-nav-link studio-link">
                Launch Cinema Studio →
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* 2. Full-Bleed Hero Section */}
      <section className="exo-hero">
        <div className="exo-hero-img-wrap">
          <img
            src="/images/dubpilot/dubpilot_hero.jpg"
            alt="Brutalist cinema screening hall with projection light beam cutting through atmospheric warm mist"
            className="exo-hero-img"
          />
        </div>
        <div className="exo-hero-overlay" />

        <div className="exo-hero-content">
          <span className="exo-hero-eyebrow">Amazon Developer Hackathon 2026 · Alexa+ Track</span>
          <h1 className="exo-hero-display">DUBPILOT</h1>
          <div className="exo-hero-meta">
            <div>Conversational Cinema. Boundless Language. · AWS Bedrock Intelligence</div>
            <div>Printed in Digital Ink — Single-Weight 400 Typography &amp; Warm Neutrals</div>
          </div>
        </div>
      </section>

      {/* 3. Editorial Monograph Section */}
      <section className="exo-section canvas-bg" id="acoustics">
        <h2 className="exo-headline-lg">
          Acoustics of
          <br />
          Voice &amp; Script
        </h2>

        <div className="exo-grid-two-col">
          <div className="exo-prose-column">
            <p className="exo-body-lead">
              DubPilot eliminates the split-attention deficit of foreign cinema. Where traditional viewing forces audiences
              to spend 60% of screen time reading captions at the bottom of the frame, DubPilot gives viewers a natural
              voice-driven conversational viewing partner built for Amazon Alexa+ and Amazon Bedrock.
            </p>
            <p className="exo-body-secondary">
              A single neo-grotesque weight (400) anchors everything from 14px caption running text to 250px display
              letterforms. The size itself is the hierarchy. Letters collide under negative tracking to form monolithic
              architectural presence, while body copy breathes with generous, unhurried leading.
            </p>
            <div style={{ marginTop: '20px' }}>
              <Link href="/" className="exo-action-link">
                Launch Interactive Studio →
              </Link>
            </div>
          </div>

          <div className="exo-prose-column">
            <blockquote className="exo-body-serif">
              &ldquo;Cinema is humanity&rsquo;s shared visual vessel. Spoken dialogue and cultural vernacular should
              enrich the story—never alienate the audience or force them to look away from the frame.&rdquo;
            </blockquote>
            <p className="exo-body-secondary">
              Every vocal stem—English original, Hindi, Spanish, French—is mastered under EBU R128 loudness standards.
              When the user speaks, Alexa+ dispatches Bedrock tool calls in sub-120ms with smart collision prevention:
              telemetry updates silently during video playback, speaking only when the screen is paused.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Localization Studies / Pure White Surface Cards */}
      <section className="exo-section white-bg" id="studies">
        <span className="exo-hero-eyebrow" style={{ color: 'var(--color-steel-gray)' }}>
          Autonomous Engineering
        </span>
        <h2 className="exo-headline-lg" style={{ marginTop: '16px' }}>
          Localization Studies
        </h2>

        <div className="exo-cards-container">
          {/* Card 1 */}
          <article className="exo-image-card">
            <div className="exo-card-media">
              <img
                src="/images/dubpilot/dubpilot_acoustic.jpg"
                alt="Acoustic stone mastering studio with mixing console and audio diffusers"
                className="exo-card-img"
              />
            </div>
            <div className="exo-card-meta">
              <div className="exo-card-num-title">
                <h3 className="exo-card-title">Acoustic Stem Alignment</h3>
                <span className="exo-card-index">01 / 02</span>
              </div>
              <p className="exo-card-desc">
                Faster-Whisper ASR and speaker diarization separating actor dialogue from background music &amp; effects
                (M&amp;E). Dynamic sidechain ducking preserves natural room reverberation during translated speech.
              </p>
              <div>
                <Link href="/" className="exo-action-link">
                  Test Audio Stems →
                </Link>
              </div>
            </div>
          </article>

          {/* Card 2 */}
          <article className="exo-image-card">
            <div className="exo-card-media">
              <img
                src="/images/dubpilot/dubpilot_subtitles.jpg"
                alt="Architectural study of multilingual typography glyphs projected on stone"
                className="exo-card-img"
              />
            </div>
            <div className="exo-card-meta">
              <div className="exo-card-num-title">
                <h3 className="exo-card-title">Isometric Syllable Sync</h3>
                <span className="exo-card-index">02 / 02</span>
              </div>
              <p className="exo-card-desc">
                Phonetic duration matching between source English and target Hindi/Spanish syllables ensures lip-sync
                naturalism. High-contrast subtitles adjust typography and bilingual modes dynamically on voice utterance.
              </p>
              <div>
                <Link href="/" className="exo-action-link">
                  Test Subtitle HUD →
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* 5. Multitrack Audio Index with Sand Dividers */}
      <section className="exo-section canvas-bg" id="manifest">
        <span className="exo-hero-eyebrow" style={{ color: 'var(--color-steel-gray)' }}>
          Technical Manifest
        </span>
        <h2 className="exo-headline-lg" style={{ marginTop: '16px' }}>
          Audio &amp; Agent Index
        </h2>

        <div className="exo-list-table">
          {audioTracks.map((item) => (
            <div key={item.id} className="exo-list-row">
              <span className="exo-list-id">{item.id}</span>
              <span className="exo-list-title">{item.title}</span>
              <span className="exo-list-discipline">{item.type}</span>
              <span className="exo-list-year">{item.format}</span>
              <span className="exo-list-action">
                <span style={{ borderBottom: '1px solid var(--color-sand-border)', paddingBottom: '2px' }}>
                  {item.status}
                </span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Brand Token Inspector & Lausanne Type Scaler */}
      <section className="exo-section sand-tint" id="tokens">
        <span className="exo-hero-eyebrow" style={{ color: 'var(--color-steel-gray)' }}>
          Brand Design System (BRAND.md)
        </span>
        <h2 className="exo-headline-lg" style={{ marginTop: '16px' }}>
          Tokens &amp; Scale
        </h2>

        <div className="exo-prose-column">
          <p className="exo-body-lead">
            DubPilot pairs Venetian monograph discipline (warm paper, sand borders, zero drop-shadows) with Amazon
            Alexa+ cinema acoustics. Inspect our brand palette and interactively test the single-weight 400 typographic
            hierarchy.
          </p>
        </div>

        <div className="exo-specimen-panel">
          <div>
            <span className="exo-hero-eyebrow" style={{ color: 'var(--color-steel-gray)', display: 'block', marginBottom: '16px' }}>
              Dual-Sphere Brand Palette
            </span>
            <div className="exo-palette-swatches">
              {palette.map((p) => (
                <div key={p.hex} className="exo-swatch">
                  <div className="exo-swatch-box" style={{ backgroundColor: p.hex }} />
                  <span className="exo-swatch-label">{p.name}</span>
                  <span className="exo-swatch-hex">{p.hex}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="exo-scale-tester">
            <span className="exo-hero-eyebrow" style={{ color: 'var(--color-steel-gray)', display: 'block' }}>
              Interactive Single-Weight (400) Type Scaler
            </span>
            <div className="exo-scale-controls">
              <label htmlFor="scaler">Scale: {scaleSize}px</label>
              <input
                id="scaler"
                type="range"
                min="14"
                max="250"
                value={scaleSize}
                onChange={(e) => setScaleSize(Number(e.target.value))}
                className="exo-scale-slider"
              />
              <input
                type="text"
                value={scaleText}
                onChange={(e) => setScaleText(e.target.value)}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--color-sand-border)',
                  padding: '6px 12px',
                  fontFamily: 'inherit',
                  fontSize: '14px',
                  color: 'var(--color-ink-black)',
                }}
              />
            </div>

            <div style={{ marginTop: '20px', minHeight: '160px', overflow: 'hidden' }}>
              <div
                className="exo-scale-preview-text"
                style={{
                  fontSize: `${scaleSize}px`,
                  letterSpacing: scaleSize > 100 ? '-0.046em' : scaleSize > 24 ? '-0.035em' : '+0.006em',
                  lineHeight: scaleSize > 100 ? 0.76 : scaleSize > 24 ? 1.33 : 1.5,
                }}
              >
                {scaleText || 'DUBPILOT'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Terminal Dark Footer Block */}
      <footer className="exo-footer">
        <div className="exo-footer-main">
          <div>
            <h2 className="exo-footer-title">DubPilot</h2>
            <p className="exo-footer-prose">
              Multimodal Alexa+ Video Localization Copilot &amp; AWS Bedrock Cinema Engine. Designed for the Amazon
              Developer Hackathon 2026. Zero shadows. Zero gradients. One weight across the full scale.
            </p>
            <div style={{ marginTop: '30px' }}>
              <Link href="/" className="exo-action-link dark-variant">
                Enter Multimodal Cinema Studio →
              </Link>
            </div>
          </div>

          <div className="exo-footer-col">
            <span className="exo-footer-col-header">Navigation</span>
            <a href="#acoustics" className="exo-footer-link">
              Acoustic Architecture
            </a>
            <a href="#studies" className="exo-footer-link">
              Localization Studies
            </a>
            <a href="#manifest" className="exo-footer-link">
              Audio &amp; Agent Index
            </a>
            <a href="#tokens" className="exo-footer-link">
              Brand Tokens &amp; Specimen
            </a>
          </div>

          <div className="exo-footer-col">
            <span className="exo-footer-col-header">Hackathon Credentials</span>
            <span className="exo-footer-link">Alexa+ Primary Track</span>
            <span className="exo-footer-link">AWS Builder Mini-Challenge</span>
            <span className="exo-footer-link">Bedrock Claude 3.5 Sonnet</span>
            <span className="exo-footer-link">Amazon Nova Pro</span>
          </div>
        </div>

        <div className="exo-footer-bottom">
          <span>&copy; {new Date().getFullYear()} DubPilot — Amazon Developer Hackathon 2026. All rights reserved.</span>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="exo-footer-link"
          >
            Return to Top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
