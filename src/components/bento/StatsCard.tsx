import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from '../ui/Card';
import { Text } from '../ui/Text';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { DeviceType } from '../../constants/breakpoints';

interface StatsCardProps {
  deviceType: DeviceType;
}

/**
 * Stats Card
 *
 * Displays key productivity metrics with bold typography
 */
export const StatsCard: React.FC<StatsCardProps> = ({ deviceType }) => {
  const stats = [
    { label: 'Focus Hours', value: '8.5', trend: '+12%', color: Colors.purple.primary },
    { label: 'Tasks Done', value: '24', trend: '+8%', color: Colors.green.primary },
    { label: 'Streak', value: '7', trend: '🔥', color: Colors.orange.primary },
  ];

  return (
    <Card deviceType={deviceType} style={styles.container}>
      <Text variant="heading" weight="bold" style={styles.title}>
        📊 Stats
      </Text>

      {stats.map((stat, index) => (
        <View key={index} style={styles.statRow}>
          <View style={styles.statInfo}>
            <Text size="sm" color={Colors.text.tertiary}>
              {stat.label}
            </Text>
            <Text size="3xl" weight="bold" style={{ color: stat.color }}>
              {stat.value}
            </Text>
          </View>
          <Text size="lg" color={Colors.green.primary}>
            {stat.trend}
          </Text>
        </View>
      ))}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    marginBottom: Spacing.lg,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.default,
  },
  statInfo: {
    gap: Spacing.xs,
  },
});
