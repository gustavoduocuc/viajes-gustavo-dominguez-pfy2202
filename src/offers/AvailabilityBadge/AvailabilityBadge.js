const fewUnitsLimit = 3;
const baseClass = 'inline-flex w-fit items-center rounded-pill border px-3 py-1 text-sm font-semibold';
const availableClass = `${baseClass} border-accent bg-accent-soft text-accent`;
const fewClass = `${baseClass} border-highlight bg-surface text-highlight`;
const soldOutClass = `${baseClass} border-field bg-background text-muted`;

function pluralize(units, singularUnit, pluralUnit) {
  return units === 1 ? singularUnit : pluralUnit;
}

export function AvailabilityBadge(props) {
  const unit = pluralize(props.units, props.singularUnit, props.pluralUnit);

  if (props.units === 0) {
    return <p className={soldOutClass}>Agotado</p>;
  }
  if (props.units <= fewUnitsLimit) {
    const remaining = props.units === 1 ? 'Queda' : 'Quedan';
    return (
      <p className={fewClass}>
        ¡{remaining} {props.units} {unit}!
      </p>
    );
  }
  return (
    <p className={availableClass}>
      {props.units} {unit} disponibles
    </p>
  );
}
