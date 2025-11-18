'use client';

import { Card } from '../ui/Card';

export function StatsCard() {
  const stats = [
    { label: 'Focus Hours', value: '8.5', trend: '+12%', color: '#7C3AED' },
    { label: 'Tasks Done', value: '24', trend: '+8%', color: '#10B981' },
    { label: 'Streak', value: '7', trend: '🔥', color: '#FB923C' },
  ];

  return (
    <Card className="w-full md:w-[48%] lg:flex-1">
      <h2 className="text-2xl font-bold mb-5">📊 Stats</h2>

      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex justify-between items-center py-3 border-b border-[var(--border-default)]"
        >
          <div>
            <p className="text-sm text-[var(--text-tertiary)]">{stat.label}</p>
            <p className="text-3xl font-bold" style={{ color: stat.color }}>
              {stat.value}
            </p>
          </div>
          <p className="text-lg text-[var(--green-primary)]">{stat.trend}</p>
        </div>
      ))}
    </Card>
  );
}
