import { useRef, useState, type PointerEvent } from 'react';
import type { ArtworkImage } from '../data/artworks';

const SIZE = 240;
const ZOOM = 2.6;

/**
 * Image principale d'une œuvre, avec une loupe au survol pour voir
 * les coups de pinceau (souris uniquement). Un clic ouvre le plein écran.
 */
export default function Viewer({ image, onOpen, morph }: { image: ArtworkImage; onOpen: () => void; morph?: boolean }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [lens, setLens] = useState<{ x: number; y: number; w: number; h: number } | null>(null);

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const r = imgRef.current!.getBoundingClientRect();
    setLens({ x: e.clientX - r.left, y: e.clientY - r.top, w: r.width, h: r.height });
  };

  return (
    <button
      type="button"
      onClick={onOpen}
      onPointerMove={onMove}
      onPointerLeave={() => setLens(null)}
      aria-label="Voir en plein écran"
      className="relative block cursor-zoom-in overflow-hidden pointer-fine:cursor-none"
    >
      <img
        ref={imgRef}
        src={image.src}
        srcSet={image.srcSet}
        sizes="(min-width: 1024px) 55vw, 100vw"
        alt={image.alt}
        fetchPriority="high"
        style={{ viewTransitionName: morph ? 'artwork' : undefined }}
        className="block max-h-[82svh] w-auto shadow-[0_40px_120px_-20px_rgb(0_0_0/0.8)]"
      />
      {lens && (
        <span
          aria-hidden
          className="pointer-events-none absolute rounded-full border border-bone/50 shadow-2xl shadow-black/70"
          style={{
            width: SIZE,
            height: SIZE,
            left: lens.x - SIZE / 2,
            top: lens.y - SIZE / 2,
            backgroundImage: `url(${image.src})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: `${lens.w * ZOOM}px ${lens.h * ZOOM}px`,
            backgroundPosition: `${SIZE / 2 - lens.x * ZOOM}px ${SIZE / 2 - lens.y * ZOOM}px`,
          }}
        />
      )}
    </button>
  );
}
