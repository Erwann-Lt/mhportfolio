import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import type { Route } from './+types/root';
import '@fontsource/anton/latin.css';
import '@fontsource/instrument-serif/latin-400.css';
import '@fontsource/instrument-serif/latin-400-italic.css';
import '@fontsource-variable/inter/wght.css';
import './app.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import RevealObserver from './components/Reveal';
import NotFoundView from './components/NotFoundView';

export const links: Route.LinksFunction = () => [{ rel: 'icon', href: '/favicon.png' }];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0c0b0a" />
        {/* Active les animations d'apparition uniquement si JavaScript tourne */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <Meta />
        <Links />
      </head>
      <body className="grain">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:bg-flame focus:px-4 focus:py-2 focus:text-night"
        >
          Aller au contenu
        </a>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main id="contenu">
        <Outlet />
      </main>
      <Footer />
      <Cursor />
      <RevealObserver />
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error) && error.status === 404) return <NotFoundView />;
  return (
    <main className="grid min-h-svh place-items-center px-5 text-center">
      <div>
        <h1 className="font-display text-6xl uppercase">Oups</h1>
        <p className="mt-4 text-ash">Une erreur inattendue est survenue.</p>
        <a href="/" className="mt-8 inline-block underline underline-offset-8">Retour à l'accueil</a>
      </div>
    </main>
  );
}
