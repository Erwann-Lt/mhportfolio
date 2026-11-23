/**
 * Catalogue des tableaux.
 *
 * Pour ajouter une œuvre :
 *  1. déposer les images en .webp dans src/assets/artworks/
 *     (une version 640px et une 1280px de large : <slug>-640.webp / <slug>-1280.webp)
 *  2. ajouter une entrée ci-dessous.
 */

const files = import.meta.glob<string>('../assets/artworks/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
});

function img(name: string) {
  const get = (w: number) => {
    const url = files[`../assets/artworks/${name}-${w}.webp`];
    if (!url) throw new Error(`Image manquante : ${name}-${w}.webp`);
    return url;
  };
  return { src: get(1280), srcSet: `${get(640)} 640w, ${get(1280)} 1280w` };
}

export type ArtworkImage = ReturnType<typeof img> & { alt: string };

export type Artwork = {
  slug: string;
  title: string;
  year: number;
  description: string;
  dimensions?: string;
  technique?: string;
  /** Statut de vente — affiché sur la fiche. */
  status?: 'disponible' | 'vendu';
  images: ArtworkImage[];
};

export const artworks: Artwork[] = [
  {
    slug: 'joker',
    title: 'Le Joker',
    year: 2021,
    dimensions: '100 × 80 cm',
    description:
      "Portrait du Joker, entouré de ses répliques écrites à la main à même la toile.",
    images: [
      { ...img('joker'), alt: 'Le Joker — vue d’ensemble' },
      { ...img('joker-detail'), alt: 'Le Joker — détail des inscriptions' },
    ],
  },
  {
    slug: 'mario',
    title: 'Mario',
    year: 2021,
    description: 'Mario Bros en version puzzle, qui s’échappe de ses propres pièces.',
    images: [{ ...img('mario'), alt: 'Mario en puzzle' }],
  },
  {
    slug: 'batman-vs-joker',
    title: 'Batman vs Joker',
    year: 2021,
    description: 'Batman, après avoir croisé le chemin du Joker.',
    images: [{ ...img('batman-joker'), alt: 'Batman au sourire du Joker' }],
  },
  {
    slug: 'brigitte-bardot',
    title: 'Brigitte Bardot',
    year: 2021,
    description: 'Brigitte Bardot au chapeau noir, sur fond de roses.',
    images: [{ ...img('brigitte-bardot'), alt: 'Portrait de Brigitte Bardot' }],
  },
  {
    slug: 'link',
    title: 'Link',
    year: 2021,
    dimensions: '45 × 60 cm',
    description: 'Link, épée levée, en mode puzzle.',
    images: [{ ...img('link'), alt: 'Link en puzzle, épée levée' }],
  },
  {
    slug: 'serge-gainsbourg',
    title: 'Serge Gainsbourg',
    year: 2021,
    dimensions: '100 × 80 cm',
    description: 'Serge Gainsbourg en noir et blanc.',
    images: [{ ...img('serge-gainsbourg'), alt: 'Portrait de Serge Gainsbourg' }],
  },
];

export const getArtwork = (slug: string) => artworks.find((a) => a.slug === slug);

/** Anciennes URLs (/artwork-info/1…) → nouveaux slugs. */
export const legacyIds: Record<string, string> = {
  1: 'joker',
  2: 'mario',
  3: 'batman-vs-joker',
  4: 'brigitte-bardot',
  5: 'link',
  6: 'serge-gainsbourg',
};
