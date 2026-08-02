import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'fs';
import path from 'path';

// Mock localStorage for JSDOM environment
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = String(value);
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});
if (typeof globalThis !== 'undefined') {
  Object.defineProperty(globalThis, 'localStorage', {
    value: localStorageMock,
    writable: true,
  });
}

describe('Theme Initialization Script in index.html', () => {
  let scriptContent = '';

  beforeEach(() => {
    document.documentElement.className = '';
    localStorage.clear();

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

    // Load the script from index.html
    try {
      const htmlPath = path.resolve(__dirname, '../index.html');
      const html = fs.readFileSync(htmlPath, 'utf8');
      // Match the inline script in <head>
      const match = html.match(/<script\b[^>]*>([\s\S]*?)<\/script>/);
      scriptContent = match ? match[1] : '';
    } catch (e) {
      scriptContent = '';
    }
  });

  function runScript() {
    if (!scriptContent) {
      throw new Error('No inline script found in index.html');
    }
    // Execute the inline script content
    new Function(scriptContent)();
  }

  test('adds .dark class when portfolio-theme is set to dark in localStorage', () => {
    localStorage.setItem('portfolio-theme', 'dark');
    runScript();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  test('removes .dark class when portfolio-theme is set to light in localStorage', () => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('portfolio-theme', 'light');
    runScript();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  test('uses system preference (dark) if portfolio-theme is not set in localStorage', () => {
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })) as any;

    runScript();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
