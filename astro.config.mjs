import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://opskernel.io',
  integrations: [tailwind()],
  output: 'static',
  build: {
    format: 'directory',
  },
});
