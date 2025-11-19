/**
 * Gamification UI Components
 *
 * Pre-built components for common gamification patterns.
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { XpBarHypermax } from '@/src/ui/hypermax/components/ProgressBarHypermax';
import { BadgeHypermax } from '@/src/ui/hypermax/components/BadgeHypermax';
import { CardHypermax, CardHeaderHypermax } from '@/src/ui/hypermax/components/CardHypermax';
import type { Streak, Achievement, DailyChallenge } from './types';
import { formatXp, formatLevel, getLevelTierName } from './calculations';

// ============================================================================
// STREAK DISPLAY
// ============================================================================

export interface StreakDisplayProps {
  streak: Streak;
  className?: string;
}

export const StreakDisplay: React.FC<StreakDisplayProps> = ({ streak, className }) => {
  return (
    <CardHypermax variant="elevated" padding="md" className={className}>
      <CardHeaderHypermax
        title="🔥 Streak"
        subtitle={streak.isActive ? 'Keep it going!' : 'Start a new streak today'}
      />
      <div className="mt-4 flex items-center gap-4">
        {/* Current streak */}
        <div className="flex-1">
          <div className="text-5xl font-black text-[var(--color-amber)]">
            {streak.count}
          </div>
          <div className="text-sm text-[var(--color-text-secondary)] uppercase font-semibold mt-1">
            Day{streak.count !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Stats */}
        <div className="flex-1 space-y-2">
          <div>
            <div className="text-lg font-bold text-white">{streak.longestStreak}</div>
            <div className="text-xs text-[var(--color-text-secondary)]">Longest Streak</div>
          </div>
          <div>
            <div className="text-lg font-bold text-white">{streak.totalDays}</div>
            <div className="text-xs text-[var(--color-text-secondary)]">Total Days</div>
          </div>
        </div>
      </div>

      {/* Status badge */}
      <div className="mt-4">
        <BadgeHypermax
          variant={streak.isActive ? 'success' : 'secondary'}
          icon={<span>{streak.isActive ? '✓' : '!'}</span>}
        >
          {streak.isActive ? 'Active' : 'Inactive'}
        </BadgeHypermax>
      </div>
    </CardHypermax>
  );
};

// ============================================================================
// ACHIEVEMENT CARD
// ============================================================================

export interface AchievementCardProps {
  achievement: Achievement;
  onClick?: () => void;
  className?: string;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  onClick,
  className,
}) => {
  const rarityVariants = {
    common: 'secondary' as const,
    rare: 'info' as const,
    epic: 'primary' as const,
    legendary: 'legendary' as const,
  };

  return (
    <CardHypermax
      variant={achievement.unlocked ? 'elevated' : 'ghost'}
      padding="md"
      interactive={!!onClick}
      onClick={onClick}
      className={cn(!achievement.unlocked && 'opacity-50', className)}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className={cn(
            'text-4xl',
            'w-16 h-16',
            'flex items-center justify-center',
            'bg-[var(--color-surface-elevated)]',
            'border-[3px] border-[var(--color-border)]',
            'rounded-xl'
          )}
        >
          {achievement.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="text-base font-bold text-white uppercase tracking-wide truncate">
              {achievement.title}
            </h4>
            <BadgeHypermax variant={rarityVariants[achievement.rarity]} size="sm">
              {achievement.rarity}
            </BadgeHypermax>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 mb-2">
            {achievement.description}
          </p>

          {/* Progress or XP reward */}
          {achievement.unlocked ? (
            <BadgeHypermax variant="success" size="sm" icon={<span>✓</span>}>
              +{achievement.xpReward} XP
            </BadgeHypermax>
          ) : achievement.progress !== undefined ? (
            <div className="mt-2">
              <div className="text-xs text-[var(--color-text-secondary)] mb-1">
                {achievement.progress}% Complete
              </div>
              <div className="h-2 bg-[var(--color-surface-elevated)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--color-purple)] transition-all duration-300"
                  style={{ width: `${achievement.progress}%` }}
                />
              </div>
            </div>
          ) : (
            <BadgeHypermax variant="secondary" size="sm">
              {achievement.xpReward} XP
            </BadgeHypermax>
          )}
        </div>
      </div>
    </CardHypermax>
  );
};

// ============================================================================
// DAILY CHALLENGE CARD
// ============================================================================

export interface DailyChallengeCardProps {
  challenge: DailyChallenge;
  onStart?: () => void;
  className?: string;
}

export const DailyChallengeCard: React.FC<DailyChallengeCardProps> = ({
  challenge,
  onStart,
  className,
}) => {
  return (
    <CardHypermax
      variant={challenge.completed ? 'elevated' : 'default'}
      padding="md"
      className={className}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h4 className="text-base font-bold text-white uppercase tracking-wide truncate mb-1">
            {challenge.title}
          </h4>
          <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2">
            {challenge.description}
          </p>
        </div>
        <BadgeHypermax variant="warning" size="sm">
          {challenge.xpReward} XP
        </BadgeHypermax>
      </div>

      {/* Progress */}
      {!challenge.completed && (
        <div className="mb-3">
          <div className="text-xs text-[var(--color-text-secondary)] mb-1">
            {challenge.progress}% Complete
          </div>
          <div className="h-2 bg-[var(--color-surface-elevated)] rounded-full overflow-hidden border-[2px] border-[var(--color-border)]">
            <div
              className="h-full bg-gradient-to-r from-[#FF8F00] to-[#FFC107] transition-all duration-300"
              style={{ width: `${challenge.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Action */}
      {challenge.completed ? (
        <BadgeHypermax variant="success" icon={<span>✓</span>}>
          Completed
        </BadgeHypermax>
      ) : onStart ? (
        <button
          onClick={onStart}
          className={cn(
            'w-full px-4 py-2',
            'bg-[var(--color-purple)] text-white',
            'border-[3px] border-[#5B21B6]',
            'rounded-lg',
            'text-sm font-bold uppercase tracking-wide',
            'hover:scale-105 transition-transform'
          )}
        >
          Start Challenge
        </button>
      ) : null}
    </CardHypermax>
  );
};

// ============================================================================
// LEVEL BADGE
// ============================================================================

export interface LevelBadgeProps {
  level: number;
  showTier?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LevelBadge: React.FC<LevelBadgeProps> = ({
  level,
  showTier = false,
  size = 'md',
  className,
}) => {
  const tierName = getLevelTierName(level);

  const sizeStyles = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  };

  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      <BadgeHypermax variant="legendary" size={size}>
        {formatLevel(level)}
      </BadgeHypermax>
      {showTier && (
        <span className="text-sm text-[var(--color-text-secondary)] font-semibold uppercase">
          {tierName}
        </span>
      )}
    </div>
  );
};
