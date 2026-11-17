import { DestinationGrid } from '../../destinations/DestinationGrid/DestinationGrid';
import { useDestinations } from '../../destinations/useDestinations';
import { PageTitle } from '../../ui/PageTitle/PageTitle';
import { StatusMessage } from '../../ui/StatusMessage/StatusMessage';
import { TextLink } from '../../ui/TextLink/TextLink';

const featuredCount = 3;
const errorFallbackMessage = 'No se pudieron cargar los destinos destacados.';

function FeaturedDestinations(props) {
  const remote = props.remote;

  if (remote.status === 'loading') {
    return <StatusMessage kind="loading" message="Cargando destinos destacados…" />;
  }
  if (remote.status === 'error') {
    return <StatusMessage kind="error" message={remote.error.message || errorFallbackMessage} />;
  }
  if (remote.status === 'empty') {
    return <StatusMessage kind="empty" message="Aún no hay destinos destacados." />;
  }
  return <DestinationGrid destinations={remote.data.slice(0, featuredCount)} headingAs="h3" />;
}

export function HomePage() {
  const remote = useDestinations();

  return (
    <div className="flex flex-col gap-section">
      <section className="flex max-w-reading flex-col items-start gap-3">
        <PageTitle>Agencia de viajes</PageTitle>
        <p className="text-base leading-relaxed text-muted">
          Descubre destinos para tu próxima aventura: ciudades históricas, islas y paisajes de todo el mundo.
        </p>
        <TextLink to="/destinos">Explorar destinos</TextLink>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="font-serif text-xl font-bold">Destinos destacados</h2>
        <FeaturedDestinations remote={remote} />
      </section>
    </div>
  );
}
