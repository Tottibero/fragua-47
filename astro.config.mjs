// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare({ platformProxy: { enabled: false }, imageService: 'passthrough' }),
  image: { service: passthroughImageService() },
  vite: {
    plugins: [tailwindcss()]
  },
  build: {
    inlineStylesheets: 'always'
  }
});