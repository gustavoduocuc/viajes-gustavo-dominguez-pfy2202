import { destinations } from '../data/destinations';
import { jsonResponse, mockFetch } from './mockFetch';
import { destinationResponse, listDestinationsResponse } from '../mocks/destinationResponses';

const noFailureStorage = { getItem: () => null };

function toFetchResponse(response) {
  return jsonResponse(response.status, response.body);
}

// Instala un fetch simulado con las mismas respuestas que la API mock; overrides reemplaza rutas.
export function mockDestinationsApi(overrides = {}) {
  const routes = {
    '/api/destinations': () => toFetchResponse(listDestinationsResponse(noFailureStorage)),
    '/api/destinations/no-existe': () => toFetchResponse(destinationResponse('no-existe')),
    '/api/destinations/error-500': () => toFetchResponse(destinationResponse('error-500')),
  };
  destinations.forEach(function addDetailRoute(destination) {
    routes[`/api/destinations/${destination.slug}`] = () => toFetchResponse(destinationResponse(destination.slug));
  });
  mockFetch({ ...routes, ...overrides });
}

export const neverResolves = () => new Promise(() => {});
