import { Link } from 'react-router';
import type { Artwork } from '../data/artworks';

export default function ArtworkCard({
  artwork,
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  eager = false,
  crop = false,
}: {
  artwork: Artwork;
  sizes?: string;
  eager?: boolean;
  /** Recadre en 4:5 pour aligner les cartes d'une grille. */
  crop?: boolean;
}) {
  const cover = artwork.images[0];
  return (
    <Link to={`/tableaux/${artwork.slug}`} className="group block">
      <div className="overflow-hidden bg-line/40">
        <img
          src={cover.src}
          srcSet={cover.srcSet}
          sizes={sizes}
          alt={cover.alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className={`w-full ${crop ? 'aspect-[4/5] object-cover' : ''} transition-transform duration-700 ease-out group-hover:scale-[1.03]`}
        />
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-xl group-hover:text-accent">{artwork.title}</h3>
        <span className="text-sm text-muted tabular-nums">{artwork.year}</span>
      </div>
    </Link>
  );
}
