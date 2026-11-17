import { ApiError } from './ApiError';
import { getJson } from './httpClient';

function respondWith(status, body, isJson = true) {
  global.fetch = jest.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: isJson ? () => Promise.resolve(body) : () => Promise.reject(new SyntaxError('bad json')),
  });
}

afterEach(() => {
  delete global.fetch;
});

test('returns the parsed body of a successful response', async () => {
  respondWith(200, [{ id: 1 }]);

  await expect(getJson('/api/destinations')).resolves.toEqual([{ id: 1 }]);
  expect(global.fetch).toHaveBeenCalledWith('/api/destinations', { signal: undefined });
});

test('passes the abort signal to fetch', async () => {
  respondWith(200, []);
  const controller = new AbortController();

  await getJson('/api/trips', { signal: controller.signal });

  expect(global.fetch).toHaveBeenCalledWith('/api/trips', { signal: controller.signal });
});

test('a failed response throws an ApiError with its status and message', async () => {
  respondWith(404, { message: 'El destino no existe.' });

  await expect(getJson('/api/trips')).rejects.toMatchObject({
    name: 'ApiError',
    status: 404,
    message: 'El destino no existe.',
  });
});

test('a failed response without a JSON body uses a fallback message', async () => {
  respondWith(500, null, false);

  const failure = await getJson('/api/trips').catch((error) => error);

  expect(failure).toBeInstanceOf(ApiError);
  expect(failure.status).toBe(500);
  expect(failure.message).toMatch(/servidor/i);
});

test('an invalid JSON body in a successful response is an error', async () => {
  respondWith(200, null, false);

  await expect(getJson('/api/trips')).rejects.toBeInstanceOf(ApiError);
});

test('a network failure becomes an ApiError without status', async () => {
  global.fetch = jest.fn().mockRejectedValue(new TypeError('Failed to fetch'));

  const failure = await getJson('/api/trips').catch((error) => error);

  expect(failure).toBeInstanceOf(ApiError);
  expect(failure.status).toBeUndefined();
  expect(failure.message).toMatch(/conexión|red/i);
});

test('an abort error is passed through untouched', async () => {
  const abort = new DOMException('Aborted', 'AbortError');
  global.fetch = jest.fn().mockRejectedValue(abort);

  await expect(getJson('/api/trips')).rejects.toBe(abort);
});
