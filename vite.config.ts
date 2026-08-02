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
      const PuppeteerRenderer = require('@prerenderer/renderer-puppeteer');
      const fs = require('fs');
      const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
      const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
      const executablePath = process.env.PUPPETEER_EXECUTABLE_PATH ||
        (fs.existsSync(edgePath) ? edgePath : (fs.existsSync(chromePath) ? chromePath : undefined));

      prerenderPlugin = [
        vitePrerender({
          staticDir: path.join(__dirname, 'dist'),
          routes: ['/', '/projects', '/about'],
          renderer: new PuppeteerRenderer({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            timeout: 20000,
            ...(executablePath ? { executablePath } : {}),
          }),
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
      setupFiles: ['./tests/setup.ts'],
      include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx'],
    },
  } as any;
});
