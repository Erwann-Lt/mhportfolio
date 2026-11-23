import type { CSSProperties, ReactNode } from 'react';

export default function Marquee({ items, speed = '40s', className = '' }: { items: ReactNode[]; speed?: string; className?: string }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((it, i) => (
        <li key={i} className="flex shrink-0 items-center">{it}</li>
      ))}
    </ul>
  );
  return (
    <div className={`flex overflow-hidden ${className}`}>
      <div className="flex animate-marquee" style={{ '--speed': speed } as CSSProperties}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
