import { destinations } from './destinations';

const kebabCase = /^[a-z0-9]+(-[a-z0-9]+)*$/;

test('there are 8 destinations with every field filled', () => {
  expect(destinations).toHaveLength(8);
  destinations.forEach((destination) => {
    ['slug', 'name', 'country', 'region', 'description'].forEach((field) => {
      expect(destination[field]).toEqual(expect.any(String));
      expect(destination[field].trim()).not.toBe('');
    });
    expect(Number.isInteger(destination.id)).toBe(true);
    expect(destination.popularActivities.length).toBeGreaterThanOrEqual(3);
  });
});

test('slugs are unique kebab-case', () => {
  const slugs = destinations.map((destination) => destination.slug);

  expect(new Set(slugs).size).toBe(slugs.length);
  slugs.forEach((slug) => expect(slug).toMatch(kebabCase));
});

test('destinations cover at least 4 regions', () => {
  const regions = new Set(destinations.map((destination) => destination.region));

  expect(regions.size).toBeGreaterThanOrEqual(4);
});

test('the reserved destination without flights or hotels exists', () => {
  expect(destinations.some((destination) => destination.slug === 'isla-de-pascua')).toBe(true);
});
