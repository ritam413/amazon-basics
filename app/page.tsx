'use client';

import React, { useState, useRef } from 'react';
import Header from '@/components/Header';
import VideoPlayer, { VideoPlayerRef } from '@/components/VideoPlayer';
import AlexaCopilot from '@/components/AlexaCopilot';
import RubricGrid from '@/components/RubricGrid';
import SettingsModal from '@/components/SettingsModal';

export default function Home() {
  const playerRef = useRef<VideoPlayerRef>(null);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState('anthropic.claude-3-5-sonnet-20241022-v2:0');
  const [awsRegion, setAwsRegion] = useState('us-east-1');
  const [useLiveProxy, setUseLiveProxy] = useState(false);

  return (
    <>
      <Header
        bedrockMode={useLiveProxy ? 'AWS Bedrock Live' : 'Bedrock Claude 3.5'}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      <main className="main-container">
        <VideoPlayer ref={playerRef} />
        <AlexaCopilot
          playerRef={playerRef}
          selectedModel={selectedModel}
          useLiveProxy={useLiveProxy}
        />
      </main>

      <RubricGrid />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        awsRegion={awsRegion}
        setAwsRegion={setAwsRegion}
        useLiveProxy={useLiveProxy}
        setUseLiveProxy={setUseLiveProxy}
      />
    </>
  );
}
