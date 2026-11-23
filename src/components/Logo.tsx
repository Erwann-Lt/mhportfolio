import { Link } from 'react-router';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={`font-display text-2xl tracking-tight ${className}`} aria-label="Accueil">
      <span className="font-light">Mickaël</span> <span className="font-semibold">H.</span>
    </Link>
  );
}
