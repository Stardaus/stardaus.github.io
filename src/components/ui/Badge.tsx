import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'outline';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  children,
  ...props
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider',
        variant === 'default' &&
          'bg-swiss-gray-100 text-swiss-black border-1 border-swiss-gray-200 dark:bg-swiss-gray-900 dark:text-swiss-white dark:border-swiss-gray-800',
        variant === 'accent' &&
          'bg-swiss-accent text-swiss-white border-1 border-swiss-accent',
        variant === 'outline' &&
          'bg-transparent text-swiss-black dark:text-swiss-white swiss-border',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
