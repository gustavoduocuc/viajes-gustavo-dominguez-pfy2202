import { allOption, filterDestinations, listFilterOptions } from './filterDestinations';

const destinations = [
  { name: 'Cusco', country: 'Perú', region: 'Sudamérica' },
  { name: 'Roma', country: 'Italia', region: 'Europa' },
  { name: 'Barcelona', country: 'España', region: 'Europa' },
];

test('without selection every destination stays', () => {
  expect(filterDestinations(destinations, { region: allOption, country: allOption })).toHaveLength(3);
});

test('a region keeps only its destinations', () => {
  const result = filterDestinations(destinations, { region: 'Europa', country: allOption });

  expect(result.map((destination) => destination.name)).toEqual(['Roma', 'Barcelona']);
});

test('region and country combine', () => {
  expect(filterDestinations(destinations, { region: 'Europa', country: 'Italia' })).toHaveLength(1);
  expect(filterDestinations(destinations, { region: 'Europa', country: 'Perú' })).toHaveLength(0);
});

test('options are unique, sorted and start with the all option', () => {
  expect(listFilterOptions(destinations, 'region')).toEqual([allOption, 'Europa', 'Sudamérica']);
  expect(listFilterOptions(destinations, 'country')).toEqual([allOption, 'España', 'Italia', 'Perú']);
});
