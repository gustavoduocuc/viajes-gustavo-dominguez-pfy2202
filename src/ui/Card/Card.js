const baseClass = 'rounded-card border bg-surface shadow-card';
const disabledClass = 'rounded-card border border-dashed bg-background text-muted';

export function Card(props) {
  const Element = props.as ?? 'div';

  return (
    <Element
      aria-disabled={props.disabled ? 'true' : undefined}
      className={`${props.disabled ? disabledClass : baseClass} ${props.className ?? ''}`}
    >
      {props.children}
    </Element>
  );
}
