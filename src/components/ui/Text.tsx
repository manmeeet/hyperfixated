import React from 'react';
import { Text as RNText, TextStyle, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';

interface TextProps {
  children: React.ReactNode;
  variant?: 'display' | 'heading' | 'body' | 'caption' | 'mono';
  size?: keyof typeof Typography.size;
  weight?: keyof typeof Typography.weight;
  color?: string;
  style?: TextStyle;
  numberOfLines?: number;
}

/**
 * Base Text Component
 *
 * Supports:
 * - Typography hierarchy
 * - Monospace for data/terminal
 * - Consistent styling
 */
export const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  size,
  weight,
  color = Colors.text.primary,
  style,
  numberOfLines,
}) => {
  const variantStyle = getVariantStyle(variant);
  const fontSize = size ? Typography.size[size] : variantStyle.fontSize;
  const fontWeight = weight ? Typography.weight[weight] : variantStyle.fontWeight;
  const fontFamily = variant === 'mono' ? Typography.fonts.mono : Typography.fonts.sans;

  return (
    <RNText
      style={[
        styles.text,
        {
          fontSize,
          fontWeight,
          fontFamily,
          color,
        },
        style,
      ]}
      numberOfLines={numberOfLines}
    >
      {children}
    </RNText>
  );
};

const getVariantStyle = (variant: string) => {
  switch (variant) {
    case 'display':
      return {
        fontSize: Typography.size['4xl'],
        fontWeight: Typography.weight.bold,
      };
    case 'heading':
      return {
        fontSize: Typography.size['2xl'],
        fontWeight: Typography.weight.semibold,
      };
    case 'body':
      return {
        fontSize: Typography.size.base,
        fontWeight: Typography.weight.regular,
      };
    case 'caption':
      return {
        fontSize: Typography.size.sm,
        fontWeight: Typography.weight.regular,
      };
    case 'mono':
      return {
        fontSize: Typography.size.sm,
        fontWeight: Typography.weight.regular,
      };
    default:
      return {
        fontSize: Typography.size.base,
        fontWeight: Typography.weight.regular,
      };
  }
};

const styles = StyleSheet.create({
  text: {
    lineHeight: Typography.lineHeight.normal * 16,
  },
});
