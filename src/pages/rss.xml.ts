import { legacyArticles, site } from "../data/site";

export const prerender = true;

const escapeXml = (value: string) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

export function GET() {
  const items = legacyArticles
    .map((article) => {
      const url = new URL(article.href, site.website).toString();
      const date = new Date(`${article.date}T00:00:00+08:00`).toUTCString();
      return `<item><title>${escapeXml(article.title)}</title><link>${url}</link><guid>${url}</guid><pubDate>${date}</pubDate><category>${escapeXml(article.category)}</category><description>Originally published on ${article.date}.</description></item>`;
    })
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>${site.name} — Writing</title><link>${site.website}/writing/</link><description>${escapeXml(site.description)}</description><language>zh-CN</language>${items}</channel></rss>`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
