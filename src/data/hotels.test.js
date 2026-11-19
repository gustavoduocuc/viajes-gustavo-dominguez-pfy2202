import { destinations } from './destinations';
import { hotelsByDestination } from './hotels';

const allHotels = Object.values(hotelsByDestination).flat();
const isoDate = /^\d{4}-\d{2}-\d{2}$/;

test('every key is a known destination and the reserved one has no hotels', () => {
  const slugs = destinations.map((destination) => destination.slug);

  Object.keys(hotelsByDestination).forEach((slug) => expect(slugs).toContain(slug));
  expect(hotelsByDestination['isla-de-pascua']).toEqual([]);
});

test('the other destinations have between 2 and 3 hotels', () => {
  Object.entries(hotelsByDestination)
    .filter(([slug]) => slug !== 'isla-de-pascua')
    .forEach(([, hotels]) => {
      expect(hotels.length).toBeGreaterThanOrEqual(2);
      expect(hotels.length).toBeLessThanOrEqual(3);
    });
});

test('every hotel has all its fields and ids are unique', () => {
  const ids = allHotels.map((hotel) => hotel.id);

  expect(new Set(ids).size).toBe(ids.length);
  allHotels.forEach((hotel) => {
    ['name', 'address', 'currency'].forEach((field) => expect(hotel[field].trim()).not.toBe(''));
    expect(hotel.stars).toBeGreaterThanOrEqual(1);
    expect(hotel.stars).toBeLessThanOrEqual(5);
    expect(hotel.checkIn).toMatch(isoDate);
    expect(hotel.checkOut > hotel.checkIn).toBe(true);
    expect(hotel.pricePerNight).toBeGreaterThan(0);
    expect(Number.isInteger(hotel.roomsAvailable)).toBe(true);
    expect(hotel.amenities.length).toBeGreaterThan(0);
  });
});

test('there are at least 2 sold out hotels and some with few rooms', () => {
  expect(allHotels.filter((hotel) => hotel.roomsAvailable === 0).length).toBeGreaterThanOrEqual(2);
  expect(allHotels.some((hotel) => hotel.roomsAvailable >= 1 && hotel.roomsAvailable <= 3)).toBe(true);
});

test('ciudad-del-cabo has every hotel sold out', () => {
  expect(hotelsByDestination['ciudad-del-cabo'].every((hotel) => hotel.roomsAvailable === 0)).toBe(true);
});
