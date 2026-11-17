import { fieldClass, fieldErrorClass, labelClass } from '../fieldClass';

export function SelectField(props) {
  const errorId = `${props.name}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <label className={labelClass}>
        {props.label}
        <select
          aria-describedby={props.error ? errorId : undefined}
          aria-invalid={props.error ? 'true' : undefined}
          className={fieldClass}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
        >
          {props.options.map(function renderOption(option) {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      </label>
      {props.error && (
        <span className={fieldErrorClass} id={errorId}>
          {props.error}
        </span>
      )}
    </div>
  );
}
