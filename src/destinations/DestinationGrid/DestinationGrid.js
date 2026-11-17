import { DestinationCard } from '../DestinationCard/DestinationCard';

export function DestinationGrid(props) {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {props.destinations.map(function renderDestination(destination) {
        return (
          <li key={destination.slug}>
            <DestinationCard destination={destination} headingAs={props.headingAs} />
          </li>
        );
      })}
    </ul>
  );
}
