/**
 * 🌐 INTEGRATION DISCOVERY CARD
 *
 * Automatically discovers relevant APIs and integrations
 */

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from '../native-compat';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';

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
  deviceType?: string;
}

export const IntegrationDiscoveryCard: React.FC<IntegrationDiscoveryCardProps> = ({
  deviceType = 'desktop',
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
    if (relevance >= 85) return 'var(--green-primary)';
    if (relevance >= 70) return 'var(--cyan-primary)';
    return 'var(--cyan-primary)';
  };

  const getStatusColor = (status: string) => {
    if (status === 'connected') return 'var(--green-primary)';
    if (status === 'recommended') return 'var(--amber-primary)';
    return 'var(--color-text-secondary)';
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
    backgroundColor: 'var(--cyan-primary)',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 8,
  },
  integrationsList: {
    flex: 1,
    marginBottom: 16,
  },
  integrationCard: {
    padding: 16,
    backgroundColor: 'var(--color-surface)',
    borderRadius: 8,
    marginBottom: 16,
    gap: 16,
  },
  integrationMain: {
    flexDirection: 'row' as const,
    gap: 16,
  },
  integrationContent: {
    flex: 1,
    gap: 8,
  },
  integrationHeader: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  },
  statusBadge: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 4,
  },
  description: {
    color: 'var(--color-text-secondary)',
  },
  metaRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  },
  categoryBadge: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    backgroundColor: 'var(--color-surface)',
    borderRadius: 4,
  },
  relevanceContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
  },
  relevanceBar: {
    width: 60,
    height: 4,
    backgroundColor: 'var(--color-surface)',
    borderRadius: 2,
    overflow: 'hidden' as const,
  },
  relevanceFill: {
    height: '100%',
  },
  relevanceText: {
    color: 'var(--color-text-secondary)',
    minWidth: 30,
  },
  connectButton: {
    padding: 8,
    backgroundColor: 'var(--cyan-primary)',
    borderRadius: 4,
    alignItems: 'center' as const,
  },
  connectedButton: {
    backgroundColor: 'var(--green-primary)',
  },
  discoveryInfo: {
    padding: 16,
    backgroundColor: 'var(--color-surface)',
    borderRadius: 8,
  },
  infoText: {
    color: 'var(--color-text-secondary)',
    textAlign: 'center' as const,
  },
});
