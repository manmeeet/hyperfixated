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

import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import AriaLiveRegion from '@/src/ui/hypermax/components/AriaLiveRegion';

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
  const bottomNavRef = useRef<HTMLDivElement>(null);
  const [bottomNavHeight, setBottomNavHeight] = useState<number>(96); // Default fallback

  useEffect(() => {
    if (!bottomNavRef.current) return;

    // Measure actual bottom nav height
    const updateHeight = () => {
      if (bottomNavRef.current) {
        const height = bottomNavRef.current.offsetHeight;
        setBottomNavHeight(height + 16); // Add 16px extra padding
      }
    };

    // Initial measurement
    updateHeight();

    // Update on window resize
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [bottomNav]);

  return (
    <div
      className={cn(
        'min-h-screen flex flex-col',
        'bg-[var(--color-background)]',
        className
      )}
    >
      {/* Skip Navigation Link - Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[9999] focus:bg-[var(--color-purple)] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50"
      >
        Skip to main content
      </a>

      {/* Header - Sticky with SafeArea support */}
      {header && (
        <header
          className="sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-purple-900/80 via-pink-900/80 to-purple-900/80 border-b border-white/10 shadow-lg"
          style={{ paddingTop: 'max(env(safe-area-inset-top), 12px)' }}
        >
          {header}
        </header>
      )}

      {/* Main Content - Scrollable, centered, max-width */}
      <main
        id="main-content"
        className={cn(
          'flex-1 overflow-y-auto',
          'w-full max-w-[480px] mx-auto',
          'px-4'
        )}
        style={{ paddingBottom: bottomNav ? `${bottomNavHeight}px` : '32px' }}
      >
        {children}
      </main>

      {/* Bottom Navigation - Fixed with SafeArea support */}
      {bottomNav && (
        <nav
          ref={bottomNavRef}
          className="fixed bottom-0 left-0 right-0 z-40 backdrop-blur-xl bg-gradient-to-r from-purple-900 via-pink-900 to-purple-900 border-t border-white/20 px-2 py-2"
          style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 8px)' }}
          aria-label="Mobile navigation"
        >
          <div className="max-w-[480px] mx-auto">
            {bottomNav}
          </div>
        </nav>
      )}

      {/* ARIA Live Region for screen reader announcements */}
      <AriaLiveRegion mode="polite" />
    </div>
  );
}
