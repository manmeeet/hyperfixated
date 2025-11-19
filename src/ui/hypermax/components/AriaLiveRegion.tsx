/**
 * AriaLiveRegion - Screen reader announcement system
 *
 * Features:
 * - Polite and assertive announcement modes
 * - Auto-clear announcements after timeout
 * - Multiple announcement queue support
 * - Invisible but accessible to screen readers
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';

export type AnnounceMode = 'polite' | 'assertive';

interface AriaLiveRegionProps {
  /** Unique ID for the live region */
  id?: string;
  /** Mode: 'polite' waits for pause, 'assertive' interrupts */
  mode?: AnnounceMode;
}

interface Announcement {
  id: string;
  message: string;
  timestamp: number;
}

// Global announcement queue
const announcementQueue: Announcement[] = [];
const listeners = new Set<(announcement: Announcement) => void>();

// Global announce function
export const announce = (message: string, mode: AnnounceMode = 'polite') => {
  const announcement: Announcement = {
    id: `${Date.now()}-${Math.random()}`,
    message,
    timestamp: Date.now(),
  };

  announcementQueue.push(announcement);
  listeners.forEach(listener => listener(announcement));
};

export default function AriaLiveRegion({
  id = 'aria-live-region',
  mode = 'polite',
}: AriaLiveRegionProps) {
  const [currentMessage, setCurrentMessage] = useState<string>('');

  const handleAnnouncement = useCallback((announcement: Announcement) => {
    setCurrentMessage(announcement.message);

    // Clear message after 3 seconds
    setTimeout(() => {
      setCurrentMessage('');
    }, 3000);
  }, []);

  useEffect(() => {
    listeners.add(handleAnnouncement);
    return () => {
      listeners.delete(handleAnnouncement);
    };
  }, [handleAnnouncement]);

  return (
    <div
      id={id}
      role="status"
      aria-live={mode}
      aria-atomic="true"
      className="sr-only"
    >
      {currentMessage}
    </div>
  );
}
