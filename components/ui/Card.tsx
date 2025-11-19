import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type CardVariant = 'default' | 'gradient-purple' | 'gradient-cyan' | 'gradient-orange' | 'gradient-green' | 'gradient-pink' | 'gradient-animated' | 'glass';
type CardGlow = 'none' | 'purple' | 'pink' | 'cyan' | 'orange' | 'green' | 'pulse';

interface CardProps {
  children: ReactNode;
  className?: string;
  elevated?: boolean;
  variant?: CardVariant;
  glow?: CardGlow;
  shimmer?: boolean;
  hover?: boolean;
}

/**
 * Enhanced Card Component with Gamification
 *
 * Bento card styling with maximalist options:
 * - Multiple gradient variants
 * - Glow effects
 * - Shimmer animations
 * - Glass morphism
 * - Hover effects
 */
export function Card({
  children,
  className,
  elevated = false,
  variant = 'default',
  glow = 'none',
  shimmer = false,
  hover = true
}: CardProps) {
  const getVariantClass = () => {
    switch (variant) {
      case 'gradient-purple':
        return 'gradient-purple-pink border-transparent';
      case 'gradient-cyan':
        return 'gradient-cyan-blue border-transparent';
      case 'gradient-orange':
        return 'gradient-orange-red border-transparent';
      case 'gradient-green':
        return 'gradient-green-cyan border-transparent';
      case 'gradient-pink':
        return 'gradient-pink-orange border-transparent';
      case 'gradient-animated':
        return 'gradient-animated border-transparent';
      case 'glass':
        return 'glass';
      default:
        return elevated ? 'bg-[var(--bg-elevated)]' : 'bg-[var(--bg-secondary)]';
    }
  };

  const getGlowClass = () => {
    switch (glow) {
      case 'purple': return 'glow-purple';
      case 'pink': return 'glow-pink';
      case 'cyan': return 'glow-cyan';
      case 'orange': return 'glow-orange';
      case 'green': return 'glow-green';
      case 'pulse': return 'glow-pulse';
      default: return '';
    }
  };

  return (
    <div
      className={cn(
        'rounded-[12px] md:rounded-[16px]',
        'shadow-[0_4px_12px_rgba(0,0,0,0.15)]',
        'p-4 md:p-5 lg:p-6',
        variant === 'default' && 'border border-[var(--border-default)]',
        getVariantClass(),
        getGlowClass(),
        shimmer && 'shimmer',
        hover && 'card-gamified',
        className
      )}
    >
      {children}
    </div>
  );
}
