import { Link } from 'react-router';
import Split from '../components/Split';
import { Arrow } from '../components/Icons';
import { site } from '../data/site';
import { seo } from '../lib/meta';
import portrait from '../assets/bio.webp';

export const meta = () =>
  seo({ title: 'Bio', path: '/bio', description: `${site.artist}, né en ${site.born}, artiste peintre installé en ${site.location}.` });

const chapters = [
  { when: String(site.born), title: 'Naissance', text: 'Le début de l’histoire.' },
  {
    when: 'Région parisienne',
    title: 'Le gris',
    text: 'Une grande partie de ma vie au sein d’un quartier froid et gris. Pourtant, j’ai toujours été attiré par le dessin et la peinture.',
  },
  {
    when: site.location,
    title: 'La couleur',
    text: 'Ce n’est qu’en arrivant en Bretagne, bien plus tard, que j’ai enfin pu laisser libre cours à ma passion.',
  },
  {
    when: 'Aujourd’hui',
    title: 'Les icônes',
    text: 'Je peins les choses qui me sont chères. Et je suis tout à fait preneur de vos suggestions !',
  },
];

export default function Bio() {
  return (
    <>
      <section className="px-5 pt-32 pb-24 sm:px-8 sm:pt-40">
        <p className="mb-6 text-xs tracking-[0.2em] text-ash uppercase">(Bio)</p>
        <h1 className="font-display text-[15vw] leading-[0.82] uppercase lg:text-[12vw]">
          <Split text="Peindre ce" step={80} />
          <br />
          <Split text="qu’on aime." step={80} delay={160} className="text-flame" />
        </h1>

        <div className="mt-20 grid gap-12 md:grid-cols-12 md:gap-8">
          <figure data-reveal className="md:col-span-5">
            <img src={portrait} alt={`${site.artist} posant à côté d'un de ses tableaux, en extérieur`} className="w-full" />
            <figcaption className="mt-3 text-[0.7rem] tracking-[0.2em] text-ash uppercase">{site.artist} — {site.location}</figcaption>
          </figure>
          <div className="md:col-span-6 md:col-start-7">
            <p data-reveal className="font-serif text-4xl leading-[1.08] sm:text-5xl">
              « Car pour bien faire son travail, il faut d’abord <em className="text-flame">l’aimer</em>. »
            </p>
            <dl data-reveal className="mt-14 grid grid-cols-2 border-t border-line text-xs tracking-[0.2em] uppercase">
              <div className="border-r border-line py-6 pr-4">
                <dt className="text-ash">Naissance</dt>
                <dd className="mt-3 font-display text-5xl tracking-normal">{site.born}</dd>
              </div>
              <div className="py-6 pl-6">
                <dt className="text-ash">Atelier</dt>
                <dd className="mt-3 font-display text-5xl tracking-normal normal-case">{site.location}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="px-5 pb-32 sm:px-8">
        <ol className="border-b border-line">
          {chapters.map((c, i) => (
            <li key={c.when} data-reveal className="group grid gap-4 border-t border-line py-10 md:grid-cols-12 md:gap-8">
              <span className="font-serif text-xl text-ash italic md:col-span-1">0{i + 1}</span>
              <span className="text-xs tracking-[0.2em] text-ash uppercase md:col-span-3 md:pt-3">{c.when}</span>
              <h2 className="font-display text-6xl leading-none uppercase transition-colors duration-500 group-hover:text-flame sm:text-7xl md:col-span-4">{c.title}</h2>
              <p className="max-w-md font-serif text-2xl leading-snug text-bone/80 md:col-span-4">{c.text}</p>
            </li>
          ))}
        </ol>
        <Link
          to="/tableaux"
          viewTransition
          className="group mt-16 inline-flex items-center gap-4 rounded-full bg-bone px-8 py-5 text-xs tracking-[0.2em] text-night uppercase transition-colors hover:bg-flame"
        >
          Voir les tableaux <Arrow className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </section>
    </>
  );
}
