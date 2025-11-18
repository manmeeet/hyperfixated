import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { DeviceType } from '../../constants/breakpoints';

interface CardProps {
  children: React.ReactNode;
  deviceType: DeviceType;
  style?: ViewStyle;
  elevated?: boolean;
}

/**
 * Base Card Component
 *
 * Bento card styling:
 * - Rounded corners (12px)
 * - Subtle depth shadow
 * - Solid border
 * - Responsive padding based on device
 */
export const Card: React.FC<CardProps> = ({ children, deviceType, style, elevated = false }) => {
  const padding = Spacing.card.padding[deviceType];

  return (
    <View
      style={[
        styles.card,
        {
          padding,
          backgroundColor: elevated ? Colors.background.elevated : Colors.background.secondary,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: Spacing.card.borderRadius,
    borderWidth: 1,
    borderColor: Colors.border.default,
    // Subtle shadow for depth
    shadowColor: Colors.black.pure,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
});
