import { NavLink } from 'react-router';
import { focusRingClass } from '../../ui/focusRing';

const tabBaseClass = `inline-flex min-h-11 items-center rounded-control px-4 text-sm transition-colors duration-200 ${focusRingClass}`;
const tabCurrentClass = `${tabBaseClass} bg-accent-soft font-semibold text-accent`;
const tabOtherClass = `${tabBaseClass} text-muted hover:bg-background hover:text-text`;

function tabClass(state) {
  return state.isActive ? tabCurrentClass : tabOtherClass;
}

export function DestinationTabs(props) {
  const basePath = `/destinos/${props.slug}`;

  return (
    <nav aria-label="Secciones del destino" className="flex gap-1 overflow-x-auto border-b pb-2">
      <NavLink className={tabClass} to={basePath} end>
        Resumen
      </NavLink>
      <NavLink className={tabClass} to={`${basePath}/vuelos`}>
        Vuelos
      </NavLink>
      <NavLink className={tabClass} to={`${basePath}/hoteles`}>
        Hoteles
      </NavLink>
    </nav>
  );
}
