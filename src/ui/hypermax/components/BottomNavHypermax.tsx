/**
 * BottomNavHypermax - Bottom navigation with routing
 *
 * Features:
 * - Next.js Link-based navigation
 * - Active state indication
 * - Accessible (ARIA labels, keyboard navigation)
 * - Neobrutalist gradient styling
 * - Icon + label layout
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/src/ui/hypermax/utils/useReducedMotion';

export interface NavItem {
  href: string;
  label: string;
  icon: string;
  gradient?: string;
}

export interface BottomNavHypermaxProps {
  /** Navigation items */
  items?: NavItem[];
  /** Custom class name */
  className?: string;
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { href: '/hypermax/home', label: 'Home', icon: '🏠', gradient: 'gradient-purple-pink' },
  { href: '/hypermax/actions', label: 'Actions', icon: '⚡', gradient: 'gradient-amber-orange' },
  { href: '/hypermax/voice', label: 'Voice', icon: '🎤', gradient: 'gradient-cyan-blue' },
  { href: '/hypermax/stats', label: 'Stats', icon: '📊', gradient: 'gradient-green-cyan' },
  { href: '/hypermax/profile', label: 'Profile', icon: '👤', gradient: 'gradient-pink-orange' },
];

export default function BottomNavHypermax({
  items = DEFAULT_NAV_ITEMS,
  className,
}: BottomNavHypermaxProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={cn('flex justify-around items-center', className)}>
      {items.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex flex-col items-center gap-1 p-3 min-w-[72px] min-h-[48px] rounded-xl',
              !prefersReducedMotion && 'transition-all duration-300',
              isActive
                ? `${item.gradient} shadow-lg border border-white/30 ${!prefersReducedMotion ? 'scale-110' : ''}`
                : `bg-white/10 text-white/90 hover:bg-white/20 ${!prefersReducedMotion ? 'hover:scale-105' : ''}`
            )}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
          >
            <span
              className={cn('text-2xl', isActive && !prefersReducedMotion && 'bounce')}
              role="img"
              aria-hidden="true"
            >
              {item.icon}
            </span>
            <span
              className={cn(
                'text-xs font-semibold',
                isActive ? 'text-white' : 'text-white/80'
              )}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
