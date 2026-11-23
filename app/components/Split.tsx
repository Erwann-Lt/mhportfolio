import type { CSSProperties } from 'react';

/** Texte dont chaque ligne/mot monte depuis un masque au chargement. */
export default function Split({ text, delay = 0, step = 60, className = '' }: { text: string; delay?: number; step?: number; className?: string }) {
  return (
    <span className={`split ${className}`}>
      <span className="sr-only">{text}</span>
      {text.split(' ').map((w, i, arr) => (
        <span key={i} aria-hidden>
          <span style={{ '--delay': `${delay + i * step}ms` } as CSSProperties}>{w}</span>
          {i < arr.length - 1 && ' '}
        </span>
      ))}
    </span>
  );
}
