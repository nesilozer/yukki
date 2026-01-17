// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  trailingSlash: 'never',
  site: 'https://yukkiscorner.com',
  devToolbar: {
    enabled: false
  }
});
