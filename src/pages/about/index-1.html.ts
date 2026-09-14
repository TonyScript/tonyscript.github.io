export const prerender = true;

const body = `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="refresh" content="0; url=/about/">
    <link rel="canonical" href="https://tonyscript.github.io/about/">
    <title>About — Tony Pang</title>
  </head>
  <body>
    <p>此页面已迁移至 <a href="/about/">About</a>。</p>
  </body>
</html>`;

export function GET() {
  return new Response(body, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
