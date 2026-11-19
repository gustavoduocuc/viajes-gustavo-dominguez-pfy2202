import { gql } from '@apollo/client';

export const getFlights = gql`
  query GetFlights($destination: String!, $date: String) {
    flights(destination: $destination, date: $date) {
      id
      airline
      origin
      departureDate
      returnDate
      price
      currency
      seatsAvailable
    }
  }
`;

export const getHotels = gql`
  query GetHotels($destination: String!, $onlyAvailable: Boolean) {
    hotels(destination: $destination, onlyAvailable: $onlyAvailable) {
      id
      name
      stars
      address
      checkIn
      checkOut
      pricePerNight
      currency
      roomsAvailable
      amenities
    }
  }
`;

// El resumen pide solo lo necesario para contar y calcular el precio "desde".
export const getDestinationOffers = gql`
  query GetDestinationOffers($destination: String!) {
    destinationOffers(destination: $destination) {
      flights {
        id
        price
        currency
        seatsAvailable
      }
      hotels {
        id
        pricePerNight
        currency
        roomsAvailable
      }
    }
  }
`;
