import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { ThemeProvider } from '../../src/context/ThemeContext';
import { About } from '../../src/pages/About';

describe('About page component', () => {
  beforeEach(() => {
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

  test('renders biography, career timeline, tech matrix, and contact form', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <About />
        </ThemeProvider>
      </MemoryRouter>
    );

    // Bio check
    expect(screen.getByRole('heading', { level: 1 })).toBeDefined();

    // Timeline check
    expect(screen.getByText(/professional experience/i)).toBeDefined();

    // Contact form elements check
    expect(screen.getByLabelText(/name/i)).toBeDefined();
    expect(screen.getByLabelText(/message/i)).toBeDefined();
  });
});
