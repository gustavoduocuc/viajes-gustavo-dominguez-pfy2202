import { useEffect, useRef, useState } from 'react';
import { DateRange } from '../../offers/DateRange/DateRange';
import { PriceTag } from '../../offers/PriceTag/PriceTag';
import { StarRating } from '../../offers/StarRating/StarRating';
import { Button } from '../../ui/Button/Button';
import { EmptyState } from '../../ui/EmptyState/EmptyState';
import { TextLink } from '../../ui/TextLink/TextLink';
import { formatNights } from '../formatNights';
import { calculateNights } from '../tripCalculations';
import { countTripItems, isTripEmpty } from '../tripState';
import { useTrip } from '../TripProvider/TripProvider';
import { TripPartCard } from '../TripPartCard/TripPartCard';
import { TripTotal } from '../TripTotal/TripTotal';

function PartActions(props) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <TextLink to={props.changeTo}>{props.changeLabel}</TextLink>
      <Button ariaLabel={props.removeLabel} variant="outline" onClick={props.onRemove}>
        Quitar
      </Button>
    </div>
  );
}

function FlightPart(props) {
  const flight = props.flight;

  return (
    <>
      <div>
        <p className="font-serif text-lg font-bold">{flight.airline}</p>
        <p className="text-sm text-muted">Desde {flight.origin}</p>
      </div>
      <DateRange start={flight.departureDate} end={flight.returnDate} startLabel="Salida" endLabel="Regreso" />
      <PriceTag amount={flight.price} currency={flight.currency} />
      <PartActions
        changeLabel="Cambiar vuelo"
        changeTo={props.changeTo}
        removeLabel={`Quitar vuelo ${flight.airline}`}
        onRemove={props.onRemove}
      />
    </>
  );
}

function HotelPart(props) {
  const hotel = props.hotel;

  return (
    <>
      <div>
        <p className="font-serif text-lg font-bold">{hotel.name}</p>
        <StarRating count={hotel.stars} />
        <p className="text-sm text-muted">{hotel.address}</p>
      </div>
      <DateRange start={hotel.checkIn} end={hotel.checkOut} startLabel="Entrada" endLabel="Salida" />
      <p className="text-base font-semibold">{formatNights(calculateNights(hotel.checkIn, hotel.checkOut))}</p>
      <PriceTag amount={hotel.pricePerNight} currency={hotel.currency} suffix="por noche" />
      <PartActions
        changeLabel="Cambiar hotel"
        changeTo={props.changeTo}
        removeLabel={`Quitar hotel ${hotel.name}`}
        onRemove={props.onRemove}
      />
    </>
  );
}

export function TripPage() {
  const trip = useTrip();
  const [message, setMessage] = useState('');
  const [pendingFocus, setPendingFocus] = useState(null);
  const pageHeadingRef = useRef(null);
  const flightHeadingRef = useRef(null);
  const hotelHeadingRef = useRef(null);

  useEffect(
    function moveFocus() {
      const focusTargets = { page: pageHeadingRef, flight: flightHeadingRef, hotel: hotelHeadingRef };
      if (pendingFocus) {
        focusTargets[pendingFocus].current?.focus();
        setPendingFocus(null);
      }
    },
    [pendingFocus]
  );

  function removePart(remove, partName, partKey) {
    const willBeEmpty = countTripItems(trip.trip) === 1;
    remove();
    setMessage(`${partName} quitado del viaje`);
    setPendingFocus(willBeEmpty ? 'page' : partKey);
  }

  function clearAll() {
    trip.clearTrip();
    setMessage('Viaje vaciado');
    setPendingFocus('page');
  }

  const current = trip.trip;
  const destination = current.destination;

  return (
    <div className="flex flex-col gap-section">
      <h1 className="font-serif text-2xl font-bold outline-none md:text-3xl" ref={pageHeadingRef} tabIndex={-1}>
        Mi viaje
      </h1>
      <p className="text-sm text-muted" role="status">
        {message}
      </p>
      {isTripEmpty(current) ? (
        <EmptyState message="Aún no elegiste nada para tu viaje.">
          <TextLink to="/destinos">Explorar destinos</TextLink>
        </EmptyState>
      ) : (
        <>
          <TripPartCard id="destination" title="Destino">
            <p className="font-serif text-lg font-bold">{destination.name}</p>
            <p className="text-base text-muted">
              {destination.country} · {destination.region}
            </p>
            <div>
              <TextLink to={`/destinos/${destination.slug}`}>Ver destino</TextLink>
            </div>
          </TripPartCard>
          <TripPartCard
            chooseLabel="Elegir vuelo"
            chooseTo={`/destinos/${destination.slug}/vuelos`}
            emptyMessage="Aún no elegiste un vuelo."
            headingRef={flightHeadingRef}
            id="flight"
            title="Vuelo"
          >
            {current.flight && (
              <FlightPart
                changeTo={`/destinos/${destination.slug}/vuelos`}
                flight={current.flight}
                onRemove={() => removePart(trip.removeFlight, 'Vuelo', 'flight')}
              />
            )}
          </TripPartCard>
          <TripPartCard
            chooseLabel="Elegir hotel"
            chooseTo={`/destinos/${destination.slug}/hoteles`}
            emptyMessage="Aún no elegiste un hotel."
            headingRef={hotelHeadingRef}
            id="hotel"
            title="Hotel"
          >
            {current.hotel && (
              <HotelPart
                changeTo={`/destinos/${destination.slug}/hoteles`}
                hotel={current.hotel}
                onRemove={() => removePart(trip.removeHotel, 'Hotel', 'hotel')}
              />
            )}
          </TripPartCard>
          <TripTotal trip={current} />
          <div>
            <Button variant="danger" onClick={clearAll}>
              Vaciar viaje
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
