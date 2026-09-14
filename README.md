# TonyScript personal site

Source for Tony Pang's personal career infrastructure, published at `tonyscript.github.io`.

## Local development

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
npm run check:site
npm run preview
```

The new site is built with Astro. Historical 2017 pages and their original URL paths are preserved under `public/` and copied unchanged into the production build.

Use the production preview when checking historical URLs. Astro's development server does not resolve copied legacy directory indexes in the same way as the final static build.

## Deployment

The workflow in `.github/workflows/deploy-pages.yml` builds and publishes `dist/` after a push to `master`. In the GitHub repository settings, Pages must use **GitHub Actions** as its source before the first deployment.

## Content boundaries

- Do not invent employment dates, business metrics, customer names or project results.
- Do not publish company source code, internal documents, screenshots or customer data.
- Update shared identity facts in `src/data/site.ts` so HTML, JSON, Markdown, RSS and sitemap output stay consistent.
