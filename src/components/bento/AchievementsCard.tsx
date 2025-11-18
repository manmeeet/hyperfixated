import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from '../ui/Card';
import { Text } from '../ui/Text';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { DeviceType } from '../../constants/breakpoints';

interface AchievementsCardProps {
  deviceType: DeviceType;
}

/**
 * Achievements Card
 *
 * Gamification elements with retro-arcade feel
 */
export const AchievementsCard: React.FC<AchievementsCardProps> = ({ deviceType }) => {
  const achievements = [
    { icon: '🏆', name: 'Streak Master', progress: 70, color: Colors.orange.primary },
    { icon: '🎯', name: 'Focus Flow', progress: 45, color: Colors.purple.primary },
    { icon: '⚡', name: 'Quick Starter', progress: 90, color: Colors.green.primary },
  ];

  return (
    <Card deviceType={deviceType} style={styles.container}>
      <View style={styles.header}>
        <Text variant="heading" weight="bold">
          🏆 Achievements
        </Text>
        <View style={styles.levelBadge}>
          <Text size="sm" weight="bold">
            Lvl 12
          </Text>
        </View>
      </View>

      {achievements.map((achievement, index) => (
        <View key={index} style={styles.achievementRow}>
          <Text size="2xl">{achievement.icon}</Text>
          <View style={styles.achievementInfo}>
            <Text size="sm" weight="semibold">
              {achievement.name}
            </Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${achievement.progress}%`,
                    backgroundColor: achievement.color,
                  },
                ]}
              />
            </View>
            <Text size="xs" color={Colors.text.tertiary}>
              {achievement.progress}%
            </Text>
          </View>
        </View>
      ))}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  levelBadge: {
    backgroundColor: Colors.purple.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Spacing.md,
  },
  achievementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.default,
  },
  achievementInfo: {
    flex: 1,
    gap: Spacing.xs,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.gray.light,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
});
