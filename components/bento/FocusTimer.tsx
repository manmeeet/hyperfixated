'use client';

import { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { TimerMode, TimerState } from '@/types';

/**
 * Focus Timer Card - Redesigned with Maximalist Style
 *
 * Features:
 * - Vibrant gradient background
 * - Animated circular progress ring
 * - Glowing effects
 * - Multiple timer modes
 * - Fire effects when in overtime
 */
export function FocusTimer() {
  const [mode, setMode] = useState<TimerMode>('pomodoro');
  const [state, setState] = useState<TimerState>('idle');
  const [timeRemaining, setTimeRemaining] = useState(25 * 60);
  const [totalTime] = useState(25 * 60);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (state === 'active' || state === 'overtime') {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 0 && state === 'active') {
            setState('overtime');
            return -1;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [state]);

  const handleStart = () => {
    if (state === 'idle') {
      setState('active');
    } else {
      setState('idle');
      setTimeRemaining(totalTime);
    }
  };

  const progress = timeRemaining > 0 ? (timeRemaining / totalTime) : 0;
  const ringSize = 200;
  const strokeWidth = 14;
  const radius = (ringSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  const { gradient, ringColor, glow } = getTimerStyle(state);
  const centerText = getCenterText(state, timeRemaining);

  return (
    <Card variant={gradient as any} glow={glow as any} className="relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-white rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-5">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white flex items-center gap-2">
            <span className={state === 'overtime' ? 'fire-effect' : ''}>⏱️</span>
            Focus Timer
          </h2>
          <div className="flex gap-2 flex-wrap">
            {(['pomodoro', 'hyperfocus', 'custom'] as TimerMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`
                  px-4 py-2 rounded-xl text-xs font-bold capitalize
                  transition-all duration-300
                  ${mode === m
                    ? 'bg-white text-purple-600 shadow-lg scale-105'
                    : 'bg-white/20 text-white/80 hover:bg-white/30'}
                `}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Circular Progress Ring with Enhanced Styling */}
        <div className="flex justify-center my-8 relative">
          {/* Outer glow ring */}
          {state === 'active' && (
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-white/10 blur-xl animate-pulse" />
            </div>
          )}

          <svg width={ringSize} height={ringSize} className="w-48 h-48 md:w-56 md:h-56">
            {/* Background circle with gradient */}
            <defs>
              <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
              </linearGradient>
            </defs>
            <circle
              cx={ringSize / 2}
              cy={ringSize / 2}
              r={radius}
              stroke="url(#ringGradient)"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Progress circle with glow */}
            <circle
              cx={ringSize / 2}
              cy={ringSize / 2}
              r={radius}
              stroke={ringColor}
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform={`rotate(-90 ${ringSize / 2} ${ringSize / 2})`}
              className="transition-all duration-500"
              style={{
                filter: state === 'active' ? 'drop-shadow(0 0 8px currentColor)' : 'none'
              }}
            />
          </svg>

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className={`
              text-5xl md:text-6xl font-bold font-mono text-white
              ${state === 'overtime' ? 'fire-effect text-neon' : ''}
            `}>
              {centerText}
            </p>
            <p className="text-sm text-white/90 mt-3 font-semibold flex items-center gap-1">
              {state === 'idle' ? '💤 Ready to focus' :
               state === 'active' ? '🎯 Stay focused' :
               state === 'overtime' ? '🔥 In the zone!' : '☕ Break time'}
            </p>
          </div>
        </div>

        {/* Control Button - Enhanced */}
        <button
          onClick={handleStart}
          className={`
            w-full py-4 rounded-2xl font-bold text-lg my-5
            transition-all duration-300
            ${state === 'idle'
              ? 'bg-white text-purple-600 hover:scale-105 shimmer'
              : 'bg-red-500 text-white hover:bg-red-600'}
            active:scale-95 shadow-xl
          `}
        >
          {state === 'idle' ? '▶️ Start Focus' : '⏸️ Stop'}
        </button>

        {/* Stats with Colorful Design */}
        <div className="grid grid-cols-3 gap-3 pt-5 border-t border-white/20">
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <p className="text-2xl md:text-3xl font-bold text-white">3</p>
            <p className="text-xs text-white/80 font-semibold">Today</p>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <p className="text-2xl md:text-3xl font-bold text-white">7</p>
            <p className="text-xs text-white/80 font-semibold">Streak</p>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <p className="text-2xl md:text-3xl font-bold text-white">12h</p>
            <p className="text-xs text-white/80 font-semibold">Total</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

function getTimerStyle(state: TimerState) {
  switch (state) {
    case 'idle':
      return {
        gradient: 'gradient-purple',
        ringColor: 'rgba(255, 255, 255, 0.5)',
        glow: 'none'
      };
    case 'active':
      return {
        gradient: 'gradient-purple',
        ringColor: '#FFFFFF',
        glow: 'purple'
      };
    case 'break':
      return {
        gradient: 'gradient-cyan',
        ringColor: '#00D4E7',
        glow: 'cyan'
      };
    case 'overtime':
      return {
        gradient: 'gradient-orange',
        ringColor: '#FF4757',
        glow: 'orange'
      };
  }
}

function getCenterText(state: TimerState, seconds: number): string {
  if (seconds < 0) return '∞';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
