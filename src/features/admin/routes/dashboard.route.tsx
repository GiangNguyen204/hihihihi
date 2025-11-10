import { adminRoute } from '@routes/admin.routes';
import { createRoute } from '@tanstack/react-router';
import OverviewDashboard from '../pages/dashboard/Overview/Overview';
import StatisticalDashboard from '../pages/dashboard/Statistical/Statistical';
import ReportsDashboard from '../pages/dashboard/Report/Report';
const dashboardRouteAdmin = createRoute({
  getParentRoute: () => adminRoute,
  path: '/dashboard',
});

// Child routes
const overviewRouteAdmin = createRoute({
  getParentRoute: () => dashboardRouteAdmin,
  path: '/overview',
  component: OverviewDashboard,
});
const statisticalRouteAdmin = createRoute({
  getParentRoute: () => dashboardRouteAdmin,
  path: '/statistical',
  component: StatisticalDashboard,
});
const reportsRouteAdmin = createRoute({
  getParentRoute: () => dashboardRouteAdmin,
  path: '/reports',
  component: ReportsDashboard,
});
const dashboardTree = dashboardRouteAdmin.addChildren([
  overviewRouteAdmin,
  statisticalRouteAdmin,
  reportsRouteAdmin,
]);

export {
  dashboardRouteAdmin,
  dashboardTree,
  overviewRouteAdmin,
  statisticalRouteAdmin,
  reportsRouteAdmin,
};
