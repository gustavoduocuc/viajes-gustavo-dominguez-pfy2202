import { calculateNights, calculateTripTotal } from './tripCalculations';

const flight = { price: 420, currency: 'USD' };
const hotel = { checkIn: '2027-03-10', checkOut: '2027-03-17', pricePerNight: 95, currency: 'USD' };

test('seven nights between the hotel dates', () => {
  expect(calculateNights('2027-03-10', '2027-03-17')).toBe(7);
});

test('nights across a month end', () => {
  expect(calculateNights('2027-02-26', '2027-03-02')).toBe(4);
});

test('nights across a year end', () => {
  expect(calculateNights('2027-12-30', '2028-01-02')).toBe(3);
});

test('a check out that is not after the check in gives zero nights', () => {
  expect(calculateNights('2027-03-10', '2027-03-10')).toBe(0);
  expect(calculateNights('2027-03-10', '2027-03-05')).toBe(0);
});

test('an invalid date gives zero nights', () => {
  expect(calculateNights('mañana', '2027-03-10')).toBe(0);
  expect(calculateNights('2027-03-10', '')).toBe(0);
});

test('an empty trip has no total', () => {
  expect(calculateTripTotal({ destination: null, flight: null, hotel: null })).toBeNull();
});

test('flight plus nights times the price per night', () => {
  expect(calculateTripTotal({ destination: {}, flight, hotel })).toEqual({
    nights: 7,
    flightAmount: 420,
    hotelAmount: 665,
    total: 1085,
    currency: 'USD',
    hasMixedCurrencies: false,
  });
});

test('only a flight totals the flight', () => {
  const result = calculateTripTotal({ destination: {}, flight, hotel: null });

  expect(result).toMatchObject({ nights: 0, flightAmount: 420, hotelAmount: null, total: 420, currency: 'USD' });
});

test('only a hotel totals the stay', () => {
  const result = calculateTripTotal({ destination: {}, flight: null, hotel });

  expect(result).toMatchObject({ nights: 7, flightAmount: null, hotelAmount: 665, total: 665 });
});

test('the total is rounded to cents', () => {
  const oddHotel = { ...hotel, pricePerNight: 33.333 };

  const result = calculateTripTotal({ destination: {}, flight: { price: 10.1, currency: 'USD' }, hotel: oddHotel });

  expect(result.hotelAmount).toBe(233.33);
  expect(result.total).toBe(243.43);
});

test('different currencies are not added', () => {
  const result = calculateTripTotal({ destination: {}, flight, hotel: { ...hotel, currency: 'EUR' } });

  expect(result).toMatchObject({ total: null, currency: null, hasMixedCurrencies: true });
});
