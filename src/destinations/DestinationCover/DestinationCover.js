const baseClass = 'h-32 w-full md:h-36';

const regionCoverClasses = {
  'Sudamérica': `${baseClass} bg-region-sudamerica`,
  'Caribe y Centroamérica': `${baseClass} bg-region-caribe`,
  Europa: `${baseClass} bg-region-europa`,
  Asia: `${baseClass} bg-region-asia`,
  'África': `${baseClass} bg-region-africa`,
};

const neutralCoverClass = `${baseClass} bg-region-neutral`;

export function DestinationCover(props) {
  return (
    <div
      aria-hidden="true"
      className={`${regionCoverClasses[props.region] ?? neutralCoverClass} ${props.className ?? ''}`}
    />
  );
}
