import { Outlet, useParams } from 'react-router';
import { PageTitle } from '../../ui/PageTitle/PageTitle';
import { StatusMessage } from '../../ui/StatusMessage/StatusMessage';
import { TextLink } from '../../ui/TextLink/TextLink';
import { CountryBadge } from '../CountryBadge/CountryBadge';
import { DestinationCover } from '../DestinationCover/DestinationCover';
import { useDestination } from '../useDestination';

const notFoundStatus = 404;
const errorFallbackMessage = 'No se pudo cargar el destino.';

function DestinationPlaceholder(props) {
  return (
    <section className="flex flex-col gap-section">
      <PageTitle>{props.title}</PageTitle>
      {props.children}
    </section>
  );
}

function DestinationDetail(props) {
  const destination = props.destination;

  return (
    <article className="flex flex-col gap-section">
      <TextLink to="/destinos">Volver a Destinos</TextLink>
      <header className="flex flex-col gap-3">
        <DestinationCover className="rounded-card" region={destination.region} />
        <PageTitle>{destination.name}</PageTitle>
        <CountryBadge country={destination.country} region={destination.region} />
      </header>
      <Outlet context={destination} />
    </article>
  );
}

export function DestinationLayout() {
  const params = useParams();
  const remote = useDestination(params.slug);

  if (remote.status === 'loading') {
    return (
      <DestinationPlaceholder title="Destino">
        <StatusMessage kind="loading" message="Cargando destino…" />
      </DestinationPlaceholder>
    );
  }
  if (remote.status === 'error' && remote.error.status === notFoundStatus) {
    return (
      <DestinationPlaceholder title="Destino no encontrado">
        <StatusMessage
          kind="empty"
          message={`No encontramos el destino «${params.slug}».`}
          backTo="/destinos"
          backLabel="Volver a Destinos"
        />
      </DestinationPlaceholder>
    );
  }
  if (remote.status === 'error') {
    return (
      <DestinationPlaceholder title="Destino">
        <StatusMessage
          kind="error"
          message={remote.error.message || errorFallbackMessage}
          backTo="/destinos"
          backLabel="Volver a Destinos"
        />
      </DestinationPlaceholder>
    );
  }
  return <DestinationDetail destination={remote.data} />;
}
