import { renderHook, waitFor } from '@testing-library/react';
import { jsonResponse, mockFetch } from '../testing/mockFetch';
import { useDestination } from './useDestination';
import { useDestinations } from './useDestinations';

test('the list goes from loading to success', async () => {
  mockFetch({ '/api/destinations': jsonResponse(200, [{ slug: 'cusco' }]) });

  const { result } = renderHook(() => useDestinations());

  expect(result.current.status).toBe('loading');
  await waitFor(() => expect(result.current.status).toBe('success'));
  expect(result.current.data).toEqual([{ slug: 'cusco' }]);
});

test('an empty list is the empty state', async () => {
  mockFetch({ '/api/destinations': jsonResponse(200, []) });

  const { result } = renderHook(() => useDestinations());

  await waitFor(() => expect(result.current.status).toBe('empty'));
});

test('a failing list is the error state', async () => {
  mockFetch({ '/api/destinations': jsonResponse(500, { message: 'Error simulado del servidor.' }) });

  const { result } = renderHook(() => useDestinations());

  await waitFor(() => expect(result.current.status).toBe('error'));
  expect(result.current.error.status).toBe(500);
});

test('leaving before the answer does not update anything', async () => {
  mockFetch({ '/api/destinations': jsonResponse(200, [{ slug: 'cusco' }]) });

  const { unmount } = renderHook(() => useDestinations());
  unmount();

  expect(global.fetch.mock.calls[0][1].signal.aborted).toBe(true);
});

test('changing the slug goes back to loading and loads the new one', async () => {
  mockFetch({
    '/api/destinations/cusco': jsonResponse(200, { slug: 'cusco' }),
    '/api/destinations/roma': jsonResponse(200, { slug: 'roma' }),
  });

  const { result, rerender } = renderHook((props) => useDestination(props.slug), {
    initialProps: { slug: 'cusco' },
  });
  await waitFor(() => expect(result.current.data).toEqual({ slug: 'cusco' }));

  rerender({ slug: 'roma' });

  expect(result.current.status).toBe('loading');
  await waitFor(() => expect(result.current.data).toEqual({ slug: 'roma' }));
});
