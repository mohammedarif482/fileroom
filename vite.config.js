import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const root = fileURLToPath(new URL('.', import.meta.url));

// One HTML entry per page: the home page plus a landing page per portal
const pages = ['gst', 'uae-vat', 'tds', 'income-tax', 'epfo'];

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        ...Object.fromEntries(pages.map((p) => [p, resolve(root, p, 'index.html')])),
      },
    },
  },
});
