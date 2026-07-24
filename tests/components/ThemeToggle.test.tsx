import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, beforeEach, vi } from 'vitest';
import { ThemeProvider } from '../../src/context/ThemeContext';
import { ThemeToggle } from '../../src/components/ui/ThemeToggle';

describe('ThemeToggle component', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
    
    // Mock window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  test('should render and allow toggling theme mode', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const button = screen.getByRole('button');
    expect(button).toBeDefined();

    // Initial state is system, clicking should cycle to dark
    fireEvent.click(button);
    expect(localStorage.getItem('portfolio-theme')).toBe('dark');

    // Click again to cycle to light
    fireEvent.click(button);
    expect(localStorage.getItem('portfolio-theme')).toBe('light');

    // Click again to cycle back to system
    fireEvent.click(button);
    expect(localStorage.getItem('portfolio-theme')).toBe('system');
  });
});
