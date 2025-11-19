/**
 * Profile Page - User profile and settings
 */

'use client';

import React from 'react';
import ResponsiveLayout from '@/src/ui/hypermax/layouts/ResponsiveLayout';
import BottomNavHypermax from '@/src/ui/hypermax/components/BottomNavHypermax';
import { CardHypermax, CardHeaderHypermax, AvatarHypermax } from '@/src/ui/hypermax';
import { calculateUserLevel } from '@/src/lib/gamification';

export default function ProfilePage() {
  const totalXp = 1250;
  const userLevel = calculateUserLevel(totalXp);

  const header = (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
      <h1 className="text-2xl font-bold text-white flex items-center gap-2">
        <span role="img" aria-label="User">👤</span>
        Profile
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
          <div className="flex items-center gap-4 mb-6">
            <AvatarHypermax
              fallback="DU"
              size="xl"
              showLevelRing
              level={userLevel.level}
              levelProgress={Math.round((userLevel.currentXp / userLevel.requiredXp) * 100)}
              status="online"
              glow
            />
            <div>
              <h2 className="text-2xl font-black text-white">Demo User</h2>
              <p className="text-[var(--color-text-secondary)] mt-1">
                Level {userLevel.level} • {totalXp} XP
              </p>
            </div>
          </div>

          <CardHeaderHypermax title="Profile Settings" subtitle="Coming soon..." />
          <div className="mt-4 text-[var(--color-text-secondary)]">
            Profile customization and settings will appear here.
          </div>
        </CardHypermax>
      </div>
    </ResponsiveLayout>
  );
}
