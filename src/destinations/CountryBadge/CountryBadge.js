const badgeClass =
  'inline-flex w-fit items-center gap-1 rounded-pill bg-accent-soft px-3 py-1 text-sm font-semibold text-accent';

export function CountryBadge(props) {
  return (
    <p className={badgeClass}>
      <span>{props.country}</span>
      {props.region && <span className="font-normal text-muted">· {props.region}</span>}
    </p>
  );
}
