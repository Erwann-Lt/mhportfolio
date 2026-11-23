export default function PageTitle({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <header className="animate-fade-up pt-14 pb-12 sm:pt-20 sm:pb-16">
      {eyebrow && <p className="mb-4 text-xs tracking-[0.25em] text-muted uppercase">{eyebrow}</p>}
      <h1 className="font-display text-6xl font-light tracking-tight sm:text-8xl">{title}</h1>
    </header>
  );
}
