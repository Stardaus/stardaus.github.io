import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { ThemeProvider } from '../../src/context/ThemeContext';
import { Projects } from '../../src/pages/Projects';
import * as loaderModule from '../../src/content/loader';

vi.mock('../../src/content/loader');

describe('Projects page component', () => {
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

  test('renders all projects and filters by selected tag', async () => {
    const mockProjects = [
      {
        slug: 'react-proj',
        frontmatter: {
          title: 'React Project',
          description: 'Description for React.',
          date: '2026-05-01',
          tags: ['React'],
          featured: false,
        },
        content: null,
      },
      {
        slug: 'ts-proj',
        frontmatter: {
          title: 'TypeScript Project',
          description: 'Description for TypeScript.',
          date: '2026-04-01',
          tags: ['TypeScript'],
          featured: false,
        },
        content: null,
      },
    ];

    (loaderModule.getAllProjects as any).mockResolvedValue(mockProjects);

    render(
      <MemoryRouter>
        <ThemeProvider>
          <Projects />
        </ThemeProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('React Project')).toBeDefined();
      expect(screen.getByText('TypeScript Project')).toBeDefined();
    });

    // Click 'React' tag filter
    const reactTagBtn = screen.getByRole('button', { name: /react/i });
    fireEvent.click(reactTagBtn);

    // Only React Project should be visible
    expect(screen.getByText('React Project')).toBeDefined();
    expect(screen.queryByText('TypeScript Project')).toBeNull();
  });
});
