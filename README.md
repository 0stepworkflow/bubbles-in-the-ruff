# Pet Grooming 2 — Website Template

A warm, modern, fast **pet grooming website template** built with [Astro](https://astro.build). It outputs plain static HTML/CSS/JS, so it hosts anywhere (GitHub Pages, Hostinger, Netlify…).

Five pages: **Home, Services, Gallery, About, Contact** — plus a 404 page.
Highlights: hero with optional video, iMessage-style swipeable photo stack, pastel icon tiles, subtle bubble motif and animations (all respect "reduced motion"), mobile-first, SEO tags and local-business search data built in.

> Every business name, phone number, address, photo and price in this template is a **placeholder**. Nothing here belongs to a real client.

## Quick start
```
npm install
npm run dev        # http://localhost:4321 (live reload)
npm run build      # outputs the finished site to /dist
```
Note: if the project folder path contains an `&`, `npx astro` can fail — use `node node_modules/astro/bin/astro.mjs <command>` instead.

## Customize it for a new client (checklist)
1. **Business info** — edit `src/data/site.ts`: name, owner, phone, email, address, hours, tagline, the "social proof" number, and the service list + prices. The header, footer, Contact page, SEO tags and the live "Open now" badge all read from this file.
2. **Logo** — drop a file named `logo.png` (or `.webp` / `.jpg`) into `src/assets/`. It replaces the text placeholder automatically. Also swap `public/favicon.svg`.
3. **Photos** — put images in `src/assets/photos/`, import them in `src/data/photos.ts`, and write real captions + alt text. (Astro converts them to fast WebP automatically.)
4. **Colors & fonts** — the brand tokens are at the top of `src/styles/global.css` (`:root`). Fonts are self-hosted via `@fontsource` (see `src/layouts/Base.astro`).
5. **Copy** — page text lives in `src/pages/*.astro`. Look for the placeholder sentences (e.g. the owner story on About, the "What clients say" cards on Home) and replace them with real content.
6. **Hero video (optional)** — put a short, muted, looping clip at `public/media/hero.mp4` (under ~3 MB, 720p) and set `heroVideo: '/media/hero.mp4'` in `site.ts`.
7. **Map (optional)** — set `showMap: true` in `site.ts` once the real address is in.
8. **Contact form** — currently opens a pre-filled email. Swap in a form service (Formspree, Netlify Forms…) or a booking tool when ready.

## Where things live
| What | File |
|---|---|
| All business info, hours, services | `src/data/site.ts` |
| Photos, captions, alt text | `src/data/photos.ts` |
| Colors, fonts, shapes, animations | `src/styles/global.css` |
| Header / footer / SEO | `src/layouts/Base.astro` |
| Logo placeholder | `src/components/Logo.astro` |
| Photo stack carousel | `src/components/PhotoStack.astro` |
| Icons | `src/components/Icon.astro` |
| Pages | `src/pages/*.astro` |
| Small interactions (menu, reveal, carousel, badge) | `src/scripts/main.ts` |

## Publishing
- **GitHub Pages (review link):** the included workflow in `.github/workflows/deploy.yml` builds and deploys on every push to `main`. In the repo: *Settings → Pages → Source: GitHub Actions*. (Free GitHub plans only serve Pages from **public** repos.) Manual build: `SITE_URL=https://<user>.github.io BASE_PATH=/<repo-name>/ npm run build`.
- **Own domain / Hostinger:** `SITE_URL=https://yourdomain.com npm run build`, then upload the contents of `dist/` to `public_html`.

## Adding booking later
Astro can add interactive "islands" (React/Vue/Svelte) and server endpoints on top of this site, so a booking widget (Square, Calendly, MoeGo…) or a custom booking flow can be added without redoing the design.
