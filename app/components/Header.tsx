import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { artworks } from '../data/artworks';
import { site } from '../data/site';
import { Arrow, Close } from './Icons';

const links = [
  { to: '/tableaux', label: 'Tableaux', count: artworks.length },
  { to: '/bio', label: 'Bio' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 text-bone mix-blend-difference">
        <div className="flex items-start justify-between px-5 py-5 sm:px-8 sm:py-6">
          <Link to="/" viewTransition className="font-display text-2xl leading-none uppercase sm:text-3xl" aria-label="Mickaël H., accueil">
            Mickaël H.
          </Link>

          <nav aria-label="Navigation principale" className="hidden items-start gap-10 text-xs tracking-[0.2em] uppercase md:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                viewTransition
                className="group relative flex items-start gap-1 py-1"
              >
                {({ isActive }) => (
                  <>
                    <span className={`absolute inset-x-0 bottom-0 h-px origin-left bg-current transition-transform duration-500 ease-out-expo ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                    {l.label}
                    {l.count && <sup className="text-[0.6rem]">({String(l.count).padStart(2, '0')})</sup>}
                  </>
                )}
              </NavLink>
            ))}
            {site.shop && (
              <a href={site.shop} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 py-1">
                Boutique <Arrow dir="up-right" className="size-3" />
              </a>
            )}
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="menu"
            className="-mt-1 -mr-2 px-2 py-2 text-xs tracking-[0.2em] uppercase md:hidden"
          >
            Menu
          </button>
        </div>
      </header>

      {open && (
        <div id="menu" role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-[55] flex flex-col bg-night px-5 pt-5 pb-8 md:hidden">
          <div className="flex items-start justify-between">
            <Link to="/" className="font-display text-2xl leading-none uppercase">Mickaël H.</Link>
            <button type="button" onClick={() => setOpen(false)} aria-label="Fermer le menu" className="-mt-2 -mr-2 p-2" autoFocus>
              <Close className="size-6" />
            </button>
          </div>
          <nav aria-label="Navigation mobile" className="mt-auto">
            <ul>
              {[{ to: '/', label: 'Accueil' }, ...links].map((l, i) => (
                <li key={l.to} className="overflow-hidden border-b border-line">
                    <Link to={l.to} className="flex animate-rise items-baseline justify-between py-2" style={{ animationDelay: `${80 + i * 70}ms` }}>
                      <span className={`font-display text-[17vw] leading-[0.95] uppercase ${pathname === l.to ? 'text-flame' : ''}`}>{l.label}</span>
                      <span className="font-serif text-xl text-ash italic">0{i + 1}</span>
                    </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-xs tracking-[0.2em] text-ash uppercase">
            <a href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={`mailto:${site.email}`}>E-mail</a>
            {site.shop && <a href={site.shop} target="_blank" rel="noopener noreferrer">Boutique</a>}
          </div>
        </div>
      )}
    </>
  );
}
