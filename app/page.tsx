'use client';

import { useState } from 'react';
import { BentoGrid } from '@/components/layout/BentoGrid';
import { CommandCenter } from '@/components/bento/CommandCenter';
import { FocusTimer } from '@/components/bento/FocusTimer';
import { SmartSchedule } from '@/components/bento/SmartSchedule';
import { StatsCard } from '@/components/bento/StatsCard';
import { AchievementsCard } from '@/components/bento/AchievementsCard';
import { VoiceCommand } from '@/types';

/**
 * 🧠 HYPERFOCUS AI
 * The Ultimate ADHD/Hyperfixation Productivity Command Center
 *
 * Features:
 * - Hypermaximalist retro UI design
 * - Mobile-first bento grid layout
 * - Voice command system
 * - Focus timer with circular progress
 * - Smart scheduling
 * - Gamification and achievements
 */
export default function Home() {
  const [recentCommands] = useState<VoiceCommand[]>([
    {
      id: '1',
      command: 'Start focus session on trading dashboard',
      timestamp: new Date(Date.now() - 5 * 60000),
      status: 'success',
    },
    {
      id: '2',
      command: 'Schedule content creation for tomorrow',
      timestamp: new Date(Date.now() - 15 * 60000),
      status: 'success',
    },
  ]);

  const handleVoiceCommand = () => {
    console.log('Voice command initiated');
    // Voice command logic will be implemented here
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-4 py-3 bg-[var(--bg-secondary)] border-b border-[var(--border-default)]">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">🦊 HyperFox</h1>
          <div className="bg-[var(--purple-primary)] px-3 py-1 rounded-xl">
            <p className="text-sm font-semibold">Lvl 12</p>
          </div>
        </div>
        <button className="text-2xl">⚙️</button>
      </header>

      {/* Main Bento Grid */}
      <BentoGrid>
        {/* Command Center - Hero Card */}
        <CommandCenter
          recentCommands={recentCommands}
          onVoicePress={handleVoiceCommand}
        />

        {/* Focus Timer */}
        <FocusTimer />

        {/* Smart Schedule */}
        <SmartSchedule />

        {/* Stats and Achievements Row */}
        <div className="w-full flex flex-col md:flex-row gap-3 md:gap-4">
          <StatsCard />
          <AchievementsCard />
        </div>
      </BentoGrid>

      {/* Bottom Navigation (Mobile only) */}
      <nav className="md:hidden flex justify-around items-center py-3 bg-[var(--bg-secondary)] border-t border-[var(--border-default)]">
        <button className="text-2xl">🏠</button>
        <button className="text-2xl">⚡</button>
        <button className="text-2xl">🎤</button>
        <button className="text-2xl">📊</button>
        <button className="text-2xl">👤</button>
      </nav>
    </div>
  );
}
