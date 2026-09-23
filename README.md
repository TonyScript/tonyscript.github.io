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

## Archive policy

- Historical articles keep their original titles, dates, URLs and body text. Their images are mirrored into this repository under `public/2017/*/images/`, so the archive no longer depends on third-party image hosts; provenance for each mirrored image is recorded in `scripts/archive-images.json`.
- Images whose original hosts no longer serve them, and for which no backup could be found, are removed with a note in the affected article.
- The pre-2026 Hexo site is preserved in git history and tagged `legacy-hexo-2019`; its theme runtime assets are no longer part of the published site.

## Deployment

The workflow in `.github/workflows/deploy-pages.yml` builds and publishes `dist/` after a push to `master`. In the GitHub repository settings, Pages must use **GitHub Actions** as its source before the first deployment.

## Content boundaries

- Do not invent employment dates, business metrics, customer names or project results.
- Do not publish company source code, internal documents, screenshots or customer data.
- Update shared identity facts in `src/data/site.ts` so HTML, JSON, Markdown, RSS and sitemap output stay consistent.
