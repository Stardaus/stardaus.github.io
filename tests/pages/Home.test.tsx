import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { ThemeProvider } from '../../src/context/ThemeContext';
import { Home } from '../../src/pages/Home';
import * as loaderModule from '../../src/content/loader';

vi.mock('../../src/content/loader');

describe('Home page component', () => {
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

  test('renders hero biography and featured projects only', async () => {
    const mockProjects = [
      {
        slug: 'featured-project',
        frontmatter: {
          title: 'Featured One',
          description: 'Featured project description.',
          date: '2026-05-01',
          tags: ['React'],
          featured: true,
          coverImage: '/og.png',
        },
        content: null,
      },
      {
        slug: 'regular-project',
        frontmatter: {
          title: 'Regular One',
          description: 'Regular project description.',
          date: '2026-04-01',
          tags: ['TypeScript'],
          featured: false,
          coverImage: '/og.png',
        },
        content: null,
      },
    ];

    (loaderModule.getAllProjects as any).mockResolvedValue(mockProjects);

    render(
      <MemoryRouter>
        <ThemeProvider>
          <Home />
        </ThemeProvider>
      </MemoryRouter>
    );

    // Hero title check
    expect(screen.getByRole('heading', { level: 1 })).toBeDefined();

    // Featured project should render, non-featured should NOT be in the featured grid
    await waitFor(() => {
      expect(screen.getByText('Featured One')).toBeDefined();
      expect(screen.queryByText('Regular One')).toBeNull();
    });
  });
});
