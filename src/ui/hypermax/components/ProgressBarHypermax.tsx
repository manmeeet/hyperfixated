/**
 * ProgressBarHypermax - Duolingo-style XP progress bar
 *
 * Features:
 * - XP/level progress visualization
 * - Animated fill with spring physics
 * - Shimmer/shine effect on progress
 * - Glow effects for gamification
 * - Label support (inline or external)
 * - Multiple variants (XP, health, loading, streak)
 * - Celebration animation on milestone
 * - Thick neobrutalist borders
 */

'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

// ============================================================================
// TYPES
// ============================================================================

export type ProgressBarVariant = 'xp' | 'health' | 'loading' | 'streak' | 'default';
export type ProgressBarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ProgressBarHypermaxProps {
  /** Current progress value (0-100 or 0-max) */
  value: number;
  /** Maximum value (defaults to 100) */
  max?: number;
  /** Variant style */
  variant?: ProgressBarVariant;
  /** Size */
  size?: ProgressBarSize;
  /** Show label inside bar? */
  showLabel?: boolean;
  /** Custom label text (overrides default percentage) */
  label?: string;
  /** Show glow effect? */
  glow?: boolean;
  /** Show shimmer animation? */
  shimmer?: boolean;
  /** Celebrate when reaching milestone? */
  celebrate?: boolean;
  /** Custom class name */
  className?: string;
  /** Track class name */
  trackClassName?: string;
  /** Fill class name */
  fillClassName?: string;
}

// ============================================================================
// VARIANT STYLES
// ============================================================================

const variantStyles: Record<
  ProgressBarVariant,
  { track: string; fill: string; glow?: string }
> = {
  xp: {
    track: 'bg-[var(--color-surface-elevated)] border-[3px] border-[var(--color-amber)]',
    fill: 'bg-gradient-to-r from-[#FF8F00] via-[#FFC107] to-[#FFD54F]',
    glow: 'drop-shadow-[0_0_12px_rgba(255,193,7,0.8)]',
  },
  health: {
    track: 'bg-[var(--color-surface-elevated)] border-[3px] border-[var(--color-red)]',
    fill: 'bg-gradient-to-r from-[#DC2626] to-[#EF4444]',
    glow: 'drop-shadow-[0_0_12px_rgba(239,68,68,0.8)]',
  },
  loading: {
    track: 'bg-[var(--color-surface)] border-[2px] border-[var(--color-border)]',
    fill: 'bg-[var(--color-purple)]',
  },
  streak: {
    track: 'bg-[var(--color-surface-elevated)] border-[3px] border-[#FF3366]',
    fill: 'bg-gradient-to-r from-[#FF3366] via-[#FF6B9D] to-[#FFB6D9]',
    glow: 'drop-shadow-[0_0_12px_rgba(255,107,157,0.8)]',
  },
  default: {
    track: 'bg-[var(--color-surface)] border-[2px] border-[var(--color-border)]',
    fill: 'bg-[var(--color-purple)]',
  },
};

// ============================================================================
// SIZE STYLES
// ============================================================================

const sizeStyles: Record<ProgressBarSize, { height: string; fontSize: string }> = {
  sm: { height: 'h-2', fontSize: 'text-xs' },
  md: { height: 'h-3', fontSize: 'text-sm' },
  lg: { height: 'h-4', fontSize: 'text-base' },
  xl: { height: 'h-6', fontSize: 'text-lg' },
};

// ============================================================================
// COMPONENT
// ============================================================================

