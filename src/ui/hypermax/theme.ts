/**
 * Hypermaximalist Neobrutalist Theme Tokens
 *
 * Design system for gamified, ADHD-friendly UI with:
 * - Duolingo-style gamification elements
 * - Neobrutalist flat color blocks & bold typography
 * - Hypermaximalist personality (oversized icons, playful states)
 * - Dense but hierarchical information architecture
 *
 * Extends existing CSS custom properties from app/globals.css
 */

// ============================================================================
// COLOR TOKENS - Flat, vibrant neobrutalist palette
// ============================================================================

export const colors = {
  // Primary brand colors (from existing globals.css)
  primary: {
    purple: 'var(--color-purple, #7C3AED)',
    purpleLight: 'var(--color-purple-light, #A78BFA)',
    purpleDark: 'var(--color-purple-dark, #5B21B6)',
  },
  accent: {
    pink: 'var(--color-pink, #FF6B9D)',
    pinkLight: 'var(--color-pink-light, #FFB6D9)',
    pinkDark: 'var(--color-pink-dark, #FF1B7C)',
    cyan: 'var(--color-cyan, #00D4E7)',
    cyanLight: 'var(--color-cyan-light, #7FECF7)',
    cyanDark: 'var(--color-cyan-dark, #00A3B5)',
    amber: 'var(--color-amber, #FFC107)',
    amberLight: 'var(--color-amber-light, #FFD54F)',
    amberDark: 'var(--color-amber-dark, #FF8F00)',
  },
  semantic: {
    success: 'var(--color-green, #10B981)',
    successLight: 'var(--color-green-light, #6EE7B7)',
    error: 'var(--color-red, #EF4444)',
    errorLight: 'var(--color-red-light, #FCA5A5)',
    warning: 'var(--color-orange, #F97316)',
    info: 'var(--color-blue, #3B82F6)',
  },
  surface: {
    background: 'var(--color-background, #0F0E1C)',
    surface: 'var(--color-surface, #1A192B)',
    surfaceElevated: 'var(--color-surface-elevated, #252440)',
    border: 'var(--color-border, #2D2B40)',
    borderHover: 'var(--color-border-hover, #3D3B55)',
  },
  text: {
    primary: 'var(--color-text, #FFFFFF)',
    secondary: 'var(--color-text-secondary, #A0A0B8)',
    tertiary: 'var(--color-text-tertiary, #6B6B80)',
    inverse: 'var(--color-background, #0F0E1C)',
  },
  // Neobrutalist solid block colors
  blocks: {
    electric: '#00FF94',
    hot: '#FF3366',
    solar: '#FFEE00',
    ocean: '#00D4FF',
    grape: '#9D4EDD',
    peach: '#FFB5A7',
    mint: '#B7EFC5',
    coral: '#FF6B6B',
  },
} as const;

// ============================================================================
// SPACING SCALE - Extends existing 4px base scale
// ============================================================================

export const spacing = {
  none: '0',
  xxs: 'var(--spacing-xs, 4px)',    // 4px
  xs: 'var(--spacing-sm, 8px)',      // 8px
  sm: 'var(--spacing-md, 12px)',     // 12px
  md: 'var(--spacing-lg, 16px)',     // 16px
  lg: 'var(--spacing-xl, 24px)',     // 24px
  xl: 'var(--spacing-2xl, 32px)',    // 32px
  xxl: 'var(--spacing-3xl, 48px)',   // 48px
  xxxl: 'var(--spacing-4xl, 64px)',  // 64px
  // Hypermaximalist oversized spacing
  huge: '96px',
  mega: '128px',
  ultra: '192px',
} as const;

// ============================================================================
// BORDER RADIUS - Neobrutalist sharp corners + playful rounded options
// ============================================================================

export const borderRadius = {
  none: '0',
  sharp: '0',                       // Neobrutalist default
  sm: 'var(--radius-sm, 6px)',      // Subtle round
  md: 'var(--radius-md, 12px)',     // Medium round
  lg: 'var(--radius-lg, 20px)',     // Large round
  xl: '32px',                        // Extra round
  full: 'var(--radius-full, 9999px)', // Pill shape
  blob: '30% 70% 70% 30% / 60% 40% 60% 40%', // Organic blob
} as const;

// ============================================================================
// TYPOGRAPHY SCALE - Bold, oversized, editorial hierarchy
// ============================================================================

