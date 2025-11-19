'use client';

import { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { TimerMode, TimerState } from '@/types';

/**
 * Focus Timer Card
 *
 * Features:
 * - Circular progress ring
 * - Multiple timer modes
 * - Visual state changes
 * - Large monospace time display
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
  const ringSize = 200; // Base size, will be responsive via CSS
  const strokeWidth = 12;
  const radius = (ringSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  const ringColor = getRingColor(state);
  const centerText = getCenterText(state, timeRemaining);

  return (
    <Card className="w-full">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-2xl font-bold mb-3">⏱️ Focus Timer</h2>
        <div className="flex gap-2">
          {(['pomodoro', 'hyperfocus', 'custom'] as TimerMode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`
                px-3 py-1 rounded-lg text-xs font-semibold capitalize
                ${mode === m
                  ? 'bg-[var(--purple-primary)] text-white'
                  : 'bg-[var(--bg-tertiary)] text-[var(--text-tertiary)]'}
              `}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Circular Progress Ring */}
      <div className="flex justify-center my-8 relative">
        <svg width={ringSize} height={ringSize} className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64">
          {/* Background circle */}
          <circle
            cx={ringSize / 2}
            cy={ringSize / 2}
            r={radius}
            stroke="var(--gray-light)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
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
            className="transition-all duration-300"
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-4xl md:text-5xl lg:text-6xl font-bold font-mono">
            {centerText}
          </p>
          <p className="text-xs text-[var(--text-tertiary)] mt-2">
            {state === 'idle' ? 'Ready to focus' :
             state === 'active' ? 'Stay focused' :
             state === 'overtime' ? 'In the zone! 🔥' : 'Break time'}
          </p>
        </div>
      </div>

      {/* Control Button */}
      <button
        onClick={handleStart}
        className={`
          w-full py-4 rounded-xl font-bold text-lg my-5
          ${state === 'idle' ? 'bg-[var(--purple-primary)]' : 'bg-[var(--red-primary)]'}
          active:scale-95 transition-transform
        `}
      >
        {state === 'idle' ? 'Start Focus' : 'Stop'}
      </button>

      {/* Stats */}
      <div className="flex justify-around pt-5 border-t border-[var(--border-default)]">
        <div className="text-center">
          <p className="text-2xl font-bold">0</p>
          <p className="text-xs text-[var(--text-tertiary)]">Today</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">0</p>
          <p className="text-xs text-[var(--text-tertiary)]">Streak</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">0h</p>
          <p className="text-xs text-[var(--text-tertiary)]">Total</p>
        </div>
      </div>
    </Card>
  );
}

function getRingColor(state: TimerState): string {
  switch (state) {
    case 'idle': return 'var(--gray-light)';
    case 'active': return 'var(--purple-primary)';
    case 'break': return 'var(--orange-primary)';
    case 'overtime': return 'var(--red-primary)';
  }
}

function getCenterText(state: TimerState, seconds: number): string {
  if (seconds < 0) return '∞';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
