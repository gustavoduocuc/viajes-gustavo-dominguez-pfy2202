import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { readStoredTrip, tripStorageKey, writeStoredTrip } from '../tripStorage';
import { renderAt } from '../../testing/renderAt';
import { cuscoFlightId, cuscoHotelId, storeTrip } from '../../testing/tripFixtures';

function openTrip() {
  renderAt('/mi-viaje');
  return screen.findByRole('heading', { level: 1, name: 'Mi viaje' });
}

test('an empty trip shows the empty state with a link to destinations', async () => {
  await openTrip();

  expect(screen.getByText('Aún no elegiste nada para tu viaje.')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Explorar destinos' })).toHaveAttribute('href', '/destinos');
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  expect(screen.queryByRole('button', { name: 'Vaciar viaje' })).not.toBeInTheDocument();
});

test('a full trip shows destination, flight, hotel and nights', async () => {
  storeTrip('cusco', { flightId: cuscoFlightId, hotelId: cuscoHotelId });
  await openTrip();

  expect(screen.getByText('Cusco')).toBeInTheDocument();
  expect(screen.getByText('Perú · Sudamérica')).toBeInTheDocument();
  expect(screen.getByText('LATAM')).toBeInTheDocument();
  expect(screen.getByText('Desde Santiago')).toBeInTheDocument();
  expect(screen.getByText('Casa Andina Koricancha')).toBeInTheDocument();
  expect(screen.getByRole('img', { name: '4 estrellas' })).toBeInTheDocument();
  expect(screen.getByText('7 noches')).toBeInTheDocument();
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
});

test('the total shows the breakdown and the estimate note', async () => {
  storeTrip('cusco', { flightId: cuscoFlightId, hotelId: cuscoHotelId });
  await openTrip();

  const totalSection = screen.getByRole('region', { name: 'Total estimado' });
  expect(within(totalSection).getByText(/Hotel 7 noches × 95/)).toBeInTheDocument();
  expect(within(totalSection).getAllByText(/1085/)).toHaveLength(1);
  expect(within(totalSection).getByText(/420/)).toBeInTheDocument();
  expect(within(totalSection).getByText('Estimación para 1 pasajero y 1 habitación.')).toBeInTheDocument();
});

test('a missing part shows a way to choose it and a partial total', async () => {
  storeTrip('cusco', { flightId: cuscoFlightId });
  await openTrip();

  expect(screen.getByText('Aún no elegiste un hotel.')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Elegir hotel' })).toHaveAttribute('href', '/destinos/cusco/hoteles');
  expect(screen.getByText('Falta elegir un hotel.')).toBeInTheDocument();
  expect(screen.queryByText(/noches ×/)).not.toBeInTheDocument();
});

test('the change links go to the offers of the destination', async () => {
  storeTrip('cusco', { flightId: cuscoFlightId, hotelId: cuscoHotelId });
  await openTrip();

  expect(screen.getByRole('link', { name: 'Cambiar vuelo' })).toHaveAttribute('href', '/destinos/cusco/vuelos');
  expect(screen.getByRole('link', { name: 'Cambiar hotel' })).toHaveAttribute('href', '/destinos/cusco/hoteles');
});

test('removing the hotel updates the screen, the total, the announcement and the focus', async () => {
  storeTrip('cusco', { flightId: cuscoFlightId, hotelId: cuscoHotelId });
  await openTrip();

  userEvent.click(screen.getByRole('button', { name: 'Quitar hotel Casa Andina Koricancha' }));

  expect(screen.getByText('Hotel quitado del viaje')).toBeInTheDocument();
  expect(screen.getByText('Aún no elegiste un hotel.')).toBeInTheDocument();
  expect(screen.queryByText(/1085/)).not.toBeInTheDocument();
  expect(readStoredTrip(localStorage).hotel).toBeNull();
  await waitFor(() => expect(screen.getByRole('heading', { level: 2, name: 'Hotel' })).toHaveFocus());
});

test('removing the flight keeps the hotel and moves focus to the flight section', async () => {
  storeTrip('cusco', { flightId: cuscoFlightId, hotelId: cuscoHotelId });
  await openTrip();

  userEvent.click(screen.getByRole('button', { name: 'Quitar vuelo LATAM' }));

  expect(screen.getByText('Vuelo quitado del viaje')).toBeInTheDocument();
  expect(screen.getByText('Casa Andina Koricancha')).toBeInTheDocument();
  await waitFor(() => expect(screen.getByRole('heading', { level: 2, name: 'Vuelo' })).toHaveFocus());
});

test('removing the last part shows the empty state and focuses the page heading', async () => {
  storeTrip('cusco', { flightId: cuscoFlightId });
  await openTrip();

  userEvent.click(screen.getByRole('button', { name: 'Quitar vuelo LATAM' }));

  expect(await screen.findByText('Aún no elegiste nada para tu viaje.')).toBeInTheDocument();
  await waitFor(() => expect(screen.getByRole('heading', { level: 1, name: 'Mi viaje' })).toHaveFocus());
});

test('clearing the trip shows the empty state, announces it and keeps focus on the page', async () => {
  storeTrip('cusco', { flightId: cuscoFlightId, hotelId: cuscoHotelId });
  await openTrip();

  userEvent.click(screen.getByRole('button', { name: 'Vaciar viaje' }));

  expect(await screen.findByText('Aún no elegiste nada para tu viaje.')).toBeInTheDocument();
  expect(screen.getByText('Viaje vaciado')).toBeInTheDocument();
  await waitFor(() => expect(screen.getByRole('heading', { level: 1, name: 'Mi viaje' })).toHaveFocus());
});

test('different currencies are reported instead of added', async () => {
  const trip = storeTrip('cusco', { flightId: cuscoFlightId, hotelId: cuscoHotelId });
  writeStoredTrip(localStorage, { ...trip, hotel: { ...trip.hotel, currency: 'EUR' } });
  await openTrip();

  expect(screen.getByRole('alert')).toHaveTextContent('monedas distintas');
  expect(screen.queryByText(/1085/)).not.toBeInTheDocument();
});

test('damaged stored data opens the empty state', async () => {
  localStorage.setItem(tripStorageKey, '{roto');
  await openTrip();

  expect(screen.getByText('Aún no elegiste nada para tu viaje.')).toBeInTheDocument();
});
