import { getDestinationOffers, getFlights, getHotels } from '../graphql/queries';
import { destinationOffersResponse, flightsResponse, hotelsResponse } from '../mocks/offersResponses';

const noFailureStorage = { getItem: () => null };

function toMockedResult(response) {
  if (response.errors) {
    return { errors: response.errors };
  }
  return { data: response.data };
}

function buildMock(query, variables, response) {
  return { request: { query, variables }, result: toMockedResult(response(variables, noFailureStorage)) };
}

export function flightsMock(destination, date) {
  const variables = date ? { destination, date } : { destination };
  return buildMock(getFlights, variables, flightsResponse);
}

export function hotelsMock(destination, onlyAvailable) {
  const variables = onlyAvailable ? { destination, onlyAvailable } : { destination };
  return buildMock(getHotels, variables, hotelsResponse);
}

export function offersMock(destination) {
  return buildMock(getDestinationOffers, { destination }, destinationOffersResponse);
}

export function serverErrorMock(query, variables, message = 'Error simulado del servidor GraphQL.') {
  return { request: { query, variables }, result: { errors: [{ message }] } };
}
