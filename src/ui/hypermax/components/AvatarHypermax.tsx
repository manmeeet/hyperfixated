/**
 * AvatarHypermax - Gamified avatar component
 *
 * Features:
 * - User avatar with image or initials fallback
 * - Level ring/progress indicator
 * - Status indicators (online, busy, away, offline)
 * - Achievement badges overlay
 * - Thick neobrutalist borders
 * - Size variants
 * - Glow effects for special states
 * - Interactive hover states
 */

'use client';

import React, { useState } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CircularProgressHypermax } from './ProgressBarHypermax';

// ============================================================================
// TYPES
// ============================================================================

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type AvatarStatus = 'online' | 'busy' | 'away' | 'offline';
export type AvatarShape = 'circle' | 'square';

export interface AvatarHypermaxProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  /** Image source URL */
  src?: string;
  /** Alt text for image */
  alt?: string;
  /** Fallback text (initials) */
  fallback?: string;
  /** Size variant */
  size?: AvatarSize;
  /** Shape */
  shape?: AvatarShape;
  /** Status indicator */
  status?: AvatarStatus;
  /** Show level ring? */
  showLevelRing?: boolean;
  /** Current level */
  level?: number;
  /** Level progress (0-100) */
  levelProgress?: number;
  /** Achievement badge overlay */
  badge?: React.ReactNode;
  /** Glow effect */
  glow?: boolean;
  /** Interactive (clickable) */
  interactive?: boolean;
  /** Custom class name */
  className?: string;
}

// ============================================================================
// SIZE STYLES
// ============================================================================

const sizeStyles: Record<AvatarSize, { container: string; text: string; ring: number; badge: string }> = {
  xs: {
    container: 'w-6 h-6 border-[2px]',
    text: 'text-xs',
    ring: 32,
    badge: 'w-3 h-3 border-[1px]',
  },
  sm: {
    container: 'w-8 h-8 border-[2px]',
    text: 'text-sm',
    ring: 40,
    badge: 'w-4 h-4 border-[1px]',
  },
  md: {
    container: 'w-12 h-12 border-[3px]',
    text: 'text-base',
    ring: 56,
    badge: 'w-5 h-5 border-[2px]',
  },
  lg: {
    container: 'w-16 h-16 border-[3px]',
    text: 'text-lg',
    ring: 72,
    badge: 'w-6 h-6 border-[2px]',
  },
  xl: {
    container: 'w-24 h-24 border-[4px]',
    text: 'text-2xl',
    ring: 104,
    badge: 'w-8 h-8 border-[2px]',
  },
  xxl: {
    container: 'w-32 h-32 border-[4px]',
    text: 'text-4xl',
    ring: 136,
    badge: 'w-10 h-10 border-[3px]',
  },
};

// ============================================================================
// STATUS STYLES
// ============================================================================

