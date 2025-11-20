/**
 * CelebrationModal - Duolingo-style achievement celebration
 *
 * Full-screen celebration modal for achievements, level-ups, and milestones.
 * Features mascot, confetti, and satisfying animations.
 */

'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Confetti } from './Confetti';

// ============================================================================
// TYPES
// ============================================================================

export interface CelebrationModalProps {
  /** Show modal? */
  show: boolean;
  /** Title text */
  title: string;
  /** Description text */
  description?: string;
  /** Achievement icon/image */
  icon?: React.ReactNode;
  /** Confetti effect? */
  showConfetti?: boolean;
  /** Primary action button text */
  primaryActionText?: string;
  /** Primary action callback */
  onPrimaryAction?: () => void;
  /** Secondary action button text */
  secondaryActionText?: string;
  /** Secondary action callback */
  onSecondaryAction?: () => void;
  /** Close callback */
  onClose?: () => void;
  /** Custom class name */
  className?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  show,
  title,
  description,
  icon,
  showConfetti = true,
  primaryActionText = 'Continue',
  onPrimaryAction,
  secondaryActionText,
  onSecondaryAction,
  onClose,
  className,
}) => {
  const handlePrimaryAction = () => {
    onPrimaryAction?.();
    onClose?.();
  };

  const handleSecondaryAction = () => {
    onSecondaryAction?.();
    onClose?.();
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Confetti */}
          {showConfetti && <Confetti show={show} duration={4000} count={200} />}

          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[1400]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center p-4 z-[1400] pointer-events-none">
            <motion.div
              className={cn(
                'relative w-full max-w-md',
                'bg-[var(--color-surface)]',
                'border-[4px] border-[var(--color-purple)]',
                'rounded-3xl',
                'shadow-[8px_8px_0_0_rgba(124,58,237,0.8)]',
                'p-8',
                'pointer-events-auto',
                className
              )}
              initial={{ opacity: 0, scale: 0.5, y: 100 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{ opacity: 0, scale: 0.8, y: 100 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
              }}
            >
              {/* Close button */}
              {onClose && (
                <button
                  onClick={onClose}
                  className={cn(
                    'absolute top-4 right-4',
                    'w-8 h-8',
                    'bg-[var(--color-surface-elevated)]',
                    'border-[2px] border-[var(--color-border)]',
                    'rounded-full',
                    'flex items-center justify-center',
                    'hover:bg-[var(--color-border)] transition-colors',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-purple)]'
                  )}
                  aria-label="Close"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4 4L12 12M12 4L4 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              )}

              {/* Icon/Achievement */}
              {icon && (
                <motion.div
                  className="flex justify-center mb-6"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 15,
                    delay: 0.2,
                  }}
                >
                  <div
                    className={cn(
                      'w-32 h-32',
                      'bg-gradient-to-br from-[#7C3AED] to-[#FF6B9D]',
                      'border-[4px] border-[#FF6B9D]',
                      'rounded-full',
                      'shadow-[6px_6px_0_0_rgba(255,107,157,0.8)]',
                      'flex items-center justify-center',
                      'animate-float'
                    )}
                  >
                    {icon}
                  </div>
                </motion.div>
              )}

              {/* Title */}
              <motion.h2
                className="text-4xl font-black text-white text-center uppercase tracking-wider mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {title}
              </motion.h2>

              {/* Description */}
              {description && (
                <motion.p
                  className="text-lg text-[var(--color-text-secondary)] text-center mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {description}
                </motion.p>
              )}

              {/* Actions */}
              <motion.div
                className="flex flex-col gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {/* Primary action */}
                <button
                  onClick={handlePrimaryAction}
                  className={cn(
                    'w-full px-6 py-4',
                    'bg-[var(--color-purple)] text-white',
                    'border-[4px] border-[#5B21B6]',
                    'rounded-xl',
                    'shadow-[4px_4px_0_0_#5B21B6]',
                    'text-xl font-bold uppercase tracking-wide',
                    'hover:shadow-[6px_6px_0_0_#5B21B6] hover:-translate-x-[2px] hover:-translate-y-[2px]',
                    'active:shadow-[2px_2px_0_0_#5B21B6] active:translate-x-[2px] active:translate-y-[2px]',
                    'transition-all duration-150',
                    'focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-purple)]'
                  )}
                >
                  {primaryActionText}
                </button>

                {/* Secondary action */}
                {secondaryActionText && onSecondaryAction && (
                  <button
                    onClick={handleSecondaryAction}
                    className={cn(
                      'w-full px-6 py-3',
                      'bg-transparent text-[var(--color-text-secondary)]',
                      'border-[2px] border-[var(--color-border)]',
                      'rounded-xl',
                      'text-base font-semibold uppercase tracking-wide',
                      'hover:bg-[var(--color-surface-elevated)] hover:text-white',
                      'transition-all duration-150',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border)]'
                    )}
                  >
                    {secondaryActionText}
                  </button>
                )}
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

// ============================================================================
// HOOK: useCelebration
// ============================================================================

export interface CelebrationOptions {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  showConfetti?: boolean;
  primaryActionText?: string;
  onPrimaryAction?: () => void;
  secondaryActionText?: string;
  onSecondaryAction?: () => void;
}

export const useCelebration = () => {
  const [show, setShow] = React.useState(false);
  const [options, setOptions] = React.useState<CelebrationOptions | null>(null);

  const celebrate = (celebrationOptions: CelebrationOptions) => {
    setOptions(celebrationOptions);
    setShow(true);
  };

  const CelebrationComponent = () => (
    <>
      {options && (
        <CelebrationModal
          show={show}
          title={options.title}
          description={options.description}
          icon={options.icon}
          showConfetti={options.showConfetti}
          primaryActionText={options.primaryActionText}
          onPrimaryAction={options.onPrimaryAction}
          secondaryActionText={options.secondaryActionText}
          onSecondaryAction={options.onSecondaryAction}
          onClose={() => setShow(false)}
        />
      )}
    </>
  );

  return { celebrate, CelebrationComponent };
};

export default CelebrationModal;