export const typography = {
  // Font families
  fontFamily: {
    sans: 'var(--font-geist-sans, system-ui, -apple-system, sans-serif)',
    mono: 'var(--font-geist-mono, monospace)',
    display: 'var(--font-geist-sans, system-ui)', // Could be swapped for custom display font
  },

  // Font sizes (from globals.css)
  fontSize: {
    xs: 'var(--text-xs, 12px)',
    sm: 'var(--text-sm, 14px)',
    base: 'var(--text-base, 16px)',
    lg: 'var(--text-lg, 18px)',
    xl: 'var(--text-xl, 20px)',
    '2xl': 'var(--text-2xl, 24px)',
    '3xl': 'var(--text-3xl, 32px)',
    '4xl': 'var(--text-4xl, 40px)',
    // Hypermaximalist oversized titles
    '5xl': '48px',
    '6xl': '64px',
    '7xl': '80px',
    mega: '120px',
  },

  // Font weights
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    black: '900', // Extra bold for neobrutalist headings
  },

  // Line heights
  lineHeight: {
    tight: '1.1',
    snug: '1.25',
    normal: '1.5',
    relaxed: '1.75',
    loose: '2',
  },

  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

// ============================================================================
// ELEVATION / SHADOW - Neobrutalist hard shadows + soft glows
// ============================================================================

export const elevation = {
  // Neobrutalist hard shadows (offset shadows in brand colors)
  brutal: {
    sm: '2px 2px 0 0 rgba(124, 58, 237, 0.5)',
    md: '4px 4px 0 0 rgba(124, 58, 237, 0.7)',
    lg: '6px 6px 0 0 rgba(124, 58, 237, 0.9)',
    xl: '8px 8px 0 0 rgba(124, 58, 237, 1)',
    xxl: '12px 12px 0 0 rgba(124, 58, 237, 1)',
    // Colored variants
    pink: '6px 6px 0 0 #FF6B9D',
    cyan: '6px 6px 0 0 #00D4E7',
    amber: '6px 6px 0 0 #FFC107',
    electric: '6px 6px 0 0 #00FF94',
  },

  // Soft elevation (from globals.css)
  soft: {
    sm: 'var(--shadow-sm, 0 2px 8px rgba(0, 0, 0, 0.1))',
    md: 'var(--shadow-md, 0 4px 16px rgba(0, 0, 0, 0.2))',
    lg: 'var(--shadow-lg, 0 8px 24px rgba(0, 0, 0, 0.3))',
    xl: 'var(--shadow-xl, 0 16px 48px rgba(0, 0, 0, 0.4))',
  },

  // Glow effects (for gamification states)
  glow: {
    purple: '0 0 20px rgba(124, 58, 237, 0.6)',
    pink: '0 0 20px rgba(255, 107, 157, 0.6)',
    cyan: '0 0 20px rgba(0, 212, 231, 0.6)',
    success: '0 0 20px rgba(16, 185, 129, 0.6)',
    warning: '0 0 20px rgba(249, 115, 22, 0.6)',
    multi: '0 0 30px rgba(124, 58, 237, 0.4), 0 0 60px rgba(255, 107, 157, 0.3)',
  },
} as const;

// ============================================================================
// BORDERS - Neobrutalist thick borders
// ============================================================================

export const borders = {
  width: {
    none: '0',
    thin: '1px',
    medium: '2px',
    thick: '3px',
    ultra: '4px',   // Neobrutalist standard
    mega: '6px',    // Extra bold
  },
  style: {
    solid: 'solid',
    dashed: 'dashed',
    dotted: 'dotted',
    double: 'double',
  },
  // Pre-composed border utilities
  brutal: {
    default: '4px solid var(--color-border, #2D2B40)',
    purple: '4px solid var(--color-purple, #7C3AED)',
    pink: '4px solid var(--color-pink, #FF6B9D)',
    cyan: '4px solid var(--color-cyan, #00D4E7)',
    black: '4px solid #000000',
  },
} as const;

// ============================================================================
// ANIMATION TIMING - Duolingo-style playful motion
// ============================================================================

export const animation = {
  // Timing functions
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    // Playful easing
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    elastic: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },

  // Duration presets
  duration: {
    instant: '100ms',
    fast: '200ms',
    normal: '300ms',
    slow: '500ms',
    slower: '700ms',
    slowest: '1000ms',
  },

  // Delays
  delay: {
    none: '0ms',
    short: '100ms',
    medium: '200ms',
    long: '400ms',
  },

  // Framer Motion spring configs
  spring: {
    // Gentle bounce (buttons, cards)
    gentle: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 20,
    },
    // Playful bounce (gamification elements)
    playful: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 15,
    },
    // Energetic bounce (XP, achievements)
    energetic: {
      type: 'spring' as const,
      stiffness: 500,
      damping: 12,
    },
    // Wobbly (mascot, celebration)
    wobbly: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 10,
    },
  },
} as const;

