/**
 * Catalogue des tableaux (données pures, sans import d'images).
 *
 * Ajouter une œuvre :
 *  1. déposer <fichier>-640.webp et <fichier>-1280.webp dans app/assets/artworks/
 *  2. ajouter une entrée ci-dessous (l'ordre = l'ordre d'affichage).
 *
 * `color` : teinte dominante du tableau, utilisée pour l'ambiance de sa page.
 */
export type CatalogEntry = {
  slug: string;
  title: string;
  year: number;
  description: string;
  dimensions?: string;
  technique?: string;
  status?: 'disponible' | 'vendu';
  color: string;
  images: { file: string; alt: string }[];
};

export const catalog: CatalogEntry[] = [
  {
    slug: 'joker',
    title: 'Le Joker',
    year: 2021,
    dimensions: '100 × 80 cm',
    color: '#c0262f',
    description: 'Le Joker, entouré de ses propres répliques écrites à la main, à même la toile.',
    images: [
      { file: 'joker', alt: 'Le Joker, vue d’ensemble' },
      { file: 'joker-detail', alt: 'Le Joker, détail des inscriptions' },
    ],
  },
  {
    slug: 'mario',
    title: 'Mario',
    year: 2021,
    color: '#2a64c9',
    description: 'Mario Bros en version puzzle, qui s’échappe de ses propres pièces.',
    images: [{ file: 'mario', alt: 'Mario qui court en se détachant de pièces de puzzle' }],
  },
  {
    slug: 'batman-vs-joker',
    title: 'Batman vs Joker',
    year: 2021,
    color: '#3d5a80',
    description: 'Batman, après avoir croisé le chemin du Joker.',
    images: [{ file: 'batman-joker', alt: 'Batman portant le sourire rouge du Joker' }],
  },
  {
    slug: 'brigitte-bardot',
    title: 'Brigitte Bardot',
    year: 2021,
    color: '#b3263f',
    description: 'Brigitte Bardot au chapeau noir, sur un fond de roses rouges.',
    images: [{ file: 'brigitte-bardot', alt: 'Portrait de Brigitte Bardot au chapeau noir' }],
  },
  {
    slug: 'link',
    title: 'Link',
    year: 2021,
    dimensions: '45 × 60 cm',
    color: '#0a9bc2',
    description: 'Link, épée levée, en mode puzzle.',
    images: [{ file: 'link', alt: 'Link brandissant son épée, sur fond de puzzle' }],
  },
  {
    slug: 'serge-gainsbourg',
    title: 'Serge Gainsbourg',
    year: 2021,
    dimensions: '100 × 80 cm',
    color: '#9a8f82',
    description: 'Serge Gainsbourg, en noir et blanc.',
    images: [{ file: 'serge-gainsbourg', alt: 'Portrait de Serge Gainsbourg en noir et blanc' }],
  },
];
