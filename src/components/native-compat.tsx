/**
 * React Native to React Web compatibility layer
 * Maps React Native components to HTML/React equivalents
 */

import React from 'react';

// View -> div
export const View = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement> & { style?: any }>(
  ({ style, ...props }, ref) => <div ref={ref} style={style} {...props} />
);
View.displayName = 'View';

// TouchableOpacity -> button with opacity effect
export const TouchableOpacity = React.forwardRef<HTMLButtonElement, React.HTMLProps<HTMLButtonElement> & {
  onPress?: () => void;
  activeOpacity?: number;
  style?: any;
}>(
  ({ onPress, onClick, style, className = '', activeOpacity = 0.2, ...props }, ref) => (
    <button
      ref={ref}
      onClick={onPress || onClick}
      className={`transition-opacity hover:opacity-${Math.round((1 - activeOpacity) * 100)} ${className}`}
      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', ...style }}
      {...props}
    />
  )
);
TouchableOpacity.displayName = 'TouchableOpacity';

// ScrollView -> div with overflow
export const ScrollView = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement> & {
  horizontal?: boolean;
  style?: any;
}>(
  ({ horizontal, style, ...props }, ref) => (
    <div
      ref={ref}
      style={{
        overflow: 'auto',
        ...(horizontal && { overflowY: 'hidden', overflowX: 'auto' }),
        ...style
      }}
      {...props}
    />
  )
);
ScrollView.displayName = 'ScrollView';

// StyleSheet.create just returns the styles object for web
export const StyleSheet = {
  create: <T extends Record<string, React.CSSProperties>>(styles: T): T => styles,
  flatten: (style: any) => {
    if (Array.isArray(style)) {
      return Object.assign({}, ...style);
    }
    return style || {};
  }
};

// Dimensions
export const Dimensions = {
  get: (type: 'window' | 'screen') => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  }),
  addEventListener: (event: string, handler: any) => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handler);
      return { remove: () => window.removeEventListener('resize', handler) };
    }
    return { remove: () => {} };
  }
};

// Platform
export const Platform = {
  OS: 'web' as const,
  select: <T extends Record<string, any>>(obj: T) => obj.web || obj.default,
};

// ActivityIndicator -> loading spinner
export const ActivityIndicator: React.FC<{ size?: 'small' | 'large'; color?: string }> = ({
  size = 'small',
  color = '#000'
}) => {
  const sizeClass = size === 'large' ? 'w-12 h-12' : 'w-6 h-6';
  return (
    <div className={`${sizeClass} animate-spin`}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke={color}
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill={color}
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
};

// FlatList -> simplified list component
export const FlatList = <T extends any>({
  data,
  renderItem,
  keyExtractor,
  horizontal,
  style,
  ...props
}: {
  data: T[];
  renderItem: ({ item, index }: { item: T; index: number }) => React.ReactElement;
  keyExtractor?: (item: T, index: number) => string;
  horizontal?: boolean;
  style?: any;
}) => {
  return (
    <div
      style={{
        display: horizontal ? 'flex' : 'block',
        flexDirection: horizontal ? 'row' : 'column',
        overflow: 'auto',
        ...style
      }}
      {...props}
    >
      {data.map((item, index) => (
        <div key={keyExtractor ? keyExtractor(item, index) : index}>
          {renderItem({ item, index })}
        </div>
      ))}
    </div>
  );
};

// Pressable -> button
export const Pressable = TouchableOpacity;

// SafeAreaView -> div (no safe area needed on web)
export const SafeAreaView = View;

// TextInput -> input
export const TextInput = React.forwardRef<HTMLInputElement, React.HTMLProps<HTMLInputElement> & {
  onChangeText?: (text: string) => void;
  multiline?: boolean;
  numberOfLines?: number;
  secureTextEntry?: boolean;
  editable?: boolean;
}>(
  ({ onChangeText, onChange, multiline, numberOfLines, secureTextEntry, editable = true, ...props }, ref) => {
    if (multiline) {
      return (
        <textarea
          ref={ref as any}
          onChange={(e) => onChangeText ? onChangeText(e.target.value) : onChange?.(e as any)}
          rows={numberOfLines}
          disabled={!editable}
          {...(props as any)}
        />
      );
    }
    return (
      <input
        ref={ref}
        type={secureTextEntry ? 'password' : 'text'}
        onChange={(e) => onChangeText ? onChangeText(e.target.value) : onChange?.(e)}
        disabled={!editable}
        {...props}
      />
    );
  }
);
TextInput.displayName = 'TextInput';

// Text -> span (already handled in ui/Text component)

export default {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  TextInput,
};