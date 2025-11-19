import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  elevated?: boolean;
}

/**
 * Base Card Component
 *
 * Bento card styling:
 * - Rounded corners (12px)
 * - Subtle depth shadow
 * - Solid border
 * - Responsive padding
 */
export function Card({ children, className, elevated = false }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-[12px] border border-[var(--border-default)]',
        'shadow-[0_4px_12px_rgba(0,0,0,0.15)]',
        'p-4 md:p-5 lg:p-6',
        elevated ? 'bg-[var(--bg-elevated)]' : 'bg-[var(--bg-secondary)]',
        className
      )}
    >
      {children}
    </div>
  );
}
