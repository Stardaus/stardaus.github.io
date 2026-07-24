import { describe, test, expect } from 'vitest';
import { getAllProjects } from '../../src/content/loader';

describe('getAllProjects content loader', () => {
  test('should load, parse, and sort projects by date descending', async () => {
    const mockModules = {
      '/content/projects/proj-1.mdx': {
        default: () => null,
        frontmatter: {
          title: 'Project One',
          description: 'This is project one description.',
          date: '2026-05-10',
          tags: ['React', 'TypeScript'],
          featured: true,
          coverImage: '/images/one.png',
          githubUrl: 'https://github.com/test/one',
          liveUrl: 'https://example.com/one',
        },
      },
      '/content/projects/proj-2.mdx': {
        default: () => null,
        frontmatter: {
          title: 'Project Two',
          description: 'This is project two description.',
          date: '2026-06-15',
          tags: ['Tailwind'],
          featured: false,
        },
      },
    };

    const projects = await getAllProjects(mockModules as any);

    expect(projects).toHaveLength(2);
    // Should be sorted by date descending (Project Two first)
    expect(projects[0].slug).toBe('proj-2');
    expect(projects[0].frontmatter.title).toBe('Project Two');
    expect(projects[1].slug).toBe('proj-1');
  });

  test('should skip modules with invalid frontmatter schemas', async () => {
    const mockModules = {
      '/content/projects/valid.mdx': {
        default: () => null,
        frontmatter: {
          title: 'Valid Project',
          description: 'This is a valid project description.',
          date: '2026-01-01',
          tags: ['HTML'],
        },
      },
      '/content/projects/invalid.mdx': {
        default: () => null,
        frontmatter: {
          title: 'Hi', // too short (min 3)
          description: 'short', // too short (min 10)
          date: '01/01/2026', // invalid date format
          tags: [], // need at least 1 tag
        },
      },
    };

    const projects = await getAllProjects(mockModules as any);

    expect(projects).toHaveLength(1);
    expect(projects[0].slug).toBe('valid');
  });
});
