/**
 * HyperFocus AI - Typography System
 *
 * Mixing sans-serif for UI, monospace for data, script for celebrations
 */

export const Typography = {
  // FONT FAMILIES
  fonts: {
    sans: 'System',           // Default system font
    mono: 'monospace',        // For data, terminal, code
    display: 'System',        // For headers
  },

  // FONT SIZES - Type scale from 12px to 32px
  size: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 48,
    '6xl': 72,
  },

  // FONT WEIGHTS
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },

  // LINE HEIGHTS
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },

  // LETTER SPACING
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
  },
} as const;

export type FontSize = keyof typeof Typography.size;
export type FontWeight = keyof typeof Typography.weight;
