/**
 * Compatibility Wrappers
 *
 * These wrappers provide backwards-compatible APIs that map to Hypermax components.
 * Use these to gradually migrate existing code without breaking changes.
 *
 * @example
 * // Old code (still works):
 * import { Button, Card } from '@/src/ui/hypermax/wrappers';
 *
 * // New code (preferred):
 * import { ButtonHypermax, CardHypermax } from '@/src/ui/hypermax';
 */

import React from 'react';
import { ButtonHypermax, type ButtonHypermaxProps } from '../components/ButtonHypermax';
import { CardHypermax, type CardHypermaxProps } from '../components/CardHypermax';
import { BadgeHypermax, type BadgeHypermaxProps } from '../components/BadgeHypermax';
import { ChipHypermax, type ChipHypermaxProps } from '../components/ChipHypermax';

// ============================================================================
// BUTTON WRAPPER
// ============================================================================

/**
 * Button wrapper - maps common button props to ButtonHypermax
 * @deprecated Use ButtonHypermax directly for full control
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonHypermaxProps>((props, ref) => {
  return <ButtonHypermax ref={ref} {...props} />;
});

Button.displayName = 'Button';

// ============================================================================
// CARD WRAPPER
// ============================================================================

/**
 * Card wrapper - maps common card props to CardHypermax
 * @deprecated Use CardHypermax directly for full control
 */
export const Card = React.forwardRef<HTMLDivElement, CardHypermaxProps>((props, ref) => {
  return <CardHypermax ref={ref} {...props} />;
});

Card.displayName = 'Card';

// ============================================================================
// BADGE WRAPPER
// ============================================================================

/**
 * Badge wrapper - maps common badge props to BadgeHypermax
 * @deprecated Use BadgeHypermax directly for full control
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeHypermaxProps>((props, ref) => {
  return <BadgeHypermax ref={ref} {...props} />;
});

Badge.displayName = 'Badge';

// ============================================================================
// CHIP/TAG WRAPPER
// ============================================================================

/**
 * Tag wrapper - maps tag props to ChipHypermax
 * @deprecated Use ChipHypermax directly for full control
 */
export const Tag = React.forwardRef<HTMLDivElement, ChipHypermaxProps>((props, ref) => {
  return <ChipHypermax ref={ref} {...props} />;
});

Tag.displayName = 'Tag';

/**
 * Chip wrapper (alias for ChipHypermax)
 * @deprecated Use ChipHypermax directly
 */
export const Chip = ChipHypermax;
