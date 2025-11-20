/**
 * Stats Page - Statistics and analytics
 */

'use client';

import React from 'react';
import ResponsiveLayout from '@/src/ui/hypermax/layouts/ResponsiveLayout';
import BottomNavHypermax from '@/src/ui/hypermax/components/BottomNavHypermax';
import { CardHypermax, CardHeaderHypermax } from '@/src/ui/hypermax';

export default function StatsPage() {
  const header = (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
      <h1 className="text-2xl font-bold text-white flex items-center gap-2">
        <span role="img" aria-label="Chart">📊</span>
        Statistics
      </h1>
    </div>
  );

  const navItems = [
    { href: '/', label: 'Home', icon: '🏠', gradient: 'gradient-purple-pink' },
    { href: '/actions', label: 'Actions', icon: '⚡', gradient: 'gradient-amber-orange' },
    { href: '/voice', label: 'Voice', icon: '🎤', gradient: 'gradient-cyan-blue' },
    { href: '/stats', label: 'Stats', icon: '📊', gradient: 'gradient-green-cyan' },
    { href: '/profile', label: 'Profile', icon: '👤', gradient: 'gradient-pink-orange' }
  ];

  return (
    <ResponsiveLayout
      mobileProps={{
        header,
        bottomNav: <BottomNavHypermax items={navItems} />,
      }}
      desktopProps={{
        header,
      }}
    >
      <div className="space-y-4 py-6">
        <CardHypermax variant="elevated" padding="lg">
          <CardHeaderHypermax title="Your Statistics" subtitle="Coming soon..." />
          <div className="mt-4 text-[var(--color-text-secondary)]">
            Detailed analytics and statistics will appear here.
          </div>
        </CardHypermax>
      </div>
    </ResponsiveLayout>
  );
}
