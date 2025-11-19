import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({ children, className = '', style }) => {
  return (
    <div
      className={`rounded-lg bg-white shadow-lg p-4 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};