import { useEffect, useRef, useState } from 'react';

/**
 * Bulle qui suit la souris au survol des éléments [data-cursor="Libellé"].
 * Uniquement sur les appareils à pointeur précis (souris / trackpad).
 */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!matchMedia('(pointer: fine)').matches) return;
    const el = ref.current!;
    let x = -100, y = -100, cx = x, cy = y, raf = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = (e.target as Element | null)?.closest?.('[data-cursor]');
      setLabel(target?.getAttribute('data-cursor') || null);
    };
    const loop = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const onLeave = () => setLabel(null);
    addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed top-0 left-0 z-[70] hidden pointer-fine:block">
      <div
        className={`grid size-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-flame text-[0.65rem] font-medium tracking-[0.2em] text-night uppercase transition-[scale,opacity] duration-500 ease-out-expo ${label ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
      >
        {label}
      </div>
    </div>
  );
}
