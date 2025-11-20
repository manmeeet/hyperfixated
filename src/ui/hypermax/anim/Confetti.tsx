/**
 * Confetti - Celebration confetti effect
 *
 * Full-screen confetti animation for achievements, level-ups, and celebrations.
 * Uses canvas for performance with many particles.
 */

'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================================
// TYPES
// ============================================================================

export interface ConfettiProps {
  /** Show confetti? */
  show: boolean;
  /** Duration in milliseconds */
  duration?: number;
  /** Number of confetti pieces */
  count?: number;
  /** Color palette */
  colors?: string[];
  /** Callback when animation completes */
  onComplete?: () => void;
}

// ============================================================================
// CONFETTI PARTICLE
// ============================================================================

interface ConfettiParticle {
  x: number;
  y: number;
  rotation: number;
  rotationSpeed: number;
  velocityX: number;
  velocityY: number;
  width: number;
  height: number;
  color: string;
  opacity: number;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const Confetti: React.FC<ConfettiProps> = ({
  show,
  duration = 3000,
  count = 150,
  colors = ['#7C3AED', '#FF6B9D', '#00D4E7', '#FFC107', '#10B981', '#FF3366'],
  onComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const particlesRef = useRef<ConfettiParticle[]>([]);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!show || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize particles
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      velocityX: (Math.random() - 0.5) * 4,
      velocityY: Math.random() * 3 + 2,
      width: Math.random() * 10 + 5,
      height: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 1,
    }));

    startTimeRef.current = Date.now();

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;
        particle.rotation += particle.rotationSpeed;

        // Gravity effect
        particle.velocityY += 0.1;

        // Fade out near the end
        if (progress > 0.7) {
          particle.opacity = 1 - (progress - 0.7) / 0.3;
        }

        // Draw particle
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate((particle.rotation * Math.PI) / 180);
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.fillRect(
          -particle.width / 2,
          -particle.height / 2,
          particle.width,
          particle.height
        );
        ctx.restore();
      });

      // Continue animation or complete
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        onComplete?.();
      }
    };

    animate();

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [show, duration, count, colors, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-[1600]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </AnimatePresence>
  );
};

// ============================================================================
// HOOK: useConfetti
// ============================================================================

export interface ConfettiOptions {
  /** Duration in milliseconds */
  duration?: number;
  /** Number of confetti pieces */
  count?: number;
  /** Color palette */
  colors?: string[];
}

export const useConfetti = (options: ConfettiOptions = {}) => {
  const [show, setShow] = React.useState(false);

  const triggerConfetti = () => {
    setShow(true);
  };

  const ConfettiComponent = () => (
    <Confetti
      show={show}
      duration={options.duration}
      count={options.count}
      colors={options.colors}
      onComplete={() => setShow(false)}
    />
  );

  return { triggerConfetti, ConfettiComponent };
};

export default Confetti;
