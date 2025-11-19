'use client';

import { useState } from 'react';
import { Card } from '../ui/Card';

interface Challenge {
  id: string;
  icon: string;
  title: string;
  description: string;
  progress: number;
  total: number;
  xp: number;
  color: string;
  completed: boolean;
}

/**
 * Daily Challenges Card - Gamification
 *
 * Duolingo-style daily challenges with:
 * - Circular progress rings
 * - XP rewards
 * - Completion animations
 * - Colorful icons
 */
export function DailyChallengesCard() {
  const [challenges] = useState<Challenge[]>([
    {
      id: '1',
      icon: '🔥',
      title: 'Focus Streak',
      description: 'Complete 3 focus sessions',
      progress: 2,
      total: 3,
      xp: 50,
      color: 'var(--orange-primary)',
      completed: false
    },
    {
      id: '2',
      icon: '⚡',
      title: 'Quick Wins',
      description: 'Finish 5 quick tasks',
      progress: 5,
      total: 5,
      xp: 30,
      color: 'var(--cyan-primary)',
      completed: true
    },
    {
      id: '3',
      icon: '🎯',
      title: 'Deep Work',
      description: 'Focus for 2 hours total',
      progress: 1.5,
      total: 2,
      xp: 100,
      color: 'var(--purple-primary)',
      completed: false
    }
  ]);

  return (
    <Card variant="gradient-purple" glow="purple" className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-2xl" />

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="bounce">🏆</span>
              Daily Challenges
            </h2>
            <p className="text-sm text-white/80 mt-1">
              Complete challenges to earn XP!
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-xl">
            <p className="text-xs font-semibold text-white">+180 XP</p>
          </div>
        </div>

        <div className="space-y-3">
          {challenges.map((challenge) => {
            const progressPercent = (challenge.progress / challenge.total) * 100;
            const circumference = 2 * Math.PI * 18; // radius = 18
            const strokeDashoffset = circumference * (1 - progressPercent / 100);

            return (
              <div
                key={challenge.id}
                className={`
                  bg-white/10 backdrop-blur-sm rounded-xl p-4
                  border border-white/20
                  transition-all duration-300 hover:bg-white/15
                  ${challenge.completed ? 'opacity-70' : ''}
                `}
              >
                <div className="flex items-center gap-4">
                  {/* Circular Progress */}
                  <div className="relative flex-shrink-0">
                    <svg width="48" height="48" className="transform -rotate-90">
                      {/* Background circle */}
                      <circle
                        cx="24"
                        cy="24"
                        r="18"
                        stroke="rgba(255, 255, 255, 0.2)"
                        strokeWidth="4"
                        fill="transparent"
                      />
                      {/* Progress circle */}
                      <circle
                        cx="24"
                        cy="24"
                        r="18"
                        stroke={challenge.color}
                        strokeWidth="4"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-500"
                      />
                    </svg>
                    {/* Icon in center */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-2xl ${challenge.completed ? '' : 'sparkle'}`}>
                        {challenge.completed ? '✅' : challenge.icon}
                      </span>
                    </div>
                  </div>

                  {/* Challenge Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-white text-sm mb-0.5">
                          {challenge.title}
                        </h3>
                        <p className="text-xs text-white/70">
                          {challenge.description}
                        </p>
                      </div>
                      <div className={`
                        px-2 py-0.5 rounded-full text-xs font-bold
                        ${challenge.completed
                          ? 'bg-green-500/30 text-green-300'
                          : 'bg-amber-500/30 text-amber-200'
                        }
                      `}>
                        +{challenge.xp} XP
                      </div>
                    </div>

                    {/* Progress text */}
                    <p className="text-xs font-semibold text-white/90 mt-2">
                      {challenge.progress}/{challenge.total}
                      {challenge.completed && ' ✨ Complete!'}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
