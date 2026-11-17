import { useOutletContext } from 'react-router';
import { ActivityList } from '../ActivityList/ActivityList';

export function DestinationOverview() {
  const destination = useOutletContext();

  return (
    <div className="flex flex-col gap-section">
      <section className="flex max-w-reading flex-col gap-2">
        <h2 className="font-serif text-xl font-bold">Acerca del destino</h2>
        <p className="text-base leading-relaxed">{destination.description}</p>
      </section>
      <section className="flex flex-col gap-2">
        <h2 className="font-serif text-xl font-bold">Actividades populares</h2>
        <ActivityList activities={destination.popularActivities} />
      </section>
    </div>
  );
}
