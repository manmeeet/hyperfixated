import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, StyleSheet, Animated, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/colors';
import { DeviceType } from '../../constants/breakpoints';
import { Text } from '../ui/Text';

export type VoiceButtonState = 'idle' | 'listening' | 'processing' | 'success';

interface VoiceButtonProps {
  state: VoiceButtonState;
  onPress: () => void;
  deviceType: DeviceType;
}

/**
 * Voice Button - The Hero Element
 *
 * Visual states:
 * - Idle: Purple gradient with subtle pulse
 * - Listening: Red gradient with recording pulse
 * - Processing: Orange gradient with spin
 * - Success: Green gradient with bounce
 *
 * Size varies by device:
 * - Mobile: 80px
 * - Tablet: 96px
 * - Desktop: 128px
 */
export const VoiceButton: React.FC<VoiceButtonProps> = ({ state, onPress, deviceType }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(1)).current;

  const size = getButtonSize(deviceType);

  useEffect(() => {
    // Reset animations
    pulseAnim.setValue(1);
    rotateAnim.setValue(0);
    bounceAnim.setValue(1);

    switch (state) {
      case 'idle':
        // Subtle pulse animation
        Animated.loop(
          Animated.sequence([
            Animated.timing(pulseAnim, {
              toValue: 1.05,
              duration: 1500,
              useNativeDriver: true,
            }),
            Animated.timing(pulseAnim, {
              toValue: 1,
              duration: 1500,
              useNativeDriver: true,
            }),
          ])
        ).start();
        break;

      case 'listening':
        // Recording pulse animation
        Animated.loop(
          Animated.sequence([
            Animated.timing(pulseAnim, {
              toValue: 1.1,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(pulseAnim, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
          ])
        ).start();
        break;

      case 'processing':
        // Processing spin animation
        Animated.loop(
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          })
        ).start();
        break;

      case 'success':
        // Success bounce animation
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: 1.2,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
        break;
    }
  }, [state]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const gradientColors = getGradientColors(state);
  const icon = getIcon(state);

  return (
    <Animated.View
      style={[
        {
          transform: [
            { scale: state === 'listening' ? pulseAnim : state === 'success' ? bounceAnim : pulseAnim },
            { rotate: state === 'processing' ? rotation : '0deg' },
          ],
        },
      ]}
    >
      <TouchableOpacity onPress={onPress} activeOpacity={0.8} disabled={state !== 'idle'}>
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.button,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
            },
          ]}
        >
          <Text variant="display" size="4xl" style={styles.icon}>
            {icon}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const getButtonSize = (deviceType: DeviceType): number => {
  switch (deviceType) {
    case 'mobile':
      return 80;
    case 'tablet':
      return 96;
    case 'desktop':
      return 128;
  }
};

const getGradientColors = (state: VoiceButtonState): string[] => {
  switch (state) {
    case 'idle':
      return Colors.gradients.purple;
    case 'listening':
      return Colors.gradients.red;
    case 'processing':
      return Colors.gradients.orange;
    case 'success':
      return Colors.gradients.green;
  }
};

const getIcon = (state: VoiceButtonState): string => {
  switch (state) {
    case 'idle':
      return '🎤';
    case 'listening':
      return '🔴';
    case 'processing':
      return '⚙️';
    case 'success':
      return '✓';
  }
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow for depth
    shadowColor: Colors.black.pure,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  icon: {
    textAlign: 'center',
  },
});
