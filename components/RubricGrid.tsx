'use client';

import React from 'react';

export default function RubricGrid() {
  return (
    <section className="footer-rubric-strip">
      <div className="rubric-grid">
        <div className="rubric-card">
          <span className="weight-tag">Technical (25%)</span>
          <h3>Bedrock Tool Calling</h3>
          <p>Live structured tool invocation, gapless audio stem switching, and VTT synchronization.</p>
        </div>
        <div className="rubric-card">
          <span className="weight-tag">Design (25%)</span>
          <h3>Multimodal UI/UX</h3>
          <p>Glassmorphic cinema dark mode, reactive voice visualizer orb, WCAG AA compliance.</p>
        </div>
        <div className="rubric-card">
          <span className="weight-tag">Impact (25%)</span>
          <h3>Global Multilingual Video</h3>
          <p>Breaking language barriers for 1.5B+ viewers across Hindi, Spanish, French, and English.</p>
        </div>
        <div className="rubric-card">
          <span className="weight-tag">Bonus (+10%)</span>
          <h3>Developer Friction Log</h3>
          <p>Documented Bedrock Converse streaming deltas & edge latency mitigations in friction_log.md.</p>
        </div>
      </div>
    </section>
  );
}
