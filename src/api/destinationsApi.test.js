import { ApiError } from './ApiError';
import { fetchDestination, fetchDestinations } from './destinationsApi';
import { jsonResponse, mockFetch } from '../testing/mockFetch';

test('the list is requested from its endpoint with the signal', async () => {
  mockFetch({ '/api/destinations': jsonResponse(200, [{ slug: 'cusco' }]) });
  const controller = new AbortController();

  await expect(fetchDestinations({ signal: controller.signal })).resolves.toEqual([{ slug: 'cusco' }]);
  expect(global.fetch).toHaveBeenCalledWith('/api/destinations', { signal: controller.signal });
});

test('the detail encodes the slug in the path', async () => {
  mockFetch({ '/api/destinations/a%20b': jsonResponse(200, { slug: 'a b' }) });

  await expect(fetchDestination('a b')).resolves.toEqual({ slug: 'a b' });
});

test('a 404 becomes an ApiError with message and status', async () => {
  mockFetch({ '/api/destinations/x': jsonResponse(404, { message: 'El destino «x» no existe.' }) });

  const failure = await fetchDestination('x').catch((error) => error);

  expect(failure).toBeInstanceOf(ApiError);
  expect(failure).toMatchObject({ status: 404, message: 'El destino «x» no existe.' });
});

test('a 500 becomes an ApiError with its status', async () => {
  mockFetch({ '/api/destinations': jsonResponse(500, { message: 'Error simulado del servidor.' }) });

  const failure = await fetchDestinations().catch((error) => error);

  expect(failure).toBeInstanceOf(ApiError);
  expect(failure.status).toBe(500);
});
