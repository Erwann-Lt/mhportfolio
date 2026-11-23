import { Link } from 'react-router';
import Seo from '../components/Seo';
import ArtworkCard from '../components/ArtworkCard';
import { ArrowIcon } from '../components/Icons';
import { artworks } from '../data/artworks';
import { site } from '../data/site';
import bio from '../assets/bio.webp';

export default function Home() {
  const [hero, ...rest] = artworks;
  const featured = rest.slice(0, 3);

  return (
    <>
      <Seo />

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 pt-10 pb-20 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:pt-16 lg:pb-28">
        <div className="animate-fade-up lg:col-span-6">
          <p className="mb-6 text-xs tracking-[0.25em] text-muted uppercase">
            {site.tagline} · {site.location}
          </p>
          <h1 className="font-display text-5xl leading-[1.02] font-light tracking-tight sm:text-7xl xl:text-8xl">
            La pop culture,
            <br />
            <em className="font-normal text-accent">peinte</em> à la main.
          </h1>
          <p className="mt-8 max-w-md text-lg text-muted">
            Icônes du cinéma, de la chanson et du jeu vidéo, revisitées sur toile depuis mon atelier en {site.location}.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              to="/tableaux"
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-sm text-paper transition-colors hover:bg-accent"
            >
              Voir les tableaux
              <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/contact" className="text-sm underline decoration-line underline-offset-8 hover:decoration-ink">
              Commander une œuvre
            </Link>
          </div>
        </div>

        <Link
          to={`/tableaux/${hero.slug}`}
          className="group relative animate-fade-up lg:col-span-6"
          style={{ animationDelay: '150ms' }}
        >
          <div className="overflow-hidden shadow-2xl shadow-ink/20">
            <img
              src={hero.images[0].src}
              srcSet={hero.images[0].srcSet}
              sizes="(min-width: 1024px) 50vw, 100vw"
              alt={hero.images[0].alt}
              fetchPriority="high"
              className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>
          <p className="mt-3 text-sm text-muted">
            <span className="font-display text-base text-ink italic">{hero.title}</span>, {hero.year}
            {hero.dimensions && ` — ${hero.dimensions}`}
          </p>
        </Link>
      </section>

      {/* Sélection */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="mb-12 flex items-end justify-between gap-6">
            <h2 className="font-display text-4xl font-light sm:text-5xl">Œuvres récentes</h2>
            <Link to="/tableaux" className="group hidden items-center gap-2 text-sm text-muted hover:text-ink sm:inline-flex">
              Toute la galerie
              <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((a) => (
              <ArtworkCard key={a.slug} artwork={a} crop />
            ))}
          </div>
          <Link to="/tableaux" className="mt-12 inline-flex items-center gap-2 text-sm sm:hidden">
            Toute la galerie <ArrowIcon className="size-4" />
          </Link>
        </div>
      </section>

      {/* Atelier */}
      <section className="bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 md:grid-cols-2 lg:py-28">
          <img
            src={bio}
            alt={`${site.artist} présentant l'un de ses tableaux`}
            loading="lazy"
            className="aspect-[4/5] w-full max-w-md object-cover"
          />
          <div>
            <p className="mb-6 text-xs tracking-[0.25em] text-paper/60 uppercase">L'artiste</p>
            <blockquote className="font-display text-3xl leading-snug font-light sm:text-4xl">
              « J'aime peindre des choses qui me sont chères. Car pour bien faire son travail, il faut d'abord l'aimer. »
            </blockquote>
            <Link
              to="/bio"
              className="group mt-10 inline-flex items-center gap-3 border-b border-paper/30 pb-1 text-sm hover:border-paper"
            >
              Découvrir mon parcours
              <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
