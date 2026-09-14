import { access, readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";

const root = new URL("../dist/", import.meta.url);
const failures = [];
let htmlCount = 0;
let referenceCount = 0;
let publishableTextCount = 0;

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(path)));
    else files.push(path);
  }
  return files;
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

function candidatePaths(pathname) {
  const decoded = decodeURIComponent(pathname);
  const local = decoded.replace(/^\/+/, "");
  if (!local) return [join(root.pathname, "index.html")];
  if (decoded.endsWith("/")) return [join(root.pathname, local, "index.html")];
  if (extname(local)) return [join(root.pathname, local)];
  return [join(root.pathname, local), join(root.pathname, local, "index.html")];
}

const files = await walk(root.pathname);
const legacyPattern = /天空之城|hexo-theme-matery|busuanzi_container|pagead2\.googlesyndication|<generator[^>]+hexo\.io/i;

for (const file of files.filter((path) => [".html", ".xml", ".json", ".txt"].includes(extname(path)))) {
  publishableTextCount += 1;
  const content = await readFile(file, "utf8");
  if (legacyPattern.test(content)) {
    failures.push(`/${relative(root.pathname, file).replaceAll("\\", "/")} still contains legacy site branding or runtime markers`);
  }
}

for (const file of files.filter((path) => path.endsWith(".html"))) {
  htmlCount += 1;
  const html = await readFile(file, "utf8");
  const route = `/${relative(root.pathname, file).replaceAll("\\", "/")}`;
  const base = new URL(route, "https://tonyscript.github.io");
  const matches = html.matchAll(/(?:href|src)=["']([^"']+)["']/g);
  for (const match of matches) {
    const value = match[1];
    if (
      value.startsWith("#") ||
      value.startsWith("mailto:") ||
      value.startsWith("tel:") ||
      value.startsWith("tencent:") ||
      value.startsWith("javascript:") ||
      value.startsWith("data:")
    ) continue;
    const url = new URL(value, base);
    if (url.origin !== base.origin) continue;
    referenceCount += 1;
    const candidates = candidatePaths(url.pathname);
    if (!(await Promise.all(candidates.map(exists))).some(Boolean)) {
      failures.push(`${route} -> ${url.pathname}`);
    }
  }
}

const historicalArticleFiles = files.filter((file) => {
  const path = relative(root.pathname, file).replaceAll("\\", "/");
  return path.startsWith("2017/") && path.endsWith("/index.html");
});

if (historicalArticleFiles.length !== 10) {
  failures.push(`expected 10 modernized historical articles, found ${historicalArticleFiles.length}`);
}

for (const file of historicalArticleFiles) {
  const html = await readFile(file, "utf8");
  const route = `/${relative(root.pathname, file).replaceAll("\\", "/")}`;
  if (!html.includes('class="archive-article"')) failures.push(`${route} is not using the current article layout`);
  if (legacyPattern.test(html)) {
    failures.push(`${route} still contains legacy site chrome or scripts`);
  }
}

const compatibilityPage = await readFile(join(root.pathname, "about/index-1.html"), "utf8");
if (!compatibilityPage.includes("TonyScript")) failures.push("/about/index-1.html is not using the current site shell");
if (await exists(join(root.pathname, "search.xml"))) failures.push("obsolete legacy /search.xml is still published");

const required = [
  "index.html",
  "about/index.html",
  "about/index-1.html",
  "experience/index.html",
  "projects/index.html",
  "writing/index.html",
  "resume/index.html",
  "ai/index.html",
  "contact/index.html",
  "work/safe-agent-autonomy/index.html",
  "work/agent-tool-architecture/index.html",
  "work/incident-resolution-loop/index.html",
  "resume.md",
  "ai/profile.json",
  "robots.txt",
  "sitemap.xml",
  "rss.xml",
  "atom.xml",
  "llms.txt",
  "2017/03/01/2017-03-01-tech-path-of-2016/index.html",
];

for (const path of required) {
  if (!(await exists(join(root.pathname, path)))) failures.push(`missing required output: /${path}`);
}

if (failures.length) {
  console.error(`Site check failed with ${failures.length} issue(s):`);
  failures.slice(0, 100).forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Site check passed: ${htmlCount} HTML files, ${publishableTextCount} publishable text files, ${referenceCount} internal references, ${required.length} required outputs.`);
