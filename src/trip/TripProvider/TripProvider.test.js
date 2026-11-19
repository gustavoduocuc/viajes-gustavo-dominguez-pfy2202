import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { tripStorageKey } from '../tripStorage';
import { TripProvider, useTrip } from './TripProvider';

const cusco = { slug: 'cusco', name: 'Cusco', country: 'Perú', region: 'Sudamérica' };
const roma = { slug: 'roma', name: 'Roma', country: 'Italia', region: 'Europa' };
const flight = {
  id: 'fl-1',
  airline: 'LATAM',
  origin: 'Santiago',
  departureDate: '2027-03-10',
  returnDate: '2027-03-17',
  price: 420,
  currency: 'USD',
  seatsAvailable: 12,
};
const soldOutFlight = { ...flight, id: 'fl-2', airline: 'JetSMART', seatsAvailable: 0 };
const hotel = {
  id: 'ht-1',
  name: 'Casa Andina',
  stars: 4,
  address: 'Calle 1',
  checkIn: '2027-03-10',
  checkOut: '2027-03-17',
  pricePerNight: 95,
  currency: 'USD',
  roomsAvailable: 8,
  amenities: ['Wifi'],
};
const romeHotel = { ...hotel, id: 'ht-9', name: 'Trastevere' };

function Consumer() {
  const trip = useTrip();
  return (
    <div>
      <p>destino: {trip.trip.destination ? trip.trip.destination.name : 'ninguno'}</p>
      <p>vuelo: {trip.trip.flight ? trip.trip.flight.airline : 'ninguno'}</p>
      <p>hotel: {trip.trip.hotel ? trip.trip.hotel.name : 'ninguno'}</p>
      <p>elementos: {trip.itemCount}</p>
      <p>aviso: {trip.notice ? `${trip.notice.previousName}>${trip.notice.newName}` : 'ninguno'}</p>
      <button onClick={() => trip.chooseFlight(cusco, flight)}>vuelo cusco</button>
      <button onClick={() => trip.chooseFlight(cusco, soldOutFlight)}>vuelo agotado</button>
      <button onClick={() => trip.chooseHotel(cusco, hotel)}>hotel cusco</button>
      <button onClick={() => trip.chooseHotel(roma, romeHotel)}>hotel roma</button>
      <button onClick={trip.removeFlight}>quitar vuelo</button>
      <button onClick={trip.removeHotel}>quitar hotel</button>
      <button onClick={trip.clearTrip}>vaciar</button>
      <button onClick={trip.dismissNotice}>cerrar aviso</button>
    </div>
  );
}

function renderTrip() {
  return render(
    <TripProvider>
      <Consumer />
    </TripProvider>
  );
}

function click(name) {
  userEvent.click(screen.getByRole('button', { name }));
}

test('the trip starts empty', () => {
  renderTrip();

  expect(screen.getByText('destino: ninguno')).toBeInTheDocument();
  expect(screen.getByText('elementos: 0')).toBeInTheDocument();
});

test('choosing a flight and a hotel fills the trip', () => {
  renderTrip();

  click('vuelo cusco');
  click('hotel cusco');

  expect(screen.getByText('destino: Cusco')).toBeInTheDocument();
  expect(screen.getByText('vuelo: LATAM')).toBeInTheDocument();
  expect(screen.getByText('hotel: Casa Andina')).toBeInTheDocument();
  expect(screen.getByText('elementos: 2')).toBeInTheDocument();
  expect(screen.getByText('aviso: ninguno')).toBeInTheDocument();
});

test('choosing from another destination replaces the trip with a notice', () => {
  renderTrip();
  click('vuelo cusco');
  click('hotel cusco');

  click('hotel roma');

  expect(screen.getByText('destino: Roma')).toBeInTheDocument();
  expect(screen.getByText('vuelo: ninguno')).toBeInTheDocument();
  expect(screen.getByText('aviso: Cusco>Roma')).toBeInTheDocument();
});

test('the notice can be dismissed without changing the trip', () => {
  renderTrip();
  click('vuelo cusco');
  click('hotel roma');

  click('cerrar aviso');

  expect(screen.getByText('aviso: ninguno')).toBeInTheDocument();
  expect(screen.getByText('destino: Roma')).toBeInTheDocument();
});

test('a sold out offer is ignored', () => {
  renderTrip();

  click('vuelo agotado');

  expect(screen.getByText('vuelo: ninguno')).toBeInTheDocument();
  expect(screen.getByText('elementos: 0')).toBeInTheDocument();
});

test('removing parts and clearing update the trip', () => {
  renderTrip();
  click('vuelo cusco');
  click('hotel cusco');

  click('quitar hotel');
  expect(screen.getByText('hotel: ninguno')).toBeInTheDocument();
  expect(screen.getByText('elementos: 1')).toBeInTheDocument();

  click('quitar vuelo');
  expect(screen.getByText('destino: ninguno')).toBeInTheDocument();

  click('vuelo cusco');
  click('vaciar');
  expect(screen.getByText('elementos: 0')).toBeInTheDocument();
});

test('the trip survives remounting with the same storage', () => {
  const first = renderTrip();
  click('vuelo cusco');
  first.unmount();

  renderTrip();

  expect(screen.getByText('vuelo: LATAM')).toBeInTheDocument();
  expect(screen.getByText('destino: Cusco')).toBeInTheDocument();
});

test('the notice does not survive remounting', () => {
  const first = renderTrip();
  click('vuelo cusco');
  click('hotel roma');
  first.unmount();

  renderTrip();

  expect(screen.getByText('aviso: ninguno')).toBeInTheDocument();
  expect(screen.getByText('destino: Roma')).toBeInTheDocument();
});

test('damaged stored data opens an empty trip', () => {
  localStorage.setItem(tripStorageKey, '{roto');

  renderTrip();

  expect(screen.getByText('elementos: 0')).toBeInTheDocument();
});

test('a blocked storage still lets the trip work during the visit', () => {
  const getItem = jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
    throw new Error('blocked');
  });
  const setItem = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
    throw new Error('blocked');
  });

  renderTrip();
  click('vuelo cusco');

  expect(screen.getByText('vuelo: LATAM')).toBeInTheDocument();
  getItem.mockRestore();
  setItem.mockRestore();
});

test('useTrip outside the provider explains the mistake', () => {
  const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

  expect(() => render(<Consumer />)).toThrow('useTrip debe usarse dentro de TripProvider');
  consoleError.mockRestore();
});
