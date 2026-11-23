import { Link } from 'react-router';
import { site } from '../data/site';
import { Arrow } from './Icons';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line px-5 pt-20 pb-6 sm:px-8">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <p data-reveal className="max-w-xl font-serif text-4xl leading-[1.05] sm:text-6xl">
          Une idée de tableau&nbsp;? <em className="text-flame">Parlons-en.</em>
        </p>
        <Link
          to="/contact"
          viewTransition
          data-reveal
          className="group inline-flex items-center gap-4 self-start rounded-full border border-bone/30 px-7 py-4 text-xs tracking-[0.2em] uppercase transition-colors duration-500 hover:border-flame hover:bg-flame hover:text-night md:self-auto"
        >
          Écrivez-moi
          <Arrow className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
        </Link>
      </div>

      <p aria-hidden className="mt-20 font-display text-[22vw] leading-[0.78] whitespace-nowrap uppercase select-none">
        Mickaël H.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5 text-[0.7rem] tracking-[0.2em] text-ash uppercase">
        <span>© {new Date().getFullYear()} {site.artist} — {site.tagline}, {site.location}</span>
        <div className="flex gap-6">
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-bone">Instagram</a>
          <a href={`mailto:${site.email}`} className="hover:text-bone">E-mail</a>
          <button type="button" onClick={() => scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-1.5 uppercase hover:text-bone">
            Haut <Arrow dir="up" className="size-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}
