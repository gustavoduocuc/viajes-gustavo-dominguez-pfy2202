import {
  chooseFlight,
  chooseHotel,
  clearTrip,
  countTripItems,
  emptyTrip,
  isTripEmpty,
  removeFlight,
  removeHotel,
  replacesTrip,
} from './tripState';

const cusco = { slug: 'cusco', name: 'Cusco', country: 'Perú', region: 'Sudamérica', description: 'extra' };
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
  __typename: 'Flight',
};
const otherFlight = { ...flight, id: 'fl-2', airline: 'Sky Airline' };
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
  __typename: 'Hotel',
};
const romeHotel = { ...hotel, id: 'ht-9', name: 'Trastevere' };

test('the initial trip is empty', () => {
  expect(emptyTrip).toEqual({ destination: null, flight: null, hotel: null });
  expect(isTripEmpty(emptyTrip)).toBe(true);
  expect(countTripItems(emptyTrip)).toBe(0);
});

test('choosing a flight sets destination and flight, keeping only schema fields', () => {
  const trip = chooseFlight(emptyTrip, cusco, flight);

  expect(trip.destination).toEqual({ slug: 'cusco', name: 'Cusco', country: 'Perú', region: 'Sudamérica' });
  expect(trip.flight.id).toBe('fl-1');
  expect(trip.flight).not.toHaveProperty('__typename');
  expect(trip.hotel).toBeNull();
});

test('a hotel of the same destination joins the flight', () => {
  const trip = chooseHotel(chooseFlight(emptyTrip, cusco, flight), cusco, hotel);

  expect(trip.flight.id).toBe('fl-1');
  expect(trip.hotel.id).toBe('ht-1');
  expect(trip.hotel).not.toHaveProperty('__typename');
  expect(countTripItems(trip)).toBe(2);
});

test('another flight of the same destination replaces the flight and keeps the hotel', () => {
  const trip = chooseFlight(chooseHotel(chooseFlight(emptyTrip, cusco, flight), cusco, hotel), cusco, otherFlight);

  expect(trip.flight.id).toBe('fl-2');
  expect(trip.hotel.id).toBe('ht-1');
});

test('an offer of another destination replaces the whole trip', () => {
  const full = chooseHotel(chooseFlight(emptyTrip, cusco, flight), cusco, hotel);

  const trip = chooseHotel(full, roma, romeHotel);

  expect(trip.destination.slug).toBe('roma');
  expect(trip.hotel.id).toBe('ht-9');
  expect(trip.flight).toBeNull();
});

test('replacesTrip only tells true for a different destination', () => {
  const trip = chooseFlight(emptyTrip, cusco, flight);

  expect(replacesTrip(emptyTrip, 'roma')).toBe(false);
  expect(replacesTrip(trip, 'cusco')).toBe(false);
  expect(replacesTrip(trip, 'roma')).toBe(true);
});

test('removing one part keeps the other and the destination', () => {
  const full = chooseHotel(chooseFlight(emptyTrip, cusco, flight), cusco, hotel);

  const withoutHotel = removeHotel(full);

  expect(withoutHotel.hotel).toBeNull();
  expect(withoutHotel.flight.id).toBe('fl-1');
  expect(withoutHotel.destination.slug).toBe('cusco');
  expect(removeFlight(full).hotel.id).toBe('ht-1');
});

test('removing the last part empties the trip and its destination', () => {
  const trip = removeFlight(chooseFlight(emptyTrip, cusco, flight));

  expect(trip).toEqual(emptyTrip);
});

test('clearing gives the empty trip', () => {
  expect(clearTrip()).toEqual(emptyTrip);
});

test('transitions do not mutate the previous trip', () => {
  const before = chooseFlight(emptyTrip, cusco, flight);
  const snapshot = JSON.stringify(before);

  chooseHotel(before, cusco, hotel);
  removeFlight(before);
  chooseFlight(before, roma, otherFlight);

  expect(JSON.stringify(before)).toBe(snapshot);
  expect(emptyTrip).toEqual({ destination: null, flight: null, hotel: null });
});
