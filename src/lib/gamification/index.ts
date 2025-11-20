/**
 * Gamification System Barrel Export
 *
 * Export all gamification types, calculations, and components.
 */

// Types
export type {
  UserLevel,
  XpGain,
  Streak,
  Achievement,
  AchievementRarity,
  UserStats,
  DailyChallenge,
  LeaderboardEntry,
} from './types';

// Calculations
export {
  getRequiredXpForLevel,
  getLevelFromTotalXp,
  calculateUserLevel,
  calculateXpProgress,
  isStreakActive,
  updateStreak,
  getStreakMultiplier,
  calculateAchievementProgress,
  shouldUnlockAchievement,
  calculateRank,
  formatXp,
  formatLevel,
  getLevelTierName,
} from './calculations';

// Components
export {
  StreakDisplay,
  AchievementCard,
  DailyChallengeCard,
  LevelBadge,
} from './components';
export type {
  StreakDisplayProps,
  AchievementCardProps,
  DailyChallengeCardProps,
  LevelBadgeProps,
} from './components';
