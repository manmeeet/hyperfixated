/**
 * XpPop - Floating XP gain notification
 *
 * Duolingo-style XP popup that appears when user gains points.
 * Floats upward with spring physics and fades out.
 */

'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// ============================================================================
// TYPES
// ============================================================================

export interface XpPopProps {
  /** XP amount to display */
  amount: number;
  /** Show the popup? */
  show: boolean;
  /** Callback when animation completes */
  onComplete?: () => void;
  /** Custom class name */
  className?: string;
  /** Position variant */
  position?: 'center' | 'top-right' | 'bottom-center';
}

// ============================================================================
// COMPONENT
// ============================================================================

export const XpPop: React.FC<XpPopProps> = ({
  amount,
  show,
  onComplete,
  className,
  position = 'center',
}) => {
  const positionStyles = {
    center: 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
    'top-right': 'right-4 top-4',
    'bottom-center': 'left-1/2 bottom-4 -translate-x-1/2',
  };

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {show && (
        <motion.div
          className={cn(
            'fixed z-[1500] pointer-events-none',
            positionStyles[position],
            className
          )}
          initial={{ opacity: 0, scale: 0.5, y: 0 }}
          animate={{ opacity: 1, scale: 1, y: -60 }}
          exit={{ opacity: 0, scale: 0.8, y: -120 }}
          transition={{
            duration: 1.2,
            ease: [0.34, 1.56, 0.64, 1], // Custom spring curve
          }}
        >
          <div
            className={cn(
              'px-6 py-3',
              'bg-gradient-to-r from-[#FF8F00] via-[#FFC107] to-[#FFD54F]',
              'border-[4px] border-[#FF8F00]',
              'rounded-full',
              'shadow-[6px_6px_0_0_#FF8F00]',
              'flex items-center gap-2',
              'animate-bounce'
            )}
          >
            {/* XP icon/sparkle */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="animate-spin"
            >
              <path
                d="M12 2L14.09 8.26L20 10L14.09 11.74L12 18L9.91 11.74L4 10L9.91 8.26L12 2Z"
                fill="#0F0E1C"
              />
            </svg>

            {/* XP amount */}
            <span className="text-2xl font-black text-[#0F0E1C] uppercase tracking-wider">
              +{amount} XP
            </span>
          </div>

          {/* Sparkles around the badge */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#FFC107] rounded-full"
              style={{
                left: '50%',
                top: '50%',
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{
                scale: [0, 1, 0],
                opacity: [1, 1, 0],
                x: [0, Math.cos((i * Math.PI * 2) / 8) * 60],
                y: [0, Math.sin((i * Math.PI * 2) / 8) * 60],
              }}
              transition={{
                duration: 1,
                delay: 0.2,
                ease: 'easeOut',
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ============================================================================
// HOOK: useXpPop
// ============================================================================

export interface XpPopOptions {
  /** Position of the popup */
  position?: 'center' | 'top-right' | 'bottom-center';
  /** Duration before auto-hiding (ms) */
  duration?: number;
}

export const useXpPop = (options: XpPopOptions = {}) => {
  const { position = 'center', duration = 2000 } = options;
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState(0);

  const showXpPop = (xpAmount: number) => {
    setAmount(xpAmount);
    setShow(true);

    // Auto-hide after duration
    setTimeout(() => {
      setShow(false);
    }, duration);
  };

  const XpPopComponent = () => (
    <XpPop
      amount={amount}
      show={show}
      position={position}
      onComplete={() => setShow(false)}
    />
  );

  return { showXpPop, XpPopComponent };
};

export default XpPop;
