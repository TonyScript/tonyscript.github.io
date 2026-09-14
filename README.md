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

The new site is built with Astro. Historical 2017 source pages remain under `public/`; the production build extracts their article bodies and renders them inside the current site layout while preserving every original URL.

Use the production preview when checking historical URLs. The final build also redirects obsolete archive, category, tag and friends indexes to their current destinations.

## Deployment

The workflow in `.github/workflows/deploy-pages.yml` builds and publishes `dist/` after a push to `master`. In the GitHub repository settings, Pages must use **GitHub Actions** as its source before the first deployment.

## Content boundaries

- Do not invent employment dates, business metrics, customer names or project results.
- Do not publish company source code, internal documents, screenshots or customer data.
- Update shared identity facts in `src/data/site.ts` so HTML, JSON, Markdown, RSS and sitemap output stay consistent.
