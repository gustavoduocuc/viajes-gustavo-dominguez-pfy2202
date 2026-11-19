export const emptyTrip = { destination: null, flight: null, hotel: null };

const flightFields = [
  'id',
  'airline',
  'origin',
  'departureDate',
  'returnDate',
  'price',
  'currency',
  'seatsAvailable',
];
const hotelFields = [
  'id',
  'name',
  'stars',
  'address',
  'checkIn',
  'checkOut',
  'pricePerNight',
  'currency',
  'roomsAvailable',
  'amenities',
];
const destinationFields = ['slug', 'name', 'country', 'region'];

function pickFields(record, fields) {
  return Object.fromEntries(fields.map((field) => [field, record[field]]));
}

export function pickFlight(flight) {
  return pickFields(flight, flightFields);
}

export function pickHotel(hotel) {
  const picked = pickFields(hotel, hotelFields);
  return { ...picked, amenities: [...hotel.amenities] };
}

export function pickDestination(destination) {
  return pickFields(destination, destinationFields);
}

export function countTripItems(trip) {
  return [trip.flight, trip.hotel].filter(Boolean).length;
}

export function isTripEmpty(trip) {
  return countTripItems(trip) === 0;
}

export function replacesTrip(trip, destinationSlug) {
  return trip.destination !== null && trip.destination.slug !== destinationSlug;
}

function baseFor(trip, destination) {
  return replacesTrip(trip, destination.slug) ? emptyTrip : trip;
}

export function chooseFlight(trip, destination, flight) {
  return { ...baseFor(trip, destination), destination: pickDestination(destination), flight: pickFlight(flight) };
}

export function chooseHotel(trip, destination, hotel) {
  return { ...baseFor(trip, destination), destination: pickDestination(destination), hotel: pickHotel(hotel) };
}

function withoutEmptyDestination(trip) {
  return isTripEmpty(trip) ? emptyTrip : trip;
}

export function removeFlight(trip) {
  return withoutEmptyDestination({ ...trip, flight: null });
}

export function removeHotel(trip) {
  return withoutEmptyDestination({ ...trip, hotel: null });
}

export function clearTrip() {
  return emptyTrip;
}
