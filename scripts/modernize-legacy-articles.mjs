import { access, readdir, readFile, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { legacyArticles, site } from "../src/data/site.ts";

const projectRoot = new URL("../", import.meta.url);
const publicRoot = new URL("../public/", import.meta.url);
const distRoot = new URL("../dist/", import.meta.url);
const writingTemplatePath = new URL("../dist/writing/index.html", import.meta.url);
const writingTemplate = await readFile(writingTemplatePath, "utf8");

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function decodeEntities(value) {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replaceAll("&nbsp;", " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function stripTags(value) {
  return decodeEntities(
    value
      .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

function extractElementInnerHtml(html, id) {
  const openingPattern = new RegExp(`<div\\b[^>]*\\bid=["']${id}["'][^>]*>`, "i");
  const opening = openingPattern.exec(html);
  if (!opening) throw new Error(`Could not find #${id}`);

  const start = opening.index + opening[0].length;
  const tagPattern = /<\/?div\b[^>]*>/gi;
  tagPattern.lastIndex = start;
  let depth = 1;
  let match;

  while ((match = tagPattern.exec(html))) {
    depth += match[0].startsWith("</") ? -1 : 1;
    if (depth === 0) return html.slice(start, match.index).trim();
  }

  throw new Error(`Could not find closing tag for #${id}`);
}

function modernizeArticleMarkup(content) {
  return content
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[\s\S]*?<\/style>/gi, "")
    .replace(/<a\b[^>]*class=["'][^"']*headerlink[^"']*["'][^>]*><\/a>/gi, "")
    .replace(/\son\w+=(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/(src=["'])http:\/\//gi, "$1https://")
    .replace(/<img\b([^>]*?)>/gi, (_match, attributes) => {
      const loading = /\bloading=/.test(attributes) ? "" : ' loading="lazy"';
      const decoding = /\bdecoding=/.test(attributes) ? "" : ' decoding="async"';
      return `<img${attributes}${loading}${decoding}>`;
    });
}

function updateHead(html, article, description, canonical) {
  const fullTitle = `${article.title} — ${site.name}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${site.website}/#person`,
      name: site.name,
      alternateName: site.handle,
      url: site.website,
      jobTitle: "Product Manager",
      sameAs: [site.github],
    },
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${canonical}#article`,
      url: canonical,
      headline: article.title,
      description,
      datePublished: article.date,
      author: { "@id": `${site.website}/#person` },
      mainEntityOfPage: canonical,
    },
  ];

  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(fullTitle)}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${escapeHtml(description)}">`)
    .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${canonical}">`)
    .replace('<meta property="og:type" content="website">', '<meta property="og:type" content="article">')
    .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${escapeHtml(fullTitle)}">`)
    .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${escapeHtml(description)}">`)
    .replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${canonical}">`)
    .replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${escapeHtml(fullTitle)}">`)
    .replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${escapeHtml(description)}">`)
    .replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script type="application/ld+json">${JSON.stringify(structuredData).replaceAll("</script", "<\\/script")}</script>`,
    );
}

function articleNavigation(index) {
  const newer = legacyArticles[index - 1];
  const older = legacyArticles[index + 1];
  const items = [
    '<a href="/writing/">← 返回 Writing</a>',
    newer ? `<a href="${newer.href}">较新一篇：${escapeHtml(newer.title)}</a>` : "",
    older ? `<a href="${older.href}">较早一篇：${escapeHtml(older.title)}</a>` : "",
  ].filter(Boolean);
  return items.join("");
}

function renderArticleMain(article, body, description, index) {
  return `<main id="content" class="site-shell"><article class="archive-article"><header class="archive-article-header"><p class="identity-line">Writing / Archive / 2017</p><h1>${escapeHtml(article.title)}</h1><p class="archive-article-summary">${escapeHtml(description)}</p><dl class="article-facts"><div><dt>Published</dt><dd><time datetime="${article.date}">${article.date}</time></dd></div><div><dt>Topic</dt><dd>${escapeHtml(article.category)}</dd></div><div><dt>Status</dt><dd>Historical archive</dd></div></dl><p class="archive-note">这篇文章保留原始正文、图片和发布日期，并使用当前网站的统一阅读界面。</p></header><div class="archive-article-body">${body}</div><nav class="archive-article-nav" aria-label="历史文章导航">${articleNavigation(index)}</nav></article></main>`;
}

function renderRedirectMain(title, message, target) {
  return `<main id="content" class="site-shell"><section class="legacy-index-notice"><p class="identity-line">Writing / Archive</p><h1>${escapeHtml(title)}</h1><p class="lede">${escapeHtml(message)}</p><a class="text-link" href="${target}">打开新的内容索引 →</a></section></main>`;
}

function replaceMain(html, main) {
  const updated = html.replace(/<main id="content" class="site-shell">[\s\S]*?<\/main>/, main);
  if (updated === html) throw new Error("Could not replace page main content");
  return updated;
}

async function pathExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function walk(directory) {
  if (!(await pathExists(directory))) return [];
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(path)));
    else files.push(path);
  }
  return files;
}

for (const [index, article] of legacyArticles.entries()) {
  const relativePath = `${article.href.replace(/^\/+|\/+$/g, "")}/index.html`;
  const sourcePath = join(publicRoot.pathname, relativePath);
  const outputPath = join(distRoot.pathname, relativePath);
  const legacyHtml = await readFile(sourcePath, "utf8");
  const body = modernizeArticleMarkup(extractElementInnerHtml(legacyHtml, "articleContent"));
  const plainText = stripTags(body);
  const description = plainText.length > 120 ? `${plainText.slice(0, 117)}…` : plainText;
  const canonical = new URL(article.href, site.website).toString();
  const withHead = updateHead(writingTemplate, article, description, canonical);
  await writeFile(outputPath, replaceMain(withHead, renderArticleMain(article, body, description, index)));
}

const redirectRoots = [
  { directory: "archives", target: "/writing/", title: "历史归档已迁移", message: "文章归档已经整合到新的 Writing 页面，原有文章 URL 保持不变。" },
  { directory: "categories", target: "/writing/", title: "文章分类已迁移", message: "旧分类入口已经整合到新的 Writing 页面。" },
  { directory: "tags", target: "/writing/", title: "文章标签已迁移", message: "旧标签入口已经整合到新的 Writing 页面。" },
  { directory: "friends", target: "/about/", title: "旧页面已迁移", message: "这个旧页面不再维护，请从当前网站继续浏览。" },
];

let redirectCount = 0;
for (const redirect of redirectRoots) {
  const directory = join(distRoot.pathname, redirect.directory);
  for (const outputPath of (await walk(directory)).filter((path) => path.endsWith(".html"))) {
    const route = `/${relative(distRoot.pathname, outputPath).replaceAll("\\", "/")}`;
    const canonical = new URL(redirect.target, site.website).toString();
    const description = redirect.message;
    const article = { title: redirect.title, date: "2017-01-01" };
    let html = updateHead(writingTemplate, article, description, canonical);
    html = replaceMain(html, renderRedirectMain(redirect.title, redirect.message, redirect.target));
    html = html.replace("</head>", `<meta http-equiv="refresh" content="0; url=${redirect.target}"></head>`);
    await writeFile(outputPath, html);
    redirectCount += 1;
    console.log(`Modernized legacy index ${route} -> ${redirect.target}`);
  }
}

const compatibilityRedirects = [
  {
    path: "about/index-1.html",
    target: "/about/",
    title: "About 页面已迁移",
    message: "这个旧地址已经迁移到当前 About 页面。",
  },
];

for (const redirect of compatibilityRedirects) {
  const outputPath = join(distRoot.pathname, redirect.path);
  const canonical = new URL(redirect.target, site.website).toString();
  const article = { title: redirect.title, date: "2017-01-01" };
  let html = updateHead(writingTemplate, article, redirect.message, canonical);
  html = replaceMain(html, renderRedirectMain(redirect.title, redirect.message, redirect.target));
  html = html.replace("</head>", `<meta http-equiv="refresh" content="0; url=${redirect.target}"><meta name="robots" content="noindex, follow"></head>`);
  await writeFile(outputPath, html);
  redirectCount += 1;
  console.log(`Modernized compatibility page /${redirect.path} -> ${redirect.target}`);
}

console.log(`Modernized ${legacyArticles.length} historical articles and ${redirectCount} legacy index pages from ${relative(projectRoot.pathname, publicRoot.pathname)}.`);
