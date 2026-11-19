import { emptyTrip } from './tripState';
import { parseStoredTrip, readStoredTrip, tripStorageKey, writeStoredTrip } from './tripStorage';

const destination = { slug: 'cusco', name: 'Cusco', country: 'Perú', region: 'Sudamérica' };
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

function createStorage(initial = {}) {
  const data = { ...initial };
  return {
    getItem: (key) => (key in data ? data[key] : null),
    setItem: (key, value) => {
      data[key] = value;
    },
  };
}

test('a written trip is read back the same', () => {
  const storage = createStorage();
  const trip = { destination, flight, hotel };

  writeStoredTrip(storage, trip);

  expect(readStoredTrip(storage)).toEqual(trip);
});

test('nothing stored gives the empty trip', () => {
  expect(readStoredTrip(createStorage())).toEqual(emptyTrip);
});

test('broken json gives the empty trip', () => {
  expect(readStoredTrip(createStorage({ [tripStorageKey]: '{no es json' }))).toEqual(emptyTrip);
});

test('another version gives the empty trip', () => {
  const stored = JSON.stringify({ version: 2, destination, flight, hotel: null });

  expect(readStoredTrip(createStorage({ [tripStorageKey]: stored }))).toEqual(emptyTrip);
});

test('an unexpected shape gives the empty trip', () => {
  expect(parseStoredTrip(null)).toEqual(emptyTrip);
  expect(parseStoredTrip('texto')).toEqual(emptyTrip);
  expect(parseStoredTrip({ version: 1, destination, flight: { id: 'x' }, hotel: null })).toEqual(emptyTrip);
  expect(parseStoredTrip({ version: 1, destination, flight: { ...flight, price: '420' }, hotel: null })).toEqual(
    emptyTrip
  );
  expect(parseStoredTrip({ version: 1, destination, flight: { ...flight, departureDate: 'mañana' } })).toEqual(
    emptyTrip
  );
  expect(parseStoredTrip({ version: 1, destination, flight: null, hotel: { ...hotel, stars: 9 } })).toEqual(emptyTrip);
});

test('parts without a destination are rejected', () => {
  expect(parseStoredTrip({ version: 1, destination: null, flight, hotel: null })).toEqual(emptyTrip);
});

test('a destination without parts is rejected', () => {
  expect(parseStoredTrip({ version: 1, destination, flight: null, hotel: null })).toEqual(emptyTrip);
});

test('a storage that throws on read gives the empty trip', () => {
  const brokenStorage = {
    getItem: () => {
      throw new Error('blocked');
    },
  };

  expect(readStoredTrip(brokenStorage)).toEqual(emptyTrip);
});

test('a storage that throws on write does not break', () => {
  const brokenStorage = {
    setItem: () => {
      throw new Error('quota');
    },
  };

  expect(() => writeStoredTrip(brokenStorage, { destination, flight, hotel: null })).not.toThrow();
});
