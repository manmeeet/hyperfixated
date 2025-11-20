/**
 * Hypermaximalist Neobrutalist UI System
 *
 * Barrel export for all hypermax components, utilities, and theme tokens.
 * Use this file to import any hypermax UI element.
 *
 * @example
 * import { ButtonHypermax, CardHypermax, theme } from '@/src/ui/hypermax';
 */

// ============================================================================
// THEME & TOKENS
// ============================================================================
export { theme, colors, spacing, typography, animation } from './theme';
export type { Theme } from './theme';

// ============================================================================
// COMPONENTS
// ============================================================================
export { ButtonHypermax, IconButtonHypermax } from './components/ButtonHypermax';
export type { ButtonHypermaxProps, IconButtonHypermaxProps } from './components/ButtonHypermax';

export {
  CardHypermax,
  CardHeaderHypermax,
  CardBodyHypermax,
  CardFooterHypermax,
  BentoCardHypermax,
} from './components/CardHypermax';
export type {
  CardHypermaxProps,
  CardHeaderHypermaxProps,
  CardBodyHypermaxProps,
  CardFooterHypermaxProps,
  BentoCardHypermaxProps,
} from './components/CardHypermax';

export { BadgeHypermax, NotificationBadgeHypermax } from './components/BadgeHypermax';
export type { BadgeHypermaxProps, NotificationBadgeHypermaxProps } from './components/BadgeHypermax';

export { ChipHypermax, ChipGroupHypermax } from './components/ChipHypermax';
export type { ChipHypermaxProps, ChipGroupHypermaxProps } from './components/ChipHypermax';

export {
  ProgressBarHypermax,
  XpBarHypermax,
  CircularProgressHypermax,
} from './components/ProgressBarHypermax';
export type {
  ProgressBarHypermaxProps,
  XpBarHypermaxProps,
  CircularProgressHypermaxProps,
} from './components/ProgressBarHypermax';

export { AvatarHypermax, AvatarGroupHypermax } from './components/AvatarHypermax';
export type { AvatarHypermaxProps, AvatarGroupHypermaxProps } from './components/AvatarHypermax';

export { Mascot, useMascot } from './components/Mascot';
export type { MascotProps, UseMascotOptions } from './components/Mascot';

export { GridLayout, NavRail, DashboardHeader, GridItem } from './components/GridLayout';
export type {
  GridLayoutProps,
  NavRailProps,
  DashboardHeaderProps,
  GridItemProps,
} from './components/GridLayout';

// ============================================================================
// ANIMATION UTILITIES
// ============================================================================
export { XpPop, useXpPop } from './anim/XpPop';
export type { XpPopProps, XpPopOptions } from './anim/XpPop';

export { Confetti, useConfetti } from './anim/Confetti';
export type { ConfettiProps, ConfettiOptions } from './anim/Confetti';

export { CelebrationModal, useCelebration } from './anim/CelebrationModal';
export type { CelebrationModalProps, CelebrationOptions } from './anim/CelebrationModal';

// ============================================================================
// WRAPPERS (for compatibility)
// ============================================================================
// Export wrappers for gradual migration from existing components
export * from './wrappers';
