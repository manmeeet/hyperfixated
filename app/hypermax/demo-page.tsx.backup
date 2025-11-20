/**
 * Hypermax UI Demo Page
 *
 * Comprehensive showcase of all Hypermax neobrutalist + gamified components.
 * This page serves as:
 * - Component library documentation
 * - Visual QA testing ground
 * - Integration example for developers
 *
 * Route: /hypermax
 */

'use client';

import React, { useState } from 'react';
import {
  ButtonHypermax,
  IconButtonHypermax,
  CardHypermax,
  CardHeaderHypermax,
  BentoCardHypermax,
  BadgeHypermax,
  ChipHypermax,
  ChipGroupHypermax,
  ProgressBarHypermax,
  XpBarHypermax,
  CircularProgressHypermax,
  AvatarHypermax,
  AvatarGroupHypermax,
  Mascot,
  useMascot,
  GridLayout,
  NavRail,
  DashboardHeader,
  GridItem,
  useXpPop,
  useConfetti,
  useCelebration,
} from '@/src/ui/hypermax';

import {
  StreakDisplay,
  AchievementCard,
  DailyChallengeCard,
  LevelBadge,
  calculateUserLevel,
} from '@/src/lib/gamification';

export default function HypermaxDemoPage() {
  // Demo state
  const [activeSection, setActiveSection] = useState('overview');
  const [userXp, setUserXp] = useState(1250);
  const userLevel = calculateUserLevel(userXp);

  // Animation hooks
  const { showXpPop, XpPopComponent } = useXpPop({ position: 'top-right' });
  const { triggerConfetti, ConfettiComponent } = useConfetti();
  const { celebrate, CelebrationComponent } = useCelebration();
  const { speak, changeEmotion, MascotComponent } = useMascot({
    position: 'bottom-right',
    size: 'lg',
  });

  // Demo data
  const mockStreak = {
    count: 12,
    isActive: true,
    lastActivityDate: new Date(),
    longestStreak: 25,
    totalDays: 89,
  };

  const mockAchievement = {
    id: '1',
    title: 'First Steps',
    description: 'Complete your first task',
    icon: '🎯',
    rarity: 'rare' as const,
    unlocked: true,
    xpReward: 50,
    unlockedAt: new Date(),
  };

  const mockChallenge = {
    id: '1',
    title: 'Focus Master',
    description: 'Complete 3 focus sessions today',
    progress: 66,
    completed: false,
    xpReward: 100,
    expiresAt: new Date(Date.now() + 86400000),
  };

  // Handlers
  const handleGainXp = () => {
    const gained = 50;
    setUserXp((prev) => prev + gained);
    showXpPop(gained);
    speak('Awesome! You gained XP!', 'excited');
  };

  const handleCelebrate = () => {
    triggerConfetti();
    celebrate({
      title: '🎉 Achievement Unlocked!',
      description: 'You completed the Hypermax UI demo tour!',
      icon: <span className="text-6xl">🏆</span>,
      primaryActionText: 'Continue Exploring',
    });
    changeEmotion('celebrate');
  };

  // Navigation items
  const navItems = [
    { id: 'overview', label: 'Overview', active: activeSection === 'overview' },
    { id: 'buttons', label: 'Buttons', active: activeSection === 'buttons' },
    { id: 'cards', label: 'Cards', active: activeSection === 'cards' },
    { id: 'badges', label: 'Badges & Chips', active: activeSection === 'badges' },
    { id: 'progress', label: 'Progress Bars', active: activeSection === 'progress' },
    { id: 'avatars', label: 'Avatars', active: activeSection === 'avatars' },
    { id: 'gamification', label: 'Gamification', active: activeSection === 'gamification' },
  ];

  return (
    <>
      {/* Animations */}
      <XpPopComponent />
      <ConfettiComponent />
      <CelebrationComponent />
      <MascotComponent />

      <GridLayout
        showSidebar
        sidebarPosition="left"
        sidebar={
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-black text-white uppercase tracking-wider mb-2">
                Hypermax UI
              </h2>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Neobrutalist + Gamified Components
              </p>
            </div>
            <NavRail
              items={navItems.map((item) => ({
                ...item,
                onClick: () => setActiveSection(item.id),
              }))}
            />
          </div>
        }
        header={
          <DashboardHeader
            user={{
              name: 'Demo User',
              avatar: (
                <AvatarHypermax
                  fallback="DU"
                  size="md"
                  showLevelRing
                  level={userLevel.level}
                  levelProgress={Math.round((userLevel.currentXp / userLevel.requiredXp) * 100)}
                />
              ),
              level: userLevel.level,
              xp: userXp,
            }}
            actions={
              <>
                <ButtonHypermax variant="electric" size="sm" onClick={handleGainXp}>
                  Gain XP
                </ButtonHypermax>
                <ButtonHypermax variant="primary" size="sm" onClick={handleCelebrate}>
                  Celebrate
                </ButtonHypermax>
              </>
            }
          />
        }
        columns={3}
        gap="lg"
      >
        {/* OVERVIEW SECTION */}
        {activeSection === 'overview' && (
          <>
            <GridItem colSpan="full">
              <CardHypermax variant="gradient" padding="lg">
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-wider mb-4">
                  Welcome to Hypermax UI
                </h1>
                <p className="text-xl text-white/90 mb-6">
                  A hypermaximalist neobrutalist design system with Duolingo-style gamification.
                  Built for ADHD-friendly, high-density, engaging user experiences.
                </p>
                <div className="flex flex-wrap gap-3">
                  <BadgeHypermax variant="electric" size="lg">
                    Neobrutalist
                  </BadgeHypermax>
                  <BadgeHypermax variant="legendary" size="lg">
                    Gamified
                  </BadgeHypermax>
                  <BadgeHypermax variant="primary" size="lg">
                    ADHD-Friendly
                  </BadgeHypermax>
                  <BadgeHypermax variant="success" size="lg">
                    Accessible
                  </BadgeHypermax>
                </div>
              </CardHypermax>
            </GridItem>

            <BentoCardHypermax featured span="double">
              <CardHeaderHypermax title="Your Progress" subtitle="Keep up the great work!" />
              <div className="mt-4">
                <XpBarHypermax
                  level={userLevel.level}
                  currentXp={userLevel.currentXp}
                  requiredXp={userLevel.requiredXp}
                />
              </div>
            </BentoCardHypermax>

            <CardHypermax variant="elevated">
              <CardHeaderHypermax title="Quick Stats" />
              <div className="mt-4 space-y-4">
                <div>
                  <div className="text-3xl font-black text-white">{userLevel.level}</div>
                  <div className="text-sm text-[var(--color-text-secondary)]">Current Level</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-[var(--color-amber)]">{userXp}</div>
                  <div className="text-sm text-[var(--color-text-secondary)]">Total XP</div>
                </div>
              </div>
            </CardHypermax>
          </>
        )}

        {/* BUTTONS SECTION */}
        {activeSection === 'buttons' && (
          <>
            <GridItem colSpan="full">
              <CardHypermax variant="elevated" padding="lg">
                <CardHeaderHypermax title="Buttons" subtitle="Neobrutalist interactive elements" />
                <div className="mt-6 space-y-6">
                  {/* Variants */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3 uppercase">Variants</h3>
                    <div className="flex flex-wrap gap-3">
                      <ButtonHypermax variant="primary">Primary</ButtonHypermax>
                      <ButtonHypermax variant="secondary">Secondary</ButtonHypermax>
                      <ButtonHypermax variant="success">Success</ButtonHypermax>
                      <ButtonHypermax variant="danger">Danger</ButtonHypermax>
                      <ButtonHypermax variant="electric">Electric</ButtonHypermax>
                      <ButtonHypermax variant="ghost">Ghost</ButtonHypermax>
                    </div>
                  </div>

                  {/* Sizes */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3 uppercase">Sizes</h3>
                    <div className="flex flex-wrap items-center gap-3">
                      <ButtonHypermax size="sm">Small</ButtonHypermax>
                      <ButtonHypermax size="md">Medium</ButtonHypermax>
                      <ButtonHypermax size="lg">Large</ButtonHypermax>
                      <ButtonHypermax size="xl">Extra Large</ButtonHypermax>
                    </div>
                  </div>

                  {/* States */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3 uppercase">States</h3>
                    <div className="flex flex-wrap gap-3">
                      <ButtonHypermax loading>Loading</ButtonHypermax>
                      <ButtonHypermax disabled>Disabled</ButtonHypermax>
                      <ButtonHypermax glowOnHover>With Glow</ButtonHypermax>
                    </div>
                  </div>
                </div>
              </CardHypermax>
            </GridItem>
          </>
        )}

        {/* CARDS SECTION */}
        {activeSection === 'cards' && (
          <>
            <CardHypermax variant="default">
              <CardHeaderHypermax title="Default Card" subtitle="Basic surface elevation" />
              <div className="mt-4 text-sm text-[var(--color-text-secondary)]">
                Clean, minimal card with standard elevation and borders.
              </div>
            </CardHypermax>

            <CardHypermax variant="elevated">
              <CardHeaderHypermax title="Elevated Card" subtitle="Higher visual hierarchy" />
              <div className="mt-4 text-sm text-[var(--color-text-secondary)]">
                Enhanced shadow and purple accent for important content.
              </div>
            </CardHypermax>

            <CardHypermax variant="electric">
              <CardHeaderHypermax title="Electric Card" subtitle="High energy variant" />
              <div className="mt-4 text-sm">
                Bold electric green with maximum visual impact.
              </div>
            </CardHypermax>

            <BentoCardHypermax span="double" featured>
              <CardHeaderHypermax
                title="Bento Featured Card"
                subtitle="Spans 2 columns on desktop"
              />
              <div className="mt-4 text-lg">
                Perfect for hero content and primary focal points in bento grid layouts.
              </div>
            </BentoCardHypermax>
          </>
        )}

        {/* BADGES & CHIPS SECTION */}
        {activeSection === 'badges' && (
          <>
            <GridItem colSpan="full">
              <CardHypermax variant="elevated" padding="lg">
                <CardHeaderHypermax title="Badges" subtitle="Status indicators and labels" />
                <div className="mt-6 space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-white mb-2 uppercase">Variants</h3>
                    <div className="flex flex-wrap gap-2">
                      <BadgeHypermax variant="primary">Primary</BadgeHypermax>
                      <BadgeHypermax variant="success">Success</BadgeHypermax>
                      <BadgeHypermax variant="warning">Warning</BadgeHypermax>
                      <BadgeHypermax variant="danger">Danger</BadgeHypermax>
                      <BadgeHypermax variant="info">Info</BadgeHypermax>
                      <BadgeHypermax variant="electric">Electric</BadgeHypermax>
                      <BadgeHypermax variant="legendary">Legendary</BadgeHypermax>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white mb-2 uppercase">
                      Interactive Chips
                    </h3>
                    <ChipGroupHypermax>
                      <ChipHypermax variant="primary" selected>
                        Selected
                      </ChipHypermax>
                      <ChipHypermax variant="default">Default</ChipHypermax>
                      <ChipHypermax variant="success" removable onRemove={() => {}}>
                        Removable
                      </ChipHypermax>
                      <ChipHypermax variant="electric" icon={<span>⚡</span>}>
                        With Icon
                      </ChipHypermax>
                    </ChipGroupHypermax>
                  </div>
                </div>
              </CardHypermax>
            </GridItem>
          </>
        )}

        {/* PROGRESS BARS SECTION */}
        {activeSection === 'progress' && (
          <>
            <GridItem colSpan="full">
              <CardHypermax variant="elevated" padding="lg">
                <CardHeaderHypermax title="Progress Bars" subtitle="XP and progress tracking" />
                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-white mb-3 uppercase">XP Bar</h3>
                    <XpBarHypermax
                      level={userLevel.level}
                      currentXp={userLevel.currentXp}
                      requiredXp={userLevel.requiredXp}
                    />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white mb-3 uppercase">Variants</h3>
                    <div className="space-y-3">
                      <ProgressBarHypermax variant="xp" value={75} showLabel shimmer />
                      <ProgressBarHypermax variant="health" value={60} showLabel glow />
                      <ProgressBarHypermax variant="streak" value={90} showLabel />
                      <ProgressBarHypermax variant="loading" value={45} showLabel />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white mb-3 uppercase">
                      Circular Progress
                    </h3>
                    <div className="flex gap-6">
                      <CircularProgressHypermax value={75} variant="xp" />
                      <CircularProgressHypermax value={60} variant="health" size={100} />
                      <CircularProgressHypermax value={90} variant="streak" size={80} />
                    </div>
                  </div>
                </div>
              </CardHypermax>
            </GridItem>
          </>
        )}

        {/* AVATARS SECTION */}
        {activeSection === 'avatars' && (
          <>
            <GridItem colSpan="full">
              <CardHypermax variant="elevated" padding="lg">
                <CardHeaderHypermax title="Avatars" subtitle="User profiles with gamification" />
                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-white mb-3 uppercase">Sizes</h3>
                    <div className="flex flex-wrap items-end gap-4">
                      <AvatarHypermax fallback="XS" size="xs" />
                      <AvatarHypermax fallback="SM" size="sm" />
                      <AvatarHypermax fallback="MD" size="md" />
                      <AvatarHypermax fallback="LG" size="lg" />
                      <AvatarHypermax fallback="XL" size="xl" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white mb-3 uppercase">With Status</h3>
                    <div className="flex flex-wrap gap-4">
                      <AvatarHypermax fallback="ON" status="online" />
                      <AvatarHypermax fallback="BS" status="busy" />
                      <AvatarHypermax fallback="AW" status="away" />
                      <AvatarHypermax fallback="OF" status="offline" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white mb-3 uppercase">
                      With Level Ring
                    </h3>
                    <div className="flex flex-wrap gap-6">
                      <AvatarHypermax
                        fallback="L5"
                        showLevelRing
                        level={5}
                        levelProgress={45}
                        size="lg"
                      />
                      <AvatarHypermax
                        fallback="L12"
                        showLevelRing
                        level={12}
                        levelProgress={78}
                        size="xl"
                        glow
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white mb-3 uppercase">Avatar Group</h3>
                    <AvatarGroupHypermax max={4}>
                      <AvatarHypermax fallback="A1" size="md" />
                      <AvatarHypermax fallback="A2" size="md" />
                      <AvatarHypermax fallback="A3" size="md" />
                      <AvatarHypermax fallback="A4" size="md" />
                      <AvatarHypermax fallback="A5" size="md" />
                      <AvatarHypermax fallback="A6" size="md" />
                    </AvatarGroupHypermax>
                  </div>
                </div>
              </CardHypermax>
            </GridItem>
          </>
        )}

        {/* GAMIFICATION SECTION */}
        {activeSection === 'gamification' && (
          <>
            <GridItem colSpan={2}>
              <StreakDisplay streak={mockStreak} />
            </GridItem>

            <CardHypermax variant="elevated">
              <CardHeaderHypermax title="Level Badge" />
              <div className="mt-4">
                <LevelBadge level={userLevel.level} showTier size="lg" />
              </div>
            </CardHypermax>

            <GridItem colSpan={2}>
              <AchievementCard achievement={mockAchievement} />
            </GridItem>

            <DailyChallengeCard challenge={mockChallenge} />

            <GridItem colSpan="full">
              <CardHypermax variant="gradient" padding="lg">
                <CardHeaderHypermax
                  title="🎮 Gamification System"
                  subtitle="Complete components for building engaging experiences"
                />
                <div className="mt-4 text-white/90">
                  <p className="mb-4">
                    The Hypermax gamification system includes:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>XP and level progression with animations</li>
                    <li>Streak tracking with fire emoji indicators</li>
                    <li>Achievement system with rarity tiers</li>
                    <li>Daily challenges with progress tracking</li>
                    <li>Celebration modals and confetti effects</li>
                    <li>Mascot character with emotion states</li>
                  </ul>
                </div>
              </CardHypermax>
            </GridItem>
          </>
        )}
      </GridLayout>
    </>
  );
}
