import { summarizeOffers } from './summarizeOffers';

const flights = [
  { price: 400, currency: 'USD', seatsAvailable: 5 },
  { price: 250, currency: 'USD', seatsAvailable: 0 },
  { price: 300, currency: 'USD', seatsAvailable: 2 },
];
const hotels = [
  { pricePerNight: 90, currency: 'USD', roomsAvailable: 0 },
  { pricePerNight: 120, currency: 'USD', roomsAvailable: 4 },
];

test('the counts include sold out offers', () => {
  const summary = summarizeOffers(flights, hotels);

  expect(summary.flightCount).toBe(3);
  expect(summary.hotelCount).toBe(2);
});

test('the from price ignores sold out offers', () => {
  const summary = summarizeOffers(flights, hotels);

  expect(summary.cheapestFlight).toEqual({ amount: 300, currency: 'USD' });
  expect(summary.cheapestHotel).toEqual({ amount: 120, currency: 'USD' });
});

test('with everything sold out there is no from price', () => {
  const summary = summarizeOffers([flights[1]], [hotels[0]]);

  expect(summary.cheapestFlight).toBeNull();
  expect(summary.cheapestHotel).toBeNull();
});

test('empty lists give zero counts and no price', () => {
  expect(summarizeOffers([], [])).toEqual({
    flightCount: 0,
    hotelCount: 0,
    cheapestFlight: null,
    cheapestHotel: null,
  });
});
