/**
 * ⚡ ENERGY PREDICTION CARD
 *
 * Daily energy level prediction and optimization
 */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from '../native-compat';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';

interface EnergyPredictionCardProps {
  deviceType?: string;
}

export const EnergyPredictionCard: React.FC<EnergyPredictionCardProps> = ({ deviceType = 'desktop' }) => {
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
    if (level >= 75) return 'var(--green-primary)';
    if (level >= 50) return 'var(--amber-primary)';
    return 'var(--red-primary)';
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
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
  },
  subtitle: {
    color: 'var(--color-text-secondary)',
  },
  badge: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 8,
  },
  chart: {
    flexDirection: 'row' as const,
    alignItems: 'flex-end' as const,
    justifyContent: 'space-between' as const,
    height: 120,
    marginBottom: 16,
    paddingLeft: 4,
    paddingRight: 4,
  },
  chartBar: {
    flex: 1,
    alignItems: 'center' as const,
    gap: 4,
  },
  bar: {
    width: '80%',
    borderRadius: 4,
    minHeight: 4,
  },
  hourLabel: {
    color: 'var(--color-text-secondary)',
  },
  insights: {
    gap: 8,
    marginBottom: 16,
  },
  insightRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
    padding: 8,
    backgroundColor: 'var(--color-surface)',
    borderRadius: 4,
  },
  insightText: {
    color: 'var(--color-text-secondary)',
  },
  logButton: {
    padding: 16,
    backgroundColor: 'var(--purple-primary)',
    borderRadius: 8,
    alignItems: 'center' as const,
  },
});
