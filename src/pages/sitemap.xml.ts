import { caseStudies, getCaseStudyHref } from "../data/caseStudies";
import { legacyArticles, site } from "../data/site";

export const prerender = true;

const routes = [
  "/",
  "/about/",
  "/experience/",
  "/projects/",
  "/writing/",
  "/resume/",
  "/ai/",
  "/contact/",
  ...caseStudies.map((study) => getCaseStudyHref(study)),
  "/resume.md",
  "/ai/profile.json",
  "/rss.xml",
  "/llms.txt",
  ...legacyArticles.map((article) => article.href),
];

export function GET() {
  const urls = routes
    .map((route) => `<url><loc>${new URL(route, site.website).toString()}</loc></url>`)
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
