import type { CSSProperties } from 'react';
import { artworks } from '../data/artworks';

const columns = [
  { offset: 0, speed: '70s', dir: 'normal' },
  { offset: 2, speed: '55s', dir: 'reverse' },
  { offset: 4, speed: '80s', dir: 'normal' },
  { offset: 1, speed: '62s', dir: 'reverse' },
];

/** Mur de tableaux incliné qui défile en continu derrière le titre. */
export default function HeroWall() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div className="absolute -inset-x-[25%] -inset-y-1/2 grid rotate-[-12deg] grid-cols-3 gap-3 sm:gap-5 md:grid-cols-4">
        {columns.map((c, ci) => {
          const list = [...artworks.slice(c.offset), ...artworks.slice(0, c.offset)];
          return (
            <div key={ci} className={ci === 3 ? 'hidden md:block' : ''}>
              <div className="animate-column" style={{ '--speed': c.speed, '--dir': c.dir } as CSSProperties}>
                {[...list, ...list].map((a, i) => (
                  <img
                    key={i}
                    src={a.images[0].small}
                    alt=""
                    loading={i < 3 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="mb-3 w-full sm:mb-5"
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="absolute inset-0 bg-night/60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--color-night)_85%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-night to-transparent" />
    </div>
  );
}
