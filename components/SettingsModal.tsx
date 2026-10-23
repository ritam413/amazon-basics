'use client';

import React from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedModel: string;
  setSelectedModel: (m: string) => void;
  awsRegion: string;
  setAwsRegion: (r: string) => void;
  useLiveProxy: boolean;
  setUseLiveProxy: (b: boolean) => void;
}

export default function SettingsModal({
  isOpen,
  onClose,
  selectedModel,
  setSelectedModel,
  awsRegion,
  setAwsRegion,
  useLiveProxy,
  setUseLiveProxy
}: SettingsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay active" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="settings-modal">
        <div className="modal-header">
          <h2>AWS Bedrock & Agent Configuration</h2>
          <button className="close-modal-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="setting-group">
          <label htmlFor="bedrockModelSelect">Bedrock Foundation Model</label>
          <select
            className="setting-input"
            id="bedrockModelSelect"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
          >
            <option value="anthropic.claude-3-5-sonnet-20241022-v2:0">Anthropic Claude 3.5 Sonnet v2 (Recommended)</option>
            <option value="amazon.nova-pro-v1:0">Amazon Nova Pro</option>
            <option value="amazon.titan-text-express-v1">Amazon Titan Text Express</option>
          </select>
        </div>

        <div className="setting-group">
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={useLiveProxy}
              onChange={(e) => setUseLiveProxy(e.target.checked)}
            />
            <span>Enable Live AWS Bedrock Cloud Invocation</span>
          </label>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4 }}>
            When disabled, DubPilot uses its deterministic low-latency Bedrock simulation engine for 100% offline demo reliability.
          </p>
        </div>

        <div className="setting-group">
          <label htmlFor="awsRegion">AWS Region</label>
          <input
            type="text"
            className="setting-input"
            id="awsRegion"
            value={awsRegion}
            onChange={(e) => setAwsRegion(e.target.value)}
            placeholder="us-east-1"
          />
        </div>

        <button
          className="control-btn"
          onClick={onClose}
          style={{
            background: 'var(--alexa-blue)',
            color: '#000',
            fontWeight: 700,
            width: '100%',
            height: 38,
            borderRadius: 'var(--radius-sm)',
            marginTop: 8
          }}
        >
          Save & Apply Configuration
        </button>
      </div>
    </div>
  );
}
