/**
 * 🔄 INTEREST ROTATION PREDICTOR CARD
 *
 * Predicts hyperfixation cycles and manages interest transitions
 */

import React from 'react';
import { View, StyleSheet } from '../native-compat';
import { Card } from '../ui/Card';
import { Text } from '../ui/Text';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { DeviceType } from '../../constants/breakpoints';

interface InterestRotationCardProps {
  deviceType: DeviceType;
}

export const InterestRotationCard: React.FC<InterestRotationCardProps> = ({ deviceType }) => {
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
    if (level >= 75) return Colors.pink.primary;
    if (level >= 50) return Colors.purple.primary;
    return Colors.cyan.primary;
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
  currentInterest: {
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: Spacing.sm,
    marginBottom: Spacing.md,
  },
  interestName: {
    marginTop: Spacing.sm,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.xl,
  },
  stat: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  statLabel: {
    color: Colors.textSecondary,
  },
  intensityBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Spacing.sm,
  },
  prediction: {
    padding: Spacing.md,
    backgroundColor: Colors.purple.light,
    borderRadius: Spacing.sm,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.purple.primary,
  },
  predictionHeader: {
    marginBottom: Spacing.sm,
  },
  predictionContent: {
    marginBottom: Spacing.md,
  },
  predictionText: {
    marginBottom: Spacing.xs,
  },
  predictionDate: {
    color: Colors.textSecondary,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.surface,
    borderRadius: Spacing.xs,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.purple.primary,
  },
  nextInterests: {
    gap: Spacing.sm,
  },
  sectionTitle: {
    marginBottom: Spacing.sm,
  },
  nextInterestRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: Spacing.xs,
  },
  nextInterestContent: {
    flex: 1,
    gap: Spacing.xs,
  },
  probabilityBar: {
    height: 4,
    backgroundColor: Colors.surface,
    borderRadius: 2,
    overflow: 'hidden',
  },
  probabilityFill: {
    height: '100%',
    backgroundColor: Colors.pink.primary,
  },
  probabilityText: {
    color: Colors.textSecondary,
    minWidth: 40,
    textAlign: 'right',
  },
});
