import { useState } from 'react';
import { Link, useParams } from 'react-router';
import type { Route } from './+types/tableau';
import Viewer from '../components/Viewer';
import Lightbox from '../components/Lightbox';
import ArtworkTile from '../components/ArtworkTile';
import NotFoundView from '../components/NotFoundView';
import Split from '../components/Split';
import { Arrow } from '../components/Icons';
import { artworks, findArtwork } from '../data/artworks';
import { site } from '../data/site';
import { seo } from '../lib/meta';

export const meta = ({ params }: Route.MetaArgs) => {
  const a = artworks[findArtwork(params.slug)];
  if (!a) return seo({ title: 'Œuvre introuvable', path: '/404' });
  return seo({ title: a.title, description: `${a.title} (${a.year}) — ${a.description}`, image: a.images[0].src, path: `/tableaux/${a.slug}` });
};

export default function Tableau() {
  const { slug } = useParams();
  const i = findArtwork(slug);
  // `key` réinitialise l'état (image active, plein écran) d'une œuvre à l'autre
  return i === -1 ? <NotFoundView /> : <ArtworkView key={slug} index={i} />;
}

function ArtworkView({ index }: { index: number }) {
  const a = artworks[index];
  const next = artworks[(index + 1) % artworks.length];
  const prev = artworks[(index - 1 + artworks.length) % artworks.length];
  const others = artworks.filter((o) => o !== a && o !== next).slice(0, 3);
  const [active, setActive] = useState(0);
  const [full, setFull] = useState(false);

  const specs = (
    [
      ['Année', String(a.year)],
      ['Dimensions', a.dimensions],
      ['Technique', a.technique],
      ['Statut', a.status && a.status[0].toUpperCase() + a.status.slice(1)],
    ] satisfies [string, string | undefined][]
  ).filter((s): s is [string, string] => Boolean(s[1]));

  const mail = `mailto:${site.email}?subject=${encodeURIComponent(`Tableau « ${a.title} »`)}`;

  return (
    <>
      <article className="relative px-5 pt-28 pb-24 sm:px-8 sm:pt-32">
        {/* Halo à la couleur du tableau */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[120svh] opacity-40"
          style={{ background: `radial-gradient(60% 50% at 35% 35%, ${a.color}, transparent 70%)` }}
        />

        <div className="relative mb-8 flex items-center justify-between text-xs tracking-[0.2em] uppercase">
          <Link to="/tableaux" viewTransition className="group flex items-center gap-2 hover:text-flame">
            <Arrow dir="left" className="size-4 transition-transform group-hover:-translate-x-1" /> Tableaux
          </Link>
          <span className="flex items-center gap-4 tabular-nums">
            <Link to={`/tableaux/${prev.slug}`} viewTransition aria-label={`Précédent : ${prev.title}`} className="hover:text-flame"><Arrow dir="left" className="size-4" /></Link>
            {a.n} / {String(artworks.length).padStart(2, '0')}
            <Link to={`/tableaux/${next.slug}`} viewTransition aria-label={`Suivant : ${next.title}`} className="hover:text-flame"><Arrow className="size-4" /></Link>
          </span>
        </div>

        <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div className="flex justify-center lg:justify-start">
              <Viewer image={a.images[active]} onOpen={() => setFull(true)} morph={active === 0} />
            </div>
            {a.images.length > 1 && (
              <div className="mt-5 flex justify-center gap-3 lg:justify-start">
                {a.images.map((im, n) => (
                  <button
                    key={im.src}
                    type="button"
                    onClick={() => setActive(n)}
                    aria-label={`Image ${n + 1} : ${im.alt}`}
                    aria-pressed={n === active}
                    className={`size-20 overflow-hidden transition-opacity ${n === active ? 'ring-1 ring-flame ring-offset-4 ring-offset-night' : 'opacity-40 hover:opacity-100'}`}
                  >
                    <img src={im.small} alt="" className="size-full object-cover" />
                  </button>
                ))}
              </div>
            )}
            <p className="mt-4 hidden text-center text-[0.7rem] tracking-[0.2em] text-ash uppercase pointer-fine:block lg:text-left">
              Survolez pour voir la matière — cliquez pour agrandir
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <p className="font-serif text-2xl text-flame italic">N° {a.n}</p>
              <h1 className="mt-2 font-display text-[16vw] leading-[0.85] uppercase sm:text-8xl xl:text-9xl">
                <Split text={a.title} step={70} />
              </h1>
              <p className="mt-8 animate-rise font-serif text-3xl leading-tight text-bone/85" style={{ animationDelay: '250ms' }}>
                {a.description}
              </p>

              <dl className="mt-10 animate-rise border-t border-line text-xs tracking-[0.2em] uppercase" style={{ animationDelay: '350ms' }}>
                {specs.map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-line py-4">
                    <dt className="text-ash">{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10 flex animate-rise flex-wrap gap-3" style={{ animationDelay: '450ms' }}>
                <a href={mail} className="group inline-flex items-center gap-4 rounded-full bg-bone px-7 py-4 text-xs tracking-[0.2em] text-night uppercase transition-colors hover:bg-flame">
                  Ce tableau m'intéresse <Arrow className="size-4 transition-transform group-hover:translate-x-1" />
                </a>
                {site.shop && (
                  <a href={site.shop} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-full border border-bone/30 px-7 py-4 text-xs tracking-[0.2em] uppercase hover:border-bone">
                    Boutique <Arrow dir="up-right" className="size-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* ——— Tableau suivant ——— */}
      <Link
        to={`/tableaux/${next.slug}`}
        viewTransition
        data-cursor="Suivant"
        className="group relative block overflow-hidden border-t border-line px-5 py-16 sm:px-8 sm:py-24 pointer-fine:cursor-none"
      >
        <span
          aria-hidden
          className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-700 ease-out-expo group-hover:scale-y-100"
          style={{ background: next.color }}
        />
        <span className="relative flex items-center justify-between text-xs tracking-[0.2em] uppercase">
          Tableau suivant <span className="font-serif text-xl normal-case italic">N° {next.n}</span>
        </span>
        <span className="relative mt-4 block font-display text-[15vw] leading-[0.85] uppercase">
          <span className="text-dim transition-colors duration-500 group-hover:text-bone">{next.title}</span>
        </span>
      </Link>

      <section className="border-t border-line px-5 py-24 sm:px-8">
        <h2 className="mb-12 font-display text-5xl uppercase sm:text-7xl">Encore</h2>
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((o) => (
            <ArtworkTile key={o.slug} artwork={o} morph={false} />
          ))}
        </div>
      </section>

      {full && <Lightbox images={a.images} index={active} onIndex={setActive} onClose={() => setFull(false)} />}
    </>
  );
}
