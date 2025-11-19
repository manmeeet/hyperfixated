/**
 * Hypermax Index - Redirects to /hypermax/home
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HypermaxIndex() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/hypermax/home');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
      <div className="text-white">Redirecting to Home...</div>
    </div>
  );
}
