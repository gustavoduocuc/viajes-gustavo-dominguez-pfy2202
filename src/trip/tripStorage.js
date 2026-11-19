import { emptyTrip } from './tripState';

export const tripStorageKey = 'viajes.trip';
const storageVersion = 1;
const isoDate = /^\d{4}-\d{2}-\d{2}$/;

function isText(value) {
  return typeof value === 'string' && value.trim() !== '';
}

function isMoney(value) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}

function isCount(value) {
  return Number.isInteger(value) && value >= 0;
}

function isDate(value) {
  return typeof value === 'string' && isoDate.test(value);
}

function isDestination(value) {
  return Boolean(value) && ['slug', 'name', 'country', 'region'].every((field) => isText(value[field]));
}

function isFlight(value) {
  return (
    Boolean(value) &&
    ['id', 'airline', 'origin', 'currency'].every((field) => isText(value[field])) &&
    isDate(value.departureDate) &&
    isDate(value.returnDate) &&
    isMoney(value.price) &&
    isCount(value.seatsAvailable)
  );
}

function isHotel(value) {
  return (
    Boolean(value) &&
    ['id', 'name', 'address', 'currency'].every((field) => isText(value[field])) &&
    Number.isInteger(value.stars) &&
    value.stars >= 1 &&
    value.stars <= 5 &&
    isDate(value.checkIn) &&
    isDate(value.checkOut) &&
    isMoney(value.pricePerNight) &&
    isCount(value.roomsAvailable) &&
    Array.isArray(value.amenities) &&
    value.amenities.every(isText)
  );
}

function isValidTrip(value) {
  if (!value || value.version !== storageVersion) {
    return false;
  }
  const hasParts = Boolean(value.flight) || Boolean(value.hotel);
  if (!hasParts) {
    return value.destination === null;
  }
  return (
    isDestination(value.destination) &&
    (value.flight === null || isFlight(value.flight)) &&
    (value.hotel === null || isHotel(value.hotel))
  );
}

export function parseStoredTrip(value) {
  if (!isValidTrip(value)) {
    return emptyTrip;
  }
  return { destination: value.destination, flight: value.flight, hotel: value.hotel };
}

export function readStoredTrip(storage) {
  try {
    const rawValue = storage.getItem(tripStorageKey);
    return rawValue === null ? emptyTrip : parseStoredTrip(JSON.parse(rawValue));
  } catch {
    return emptyTrip;
  }
}

export function writeStoredTrip(storage, trip) {
  try {
    storage.setItem(tripStorageKey, JSON.stringify({ version: storageVersion, ...trip }));
  } catch {
    // Sin almacenamiento el viaje sigue funcionando durante la visita.
  }
}
