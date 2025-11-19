/**
 * 🌐 INTEGRATION DISCOVERY CARD
 *
 * Automatically discovers relevant APIs and integrations
 */

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from '../native-compat';
import { Card } from '../ui/Card';
import { Text } from '../ui/Text';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { DeviceType } from '../../constants/breakpoints';

interface Integration {
  id: string;
  name: string;
  emoji: string;
  category: string;
  relevance: number;
  description: string;
  status: 'available' | 'connected' | 'recommended';
}

interface IntegrationDiscoveryCardProps {
  deviceType: DeviceType;
}

export const IntegrationDiscoveryCard: React.FC<IntegrationDiscoveryCardProps> = ({
  deviceType,
}) => {
  const [integrations] = useState<Integration[]>([
    {
      id: '1',
      name: 'Notion',
      emoji: '📝',
      category: 'Productivity',
      relevance: 95,
      description: 'Sync tasks and notes',
      status: 'recommended',
    },
    {
      id: '2',
      name: 'Google Calendar',
      emoji: '📅',
      category: 'Scheduling',
      relevance: 90,
      description: 'Auto-schedule focus sessions',
      status: 'recommended',
    },
    {
      id: '3',
      name: 'Spotify',
      emoji: '🎵',
      category: 'Focus',
      relevance: 85,
      description: 'Focus playlists',
      status: 'available',
    },
    {
      id: '4',
      name: 'GitHub',
      emoji: '💻',
      category: 'Development',
      relevance: 80,
      description: 'Track coding sessions',
      status: 'available',
    },
    {
      id: '5',
      name: 'Todoist',
      emoji: '✅',
      category: 'Tasks',
      relevance: 75,
      description: 'Import tasks',
      status: 'available',
    },
  ]);

  const getRelevanceColor = (relevance: number) => {
    if (relevance >= 85) return Colors.green.primary;
    if (relevance >= 70) return Colors.cyan.primary;
    return Colors.cyan.primary;
  };

  const getStatusColor = (status: string) => {
    if (status === 'connected') return Colors.green.primary;
    if (status === 'recommended') return Colors.amber.primary;
    return Colors.textSecondary;
  };

  return (
    <Card>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text size="3xl">🌐</Text>
            <View>
              <Text variant="heading" size="lg" weight="bold">
                Integrations
              </Text>
              <Text size="sm" style={styles.subtitle}>
                {integrations.filter(i => i.status === 'recommended').length} recommended
              </Text>
            </View>
          </View>
          <View style={styles.badge}>
            <Text size="sm" weight="semibold">
              {integrations.length}
            </Text>
          </View>
        </View>

        {/* Integrations List */}
        <ScrollView style={styles.integrationsList}>
          {integrations.map(integration => (
            <View key={integration.id} style={styles.integrationCard}>
              <View style={styles.integrationMain}>
                <Text size="3xl">{integration.emoji}</Text>
                <View style={styles.integrationContent}>
                  <View style={styles.integrationHeader}>
                    <Text variant="heading" size="base" weight="bold">
                      {integration.name}
                    </Text>
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: getStatusColor(integration.status) },
                      ]}
                    >
                      <Text size="xs" weight="semibold">
                        {integration.status}
                      </Text>
                    </View>
                  </View>

                  <Text size="sm" style={styles.description}>
                    {integration.description}
                  </Text>

                  <View style={styles.metaRow}>
                    <View style={styles.categoryBadge}>
                      <Text size="xs">{integration.category}</Text>
                    </View>
                    <View style={styles.relevanceContainer}>
                      <View style={styles.relevanceBar}>
                        <View
                          style={[
                            styles.relevanceFill,
                            {
                              width: `${integration.relevance}%`,
                              backgroundColor: getRelevanceColor(integration.relevance),
                            },
                          ]}
                        />
                      </View>
                      <Text size="xs" style={styles.relevanceText}>
                        {integration.relevance}%
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={[
                  styles.connectButton,
                  integration.status === 'connected' && styles.connectedButton,
                ]}
              >
                <Text size="sm" weight="semibold">
                  {integration.status === 'connected' ? 'Connected ✓' : 'Connect'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Discovery Info */}
        <View style={styles.discoveryInfo}>
          <Text size="xs" style={styles.infoText}>
            💡 Integrations auto-discovered based on your current interests
          </Text>
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
  badge: {
    backgroundColor: Colors.cyan.primary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Spacing.sm,
  },
  integrationsList: {
    flex: 1,
    marginBottom: Spacing.md,
  },
  integrationCard: {
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: Spacing.sm,
    marginBottom: Spacing.md,
    gap: Spacing.md,
  },
  integrationMain: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  integrationContent: {
    flex: 1,
    gap: Spacing.sm,
  },
  integrationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Spacing.xs,
  },
  description: {
    color: Colors.textSecondary,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    backgroundColor: Colors.surface,
    borderRadius: Spacing.xs,
  },
  relevanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  relevanceBar: {
    width: 60,
    height: 4,
    backgroundColor: Colors.surface,
    borderRadius: 2,
    overflow: 'hidden',
  },
  relevanceFill: {
    height: '100%',
  },
  relevanceText: {
    color: Colors.textSecondary,
    minWidth: 30,
  },
  connectButton: {
    padding: Spacing.sm,
    backgroundColor: Colors.cyan.primary,
    borderRadius: Spacing.xs,
    alignItems: 'center',
  },
  connectedButton: {
    backgroundColor: Colors.green.primary,
  },
  discoveryInfo: {
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: Spacing.sm,
  },
  infoText: {
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
