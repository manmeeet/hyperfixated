/**
 * Mascot - Duolingo-style animated mascot character
 *
 * Features:
 * - Emotion states (happy, sad, excited, celebrate, thinking, sleeping)
 * - Idle animations (subtle breathing, blinking)
 * - Reactive animations based on user actions
 * - Speech bubble support
 * - Lazy-loaded for performance
 * - Positioned overlay (doesn't block interaction)
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// ============================================================================
// TYPES
// ============================================================================

export type MascotEmotion =
  | 'happy'
  | 'sad'
  | 'excited'
  | 'celebrate'
  | 'thinking'
  | 'sleeping'
  | 'neutral'
  | 'surprised'
  | 'tired';

export type MascotSize = 'sm' | 'md' | 'lg' | 'xl';
export type MascotPosition = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' | 'center';

export interface MascotProps {
  /** Current emotion state */
  emotion?: MascotEmotion;
  /** Size variant */
  size?: MascotSize;
  /** Position on screen */
  position?: MascotPosition;
  /** Speech bubble text */
  message?: string;
  /** Show mascot? */
  show?: boolean;
  /** Interactive (responds to clicks) */
  interactive?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Custom class name */
  className?: string;
  /** Custom image src (replace default placeholder) */
  imageSrc?: string;
}

// ============================================================================
// SIZE STYLES
// ============================================================================

const sizeStyles: Record<MascotSize, { container: string; bubble: string }> = {
  sm: {
    container: 'w-16 h-16',
    bubble: 'text-xs max-w-[120px]',
  },
  md: {
    container: 'w-24 h-24',
    bubble: 'text-sm max-w-[180px]',
  },
  lg: {
    container: 'w-32 h-32',
    bubble: 'text-base max-w-[240px]',
  },
  xl: {
    container: 'w-48 h-48',
    bubble: 'text-lg max-w-[320px]',
  },
};

// ============================================================================
// POSITION STYLES
// ============================================================================

const positionStyles: Record<MascotPosition, string> = {
  'bottom-left': 'bottom-8 left-8',
  'bottom-right': 'bottom-8 right-8',
  'top-left': 'top-8 left-8',
  'top-right': 'top-8 right-8',
  center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
};

// ============================================================================
// EMOTION COLORS/STYLES
// ============================================================================

const emotionStyles: Record<MascotEmotion, { bg: string; border: string; shadow: string }> = {
  happy: {
    bg: 'bg-gradient-to-br from-[#FFD54F] to-[#FFC107]',
    border: 'border-[#FF8F00]',
    shadow: 'shadow-[6px_6px_0_0_#FF8F00]',
  },
  sad: {
    bg: 'bg-gradient-to-br from-[#A0A0B8] to-[#6B6B80]',
    border: 'border-[#3D3B55]',
    shadow: 'shadow-[4px_4px_0_0_#3D3B55]',
  },
  excited: {
    bg: 'bg-gradient-to-br from-[#FF6B9D] to-[#FF3366]',
    border: 'border-[#FF1B7C]',
    shadow: 'shadow-[6px_6px_0_0_#FF1B7C]',
  },
  celebrate: {
    bg: 'bg-gradient-to-br from-[#00FF94] to-[#00D4E7]',
    border: 'border-[#00CC76]',
    shadow: 'shadow-[8px_8px_0_0_#00CC76]',
  },
  thinking: {
    bg: 'bg-gradient-to-br from-[#7C3AED] to-[#5B21B6]',
    border: 'border-[#3B1A8C]',
    shadow: 'shadow-[5px_5px_0_0_#3B1A8C]',
  },
  sleeping: {
    bg: 'bg-gradient-to-br from-[#3D3B55] to-[#2D2B40]',
    border: 'border-[#1A192B]',
    shadow: 'shadow-[4px_4px_0_0_#1A192B]',
  },
  neutral: {
    bg: 'bg-gradient-to-br from-[#7C3AED] to-[#A78BFA]',
    border: 'border-[#5B21B6]',
    shadow: 'shadow-[6px_6px_0_0_#5B21B6]',
  },
  surprised: {
    bg: 'bg-gradient-to-br from-[#FF8F00] to-[#FFC107]',
    border: 'border-[#FF6B00]',
    shadow: 'shadow-[6px_6px_0_0_#FF6B00]',
  },
  tired: {
    bg: 'bg-gradient-to-br from-[#6B6B80] to-[#5A5A70]',
    border: 'border-[#3D3B55]',
    shadow: 'shadow-[4px_4px_0_0_#3D3B55]',
  },
};

// ============================================================================
// EMOTION ANIMATIONS
// ============================================================================

