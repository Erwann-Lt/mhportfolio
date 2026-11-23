import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('tableaux', 'routes/tableaux.tsx'),
  route('tableaux/:slug', 'routes/tableau.tsx'),
  route('bio', 'routes/bio.tsx'),
  route('contact', 'routes/contact.tsx'),
  route('sitemap.xml', 'routes/sitemap.ts'),
  route('robots.txt', 'routes/robots.ts'),
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig;
