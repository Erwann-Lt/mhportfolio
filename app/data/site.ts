/**
 * Informations générales — tout le site se met à jour à partir d'ici.
 */
export const site = {
  artist: 'Mickaël H.',
  tagline: 'Artiste peintre',
  location: 'Bretagne',
  born: 1985,
  // TODO: remplacer par la vraie adresse e-mail
  email: 'contact@contact.com',
  instagram: 'https://www.instagram.com/miguech1/',
  // TODO: URL de la boutique en ligne (null = lien masqué partout)
  shop: null as string | null,
  description:
    'Mickaël H., artiste peintre en Bretagne. Joker, Mario, Bardot, Gainsbourg… les icônes de la pop culture repeintes à la main.',
};

declare global {
  const __SITE_URL__: string;
}

/** URL publique du site (fournie par Netlify au build), sans slash final. */
export const SITE_URL: string = __SITE_URL__;
