'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
  deviceType?: 'mobile' | 'tablet' | 'desktop';
}

/**
 * Bento Grid Layout System - Real CSS Grid Implementation
 *
 * Mobile: 1-column vertical stack
 * Tablet: 2-column grid
 * Desktop: 12-column grid with intelligent card spanning
 *
 * Grid characteristics:
 * - True CSS Grid (not flexbox)
 * - Asymmetrical but balanced
 * - Content-aware sizing based on component type
 * - Responsive gaps based on device
 */
export const BentoGrid: React.FC<BentoGridProps> = ({
  children,
  className,
  deviceType = 'desktop'
}) => {
  return (
    <div
      className={cn(
        'grid gap-3 md:gap-4 lg:gap-5 auto-rows-min',
        'grid-cols-1',          // Mobile: 1 column
        'md:grid-cols-2',       // Tablet: 2 columns
        'lg:grid-cols-12',      // Desktop: 12-column grid
        'max-w-7xl mx-auto',
        'p-4 md:p-6 lg:p-8',
        className
      )}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;

        // Assign grid spans based on component type
        const componentName = (child.type as any).displayName || (child.type as any).name || '';
        const gridClass = getGridClass(componentName, index);

        return React.cloneElement(child as React.ReactElement<any>, {
          className: cn(
            (child.props as any).className,
            gridClass
          )
        });
      })}
    </div>
  );
};

/**
 * Determines grid column/row spans based on component name
 * Implements the asymmetric bento layout pattern
 */
function getGridClass(componentName: string, index: number): string {
  // Hero cards span more space
  if (componentName.includes('CommandCenter')) {
    return 'lg:col-span-7 lg:row-span-2';
  }
  if (componentName.includes('FocusTimer')) {
    return 'lg:col-span-5 lg:row-span-2';
  }
  if (componentName.includes('SmartSchedule')) {
    return 'lg:col-span-12 lg:row-span-1';
  }
  if (componentName.includes('Stats') || componentName.includes('Achievements')) {
    return 'lg:col-span-6';
  }

  // New bento cards
  if (componentName.includes('MemoryPalace')) {
    return 'lg:col-span-8 lg:row-span-2';
  }
  if (componentName.includes('Energy')) {
    return 'lg:col-span-4 lg:row-span-2';
  }
  if (componentName.includes('InterestRotation')) {
    return 'lg:col-span-6';
  }
  if (componentName.includes('TaskBreakdown')) {
    return 'lg:col-span-6';
  }
  if (componentName.includes('IntegrationDiscovery')) {
    return 'lg:col-span-4';
  }

  // Default for other cards
  return 'lg:col-span-4';
}
