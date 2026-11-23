import { useState } from 'react';
import Split from '../components/Split';
import { Arrow } from '../components/Icons';
import { site } from '../data/site';
import { seo } from '../lib/meta';

export const meta = () =>
  seo({ title: 'Contact', path: '/contact', description: `Une commande, un tableau, une idée ? Contactez ${site.artist}.` });

const handle = '@' + site.instagram.split('/').filter(Boolean).pop();

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      location.href = `mailto:${site.email}`;
    }
  };

  const rows = [
    { label: 'Instagram', value: handle, href: site.instagram },
    ...(site.shop ? [{ label: 'Boutique', value: 'Acheter en ligne', href: site.shop }] : []),
  ];

  return (
    <section className="px-5 pt-32 pb-32 sm:px-8 sm:pt-40">
      <p className="mb-6 text-xs tracking-[0.2em] text-ash uppercase">(Contact)</p>
      <h1 className="font-display text-[24vw] leading-[0.8] uppercase lg:text-[19vw]">
        <Split text="Parlons" step={0} />
        <span className="text-flame">
          <Split text="-en." delay={120} />
        </span>
      </h1>

      <div className="mt-16 grid gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="animate-rise font-serif text-3xl leading-tight" style={{ animationDelay: '300ms' }}>
            Une question sur un tableau, une commande, ou une idée de sujet que vous aimeriez voir peint&nbsp;? Je serai ravi de vous répondre.
          </p>
          <ul className="mt-8 flex animate-rise flex-wrap gap-2 text-[0.7rem] tracking-[0.2em] text-ash uppercase" style={{ animationDelay: '400ms' }}>
            {['Commande', 'Achat', 'Suggestion', 'Exposition'].map((t) => (
              <li key={t} className="rounded-full border border-line px-4 py-2">{t}</li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-7">
          <div data-reveal className="border-t border-line pt-6">
            <p className="text-xs tracking-[0.2em] text-ash uppercase">E-mail</p>
            <a href={`mailto:${site.email}`} className="group mt-3 block font-display text-[9vw] leading-none break-all uppercase transition-colors hover:text-flame md:text-[5.5vw]">
              {site.email}
            </a>
            <button
              type="button"
              onClick={copy}
              className="mt-6 inline-flex items-center gap-3 rounded-full border border-bone/30 px-6 py-3 text-xs tracking-[0.2em] uppercase transition-colors hover:border-flame hover:text-flame"
            >
              <span aria-live="polite">{copied ? 'Adresse copiée ✓' : 'Copier l’adresse'}</span>
            </button>
          </div>

          <ul className="mt-16">
            {rows.map((r) => (
              <li key={r.label} data-reveal>
                <a href={r.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-6 border-t border-line py-8 last:border-b">
                  <span>
                    <span className="block text-xs tracking-[0.2em] text-ash uppercase">{r.label}</span>
                    <span className="mt-2 block font-display text-5xl uppercase transition-colors group-hover:text-flame sm:text-6xl">{r.value}</span>
                  </span>
                  <Arrow dir="up-right" className="size-8 shrink-0 transition-transform duration-500 group-hover:rotate-45 group-hover:text-flame" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
