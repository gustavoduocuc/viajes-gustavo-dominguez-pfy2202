const isoDate = /^\d{4}-\d{2}-\d{2}$/;
const millisecondsPerDay = 24 * 60 * 60 * 1000;
const centsFactor = 100;

function toUtcTime(date) {
  const [year, month, day] = date.split('-').map(Number);
  return Date.UTC(year, month - 1, day);
}

export function calculateNights(checkIn, checkOut) {
  if (!isoDate.test(checkIn) || !isoDate.test(checkOut)) {
    return 0;
  }
  const nights = Math.round((toUtcTime(checkOut) - toUtcTime(checkIn)) / millisecondsPerDay);
  return Math.max(nights, 0);
}

function roundToCents(amount) {
  return Math.round(amount * centsFactor) / centsFactor;
}

function sumPresent(amounts) {
  return roundToCents(amounts.filter((amount) => amount !== null).reduce((sum, amount) => sum + amount, 0));
}

export function calculateTripTotal(trip) {
  if (!trip.flight && !trip.hotel) {
    return null;
  }
  const nights = trip.hotel ? calculateNights(trip.hotel.checkIn, trip.hotel.checkOut) : 0;
  const flightAmount = trip.flight ? trip.flight.price : null;
  const hotelAmount = trip.hotel ? roundToCents(nights * trip.hotel.pricePerNight) : null;
  const currencies = [trip.flight, trip.hotel].filter(Boolean).map((part) => part.currency);
  const hasMixedCurrencies = new Set(currencies).size > 1;

  return {
    nights,
    flightAmount,
    hotelAmount,
    total: hasMixedCurrencies ? null : sumPresent([flightAmount, hotelAmount]),
    currency: hasMixedCurrencies ? null : currencies[0],
    hasMixedCurrencies,
  };
}
