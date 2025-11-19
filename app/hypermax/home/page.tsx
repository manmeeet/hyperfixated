/**
 * Hypermax Home Page
 *
 * Main dashboard with bento grid layout showing:
 * - Command Center
 * - Focus Timer
 * - Streaks
 * - Daily Challenges
 * - Stats
 * - Achievements
 */

'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import ResponsiveLayout from '@/src/ui/hypermax/layouts/ResponsiveLayout';
import BottomNavHypermax from '@/src/ui/hypermax/components/BottomNavHypermax';
import { BentoGrid } from '@/components/layout/BentoGrid';
import { CommandCenter } from '@/components/bento/CommandCenter';
import { FocusTimer } from '@/components/bento/FocusTimer';
import { SmartSchedule } from '@/components/bento/SmartSchedule';
import { StatsCard } from '@/components/bento/StatsCard';
import { AchievementsCard } from '@/components/bento/AchievementsCard';
import { DailyChallengesCard } from '@/components/bento/DailyChallengesCard';
import { StreakCard } from '@/components/bento/StreakCard';
import { VoiceCommand } from '@/types';

// Lazy load heavy components
const MemoryPalaceCard = dynamic(
  () => import('@/src/components/bento/MemoryPalaceCard').then((mod) => ({ default: mod.MemoryPalaceCard })),
  { loading: () => <div className="skeleton-loader">Loading...</div>, ssr: false }
);

export default function HomePage() {
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
  };

  // XP System
  const currentXP = 1250;
  const nextLevelXP = 1500;
  const xpProgress = (currentXP / nextLevelXP) * 100;
  const level = 12;

  // Header content
  const header = (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
      {/* Top Row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold flex items-center gap-2 text-white">
            <span role="img" aria-label="Fox mascot" className="bounce">
              🦊
            </span>
            HyperFox
          </h1>
          <div className="gradient-amber-orange px-3 py-1.5 rounded-full border border-white/20 shimmer">
            <p className="text-xs md:text-sm font-bold text-white" aria-label={`Current level ${level}`}>
              ⭐ Lvl {level}
            </p>
          </div>
        </div>
        <button className="p-2 hover:bg-white/10 rounded-lg transition-all hover:scale-110" aria-label="Settings">
          <span className="text-xl md:text-2xl" role="img" aria-hidden="true">
            ⚙️
          </span>
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
          <div className="h-full gradient-animated xp-fill relative" style={{ width: `${xpProgress}%` }}>
            <div className="absolute inset-0 progress-shine" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ResponsiveLayout
      mobileProps={{
        header,
        bottomNav: <BottomNavHypermax />,
      }}
      desktopProps={{
        header,
      }}
    >
      <BentoGrid>
        {/* Row 1: Command Center + Focus Timer */}
        <CommandCenter recentCommands={recentCommands} onVoicePress={handleVoiceCommand} />
        <FocusTimer />

        {/* Row 2: Streak + Daily Challenges */}
        <StreakCard />
        <DailyChallengesCard />

        {/* Row 3: Stats + Achievements */}
        <StatsCard />
        <AchievementsCard />

        {/* Row 4: Smart Schedule */}
        <SmartSchedule />
      </BentoGrid>
    </ResponsiveLayout>
  );
}
