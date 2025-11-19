/**
 * Hypermax Actions Page
 *
 * Quick actions and shortcuts for common tasks.
 */

'use client';

import React from 'react';
import ResponsiveLayout from '@/src/ui/hypermax/layouts/ResponsiveLayout';
import BottomNavHypermax from '@/src/ui/hypermax/components/BottomNavHypermax';
import { CardHypermax, CardHeaderHypermax } from '@/src/ui/hypermax';

export default function ActionsPage() {
  const header = (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-white flex items-center gap-2">
        <span role="img" aria-label="Lightning">
          ⚡
        </span>
        Quick Actions
      </h1>
    </div>
  );

  return (
    <ResponsiveLayout
      mobileProps={{
        header: <div className="px-4 py-3">{header}</div>,
        bottomNav: <BottomNavHypermax />,
      }}
      desktopProps={{
        header: <div className="px-6 py-3">{header}</div>,
      }}
    >
      <div className="space-y-4 py-6">
        <CardHypermax variant="elevated" padding="lg">
          <CardHeaderHypermax title="Actions Dashboard" subtitle="Coming soon..." />
          <div className="mt-4 text-[var(--color-text-secondary)]">
            Quick actions and shortcuts will appear here.
          </div>
        </CardHypermax>
      </div>
    </ResponsiveLayout>
  );
}
