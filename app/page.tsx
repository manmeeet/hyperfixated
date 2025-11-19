'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { BentoGrid } from '@/components/layout/BentoGrid';
import { CommandCenter } from '@/components/bento/CommandCenter';
import { FocusTimer } from '@/components/bento/FocusTimer';
import { SmartSchedule } from '@/components/bento/SmartSchedule';
import { StatsCard } from '@/components/bento/StatsCard';
import { AchievementsCard } from '@/components/bento/AchievementsCard';
import { DailyChallengesCard } from '@/components/bento/DailyChallengesCard';
import { StreakCard } from '@/components/bento/StreakCard';
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
 * 🧠 HYPERFOCUS AI - REDESIGNED
 * Maximalist Gamified Bento Box UI
 *
 * Features:
 * - Hypermaximalist gamified UI design
 * - Vibrant gradients and animations
 * - XP/Level system
 * - Streak tracking
 * - Daily challenges
 * - Mobile-first bento grid layout
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

  // XP System
  const currentXP = 1250;
  const nextLevelXP = 1500;
  const xpProgress = (currentXP / nextLevelXP) * 100;
  const level = 12;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)]">
      {/* Header - Enhanced with XP Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-purple-900/80 via-pink-900/80 to-purple-900/80 border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
          {/* Top Row */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold flex items-center gap-2 text-white">
                <span role="img" aria-label="Fox mascot" className="bounce">🦊</span>
                HyperFox
              </h1>
              <div className="gradient-amber-orange px-3 py-1.5 rounded-full border border-white/20 shimmer">
                <p className="text-xs md:text-sm font-bold text-white" aria-label={`Current level ${level}`}>
                  ⭐ Lvl {level}
                </p>
              </div>
            </div>
            <button
              className="p-2 hover:bg-white/10 rounded-lg transition-all hover:scale-110"
              aria-label="Settings"
            >
              <span className="text-xl md:text-2xl" role="img" aria-hidden="true">⚙️</span>
            </button>
          </div>

          {/* XP Progress Bar */}
          <div className="w-full">
            <div className="flex justify-between items-center mb-1">
              <p className="text-xs font-semibold text-white/90">
                {currentXP} / {nextLevelXP} XP
              </p>
              <p className="text-xs font-semibold text-white/90">
                {nextLevelXP - currentXP} to Level {level + 1}
              </p>
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
              <div
                className="h-full gradient-animated xp-fill relative"
                style={{ width: `${xpProgress}%` }}
              >
                <div className="absolute inset-0 progress-shine" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Bento Grid */}
      <main id="main-content" className="flex-1 overflow-y-auto pb-20 md:pb-8">
        <BentoGrid>
          {/* Row 1: Command Center (large) + Focus Timer */}
          <CommandCenter
            recentCommands={recentCommands}
            onVoicePress={handleVoiceCommand}
          />
          <FocusTimer />

          {/* Row 2: Streak + Daily Challenges */}
          <StreakCard />
          <DailyChallengesCard />

          {/* Row 3: Stats + Achievements */}
          <StatsCard />
          <AchievementsCard />

          {/* Row 4: Smart Schedule (full width on mobile) */}
          <SmartSchedule />

          {/* Optional: Lazy-loaded advanced cards */}
          {/* <MemoryPalaceCard deviceType="desktop" /> */}
          {/* <EnergyPredictionCard deviceType="desktop" /> */}
        </BentoGrid>
      </main>

      {/* Bottom Navigation - Mobile only with gradients */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-900 via-pink-900 to-purple-900 border-t border-white/20 px-2 py-2 z-40 backdrop-blur-xl" aria-label="Mobile navigation">
        <div className="flex justify-around items-center">
          {[
            { icon: '🏠', label: 'Home', active: true, gradient: 'gradient-purple-pink' },
            { icon: '⚡', label: 'Actions', active: false, gradient: 'gradient-amber-orange' },
            { icon: '🎤', label: 'Voice', active: false, gradient: 'gradient-cyan-blue' },
            { icon: '📊', label: 'Stats', active: false, gradient: 'gradient-green-cyan' },
            { icon: '👤', label: 'Profile', active: false, gradient: 'gradient-pink-orange' }
          ].map((item) => (
            <button
              key={item.label}
              className={cn(
                "flex flex-col items-center gap-1 p-2 min-w-[64px] rounded-xl transition-all duration-300",
                item.active
                  ? `${item.gradient} shadow-lg scale-110 border border-white/30`
                  : "bg-white/10 text-white/70 hover:bg-white/20 hover:scale-105"
              )}
              aria-label={item.label}
              aria-current={item.active ? 'page' : undefined}
            >
              <span className={`text-2xl ${item.active ? 'bounce' : ''}`} role="img" aria-hidden="true">
                {item.icon}
              </span>
              <span className={cn(
                "text-xs font-semibold",
                item.active ? "text-white" : "text-white/80"
              )}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
