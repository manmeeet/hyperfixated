'use client';

import { Card } from '../ui/Card';
import { ScheduleBlock } from '@/types';

/**
 * Smart Schedule Card
 *
 * Features:
 * - Horizontal timeline view
 * - Color-coded blocks
 * - Duration-based sizing
 */
export function SmartSchedule() {
  const schedule: ScheduleBlock[] = [
    { id: '1', title: 'Morning Focus', startTime: '09:00', endTime: '11:00', color: '#7C3AED', type: 'focus' },
    { id: '2', title: 'Team Standup', startTime: '11:00', endTime: '11:30', color: '#3B82F6', type: 'meeting' },
    { id: '3', title: 'Lunch Break', startTime: '13:00', endTime: '14:00', color: '#FB923C', type: 'break' },
    { id: '4', title: 'Deep Work', startTime: '14:00', endTime: '17:00', color: '#7C3AED', type: 'focus' },
  ];

  return (
    <Card className="w-full">
      <div className="mb-5">
        <h2 className="text-2xl font-bold mb-1">📅 Today's Schedule</h2>
        <p className="text-sm text-[var(--text-tertiary)]">AI-optimized for your energy levels</p>
      </div>

      {/* Timeline */}
      <div className="overflow-x-auto my-5 pb-2">
        <div className="flex gap-3 min-w-max">
          {schedule.map((block) => (
            <div
              key={block.id}
              className="rounded-xl p-3 min-w-[120px]"
              style={{
                backgroundColor: block.color,
                width: calculateBlockWidth(block.startTime, block.endTime),
              }}
            >
              <p className="text-xs font-semibold text-white truncate">{block.title}</p>
              <p className="text-xs text-white/80">{block.startTime} - {block.endTime}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="flex justify-around pt-5 border-t border-[var(--border-default)]">
        <div className="text-center">
          <p className="text-sm text-[var(--text-tertiary)]">Focus Time</p>
          <p className="text-lg font-bold">5h</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-[var(--text-tertiary)]">Meetings</p>
          <p className="text-lg font-bold">2</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-[var(--text-tertiary)]">Breaks</p>
          <p className="text-lg font-bold">3</p>
        </div>
      </div>
    </Card>
  );
}

function calculateBlockWidth(start: string, end: string): number {
  const startMins = parseInt(start.split(':')[0]) * 60 + parseInt(start.split(':')[1]);
  const endMins = parseInt(end.split(':')[0]) * 60 + parseInt(end.split(':')[1]);
  const duration = endMins - startMins;
  return Math.max(duration / 2, 120);
}
