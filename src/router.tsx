import { createBrowserRouter, Navigate, useParams } from 'react-router';
import { legacyIds } from './data/artworks';
import Layout from './components/Layout';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Artwork from './pages/Artwork';
import Bio from './pages/Bio';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function LegacyArtwork() {
  const { id = '' } = useParams();
  const slug = legacyIds[id];
  return <Navigate to={slug ? `/tableaux/${slug}` : '/tableaux'} replace />;
}

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'tableaux', element: <Gallery /> },
      { path: 'tableaux/:slug', element: <Artwork /> },
      { path: 'bio', element: <Bio /> },
      { path: 'contact', element: <Contact /> },
      // Anciennes URLs du site
      { path: 'artworks-list', element: <Navigate to="/tableaux" replace /> },
      { path: 'artwork-info/:id', element: <LegacyArtwork /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
