import { formatPrice } from '../formatPrice';

export function PriceTag(props) {
  return (
    <p className="flex flex-wrap items-baseline gap-1">
      <span className="font-serif text-xl font-bold text-accent">{formatPrice(props.amount, props.currency)}</span>
      {props.suffix && <span className="text-sm text-muted">{props.suffix}</span>}
    </p>
  );
}
