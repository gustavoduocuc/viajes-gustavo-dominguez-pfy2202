import { Card } from '../../ui/Card/Card';
import { AvailabilityBadge } from '../AvailabilityBadge/AvailabilityBadge';
import { DateRange } from '../DateRange/DateRange';
import { PriceTag } from '../PriceTag/PriceTag';

const contentClass = 'flex h-full flex-col gap-3 p-4';

export function FlightCard(props) {
  const Heading = props.headingAs ?? 'h3';
  const flight = props.flight;
  const isSoldOut = flight.seatsAvailable === 0;

  return (
    <Card as="article" className={contentClass} disabled={isSoldOut}>
      <div>
        <Heading className="font-serif text-lg font-bold">{flight.airline}</Heading>
        <p className="text-sm text-muted">Desde {flight.origin}</p>
      </div>
      <DateRange start={flight.departureDate} end={flight.returnDate} startLabel="Salida" endLabel="Regreso" />
      <PriceTag amount={flight.price} currency={flight.currency} />
      <AvailabilityBadge units={flight.seatsAvailable} singularUnit="asiento" pluralUnit="asientos" />
    </Card>
  );
}
