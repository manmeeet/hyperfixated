/**
 * BadgeHypermax - Neobrutalist badge component
 *
 * Features:
 * - Small status/label indicator
 * - Thick borders (2-3px)
 * - Vibrant color variants
 * - Achievement/gamification variants
 * - Pill or square shape
 * - Icon support
 * - Pulsing animation for notifications
 */

'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

// ============================================================================
// TYPES
// ============================================================================

export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'electric'
  | 'legendary'
  | 'epic'
  | 'rare';

export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeShape = 'pill' | 'square';

export interface BadgeHypermaxProps extends Omit<HTMLMotionProps<'span'>, 'children'> {
  /** Badge variant */
  variant?: BadgeVariant;
  /** Badge size */
  size?: BadgeSize;
  /** Shape (pill or square) */
  shape?: BadgeShape;
  /** Icon to display before text */
  icon?: React.ReactNode;
  /** Pulse animation (for notifications) */
  pulse?: boolean;
  /** Glow effect */
  glow?: boolean;
  /** Children (badge label) */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
}

// ============================================================================
// VARIANT STYLES
// ============================================================================

const variantStyles: Record<BadgeVariant, string> = {
  primary: cn(
    'bg-[var(--color-purple)] text-white',
    'border-[2px] border-[#5B21B6]',
    'shadow-[2px_2px_0_0_#5B21B6]'
  ),
  secondary: cn(
    'bg-[var(--color-surface-elevated)] text-white',
    'border-[2px] border-[var(--color-border)]',
    'shadow-[2px_2px_0_0_var(--color-border)]'
  ),
  success: cn(
    'bg-[var(--color-green)] text-white',
    'border-[2px] border-[#0D9668]',
    'shadow-[2px_2px_0_0_#0D9668]'
  ),
  warning: cn(
    'bg-[var(--color-amber)] text-[var(--color-background)]',
    'border-[2px] border-[#FF8F00]',
    'shadow-[2px_2px_0_0_#FF8F00]'
  ),
  danger: cn(
    'bg-[var(--color-red)] text-white',
    'border-[2px] border-[#DC2626]',
    'shadow-[2px_2px_0_0_#DC2626]'
  ),
  info: cn(
    'bg-[var(--color-cyan)] text-[var(--color-background)]',
    'border-[2px] border-[#00A3B5]',
    'shadow-[2px_2px_0_0_#00A3B5]'
  ),
  electric: cn(
    'bg-[#00FF94] text-[var(--color-background)]',
    'border-[2px] border-[#00CC76]',
    'shadow-[3px_3px_0_0_#00CC76]'
  ),
  legendary: cn(
    'bg-gradient-to-r from-[#FFC107] via-[#FF8F00] to-[#FFC107]',
    'text-[var(--color-background)]',
    'border-[3px] border-[#FF8F00]',
    'shadow-[3px_3px_0_0_#FF8F00]',
    'animate-gradientShift'
  ),
  epic: cn(
    'bg-[var(--color-purple)] text-white',
    'border-[2px] border-[#5B21B6]',
    'shadow-[3px_3px_0_0_#5B21B6]'
  ),
  rare: cn(
    'bg-[var(--color-cyan)] text-[var(--color-background)]',
    'border-[2px] border-[#00A3B5]',
    'shadow-[2px_2px_0_0_#00A3B5]'
  ),
};

// ============================================================================
// SIZE STYLES
// ============================================================================

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs min-h-[20px]',
  md: 'px-3 py-1 text-sm min-h-[24px]',
  lg: 'px-4 py-1.5 text-base min-h-[28px]',
};

// ============================================================================
// COMPONENT
// ============================================================================

export const BadgeHypermax = React.forwardRef<HTMLSpanElement, BadgeHypermaxProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      shape = 'pill',
      icon,
      pulse = false,
      glow = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <motion.span
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center gap-1.5',
          'font-bold uppercase tracking-wide',
          'transition-all duration-200',
          // Variant styles
          variantStyles[variant],
          // Size styles
          sizeStyles[size],
          // Shape styles
          shape === 'pill' ? 'rounded-full' : 'rounded-[4px]',
          // Pulse animation
          pulse && 'animate-pulse',
          // Glow effect
          glow && 'drop-shadow-[0_0_10px_rgba(124,58,237,0.6)]',
          // Custom className
          className
        )}
        initial={false}
        whileHover={{ scale: 1.05 }}
        {...props}
      >
        {/* Icon */}
        {icon && (
          <span className="flex-shrink-0 w-[1em] h-[1em]" aria-hidden="true">
            {icon}
          </span>
        )}

        {/* Label */}
        {children && <span className="flex-shrink-0">{children}</span>}
      </motion.span>
    );
  }
);

BadgeHypermax.displayName = 'BadgeHypermax';

// ============================================================================
// NOTIFICATION BADGE (Dot indicator)
// ============================================================================

export interface NotificationBadgeHypermaxProps extends Omit<BadgeHypermaxProps, 'children' | 'icon'> {
  /** Notification count */
  count?: number;
  /** Max count to display (shows "99+" if exceeded) */
  max?: number;
}

export const NotificationBadgeHypermax = React.forwardRef<HTMLSpanElement, NotificationBadgeHypermaxProps>(
  ({ count = 0, max = 99, variant = 'danger', size = 'sm', pulse = true, ...props }, ref) => {
    if (count === 0) return null;

    const displayCount = count > max ? `${max}+` : count.toString();

    return (
      <BadgeHypermax
        ref={ref}
        variant={variant}
        size={size}
        shape="pill"
        pulse={pulse}
        {...props}
      >
        {displayCount}
      </BadgeHypermax>
    );
  }
);

NotificationBadgeHypermax.displayName = 'NotificationBadgeHypermax';

export default BadgeHypermax;
