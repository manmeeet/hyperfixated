/**
 * Gamification Types
 *
 * Type definitions for gamification system (XP, levels, achievements, streaks).
 */

// ============================================================================
// XP & LEVELS
// ============================================================================

export interface UserLevel {
  /** Current level number */
  level: number;
  /** Current XP in this level */
  currentXp: number;
  /** Total XP required for next level */
  requiredXp: number;
  /** Total lifetime XP */
  totalXp: number;
}

export interface XpGain {
  /** Amount of XP gained */
  amount: number;
  /** Reason for XP gain */
  reason: string;
  /** Timestamp */
  timestamp: Date;
}

// ============================================================================
// STREAKS
// ============================================================================

export interface Streak {
  /** Current streak count (consecutive days) */
  count: number;
  /** Is streak active today? */
  isActive: boolean;
  /** Last activity date */
  lastActivityDate: Date;
  /** Longest streak ever */
  longestStreak: number;
  /** Total days active */
  totalDays: number;
}

// ============================================================================
// ACHIEVEMENTS
// ============================================================================

export type AchievementRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface Achievement {
  /** Unique ID */
  id: string;
  /** Achievement title */
  title: string;
  /** Description */
  description: string;
  /** Icon/emoji */
  icon: string;
  /** Rarity level */
  rarity: AchievementRarity;
  /** Is unlocked? */
  unlocked: boolean;
  /** Unlock date */
  unlockedAt?: Date;
  /** Progress (0-100) for progressive achievements */
  progress?: number;
  /** XP reward for unlocking */
  xpReward: number;
}

// ============================================================================
// STATS & METRICS
// ============================================================================

export interface UserStats {
  /** Total tasks completed */
  tasksCompleted: number;
  /** Total focus time (minutes) */
  focusTimeMinutes: number;
  /** Total sessions */
  sessionsCompleted: number;
  /** Completion rate (0-100) */
  completionRate: number;
  /** Average focus session duration (minutes) */
  avgSessionDuration: number;
}

// ============================================================================
// DAILY CHALLENGES
// ============================================================================

export interface DailyChallenge {
  /** Unique ID */
  id: string;
  /** Challenge title */
  title: string;
  /** Description */
  description: string;
  /** Progress (0-100) */
  progress: number;
  /** Is completed? */
  completed: boolean;
  /** XP reward */
  xpReward: number;
  /** Expires at */
  expiresAt: Date;
}

// ============================================================================
// LEADERBOARD
// ============================================================================

export interface LeaderboardEntry {
  /** User ID */
  userId: string;
  /** Username */
  username: string;
  /** Avatar URL */
  avatar?: string;
  /** Total XP */
  totalXp: number;
  /** Current level */
  level: number;
  /** Rank position */
  rank: number;
}
