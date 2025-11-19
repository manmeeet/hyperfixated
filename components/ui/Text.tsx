import { ReactNode, CSSProperties } from 'react';
import { cn } from '@/lib/utils';

interface TextProps {
  children: ReactNode;
  variant?: 'heading' | 'body' | 'label';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  className?: string;
  style?: CSSProperties;
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * Text Component
 * Flexible text component with consistent typography styling
 */
export function Text({
  children,
  variant = 'body',
  size = 'base',
  weight = 'normal',
  className,
  style,
  as,
}: TextProps) {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
  };

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  const variantClasses = {
    heading: 'text-[var(--color-text)]',
    body: 'text-[var(--color-text)]',
    label: 'text-[var(--color-text-secondary)]',
  };

  // Auto-determine component tag based on variant if not specified
  const defaultTag = variant === 'heading' ? 'h2' : 'p';
  const Component = as || defaultTag;

  return (
    <Component
      className={cn(
        variantClasses[variant],
        sizeClasses[size],
        weightClasses[weight],
        className
      )}
      style={style}
    >
      {children}
    </Component>
  );
}
