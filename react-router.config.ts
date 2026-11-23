import type { Config } from '@react-router/dev/config';
import { catalog } from './app/data/catalog';

export default {
  appDirectory: 'app',
  // Site 100 % statique : chaque page est pré-rendue en HTML au build.
  ssr: false,
  prerender: [
    '/',
    '/tableaux',
    '/bio',
    '/contact',
    '/sitemap.xml',
    '/robots.txt',
    ...catalog.map((a) => `/tableaux/${a.slug}`),
  ],
} satisfies Config;
