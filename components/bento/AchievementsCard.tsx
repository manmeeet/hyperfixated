'use client';

import { Card } from '../ui/Card';

export function AchievementsCard() {
  const achievements = [
    { icon: '🏆', name: 'Streak Master', progress: 70, color: '#FB923C' },
    { icon: '🎯', name: 'Focus Flow', progress: 45, color: '#7C3AED' },
    { icon: '⚡', name: 'Quick Starter', progress: 90, color: '#10B981' },
  ];

  return (
    <Card className="w-full md:w-[48%] lg:flex-1">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">🏆 Achievements</h2>
        <div className="bg-[var(--purple-primary)] px-3 py-1 rounded-xl">
          <p className="text-sm font-bold">Lvl 12</p>
        </div>
      </div>

      {achievements.map((achievement, index) => (
        <div
          key={index}
          className="flex items-center gap-3 py-3 border-b border-[var(--border-default)]"
        >
          <p className="text-3xl">{achievement.icon}</p>
          <div className="flex-1">
            <p className="text-sm font-semibold">{achievement.name}</p>
            <div className="h-2 bg-[var(--gray-light)] rounded-full overflow-hidden mt-1">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${achievement.progress}%`,
                  backgroundColor: achievement.color,
                }}
              />
            </div>
            <p className="text-xs text-[var(--text-tertiary)] mt-1">
              {achievement.progress}%
            </p>
          </div>
        </div>
      ))}
    </Card>
  );
}
