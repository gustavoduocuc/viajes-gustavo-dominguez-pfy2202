import { focusRingClass } from '../focusRing';

const labelClass = 'flex min-h-11 cursor-pointer items-center gap-3 text-sm font-semibold text-text';

export function CheckboxField(props) {
  return (
    <label className={labelClass}>
      <input
        checked={props.checked}
        className={`h-5 w-5 accent-accent ${focusRingClass}`}
        name={props.name}
        type="checkbox"
        onChange={props.onChange}
      />
      {props.label}
    </label>
  );
}
