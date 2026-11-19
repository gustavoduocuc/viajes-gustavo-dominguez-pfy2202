import { destinationOffersResponse, flightsResponse, hotelsResponse } from './offersResponses';

const emptyStorage = { getItem: () => null };
const failingStorage = { getItem: (key) => (key === 'mockFail' ? 'graphql' : null) };

function inProduction(run) {
  const previous = process.env.NODE_ENV;
  process.env.NODE_ENV = 'production';
  try {
    run();
  } finally {
    process.env.NODE_ENV = previous;
  }
}

test('flights come with their typename and the date filter', () => {
  const response = flightsResponse({ destination: 'cusco', date: '2027-04-02' }, emptyStorage);

  expect(response.errors).toBeUndefined();
  expect(response.data.flights).toHaveLength(2);
  response.data.flights.forEach((flight) => expect(flight.__typename).toBe('Flight'));
});

test('hotels come with their typename and the availability filter', () => {
  const response = hotelsResponse({ destination: 'roma', onlyAvailable: true }, emptyStorage);

  expect(response.data.hotels).toHaveLength(2);
  response.data.hotels.forEach((hotel) => expect(hotel.__typename).toBe('Hotel'));
});

test('the combined offers carry both lists in one answer', () => {
  const response = destinationOffersResponse({ destination: 'kioto' }, emptyStorage);

  expect(response.data.destinationOffers.__typename).toBe('DestinationOffers');
  expect(response.data.destinationOffers.flights).toHaveLength(3);
  expect(response.data.destinationOffers.hotels).toHaveLength(3);
});

test('the destination without offers answers empty lists and no errors', () => {
  const flights = flightsResponse({ destination: 'isla-de-pascua' }, emptyStorage);
  const hotels = hotelsResponse({ destination: 'isla-de-pascua' }, emptyStorage);
  const offers = destinationOffersResponse({ destination: 'isla-de-pascua' }, emptyStorage);

  expect(flights).toEqual({ data: { flights: [] } });
  expect(hotels).toEqual({ data: { hotels: [] } });
  expect(offers.errors).toBeUndefined();
  expect(offers.data.destinationOffers.flights).toEqual([]);
  expect(offers.data.destinationOffers.hotels).toEqual([]);
});

test('an unknown destination answers an error that names it and no data', () => {
  [flightsResponse, hotelsResponse, destinationOffersResponse].forEach((respond) => {
    const response = respond({ destination: 'no-existe' }, emptyStorage);

    expect(response.data).toBeUndefined();
    expect(response.errors[0].message).toContain('no-existe');
  });
});

test('in development the stored flag makes every operation fail', () => {
  const response = flightsResponse({ destination: 'cusco' }, failingStorage);

  expect(response).toEqual({ errors: [{ message: 'Error simulado del servidor GraphQL.' }] });
});

test('in production the stored flag is ignored', () => {
  inProduction(() => {
    expect(flightsResponse({ destination: 'cusco' }, failingStorage).data.flights).toHaveLength(3);
  });
});
