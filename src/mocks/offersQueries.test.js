import { findOffers, isKnownDestination, listFlights, listHotels } from './offersQueries';

test('known and unknown destinations are told apart', () => {
  expect(isKnownDestination('cusco')).toBe(true);
  expect(isKnownDestination('isla-de-pascua')).toBe(true);
  expect(isKnownDestination('no-existe')).toBe(false);
});

test('all flights are returned without a date', () => {
  expect(listFlights('cusco')).toHaveLength(3);
});

test('the date keeps flights departing that day or later', () => {
  const flights = listFlights('cusco', '2027-04-02');

  expect(flights.map((flight) => flight.departureDate)).toEqual(['2027-04-02', '2027-05-15']);
});

test('a date after every departure gives an empty list', () => {
  expect(listFlights('cusco', '2030-01-01')).toEqual([]);
});

test('all hotels are returned unless only available ones are asked', () => {
  expect(listHotels('roma')).toHaveLength(3);
  expect(listHotels('roma', false)).toHaveLength(3);
  expect(listHotels('roma', true).every((hotel) => hotel.roomsAvailable > 0)).toBe(true);
  expect(listHotels('roma', true)).toHaveLength(2);
});

test('the destination without offers has empty lists', () => {
  expect(findOffers('isla-de-pascua')).toEqual({ flights: [], hotels: [] });
});

test('the combined offers match the individual lists', () => {
  expect(findOffers('kioto')).toEqual({ flights: listFlights('kioto'), hotels: listHotels('kioto') });
});
