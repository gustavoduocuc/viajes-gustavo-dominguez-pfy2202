const baseClass = 'rounded-card border bg-surface shadow-card';
const highlightedClass = 'rounded-card border-2 border-accent bg-surface shadow-card';
const disabledClass = 'rounded-card border border-dashed bg-background text-muted';

function pickClass(props) {
  if (props.disabled) {
    return disabledClass;
  }
  return props.highlighted ? highlightedClass : baseClass;
}

export function Card(props) {
  const Element = props.as ?? 'div';

  return (
    <Element
      aria-disabled={props.disabled ? 'true' : undefined}
      className={`${pickClass(props)} ${props.className ?? ''}`}
    >
      {props.children}
    </Element>
  );
}
