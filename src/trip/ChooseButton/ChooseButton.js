import { Button } from '../../ui/Button/Button';

export function ChooseButton(props) {
  if (props.isChosen) {
    return (
      <p className="inline-flex min-h-11 items-center gap-2 font-semibold text-accent">
        <span aria-hidden="true">✓</span>
        Elegido
      </p>
    );
  }
  return (
    <Button ariaLabel={props.label} disabled={props.isSoldOut} variant="primary" onClick={props.onChoose}>
      Elegir
    </Button>
  );
}
