/* ─── EscalaX Multi-Page Crawler ───────────────────────────────────── */

import type { CrawledPage } from "./types";

const UA = "ScaleX-Bot/2.0 (+https://mynewstaff.ai/scalex)";

async function fetchPage(url: string, timeoutMs = 4000): Promise<{ html: string; status: number } | null> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": UA },
      redirect: "follow",
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    const html = await res.text();
    return { html, status: res.status };
  } catch {
    return null;
  }
}

// Classify a URL into a page type based on path patterns
function classifyUrl(url: string): CrawledPage["type"] {
  const path = new URL(url).pathname.toLowerCase();
  if (path === "/" || path === "") return "home";
  if (/\/(pricing|precios|planes|plans|packages|paquetes)/i.test(path)) return "pricing";
  if (/\/(about|nosotros|acerca|who-we-are|quienes-somos|team|equipo)/i.test(path)) return "about";
  if (/\/(contact|contacto|get-in-touch|contactenos)/i.test(path)) return "contact";
  if (/\/(blog|articles|articulos|news|noticias|insights|recursos|resources)/i.test(path)) return "blog";
  if (/\/(landing|lp|offer|oferta|promo|free|gratis|webinar|ebook|download|descargar)/i.test(path)) return "landing";
  return "other";
}

// Extract all internal links from HTML
export function extractInternalLinks(html: string, baseUrl: string): string[] {
  const domain = new URL(baseUrl).hostname;
  const links: Set<string> = new Set();
  const hrefRegex = /href=["'](\/[^"'#?]*|https?:\/\/[^"'#?]*)/gi;
  let match;
  while ((match = hrefRegex.exec(html)) !== null) {
    let href = match[1];
    if (href.startsWith("/")) {
      href = `${new URL(baseUrl).protocol}//${domain}${href}`;
    }
    try {
      const u = new URL(href);
      if (u.hostname === domain && u.pathname !== "/") {
        // Normalize: remove trailing slash, lowercase
        const normalized = `${u.protocol}//${u.hostname}${u.pathname.replace(/\/$/, "")}`;
        links.add(normalized);
      }
    } catch { /* skip malformed */ }
  }
  return [...links];
}

// Priority pages to crawl beyond the homepage
const PRIORITY_PATHS = [
  "/pricing", "/precios", "/planes", "/plans",
  "/about", "/nosotros", "/about-us", "/quienes-somos",
  "/contact", "/contacto", "/get-in-touch",
  "/blog", "/articles", "/recursos", "/resources",
  "/services", "/servicios", "/solutions", "/soluciones",
  "/features", "/caracteristicas",
  "/demo", "/free-trial", "/trial", "/get-started",
  "/case-studies", "/testimonials", "/success-stories",
  "/faq", "/help",
];

export async function crawlSite(
  homeHtml: string,
  baseUrl: string,
  maxPages = 5,
): Promise<CrawledPage[]> {
  const pages: CrawledPage[] = [{
    url: baseUrl,
    html: homeHtml,
    status: 200,
    type: "home",
  }];

  // Extract links from homepage
  const internalLinks = extractInternalLinks(homeHtml, baseUrl);

  // Sort links by priority: known valuable paths first
  const prioritized: string[] = [];
  const seen = new Set<string>([baseUrl, baseUrl.replace(/\/$/, "")]);

  // First pass: match priority paths
  for (const path of PRIORITY_PATHS) {
    const fullUrl = `${new URL(baseUrl).protocol}//${new URL(baseUrl).hostname}${path}`;
    if (internalLinks.includes(fullUrl) && !seen.has(fullUrl)) {
      prioritized.push(fullUrl);
      seen.add(fullUrl);
    }
  }

  // Second pass: add remaining links classified as valuable types
  for (const link of internalLinks) {
    if (seen.has(link)) continue;
    const type = classifyUrl(link);
    if (type !== "other" && type !== "home") {
      prioritized.push(link);
      seen.add(link);
    }
  }

  // Fetch top N pages in parallel
  const toFetch = prioritized.slice(0, maxPages);
  const results = await Promise.all(
    toFetch.map(async (url) => {
      const result = await fetchPage(url);
      if (!result) return null;
      return {
        url,
        html: result.html,
        status: result.status,
        type: classifyUrl(url),
      } as CrawledPage;
    }),
  );

  for (const page of results) {
    if (page) pages.push(page);
  }

  return pages;
}
