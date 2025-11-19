/**
 * useWindowWidth Hook
 *
 * Returns current window width and updates on resize.
 * Used for responsive layout switching (Desktop vs Mobile).
 */

'use client';

import { useState, useEffect } from 'react';

export function useWindowWidth(): number {
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    // Handler to update width
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler immediately to set initial width
    handleResize();

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowWidth;
}
