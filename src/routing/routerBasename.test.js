import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { routes } from './routes';
import { getRouterBasename } from './routerBasename';

const publishedBase = '/viajes-gustavo-dominguez-pfy2202';

test('an empty public url keeps the app at the root', () => {
  expect(getRouterBasename('')).toBe('/');
  expect(getRouterBasename(undefined)).toBe('/');
});

test('a public url becomes the router base without a trailing slash', () => {
  expect(getRouterBasename(publishedBase)).toBe(publishedBase);
  expect(getRouterBasename(`${publishedBase}/`)).toBe(publishedBase);
});

function renderPublished(path) {
  const router = createMemoryRouter(routes, {
    basename: publishedBase,
    initialEntries: [`${publishedBase}${path}`],
  });
  render(<RouterProvider router={router} />);
}

test('the root address under the base opens home', async () => {
  renderPublished('/');

  expect(
    await screen.findByRole('heading', { level: 1, name: 'Agencia de viajes' })
  ).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Inicio' })).toHaveAttribute(
    'aria-current',
    'page'
  );
});

test('an unknown address under the base shows the app notice', async () => {
  renderPublished('/no-existe');

  expect(
    await screen.findByRole('heading', { level: 1, name: 'Página no encontrada' })
  ).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Volver a Inicio' })).toHaveAttribute(
    'href',
    publishedBase
  );
});
