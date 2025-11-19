'use client';

import { useState } from 'react';
import CardHypermax from '@/src/ui/hypermax/components/CardHypermax';
import ButtonHypermax from '@/src/ui/hypermax/components/ButtonHypermax';
import { VoiceButton } from './VoiceButton';
import { VoiceCommand, VoiceButtonState } from '@/types';
import { formatTimestamp } from '@/lib/utils';

interface CommandCenterProps {
  recentCommands?: VoiceCommand[];
  onVoicePress: () => void;
}

/**
 * Command Center Card - Redesigned with Maximalist Style
 *
 * The hero bento card featuring:
 * - Voice button with glow effect
 * - Gradient background
 * - Animated quick actions
 * - Recent commands (terminal-style)
 */
export function CommandCenter({ recentCommands = [], onVoicePress }: CommandCenterProps) {
  const [voiceState, setVoiceState] = useState<VoiceButtonState>('idle');

  const handleVoicePress = () => {
    setVoiceState('listening');
    onVoicePress();

    // Simulate processing (replace with actual voice logic)
    setTimeout(() => setVoiceState('processing'), 2000);
    setTimeout(() => setVoiceState('success'), 4000);
    setTimeout(() => setVoiceState('idle'), 5000);
  };

  const quickActions = [
    { icon: '⏱️', label: 'Start Focus', gradient: 'gradient-purple-pink', glow: 'glow-purple' },
    { icon: '📅', label: 'Schedule', gradient: 'gradient-cyan-blue', glow: 'glow-cyan' },
    { icon: '⚡', label: 'Automate', gradient: 'gradient-amber-orange', glow: 'glow-orange' },
    { icon: '📊', label: 'Analytics', gradient: 'gradient-green-cyan', glow: 'glow-green' },
  ];

  return (
    <CardHypermax variant="gradient" glow className="relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-500/20 to-blue-600/20" />
      <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-1 text-white flex items-center gap-2">
            <span className="bounce">🎤</span>
            Command Center
          </h2>
          <p className="text-sm text-white/80">
            Voice commands powered by AI
          </p>
        </div>

        {/* Voice Button with enhanced styling */}
        <div className="flex flex-col items-center my-8">
          <div className={voiceState === 'listening' ? 'glow-pulse' : ''}>
            <VoiceButton state={voiceState} onPress={handleVoicePress} />
          </div>
          <p className="mt-4 text-sm font-semibold text-white">
            {getStateText(voiceState)}
          </p>
        </div>

        {/* Recent Commands */}
        {recentCommands.length > 0 && (
          <div className="my-6 py-4 border-t border-white/20">
            <h3 className="font-semibold mb-3 text-white flex items-center gap-2">
              <span>💬</span>
              Recent Commands
            </h3>
            {recentCommands.slice(0, 3).map((cmd) => (
              <div
                key={cmd.id}
                className="my-2 py-2 px-3 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10"
              >
                <p className="text-sm font-mono text-green-300">
                  {'> '}{cmd.command}
                </p>
                <p className="text-xs text-white/60 mt-0.5">
                  {formatTimestamp(cmd.timestamp)}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions - Enhanced */}
        <div className="mt-6">
          <h3 className="font-semibold mb-4 text-white flex items-center gap-2">
            <span>⚡</span>
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <ButtonHypermax
                key={index}
                variant={index === 0 ? 'primary' : index === 1 ? 'secondary' : index === 2 ? 'electric' : 'success'}
                size="lg"
                glowOnHover
                className="aspect-square p-4 flex flex-col items-center justify-center gap-2"
              >
                <span className="text-4xl md:text-5xl">{action.icon}</span>
                <span className="text-xs md:text-sm font-bold text-white drop-shadow-lg">
                  {action.label}
                </span>
              </ButtonHypermax>
            ))}
          </div>
        </div>
      </div>
    </CardHypermax>
  );
}

function getStateText(state: VoiceButtonState): string {
  switch (state) {
    case 'idle':
      return '🎙️ Tap to speak';
    case 'listening':
      return '👂 Listening...';
    case 'processing':
      return '🤖 Processing...';
    case 'success':
      return '✨ Got it!';
  }
}
