import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { ThemeProvider } from '../../src/context/ThemeContext';
import { ProjectDetail } from '../../src/pages/ProjectDetail';
import * as loaderModule from '../../src/content/loader';

vi.mock('../../src/content/loader');

describe('ProjectDetail page component', () => {
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

  test('renders project details for valid slug', async () => {
    const mockProjects = [
      {
        slug: 'my-cool-app',
        frontmatter: {
          title: 'My Cool App',
          description: 'A very cool app.',
          date: '2026-05-10',
          tags: ['React'],
          githubUrl: 'https://github.com/test/app',
          liveUrl: 'https://example.com/app',
        },
        content: () => <div>MDX Body Content</div>,
      },
    ];

    (loaderModule.getAllProjects as any).mockResolvedValue(mockProjects);

    render(
      <MemoryRouter initialEntries={['/projects/my-cool-app']}>
        <ThemeProvider>
          <Routes>
            <Route path="/projects/:slug" element={<ProjectDetail />} />
          </Routes>
        </ThemeProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('My Cool App')).toBeDefined();
      expect(screen.getByText('MDX Body Content')).toBeDefined();
      expect(screen.getByText(/view source/i)).toBeDefined();
      expect(screen.getByText(/live demo/i)).toBeDefined();
    });
  });

  test('renders 404 state for invalid slug', async () => {
    (loaderModule.getAllProjects as any).mockResolvedValue([]);

    render(
      <MemoryRouter initialEntries={['/projects/non-existent']}>
        <ThemeProvider>
          <Routes>
            <Route path="/projects/:slug" element={<ProjectDetail />} />
          </Routes>
        </ThemeProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByText(/404/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/project not found/i)).toBeDefined();
    });
  });
});
