import { findDestinationBySlug, listDestinationSummaries } from './destinationQueries';

test('the summaries leave out the description', () => {
  const summaries = listDestinationSummaries();

  expect(summaries).toHaveLength(8);
  summaries.forEach((summary) => {
    expect(summary).not.toHaveProperty('description');
    expect(Object.keys(summary).sort()).toEqual(
      ['country', 'id', 'name', 'popularActivities', 'region', 'slug']
    );
  });
});

test('a known slug returns the full destination', () => {
  expect(findDestinationBySlug('kioto')).toMatchObject({ name: 'Kioto', country: 'Japón' });
  expect(findDestinationBySlug('kioto').description).toEqual(expect.any(String));
});

test('an unknown slug returns nothing', () => {
  expect(findDestinationBySlug('no-existe')).toBeUndefined();
});