export const ProgressBarHypermax: React.FC<ProgressBarHypermaxProps> = ({
  value,
  max = 100,
  variant = 'default',
  size = 'md',
  showLabel = false,
  label,
  glow = false,
  shimmer = false,
  celebrate = false,
  className,
  trackClassName,
  fillClassName,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const styles = variantStyles[variant];
  const sizes = sizeStyles[size];

  // Spring animation for smooth progress changes
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 300,
    damping: 30,
  });

  const [shouldCelebrate, setShouldCelebrate] = useState(false);

  useEffect(() => {
    const previousValue = motionValue.get();
    motionValue.set(percentage);

    // Trigger celebration if crossing 100%
    if (celebrate && previousValue < 100 && percentage >= 100) {
      setShouldCelebrate(true);
      setTimeout(() => setShouldCelebrate(false), 1000);
    }
  }, [percentage, motionValue, celebrate]);

  const displayLabel = label || `${Math.round(percentage)}%`;

  return (
    <div className={cn('relative w-full', className)}>
      {/* Track (background) */}
      <div
        className={cn(
          'relative w-full overflow-hidden rounded-full',
          sizes.height,
          styles.track,
          trackClassName
        )}
      >
        {/* Fill (progress) */}
        <motion.div
          className={cn(
            'absolute inset-y-0 left-0',
            'rounded-full',
            styles.fill,
            glow && styles.glow,
            shimmer && 'animate-shimmer',
            shouldCelebrate && 'animate-xp-fill',
            fillClassName
          )}
          style={{
            width: springValue.get() === 0 ? '0%' : springValue,
          }}
          initial={{ width: '0%' }}
        >
          {/* Shimmer overlay */}
          {shimmer && (
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <motion.div
                className="absolute inset-0 w-full h-full"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                }}
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </div>
          )}
        </motion.div>

        {/* Label inside bar */}
        {showLabel && (
          <div
            className={cn(
              'absolute inset-0 flex items-center justify-center',
              'font-bold uppercase tracking-wide',
              'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]',
              sizes.fontSize
            )}
          >
            {displayLabel}
          </div>
        )}
      </div>

      {/* Celebration sparkles */}
      {shouldCelebrate && (
        <div className="absolute inset-0 pointer-events-none overflow-visible">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#FFC107] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: '50%',
              }}
              initial={{ scale: 0, opacity: 1, y: 0 }}
              animate={{
                scale: [0, 1, 0],
                opacity: [1, 1, 0],
                y: [0, -40],
                x: [(Math.random() - 0.5) * 40],
              }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

ProgressBarHypermax.displayName = 'ProgressBarHypermax';

// ============================================================================
// XP BAR WITH LEVEL DISPLAY
// ============================================================================

export interface XpBarHypermaxProps extends Omit<ProgressBarHypermaxProps, 'variant' | 'label'> {
  /** Current level */
  level: number;
  /** Current XP */
  currentXp: number;
  /** XP required for next level */
  requiredXp: number;
  /** Show level badge? */
  showLevel?: boolean;
}

export const XpBarHypermax: React.FC<XpBarHypermaxProps> = ({
  level,
  currentXp,
  requiredXp,
  showLevel = true,
  className,
  ...props
}) => {
  return (
    <div className={cn('relative', className)}>
      {/* Level badge */}
      {showLevel && (
        <div className="flex items-center justify-between mb-2">
          <div
            className={cn(
              'inline-flex items-center gap-2',
              'px-3 py-1',
              'bg-[var(--color-amber)] text-[var(--color-background)]',
              'border-[3px] border-[#FF8F00]',
              'rounded-full',
              'shadow-[3px_3px_0_0_#FF8F00]',
              'font-black uppercase tracking-wider text-sm'
            )}
          >
            <span>Level {level}</span>
          </div>
          <span className="text-sm text-[var(--color-text-secondary)] font-semibold">
            {currentXp} / {requiredXp} XP
          </span>
        </div>
      )}

      {/* Progress bar */}
      <ProgressBarHypermax
        variant="xp"
        value={currentXp}
        max={requiredXp}
        glow
        shimmer
        celebrate
        size="lg"
        {...props}
      />
    </div>
  );
};

XpBarHypermax.displayName = 'XpBarHypermax';

// ============================================================================
// CIRCULAR PROGRESS (for avatar/profile)
// ============================================================================

export interface CircularProgressHypermaxProps {
  /** Progress value (0-100 or 0-max) */
  value: number;
  /** Maximum value */
  max?: number;
  /** Size in pixels */
  size?: number;
  /** Stroke width in pixels */
  strokeWidth?: number;
  /** Variant */
  variant?: ProgressBarVariant;
  /** Show label in center? */
  showLabel?: boolean;
  /** Custom label */
  label?: string;
  /** Children (rendered in center) */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
}

export const CircularProgressHypermax: React.FC<CircularProgressHypermaxProps> = ({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  variant = 'xp',
  showLabel = true,
  label,
  children,
  className,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const styles = variantStyles[variant];

  // Extract color from fill gradient (use first color)
  const strokeColor = {
    xp: '#FFC107',
    health: '#EF4444',
    loading: '#7C3AED',
    streak: '#FF6B9D',
    default: '#7C3AED',
  }[variant];

  const displayLabel = label || `${Math.round(percentage)}%`;

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-surface-elevated)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children || (showLabel && (
          <span className="text-2xl font-black text-white">{displayLabel}</span>
        ))}
      </div>
    </div>
  );
};

CircularProgressHypermax.displayName = 'CircularProgressHypermax';

export default ProgressBarHypermax;
