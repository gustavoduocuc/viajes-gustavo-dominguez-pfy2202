import { Button } from '../../ui/Button/Button';
import { useTrip } from '../TripProvider/TripProvider';

const noticeClass =
  'mt-4 flex flex-col gap-3 rounded-card border-2 border-highlight bg-surface p-4 sm:flex-row sm:items-center sm:justify-between';

export function TripNotice(props) {
  const trip = useTrip();

  function closeNotice() {
    trip.dismissNotice();
    props.onClosed();
  }

  return (
    <div role="status">
      {trip.notice && (
        <div className={noticeClass}>
          <p className="text-base">
            Se reemplazó tu viaje a {trip.notice.previousName} por una oferta de {trip.notice.newName}.
          </p>
          <Button variant="outline" onClick={closeNotice}>
            Cerrar aviso
          </Button>
        </div>
      )}
    </div>
  );
}
