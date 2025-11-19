/**
 * ChipHypermax - Neobrutalist chip component
 *
 * Features:
 * - Interactive tag/filter element
 * - Removable (with close button)
 * - Selectable state
 * - Icon support
 * - Avatar support (for user chips)
 * - Color variants
 * - Size variants
 */

'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

// ============================================================================
// TYPES
// ============================================================================

export type ChipVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'electric';
export type ChipSize = 'sm' | 'md' | 'lg';

export interface ChipHypermaxProps extends Omit<HTMLMotionProps<'div'>, 'children' | 'onRemove'> {
  /** Chip variant */
  variant?: ChipVariant;
  /** Chip size */
  size?: ChipSize;
  /** Icon to display before text */
  icon?: React.ReactNode;
  /** Avatar to display before text */
  avatar?: React.ReactNode;
  /** Is the chip selected? */
  selected?: boolean;
  /** Is the chip removable? */
  removable?: boolean;
  /** Callback when remove button is clicked */
  onRemove?: () => void;
  /** Is the chip disabled? */
  disabled?: boolean;
  /** Children (chip label) */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
}

// ============================================================================
// VARIANT STYLES
// ============================================================================

const variantStyles: Record<ChipVariant, { default: string; selected: string }> = {
  default: {
    default: cn(
      'bg-[var(--color-surface)] text-white',
      'border-[2px] border-[var(--color-border)]',
      'hover:border-[var(--color-border-hover)]'
    ),
    selected: cn(
      'bg-[var(--color-surface-elevated)] text-white',
      'border-[3px] border-[var(--color-purple)]',
      'shadow-[2px_2px_0_0_rgba(124,58,237,0.5)]'
    ),
  },
  primary: {
    default: cn(
      'bg-[var(--color-purple)] bg-opacity-20 text-[var(--color-purple-light)]',
      'border-[2px] border-[var(--color-purple)]',
      'hover:bg-opacity-30'
    ),
    selected: cn(
      'bg-[var(--color-purple)] text-white',
      'border-[3px] border-[#5B21B6]',
      'shadow-[3px_3px_0_0_#5B21B6]'
    ),
  },
  success: {
    default: cn(
      'bg-[var(--color-green)] bg-opacity-20 text-[var(--color-green-light)]',
      'border-[2px] border-[var(--color-green)]',
      'hover:bg-opacity-30'
    ),
    selected: cn(
      'bg-[var(--color-green)] text-white',
      'border-[3px] border-[#0D9668]',
      'shadow-[3px_3px_0_0_#0D9668]'
    ),
  },
  warning: {
    default: cn(
      'bg-[var(--color-amber)] bg-opacity-20 text-[var(--color-amber)]',
      'border-[2px] border-[var(--color-amber)]',
      'hover:bg-opacity-30'
    ),
    selected: cn(
      'bg-[var(--color-amber)] text-[var(--color-background)]',
      'border-[3px] border-[#FF8F00]',
      'shadow-[3px_3px_0_0_#FF8F00]'
    ),
  },
  danger: {
    default: cn(
      'bg-[var(--color-red)] bg-opacity-20 text-[var(--color-red-light)]',
      'border-[2px] border-[var(--color-red)]',
      'hover:bg-opacity-30'
    ),
    selected: cn(
      'bg-[var(--color-red)] text-white',
      'border-[3px] border-[#DC2626]',
      'shadow-[3px_3px_0_0_#DC2626]'
    ),
  },
  electric: {
    default: cn(
      'bg-[#00FF94] bg-opacity-20 text-[#00FF94]',
      'border-[2px] border-[#00FF94]',
      'hover:bg-opacity-30'
    ),
    selected: cn(
      'bg-[#00FF94] text-[var(--color-background)]',
      'border-[3px] border-[#00CC76]',
      'shadow-[4px_4px_0_0_#00CC76]'
    ),
  },
};

// ============================================================================
// SIZE STYLES
// ============================================================================

const sizeStyles: Record<ChipSize, string> = {
  sm: 'px-2 py-1 text-xs min-h-[24px] gap-1',
  md: 'px-3 py-1.5 text-sm min-h-[32px] gap-1.5',
  lg: 'px-4 py-2 text-base min-h-[40px] gap-2',
};

// ============================================================================
// COMPONENT
// ============================================================================

export const ChipHypermax = React.forwardRef<HTMLDivElement, ChipHypermaxProps>(
  (
    {
      variant = 'default',
      size = 'md',
      icon,
      avatar,
      selected = false,
      removable = false,
      onRemove,
      disabled = false,
      children,
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    const styles = variantStyles[variant];
    const isInteractive = onClick && !disabled;

    // Icon/avatar size based on chip size
    const iconSize = {
      sm: '14px',
      md: '16px',
      lg: '20px',
    }[size];

    return (
      <motion.div
        ref={ref}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        aria-disabled={disabled}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center',
          'font-semibold uppercase tracking-wide',
          'rounded-full',
          'transition-all duration-200',
          // Variant styles
          selected ? styles.selected : styles.default,
          // Size styles
          sizeStyles[size],
          // Interactive styles
          isInteractive && 'cursor-pointer hover:scale-105',
          // Disabled styles
          disabled && 'opacity-50 cursor-not-allowed',
          // Custom className
          className
        )}
        onClick={disabled ? undefined : onClick}
        onKeyDown={
          isInteractive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick?.(e as any);
                }
              }
            : undefined
        }
        whileHover={isInteractive ? { scale: 1.05 } : undefined}
        whileTap={isInteractive ? { scale: 0.95 } : undefined}
        initial={false}
        {...props}
      >
        {/* Avatar */}
        {avatar && (
          <span
            className="flex-shrink-0 -ml-1 rounded-full overflow-hidden"
            style={{ width: iconSize, height: iconSize }}
          >
            {avatar}
          </span>
        )}

        {/* Icon */}
        {icon && !avatar && (
          <span className="flex-shrink-0" style={{ width: iconSize, height: iconSize }}>
            {icon}
          </span>
        )}

        {/* Label */}
        {children && <span className="flex-shrink-0">{children}</span>}

        {/* Remove button */}
        {removable && onRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className={cn(
              'flex-shrink-0 -mr-1 rounded-full',
              'hover:bg-black hover:bg-opacity-20',
              'transition-colors duration-150',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
            )}
            style={{ width: iconSize, height: iconSize }}
            aria-label="Remove"
            disabled={disabled}
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <path
                d="M4 4L12 12M12 4L4 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
      </motion.div>
    );
  }
);

ChipHypermax.displayName = 'ChipHypermax';

// ============================================================================
// CHIP GROUP (for managing multiple chips)
// ============================================================================

export interface ChipGroupHypermaxProps {
  /** Children (ChipHypermax components) */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Gap between chips */
  gap?: 'sm' | 'md' | 'lg';
}

export const ChipGroupHypermax: React.FC<ChipGroupHypermaxProps> = ({
  children,
  className,
  gap = 'md',
}) => {
  const gapStyles = {
    sm: 'gap-1',
    md: 'gap-2',
    lg: 'gap-3',
  };

  return (
    <div className={cn('flex flex-wrap items-center', gapStyles[gap], className)}>
      {children}
    </div>
  );
};

ChipGroupHypermax.displayName = 'ChipGroupHypermax';

export default ChipHypermax;
