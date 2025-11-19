/**
 * React Native to React Web compatibility layer
 * Enhanced with proper flex defaults, hover states, and style conversion
 */

import React from 'react';

// View -> div with proper flex defaults
export const View = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement> & { style?: any }>(
  ({ className = '', style, ...props }, ref) => (
    <div
      ref={ref}
      className={`flex flex-col ${className}`}
      style={style}
      {...props}
    />
  )
);
View.displayName = 'View';

// TouchableOpacity with proper hover/active states
export const TouchableOpacity = React.forwardRef<HTMLButtonElement,
  Omit<React.HTMLProps<HTMLButtonElement>, 'type'> & {
    onPress?: () => void;
    activeOpacity?: number;
    style?: any;
  }
>(({ onPress, onClick, style, className = '', children, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    onClick={onPress || onClick}
    className={`transition-all duration-150 hover:opacity-80 active:scale-95 ${className}`}
    style={{
      background: 'none',
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      ...style
    }}
    {...props}
  >
    {children}
  </button>
));
TouchableOpacity.displayName = 'TouchableOpacity';

// ScrollView with proper scrollbar styling
export const ScrollView = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement> & {
  horizontal?: boolean;
  style?: any;
}>(({ horizontal, style, className = '', ...props }, ref) => (
  <div
    ref={ref}
    className={`overflow-auto scrollbar-thin ${className}`}
    style={{
      ...(horizontal && {
        overflowY: 'hidden',
        overflowX: 'auto',
        display: 'flex',
        flexDirection: 'row'
      }),
      ...style
    }}
    {...props}
  />
));
ScrollView.displayName = 'ScrollView';

// StyleSheet that actually converts RN styles to web
export const StyleSheet = {
  create: <T extends Record<string, any>>(styles: T): T => {
    // Convert React Native numeric values to px strings
    const convertStyle = (style: any): any => {
      if (typeof style !== 'object') return style;

      const converted: any = {};
      for (const [key, value] of Object.entries(style)) {
        if (typeof value === 'number' && !key.includes('flex') && !key.includes('opacity') && !key.includes('zIndex')) {
          converted[key] = `${value}px`;
        } else {
          converted[key] = value;
        }
      }
      return converted;
    };

    const convertedStyles: any = {};
    for (const [key, style] of Object.entries(styles)) {
      convertedStyles[key] = convertStyle(style);
    }
    return convertedStyles as T;
  },
  flatten: (style: any) => {
    if (Array.isArray(style)) {
      return Object.assign({}, ...style.filter(Boolean));
    }
    return style || {};
  }
};

// TextInput with proper styling
export const TextInput = React.forwardRef<HTMLInputElement,
  Omit<React.HTMLProps<HTMLInputElement>, 'type'> & {
    onChangeText?: (text: string) => void;
    multiline?: boolean;
    secureTextEntry?: boolean;
    editable?: boolean;
  }
>(({ onChangeText, onChange, multiline, secureTextEntry, editable = true, className = '', style, ...props }, ref) => {
  if (multiline) {
    return (
      <textarea
        ref={ref as any}
        onChange={(e) => onChangeText?.(e.target.value)}
        disabled={!editable}
        className={`bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg p-2 ${className}`}
        style={style}
        {...(props as any)}
      />
    );
  }
  return (
    <input
      ref={ref}
      type={secureTextEntry ? 'password' : 'text'}
      onChange={(e) => onChangeText?.(e.target.value)}
      disabled={!editable}
      className={`bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg p-2 ${className}`}
      style={style}
      {...props}
    />
  );
});
TextInput.displayName = 'TextInput';

// Dimensions
export const Dimensions = {
  get: () => ({
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
  color = 'var(--purple-primary)'
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
