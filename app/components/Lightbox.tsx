import { useEffect, useRef } from 'react';
import type { ArtworkImage } from '../data/artworks';
import { Arrow, Close } from './Icons';

export default function Lightbox({
  images,
  index,
  onIndex,
  onClose,
}: {
  images: ArtworkImage[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const many = images.length > 1;
  const go = (d: number) => onIndex((index + d + images.length) % images.length);

  useEffect(() => {
    ref.current!.showModal();
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (!many) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  });

  const img = images[index];
  const btn = 'grid size-12 place-items-center rounded-full border border-bone/25 text-bone transition-colors hover:border-flame hover:bg-flame hover:text-night';

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      aria-label="Plein écran"
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-night/97 p-0 text-bone backdrop:bg-transparent"
    >
      <div className="pointer-events-none flex h-full items-center justify-center p-4 sm:p-14">
        <img key={img.src} src={img.src} alt={img.alt} className="pointer-events-auto max-h-full max-w-full animate-rise object-contain" />
      </div>
      <button type="button" onClick={onClose} aria-label="Fermer" className={`${btn} absolute top-5 right-5`}>
        <Close className="size-5" />
      </button>
      {many && (
        <>
          <button type="button" onClick={() => go(-1)} aria-label="Image précédente" className={`${btn} absolute top-1/2 left-5 -translate-y-1/2`}>
            <Arrow dir="left" className="size-5" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Image suivante" className={`${btn} absolute top-1/2 right-5 -translate-y-1/2`}>
            <Arrow className="size-5" />
          </button>
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-serif text-lg italic tabular-nums">
            {index + 1} / {images.length}
          </p>
        </>
      )}
    </dialog>
  );
}
