import { createContext, useContext, useEffect, useState } from 'react';
import {
  chooseFlight,
  chooseHotel,
  clearTrip,
  countTripItems,
  removeFlight,
  removeHotel,
  replacesTrip,
} from '../tripState';
import { readStoredTrip, writeStoredTrip } from '../tripStorage';

const TripContext = createContext(null);

function hasUnits(units) {
  return units > 0;
}

export function TripProvider(props) {
  const [trip, setTrip] = useState(() => readStoredTrip(localStorage));
  const [notice, setNotice] = useState(null);

  useEffect(
    function saveTrip() {
      writeStoredTrip(localStorage, trip);
    },
    [trip]
  );

  function chooseOffer(destination, transition) {
    setNotice(
      replacesTrip(trip, destination.slug)
        ? { previousName: trip.destination.name, newName: destination.name }
        : null
    );
    setTrip(transition);
  }

  function chooseFlightOffer(destination, flight) {
    if (hasUnits(flight.seatsAvailable)) {
      chooseOffer(destination, chooseFlight(trip, destination, flight));
    }
  }

  function chooseHotelOffer(destination, hotel) {
    if (hasUnits(hotel.roomsAvailable)) {
      chooseOffer(destination, chooseHotel(trip, destination, hotel));
    }
  }

  const value = {
    trip,
    itemCount: countTripItems(trip),
    notice,
    chooseFlight: chooseFlightOffer,
    chooseHotel: chooseHotelOffer,
    removeFlight: () => setTrip(removeFlight(trip)),
    removeHotel: () => setTrip(removeHotel(trip)),
    clearTrip: () => setTrip(clearTrip()),
    dismissNotice: () => setNotice(null),
  };

  return <TripContext.Provider value={value}>{props.children}</TripContext.Provider>;
}

export function useTrip() {
  const value = useContext(TripContext);
  if (value === null) {
    throw new Error('useTrip debe usarse dentro de TripProvider');
  }
  return value;
}
