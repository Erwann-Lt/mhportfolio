import Seo from '../components/Seo';
import ArtworkCard from '../components/ArtworkCard';
import PageTitle from '../components/PageTitle';
import { artworks } from '../data/artworks';

export default function Gallery() {
  return (
    <>
      <Seo title="Tableaux" description="Galerie des tableaux de Mickaël H. : portraits et figures de la pop culture." />
      <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <PageTitle eyebrow={`${artworks.length} œuvres`} title="Tableaux" />
        <div className="columns-1 gap-8 sm:columns-2 lg:columns-3">
          {artworks.map((a, i) => (
            <div
              key={a.slug}
              className="mb-14 animate-fade-up break-inside-avoid"
              style={{ animationDelay: `${Math.min(i, 6) * 70}ms` }}
            >
              <ArtworkCard artwork={a} eager={i < 3} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
