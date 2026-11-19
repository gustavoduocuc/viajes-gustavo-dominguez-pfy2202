import { useQuery } from '@apollo/client/react';
import { useState } from 'react';
import { useOutletContext, useParams } from 'react-router';
import { getFlights } from '../../graphql/queries';
import { useTrip } from '../../trip/TripProvider/TripProvider';
import { StatusMessage } from '../../ui/StatusMessage/StatusMessage';
import { FlightCard } from '../FlightCard/FlightCard';
import { OffersFilters } from '../OffersFilters/OffersFilters';
import { offersGridClass } from '../offersGridClass';

function countLabel(count) {
  return count === 1 ? '1 vuelo' : `${count} vuelos`;
}

function FlightsContent(props) {
  const query = props.query;

  if (query.loading) {
    return <StatusMessage kind="loading" message="Cargando vuelos…" />;
  }
  if (query.error) {
    return <StatusMessage kind="error" message={query.error.message} />;
  }
  const flights = query.data.flights;
  if (flights.length === 0) {
    const message = props.hasFilter
      ? 'No hay vuelos desde esa fecha. Prueba con otra fecha.'
      : 'Este destino aún no tiene vuelos.';
    return <StatusMessage kind="empty" message={message} />;
  }
  return (
    <>
      <p className="text-sm text-muted" role="status">
        {countLabel(flights.length)}
      </p>
      <ul className={offersGridClass}>
        {flights.map((flight) => (
          <li key={flight.id}>
            <FlightCard
              flight={flight}
              isChosen={props.trip.trip.flight?.id === flight.id}
              onChoose={() => props.trip.chooseFlight(props.destination, flight)}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

export function FlightsPage() {
  const params = useParams();
  const destination = useOutletContext();
  const trip = useTrip();
  const [departureDate, setDepartureDate] = useState('');
  const query = useQuery(getFlights, {
    variables: { destination: params.slug, date: departureDate || undefined },
  });

  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-serif text-xl font-bold">Vuelos</h2>
      <OffersFilters departureDate={departureDate} onDepartureDateChange={setDepartureDate} />
      <FlightsContent destination={destination} hasFilter={departureDate !== ''} query={query} trip={trip} />
    </section>
  );
}
