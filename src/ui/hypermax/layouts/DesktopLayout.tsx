/**
 * DesktopLayout - Desktop 3-column grid layout
 *
 * Features:
 * - 3-column grid: left nav rail, main content, right widgets
 * - Responsive column widths
 * - Centered with max-width constraint
 * - Sticky sidebars
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface DesktopLayoutProps {
  children: React.ReactNode;
  /** Left sidebar content (navigation, user summary) */
  leftSidebar?: React.ReactNode;
  /** Right sidebar content (widgets, mascot, stats) */
  rightSidebar?: React.ReactNode;
  /** Optional header */
  header?: React.ReactNode;
  /** Custom class name */
  className?: string;
}

export default function DesktopLayout({
  children,
  leftSidebar,
  rightSidebar,
  header,
  className,
}: DesktopLayoutProps) {
  return (
    <div className={cn('min-h-screen bg-[var(--color-background)]', className)}>
      {/* Header - Full width, sticky */}
      {header && (
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-purple-900/80 via-pink-900/80 to-purple-900/80 border-b border-white/10 shadow-lg">
          <div className="max-w-[1400px] mx-auto px-6 py-3">
            {header}
          </div>
        </header>
      )}

      {/* Main 3-column grid */}
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: leftSidebar && rightSidebar
              ? '320px 1fr 320px'
              : leftSidebar
              ? '320px 1fr'
              : rightSidebar
              ? '1fr 320px'
              : '1fr',
          }}
        >
          {/* Left Sidebar - Sticky */}
          {leftSidebar && (
            <aside className="sticky top-24 h-fit">
              {leftSidebar}
            </aside>
          )}

          {/* Main Content */}
          <main id="main-content" className="min-w-0">
            {children}
          </main>

          {/* Right Sidebar - Sticky */}
          {rightSidebar && (
            <aside className="sticky top-24 h-fit">
              {rightSidebar}
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
