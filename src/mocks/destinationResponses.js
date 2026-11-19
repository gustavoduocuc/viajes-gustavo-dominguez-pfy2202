import { findDestinationBySlug, listDestinationSummaries } from './destinationQueries';

// Fallos simulados (solo fuera de producción):
// - Detalle: abrir /destinos/error-500.
// - Lista: en la consola del navegador, localStorage.mockFail = 'destinations' (y recargar).
// - GraphQL (vuelos y hoteles): localStorage.mockFail = 'graphql' (ver offersResponses.js).
export const simulatedErrorSlug = 'error-500';
export const failStorageKey = 'mockFail';
export const failListValue = 'destinations';
export const failGraphqlValue = 'graphql';

const serverError = { status: 500, body: { message: 'Error simulado del servidor.' } };

function isDevelopment() {
  return process.env.NODE_ENV !== 'production';
}

function readFailFlag(storage) {
  try {
    return storage.getItem(failStorageKey);
  } catch {
    return null;
  }
}

export function listDestinationsResponse(storage) {
  if (isDevelopment() && readFailFlag(storage) === failListValue) {
    return serverError;
  }
  return { status: 200, body: listDestinationSummaries() };
}

export function destinationResponse(slug) {
  if (isDevelopment() && slug === simulatedErrorSlug) {
    return serverError;
  }
  const destination = findDestinationBySlug(slug);
  if (!destination) {
    return { status: 404, body: { message: `El destino «${slug}» no existe.` } };
  }
  return { status: 200, body: destination };
}
