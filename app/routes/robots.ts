import { SITE_URL } from '../data/site';

export function loader() {
  const body = `User-agent: *\nAllow: /\n${SITE_URL ? `\nSitemap: ${SITE_URL}/sitemap.xml\n` : ''}`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
}
