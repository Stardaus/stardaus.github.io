import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { ThemeProvider } from '../../src/context/ThemeContext';
import { Layout } from '../../src/components/layout/Layout';

describe('Layout component', () => {
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

  test('renders header, main, footer landmark tags and navigation links', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Layout>
            <div>Test Child</div>
          </Layout>
        </ThemeProvider>
      </MemoryRouter>
    );

    // Landmarks
    expect(screen.getByRole('banner')).toBeDefined(); // <header>
    expect(screen.getByRole('main')).toBeDefined();   // <main>
    expect(screen.getByRole('contentinfo')).toBeDefined(); // <footer>

    // Links
    expect(screen.getByRole('link', { name: /home/i })).toBeDefined();
    expect(screen.getByRole('link', { name: /projects/i })).toBeDefined();
    expect(screen.getByRole('link', { name: /about/i })).toBeDefined();

    // Child content
    expect(screen.getByText('Test Child')).toBeDefined();
  });
});
