/**
 * Accessibility Utilities
 * Provides ARIA labels and screen reader announcements
 */

export const getAriaLabel = (component: string, state: any): string => {
  const labels: Record<string, any> = {
    voiceButton: {
      idle: 'Start voice command',
      listening: 'Listening for your command',
      processing: 'Processing command',
      success: 'Command executed successfully',
      error: 'Command failed, try again'
    },
    focusTimer: {
      idle: 'Start focus timer',
      active: 'Focus timer running',
      paused: 'Timer paused',
      complete: 'Focus session complete'
    },
    taskItem: {
      incomplete: 'Task not completed, click to complete',
      complete: 'Task completed, click to mark incomplete'
    },
    energyLevel: {
      high: 'Energy level high',
      medium: 'Energy level medium',
      low: 'Energy level low'
    }
  };

  return labels[component]?.[state] || '';
};

/**
 * Announces a message to screen readers without visual display
 * Uses ARIA live regions for dynamic content updates
 */
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  if (typeof document === 'undefined') return;

  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove after announcement is made
  setTimeout(() => {
    if (document.body.contains(announcement)) {
      document.body.removeChild(announcement);
    }
  }, 1000);
};

/**
 * Wraps emoji text with proper accessibility attributes
 */
export const accessibleEmoji = (emoji: string, label: string): string => {
  return `<span role="img" aria-label="${label}">${emoji}</span>`;
};

/**
 * Generates descriptive labels for progress indicators
 */
export const getProgressLabel = (current: number, total: number, itemName: string = 'items'): string => {
  const percentage = Math.round((current / total) * 100);
  return `${current} of ${total} ${itemName} completed, ${percentage} percent`;
};

/**
 * Validates and returns focus trap boundaries
 */
export const getFocusTrapElements = (container: HTMLElement): {
  first: HTMLElement | null;
  last: HTMLElement | null;
} => {
  const focusableElements = container.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  const visibleElements = Array.from(focusableElements).filter(
    el => el.offsetParent !== null && !el.hasAttribute('disabled')
  );

  return {
    first: visibleElements[0] || null,
    last: visibleElements[visibleElements.length - 1] || null
  };
};

/**
 * Keyboard navigation helpers
 */
export const keyboardNav = {
  isEnter: (e: KeyboardEvent) => e.key === 'Enter',
  isSpace: (e: KeyboardEvent) => e.key === ' ' || e.key === 'Spacebar',
  isEscape: (e: KeyboardEvent) => e.key === 'Escape' || e.key === 'Esc',
  isArrowUp: (e: KeyboardEvent) => e.key === 'ArrowUp',
  isArrowDown: (e: KeyboardEvent) => e.key === 'ArrowDown',
  isArrowLeft: (e: KeyboardEvent) => e.key === 'ArrowLeft',
  isArrowRight: (e: KeyboardEvent) => e.key === 'ArrowRight',
  isTab: (e: KeyboardEvent) => e.key === 'Tab',
};
