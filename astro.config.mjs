// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://devrasityilmaz.com',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [sitemap()],
  image: { responsiveStyles: false },
  devToolbar: { enabled: false },
});
