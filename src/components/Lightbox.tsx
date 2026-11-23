import { useEffect, useRef } from 'react';
import type { ArtworkImage } from '../data/artworks';
import { ArrowIcon, CloseIcon } from './Icons';

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
    const dlg = ref.current!;
    dlg.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (!many) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const img = images[index];
  const btn =
    'grid size-12 place-items-center rounded-full bg-paper/10 text-paper backdrop-blur transition-colors hover:bg-paper/25';

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      aria-label="Agrandissement de l'image"
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-ink/95 p-0 backdrop:bg-transparent"
    >
      <div className="pointer-events-none flex h-full items-center justify-center p-4 sm:p-12">
        <img
          src={img.src}
          alt={img.alt}
          className="pointer-events-auto max-h-full max-w-full object-contain shadow-2xl"
        />
      </div>
      <button type="button" onClick={onClose} aria-label="Fermer" className={`${btn} absolute top-4 right-4`}>
        <CloseIcon className="size-5" />
      </button>
      {many && (
        <>
          <button type="button" onClick={() => go(-1)} aria-label="Image précédente" className={`${btn} absolute top-1/2 left-4 -translate-y-1/2`}>
            <ArrowIcon dir="left" className="size-5" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Image suivante" className={`${btn} absolute top-1/2 right-4 -translate-y-1/2`}>
            <ArrowIcon className="size-5" />
          </button>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm text-paper/70 tabular-nums">
            {index + 1} / {images.length}
          </p>
        </>
      )}
    </dialog>
  );
}
