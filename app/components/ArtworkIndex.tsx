import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link, useViewTransitionState } from 'react-router';
import type { Artwork } from '../data/artworks';
import { Arrow } from './Icons';

/**
 * Liste typographique des œuvres. Au survol (souris), l'œuvre flotte sous le curseur.
 */
export default function ArtworkIndex({ items }: { items: Artwork[] }) {
  const listRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (!matchMedia('(pointer: fine)').matches) return;
    const list = listRef.current!;
    const fl = floatRef.current!;
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const onMove = (e: PointerEvent) => {
      const r = list.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
    };
    const loop = () => {
      const dx = (tx - x) * 0.12;
      x += dx;
      y += (ty - y) * 0.12;
      const rot = Math.max(-12, Math.min(12, dx * 0.4));
      fl.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${rot}deg)`;
      raf = requestAnimationFrame(loop);
    };
    list.addEventListener('pointermove', onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      list.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={listRef} className="group/list relative" onPointerLeave={() => setActive(null)}>
      <ul className="border-b border-line">
        {items.map((a, i) => (
          <li key={a.slug} data-reveal style={{ '--delay': `${i * 60}ms` } as CSSProperties}>
            <Link
              to={`/tableaux/${a.slug}`}
              viewTransition
              data-cursor="Voir"
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className={`grid grid-cols-[auto_1fr_auto] items-center gap-4 border-t border-line py-4 transition-opacity duration-500 sm:gap-8 sm:py-5 pointer-fine:cursor-none ${active !== null && active !== i ? 'pointer-fine:opacity-25' : ''}`}
            >
              <span className="w-8 font-serif text-lg text-ash italic sm:w-12 sm:text-2xl">{a.n}</span>
              <span className="flex min-w-0 items-center gap-4">
                <img src={a.images[0].small} alt="" loading="lazy" className="size-14 shrink-0 object-cover pointer-fine:hidden" />
                <span
                  className={`truncate font-display text-4xl leading-none uppercase transition-transform duration-700 ease-out-expo sm:text-7xl lg:text-8xl ${active === i ? 'pointer-fine:translate-x-6' : ''}`}
                >
                  {a.title}
                </span>
              </span>
              <span className="flex items-center gap-6 text-right text-xs tracking-[0.2em] text-ash uppercase">
                <span className="hidden sm:inline">{a.dimensions ?? ''}</span>
                <span className="hidden tabular-nums sm:inline">{a.year}</span>
                <Arrow dir="up-right" className="size-5 text-bone sm:size-6" />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div
        ref={floatRef}
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 z-10 hidden w-[19vw] max-w-72 pointer-fine:block"
      >
        <div className={`relative aspect-[4/5] transition-[scale,opacity] duration-500 ease-out-expo ${active === null ? 'scale-50 opacity-0' : 'scale-100 opacity-100'}`}>
          {items.map((a, i) => (
            <FloatImg key={a.slug} artwork={a} shown={active === i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FloatImg({ artwork, shown }: { artwork: Artwork; shown: boolean }) {
  const morph = useViewTransitionState(`/tableaux/${artwork.slug}`);
  return (
    <img
      src={artwork.images[0].small}
      alt=""
      className={`absolute inset-0 size-full object-cover shadow-2xl shadow-black/60 transition-opacity duration-300 ${shown ? 'opacity-100' : 'opacity-0'}`}
      style={{ viewTransitionName: morph && shown ? 'artwork' : undefined }}
    />
  );
}
