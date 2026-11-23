import { useEffect, useRef, type CSSProperties } from 'react';

/** Phrase dont les mots s'allument un à un pendant le défilement. */
export default function Manifesto({ text, highlight = [] }: { text: string; highlight?: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(' ');

  useEffect(() => {
    const el = ref.current!;
    let raf = 0;
    const update = () => {
      raf = 0;
      const { top, height } = el.getBoundingClientRect();
      const vh = innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - top) / (vh * 0.4 + height)));
      el.style.setProperty('--p', p.toFixed(3));
    };
    const onScroll = () => (raf ||= requestAnimationFrame(update));
    update();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <p ref={ref} className="font-serif text-[2.6rem] leading-[1.02] sm:text-7xl lg:text-8xl">
      {words.map((w, i) => {
        const hl = highlight.some((h) => w.toLowerCase().includes(h));
        return (
          <span
            key={i}
            className={`transition-opacity duration-300 ${hl ? 'text-flame italic' : ''}`}
            style={{ opacity: `clamp(0.12, calc(var(--p) * ${words.length + 4} - ${i}), 1)` } as CSSProperties}
          >
            {w}{' '}
          </span>
        );
      })}
    </p>
  );
}
