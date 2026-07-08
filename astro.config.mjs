import { defineConfig } from 'astro/config';

// https://astro.build
export default defineConfig({
  site: 'https://posterhub.pages.dev',
  server: { port: 4321, host: true },
  build: { format: 'directory' },
});
