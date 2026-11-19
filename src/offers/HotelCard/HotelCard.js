import { ChooseButton } from '../../trip/ChooseButton/ChooseButton';
import { Card } from '../../ui/Card/Card';
import { ActivityList } from '../../destinations/ActivityList/ActivityList';
import { AvailabilityBadge } from '../AvailabilityBadge/AvailabilityBadge';
import { DateRange } from '../DateRange/DateRange';
import { PriceTag } from '../PriceTag/PriceTag';
import { StarRating } from '../StarRating/StarRating';

const contentClass = 'flex h-full flex-col gap-3 p-4';
export function HotelCard(props) {
  const Heading = props.headingAs ?? 'h3';
  const hotel = props.hotel;
  const isSoldOut = hotel.roomsAvailable === 0;

  return (
    <Card as="article" className={contentClass} disabled={isSoldOut} highlighted={props.isChosen}>
      <div>
        <Heading className="font-serif text-lg font-bold">{hotel.name}</Heading>
        <StarRating count={hotel.stars} />
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
