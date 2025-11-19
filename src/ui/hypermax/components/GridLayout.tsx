/**
 * GridLayout - Bento-style responsive grid layout
 *
 * Features:
 * - Desktop: 3-4 column grid with left nav rail
 * - Mobile: Single column stacked layout
 * - Responsive breakpoints
 * - Sidebar support (left/right)
 * - Header support
 * - Footer support
 * - Customizable gaps and padding
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';

// ============================================================================
// TYPES
// ============================================================================

export interface GridLayoutProps {
  /** Children (grid items) */
  children?: React.ReactNode;
  /** Show sidebar? */
  showSidebar?: boolean;
  /** Sidebar position */
  sidebarPosition?: 'left' | 'right';
  /** Sidebar content */
  sidebar?: React.ReactNode;
  /** Header content */
  header?: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** Number of columns on desktop */
  columns?: 2 | 3 | 4;
  /** Gap between items */
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  /** Container padding */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Custom class name */
  className?: string;
}

// ============================================================================
// GAP STYLES
// ============================================================================

const gapStyles = {
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
};

// ============================================================================
// PADDING STYLES
// ============================================================================

const paddingStyles = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-4 md:p-6',
  lg: 'p-6 md:p-8',
};

// ============================================================================
// COMPONENT
// ============================================================================

export const GridLayout: React.FC<GridLayoutProps> = ({
  children,
  showSidebar = false,
  sidebarPosition = 'left',
  sidebar,
  header,
  footer,
  columns = 3,
  gap = 'lg',
  padding = 'md',
  className,
}) => {
  return (
    <div className={cn('min-h-screen bg-[var(--color-background)]', className)}>
      {/* Header */}
      {header && (
        <header className="sticky top-0 z-50 bg-[var(--color-surface)] border-b-[3px] border-[var(--color-border)]">
          {header}
        </header>
      )}

      {/* Main content area */}
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar (left) */}
        {showSidebar && sidebarPosition === 'left' && sidebar && (
          <aside
            className={cn(
              'w-full md:w-64 lg:w-72',
              'bg-[var(--color-surface)]',
              'border-r-[3px] border-[var(--color-border)]',
              'flex-shrink-0'
            )}
          >
            <div className="sticky top-16 p-4 md:p-6">{sidebar}</div>
          </aside>
        )}

        {/* Main grid content */}
        <main className={cn('flex-1', paddingStyles[padding])}>
          <div
            className={cn(
              'grid grid-cols-1',
              columns === 2 && 'md:grid-cols-2',
              columns === 3 && 'md:grid-cols-2 lg:grid-cols-3',
              columns === 4 && 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
              'auto-rows-auto',
              gapStyles[gap]
            )}
          >
            {children}
          </div>
        </main>

        {/* Sidebar (right) */}
        {showSidebar && sidebarPosition === 'right' && sidebar && (
          <aside
            className={cn(
              'w-full md:w-64 lg:w-72',
              'bg-[var(--color-surface)]',
              'border-l-[3px] border-[var(--color-border)]',
              'flex-shrink-0'
            )}
          >
            <div className="sticky top-16 p-4 md:p-6">{sidebar}</div>
          </aside>
        )}
      </div>

      {/* Footer */}
      {footer && (
        <footer className="bg-[var(--color-surface)] border-t-[3px] border-[var(--color-border)]">
          {footer}
        </footer>
      )}
    </div>
  );
};

// ============================================================================
// NAVIGATION RAIL (for sidebar)
// ============================================================================

export interface NavRailProps {
  /** Navigation items */
  items: Array<{
    id: string;
    label: string;
    icon?: React.ReactNode;
    href?: string;
    onClick?: () => void;
    active?: boolean;
    badge?: React.ReactNode;
  }>;
  /** Custom class name */
  className?: string;
}

export const NavRail: React.FC<NavRailProps> = ({ items, className }) => {
  return (
    <nav className={cn('space-y-2', className)}>
      {items.map((item) => {
        const Component = item.href ? 'a' : 'button';
        return (
          <Component
            key={item.id}
            href={item.href}
            onClick={item.onClick}
            className={cn(
              'w-full flex items-center gap-3 px-4 py-3',
              'text-left font-semibold uppercase tracking-wide text-sm',
              'border-[2px] rounded-lg',
              'transition-all duration-150',
              item.active
                ? cn(
                    'bg-[var(--color-purple)] text-white',
                    'border-[#5B21B6]',
                    'shadow-[3px_3px_0_0_#5B21B6]'
                  )
                : cn(
                    'bg-transparent text-[var(--color-text-secondary)]',
                    'border-[var(--color-border)]',
                    'hover:bg-[var(--color-surface-elevated)] hover:text-white'
                  )
            )}
          >
            {/* Icon */}
            {item.icon && (
              <span className="flex-shrink-0 w-5 h-5">{item.icon}</span>
            )}

            {/* Label */}
            <span className="flex-1 min-w-0 truncate">{item.label}</span>

            {/* Badge */}
            {item.badge && <span className="flex-shrink-0">{item.badge}</span>}
          </Component>
        );
      })}
    </nav>
  );
};

// ============================================================================
// DASHBOARD HEADER
// ============================================================================

export interface DashboardHeaderProps {
  /** User info */
  user?: {
    name: string;
    avatar?: React.ReactNode;
    level?: number;
    xp?: number;
  };
  /** Actions (buttons, etc.) */
  actions?: React.ReactNode;
  /** Custom class name */
  className?: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  user,
  actions,
  className,
}) => {
  return (
    <div className={cn('flex items-center justify-between p-4 md:p-6', className)}>
      {/* User info */}
      {user && (
        <div className="flex items-center gap-4">
          {/* Avatar */}
          {user.avatar && <div className="flex-shrink-0">{user.avatar}</div>}

          {/* Name & level */}
          <div className="min-w-0">
            <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-wide truncate">
              {user.name}
            </h1>
            {user.level !== undefined && (
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-[var(--color-text-secondary)] font-semibold">
                  Level {user.level}
                </span>
                {user.xp !== undefined && (
                  <span className="text-sm text-[var(--color-text-tertiary)]">
                    • {user.xp} XP
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      {actions && <div className="flex items-center gap-3 flex-shrink-0">{actions}</div>}
    </div>
  );
};

// ============================================================================
// GRID ITEM HELPERS
// ============================================================================

export interface GridItemProps {
  /** Column span */
  colSpan?: 1 | 2 | 3 | 4 | 'full';
  /** Row span */
  rowSpan?: 1 | 2 | 3 | 4;
  /** Children */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
}

export const GridItem: React.FC<GridItemProps> = ({
  colSpan = 1,
  rowSpan = 1,
  children,
  className,
}) => {
  const colSpanClasses = {
    1: 'col-span-1',
    2: 'col-span-1 md:col-span-2',
    3: 'col-span-1 md:col-span-2 lg:col-span-3',
    4: 'col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4',
    full: 'col-span-full',
  };

  const rowSpanClasses = {
    1: 'row-span-1',
    2: 'row-span-2',
    3: 'row-span-3',
    4: 'row-span-4',
  };

  return (
    <div className={cn(colSpanClasses[colSpan], rowSpanClasses[rowSpan], className)}>
      {children}
    </div>
  );
};

export default GridLayout;
