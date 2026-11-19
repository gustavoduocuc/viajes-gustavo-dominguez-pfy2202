import { delay, graphql, http, HttpResponse } from 'msw';
import { destinationResponse, listDestinationsResponse } from './destinationResponses';
import { destinationOffersResponse, flightsResponse, hotelsResponse } from './offersResponses';

export const destinationsDelayMs = 600;
export const destinationDelayMs = 400;
export const flightsDelayMs = 500;
export const hotelsDelayMs = 500;
export const offersDelayMs = 700;

// Fallos simulados (solo en desarrollo): ver destinationResponses.js.
// REST — detalle: abrir /destinos/error-500. Lista: localStorage.mockFail = 'destinations'.
// GraphQL (vuelos y hoteles): localStorage.mockFail = 'graphql'.

function respondWith(response) {
  return HttpResponse.json(response.body, { status: response.status });
}

export const handlers = [
  http.get('/api/destinations', async function listDestinations() {
    await delay(destinationsDelayMs);
    return respondWith(listDestinationsResponse(localStorage));
  }),
  http.get('/api/destinations/:slug', async function showDestination(info) {
    await delay(destinationDelayMs);
    return respondWith(destinationResponse(info.params.slug));
  }),
  graphql.query('GetFlights', async function getFlights(info) {
    await delay(flightsDelayMs);
    return HttpResponse.json(flightsResponse(info.variables, localStorage));
  }),
  graphql.query('GetHotels', async function getHotels(info) {
    await delay(hotelsDelayMs);
    return HttpResponse.json(hotelsResponse(info.variables, localStorage));
  }),
  graphql.query('GetDestinationOffers', async function getDestinationOffers(info) {
    await delay(offersDelayMs);
    return HttpResponse.json(destinationOffersResponse(info.variables, localStorage));
  }),
];
