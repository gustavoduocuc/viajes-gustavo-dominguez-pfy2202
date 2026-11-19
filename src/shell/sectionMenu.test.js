import { screen, within } from '@testing-library/react';
import { mockDestinationsApi } from '../testing/mockDestinationsApi';
import { offersMock } from '../testing/offersMocks';
import { renderAt } from '../testing/renderAt';
import { cuscoFlightId, cuscoHotelId, storeTrip } from '../testing/tripFixtures';

async function readMenu() {
  return screen.findByRole('navigation', { name: 'Secciones' });
}

function markedLinks(menu) {
  return within(menu)
    .getAllByRole('link')
    .filter((link) => link.getAttribute('aria-current') === 'page');
}

test('the menu has Inicio, Destinos and Mi viaje in order', async () => {
  mockDestinationsApi();
  renderAt('/');

  const menu = await readMenu();

  expect(within(menu).getAllByRole('link').map((link) => link.textContent)).toEqual(['Inicio', 'Destinos', 'Mi viaje']);
});

test('only Inicio is marked on the home page', async () => {
  mockDestinationsApi();
  renderAt('/');

  const marked = markedLinks(await readMenu());

  expect(marked).toHaveLength(1);
  expect(marked[0]).toHaveTextContent('Inicio');
});

test('Destinos stays marked on a destination detail', async () => {
  mockDestinationsApi();
  renderAt('/destinos/kioto', { mocks: [offersMock('kioto')] });

  const marked = markedLinks(await readMenu());

  expect(marked).toHaveLength(1);
  expect(marked[0]).toHaveTextContent('Destinos');
});

test('an unknown address shows the not found notice inside the shell', async () => {
  mockDestinationsApi();
  renderAt('/viajes-a-marte');

  expect(await screen.findByRole('heading', { level: 1, name: 'Página no encontrada' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Volver a Inicio' })).toHaveAttribute('href', '/');
  expect(await readMenu()).toBeInTheDocument();
});

test('Mi viaje has no indicator when the trip is empty', async () => {
  mockDestinationsApi();
  renderAt('/');

  const menu = await readMenu();

  expect(within(menu).getByRole('link', { name: 'Mi viaje' })).toBeInTheDocument();
});

test('Mi viaje shows how many elements the trip has', async () => {
  storeTrip('cusco', { flightId: cuscoFlightId });
  mockDestinationsApi();
  renderAt('/');

  const menu = await readMenu();

  expect(within(menu).getByRole('link', { name: 'Mi viaje 1 elementos en el viaje' })).toBeInTheDocument();
  expect(within(menu).getByText('1')).toBeInTheDocument();
});

test('Mi viaje shows 2 with a flight and a hotel', async () => {
  storeTrip('cusco', { flightId: cuscoFlightId, hotelId: cuscoHotelId });
  mockDestinationsApi();
  renderAt('/');

  const menu = await readMenu();

  expect(within(menu).getByText('2')).toBeInTheDocument();
});

test('only Mi viaje is marked on the trip screen', async () => {
  mockDestinationsApi();
  renderAt('/mi-viaje');

  const marked = markedLinks(await readMenu());

  expect(marked).toHaveLength(1);
  expect(marked[0]).toHaveTextContent('Mi viaje');
});
