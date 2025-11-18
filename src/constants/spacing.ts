/**
 * HyperFocus AI - Spacing System
 *
 * Consistent spacing scale for layout and components
 */

export const Spacing = {
  // BASE SPACING SCALE
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
  '4xl': 64,

  // TOUCH TARGETS
  touchTarget: {
    mobile: {
      primary: 56,
      secondary: 48,
      icon: 44,
    },
    tablet: {
      primary: 48,
      secondary: 44,
      icon: 40,
    },
    desktop: {
      primary: 44,
      secondary: 40,
      icon: 36,
    },
  },

  // SAFE AREAS
  safeArea: {
    statusBar: 44,
    header: 56,
    bottomNav: 56,
    homeIndicator: 34,
  },

  // CARD SPACING
  card: {
    padding: {
      mobile: 16,
      tablet: 20,
      desktop: 24,
    },
    gap: {
      mobile: 12,
      tablet: 16,
      desktop: 20,
    },
    borderRadius: 12,
  },

  // CONTAINER PADDING
  container: {
    mobile: 16,
    tablet: 24,
    desktop: 32,
  },
} as const;

export type SpacingSize = keyof typeof Spacing;
