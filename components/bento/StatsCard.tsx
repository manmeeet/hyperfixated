'use client';

import CardHypermax from '@/src/ui/hypermax/components/CardHypermax';

export function StatsCard() {
  const stats = [
    {
      label: 'Focus Hours',
      value: '8.5',
      trend: '+12%',
      icon: '⏱️',
      gradient: 'gradient-purple-pink',
      color: '#7C3AED'
    },
    {
      label: 'Tasks Done',
      value: '24',
      trend: '+8%',
      icon: '✅',
      gradient: 'gradient-green-cyan',
      color: '#00FF94'
    },
    {
      label: 'Streak Days',
      value: '7',
      trend: '🔥',
      icon: '🔥',
      gradient: 'gradient-orange-red',
      color: '#FB923C'
    },
  ];

  return (
    <CardHypermax variant="gradient-cyan" glow="cyan" className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-2xl" />

      <div className="relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white flex items-center gap-2">
          <span className="bounce">📊</span>
          Your Stats
        </h2>

        <div className="space-y-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`
                ${stat.gradient}
                rounded-2xl p-5
                border border-white/20
                shimmer
                transition-all duration-300
                hover:scale-105 active:scale-95
              `}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="text-4xl md:text-5xl">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-sm text-white/80 font-semibold mb-1">
                      {stat.label}
                    </p>
                    <p className="text-3xl md:text-4xl font-bold text-white">
                      {stat.value}
                    </p>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-xl">
                  <p className="text-lg md:text-xl font-bold text-white">
                    {stat.trend}
                  </p>
                </div>
              </div>

              {/* Mini sparkle decoration */}
              <div className="flex gap-1 mt-3">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 bg-white/50 rounded-full sparkle"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </CardHypermax>
  );
}
