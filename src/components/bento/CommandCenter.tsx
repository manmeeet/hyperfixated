import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from '../ui/Card';
import { Text } from '../ui/Text';
import { VoiceButton, VoiceButtonState } from '../voice/VoiceButton';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { DeviceType } from '../../constants/breakpoints';
import { VoiceCommand } from '../../types';

interface CommandCenterProps {
  deviceType: DeviceType;
  recentCommands?: VoiceCommand[];
  onVoicePress: () => void;
}

/**
 * Command Center Card
 *
 * The hero bento card featuring:
 * - Voice button (primary interaction)
 * - Recent commands (terminal-style)
 * - Quick actions (grid)
 *
 * Layout varies by device type
 */
export const CommandCenter: React.FC<CommandCenterProps> = ({
  deviceType,
  recentCommands = [],
  onVoicePress,
}) => {
  const [voiceState, setVoiceState] = useState<VoiceButtonState>('idle');

  const handleVoicePress = () => {
    setVoiceState('listening');
    onVoicePress();

    // Simulate processing (replace with actual voice logic)
    setTimeout(() => setVoiceState('processing'), 2000);
    setTimeout(() => setVoiceState('success'), 4000);
    setTimeout(() => setVoiceState('idle'), 5000);
  };

  const quickActions = [
    { icon: '⏱️', label: 'Start Focus', color: Colors.purple.primary },
    { icon: '📅', label: 'Schedule', color: Colors.blue.primary },
    { icon: '⚡', label: 'Automate', color: Colors.orange.primary },
    { icon: '📊', label: 'Analytics', color: Colors.green.primary },
  ];

  return (
    <Card deviceType={deviceType} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text variant="heading" weight="bold">
          🎤 Command Center
        </Text>
        <Text variant="caption" color={Colors.text.tertiary}>
          Voice commands powered by AI
        </Text>
      </View>

      {/* Voice Button */}
      <View style={styles.voiceContainer}>
        <VoiceButton state={voiceState} onPress={handleVoicePress} deviceType={deviceType} />
        <Text
          variant="caption"
          color={Colors.text.secondary}
          style={styles.voiceHint}
        >
          {getStateText(voiceState)}
        </Text>
      </View>

      {/* Recent Commands */}
      {recentCommands.length > 0 && (
        <View style={styles.recentCommands}>
          <Text variant="body" weight="semibold" style={styles.sectionTitle}>
            Recent Commands
          </Text>
          {recentCommands.slice(0, 3).map((cmd) => (
            <View key={cmd.id} style={styles.commandItem}>
              <Text variant="mono" size="sm" color={Colors.terminal.green}>
                {'> '}{cmd.command}
              </Text>
              <Text variant="caption" color={Colors.text.tertiary}>
                {formatTimestamp(cmd.timestamp)}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Text variant="body" weight="semibold" style={styles.sectionTitle}>
          Quick Actions
        </Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.actionButton, { backgroundColor: action.color }]}
              activeOpacity={0.8}
            >
              <Text size="2xl">{action.icon}</Text>
              <Text size="xs" weight="semibold" style={styles.actionLabel}>
                {action.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Card>
  );
};

const getStateText = (state: VoiceButtonState): string => {
  switch (state) {
    case 'idle':
      return 'Tap to speak';
    case 'listening':
      return 'Listening...';
    case 'processing':
      return 'Processing...';
    case 'success':
      return 'Got it!';
  }
};

const formatTimestamp = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    marginBottom: Spacing.lg,
  },
  voiceContainer: {
    alignItems: 'center',
    marginVertical: Spacing.xl,
  },
  voiceHint: {
    marginTop: Spacing.md,
  },
  recentCommands: {
    marginVertical: Spacing.lg,
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border.default,
  },
  sectionTitle: {
    marginBottom: Spacing.md,
  },
  commandItem: {
    marginVertical: Spacing.xs,
    paddingVertical: Spacing.xs,
  },
  quickActions: {
    marginTop: Spacing.lg,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  actionButton: {
    flex: 1,
    minWidth: '45%',
    aspectRatio: 1,
    borderRadius: Spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.md,
  },
  actionLabel: {
    marginTop: Spacing.xs,
    color: Colors.white.pure,
  },
});
