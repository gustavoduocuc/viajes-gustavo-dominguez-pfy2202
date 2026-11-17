import { useState } from 'react';
import { Button } from '../../ui/Button/Button';
import { EmptyState } from '../../ui/EmptyState/EmptyState';
import { PageTitle } from '../../ui/PageTitle/PageTitle';
import { SelectField } from '../../ui/SelectField/SelectField';
import { StatusMessage } from '../../ui/StatusMessage/StatusMessage';
import { DestinationGrid } from '../DestinationGrid/DestinationGrid';
import { allOption, filterDestinations, listFilterOptions } from '../filterDestinations';
import { useDestinations } from '../useDestinations';

const errorFallbackMessage = 'No se pudieron cargar los destinos.';

function countLabel(count) {
  return count === 1 ? '1 destino' : `${count} destinos`;
}

function DestinationsExplorer(props) {
  const [region, setRegion] = useState(allOption);
  const [country, setCountry] = useState(allOption);
  const visibleDestinations = filterDestinations(props.destinations, { region, country });

  function clearFilters() {
    setRegion(allOption);
    setCountry(allOption);
  }

  return (
    <>
      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="mb-2 font-serif text-lg font-bold">Filtrar destinos</legend>
        <SelectField
          label="Región"
          name="region"
          options={listFilterOptions(props.destinations, 'region')}
          value={region}
          onChange={(event) => setRegion(event.target.value)}
        />
        <SelectField
          label="País"
          name="country"
          options={listFilterOptions(props.destinations, 'country')}
          value={country}
          onChange={(event) => setCountry(event.target.value)}
        />
      </fieldset>
      <p className="text-sm text-muted" role="status">
        {countLabel(visibleDestinations.length)}
      </p>
      {visibleDestinations.length === 0 ? (
        <EmptyState message="No hay destinos para esta combinación de filtros.">
          <Button variant="outline" onClick={clearFilters}>
            Limpiar filtros
          </Button>
        </EmptyState>
      ) : (
        <DestinationGrid destinations={visibleDestinations} />
      )}
    </>
  );
}

function DestinationsContent(props) {
  const remote = props.remote;

  if (remote.status === 'loading') {
    return <StatusMessage kind="loading" message="Cargando destinos…" />;
  }
  if (remote.status === 'error') {
    return (
      <StatusMessage
        kind="error"
        message={remote.error.message || errorFallbackMessage}
        backTo="/"
        backLabel="Volver a Inicio"
      />
    );
  }
  if (remote.status === 'empty') {
    return (
      <StatusMessage kind="empty" message="No hay destinos disponibles." backTo="/" backLabel="Volver a Inicio" />
    );
  }
  return <DestinationsExplorer destinations={remote.data} />;
}

export function DestinationsPage() {
  const remote = useDestinations();

  return (
    <section className="flex flex-col gap-section">
      <PageTitle>Destinos</PageTitle>
      <DestinationsContent remote={remote} />
    </section>
  );
}
