import { failGraphqlValue, failStorageKey } from './destinationResponses';
import { findOffers, isKnownDestination, listFlights, listHotels } from './offersQueries';

const serverErrorBody = { errors: [{ message: 'Error simulado del servidor GraphQL.' }] };

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

function withTypename(typename, record) {
  return { __typename: typename, ...record };
}

function unknownDestinationBody(slug) {
  return { errors: [{ message: `El destino «${slug}» no existe.` }] };
}

function respond(variables, storage, buildData) {
  if (isDevelopment() && readFailFlag(storage) === failGraphqlValue) {
    return serverErrorBody;
  }
  if (!isKnownDestination(variables.destination)) {
    return unknownDestinationBody(variables.destination);
  }
  return { data: buildData() };
}

export function flightsResponse(variables, storage) {
  return respond(variables, storage, () => ({
    flights: listFlights(variables.destination, variables.date).map((flight) => withTypename('Flight', flight)),
  }));
}

export function hotelsResponse(variables, storage) {
  return respond(variables, storage, () => ({
    hotels: listHotels(variables.destination, variables.onlyAvailable).map((hotel) =>
      withTypename('Hotel', hotel)
    ),
  }));
}

export function destinationOffersResponse(variables, storage) {
  return respond(variables, storage, () => {
    const offers = findOffers(variables.destination);
    return {
      destinationOffers: withTypename('DestinationOffers', {
        flights: offers.flights.map((flight) => withTypename('Flight', flight)),
        hotels: offers.hotels.map((hotel) => withTypename('Hotel', hotel)),
      }),
    };
  });
}
