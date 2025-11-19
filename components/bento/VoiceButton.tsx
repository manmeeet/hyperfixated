'use client';

import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { VoiceButtonState } from '@/types';

interface VoiceButtonProps {
  state: VoiceButtonState;
  onPress: () => void;
}

/**
 * Voice Button - The Hero Element
 *
 * Visual states:
 * - Idle: Purple gradient with subtle pulse
 * - Listening: Red gradient with recording pulse
 * - Processing: Orange gradient with spin
 * - Success: Green gradient with bounce
 *
 * Size adapts responsively:
 * - Mobile: 80px
 * - Tablet: 96px
 * - Desktop: 128px
 */
export function VoiceButton({ state, onPress }: VoiceButtonProps) {
  const controls = useAnimation();

  useEffect(() => {
    switch (state) {
      case 'idle':
        controls.start({
          scale: [1, 1.05, 1],
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
        });
        break;
      case 'listening':
        controls.start({
          scale: [1, 1.1, 1],
          transition: {
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          },
        });
        break;
      case 'processing':
        controls.start({
          rotate: 360,
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          },
        });
        break;
      case 'success':
        controls.start({
          scale: [1, 1.2, 1],
          transition: {
            duration: 0.6,
            ease: "easeOut",
          },
        });
        break;
    }
  }, [state, controls]);

  const gradientColors = getGradientColors(state);
  const icon = getIcon(state);

  return (
    <motion.button
      onClick={onPress}
      disabled={state !== 'idle'}
      animate={controls}
      className={`
        w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32
        rounded-full
        shadow-[0_4px_12px_rgba(0,0,0,0.3)]
        flex items-center justify-center
        cursor-pointer active:opacity-80
        disabled:cursor-not-allowed
        text-4xl md:text-5xl lg:text-6xl
      `}
      style={{
        background: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`,
      }}
    >
      {icon}
    </motion.button>
  );
}

function getGradientColors(state: VoiceButtonState): [string, string] {
  switch (state) {
    case 'idle':
      return ['#7C3AED', '#9F67FF'];
    case 'listening':
      return ['#EF4444', '#F87171'];
    case 'processing':
      return ['#FB923C', '#FDB572'];
    case 'success':
      return ['#10B981', '#34D399'];
  }
}

function getIcon(state: VoiceButtonState): string {
  switch (state) {
    case 'idle':
      return '🎤';
    case 'listening':
      return '🔴';
    case 'processing':
      return '⚙️';
    case 'success':
      return '✓';
  }
}
