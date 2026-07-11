import { site, categories } from '../data/site.js';

export const prerender = true;

const posts = import.meta.glob('../content/blog/*.md', { eager: true }) as Record<string, any>;

const staticRoutes = [
  '',
  'posters/',
  'categories/',
  'pricing/',
  'tools/',
  'make-profile-picture/',
  'blog/',
  'contact/',
  'help/',
  'editor/',
  'privacy/',
  'terms/',
  'refund/',
  'dmca/',
  'login/',
];

export function GET() {
  const base = String(site.url).replace(/\/$/, '');
  const today = new Date().toISOString().slice(0, 10);
  const urls: string[] = [];

  staticRoutes.forEach(function (r) {
    urls.push('  <url><loc>' + base + '/' + r + '</loc><lastmod>' + today + '</lastmod></url>');
  });

  // Category pages (all except 'all')
  categories
    .filter(function (c: any) { return c.slug !== 'all'; })
    .forEach(function (c: any) {
      urls.push('  <url><loc>' + base + '/categories/' + c.slug + '/</loc><lastmod>' + today + '</lastmod></url>');
    });

  // Blog posts
  Object.keys(posts).forEach(function (k) {
    const mod = posts[k] || {};
    const fm = mod.frontmatter || {};
    if (fm.draft) return;
    const fileSlug = k.split('/').pop().replace(/\.md$/, '');
    const slug = fm.slug || fileSlug;
    const lastmod = fm.date ? String(fm.date).slice(0, 10) : today;
    urls.push('  <url><loc>' + base + '/blog/' + slug + '/</loc><lastmod>' + lastmod + '</lastmod></url>');
  });

  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.join('\n') +
    '\n</urlset>\n';

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
