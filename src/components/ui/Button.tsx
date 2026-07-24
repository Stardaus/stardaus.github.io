import React from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'primary',
  size = 'md',
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-mono text-xs uppercase tracking-wider transition-all duration-150 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none swiss-focus',
        // Variants
        variant === 'primary' &&
          'bg-swiss-black text-swiss-white border-1 border-swiss-black hover:bg-swiss-white hover:text-swiss-black dark:bg-swiss-white dark:text-swiss-black dark:border-swiss-white dark:hover:bg-swiss-black dark:hover:text-swiss-white',
        variant === 'secondary' &&
          'bg-transparent text-swiss-black dark:text-swiss-white swiss-border hover:bg-swiss-gray-100 dark:hover:bg-swiss-gray-800',
        variant === 'accent' &&
          'bg-swiss-accent text-swiss-white border-1 border-swiss-accent hover:bg-transparent hover:text-swiss-accent dark:hover:text-swiss-accent',
        // Sizes
        size === 'sm' && 'px-3 py-1.5 text-[10px]',
        size === 'md' && 'px-5 py-2.5 text-xs',
        size === 'lg' && 'px-7 py-3.5 text-sm',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
