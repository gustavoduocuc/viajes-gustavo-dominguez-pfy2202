import { EmptyState } from '../EmptyState/EmptyState';
import { TextLink } from '../TextLink/TextLink';

// Carga y vacío se anuncian con role="status"; los errores con role="alert".
// Si recibe backTo y backLabel, agrega un enlace para salir del estado.
export function StatusMessage(props) {
  const role = props.kind === 'error' ? 'alert' : 'status';
  const showsBackLink = props.kind !== 'loading' && props.backTo && props.backLabel;

  if (showsBackLink) {
    return (
      <EmptyState message={props.message} role={role}>
        <TextLink to={props.backTo}>{props.backLabel}</TextLink>
      </EmptyState>
    );
  }
  return <EmptyState message={props.message} role={role} />;
}
