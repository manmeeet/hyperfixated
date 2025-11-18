/**
 * HyperFocus AI - Responsive Breakpoint System
 *
 * Mobile-first design with specific device targets
 */

export const Breakpoints = {
  mobile: 320,        // iPhone SE minimum
  mobileLg: 375,      // iPhone standard
  mobileXl: 414,      // iPhone Pro Max
  tablet: 768,        // iPad portrait
  tabletLg: 1024,     // iPad landscape
  desktop: 1280,      // Laptop minimum
  desktopXl: 1920,    // Desktop standard
} as const;

export const getDeviceType = (width: number): 'mobile' | 'tablet' | 'desktop' => {
  if (width < Breakpoints.tablet) return 'mobile';
  if (width < Breakpoints.desktop) return 'tablet';
  return 'desktop';
};

export type DeviceType = 'mobile' | 'tablet' | 'desktop';
