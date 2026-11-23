import { Link } from 'react-router';
import Seo from '../components/Seo';

export default function NotFound() {
  return (
    <>
      <Seo title="Page introuvable" />
      <meta name="robots" content="noindex" />
      <div className="mx-auto flex max-w-7xl flex-col items-start px-5 py-32 sm:px-8">
        <p className="text-xs tracking-[0.25em] text-muted uppercase">Erreur 404</p>
        <h1 className="mt-4 font-display text-6xl font-light sm:text-8xl">
          Toile <em className="text-accent">blanche</em>.
        </h1>
        <p className="mt-6 max-w-md text-lg text-muted">Cette page n'existe pas ou a été déplacée.</p>
        <Link to="/" className="mt-10 rounded-full bg-ink px-6 py-3.5 text-sm text-paper hover:bg-accent">
          Retour à l'accueil
        </Link>
      </div>
    </>
  );
}
