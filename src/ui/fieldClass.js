import { focusRingClass } from './focusRing';

export const fieldClass = `min-h-12 w-full rounded-control border border-field bg-surface px-3 py-2 text-base text-text invalid:border-danger aria-[invalid=true]:border-danger ${focusRingClass}`;

export const labelClass = 'flex flex-col gap-1.5 text-sm font-semibold text-text';

export const fieldErrorClass = 'text-sm font-normal text-danger';
