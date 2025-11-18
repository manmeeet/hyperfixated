/**
 * HyperFocus AI - Solid Color System
 *
 * CRITICAL: NO transparent colors, NO ambient gradients, NO excessive glows
 * Only solid colors with strategic use of gradients for PRIMARY CTAs only
 */

export const Colors = {
  // NEUTRAL BASE - Absolute no color temperature
  black: {
    pure: '#000000',      // hsl(0, 0%, 0%)
    soft: '#0A0A0A',      // hsl(0, 0%, 4%)
  },
  gray: {
    dark: '#141414',      // hsl(0, 0%, 8%)
    medium: '#1F1F1F',    // hsl(0, 0%, 12%)
    light: '#292929',     // hsl(0, 0%, 16%)
    lighter: '#333333',   // hsl(0, 0%, 20%)
  },
  white: {
    dark: '#D9D9D9',      // hsl(0, 0%, 85%)
    medium: '#EBEBEB',    // hsl(0, 0%, 92%)
    pure: '#FFFFFF',      // hsl(0, 0%, 100%)
  },

  // BRAND COLORS - Solid, no transparency
  purple: {
    primary: '#7C3AED',   // hsl(262, 83%, 58%)
    light: '#9F67FF',     // hsl(262, 83%, 68%)
    dark: '#6D28D9',      // hsl(262, 83%, 48%)
  },
  orange: {
    primary: '#FB923C',   // hsl(25, 95%, 53%)
    light: '#FDB572',     // hsl(25, 95%, 63%)
    dark: '#EA580C',      // hsl(25, 95%, 43%)
  },
  green: {
    primary: '#10B981',   // hsl(158, 64%, 52%)
    light: '#34D399',     // hsl(158, 64%, 62%)
    dark: '#059669',      // hsl(158, 64%, 42%)
  },
  red: {
    primary: '#EF4444',   // hsl(0, 84%, 60%)
    light: '#F87171',     // hsl(0, 84%, 70%)
    dark: '#DC2626',      // hsl(0, 84%, 50%)
  },
  blue: {
    primary: '#3B82F6',   // hsl(217, 91%, 60%)
    light: '#60A5FA',     // hsl(217, 91%, 70%)
    dark: '#2563EB',      // hsl(217, 91%, 50%)
  },

  // GRADIENTS - Only for primary CTAs and special elements
  gradients: {
    purple: ['#7C3AED', '#9F67FF'],
    orange: ['#FB923C', '#FDB572'],
    green: ['#10B981', '#34D399'],
    red: ['#EF4444', '#F87171'],
    blue: ['#3B82F6', '#60A5FA'],
    purpleOrange: ['#7C3AED', '#FB923C'], // Hero elements only
  },

  // SEMANTIC COLORS
  background: {
    primary: '#0A0A0A',
    secondary: '#141414',
    tertiary: '#1F1F1F',
    elevated: '#292929',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#EBEBEB',
    tertiary: '#D9D9D9',
    disabled: '#333333',
  },
  border: {
    default: '#292929',
    light: '#333333',
    focus: '#7C3AED',
  },

  // STATE COLORS
  state: {
    success: '#10B981',
    warning: '#FB923C',
    error: '#EF4444',
    info: '#3B82F6',
  },

  // RETRO TERMINAL COLORS
  terminal: {
    green: '#10B981',     // Matrix-style success
    amber: '#FB923C',     // Retro terminal warnings
    prompt: '#9F67FF',    // Command prompt color
  },
} as const;

export type ColorName = keyof typeof Colors;
