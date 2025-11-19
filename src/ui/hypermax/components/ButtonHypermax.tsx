/**
 * ButtonHypermax - Neobrutalist button component
 *
 * Features:
 * - Thick borders (4px neobrutalist style)
 * - Hard offset shadows with brand colors
 * - Bold typography
 * - Framer Motion spring animations
 * - Multiple variants (primary, secondary, success, danger, electric)
 * - Size variants (sm, md, lg, xl)
 * - Icon support (left/right/only)
 * - Full accessibility (keyboard, ARIA, focus states)
 * - ADHD-friendly: clear states, satisfying feedback
 */

'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { theme } from '../theme';
import { cn } from '@/lib/utils';

// ============================================================================
// TYPES
// ============================================================================

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'electric' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonHypermaxProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  /** Button variant (visual style) */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Icon to display before text */
  iconLeft?: React.ReactNode;
  /** Icon to display after text */
  iconRight?: React.ReactNode;
  /** Full width button */
  fullWidth?: boolean;
  /** Loading state (shows spinner, disables interaction) */
  loading?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Children (button label) */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Should the button glow on hover? (gamification effect) */
  glowOnHover?: boolean;
}

// ============================================================================
// VARIANT STYLES
// ============================================================================

const variantStyles: Record<ButtonVariant, string> = {
  primary: cn(
    'bg-[var(--color-purple)] text-white',
    'border-[4px] border-[#5B21B6]',
    'shadow-[4px_4px_0_0_#5B21B6]',
    'hover:shadow-[6px_6px_0_0_#5B21B6]',
    'active:shadow-[2px_2px_0_0_#5B21B6] active:translate-x-[2px] active:translate-y-[2px]'
  ),
  secondary: cn(
    'bg-[var(--color-surface)] text-white',
    'border-[4px] border-[var(--color-border)]',
    'shadow-[4px_4px_0_0_var(--color-border)]',
    'hover:shadow-[6px_6px_0_0_var(--color-border)]',
    'active:shadow-[2px_2px_0_0_var(--color-border)] active:translate-x-[2px] active:translate-y-[2px]'
  ),
  success: cn(
    'bg-[var(--color-green)] text-white',
    'border-[4px] border-[#0D9668]',
    'shadow-[4px_4px_0_0_#0D9668]',
    'hover:shadow-[6px_6px_0_0_#0D9668]',
    'active:shadow-[2px_2px_0_0_#0D9668] active:translate-x-[2px] active:translate-y-[2px]'
  ),
  danger: cn(
    'bg-[var(--color-red)] text-white',
    'border-[4px] border-[#DC2626]',
    'shadow-[4px_4px_0_0_#DC2626]',
    'hover:shadow-[6px_6px_0_0_#DC2626]',
    'active:shadow-[2px_2px_0_0_#DC2626] active:translate-x-[2px] active:translate-y-[2px]'
  ),
  electric: cn(
    'bg-[#00FF94] text-[var(--color-background)]',
    'border-[4px] border-[#00CC76]',
    'shadow-[6px_6px_0_0_#00CC76]',
    'hover:shadow-[8px_8px_0_0_#00CC76]',
    'active:shadow-[3px_3px_0_0_#00CC76] active:translate-x-[3px] active:translate-y-[3px]'
  ),
  ghost: cn(
    'bg-transparent text-white',
    'border-[2px] border-[var(--color-border)]',
    'hover:bg-[var(--color-surface)]',
    'active:bg-[var(--color-surface-elevated)]'
  ),
};

// ============================================================================
// SIZE STYLES
// ============================================================================

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm min-h-[32px]',
  md: 'px-4 py-2 text-base min-h-[40px]',
  lg: 'px-6 py-3 text-lg min-h-[48px]',
  xl: 'px-8 py-4 text-xl min-h-[56px]',
};

// ============================================================================
// COMPONENT
// ============================================================================

export const ButtonHypermax = React.forwardRef<HTMLButtonElement, ButtonHypermaxProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      iconLeft,
      iconRight,
      fullWidth = false,
      loading = false,
      disabled = false,
      children,
      className,
      glowOnHover = false,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    // Icon sizes based on button size
    const iconSize = {
      sm: '16px',
      md: '20px',
      lg: '24px',
      xl: '28px',
    }[size];

    return (
      <motion.button
        ref={ref}
        type="button"
        disabled={isDisabled}
        className={cn(
          // Base styles
          'relative inline-flex items-center justify-center gap-2',
          'font-bold uppercase tracking-wide',
          'transition-all duration-200',
          'focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-purple)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
          // Variant styles
          variantStyles[variant],
          // Size styles
          sizeStyles[size],
          // Full width
          fullWidth && 'w-full',
          // Glow effect
          glowOnHover && 'hover:drop-shadow-[0_0_20px_rgba(124,58,237,0.6)]',
          // Custom className
          className
        )}
        // Framer Motion animations
        whileHover={!isDisabled ? { scale: 1.02 } : undefined}
        whileTap={!isDisabled ? { scale: 0.98 } : undefined}
        initial={false}
        {...props}
      >
        {/* Loading spinner */}
        {loading && (
          <motion.div
            className="w-[1em] h-[1em] border-[2px] border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
            aria-hidden="true"
          />
        )}

        {/* Left icon */}
        {!loading && iconLeft && (
          <span className="flex-shrink-0" style={{ width: iconSize, height: iconSize }}>
            {iconLeft}
          </span>
        )}

        {/* Button text */}
        {children && <span className="flex-shrink-0">{children}</span>}

        {/* Right icon */}
        {!loading && iconRight && (
          <span className="flex-shrink-0" style={{ width: iconSize, height: iconSize }}>
            {iconRight}
          </span>
        )}

        {/* Screen reader loading text */}
        {loading && <span className="sr-only">Loading...</span>}
      </motion.button>
    );
  }
);

ButtonHypermax.displayName = 'ButtonHypermax';

// ============================================================================
// ICON-ONLY VARIANT
// ============================================================================

export interface IconButtonHypermaxProps extends Omit<ButtonHypermaxProps, 'iconLeft' | 'iconRight' | 'children'> {
  /** Icon to display */
  icon: React.ReactNode;
  /** Accessible label for screen readers */
  'aria-label': string;
}

export const IconButtonHypermax = React.forwardRef<HTMLButtonElement, IconButtonHypermaxProps>(
  ({ icon, size = 'md', className, ...props }, ref) => {
    const iconSize = {
      sm: '16px',
      md: '20px',
      lg: '24px',
      xl: '28px',
    }[size];

    const buttonSize = {
      sm: 'w-8 h-8 p-0',
      md: 'w-10 h-10 p-0',
      lg: 'w-12 h-12 p-0',
      xl: 'w-14 h-14 p-0',
    }[size];

    return (
      <ButtonHypermax ref={ref} size={size} className={cn(buttonSize, className)} {...props}>
        <span style={{ width: iconSize, height: iconSize }}>{icon}</span>
      </ButtonHypermax>
    );
  }
);

IconButtonHypermax.displayName = 'IconButtonHypermax';

export default ButtonHypermax;
