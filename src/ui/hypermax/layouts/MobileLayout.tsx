/**
 * MobileLayout - Mobile-optimized layout wrapper
 *
 * Features:
 * - Single column layout with max-width constraint
 * - Sticky header with XP bar
 * - Bottom navigation (fixed)
 * - Scroll container for main content
 */

'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface MobileLayoutProps {
  children: React.ReactNode;
  /** Optional header content (XP bar, user info, etc.) */
  header?: React.ReactNode;
  /** Optional bottom navigation */
  bottomNav?: React.ReactNode;
  /** Custom class name */
  className?: string;
}

export default function MobileLayout({
  children,
  header,
  bottomNav,
  className,
}: MobileLayoutProps) {
  return (
    <div
      className={cn(
        'min-h-screen flex flex-col',
        'bg-[var(--color-background)]',
        className
      )}
    >
      {/* Header - Sticky */}
      {header && (
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-purple-900/80 via-pink-900/80 to-purple-900/80 border-b border-white/10 shadow-lg">
          {header}
        </header>
      )}

      {/* Main Content - Scrollable, centered, max-width */}
      <main
        id="main-content"
        className={cn(
          'flex-1 overflow-y-auto',
          'w-full max-w-[480px] mx-auto',
          'px-4',
          bottomNav ? 'pb-24' : 'pb-8' // Extra padding for bottom nav
        )}
      >
        {children}
      </main>

      {/* Bottom Navigation - Fixed */}
      {bottomNav && (
        <nav
          className="fixed bottom-0 left-0 right-0 z-40 backdrop-blur-xl bg-gradient-to-r from-purple-900 via-pink-900 to-purple-900 border-t border-white/20 px-2 py-2"
          aria-label="Mobile navigation"
        >
          <div className="max-w-[480px] mx-auto">
            {bottomNav}
          </div>
        </nav>
      )}
    </div>
  );
}
