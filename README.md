# Mickaël H. — Portfolio

Portfolio d'un artiste peintre (Bretagne) : les icônes de la pop culture, repeintes à la main.

**Stack :** React Router 7 (mode framework, pré-rendu statique) · React 19 · TypeScript · Tailwind CSS v4 · Vite

Chaque page est pré-rendue en HTML au build : référencement, aperçus de partage (Open Graph)
et affichage instantané, sans serveur.

## Démarrer

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # génère build/client (site statique)
npm run typecheck
```

## Modifier le contenu

| Quoi | Où |
| --- | --- |
| E-mail, Instagram, boutique, ville… | `app/data/site.ts` |
| Tableaux (titre, année, dimensions, description, couleur d'ambiance) | `app/data/catalog.ts` |
| Images des tableaux | `app/assets/artworks/<nom>-640.webp` et `<nom>-1280.webp` |
| Couleurs et polices | bloc `@theme` dans `app/app.css` |

Le lien **Boutique** n'apparaît que si `site.shop` est renseigné.
Une nouvelle œuvre ajoutée au catalogue est automatiquement pré-rendue et ajoutée au sitemap.

## Déploiement (Netlify)

Tout est dans `netlify.toml` : build `npm run build`, dossier publié `build/client`, Node 22,
redirections 301 depuis les anciennes URLs, vraie page 404 et cache long sur les fichiers versionnés.
Netlify fournit l'URL du site au build (variable `URL`), utilisée pour les liens canoniques,
les images de partage et le sitemap.
