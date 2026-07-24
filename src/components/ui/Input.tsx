import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  error?: string;
  type?: string;
  rows?: number;
}

export const Input = forwardRef<any, InputProps>(
  ({ className, label, error, type = 'text', rows = 4, ...props }, ref) => {
    const inputClasses = cn(
      'w-full bg-transparent px-4 py-3 font-sans text-sm swiss-border text-swiss-black dark:text-swiss-white transition-all duration-150 focus:border-swiss-black dark:focus:border-swiss-white swiss-focus disabled:opacity-50 disabled:pointer-events-none',
      error && 'border-swiss-accent focus:border-swiss-accent focus:ring-swiss-accent',
      className
    );

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={props.id} className="font-mono text-xs uppercase tracking-wider text-swiss-black dark:text-swiss-white">
            {label}
          </label>
        )}
        
        {type === 'textarea' ? (
          <textarea
            ref={ref}
            rows={rows}
            className={inputClasses}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref}
            type={type}
            className={inputClasses}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}

        {error && (
          <span className="font-mono text-[10px] uppercase tracking-wide text-swiss-accent">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
