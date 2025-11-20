'use client';

import CardHypermax from '@/src/ui/hypermax/components/CardHypermax';

/**
 * Streak Card - Gamification
 *
 * Duolingo-style streak tracking with:
 * - Fire animation
 * - Streak count
 * - Streak freeze indicator
 * - Motivational messages
 */
export function StreakCard() {
  const currentStreak = 7;
  const longestStreak = 23;
  const hasStreakFreeze = true;

  return (
    <CardHypermax variant="gradient" glowOnHover className="relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-yellow-300 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-red-400 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <div className="fire-effect text-7xl md:text-8xl">
              🔥
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-1">
            {currentStreak} Day Streak!
          </h2>
          <p className="text-sm text-white/90 font-semibold">
            You&apos;re on fire! Keep it going! 🚀
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
            <p className="text-2xl font-bold text-white mb-1">{currentStreak}</p>
            <p className="text-xs text-white/80 font-semibold">Current</p>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
            <p className="text-2xl font-bold text-white mb-1">{longestStreak}</p>
            <p className="text-xs text-white/80 font-semibold">Longest</p>
          </div>
        </div>

        {/* Streak Freeze */}
        {hasStreakFreeze && (
          <div className="bg-blue-500/20 backdrop-blur-sm rounded-xl p-3 border border-blue-400/30 shimmer">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🧊</span>
              <div className="flex-1">
                <p className="text-sm font-bold text-white">Streak Freeze Active</p>
                <p className="text-xs text-white/80">Your streak is protected for 1 day</p>
              </div>
            </div>
          </div>
        )}

        {/* Motivation */}
        <div className="mt-4 text-center">
          <p className="text-xs text-white/70">
            Complete a focus session today to maintain your streak!
          </p>
        </div>
      </div>
    </CardHypermax>
  );
}
