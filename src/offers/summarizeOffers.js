function pickCheapest(items, readPrice, readUnits) {
  const available = items.filter((item) => readUnits(item) > 0);
  if (available.length === 0) {
    return null;
  }
  const cheapest = available.reduce((best, item) => (readPrice(item) < readPrice(best) ? item : best));
  return { amount: readPrice(cheapest), currency: cheapest.currency };
}

export function summarizeOffers(flights, hotels) {
  return {
    flightCount: flights.length,
    hotelCount: hotels.length,
    cheapestFlight: pickCheapest(flights, (flight) => flight.price, (flight) => flight.seatsAvailable),
    cheapestHotel: pickCheapest(hotels, (hotel) => hotel.pricePerNight, (hotel) => hotel.roomsAvailable),
  };
}
