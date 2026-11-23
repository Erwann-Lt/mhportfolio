import { site } from '../data/site';
import { InstagramIcon } from './Icons';

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {site.artist} — {site.tagline}, {site.location}
        </p>
        <div className="flex items-center gap-5">
          <a href={`mailto:${site.email}`} className="hover:text-ink">
            {site.email}
          </a>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-ink"
          >
            <InstagramIcon className="size-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
