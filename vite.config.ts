import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  define: {
    // Netlify fournit l'URL publique du site via la variable URL pendant le build.
    __SITE_URL__: JSON.stringify((process.env.URL ?? '').replace(/\/$/, '')),
  },
});
