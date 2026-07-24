import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export default defineConfig(({ command }) => {
  let prerenderPlugin = [];
  if (command === 'build') {
    try {
      const vitePrerender = require('vite-plugin-prerender');
      prerenderPlugin = [
        vitePrerender({
          staticDir: path.join(__dirname, 'dist'),
          routes: ['/', '/projects', '/about'],
          rendererOptions: {
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            timeout: 20000,
          },
        }),
      ];
    } catch (e) {
      console.warn('vite-plugin-prerender skipped or failed to load:', e);
    }
  }

  return {
    plugins: [
      {
        enforce: 'pre',
        ...mdx({
          remarkPlugins: [remarkGfm],
        }),
      },
      react(),
      ...prerenderPlugin,
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      include: ['tests/setup.ts', 'tests/**/*.test.ts', 'tests/**/*.test.tsx'],
    },
  } as any;
});
