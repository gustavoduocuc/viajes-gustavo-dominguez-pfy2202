import { screen, within } from '@testing-library/react';
import { getDestinationOffers } from '../../graphql/queries';
import { mockDestinationsApi } from '../../testing/mockDestinationsApi';
import { offersMock, serverErrorMock } from '../../testing/offersMocks';
import { renderAt } from '../../testing/renderAt';

async function openSummary(slug, mocks) {
  mockDestinationsApi();
  renderAt(`/destinos/${slug}`, { mocks });
  return screen.findByRole('heading', { level: 2, name: 'Vuelos y hoteles' });
}

test('the summary shows the counts and the from prices', async () => {
  await openSummary('cusco', [offersMock('cusco')]);

  expect(await screen.findByText('3 vuelos')).toBeInTheDocument();
  expect(screen.getByText('3 hoteles')).toBeInTheDocument();
  expect(screen.getByText(/310/)).toBeInTheDocument();
  expect(screen.getByText(/95/)).toBeInTheDocument();
  expect(screen.getByText('por noche')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Ver vuelos' })).toHaveAttribute('href', '/destinos/cusco/vuelos');
  expect(screen.getByRole('link', { name: 'Ver hoteles' })).toHaveAttribute('href', '/destinos/cusco/hoteles');
});

test('the summary loads with a single combined request', async () => {
  await openSummary('cusco', [offersMock('cusco')]);
  await screen.findByText('3 vuelos');

  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});

test('a destination with everything sold out says so instead of a price', async () => {
  await openSummary('ciudad-del-cabo', [offersMock('ciudad-del-cabo')]);

  expect(await screen.findByText('2 hoteles')).toBeInTheDocument();
  const hotelsBlock = screen.getByRole('heading', { level: 3, name: 'Hoteles' }).parentElement;
  expect(within(hotelsBlock).getByText('Sin disponibilidad')).toBeInTheDocument();
});

test('the destination without offers shows the empty state and no error', async () => {
  await openSummary('isla-de-pascua', [offersMock('isla-de-pascua')]);

  expect(await screen.findByText('Este destino aún no tiene vuelos ni hoteles.')).toBeInTheDocument();
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});

test('an api error is shown as an alert', async () => {
  await openSummary('cusco', [serverErrorMock(getDestinationOffers, { destination: 'cusco' })]);

  expect(await screen.findByRole('alert')).toHaveTextContent('Error simulado del servidor GraphQL.');
});

test('the summary shows a loading message first', async () => {
  await openSummary('cusco', [{ ...offersMock('cusco'), delay: 100 }]);

  expect(screen.getByRole('status')).toHaveTextContent('Cargando ofertas…');
  expect(await screen.findByText('3 vuelos')).toBeInTheDocument();
});
