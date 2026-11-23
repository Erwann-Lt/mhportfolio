import { useEffect, useState, type CSSProperties } from 'react';
import ArtworkIndex from '../components/ArtworkIndex';
import ArtworkTile from '../components/ArtworkTile';
import Split from '../components/Split';
import { artworks } from '../data/artworks';
import { seo } from '../lib/meta';

export const meta = () =>
  seo({ title: 'Tableaux', path: '/tableaux', description: 'Toutes les œuvres de Mickaël H. : Joker, Mario, Batman, Brigitte Bardot, Link, Serge Gainsbourg…' });

type View = 'mur' | 'index';

export default function Tableaux() {
  const [view, setView] = useState<View>('mur');

  useEffect(() => {
    try {
      const v = localStorage.getItem('vue-tableaux');
      if (v === 'mur' || v === 'index') setView(v);
    } catch {}
  }, []);
  const choose = (v: View) => {
    setView(v);
    try {
      localStorage.setItem('vue-tableaux', v);
    } catch {}
  };

  return (
    <div className="px-5 pt-32 pb-32 sm:px-8 sm:pt-40">
      <div className="mb-14 flex flex-wrap items-end justify-between gap-8 sm:mb-20">
        <h1 className="font-display text-[22vw] leading-[0.8] uppercase sm:text-[17vw]">
          <Split text="Tableaux" step={0} />
          <sup className="ml-2 align-top font-serif text-[0.18em] text-flame italic normal-case">({String(artworks.length).padStart(2, '0')})</sup>
        </h1>
        <div role="group" aria-label="Affichage" className="flex rounded-full border border-line p-1 text-xs tracking-[0.2em] uppercase">
          {(['mur', 'index'] as const).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => choose(v)}
              className={`rounded-full px-5 py-2.5 transition-colors ${view === v ? 'bg-bone text-night' : 'text-ash hover:text-bone'}`}
            >
              {v === 'mur' ? 'Mur' : 'Index'}
            </button>
          ))}
        </div>
      </div>

      {view === 'mur' ? (
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 lg:gap-8">
          {artworks.map((a, i) => (
            <div key={a.slug} data-reveal className="mb-14 break-inside-avoid" style={{ '--delay': `${(i % 3) * 90}ms` } as CSSProperties}>
              <ArtworkTile artwork={a} eager={i < 3} />
            </div>
          ))}
        </div>
      ) : (
        <ArtworkIndex items={artworks} />
      )}
    </div>
  );
}
