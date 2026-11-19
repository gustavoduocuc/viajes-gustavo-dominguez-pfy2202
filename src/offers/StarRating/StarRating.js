const maxStars = 5;

export function StarRating(props) {
  const label = props.count === 1 ? '1 estrella' : `${props.count} estrellas`;

  return (
    <span aria-label={label} className="text-highlight" role="img">
      <span aria-hidden="true">{'★'.repeat(props.count)}</span>
      <span aria-hidden="true" className="text-field">
        {'☆'.repeat(maxStars - props.count)}
      </span>
    </span>
  );
}
