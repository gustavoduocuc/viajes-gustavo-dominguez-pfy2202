const maxFractionDigits = 0;

function formatAmount(amount, currency) {
  return new Intl.NumberFormat('es', { style: 'currency', currency, maximumFractionDigits: maxFractionDigits }).format(
    amount
  );
}

export function PriceTag(props) {
  return (
    <p className="flex flex-wrap items-baseline gap-1">
      <span className="font-serif text-xl font-bold text-accent">{formatAmount(props.amount, props.currency)}</span>
      {props.suffix && <span className="text-sm text-muted">{props.suffix}</span>}
    </p>
  );
}