// ============================================================================
// RESPONSIVE BREAKPOINTS - Desktop vs Mobile
// ============================================================================

export const breakpoints = {
  // Pixel values
  values: {
    mobile: 0,
    tablet: 768,
    desktop: 1024,
    wide: 1440,
    ultrawide: 1920,
  },

  // Media query strings
  up: {
    mobile: '@media (min-width: 0px)',
    tablet: '@media (min-width: 768px)',
    desktop: '@media (min-width: 1024px)',
    wide: '@media (min-width: 1440px)',
    ultrawide: '@media (min-width: 1920px)',
  },

  down: {
    mobile: '@media (max-width: 767px)',
    tablet: '@media (max-width: 1023px)',
    desktop: '@media (max-width: 1439px)',
    wide: '@media (max-width: 1919px)',
  },
} as const;

// ============================================================================
// Z-INDEX SCALE - Stacking context management
// ============================================================================

export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  overlay: 1200,
  modal: 1300,
  popover: 1400,
  toast: 1500,
  tooltip: 1600,
  mascot: 1700,  // Mascot should appear above most UI
} as const;

// ============================================================================
// COMPONENT VARIANTS - Pre-defined style combinations
// ============================================================================

export const variants = {
  // Button variants
  button: {
    primary: {
      bg: colors.primary.purple,
      color: colors.text.primary,
      border: borders.brutal.purple,
      shadow: elevation.brutal.md,
    },
    secondary: {
      bg: colors.surface.surface,
      color: colors.text.primary,
      border: borders.brutal.default,
      shadow: elevation.brutal.sm,
    },
    success: {
      bg: colors.semantic.success,
      color: colors.text.primary,
      border: '4px solid #0D9668',
      shadow: '4px 4px 0 0 #0D9668',
    },
    danger: {
      bg: colors.semantic.error,
      color: colors.text.primary,
      border: '4px solid #DC2626',
      shadow: '4px 4px 0 0 #DC2626',
    },
    electric: {
      bg: colors.blocks.electric,
      color: colors.text.inverse,
      border: '4px solid #00CC76',
      shadow: '6px 6px 0 0 #00CC76',
    },
  },

  // Card variants
  card: {
    default: {
      bg: colors.surface.surface,
      border: borders.brutal.default,
      shadow: elevation.brutal.sm,
    },
    elevated: {
      bg: colors.surface.surfaceElevated,
      border: borders.brutal.purple,
      shadow: elevation.brutal.md,
    },
    electric: {
      bg: colors.blocks.electric,
      border: borders.brutal.black,
      shadow: elevation.brutal.xxl,
    },
    gradient: {
      bg: 'linear-gradient(135deg, #7C3AED 0%, #FF6B9D 100%)',
      border: borders.brutal.pink,
      shadow: elevation.glow.multi,
    },
  },
} as const;

// ============================================================================
// GAMIFICATION TOKENS - XP, levels, streaks, achievements
// ============================================================================

export const gamification = {
  // XP bar colors
  xp: {
    fill: colors.accent.amber,
    track: colors.surface.surfaceElevated,
    glow: elevation.glow.warning,
  },

  // Streak colors
  streak: {
    active: colors.blocks.hot,
    inactive: colors.text.tertiary,
    fire: colors.accent.amber,
  },

  // Achievement rarity colors
  achievement: {
    common: colors.text.secondary,
    rare: colors.accent.cyan,
    epic: colors.primary.purple,
    legendary: colors.accent.amber,
  },

  // Level badges
  level: {
    beginner: colors.semantic.info,
    intermediate: colors.accent.cyan,
    advanced: colors.primary.purple,
    expert: colors.accent.amber,
    master: colors.blocks.electric,
  },
} as const;

// ============================================================================
// ICON SIZES - Hypermaximalist oversized icons
// ============================================================================

export const iconSizes = {
  xs: '16px',
  sm: '20px',
  md: '24px',
  lg: '32px',
  xl: '48px',
  xxl: '64px',
  huge: '96px',      // Oversized for hero elements
  mega: '128px',     // Hypermaximalist focal points
  ultra: '192px',    // Mascot size
} as const;

// ============================================================================
// EXPORTED THEME OBJECT
// ============================================================================

export const theme = {
  colors,
  spacing,
  borderRadius,
  typography,
  elevation,
  borders,
  animation,
  breakpoints,
  zIndex,
  variants,
  gamification,
  iconSizes,
} as const;

export type Theme = typeof theme;
export default theme;
