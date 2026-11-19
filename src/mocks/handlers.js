import { delay, http, HttpResponse } from 'msw';
import { destinationResponse, listDestinationsResponse } from './destinationResponses';

export const destinationsDelayMs = 600;
export const destinationDelayMs = 400;

// Fallos simulados (solo en desarrollo): ver destinationResponses.js.
// Detalle: abrir /destinos/error-500. Lista: localStorage.mockFail = 'destinations'.

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
];
