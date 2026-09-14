import { legacyArticles, site } from "../data/site";

export const prerender = true;

const escapeXml = (value: string) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

export function GET() {
  const latestUpdated = new Date(`${legacyArticles[0].date}T00:00:00+08:00`).toISOString();
  const entries = legacyArticles
    .map((article) => {
      const url = new URL(article.href, site.website).toString();
      const published = new Date(`${article.date}T00:00:00+08:00`).toISOString();
      return `<entry><title>${escapeXml(article.title)}</title><link href="${url}"/><id>${url}</id><published>${published}</published><updated>${published}</updated><author><name>${escapeXml(site.name)}</name><uri>${site.website}</uri></author><category term="${escapeXml(article.category)}"/><summary>Originally published on ${article.date}.</summary></entry>`;
    })
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<feed xmlns="http://www.w3.org/2005/Atom"><title>${escapeXml(site.name)} — Writing</title><subtitle>${escapeXml(site.description)}</subtitle><link href="${site.website}/atom.xml" rel="self" type="application/atom+xml"/><link href="${site.website}/writing/"/><id>${site.website}/writing/</id><updated>${latestUpdated}</updated><author><name>${escapeXml(site.name)}</name><uri>${site.website}</uri></author>${entries}</feed>`;
  return new Response(xml, {
    headers: { "Content-Type": "application/atom+xml; charset=utf-8" },
  });
}
