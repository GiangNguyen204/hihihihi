import { mainRoute } from '@routes/main.routes';
import { createRoute } from '@tanstack/react-router';
import { homeRoute } from './home.route';
import { rootRoutes } from '@routes/routes';
import ContactPage from '../pages/Contact';

const contactRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: '/lien-he',
  component: ContactPage,
});

export default contactRoute;
