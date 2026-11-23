# Mickaël H. — Portfolio

Site portfolio d'un artiste peintre (Bretagne).

**Stack :** Vite · React 19 · TypeScript · Tailwind CSS v4 · React Router 7

## Démarrer

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # génère dist/
npm run preview  # sert le build
```

## Modifier le contenu

| Quoi | Où |
| --- | --- |
| E-mail, Instagram, lien boutique, ville… | `src/data/site.ts` |
| Tableaux (titre, année, dimensions, description, images) | `src/data/artworks.ts` |
| Images des tableaux | `src/assets/artworks/<slug>-640.webp` et `<slug>-1280.webp` |
| Couleurs et polices | bloc `@theme` dans `src/index.css` |

Le lien **Boutique** n'apparaît que si `site.shop` est renseigné.

## Déploiement

Site statique : déployer le dossier `dist/` (Netlify, Vercel, Cloudflare Pages…).
`public/_redirects` gère le routage SPA sur Netlify. Les anciennes URLs
(`/artworks-list`, `/artwork-info/:id`) redirigent vers les nouvelles.
