'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { BentoGrid } from '@/components/layout/BentoGrid';
import { CommandCenter } from '@/components/bento/CommandCenter';
import { FocusTimer } from '@/components/bento/FocusTimer';
import { SmartSchedule } from '@/components/bento/SmartSchedule';
import { StatsCard } from '@/components/bento/StatsCard';
import { AchievementsCard } from '@/components/bento/AchievementsCard';
import { VoiceCommand } from '@/types';
import { cn } from '@/lib/utils';

// Lazy load heavy components for better performance
const MemoryPalaceCard = dynamic(() => import('@/src/components/bento/MemoryPalaceCard').then(mod => ({ default: mod.MemoryPalaceCard })), {
  loading: () => <div className="skeleton-loader">Loading...</div>,
  ssr: false
});

const EnergyPredictionCard = dynamic(() => import('@/src/components/bento/EnergyPredictionCard').then(mod => ({ default: mod.EnergyPredictionCard })), {
  loading: () => <div className="skeleton-loader">Loading...</div>,
  ssr: false
});

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
      {/* Header - Responsive with sticky positioning */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-[var(--color-background)]/80 border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold flex items-center gap-2">
              <span role="img" aria-label="Fox mascot">🦊</span>
              HyperFox
            </h1>
            <div className="bg-[var(--purple-primary)] px-2 md:px-3 py-1 rounded-full">
              <p className="text-xs md:text-sm font-semibold" aria-label="Current level 12">Lvl 12</p>
            </div>
          </div>
          <button
            className="p-2 hover:bg-[var(--color-surface)] rounded-lg transition-colors"
            aria-label="Settings"
          >
            <span className="text-xl md:text-2xl" role="img" aria-hidden="true">⚙️</span>
          </button>
        </div>
      </header>

      {/* Main Bento Grid */}
      <main id="main-content" className="flex-1 overflow-y-auto">
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
          <StatsCard />
          <AchievementsCard />

          {/* Optional: Lazy-loaded advanced cards */}
          {/* <MemoryPalaceCard deviceType="desktop" /> */}
          {/* <EnergyPredictionCard deviceType="desktop" /> */}
        </BentoGrid>
      </main>

      {/* Bottom Navigation - Mobile only with proper accessibility */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--color-surface)] border-t border-[var(--color-border)] px-4 py-2 z-40" aria-label="Mobile navigation">
        <div className="flex justify-around">
          {[
            { icon: '🏠', label: 'Home', active: true },
            { icon: '⚡', label: 'Actions' },
            { icon: '🎤', label: 'Voice' },
            { icon: '📊', label: 'Stats' },
            { icon: '👤', label: 'Profile' }
          ].map((item) => (
            <button
              key={item.label}
              className={cn(
                "flex flex-col items-center gap-1 p-2 min-w-[60px] rounded-lg transition-all",
                item.active && "bg-[var(--purple-primary)]/10 text-[var(--purple-primary)]"
              )}
              aria-label={item.label}
              aria-current={item.active ? 'page' : undefined}
            >
              <span className="text-2xl" role="img" aria-hidden="true">{item.icon}</span>
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
