import { defineConfig } from 'astro/config';

// For the GitHub Pages review link, build with:
//   SITE_URL=https://<user>.github.io BASE_PATH=/<repo-name>/ npm run build
// For Hostinger (own domain), build with:
//   SITE_URL=https://yourdomain.com npm run build
export default defineConfig({
  site: process.env.SITE_URL || 'http://localhost:4321',
  base: process.env.BASE_PATH || '/',
  build: { inlineStylesheets: 'auto' },
});
