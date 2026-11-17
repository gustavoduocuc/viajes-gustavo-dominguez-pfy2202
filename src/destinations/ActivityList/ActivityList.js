export function ActivityList(props) {
  const visibleActivities = props.limit ? props.activities.slice(0, props.limit) : props.activities;

  return (
    <ul className="flex list-disc flex-col gap-1 pl-5 text-base text-text marker:text-highlight">
      {visibleActivities.map(function renderActivity(activity) {
        return <li key={activity}>{activity}</li>;
      })}
    </ul>
  );
}
