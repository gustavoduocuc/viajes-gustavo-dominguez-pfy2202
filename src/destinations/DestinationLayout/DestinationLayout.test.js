import { screen } from '@testing-library/react';
import { mockDestinationsApi, neverResolves } from '../../testing/mockDestinationsApi';
import { offersMock } from '../../testing/offersMocks';
import { renderAt } from '../../testing/renderAt';

function expectOneMainHeading() {
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
}

test('an existing destination shows name, country, description and activities', async () => {
  mockDestinationsApi();
  renderAt('/destinos/kioto', { mocks: [offersMock('kioto')] });

  expect(await screen.findByRole('heading', { level: 1, name: 'Kioto' })).toBeInTheDocument();
  expect(screen.getByText('Japón')).toBeInTheDocument();
  expect(screen.getByText(/Antigua capital imperial/)).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: 'Actividades populares' })).toBeInTheDocument();
  expect(screen.getByText('Ceremonia del té')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Volver a Destinos' })).toHaveAttribute('href', '/destinos');
  expectOneMainHeading();
});

test('the detail shows a loading state with a single main heading', () => {
  mockDestinationsApi({ '/api/destinations/kioto': neverResolves });
  renderAt('/destinos/kioto');

  expect(screen.getByRole('status')).toHaveTextContent('Cargando destino…');
  expectOneMainHeading();
});

test('an unknown destination shows a friendly not found message in the shell', async () => {
  mockDestinationsApi();
  renderAt('/destinos/no-existe');

  expect(await screen.findByRole('heading', { level: 1, name: 'Destino no encontrado' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Volver a Destinos' })).toHaveAttribute('href', '/destinos');
  expect(screen.getByRole('navigation', { name: 'Secciones' })).toBeInTheDocument();
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  expectOneMainHeading();
});

test('a server error shows an alert with a way back', async () => {
  mockDestinationsApi();
  renderAt('/destinos/error-500');

  expect(await screen.findByRole('alert')).toHaveTextContent('Error simulado del servidor.');
  expect(screen.getByRole('link', { name: 'Volver a Destinos' })).toBeInTheDocument();
  expectOneMainHeading();
});
