import { mainRoute } from '@routes/main.routes';
import { createRoute } from '@tanstack/react-router';
import { homeRoute } from './home.route';
import ExecutiveBoard from '../pages/ExecutiveBoard';
import { rootRoutes } from '@routes/routes';

const executiveBoardRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: '/bch-chi-doan',
  component: ExecutiveBoard,
});

export default executiveBoardRoute;
