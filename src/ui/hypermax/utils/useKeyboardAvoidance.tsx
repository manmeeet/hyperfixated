/**
 * useKeyboardAvoidance - Hook for handling virtual keyboard on mobile
 *
 * Features:
 * - Auto-scrolls inputs into view when focused
 * - Accounts for virtual keyboard height
 * - Prevents inputs from being hidden behind keyboard
 * - Works with fixed bottom navigation
 */

'use client';

import { useEffect, useRef } from 'react';

interface KeyboardAvoidanceOptions {
  /** Extra offset from top of viewport (default: 100px) */
  offset?: number;
  /** Duration of scroll animation in ms (default: 300) */
  duration?: number;
}

export function useKeyboardAvoidance<T extends HTMLElement>(
  options: KeyboardAvoidanceOptions = {}
) {
  const { offset = 100, duration = 300 } = options;
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleFocus = (event: FocusEvent) => {
      const target = event.target as HTMLElement;

      // Check if the focused element is an input/textarea
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.isContentEditable
      ) {
        // Wait for virtual keyboard to appear
        setTimeout(() => {
          const rect = target.getBoundingClientRect();
          const viewportHeight = window.innerHeight;

          // Calculate if input is hidden or too close to bottom
          const isHidden = rect.bottom > viewportHeight - offset;

          if (isHidden) {
            // Calculate scroll position to move input into view
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const targetScrollTop = scrollTop + rect.top - offset;

            // Smooth scroll to position
            window.scrollTo({
              top: targetScrollTop,
              behavior: 'smooth',
            });

            // Fallback for browsers that don't support smooth scroll
            if (window.scrollY === scrollTop) {
              target.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
              });
            }
          }
        }, 100); // Small delay to ensure keyboard is rendering
      }
    };

    // Attach focus listener to element or its children
    element.addEventListener('focusin', handleFocus);

    return () => {
      element.removeEventListener('focusin', handleFocus);
    };
  }, [offset, duration]);

  return elementRef;
}