const statusStyles: Record<AvatarStatus, { bg: string; border: string }> = {
  online: {
    bg: 'bg-[var(--color-green)]',
    border: 'border-[#0D9668]',
  },
  busy: {
    bg: 'bg-[var(--color-red)]',
    border: 'border-[#DC2626]',
  },
  away: {
    bg: 'bg-[var(--color-amber)]',
    border: 'border-[#FF8F00]',
  },
  offline: {
    bg: 'bg-[var(--color-text-tertiary)]',
    border: 'border-[var(--color-border)]',
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export const AvatarHypermax = React.forwardRef<HTMLDivElement, AvatarHypermaxProps>(
  (
    {
      src,
      alt = 'Avatar',
      fallback,
      size = 'md',
      shape = 'circle',
      status,
      showLevelRing = false,
      level,
      levelProgress = 0,
      badge,
      glow = false,
      interactive = false,
      className,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = useState(false);
    const styles = sizeStyles[size];
    const shouldShowImage = src && !imageError;

    // Extract initials from fallback text
    const initials = fallback
      ?.split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const avatarContent = (
      <motion.div
        ref={ref}
        className={cn(
          // Base styles
          'relative flex items-center justify-center',
          'bg-[var(--color-surface)] text-white',
          'border-[var(--color-border)]',
          'overflow-hidden',
          'font-bold uppercase',
          // Size styles
          styles.container,
          styles.text,
          // Shape styles
          shape === 'circle' ? 'rounded-full' : 'rounded-lg',
          // Interactive styles
          interactive && 'cursor-pointer hover:scale-105 transition-transform',
          // Glow effect
          glow && 'drop-shadow-[0_0_20px_rgba(124,58,237,0.6)]',
          // Custom className
          className
        )}
        whileHover={interactive ? { scale: 1.05 } : undefined}
        whileTap={interactive ? { scale: 0.95 } : undefined}
        initial={false}
        {...props}
      >
        {/* Image */}
        {shouldShowImage ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          /* Fallback initials or icon */
          <span className="select-none">{initials || '?'}</span>
        )}

        {/* Status indicator */}
        {status && (
          <div
            className={cn(
              'absolute bottom-0 right-0',
              'rounded-full',
              'border-[2px] border-[var(--color-background)]',
              statusStyles[status].bg,
              statusStyles[status].border,
              {
                xs: 'w-2 h-2',
                sm: 'w-2.5 h-2.5',
                md: 'w-3 h-3',
                lg: 'w-4 h-4',
                xl: 'w-5 h-5',
                xxl: 'w-6 h-6',
              }[size]
            )}
          />
        )}

        {/* Achievement badge overlay */}
        {badge && (
          <div
            className={cn(
              'absolute -top-1 -right-1',
              'rounded-full',
              'bg-[var(--color-amber)]',
              'flex items-center justify-center',
              styles.badge,
              'border-[var(--color-background)]',
              'shadow-[2px_2px_0_0_#FF8F00]'
            )}
          >
            {badge}
          </div>
        )}
      </motion.div>
    );

    // Wrap with level ring if needed
    if (showLevelRing && level !== undefined) {
      return (
        <div className="relative inline-flex items-center justify-center">
          {/* Level ring */}
          <CircularProgressHypermax
            value={levelProgress}
            max={100}
            size={styles.ring}
            strokeWidth={4}
            variant="xp"
            showLabel={false}
            className="absolute inset-0"
          />
          {/* Avatar */}
          <div className="relative z-10">{avatarContent}</div>
          {/* Level badge */}
          {level && (
            <div
              className={cn(
                'absolute -bottom-1 left-1/2 -translate-x-1/2',
                'px-2 py-0.5',
                'bg-[var(--color-amber)] text-[var(--color-background)]',
                'border-[2px] border-[#FF8F00]',
                'rounded-full',
                'shadow-[2px_2px_0_0_#FF8F00]',
                'font-black text-xs uppercase',
                'whitespace-nowrap'
              )}
            >
              Lv {level}
            </div>
          )}
        </div>
      );
    }

    return avatarContent;
  }
);

AvatarHypermax.displayName = 'AvatarHypermax';

// ============================================================================
// AVATAR GROUP (for showing multiple avatars)
// ============================================================================

export interface AvatarGroupHypermaxProps {
  /** Maximum avatars to show before "+N" */
  max?: number;
  /** Children (AvatarHypermax components) */
  children?: React.ReactNode;
  /** Size for all avatars */
  size?: AvatarSize;
  /** Custom class name */
  className?: string;
}

export const AvatarGroupHypermax: React.FC<AvatarGroupHypermaxProps> = ({
  max = 5,
  children,
  size = 'md',
  className,
}) => {
  const childArray = React.Children.toArray(children);
  const visibleChildren = childArray.slice(0, max);
  const remainingCount = childArray.length - max;

  return (
    <div className={cn('flex items-center -space-x-2', className)}>
      {visibleChildren.map((child, index) => (
        <div
          key={index}
          className="relative ring-[3px] ring-[var(--color-background)] rounded-full"
          style={{ zIndex: visibleChildren.length - index }}
        >
          {child}
        </div>
      ))}
      {remainingCount > 0 && (
        <div
          className={cn(
            'relative flex items-center justify-center',
            'bg-[var(--color-surface-elevated)] text-white',
            'border-[3px] border-[var(--color-border)]',
            'rounded-full',
            'font-bold text-sm',
            'ring-[3px] ring-[var(--color-background)]',
            sizeStyles[size].container
          )}
          style={{ zIndex: 0 }}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

AvatarGroupHypermax.displayName = 'AvatarGroupHypermax';

export default AvatarHypermax;
