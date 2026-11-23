import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import Logo from './Logo';
import { site } from '../data/site';

const links = [
  { to: '/tableaux', label: 'Tableaux' },
  { to: '/bio', label: 'Bio' },
  { to: '/contact', label: 'Contact' },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `relative py-1 transition-colors hover:text-ink after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-current after:transition-transform ${
    isActive ? 'text-ink after:scale-x-100' : 'text-muted after:scale-x-0 hover:after:scale-x-100'
  }`;

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo />

        <nav aria-label="Navigation principale" className="hidden items-center gap-8 text-sm md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
          {site.shop && (
            <a
              href={site.shop}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-ink px-4 py-2 text-paper transition-colors hover:bg-accent"
            >
              Boutique
            </a>
          )}
        </nav>

        <button
          type="button"
          className="-mr-2 grid size-10 place-items-center md:hidden"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="relative block h-3 w-6">
            <span
              className={`absolute left-0 h-px w-6 bg-ink transition-transform duration-300 ${open ? 'top-1.5 rotate-45' : 'top-0'}`}
            />
            <span
              className={`absolute left-0 h-px w-6 bg-ink transition-transform duration-300 ${open ? 'top-1.5 -rotate-45' : 'top-3'}`}
            />
          </span>
        </button>
      </div>
    </header>

      {/* Hors du <header> : son backdrop-blur casserait le position: fixed */}
      <div
        id="menu-mobile"
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 z-40 bg-paper md:hidden"
      >
        <nav aria-label="Navigation mobile" className="flex h-full flex-col justify-between px-5 pt-10 pb-12">
          <ul className="space-y-2">
            {links.map((l, i) => (
              <li key={l.to} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    `font-display text-5xl ${isActive ? 'text-accent italic' : 'text-ink'}`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="flex gap-6 text-sm text-muted">
            {site.shop && (
              <a href={site.shop} target="_blank" rel="noopener noreferrer">
                Boutique
              </a>
            )}
            <a href={site.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href={`mailto:${site.email}`}>E-mail</a>
          </div>
        </nav>
      </div>
    </>
  );
}
