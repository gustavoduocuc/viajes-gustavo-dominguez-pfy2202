import { ChooseButton } from '../../trip/ChooseButton/ChooseButton';
import { Card } from '../../ui/Card/Card';
import { ActivityList } from '../../destinations/ActivityList/ActivityList';
import { AvailabilityBadge } from '../AvailabilityBadge/AvailabilityBadge';
import { DateRange } from '../DateRange/DateRange';
import { PriceTag } from '../PriceTag/PriceTag';

const contentClass = 'flex h-full flex-col gap-3 p-4';
const maxStars = 5;

function Stars(props) {
  const label = props.count === 1 ? '1 estrella' : `${props.count} estrellas`;

  return (
    <span aria-label={label} className="text-highlight" role="img">
      <span aria-hidden="true">{'★'.repeat(props.count)}</span>
      <span aria-hidden="true" className="text-field">
        {'☆'.repeat(maxStars - props.count)}
      </span>
    </span>
  );
}

export function HotelCard(props) {
  const Heading = props.headingAs ?? 'h3';
  const hotel = props.hotel;
  const isSoldOut = hotel.roomsAvailable === 0;

  return (
    <Card as="article" className={contentClass} disabled={isSoldOut} highlighted={props.isChosen}>
      <div>
        <Heading className="font-serif text-lg font-bold">{hotel.name}</Heading>
        <Stars count={hotel.stars} />
        <p className="text-sm text-muted">{hotel.address}</p>
      </div>
      <DateRange start={hotel.checkIn} end={hotel.checkOut} startLabel="Entrada" endLabel="Salida" />
      <PriceTag amount={hotel.pricePerNight} currency={hotel.currency} suffix="por noche" />
      <AvailabilityBadge units={hotel.roomsAvailable} singularUnit="habitación" pluralUnit="habitaciones" />
      <ActivityList activities={hotel.amenities} />
      <ChooseButton
        isChosen={props.isChosen}
        isSoldOut={isSoldOut}
        label={`Elegir hotel ${hotel.name}`}
        onChoose={props.onChoose}
      />
    </Card>
  );
}
