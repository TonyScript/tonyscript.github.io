export const prerender = true;

export function GET() {
  return new Response(
    `User-agent: *\nAllow: /\n\nSitemap: https://tonyscript.github.io/sitemap.xml\n`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
}
