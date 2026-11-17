import { createBrowserRouter } from 'react-router';
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
      { path: '*', Component: NotFoundPage },
    ],
  },
];

export const appRouter = createBrowserRouter(routes, {
  basename: getRouterBasename(process.env.PUBLIC_URL),
});
