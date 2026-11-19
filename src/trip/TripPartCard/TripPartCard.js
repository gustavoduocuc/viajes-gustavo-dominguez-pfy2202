import { Card } from '../../ui/Card/Card';
import { TextLink } from '../../ui/TextLink/TextLink';

export const partHeadingClass = 'font-serif text-xl font-bold outline-none';

export function TripPartCard(props) {
  const headingId = `trip-${props.id}-heading`;

  return (
    <section aria-labelledby={headingId}>
      <Card className="flex flex-col gap-3 p-4">
        <h2 className={partHeadingClass} id={headingId} ref={props.headingRef} tabIndex={-1}>
          {props.title}
        </h2>
        {props.children ? (
          props.children
        ) : (
          <>
            <p className="text-base text-muted">{props.emptyMessage}</p>
            <div>
              <TextLink to={props.chooseTo}>{props.chooseLabel}</TextLink>
            </div>
          </>
        )}
      </Card>
    </section>
  );
}
