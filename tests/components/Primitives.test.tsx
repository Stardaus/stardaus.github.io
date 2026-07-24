import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { Button } from '../../src/components/ui/Button';
import { Badge } from '../../src/components/ui/Badge';
import { Input } from '../../src/components/ui/Input';

describe('Primitive Swiss UI Components', () => {
  describe('Button', () => {
    test('renders children and handles click events', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click Me</Button>);
      
      const button = screen.getByRole('button', { name: 'Click Me' });
      expect(button).toBeDefined();
      
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Badge', () => {
    test('renders content correctly', () => {
      render(<Badge>React</Badge>);
      const badge = screen.getByText('React');
      expect(badge).toBeDefined();
    });
  });

  describe('Input', () => {
    test('handles input value changes and renders label', () => {
      const handleChange = vi.fn();
      render(<Input label="Email" placeholder="Enter email" onChange={handleChange} />);
      
      const label = screen.getByText('Email');
      expect(label).toBeDefined();
      
      const input = screen.getByPlaceholderText('Enter email') as HTMLInputElement;
      expect(input).toBeDefined();
      
      fireEvent.change(input, { target: { value: 'test@example.com' } });
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(input.value).toBe('test@example.com');
    });
  });
});
