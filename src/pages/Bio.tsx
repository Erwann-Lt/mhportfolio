import { Link } from 'react-router';
import Seo from '../components/Seo';
import PageTitle from '../components/PageTitle';
import { ArrowIcon } from '../components/Icons';
import { site } from '../data/site';
import bio from '../assets/bio.webp';

export default function Bio() {
  return (
    <>
      <Seo title="Bio" description={`${site.artist}, artiste peintre installé en ${site.location}.`} />
      <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <PageTitle eyebrow="L'artiste" title="Bio" />
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <figure className="animate-fade-up md:col-span-5">
            <img src={bio} alt={`${site.artist} devant l'un de ses tableaux`} className="w-full" />
          </figure>
          <div className="animate-fade-up md:col-span-7" style={{ animationDelay: '120ms' }}>
            <dl className="mb-10 grid grid-cols-2 border-y border-line py-5 text-sm">
              <div>
                <dt className="text-muted">Naissance</dt>
                <dd className="mt-1 font-display text-2xl">{site.born}</dd>
              </div>
              <div>
                <dt className="text-muted">Atelier</dt>
                <dd className="mt-1 font-display text-2xl">{site.location}</dd>
              </div>
            </dl>
            <div className="max-w-prose space-y-6 text-lg leading-relaxed">
              <p className="font-display text-2xl leading-snug font-light">
                J'ai vécu une grande partie de ma vie en région parisienne, au sein d'un quartier froid et gris.
              </p>
              <p>
                Pourtant, j'ai toujours été attiré par le dessin et la peinture. Ce n'est qu'en arrivant en Bretagne,
                bien plus tard, que j'ai enfin pu laisser libre cours à ma passion.
              </p>
              <p>
                J'aime dessiner ou peindre des choses qui me sont chères — car pour bien faire son travail, il faut
                d'abord l'aimer. Je suis d'ailleurs tout à fait preneur de vos suggestions&nbsp;!
              </p>
            </div>
            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                to="/tableaux"
                className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-sm text-paper hover:bg-accent"
              >
                Voir les tableaux
                <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center rounded-full border border-ink/20 px-6 py-3.5 text-sm hover:border-ink"
              >
                Me proposer une idée
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
