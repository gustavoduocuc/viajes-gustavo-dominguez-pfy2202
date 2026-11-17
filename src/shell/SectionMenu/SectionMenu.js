import { NavLink } from 'react-router';
import { focusRingClass } from '../../ui/focusRing';

const menuClass =
  'fixed inset-x-0 bottom-0 flex justify-around gap-0 bg-surface px-1 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-menu sm:gap-1 md:static md:justify-end md:gap-0 md:bg-transparent md:p-0 md:shadow-none lg:gap-1';
const linkBaseClass = `flex min-h-11 flex-auto flex-col items-center justify-center rounded-control px-0 text-center text-xs leading-tight sm:flex-row sm:gap-1 sm:px-0.5 sm:text-sm transition-colors duration-200 md:flex-none md:px-1.5 lg:px-3 ${focusRingClass}`;
const linkCurrentClass = `${linkBaseClass} bg-accent-soft font-semibold text-accent`;
const linkOtherClass = `${linkBaseClass} text-muted hover:bg-background hover:text-text`;

function sectionLinkClass(state) {
  if (state.isActive) {
    return linkCurrentClass;
  }

  return linkOtherClass;
}

export function SectionMenu() {
  return (
    <nav className={menuClass} aria-label="Secciones">
      <NavLink className={sectionLinkClass} to="/" end>
        Inicio
      </NavLink>
    </nav>
  );
}
