import { catalog, type CatalogEntry } from './catalog';

const files = import.meta.glob<string>('../assets/artworks/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
});

function resolve(name: string) {
  const get = (w: number) => {
    const url = files[`../assets/artworks/${name}-${w}.webp`];
    if (!url) throw new Error(`Image manquante : app/assets/artworks/${name}-${w}.webp`);
    return url;
  };
  return { small: get(640), src: get(1280), srcSet: `${get(640)} 640w, ${get(1280)} 1280w` };
}

export type ArtworkImage = ReturnType<typeof resolve> & { alt: string };
export type Artwork = Omit<CatalogEntry, 'images'> & { n: string; images: ArtworkImage[] };

export const artworks: Artwork[] = catalog.map((a, i) => ({
  ...a,
  n: String(i + 1).padStart(2, '0'),
  images: a.images.map((im) => ({ ...resolve(im.file), alt: im.alt })),
}));

export const findArtwork = (slug: string | undefined) => artworks.findIndex((a) => a.slug === slug);
