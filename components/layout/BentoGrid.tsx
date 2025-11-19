'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

/**
 * Bento Grid Layout System
 *
 * Mobile: Vertical stack (full width)
 * Tablet: 2-column grid
 * Desktop: Full bento flexibility (3-column)
 *
 * Grid characteristics:
 * - Asymmetrical but balanced
 * - Content-driven sizing
 * - Responsive gaps based on device
 */
export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div
        className={cn(
          'p-4 md:p-6 lg:p-8',
          'flex flex-col md:flex-row md:flex-wrap',
          'gap-3 md:gap-4 lg:gap-5',
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
