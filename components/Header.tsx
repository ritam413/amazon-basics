'use client';

import React from 'react';
import Link from 'next/link';
import { Settings, Play, Cloud, Radio } from 'lucide-react';

interface HeaderProps {
  bedrockMode: string;
  onOpenSettings: () => void;
}

export default function Header({ bedrockMode, onOpenSettings }: HeaderProps) {
  return (
    <header className="header">
      <div className="brand-wrapper">
        <div className="logo-badge" aria-label="DubPilot Logo">
          <Play style={{ width: 20, height: 20, fill: '#fff' }} />
        </div>
        <div className="brand-title-group">
          <h1>
            DubPilot <span className="hackathon-tag">Amazon 2026</span>
          </h1>
        </div>
      </div>

      <div className="header-badges">
        <div className="track-badge active-track">
          <span className="pulse-dot"></span>
          <span>Alexa+ Primary Track</span>
        </div>
        <div className="track-badge aws-badge">
          <Cloud style={{ width: 14, height: 14 }} />
          <span>{bedrockMode}</span>
        </div>
        <Link
          href="/showcase"
          className="settings-btn"
          style={{ textDecoration: 'none', background: 'rgba(230, 215, 202, 0.15)', borderColor: 'rgba(224, 204, 187, 0.4)' }}
          title="DubPilot — Multimodal Cinema Monograph & Architecture"
        >
          <span style={{ fontSize: '13px', color: '#e6d7ca' }}>Brand Monograph →</span>
        </Link>
        <button className="settings-btn" onClick={onOpenSettings} aria-label="Open Settings">
          <Settings style={{ width: 15, height: 15 }} />
          <span>AWS Setup</span>
        </button>
      </div>
    </header>
  );
}
