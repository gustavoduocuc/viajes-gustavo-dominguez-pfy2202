import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockDestinationsApi } from '../testing/mockDestinationsApi';
import { flightsMock, hotelsMock } from '../testing/offersMocks';
import { renderAt } from '../testing/renderAt';

async function openFlights(slug) {
  mockDestinationsApi();
  const router = renderAt(`/destinos/${slug}/vuelos`, {
    mocks: [flightsMock('cusco'), flightsMock('roma'), hotelsMock('cusco'), hotelsMock('roma')],
  });
  await screen.findByRole('heading', { level: 2, name: 'Vuelos' });
  return router;
}

async function goTo(router, path) {
  await act(async () => {
    await router.navigate(path);
  });
}

test('choosing a flight marks it as chosen and leaves the others to choose', async () => {
  await openFlights('cusco');
  await screen.findByText('3 vuelos');

  userEvent.click(screen.getByRole('button', { name: 'Elegir vuelo LATAM' }));

  expect(screen.getByText('Elegido')).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Elegir vuelo LATAM' })).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Elegir vuelo Sky Airline' })).toBeEnabled();
});

test('choosing another flight of the same destination moves the mark without a notice', async () => {
  await openFlights('cusco');
  await screen.findByText('3 vuelos');
  userEvent.click(screen.getByRole('button', { name: 'Elegir vuelo LATAM' }));

  userEvent.click(screen.getByRole('button', { name: 'Elegir vuelo Sky Airline' }));

  expect(screen.getAllByText('Elegido')).toHaveLength(1);
  expect(screen.getByRole('button', { name: 'Elegir vuelo LATAM' })).toBeEnabled();
  expect(screen.queryByText(/Se reemplazó tu viaje/)).not.toBeInTheDocument();
});

test('a sold out flight cannot be chosen', async () => {
  await openFlights('cusco');
  await screen.findByText('3 vuelos');

  userEvent.click(screen.getByRole('button', { name: 'Elegir vuelo JetSMART' }));

  expect(screen.getByRole('button', { name: 'Elegir vuelo JetSMART' })).toBeDisabled();
  expect(screen.queryByText('Elegido')).not.toBeInTheDocument();
});

test('the chosen mark is not shown on another destination', async () => {
  const router = await openFlights('cusco');
  await screen.findByText('3 vuelos');
  userEvent.click(screen.getByRole('button', { name: 'Elegir vuelo LATAM' }));

  await goTo(router, '/destinos/roma/vuelos');

  expect(await screen.findByText('4 vuelos')).toBeInTheDocument();
  expect(screen.queryByText('Elegido')).not.toBeInTheDocument();
});

test('choosing a hotel marks it and a hotel of another destination replaces the trip with a notice', async () => {
  const router = await openFlights('cusco');
  await goTo(router, '/destinos/cusco/hoteles');
  await screen.findByText('3 hoteles');
  userEvent.click(screen.getByRole('button', { name: 'Elegir hotel Casa Andina Koricancha' }));
  expect(screen.getByText('Elegido')).toBeInTheDocument();

  await goTo(router, '/destinos/roma/hoteles');
  await screen.findByText('3 hoteles');
  userEvent.click(screen.getByRole('button', { name: 'Elegir hotel Hotel Trastevere' }));

  expect(screen.getByText('Elegido')).toBeInTheDocument();
  expect(screen.getByText('Se reemplazó tu viaje a Cusco por una oferta de Roma.')).toBeInTheDocument();
});

test('the notice can be closed and does not appear when the trip was empty', async () => {
  const router = await openFlights('cusco');
  await screen.findByText('3 vuelos');
  userEvent.click(screen.getByRole('button', { name: 'Elegir vuelo LATAM' }));
  expect(screen.queryByText(/Se reemplazó tu viaje/)).not.toBeInTheDocument();

  await goTo(router, '/destinos/roma/vuelos');
  await screen.findByText('4 vuelos');
  userEvent.click(screen.getByRole('button', { name: 'Elegir vuelo Iberia' }));
  userEvent.click(screen.getByRole('button', { name: 'Cerrar aviso' }));

  expect(screen.queryByText(/Se reemplazó tu viaje/)).not.toBeInTheDocument();
  expect(screen.getByRole('main')).toHaveFocus();
  expect(screen.getByText('Elegido')).toBeInTheDocument();
});
