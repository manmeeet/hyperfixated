/**
 * ResponsiveLayout - Responsive layout switcher
 *
 * Automatically switches between Desktop and Mobile layouts
 * based on viewport width (breakpoint: 1024px).
 */

'use client';

import React from 'react';
import { useWindowWidth } from '../utils/useWindowWidth';
import MobileLayout, { type MobileLayoutProps } from './MobileLayout';
import DesktopLayout, { type DesktopLayoutProps } from './DesktopLayout';

export interface ResponsiveLayoutProps {
  children: React.ReactNode;
  /** Props for mobile layout */
  mobileProps?: Omit<MobileLayoutProps, 'children'>;
  /** Props for desktop layout */
  desktopProps?: Omit<DesktopLayoutProps, 'children'>;
  /** Breakpoint width (default: 1024px) */
  breakpoint?: number;
}

export default function ResponsiveLayout({
  children,
  mobileProps = {},
  desktopProps = {},
  breakpoint = 1024,
}: ResponsiveLayoutProps) {
  const windowWidth = useWindowWidth();

  // Desktop view (>= 1024px)
  if (windowWidth >= breakpoint) {
    return <DesktopLayout {...desktopProps}>{children}</DesktopLayout>;
  }

  // Mobile view (< 1024px)
  return <MobileLayout {...mobileProps}>{children}</MobileLayout>;
}
