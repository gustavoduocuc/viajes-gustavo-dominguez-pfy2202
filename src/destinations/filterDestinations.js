export const allOption = 'Todas';

function matchesOption(value, selected) {
  return selected === allOption || value === selected;
}

export function filterDestinations(destinations, filters) {
  return destinations.filter(function matchesFilters(destination) {
    return matchesOption(destination.region, filters.region) && matchesOption(destination.country, filters.country);
  });
}

export function listFilterOptions(destinations, field) {
  const values = [...new Set(destinations.map((destination) => destination[field]))];
  return [allOption, ...values.sort((first, second) => first.localeCompare(second, 'es'))];
}
