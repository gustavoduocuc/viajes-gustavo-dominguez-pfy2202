import { fieldClass, fieldErrorClass, labelClass } from '../fieldClass';

export function TextField(props) {
  const errorId = `${props.name}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <label className={labelClass}>
        {props.label}
        <input
          aria-describedby={props.error ? errorId : undefined}
          aria-invalid={props.error ? 'true' : undefined}
          className={fieldClass}
          min={props.min}
          name={props.name}
          step={props.step}
          type={props.type ?? 'text'}
          value={props.value}
          onChange={props.onChange}
        />
      </label>
      {props.error && (
        <span className={fieldErrorClass} id={errorId}>
          {props.error}
        </span>
      )}
    </div>
  );
}
