import { destinations } from '../data/destinations';
import { flightsByDestination } from '../data/flights';
import { hotelsByDestination } from '../data/hotels';
import { pickDestination, pickFlight, pickHotel } from '../trip/tripState';
import { writeStoredTrip } from '../trip/tripStorage';

function findDestination(slug) {
  return pickDestination(destinations.find((destination) => destination.slug === slug));
}

// Guarda en localStorage un viaje armado con datos semilla, como si se hubiera elegido antes de refrescar.
export function storeTrip(slug, parts) {
  const trip = {
    destination: findDestination(slug),
    flight: parts.flightId ? pickFlight(flightsByDestination[slug].find((flight) => flight.id === parts.flightId)) : null,
    hotel: parts.hotelId ? pickHotel(hotelsByDestination[slug].find((hotel) => hotel.id === parts.hotelId)) : null,
  };
  writeStoredTrip(localStorage, trip);
  return trip;
}

export const cuscoFlightId = 'fl-cusco-01';
export const cuscoHotelId = 'ht-cusco-01';
