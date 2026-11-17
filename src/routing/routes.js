import { createBrowserRouter } from 'react-router';
import { DestinationLayout } from '../destinations/DestinationLayout/DestinationLayout';
import { DestinationOverview } from '../destinations/DestinationOverview/DestinationOverview';
import { DestinationsPage } from '../destinations/DestinationsPage/DestinationsPage';
import { HomePage } from '../home/HomePage/HomePage';
import { AppShell } from '../shell/AppShell/AppShell';
import { NotFoundPage } from './NotFoundPage/NotFoundPage';
import { getRouterBasename } from './routerBasename';

function ShellHydrateFallback() {
  return null;
}

export const routes = [
  {
    path: '/',
    Component: AppShell,
    HydrateFallback: ShellHydrateFallback,
    children: [
      { index: true, Component: HomePage },
      { path: 'destinos', Component: DestinationsPage },
      {
        path: 'destinos/:slug',
        Component: DestinationLayout,
        children: [{ index: true, Component: DestinationOverview }],
      },
      { path: '*', Component: NotFoundPage },
    ],
  },
];

export const appRouter = createBrowserRouter(routes, {
  basename: getRouterBasename(process.env.PUBLIC_URL),
});