const emotionAnimations: Record<MascotEmotion, any> = {
  happy: {
    scale: [1, 1.1, 1],
    rotate: [0, -5, 5, 0],
    transition: { duration: 0.6, repeat: Infinity, repeatDelay: 3 },
  },
  sad: {
    y: [0, 10, 0],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
  excited: {
    y: [0, -10, 0],
    scale: [1, 1.05, 1],
    transition: { duration: 0.5, repeat: Infinity, repeatDelay: 0.5 },
  },
  celebrate: {
    rotate: [0, -10, 10, -10, 10, 0],
    scale: [1, 1.1, 1],
    transition: { duration: 0.8, repeat: Infinity, repeatDelay: 2 },
  },
  thinking: {
    rotate: [0, -3, 3, -3, 3, 0],
    transition: { duration: 4, repeat: Infinity },
  },
  sleeping: {
    scale: [1, 1.02, 1],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
  neutral: {
    y: [0, -2, 0],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
  surprised: {
    scale: [1, 1.15, 1.05],
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  tired: {
    x: [0, -2, 2, 0],
    transition: { duration: 4, repeat: Infinity },
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export const Mascot: React.FC<MascotProps> = ({
  emotion = 'neutral',
  size = 'lg',
  position = 'bottom-right',
  message,
  show = true,
  interactive = true,
  onClick,
  className,
  imageSrc,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const styles = sizeStyles[size];
  const emotionStyle = emotionStyles[emotion];
  const animation = emotionAnimations[emotion];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={cn(
            'fixed z-[1700]',
            positionStyles[position],
            interactive && 'cursor-pointer',
            className
          )}
          initial={{ opacity: 0, scale: 0, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 100 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onClick={onClick}
        >
          {/* Speech bubble */}
          <AnimatePresence>
            {message && (
              <motion.div
                className={cn(
                  'absolute bottom-full mb-4 left-1/2 -translate-x-1/2',
                  'px-4 py-3',
                  'bg-white text-[var(--color-background)]',
                  'border-[3px] border-[var(--color-background)]',
                  'rounded-2xl',
                  'shadow-[4px_4px_0_0_rgba(0,0,0,0.3)]',
                  'font-semibold',
                  'whitespace-pre-wrap',
                  styles.bubble
                )}
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                {message}
                {/* Speech bubble tail */}
                <div
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b-[3px] border-r-[3px] border-[var(--color-background)] rotate-45"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mascot character */}
          <motion.div
            className={cn(
              'relative',
              'rounded-full',
              'border-[4px]',
              'flex items-center justify-center',
              'overflow-hidden',
              styles.container,
              emotionStyle.bg,
              emotionStyle.border,
              emotionStyle.shadow,
              isHovered && 'scale-110'
            )}
            animate={animation}
          >
            {/* Custom image or placeholder */}
            {imageSrc ? (
              <img src={imageSrc} alt="Mascot" className="w-full h-full object-cover" />
            ) : (
              /* Placeholder emoji/face */
              <div className="text-5xl select-none">
                {
                  {
                    happy: '😊',
                    sad: '😢',
                    excited: '🤩',
                    celebrate: '🎉',
                    thinking: '🤔',
                    sleeping: '😴',
                    neutral: '😐',
                    surprised: '😲',
                    tired: '😓',
                  }[emotion]
                }
              </div>
            )}
          </motion.div>

          {/* Hover glow effect */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ============================================================================
// HOOK: useMascot
// ============================================================================

export interface UseMascotOptions {
  /** Initial emotion */
  initialEmotion?: MascotEmotion;
  /** Size */
  size?: MascotSize;
  /** Position */
  position?: MascotPosition;
  /** Auto-hide message after duration (ms) */
  messageTimeout?: number;
}

export const useMascot = (options: UseMascotOptions = {}) => {
  const {
    initialEmotion = 'neutral',
    size = 'lg',
    position = 'bottom-right',
    messageTimeout = 5000,
  } = options;

  const [show, setShow] = React.useState(true);
  const [emotion, setEmotion] = React.useState<MascotEmotion>(initialEmotion);
  const [message, setMessage] = React.useState<string | undefined>();

  const showMascot = () => setShow(true);
  const hideMascot = () => setShow(false);

  const speak = (text: string, newEmotion?: MascotEmotion) => {
    if (newEmotion) setEmotion(newEmotion);
    setMessage(text);

    // Auto-hide message after timeout
    setTimeout(() => {
      setMessage(undefined);
    }, messageTimeout);
  };

  const changeEmotion = (newEmotion: MascotEmotion) => {
    setEmotion(newEmotion);
  };

  const MascotComponent = (props: Partial<MascotProps> = {}) => (
    <Mascot
      show={show}
      emotion={emotion}
      message={message}
      size={size}
      position={position}
      {...props}
    />
  );

  return {
    showMascot,
    hideMascot,
    speak,
    changeEmotion,
    MascotComponent,
  };
};

export default Mascot;
