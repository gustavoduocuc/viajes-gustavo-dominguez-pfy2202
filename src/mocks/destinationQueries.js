import { destinations } from '../data/destinations';

function toSummary(destination) {
  return {
    id: destination.id,
    slug: destination.slug,
    name: destination.name,
    country: destination.country,
    region: destination.region,
    popularActivities: destination.popularActivities,
  };
}

export function listDestinationSummaries() {
  return destinations.map(toSummary);
}

export function findDestinationBySlug(slug) {
  return destinations.find((destination) => destination.slug === slug);
}
