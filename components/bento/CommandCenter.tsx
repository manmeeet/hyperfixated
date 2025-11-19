'use client';

import { useState } from 'react';
import { Card } from '../ui/Card';
import { VoiceButton } from './VoiceButton';
import { VoiceCommand, VoiceButtonState } from '@/types';
import { formatTimestamp } from '@/lib/utils';

interface CommandCenterProps {
  recentCommands?: VoiceCommand[];
  onVoicePress: () => void;
}

/**
 * Command Center Card
 *
 * The hero bento card featuring:
 * - Voice button (primary interaction)
 * - Recent commands (terminal-style)
 * - Quick actions (grid)
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
    { icon: '⏱️', label: 'Start Focus', color: '#7C3AED' },
    { icon: '📅', label: 'Schedule', color: '#3B82F6' },
    { icon: '⚡', label: 'Automate', color: '#FB923C' },
    { icon: '📊', label: 'Analytics', color: '#10B981' },
  ];

  return (
    <Card className="w-full">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-2xl font-bold mb-1">🎤 Command Center</h2>
        <p className="text-sm text-[var(--text-tertiary)]">
          Voice commands powered by AI
        </p>
      </div>

      {/* Voice Button */}
      <div className="flex flex-col items-center my-8">
        <VoiceButton state={voiceState} onPress={handleVoicePress} />
        <p className="mt-3 text-sm text-[var(--text-secondary)]">
          {getStateText(voiceState)}
        </p>
      </div>

      {/* Recent Commands */}
      {recentCommands.length > 0 && (
        <div className="my-5 py-3 border-t border-[var(--border-default)]">
          <h3 className="font-semibold mb-3">Recent Commands</h3>
          {recentCommands.slice(0, 3).map((cmd) => (
            <div key={cmd.id} className="my-2 py-1">
              <p className="text-sm font-mono text-[var(--terminal-green)]">
                {'> '}{cmd.command}
              </p>
              <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
                {formatTimestamp(cmd.timestamp)}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-5">
        <h3 className="font-semibold mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="aspect-square rounded-xl p-3 flex flex-col items-center justify-center active:scale-95 transition-transform"
              style={{ backgroundColor: action.color }}
            >
              <span className="text-3xl mb-1">{action.icon}</span>
              <span className="text-xs font-semibold text-white">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
}

function getStateText(state: VoiceButtonState): string {
  switch (state) {
    case 'idle':
      return 'Tap to speak';
    case 'listening':
      return 'Listening...';
    case 'processing':
      return 'Processing...';
    case 'success':
      return 'Got it!';
  }
}
