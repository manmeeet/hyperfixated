import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Dimensions, SafeAreaView } from 'react-native';
import { BentoGrid } from './src/components/layout/BentoGrid';
import { CommandCenter } from './src/components/bento/CommandCenter';
import { FocusTimer } from './src/components/bento/FocusTimer';
import { SmartSchedule } from './src/components/bento/SmartSchedule';
import { StatsCard } from './src/components/bento/StatsCard';
import { AchievementsCard } from './src/components/bento/AchievementsCard';
import { MemoryPalaceCard } from './src/components/bento/MemoryPalaceCard';
import { EnergyPredictionCard } from './src/components/bento/EnergyPredictionCard';
import { TaskBreakdownCard } from './src/components/bento/TaskBreakdownCard';
import { InterestRotationCard } from './src/components/bento/InterestRotationCard';
import { IntegrationDiscoveryCard } from './src/components/bento/IntegrationDiscoveryCard';
import { Text } from './src/components/ui/Text';
import { Colors } from './src/constants/colors';
import { Spacing } from './src/constants/spacing';
import { getDeviceType } from './src/constants/breakpoints';
import { VoiceCommand } from './src/types';

/**
 * 🧠 HYPERFOCUS AI
 * The Ultimate ADHD/Hyperfixation Productivity Command Center
 *
 * Features:
 * - Hypermaximalist retro UI design
 * - Mobile-first bento grid layout
 * - Voice command system
 * - Focus timer with circular progress
 * - Smart scheduling
 * - Gamification and achievements
 * - 🏰 Memory Palace Builder (spatial memory system)
 * - ⚡ Energy Level Prediction (circadian optimization)
 * - 📋 Task Breakdown Engine (executive function support)
 * - 🔄 Interest Rotation Predictor (hyperfixation cycle tracking)
 * - 🌐 Integration Discovery (automatic API orchestration)
 */
export default function App() {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const deviceType = getDeviceType(dimensions.width);

  const [recentCommands, setRecentCommands] = useState<VoiceCommand[]>([
    {
      id: '1',
      command: 'Start focus session on trading dashboard',
      timestamp: new Date(Date.now() - 5 * 60000),
      status: 'success',
    },
    {
      id: '2',
      command: 'Schedule content creation for tomorrow',
      timestamp: new Date(Date.now() - 15 * 60000),
      status: 'success',
    },
  ]);

  // Listen for dimension changes
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  const handleVoiceCommand = () => {
    console.log('Voice command initiated');
    // Voice command logic will be implemented here
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text variant="heading" size="2xl" weight="bold">
            🦊 HyperFox
          </Text>
          <View style={styles.levelBadge}>
            <Text size="sm" weight="semibold">
              Lvl 12
            </Text>
          </View>
        </View>
        <Text size="2xl">⚙️</Text>
      </View>

      {/* Main Bento Grid */}
      <BentoGrid deviceType={deviceType}>
        {/* Command Center - Hero Card */}
        <CommandCenter
          deviceType={deviceType}
          recentCommands={recentCommands}
          onVoicePress={handleVoiceCommand}
        />

        {/* Focus Timer */}
        <FocusTimer deviceType={deviceType} />

        {/* Smart Schedule */}
        <SmartSchedule deviceType={deviceType} />

        {/* Stats and Achievements Row */}
        <View style={[styles.row, deviceType === 'mobile' && styles.column]}>
          <View style={[styles.halfWidth, deviceType === 'mobile' && styles.fullWidth]}>
            <StatsCard deviceType={deviceType} />
          </View>
          <View style={[styles.halfWidth, deviceType === 'mobile' && styles.fullWidth]}>
            <AchievementsCard deviceType={deviceType} />
          </View>
        </View>

        {/* NEW FEATURES - Phase 1: HIGH IMPACT, LOW EFFORT */}

        {/* Memory Palace Builder */}
        <MemoryPalaceCard deviceType={deviceType} />

        {/* Energy & Interest Rotation Row */}
        <View style={[styles.row, deviceType === 'mobile' && styles.column]}>
          <View style={[styles.halfWidth, deviceType === 'mobile' && styles.fullWidth]}>
            <EnergyPredictionCard deviceType={deviceType} />
          </View>
          <View style={[styles.halfWidth, deviceType === 'mobile' && styles.fullWidth]}>
            <InterestRotationCard deviceType={deviceType} />
          </View>
        </View>

        {/* Task Breakdown */}
        <TaskBreakdownCard deviceType={deviceType} />

        {/* Integration Discovery */}
        <IntegrationDiscoveryCard deviceType={deviceType} />
      </BentoGrid>

      {/* Bottom Navigation (Mobile only) */}
      {deviceType === 'mobile' && (
        <View style={styles.bottomNav}>
          <Text size="2xl">🏠</Text>
          <Text size="2xl">⚡</Text>
          <Text size="2xl">🎤</Text>
          <Text size="2xl">📊</Text>
          <Text size="2xl">👤</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.background.secondary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.default,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  levelBadge: {
    backgroundColor: Colors.purple.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.md,
    width: '100%',
  },
  column: {
    flexDirection: 'column',
  },
  halfWidth: {
    flex: 1,
  },
  fullWidth: {
    width: '100%',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    backgroundColor: Colors.background.secondary,
    borderTopWidth: 1,
    borderTopColor: Colors.border.default,
    height: Spacing.safeArea.bottomNav,
  },
});
