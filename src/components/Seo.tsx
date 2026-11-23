import { site } from '../data/site';

/** React 19 remonte automatiquement <title>/<meta> dans le <head>. */
export default function Seo({ title, description }: { title?: string; description?: string }) {
  const full = title ? `${title} — ${site.artist}` : `${site.artist} — ${site.tagline}`;
  return (
    <>
      <title>{full}</title>
      {description && <meta name="description" content={description} />}
    </>
  );
}
