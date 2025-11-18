import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Card } from '../ui/Card';
import { Text } from '../ui/Text';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { DeviceType } from '../../constants/breakpoints';

type TimerMode = 'pomodoro' | 'hyperfocus' | 'custom';
type TimerState = 'idle' | 'active' | 'break' | 'overtime';

interface FocusTimerProps {
  deviceType: DeviceType;
}

/**
 * Focus Timer Card
 *
 * Features:
 * - Circular progress ring
 * - Multiple timer modes
 * - Visual state changes
 * - Large monospace time display
 */
export const FocusTimer: React.FC<FocusTimerProps> = ({ deviceType }) => {
  const [mode, setMode] = useState<TimerMode>('pomodoro');
  const [state, setState] = useState<TimerState>('idle');
  const [timeRemaining, setTimeRemaining] = useState(25 * 60); // 25 minutes in seconds
  const [totalTime, setTotalTime] = useState(25 * 60);

  const ringSize = getRingSize(deviceType);
  const strokeWidth = deviceType === 'desktop' ? 12 : 8;
  const radius = (ringSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (state === 'active' || state === 'overtime') {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 0 && state === 'active') {
            setState('overtime');
            return -1;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [state]);

  const handleStart = () => {
    if (state === 'idle') {
      setState('active');
    } else {
      setState('idle');
      setTimeRemaining(totalTime);
    }
  };

  const progress = timeRemaining > 0 ? (timeRemaining / totalTime) : 0;
  const strokeDashoffset = circumference * (1 - progress);

  const ringColor = getRingColor(state);
  const centerText = getCenterText(state, timeRemaining);

  return (
    <Card deviceType={deviceType} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text variant="heading" weight="bold">
          ⏱️ Focus Timer
        </Text>
        <View style={styles.modeSelector}>
          {(['pomodoro', 'hyperfocus', 'custom'] as TimerMode[]).map((m) => (
            <TouchableOpacity
              key={m}
              onPress={() => setMode(m)}
              style={[
                styles.modeButton,
                mode === m && styles.modeButtonActive,
              ]}
            >
              <Text
                size="xs"
                weight="semibold"
                color={mode === m ? Colors.white.pure : Colors.text.tertiary}
              >
                {m}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Circular Progress Ring */}
      <View style={styles.timerContainer}>
        <Svg width={ringSize} height={ringSize}>
          {/* Background circle */}
          <Circle
            cx={ringSize / 2}
            cy={ringSize / 2}
            r={radius}
            stroke={Colors.gray.light}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <Circle
            cx={ringSize / 2}
            cy={ringSize / 2}
            r={radius}
            stroke={ringColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${ringSize / 2} ${ringSize / 2})`}
          />
        </Svg>

        {/* Center Content */}
        <View style={styles.centerContent}>
          <Text
            variant="mono"
            size={deviceType === 'desktop' ? '6xl' : deviceType === 'tablet' ? '5xl' : '4xl'}
            weight="bold"
          >
            {centerText}
          </Text>
          <Text variant="caption" color={Colors.text.tertiary} style={styles.stateText}>
            {state === 'idle' ? 'Ready to focus' : state === 'active' ? 'Stay focused' : state === 'overtime' ? 'In the zone! 🔥' : 'Break time'}
          </Text>
        </View>
      </View>

      {/* Control Button */}
      <TouchableOpacity
        style={[
          styles.controlButton,
          { backgroundColor: state === 'idle' ? Colors.purple.primary : Colors.red.primary },
        ]}
        onPress={handleStart}
        activeOpacity={0.8}
      >
        <Text weight="bold" size="lg">
          {state === 'idle' ? 'Start Focus' : 'Stop'}
        </Text>
      </TouchableOpacity>

      {/* Stats */}
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text size="2xl" weight="bold">
            0
          </Text>
          <Text size="xs" color={Colors.text.tertiary}>
            Today
          </Text>
        </View>
        <View style={styles.stat}>
          <Text size="2xl" weight="bold">
            0
          </Text>
          <Text size="xs" color={Colors.text.tertiary}>
            Streak
          </Text>
        </View>
        <View style={styles.stat}>
          <Text size="2xl" weight="bold">
            0h
          </Text>
          <Text size="xs" color={Colors.text.tertiary}>
            Total
          </Text>
        </View>
      </View>
    </Card>
  );
};

const getRingSize = (deviceType: DeviceType): number => {
  switch (deviceType) {
    case 'mobile':
      return 200;
    case 'tablet':
      return 240;
    case 'desktop':
      return 280;
  }
};

const getRingColor = (state: TimerState): string => {
  switch (state) {
    case 'idle':
      return Colors.gray.light;
    case 'active':
      return Colors.purple.primary;
    case 'break':
      return Colors.orange.primary;
    case 'overtime':
      return Colors.red.primary;
  }
};

const getCenterText = (state: TimerState, seconds: number): string => {
  if (seconds < 0) return '∞';

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    marginBottom: Spacing.lg,
  },
  modeSelector: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginTop: Spacing.md,
  },
  modeButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Spacing.xs,
    backgroundColor: Colors.background.tertiary,
  },
  modeButtonActive: {
    backgroundColor: Colors.purple.primary,
  },
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.xl,
    position: 'relative',
  },
  centerContent: {
    position: 'absolute',
    alignItems: 'center',
  },
  stateText: {
    marginTop: Spacing.xs,
  },
  controlButton: {
    paddingVertical: Spacing.base,
    borderRadius: Spacing.md,
    alignItems: 'center',
    marginVertical: Spacing.lg,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border.default,
  },
  stat: {
    alignItems: 'center',
  },
});
