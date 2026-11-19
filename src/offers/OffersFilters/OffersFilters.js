import { CheckboxField } from '../../ui/CheckboxField/CheckboxField';
import { TextField } from '../../ui/TextField/TextField';

export function OffersFilters(props) {
  return (
    <fieldset className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-6">
      <legend className="mb-2 font-serif text-lg font-bold">Filtrar ofertas</legend>
      {props.onDepartureDateChange && (
        <TextField
          label="Salida desde"
          name="departureDate"
          type="date"
          value={props.departureDate}
          onChange={(event) => props.onDepartureDateChange(event.target.value)}
        />
      )}
      {props.onOnlyAvailableChange && (
        <CheckboxField
          checked={props.onlyAvailable}
          label="Solo disponibles"
          name="onlyAvailable"
          onChange={(event) => props.onOnlyAvailableChange(event.target.checked)}
        />
      )}
    </fieldset>
  );
}
