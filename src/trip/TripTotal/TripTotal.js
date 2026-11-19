import { formatPrice } from '../../offers/formatPrice';
import { Card } from '../../ui/Card/Card';
import { calculateTripTotal } from '../tripCalculations';
import { partHeadingClass } from '../TripPartCard/TripPartCard';

function nightsLabel(nights) {
  return nights === 1 ? '1 noche' : `${nights} noches`;
}

function Row(props) {
  return (
    <div className="flex flex-wrap justify-between gap-x-4">
      <dt className="text-muted">{props.label}</dt>
      <dd className="font-semibold">{props.value}</dd>
    </div>
  );
}

function missingParts(trip) {
  return [trip.flight ? null : 'un vuelo', trip.hotel ? null : 'un hotel'].filter(Boolean);
}

export function TripTotal(props) {
  const trip = props.trip;
  const summary = calculateTripTotal(trip);
  const missing = missingParts(trip);

  return (
    <section aria-labelledby="trip-total-heading">
      <Card className="flex flex-col gap-3 p-4">
        <h2 className={partHeadingClass} id="trip-total-heading">
          Total estimado
        </h2>
        <dl className="flex flex-col gap-2 text-base">
          {trip.flight && <Row label="Vuelo" value={formatPrice(summary.flightAmount, trip.flight.currency)} />}
          {trip.hotel && (
            <Row
              label={`Hotel ${nightsLabel(summary.nights)} × ${formatPrice(trip.hotel.pricePerNight, trip.hotel.currency)}`}
              value={formatPrice(summary.hotelAmount, trip.hotel.currency)}
            />
          )}
          {!summary.hasMixedCurrencies && (
            <div className="flex flex-wrap justify-between gap-x-4 border-t pt-2">
              <dt className="font-semibold">Total estimado</dt>
              <dd className="font-serif text-xl font-bold text-accent">{formatPrice(summary.total, summary.currency)}</dd>
            </div>
          )}
        </dl>
        {summary.hasMixedCurrencies && (
          <p className="text-base text-danger" role="alert">
            No se puede calcular el total: el vuelo y el hotel usan monedas distintas.
          </p>
        )}
        {missing.length > 0 && <p className="text-sm text-muted">Falta elegir {missing.join(' y ')}.</p>}
        <p className="text-sm text-muted">Estimación para 1 pasajero y 1 habitación.</p>
      </Card>
    </section>
  );
}
