import { Link } from 'react-router';
import HeroWall from '../components/HeroWall';
import Marquee from '../components/Marquee';
import Manifesto from '../components/Manifesto';
import ArtworkIndex from '../components/ArtworkIndex';
import Split from '../components/Split';
import { Arrow, Star } from '../components/Icons';
import { artworks } from '../data/artworks';
import { site } from '../data/site';
import { seo } from '../lib/meta';
import portrait from '../assets/bio.webp';

export const meta = () => seo({ path: '/' });

export default function Home() {
  return (
    <>
      {/* ——— Hero ——— */}
      <section className="relative flex min-h-svh flex-col justify-end overflow-hidden px-5 pt-28 pb-14 sm:px-8 sm:pb-16">
        <HeroWall />
        <div className="relative">
          <p className="mb-4 animate-rise text-xs tracking-[0.2em] uppercase sm:mb-6" style={{ animationDelay: '500ms' }}>
            {site.tagline} — {site.location}
          </p>
          <h1 className="font-display text-[25.5vw] leading-[0.8] uppercase">
            <Split text="Mickaël" step={0} delay={100} />
          </h1>
          <div className="mt-2 flex flex-col gap-4 sm:mt-[1.5vw] sm:flex-row sm:items-end sm:gap-10">
            <span className="font-display text-[25.5vw] leading-[0.8] text-flame uppercase sm:text-[13vw]">
              <Split text="H." delay={220} />
            </span>
            <p className="max-w-xl animate-rise font-serif text-3xl leading-[1.05] sm:pb-[1.2vw] sm:text-[3.4vw]" style={{ animationDelay: '450ms' }}>
              repeint à la main les <em>icônes</em> de la pop culture.
            </p>
          </div>
          <div className="mt-10 flex animate-rise items-center justify-between border-t border-bone/20 pt-4 text-[0.7rem] tracking-[0.2em] uppercase sm:mt-14" style={{ animationDelay: '700ms' }}>
            <span>Portfolio</span>
            <a href="#oeuvres" className="flex items-center gap-2 hover:text-flame">
              Défiler <Arrow dir="down" className="size-3 animate-bounce" />
            </a>
            <span className="tabular-nums">{String(artworks.length).padStart(2, '0')} œuvres</span>
          </div>
        </div>
      </section>

      {/* ——— Bandeau ——— */}
      <div className="relative z-10 -mt-5 rotate-[-2.5deg] bg-flame py-3 text-night sm:py-4">
        <Marquee
          speed="45s"
          items={artworks.map((a) => (
            <Link key={a.slug} to={`/tableaux/${a.slug}`} viewTransition tabIndex={-1} className="flex items-center">
              <span className="px-6 font-display text-4xl leading-none uppercase sm:text-6xl">{a.title}</span>
              <Star className="size-6 sm:size-8" />
            </Link>
          ))}
        />
      </div>

      {/* ——— Manifeste ——— */}
      <section className="px-5 pt-40 pb-32 sm:px-8 sm:pt-56 sm:pb-48">
        <p className="mb-10 text-xs tracking-[0.2em] text-ash uppercase">(Manifeste)</p>
        <Manifesto
          text="J'aime peindre des choses qui me sont chères. Car pour bien faire son travail, il faut d'abord l'aimer."
          highlight={['chères', "l'aimer"]}
        />
        <p className="mt-10 font-serif text-2xl text-ash italic">— {site.artist}</p>
      </section>

      {/* ——— Œuvres ——— */}
      <section id="oeuvres" className="scroll-mt-24 px-5 pb-32 sm:px-8 sm:pb-48">
        <div className="mb-10 flex items-end justify-between gap-6 sm:mb-16">
          <h2 data-reveal className="font-display text-6xl leading-[0.85] uppercase sm:text-9xl">
            Les <span className="text-dim">œuvres</span>
          </h2>
          <Link to="/tableaux" viewTransition className="group mb-2 flex shrink-0 items-center gap-2 text-xs tracking-[0.2em] uppercase hover:text-flame">
            Tout voir <Arrow className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <ArtworkIndex items={artworks} />
      </section>

      {/* ——— L'artiste ——— */}
      <section className="grid gap-12 px-5 pb-32 sm:px-8 sm:pb-48 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5" data-reveal>
          <div className="overflow-hidden">
            <img src={portrait} alt={`${site.artist} présentant l'un de ses tableaux`} loading="lazy" className="aspect-[4/5] w-full object-cover grayscale transition-[filter] duration-1000 hover:grayscale-0" />
          </div>
        </div>
        <div className="flex flex-col justify-between gap-10 md:col-span-6 md:col-start-7">
          <p className="text-xs tracking-[0.2em] text-ash uppercase">(L'artiste)</p>
          <div data-reveal>
            <p className="font-display text-5xl leading-[0.9] uppercase sm:text-7xl lg:text-8xl">
              Né en {site.born}.
              <br />
              <span className="text-dim">Un quartier gris.</span>
              <br />
              <span className="text-flame">Puis la Bretagne.</span>
            </p>
            <p className="mt-8 max-w-md font-serif text-2xl leading-snug text-bone/80 italic">
              Toujours attiré par le dessin et la peinture, c'est en arrivant en Bretagne qu'il a enfin laissé libre cours à sa passion.
            </p>
          </div>
          <Link
            to="/bio"
            viewTransition
            className="group inline-flex items-center gap-4 self-start border-b border-bone/30 pb-2 text-xs tracking-[0.2em] uppercase hover:border-flame hover:text-flame"
          >
            Lire la bio <Arrow className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </>
  );
}
