import { flightsByDestination } from '../data/flights';
import { hotelsByDestination } from '../data/hotels';
import { findDestinationBySlug } from './destinationQueries';

export function isKnownDestination(slug) {
  return findDestinationBySlug(slug) !== undefined;
}

export function listFlights(slug, date) {
  const flights = flightsByDestination[slug] ?? [];
  if (!date) {
    return flights;
  }
  return flights.filter((flight) => flight.departureDate >= date);
}

export function listHotels(slug, onlyAvailable) {
  const hotels = hotelsByDestination[slug] ?? [];
  if (!onlyAvailable) {
    return hotels;
  }
  return hotels.filter((hotel) => hotel.roomsAvailable > 0);
}

export function findOffers(slug) {
  return { flights: listFlights(slug), hotels: listHotels(slug) };
}
