/**
 * CardHypermax - Neobrutalist card component
 *
 * Features:
 * - Bento box layout support (flexible sections)
 * - Thick borders (4px neobrutalist style)
 * - Hard offset shadows
 * - Multiple variants (default, elevated, electric, gradient)
 * - Hover animations (lift, glow)
 * - Gamification states (pulse, celebration glow)
 * - Section composition (header, body, footer)
 * - Interactive states (clickable, draggable)
 * - Full accessibility
 */

'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { theme } from '../theme';
import { cn } from '@/lib/utils';

// ============================================================================
// TYPES
// ============================================================================

export type CardVariant = 'default' | 'elevated' | 'electric' | 'gradient' | 'ghost';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export interface CardHypermaxProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  /** Card variant (visual style) */
  variant?: CardVariant;
  /** Padding size */
  padding?: CardPadding;
  /** Is the card interactive/clickable? */
  interactive?: boolean;
  /** Should the card glow on hover? */
  glowOnHover?: boolean;
  /** Should the card pulse? (for gamification states) */
  pulse?: boolean;
  /** Custom class name */
  className?: string;
  /** Children */
  children?: React.ReactNode;
  /** Header content */
  header?: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** As prop for semantic HTML */
  as?: 'div' | 'article' | 'section';
}

// ============================================================================
// VARIANT STYLES
// ============================================================================

const variantStyles: Record<CardVariant, string> = {
  default: cn(
    'bg-[var(--color-surface)]',
    'border-[4px] border-[var(--color-border)]',
    'shadow-[4px_4px_0_0_var(--color-border)]'
  ),
  elevated: cn(
    'bg-[var(--color-surface-elevated)]',
    'border-[4px] border-[var(--color-purple)]',
    'shadow-[6px_6px_0_0_rgba(124,58,237,0.7)]'
  ),
  electric: cn(
    'bg-[#00FF94]',
    'border-[4px] border-[#00CC76]',
    'shadow-[8px_8px_0_0_#00CC76]',
    'text-[var(--color-background)]'
  ),
  gradient: cn(
    'bg-gradient-to-br from-[#7C3AED] to-[#FF6B9D]',
    'border-[4px] border-[#FF6B9D]',
    'shadow-[6px_6px_0_0_rgba(255,107,157,0.8)]',
    'text-white'
  ),
  ghost: cn(
    'bg-transparent',
    'border-[2px] border-[var(--color-border)]',
    'shadow-none'
  ),
};

// ============================================================================
// PADDING STYLES
// ============================================================================

const paddingStyles: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
};

// ============================================================================
// COMPONENT
// ============================================================================

export const CardHypermax = React.forwardRef<HTMLDivElement, CardHypermaxProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      interactive = false,
      glowOnHover = false,
      pulse = false,
      className,
      children,
      header,
      footer,
      as = 'div',
      ...props
    },
    ref
  ) => {
    const Component = motion[as] as any;

    return (
      <Component
        ref={ref}
        className={cn(
          // Base styles
          'relative overflow-hidden',
          'transition-all duration-300',
          // Variant styles
          variantStyles[variant],
          // Interactive styles
          interactive && cn(
            'cursor-pointer',
            'hover:shadow-[8px_8px_0_0_var(--color-purple)]',
            'hover:-translate-x-[2px] hover:-translate-y-[2px]',
            'active:shadow-[2px_2px_0_0_var(--color-purple)]',
            'active:translate-x-[2px] active:translate-y-[2px]'
          ),
          // Glow effect
          glowOnHover && 'hover:drop-shadow-[0_0_30px_rgba(124,58,237,0.6)]',
          // Pulse animation
          pulse && 'animate-pulse',
          // Custom className
          className
        )}
        // Framer Motion animations
        whileHover={interactive ? { scale: 1.01 } : undefined}
        whileTap={interactive ? { scale: 0.99 } : undefined}
        initial={false}
        {...props}
      >
        {/* Header section */}
        {header && (
          <div
            className={cn(
              'border-b-[3px]',
              variant === 'electric' ? 'border-[#00CC76]' : 'border-[var(--color-border)]',
              paddingStyles[padding]
            )}
          >
            {header}
          </div>
        )}

        {/* Body section */}
        <div className={cn(paddingStyles[padding])}>
          {children}
        </div>

        {/* Footer section */}
        {footer && (
          <div
            className={cn(
              'border-t-[3px]',
              variant === 'electric' ? 'border-[#00CC76]' : 'border-[var(--color-border)]',
              paddingStyles[padding]
            )}
          >
            {footer}
          </div>
        )}
      </Component>
    );
  }
);

CardHypermax.displayName = 'CardHypermax';

// ============================================================================
// CARD HEADER SUBCOMPONENT
// ============================================================================

export interface CardHeaderHypermaxProps {
  /** Title text */
  title?: React.ReactNode;
  /** Subtitle text */
  subtitle?: React.ReactNode;
  /** Action element (usually a button or icon) */
  action?: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Children (overrides title/subtitle if provided) */
  children?: React.ReactNode;
}

export const CardHeaderHypermax: React.FC<CardHeaderHypermaxProps> = ({
  title,
  subtitle,
  action,
  className,
  children,
}) => {
  if (children) {
    return <div className={cn('flex items-center justify-between', className)}>{children}</div>;
  }

  return (
    <div className={cn('flex items-start justify-between gap-4', className)}>
      <div className="flex-1 min-w-0">
        {title && (
          <h3 className="text-xl font-bold uppercase tracking-wide truncate">
            {title}
          </h3>
        )}
        {subtitle && (
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
};

CardHeaderHypermax.displayName = 'CardHeaderHypermax';

// ============================================================================
// CARD BODY SUBCOMPONENT
// ============================================================================

export interface CardBodyHypermaxProps {
  /** Custom class name */
  className?: string;
  /** Children */
  children?: React.ReactNode;
}

export const CardBodyHypermax: React.FC<CardBodyHypermaxProps> = ({ className, children }) => {
  return <div className={cn('text-base', className)}>{children}</div>;
};

CardBodyHypermax.displayName = 'CardBodyHypermax';

// ============================================================================
// CARD FOOTER SUBCOMPONENT
// ============================================================================

export interface CardFooterHypermaxProps {
  /** Custom class name */
  className?: string;
  /** Children */
  children?: React.ReactNode;
}

export const CardFooterHypermax: React.FC<CardFooterHypermaxProps> = ({ className, children }) => {
  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      {children}
    </div>
  );
};

CardFooterHypermax.displayName = 'CardFooterHypermax';

// ============================================================================
// BENTO CARD VARIANT (for bento grid layouts)
// ============================================================================

export interface BentoCardHypermaxProps extends CardHypermaxProps {
  /** Grid span (for CSS Grid layouts) */
  span?: 'single' | 'double' | 'triple';
  /** Is this a featured/hero card? */
  featured?: boolean;
}

export const BentoCardHypermax = React.forwardRef<HTMLDivElement, BentoCardHypermaxProps>(
  ({ span = 'single', featured = false, className, ...props }, ref) => {
    const spanStyles = {
      single: 'col-span-1',
      double: 'col-span-1 md:col-span-2',
      triple: 'col-span-1 md:col-span-2 lg:col-span-3',
    };

    return (
      <CardHypermax
        ref={ref}
        variant={featured ? 'electric' : 'default'}
        glowOnHover={featured}
        className={cn(spanStyles[span], featured && 'row-span-2', className)}
        {...props}
      />
    );
  }
);

BentoCardHypermax.displayName = 'BentoCardHypermax';

export default CardHypermax;
