import { destinations } from './destinations';
import { flightsByDestination } from './flights';

const allFlights = Object.values(flightsByDestination).flat();
const isoDate = /^\d{4}-\d{2}-\d{2}$/;

test('every key is a known destination and the reserved one has no flights', () => {
  const slugs = destinations.map((destination) => destination.slug);

  Object.keys(flightsByDestination).forEach((slug) => expect(slugs).toContain(slug));
  expect(flightsByDestination['isla-de-pascua']).toEqual([]);
});

test('the other destinations have between 2 and 4 flights', () => {
  Object.entries(flightsByDestination)
    .filter(([slug]) => slug !== 'isla-de-pascua')
    .forEach(([, flights]) => {
      expect(flights.length).toBeGreaterThanOrEqual(2);
      expect(flights.length).toBeLessThanOrEqual(4);
    });
});

test('every flight has all its fields and ids are unique', () => {
  const ids = allFlights.map((flight) => flight.id);

  expect(new Set(ids).size).toBe(ids.length);
  allFlights.forEach((flight) => {
    ['airline', 'origin', 'currency'].forEach((field) => expect(flight[field].trim()).not.toBe(''));
    expect(flight.departureDate).toMatch(isoDate);
    expect(flight.returnDate).toMatch(isoDate);
    expect(flight.returnDate > flight.departureDate).toBe(true);
    expect(flight.price).toBeGreaterThan(0);
    expect(Number.isInteger(flight.seatsAvailable)).toBe(true);
  });
});

test('there are sold out flights and flights with few seats', () => {
  expect(allFlights.filter((flight) => flight.seatsAvailable === 0).length).toBeGreaterThanOrEqual(2);
  expect(allFlights.some((flight) => flight.seatsAvailable >= 1 && flight.seatsAvailable <= 3)).toBe(true);
});

test('departures are spread over several dates', () => {
  const cuscoDates = flightsByDestination.cusco.map((flight) => flight.departureDate);

  expect(new Set(cuscoDates).size).toBe(cuscoDates.length);
});
