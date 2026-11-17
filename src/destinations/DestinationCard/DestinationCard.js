import { Link } from 'react-router';
import { Card } from '../../ui/Card/Card';
import { focusRingClass } from '../../ui/focusRing';
import { ActivityList } from '../ActivityList/ActivityList';
import { CountryBadge } from '../CountryBadge/CountryBadge';
import { DestinationCover } from '../DestinationCover/DestinationCover';

const maxCardActivities = 3;
const titleLinkClass = `rounded font-serif text-xl font-bold text-text transition-colors duration-200 hover:text-accent ${focusRingClass}`;

export function DestinationCard(props) {
  const Heading = props.headingAs ?? 'h2';
  const destination = props.destination;

  return (
    <Card as="article" className="flex h-full flex-col overflow-hidden">
      <DestinationCover region={destination.region} />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <Heading>
          <Link className={titleLinkClass} to={`/destinos/${destination.slug}`}>
            {destination.name}
          </Link>
        </Heading>
        <CountryBadge country={destination.country} region={destination.region} />
        <ActivityList activities={destination.popularActivities} limit={maxCardActivities} />
      </div>
    </Card>
  );
}
