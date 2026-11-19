import { useQuery } from '@apollo/client/react';
import { useParams } from 'react-router';
import { getDestinationOffers } from '../../graphql/queries';
import { Card } from '../../ui/Card/Card';
import { StatusMessage } from '../../ui/StatusMessage/StatusMessage';
import { TextLink } from '../../ui/TextLink/TextLink';
import { PriceTag } from '../PriceTag/PriceTag';
import { summarizeOffers } from '../summarizeOffers';

function countLabel(count, singular, plural) {
  return count === 1 ? `1 ${singular}` : `${count} ${plural}`;
}

function SummaryItem(props) {
  return (
    <Card className="flex flex-col gap-2 p-4">
      <h3 className="font-serif text-lg font-bold">{props.title}</h3>
      <p className="text-base">{props.count}</p>
      {props.cheapest ? (
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-sm text-muted">desde</span>
          <PriceTag amount={props.cheapest.amount} currency={props.cheapest.currency} suffix={props.suffix} />
        </div>
      ) : (
        <p className="text-sm font-semibold text-muted">Sin disponibilidad</p>
      )}
      <TextLink to={props.to}>{props.linkLabel}</TextLink>
    </Card>
  );
}

function OffersSummaryContent(props) {
  const summary = summarizeOffers(props.offers.flights, props.offers.hotels);

  if (summary.flightCount === 0 && summary.hotelCount === 0) {
    return <StatusMessage kind="empty" message="Este destino aún no tiene vuelos ni hoteles." />;
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <SummaryItem
        title="Vuelos"
        count={countLabel(summary.flightCount, 'vuelo', 'vuelos')}
        cheapest={summary.cheapestFlight}
        to="vuelos"
        linkLabel="Ver vuelos"
      />
      <SummaryItem
        title="Hoteles"
        count={countLabel(summary.hotelCount, 'hotel', 'hoteles')}
        cheapest={summary.cheapestHotel}
        suffix="por noche"
        to="hoteles"
        linkLabel="Ver hoteles"
      />
    </div>
  );
}

export function DestinationOffersSummary() {
  const params = useParams();
  const query = useQuery(getDestinationOffers, { variables: { destination: params.slug } });

  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-serif text-xl font-bold">Vuelos y hoteles</h2>
      {query.loading && <StatusMessage kind="loading" message="Cargando ofertas…" />}
      {query.error && <StatusMessage kind="error" message={query.error.message} />}
      {query.data && <OffersSummaryContent offers={query.data.destinationOffers} />}
    </section>
  );
}
