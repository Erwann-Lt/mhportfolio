import { catalog } from '../data/catalog';
import { SITE_URL } from '../data/site';

export function loader() {
  const paths = ['/', '/tableaux', '/bio', '/contact', ...catalog.map((a) => `/tableaux/${a.slug}`)];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${SITE_URL}${p}</loc></url>`).join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
