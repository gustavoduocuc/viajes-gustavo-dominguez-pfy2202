import { screen, within } from '@testing-library/react';
import { jsonResponse } from '../../testing/mockFetch';
import { mockDestinationsApi, neverResolves } from '../../testing/mockDestinationsApi';
import { renderAt } from '../../testing/renderAt';

test('home shows three featured destinations and the explore link', async () => {
  mockDestinationsApi();
  renderAt('/');

  expect(screen.getByRole('heading', { level: 1, name: 'Agencia de viajes' })).toBeInTheDocument();
  const featured = await screen.findByRole('heading', { level: 3, name: 'Cusco' });
  expect(featured).toBeInTheDocument();
  expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(3);
  expect(screen.getByRole('link', { name: 'Cusco' })).toHaveAttribute('href', '/destinos/cusco');
  expect(screen.getByRole('link', { name: 'Explorar destinos' })).toHaveAttribute('href', '/destinos');
});

test('home shows a loading message while waiting', () => {
  mockDestinationsApi({ '/api/destinations': neverResolves });
  renderAt('/');

  expect(within(screen.getByRole('main')).getByRole('status')).toHaveTextContent('Cargando destinos destacados…');
});

test('home keeps its title and link when the api fails', async () => {
  mockDestinationsApi({ '/api/destinations': () => jsonResponse(500, { message: 'Error simulado del servidor.' }) });
  renderAt('/');

  expect(await screen.findByRole('alert')).toHaveTextContent('Error simulado del servidor.');
  expect(screen.getByRole('heading', { level: 1, name: 'Agencia de viajes' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Explorar destinos' })).toBeInTheDocument();
});

test('home tells there are no featured destinations when the list is empty', async () => {
  mockDestinationsApi({ '/api/destinations': () => jsonResponse(200, []) });
  renderAt('/');

  const main = screen.getByRole('main');
  expect(await within(main).findByText('Aún no hay destinos destacados.')).toBeInTheDocument();
});
