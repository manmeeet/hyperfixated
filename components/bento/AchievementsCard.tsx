'use client';

import CardHypermax from '@/src/ui/hypermax/components/CardHypermax';

export function AchievementsCard() {
  const achievements = [
    {
      icon: '🏆',
      name: 'Streak Master',
      progress: 70,
      description: '7-day focus streak',
      gradient: 'gradient-amber-orange',
      completed: false
    },
    {
      icon: '🎯',
      name: 'Focus Flow',
      progress: 100,
      description: '50 focus sessions',
      gradient: 'gradient-purple-blue',
      completed: true
    },
    {
      icon: '⚡',
      name: 'Quick Starter',
      progress: 90,
      description: 'Start 100 tasks',
      gradient: 'gradient-green-cyan',
      completed: false
    },
  ];

  return (
    <CardHypermax variant="gradient-pink" glow="pink" className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-2xl" />

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
            <span className="float">🏆</span>
            Achievements
          </h2>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 shimmer">
            <p className="text-sm font-bold text-white">Lvl 12</p>
          </div>
        </div>

        <div className="space-y-4">
          {achievements.map((achievement, index) => {
            const circumference = 2 * Math.PI * 20;
            const strokeDashoffset = circumference * (1 - achievement.progress / 100);

            return (
              <div
                key={index}
                className={`
                  bg-white/15 backdrop-blur-sm rounded-2xl p-4
                  border border-white/20
                  transition-all duration-300 hover:bg-white/20
                  ${achievement.completed ? 'achievement-unlock' : ''}
                `}
              >
                <div className="flex items-center gap-4">
                  {/* Circular Progress */}
                  <div className="relative flex-shrink-0">
                    <svg width="56" height="56" className="transform -rotate-90">
                      {/* Background circle */}
                      <circle
                        cx="28"
                        cy="28"
                        r="20"
                        stroke="rgba(255, 255, 255, 0.2)"
                        strokeWidth="5"
                        fill="transparent"
                      />
                      {/* Progress circle */}
                      <circle
                        cx="28"
                        cy="28"
                        r="20"
                        stroke="white"
                        strokeWidth="5"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-500"
                        style={{
                          filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.8))'
                        }}
                      />
                    </svg>
                    {/* Icon in center */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-3xl ${achievement.completed ? 'sparkle' : ''}`}>
                        {achievement.completed ? '✨' : achievement.icon}
                      </span>
                    </div>
                  </div>

                  {/* Achievement Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-white text-base mb-0.5">
                          {achievement.name}
                        </h3>
                        <p className="text-xs text-white/70">
                          {achievement.description}
                        </p>
                      </div>
                      {achievement.completed && (
                        <div className="bg-green-500/30 px-2 py-1 rounded-full">
                          <p className="text-xs font-bold text-green-200">✓ Done</p>
                        </div>
                      )}
                    </div>

                    {/* Progress bar */}
                    <div className="mt-3">
                      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${achievement.gradient} rounded-full transition-all duration-500`}
                          style={{
                            width: `${achievement.progress}%`,
                            boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
                          }}
                        />
                      </div>
                      <p className="text-xs font-semibold text-white/90 mt-1.5">
                        {achievement.progress}% Complete
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </CardHypermax>
  );
}
