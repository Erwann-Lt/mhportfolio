import { Link, useViewTransitionState } from 'react-router';
import type { Artwork } from '../data/artworks';

export default function ArtworkTile({
  artwork,
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  eager,
  morph = true,
}: {
  artwork: Artwork;
  sizes?: string;
  eager?: boolean;
  /** Anime l'image jusqu'à la page de l'œuvre (View Transitions). */
  morph?: boolean;
}) {
  const to = `/tableaux/${artwork.slug}`;
  const transitioning = useViewTransitionState(to);
  const img = artwork.images[0];

  return (
    <Link to={to} viewTransition data-cursor="Voir" className="group block pointer-fine:cursor-none">
      <div className="relative overflow-hidden bg-coal">
        <img
          src={img.src}
          srcSet={img.srcSet}
          sizes={sizes}
          alt={img.alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          style={{ viewTransitionName: morph && transitioning ? 'artwork' : undefined }}
          className="w-full transition-[scale,filter] duration-1000 ease-out-expo group-hover:scale-[1.04]"
        />
        <div
          className="absolute inset-0 opacity-0 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-30"
          style={{ background: artwork.color }}
        />
      </div>
      <div className="mt-4 flex items-baseline gap-4">
        <span className="font-serif text-lg text-ash italic">{artwork.n}</span>
        <h3 className="font-display text-2xl leading-none uppercase transition-colors group-hover:text-flame sm:text-3xl">{artwork.title}</h3>
        <span className="ml-auto text-xs tracking-[0.2em] text-ash tabular-nums">{artwork.year}</span>
      </div>
    </Link>
  );
}
