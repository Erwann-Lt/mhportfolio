type P = { className?: string };
const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, 'aria-hidden': true } as const;

export function Arrow({ className, dir = 'right' }: P & { dir?: 'right' | 'left' | 'up' | 'down' | 'up-right' }) {
  const rot = { right: '', left: 'rotate-180', up: '-rotate-90', down: 'rotate-90', 'up-right': '-rotate-45' }[dir];
  return (
    <svg viewBox="0 0 24 24" {...base} className={`${className ?? ''} ${rot}`}>
      <path d="M3 12h18M14 5l7 7-7 7" strokeLinecap="square" />
    </svg>
  );
}

export function Close({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" {...base} className={className}>
      <path d="M5 5l14 14M19 5L5 19" strokeLinecap="square" />
    </svg>
  );
}

export function Star({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 0c.6 6.4 5 11 12 12-7 1-11.4 5.6-12 12-.6-6.4-5-11-12-12 7-1 11.4-5.6 12-12z" />
    </svg>
  );
}
