/**
 * Gamification Calculations
 *
 * Utility functions for XP, level, and streak calculations.
 */

import type { UserLevel, Streak } from './types';

// ============================================================================
// XP & LEVEL CALCULATIONS
// ============================================================================

/**
 * Calculate required XP for a given level
 * Uses exponential curve: base * level^exponent
 */
export const getRequiredXpForLevel = (level: number): number => {
  const baseXp = 100;
  const exponent = 1.5;
  return Math.floor(baseXp * Math.pow(level, exponent));
};

/**
 * Calculate level from total XP
 */
export const getLevelFromTotalXp = (totalXp: number): number => {
  let level = 1;
  let xpNeeded = 0;

  while (xpNeeded <= totalXp) {
    level++;
    xpNeeded += getRequiredXpForLevel(level);
  }

  return level - 1;
};

/**
 * Calculate user level data from total XP
 */
export const calculateUserLevel = (totalXp: number): UserLevel => {
  const level = getLevelFromTotalXp(totalXp);
  const requiredXp = getRequiredXpForLevel(level + 1);

  // Calculate XP earned in current level
  let xpForPreviousLevels = 0;
  for (let i = 1; i <= level; i++) {
    xpForPreviousLevels += getRequiredXpForLevel(i);
  }

  const currentXp = totalXp - xpForPreviousLevels;

  return {
    level,
    currentXp,
    requiredXp,
    totalXp,
  };
};

/**
 * Calculate XP progress percentage (0-100)
 */
export const calculateXpProgress = (currentXp: number, requiredXp: number): number => {
  return Math.min(Math.round((currentXp / requiredXp) * 100), 100);
};

// ============================================================================
// STREAK CALCULATIONS
// ============================================================================

/**
 * Check if streak is still active (user was active yesterday or today)
 */
export const isStreakActive = (lastActivityDate: Date): boolean => {
  const now = new Date();
  const lastActivity = new Date(lastActivityDate);

  // Reset to midnight for date comparison
  const nowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const lastMidnight = new Date(
    lastActivity.getFullYear(),
    lastActivity.getMonth(),
    lastActivity.getDate()
  );

  const daysDiff = Math.floor(
    (nowMidnight.getTime() - lastMidnight.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Streak is active if last activity was today or yesterday
  return daysDiff <= 1;
};

/**
 * Calculate new streak after user activity
 */
export const updateStreak = (currentStreak: Streak): Streak => {
  const now = new Date();
  const lastActivity = new Date(currentStreak.lastActivityDate);

  // Check if activity is today
  const isSameDay =
    now.getFullYear() === lastActivity.getFullYear() &&
    now.getMonth() === lastActivity.getMonth() &&
    now.getDate() === lastActivity.getDate();

  if (isSameDay) {
    // Already counted today, no change
    return currentStreak;
  }

  // Check if streak is still active
  const stillActive = isStreakActive(lastActivity);

  if (stillActive) {
    // Increment streak
    const newCount = currentStreak.count + 1;
    return {
      count: newCount,
      isActive: true,
      lastActivityDate: now,
      longestStreak: Math.max(newCount, currentStreak.longestStreak),
      totalDays: currentStreak.totalDays + 1,
    };
  } else {
    // Streak broken, reset to 1
    return {
      count: 1,
      isActive: true,
      lastActivityDate: now,
      longestStreak: currentStreak.longestStreak,
      totalDays: currentStreak.totalDays + 1,
    };
  }
};

/**
 * Get streak bonus multiplier (for XP rewards)
 */
export const getStreakMultiplier = (streakCount: number): number => {
  if (streakCount >= 30) return 2.0; // 30+ days: 2x
  if (streakCount >= 14) return 1.5; // 14+ days: 1.5x
  if (streakCount >= 7) return 1.25; // 7+ days: 1.25x
  if (streakCount >= 3) return 1.1; // 3+ days: 1.1x
  return 1.0; // Default: 1x
};

// ============================================================================
// ACHIEVEMENT CALCULATIONS
// ============================================================================

/**
 * Calculate achievement progress (0-100)
 */
export const calculateAchievementProgress = (current: number, required: number): number => {
  return Math.min(Math.round((current / required) * 100), 100);
};

/**
 * Check if achievement should be unlocked
 */
export const shouldUnlockAchievement = (current: number, required: number): boolean => {
  return current >= required;
};

// ============================================================================
// LEADERBOARD CALCULATIONS
// ============================================================================

/**
 * Calculate user rank based on XP (1-indexed)
 */
export const calculateRank = (userXp: number, allUserXp: number[]): number => {
  const sortedXp = [...allUserXp].sort((a, b) => b - a);
  return sortedXp.indexOf(userXp) + 1;
};

/**
 * Format XP with thousands separator
 */
export const formatXp = (xp: number): string => {
  return xp.toLocaleString();
};

/**
 * Format level with prefix
 */
export const formatLevel = (level: number): string => {
  return `Lv ${level}`;
};

/**
 * Get level tier name
 */
export const getLevelTierName = (level: number): string => {
  if (level >= 50) return 'Master';
  if (level >= 30) return 'Expert';
  if (level >= 20) return 'Advanced';
  if (level >= 10) return 'Intermediate';
  return 'Beginner';
};
