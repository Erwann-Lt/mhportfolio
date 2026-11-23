import NotFoundView from '../components/NotFoundView';
import { seo } from '../lib/meta';

export const meta = () => [...seo({ title: 'Page introuvable', path: '/404' }), { name: 'robots', content: 'noindex' }];

export default NotFoundView;
