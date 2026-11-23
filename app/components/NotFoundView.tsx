import { Link } from 'react-router';
import { Arrow } from './Icons';
import Split from './Split';

export default function NotFoundView() {
  return (
    <section className="flex min-h-svh flex-col justify-end px-5 pt-32 pb-16 sm:px-8">
      <p className="mb-6 text-xs tracking-[0.2em] text-ash uppercase">Erreur 404</p>
      <h1 className="font-display text-[22vw] leading-[0.82] uppercase">
        <Split text="Toile" />
        <br />
        <span className="text-dim">
          <Split text="blanche" delay={120} />
        </span>
      </h1>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
        <p className="max-w-md font-serif text-2xl italic">Cette page n'a jamais été peinte. Ou alors, elle a été déplacée.</p>
        <Link to="/" viewTransition className="group inline-flex items-center gap-4 rounded-full bg-bone px-7 py-4 text-xs tracking-[0.2em] text-night uppercase hover:bg-flame">
          Retour à l'accueil <Arrow className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
