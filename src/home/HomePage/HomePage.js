import { EmptyState } from '../../ui/EmptyState/EmptyState';
import { PageTitle } from '../../ui/PageTitle/PageTitle';

// Home provisoria mientras se construyen los dominios de la agencia.
export function HomePage() {
  return (
    <section className="flex flex-col gap-section">
      <PageTitle>Agencia de viajes</PageTitle>
      <EmptyState message="Sitio en construcción." role="status" />
    </section>
  );
}
