const dateFormat = new Intl.DateTimeFormat('es', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

function formatDate(isoDate) {
  return dateFormat.format(new Date(`${isoDate}T00:00:00Z`));
}

function DateItem(props) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-muted">{props.label}</dt>
      <dd className="text-sm font-semibold">
        <time dateTime={props.isoDate}>{formatDate(props.isoDate)}</time>
      </dd>
    </div>
  );
}

export function DateRange(props) {
  return (
    <dl className="flex flex-wrap gap-x-6 gap-y-2">
      <DateItem isoDate={props.start} label={props.startLabel} />
      <DateItem isoDate={props.end} label={props.endLabel} />
    </dl>
  );
}
