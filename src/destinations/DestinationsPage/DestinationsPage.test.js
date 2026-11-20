import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { jsonResponse } from '../../testing/mockFetch';
import { mockDestinationsApi, neverResolves } from '../../testing/mockDestinationsApi';
import { renderAt } from '../../testing/renderAt';

test('the listing shows every destination with unfiltered selects', async () => {
  mockDestinationsApi();
  renderAt('/destinos');

  expect(await screen.findByText('8 destinos')).toBeInTheDocument();
  expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(8);
  expect(screen.getByLabelText('Región')).toHaveValue('Todas');
  expect(screen.getByLabelText('País')).toHaveValue('Todas');
});

test('the listing shows a loading message first', () => {
  mockDestinationsApi({ '/api/destinations': neverResolves });
  renderAt('/destinos');

  expect(within(screen.getByRole('main')).getByRole('status')).toHaveTextContent('Cargando destinos…');
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
});

test('filtering by region keeps only that region and updates the count', async () => {
  mockDestinationsApi();
  renderAt('/destinos');
  await screen.findByText('8 destinos');

  userEvent.selectOptions(screen.getByLabelText('Región'), 'Europa');

  expect(screen.getByText('2 destinos')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Roma' })).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'Cusco' })).not.toBeInTheDocument();
});

test('filters with no match show an empty message that can be cleared', async () => {
  mockDestinationsApi();
  renderAt('/destinos');
  await screen.findByText('8 destinos');

  userEvent.selectOptions(screen.getByLabelText('Región'), 'Europa');
  userEvent.selectOptions(screen.getByLabelText('País'), 'Perú');

  expect(screen.getByText('No hay destinos para esta combinación de filtros.')).toBeInTheDocument();
  userEvent.click(screen.getByRole('button', { name: 'Limpiar filtros' }));

  expect(await screen.findByText('8 destinos')).toBeInTheDocument();
});

test('an empty api list shows the empty state', async () => {
  mockDestinationsApi({ '/api/destinations': () => jsonResponse(200, []) });
  renderAt('/destinos');

  expect(await screen.findByText('No hay destinos disponibles.')).toBeInTheDocument();
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});

test('a failing api shows an alert with a way back', async () => {
  mockDestinationsApi({ '/api/destinations': () => jsonResponse(500, { message: 'Error simulado del servidor.' }) });
  renderAt('/destinos');

  const alert = await screen.findByRole('alert');
  expect(alert).toHaveTextContent('Error simulado del servidor.');
  expect(within(alert).getByRole('link', { name: 'Volver a Inicio' })).toHaveAttribute('href', '/');
});
