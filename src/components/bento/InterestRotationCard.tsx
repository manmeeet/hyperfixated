/**
 * 🔄 INTEREST ROTATION PREDICTOR CARD
 *
 * Predicts hyperfixation cycles and manages interest transitions
 */

import React from 'react';
import { View, StyleSheet } from '../native-compat';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';

interface InterestRotationCardProps {
  deviceType?: string;
}

export const InterestRotationCard: React.FC<InterestRotationCardProps> = ({ deviceType = 'desktop' }) => {
  const currentInterest = {
    name: 'React Native Development',
    emoji: '📱',
    startedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    intensityLevel: 85,
  };

  const daysActive = Math.floor(
    (Date.now() - currentInterest.startedAt.getTime()) / (1000 * 60 * 60 * 24)
  );

  const predictedRotation = new Date(Date.now() + 16 * 24 * 60 * 60 * 1000); // 16 days from now
  const daysUntilRotation = 16;

  const likelyNextInterests = [
    { name: 'UI/UX Design', emoji: '🎨', probability: 75 },
    { name: 'Game Development', emoji: '🎮', probability: 60 },
    { name: 'Digital Art', emoji: '🖼️', probability: 45 },
  ];

  const getIntensityColor = (level: number) => {
    if (level >= 75) return 'var(--pink-primary)';
    if (level >= 50) return 'var(--purple-primary)';
    return 'var(--cyan-primary)';
  };

  return (
    <Card>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text size="3xl">🔄</Text>
            <View>
              <Text variant="heading" size="lg" weight="bold">
                Interest Cycle
              </Text>
              <Text size="sm" style={styles.subtitle}>
                Rotation predictor
              </Text>
            </View>
          </View>
        </View>

        {/* Current Interest */}
        <View style={styles.currentInterest}>
          <Text size="3xl">{currentInterest.emoji}</Text>
          <Text variant="heading" size="base" weight="bold" style={styles.interestName}>
            {currentInterest.name}
          </Text>

          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text size="2xl" weight="bold">
                {daysActive}
              </Text>
              <Text size="xs" style={styles.statLabel}>
                days active
              </Text>
            </View>
            <View style={styles.stat}>
              <View
                style={[
                  styles.intensityBadge,
                  { backgroundColor: getIntensityColor(currentInterest.intensityLevel) },
                ]}
              >
                <Text size="lg" weight="bold">
                  {currentInterest.intensityLevel}%
                </Text>
              </View>
              <Text size="xs" style={styles.statLabel}>
                intensity
              </Text>
            </View>
          </View>
        </View>

        {/* Prediction */}
        <View style={styles.prediction}>
          <View style={styles.predictionHeader}>
            <Text size="sm" weight="semibold">
              🔮 Rotation Prediction
            </Text>
          </View>

          <View style={styles.predictionContent}>
            <Text size="sm" style={styles.predictionText}>
              Likely rotation in <Text weight="bold">{daysUntilRotation} days</Text>
            </Text>
            <Text size="xs" style={styles.predictionDate}>
              Around {predictedRotation.toLocaleDateString()}
            </Text>
          </View>

          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${(daysActive / (daysActive + daysUntilRotation)) * 100}%` },
              ]}
            />
          </View>
        </View>

        {/* Likely Next Interests */}
        <View style={styles.nextInterests}>
          <Text size="sm" weight="semibold" style={styles.sectionTitle}>
            💫 Likely Next Interests
          </Text>

          {likelyNextInterests.map((interest, index) => (
            <View key={index} style={styles.nextInterestRow}>
              <Text size="lg">{interest.emoji}</Text>
              <View style={styles.nextInterestContent}>
                <Text size="sm">{interest.name}</Text>
                <View style={styles.probabilityBar}>
                  <View
                    style={[
                      styles.probabilityFill,
                      { width: `${interest.probability}%` },
                    ]}
                  />
                </View>
              </View>
              <Text size="xs" style={styles.probabilityText}>
                {interest.probability}%
              </Text>
            </View>
          ))}
        </View>
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
  currentInterest: {
    alignItems: 'center' as const,
    padding: 16,
    backgroundColor: 'var(--color-surface)',
    borderRadius: 8,
    marginBottom: 16,
  },
  interestName: {
    marginTop: 8,
    marginBottom: 16,
    textAlign: 'center' as const,
  },
  statsRow: {
    flexDirection: 'row' as const,
    gap: 32,
  },
  stat: {
    alignItems: 'center' as const,
    gap: 4,
  },
  statLabel: {
    color: 'var(--color-text-secondary)',
  },
  intensityBadge: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 8,
  },
  prediction: {
    padding: 16,
    backgroundColor: 'var(--purple-light)',
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'var(--purple-primary)',
  },
  predictionHeader: {
    marginBottom: 8,
  },
  predictionContent: {
    marginBottom: 16,
  },
  predictionText: {
    marginBottom: 4,
  },
  predictionDate: {
    color: 'var(--color-text-secondary)',
  },
  progressBar: {
    height: 8,
    backgroundColor: 'var(--color-surface)',
    borderRadius: 4,
    overflow: 'hidden' as const,
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'var(--purple-primary)',
  },
  nextInterests: {
    gap: 8,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  nextInterestRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
    padding: 8,
    backgroundColor: 'var(--color-surface)',
    borderRadius: 4,
  },
  nextInterestContent: {
    flex: 1,
    gap: 4,
  },
  probabilityBar: {
    height: 4,
    backgroundColor: 'var(--color-surface)',
    borderRadius: 2,
    overflow: 'hidden' as const,
  },
  probabilityFill: {
    height: '100%',
    backgroundColor: 'var(--pink-primary)',
  },
  probabilityText: {
    color: 'var(--color-text-secondary)',
    minWidth: 40,
    textAlign: 'right' as const,
  },
});
