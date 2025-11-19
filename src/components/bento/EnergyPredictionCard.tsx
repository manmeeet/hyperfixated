/**
 * ⚡ ENERGY PREDICTION CARD
 *
 * Daily energy level prediction and optimization
 */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from '../native-compat';
import { Card } from '../ui/Card';
import { Text } from '../ui/Text';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { DeviceType } from '../../constants/breakpoints';

interface EnergyPredictionCardProps {
  deviceType: DeviceType;
}

export const EnergyPredictionCard: React.FC<EnergyPredictionCardProps> = ({ deviceType }) => {
  const [currentEnergy, setCurrentEnergy] = useState(75);
  const [predictedEnergy, setPredictedEnergy] = useState<number[]>([]);

  useEffect(() => {
    // Simulate energy prediction for the next 24 hours
    const predictions = Array.from({ length: 24 }, (_, i) => {
      const hour = (new Date().getHours() + i) % 24;
      // Simple circadian rhythm simulation
      if (hour >= 6 && hour <= 10) return 80 + Math.random() * 20; // Morning peak
      if (hour >= 14 && hour <= 16) return 50 + Math.random() * 20; // Afternoon dip
      if (hour >= 18 && hour <= 21) return 70 + Math.random() * 20; // Evening recovery
      if (hour >= 22 || hour <= 5) return 30 + Math.random() * 20; // Night low
      return 60 + Math.random() * 20; // Default
    });
    setPredictedEnergy(predictions);
  }, []);

  const getEnergyColor = (level: number) => {
    if (level >= 75) return Colors.green.primary;
    if (level >= 50) return Colors.amber.primary;
    return Colors.red.primary;
  };

  const getEnergyEmoji = (level: number) => {
    if (level >= 75) return '🔥';
    if (level >= 50) return '⚡';
    return '🔋';
  };

  const nextPeakHour = predictedEnergy.findIndex(level => level >= 80);

  return (
    <Card>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text size="3xl">{getEnergyEmoji(currentEnergy)}</Text>
            <View>
              <Text variant="heading" size="lg" weight="bold">
                Energy Level
              </Text>
              <Text size="sm" style={styles.subtitle}>
                Predicted pattern
              </Text>
            </View>
          </View>
          <View style={[styles.badge, { backgroundColor: getEnergyColor(currentEnergy) }]}>
            <Text size="lg" weight="bold">
              {Math.round(currentEnergy)}%
            </Text>
          </View>
        </View>

        {/* Energy Chart */}
        <View style={styles.chart}>
          {predictedEnergy.slice(0, 12).map((level, index) => {
            const hour = (new Date().getHours() + index) % 24;
            return (
              <View key={index} style={styles.chartBar}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: `${level}%`,
                      backgroundColor: getEnergyColor(level),
                    },
                  ]}
                />
                <Text size="xs" style={styles.hourLabel}>
                  {hour}h
                </Text>
              </View>
            );
          })}
        </View>

        {/* Insights */}
        <View style={styles.insights}>
          <View style={styles.insightRow}>
            <Text size="sm">🌅</Text>
            <Text size="sm" style={styles.insightText}>
              Peak energy in {nextPeakHour >= 0 ? nextPeakHour : '24+'} hours
            </Text>
          </View>
          <View style={styles.insightRow}>
            <Text size="sm">💤</Text>
            <Text size="sm" style={styles.insightText}>
              Low period: 14:00-16:00
            </Text>
          </View>
        </View>

        {/* Actions */}
        <TouchableOpacity style={styles.logButton}>
          <Text size="sm" weight="semibold">
            Log Current Energy
          </Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  subtitle: {
    color: Colors.textSecondary,
  },
  badge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Spacing.sm,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 120,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.xs,
  },
  chartBar: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  bar: {
    width: '80%',
    borderRadius: Spacing.xs,
    minHeight: 4,
  },
  hourLabel: {
    color: Colors.textSecondary,
  },
  insights: {
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  insightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: Spacing.xs,
  },
  insightText: {
    color: Colors.textSecondary,
  },
  logButton: {
    padding: Spacing.md,
    backgroundColor: Colors.purple.primary,
    borderRadius: Spacing.sm,
    alignItems: 'center',
  },
});
