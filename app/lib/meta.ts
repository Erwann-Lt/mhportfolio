import type { MetaDescriptor } from 'react-router';
import { site, SITE_URL } from '../data/site';
import ogDefault from '../assets/og.jpg';

const abs = (path: string) => (SITE_URL ? new URL(path, SITE_URL + '/').href : path);

/** Balises <title>, description, Open Graph et canonical pour une page. */
export function seo({
  title,
  description = site.description,
  image = ogDefault,
  path,
}: {
  title?: string;
  description?: string;
  image?: string;
  path: string;
}): MetaDescriptor[] {
  const fullTitle = title ? `${title} — ${site.artist}` : `${site.artist} — ${site.tagline}`;
  return [
    { title: fullTitle },
    { name: 'description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'fr_FR' },
    { property: 'og:site_name', content: site.artist },
    { property: 'og:title', content: fullTitle },
    { property: 'og:description', content: description },
    { property: 'og:image', content: abs(image) },
    { property: 'og:url', content: abs(path) },
    { name: 'twitter:card', content: 'summary_large_image' },
    ...(SITE_URL ? [{ tagName: 'link', rel: 'canonical', href: abs(path) } as const] : []),
  ];
}
