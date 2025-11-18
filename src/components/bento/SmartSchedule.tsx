import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card } from '../ui/Card';
import { Text } from '../ui/Text';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { DeviceType } from '../../constants/breakpoints';

interface ScheduleBlock {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  color: string;
  type: 'focus' | 'meeting' | 'break' | 'task';
}

interface SmartScheduleProps {
  deviceType: DeviceType;
}

/**
 * Smart Schedule Card
 *
 * Features:
 * - Horizontal timeline view
 * - Color-coded blocks
 * - Current time indicator
 * - Drag-to-adjust (future)
 */
export const SmartSchedule: React.FC<SmartScheduleProps> = ({ deviceType }) => {
  // Mock schedule data
  const schedule: ScheduleBlock[] = [
    {
      id: '1',
      title: 'Morning Focus',
      startTime: '09:00',
      endTime: '11:00',
      color: Colors.purple.primary,
      type: 'focus',
    },
    {
      id: '2',
      title: 'Team Standup',
      startTime: '11:00',
      endTime: '11:30',
      color: Colors.blue.primary,
      type: 'meeting',
    },
    {
      id: '3',
      title: 'Lunch Break',
      startTime: '13:00',
      endTime: '14:00',
      color: Colors.orange.primary,
      type: 'break',
    },
    {
      id: '4',
      title: 'Deep Work',
      startTime: '14:00',
      endTime: '17:00',
      color: Colors.purple.primary,
      type: 'focus',
    },
  ];

  return (
    <Card deviceType={deviceType} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text variant="heading" weight="bold">
          📅 Today's Schedule
        </Text>
        <Text variant="caption" color={Colors.text.tertiary}>
          AI-optimized for your energy levels
        </Text>
      </View>

      {/* Timeline */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.timeline}
        contentContainerStyle={styles.timelineContent}
      >
        {schedule.map((block) => (
          <View
            key={block.id}
            style={[
              styles.scheduleBlock,
              {
                backgroundColor: block.color,
                width: calculateBlockWidth(block.startTime, block.endTime),
              },
            ]}
          >
            <Text size="xs" weight="semibold" numberOfLines={1}>
              {block.title}
            </Text>
            <Text size="xs" color={Colors.white.dark}>
              {block.startTime} - {block.endTime}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Quick Stats */}
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text size="sm" color={Colors.text.tertiary}>
            Focus Time
          </Text>
          <Text size="lg" weight="bold">
            5h
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text size="sm" color={Colors.text.tertiary}>
            Meetings
          </Text>
          <Text size="lg" weight="bold">
            2
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text size="sm" color={Colors.text.tertiary}>
            Breaks
          </Text>
          <Text size="lg" weight="bold">
            3
          </Text>
        </View>
      </View>
    </Card>
  );
};

const calculateBlockWidth = (start: string, end: string): number => {
  const startMins = parseInt(start.split(':')[0]) * 60 + parseInt(start.split(':')[1]);
  const endMins = parseInt(end.split(':')[0]) * 60 + parseInt(end.split(':')[1]);
  const duration = endMins - startMins;
  return Math.max(duration / 2, 80); // Min width 80px
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    marginBottom: Spacing.lg,
  },
  timeline: {
    marginVertical: Spacing.lg,
  },
  timelineContent: {
    gap: Spacing.md,
  },
  scheduleBlock: {
    padding: Spacing.md,
    borderRadius: Spacing.md,
    minHeight: 80,
    justifyContent: 'center',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border.default,
  },
  statItem: {
    alignItems: 'center',
  },
});
