import { useQuery } from '@apollo/client/react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { getHotels } from '../../graphql/queries';
import { StatusMessage } from '../../ui/StatusMessage/StatusMessage';
import { HotelCard } from '../HotelCard/HotelCard';
import { OffersFilters } from '../OffersFilters/OffersFilters';
import { offersGridClass } from '../offersGridClass';

function countLabel(count) {
  return count === 1 ? '1 hotel' : `${count} hoteles`;
}

function HotelsContent(props) {
  const query = props.query;

  if (query.loading) {
    return <StatusMessage kind="loading" message="Cargando hoteles…" />;
  }
  if (query.error) {
    return <StatusMessage kind="error" message={query.error.message} />;
  }
  const hotels = query.data.hotels;
  if (hotels.length === 0) {
    const message = props.hasFilter
      ? 'No hay hoteles disponibles. Desactiva el filtro para verlos todos.'
      : 'Este destino aún no tiene hoteles.';
    return <StatusMessage kind="empty" message={message} />;
  }
  return (
    <>
      <p className="text-sm text-muted" role="status">
        {countLabel(hotels.length)}
      </p>
      <ul className={offersGridClass}>
        {hotels.map((hotel) => (
          <li key={hotel.id}>
            <HotelCard hotel={hotel} />
          </li>
        ))}
      </ul>
    </>
  );
}

export function HotelsPage() {
  const params = useParams();
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const query = useQuery(getHotels, {
    variables: { destination: params.slug, onlyAvailable: onlyAvailable || undefined },
  });

  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-serif text-xl font-bold">Hoteles</h2>
      <OffersFilters onlyAvailable={onlyAvailable} onOnlyAvailableChange={setOnlyAvailable} />
      <HotelsContent hasFilter={onlyAvailable} query={query} />
    </section>
  );
}
