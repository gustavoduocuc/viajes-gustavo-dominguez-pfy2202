import { act, renderHook, waitFor } from '@testing-library/react';
import { useRemoteData } from './useRemoteData';

function deferred() {
  const handlers = {};
  handlers.promise = new Promise((resolve, reject) => {
    handlers.resolve = resolve;
    handlers.reject = reject;
  });
  return handlers;
}

test('starts loading and then exposes the data', async () => {
  const load = jest.fn().mockResolvedValue([1, 2]);

  const { result } = renderHook(() => useRemoteData(load, []));

  expect(result.current.status).toBe('loading');
  await waitFor(() => expect(result.current.status).toBe('success'));
  expect(result.current.data).toEqual([1, 2]);
});

test('an empty list is the empty state', async () => {
  const { result } = renderHook(() => useRemoteData(() => Promise.resolve([]), []));

  await waitFor(() => expect(result.current.status).toBe('empty'));
  expect(result.current.data).toEqual([]);
});

test('a failure is the error state with its error', async () => {
  const failure = new Error('falló');

  const { result } = renderHook(() => useRemoteData(() => Promise.reject(failure), []));

  await waitFor(() => expect(result.current.status).toBe('error'));
  expect(result.current.error).toBe(failure);
});

test('aborts the request on unmount without reporting an error', async () => {
  const pending = deferred();
  let receivedSignal;
  const load = (signal) => {
    receivedSignal = signal;
    return pending.promise;
  };

  const { unmount } = renderHook(() => useRemoteData(load, []));
  unmount();

  expect(receivedSignal.aborted).toBe(true);
  await act(async () => {
    pending.reject(new DOMException('Aborted', 'AbortError'));
  });
});

test('reloads and aborts the previous request when dependencies change', async () => {
  const signals = [];
  const load = jest.fn((signal) => {
    signals.push(signal);
    return Promise.resolve(['x']);
  });

  const { result, rerender } = renderHook(({ slug }) => useRemoteData(load, [slug]), {
    initialProps: { slug: 'a' },
  });
  await waitFor(() => expect(result.current.status).toBe('success'));

  rerender({ slug: 'b' });

  expect(signals[0].aborted).toBe(true);
  expect(result.current.status).toBe('loading');
  await waitFor(() => expect(result.current.status).toBe('success'));
  expect(load).toHaveBeenCalledTimes(2);
});

test('the latest request wins when responses arrive out of order', async () => {
  const first = deferred();
  const second = deferred();
  const requests = { a: first, b: second };
  const load = (signal, slug) => requests[slug].promise;

  const { result, rerender } = renderHook(
    ({ slug }) => useRemoteData((signal) => load(signal, slug), [slug]),
    { initialProps: { slug: 'a' } }
  );
  rerender({ slug: 'b' });

  await act(async () => {
    second.resolve(['B']);
  });
  await act(async () => {
    first.resolve(['A']);
  });

  expect(result.current.data).toEqual(['B']);
});
