import { useState } from 'react';
import { Link, useParams } from 'react-router';
import Seo from '../components/Seo';
import Lightbox from '../components/Lightbox';
import ArtworkCard from '../components/ArtworkCard';
import { ArrowIcon } from '../components/Icons';
import { artworks } from '../data/artworks';
import { site } from '../data/site';
import NotFound from './NotFound';

export default function Artwork() {
  const { slug } = useParams();
  const i = artworks.findIndex((a) => a.slug === slug);
  // `key` remet l'état à zéro quand on navigue d'une œuvre à l'autre
  return i === -1 ? <NotFound /> : <ArtworkView key={slug} index={i} />;
}

function ArtworkView({ index }: { index: number }) {
  const artwork = artworks[index];
  const prev = artworks[(index - 1 + artworks.length) % artworks.length];
  const next = artworks[(index + 1) % artworks.length];
  const others = artworks.filter((a) => a !== artwork).slice(0, 3);

  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const img = artwork.images[active];

  const specs = [
    ['Année', String(artwork.year)],
    ['Dimensions', artwork.dimensions],
    ['Technique', artwork.technique],
    ['Statut', artwork.status && artwork.status[0].toUpperCase() + artwork.status.slice(1)],
  ].filter((s): s is [string, string] => Boolean(s[1]));

  const mail = `mailto:${site.email}?subject=${encodeURIComponent(`À propos du tableau « ${artwork.title} »`)}`;

  return (
    <>
      <Seo title={artwork.title} description={artwork.description} />
      <meta property="og:image" content={new URL(img.src, location.origin).href} />

      <div className="mx-auto max-w-7xl px-5 pt-8 pb-24 sm:px-8 lg:pt-12">
        <Link to="/tableaux" className="group mb-8 inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
          <ArrowIcon dir="left" className="size-4 transition-transform group-hover:-translate-x-1" />
          Tous les tableaux
        </Link>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Images */}
          <div className="animate-fade-up lg:col-span-7">
            <button
              type="button"
              onClick={() => setZoom(true)}
              className="group relative block w-full cursor-zoom-in bg-line/40"
              aria-label="Agrandir l'image"
            >
              <img
                src={img.src}
                srcSet={img.srcSet}
                sizes="(min-width: 1024px) 58vw, 100vw"
                alt={img.alt}
                fetchPriority="high"
                className="mx-auto max-h-[82vh] w-auto object-contain"
              />
              <span className="absolute right-3 bottom-3 rounded-full bg-ink/70 px-3 py-1.5 text-xs text-paper opacity-0 transition-opacity group-hover:opacity-100">
                Agrandir
              </span>
            </button>

            {artwork.images.length > 1 && (
              <div className="mt-4 flex gap-3">
                {artwork.images.map((im, n) => (
                  <button
                    key={im.src}
                    type="button"
                    onClick={() => setActive(n)}
                    aria-label={`Afficher l'image ${n + 1}`}
                    aria-current={n === active}
                    className={`size-20 overflow-hidden transition-opacity ${n === active ? 'ring-1 ring-ink ring-offset-2 ring-offset-paper' : 'opacity-50 hover:opacity-100'}`}
                  >
                    <img src={im.srcSet.split(' ')[0]} alt="" className="size-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Infos */}
          <aside className="animate-fade-up lg:col-span-5" style={{ animationDelay: '120ms' }}>
            <div className="lg:sticky lg:top-28">
              <h1 className="font-display text-5xl leading-tight font-light tracking-tight sm:text-6xl">
                {artwork.title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted">{artwork.description}</p>

              <dl className="mt-10 divide-y divide-line border-y border-line text-sm">
                {specs.map(([k, v]) => (
                  <div key={k} className="flex justify-between py-3.5">
                    <dt className="text-muted">{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={mail}
                  className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-sm text-paper hover:bg-accent"
                >
                  Ce tableau m'intéresse
                  <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
                </a>
                {site.shop && (
                  <a
                    href={site.shop}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full border border-ink/20 px-6 py-3.5 text-sm hover:border-ink"
                  >
                    Boutique
                  </a>
                )}
              </div>

              <nav aria-label="Navigation entre les œuvres" className="mt-14 grid grid-cols-2 gap-4 border-t border-line pt-6 text-sm">
                <Link to={`/tableaux/${prev.slug}`} className="group">
                  <span className="flex items-center gap-2 text-muted">
                    <ArrowIcon dir="left" className="size-4 transition-transform group-hover:-translate-x-1" /> Précédent
                  </span>
                  <span className="mt-1 block font-display text-lg group-hover:text-accent">{prev.title}</span>
                </Link>
                <Link to={`/tableaux/${next.slug}`} className="group text-right">
                  <span className="flex items-center justify-end gap-2 text-muted">
                    Suivant <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="mt-1 block font-display text-lg group-hover:text-accent">{next.title}</span>
                </Link>
              </nav>
            </div>
          </aside>
        </div>

        <section className="mt-28 border-t border-line pt-16">
          <h2 className="mb-10 font-display text-3xl font-light sm:text-4xl">Autres tableaux</h2>
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((a) => (
              <ArtworkCard key={a.slug} artwork={a} crop />
            ))}
          </div>
        </section>
      </div>

      {zoom && (
        <Lightbox images={artwork.images} index={active} onIndex={setActive} onClose={() => setZoom(false)} />
      )}
    </>
  );
}
