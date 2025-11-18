import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Colors } from '../../constants/colors';
import { Spacing } from '../../constants/spacing';
import { DeviceType } from '../../constants/breakpoints';

interface BentoGridProps {
  children: React.ReactNode;
  deviceType: DeviceType;
}

/**
 * Bento Grid Layout System
 *
 * Mobile: Vertical stack (full width)
 * Tablet: 2-column grid
 * Desktop: Full bento flexibility (3-column)
 *
 * Grid characteristics:
 * - Asymmetrical but balanced
 * - Content-driven sizing
 * - Responsive gaps based on device
 */
export const BentoGrid: React.FC<BentoGridProps> = ({ children, deviceType }) => {
  const gap = Spacing.card.gap[deviceType];
  const containerPadding = Spacing.container[deviceType];

  const gridStyle = getGridStyle(deviceType, gap);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.contentContainer,
        {
          padding: containerPadding,
          gap,
        },
        gridStyle,
      ]}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
};

const getGridStyle = (deviceType: DeviceType, gap: number) => {
  switch (deviceType) {
    case 'mobile':
      return {
        flexDirection: 'column' as const,
      };
    case 'tablet':
      return {
        flexDirection: 'row' as const,
        flexWrap: 'wrap' as const,
      };
    case 'desktop':
      return {
        flexDirection: 'row' as const,
        flexWrap: 'wrap' as const,
      };
    default:
      return {};
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  contentContainer: {
    flexGrow: 1,
  },
});
