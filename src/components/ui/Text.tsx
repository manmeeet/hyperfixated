import React from 'react';

interface TextProps {
  children: React.ReactNode;
  variant?: 'heading' | 'body' | 'caption';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  size = 'base',
  weight = 'normal',
  color,
  className = '',
  style
}) => {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl'
  };

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  };

  const variantClasses = {
    heading: 'font-bold',
    body: '',
    caption: 'text-sm opacity-75'
  };

  return (
    <span
      className={`${sizeClasses[size]} ${weightClasses[weight]} ${variantClasses[variant]} ${className}`}
      style={{ color, ...style }}
    >
      {children}
    </span>
  );
};