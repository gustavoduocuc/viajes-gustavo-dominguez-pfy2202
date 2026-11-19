import { MockedProvider } from '@apollo/client/testing/react';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { storeTrip } from '../testing/tripFixtures';
import { mockDestinationsApi } from '../testing/mockDestinationsApi';
import { hotelsMock, offersMock } from '../testing/offersMocks';
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

function renderPublished(path, mocks = [offersMock('kioto')]) {
  mockDestinationsApi();
  const router = createMemoryRouter(routes, {
    basename: publishedBase,
    initialEntries: [`${publishedBase}${path}`],
  });
  render(
    <MockedProvider mocks={mocks}>
      <RouterProvider router={router} />
    </MockedProvider>
  );
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

test('a deep link under the base opens that destination', async () => {
  renderPublished('/destinos/kioto');

  expect(await screen.findByRole('heading', { level: 1, name: 'Kioto' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Destinos' })).toHaveAttribute('href', `${publishedBase}/destinos`);
});

test('a nested section under the base opens directly', async () => {
  renderPublished('/destinos/cusco/hoteles', [hotelsMock('cusco')]);

  expect(await screen.findByText('3 hoteles')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Hoteles' })).toHaveAttribute(
    'href',
    `${publishedBase}/destinos/cusco/hoteles`
  );
});

test('the trip screen opens directly under the base keeping the stored trip', async () => {
  storeTrip('cusco', { flightId: 'fl-cusco-01' });
  renderPublished('/mi-viaje');

  expect(await screen.findByRole('heading', { level: 1, name: 'Mi viaje' })).toBeInTheDocument();
  expect(screen.getByText('LATAM')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Cambiar vuelo' })).toHaveAttribute(
    'href',
    `${publishedBase}/destinos/cusco/vuelos`
  );
});
