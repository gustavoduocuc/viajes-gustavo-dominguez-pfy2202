import { useEffect, useState } from 'react';

const loadingState = { status: 'loading', data: null, error: null };

function isAbort(error) {
  return error instanceof DOMException && error.name === 'AbortError';
}

function toSuccessState(data) {
  const isEmpty = Array.isArray(data) && data.length === 0;
  return { status: isEmpty ? 'empty' : 'success', data, error: null };
}

// load recibe un AbortSignal y devuelve una promesa; se vuelve a ejecutar si cambian las dependencias.
export function useRemoteData(load, dependencies) {
  const [state, setState] = useState(loadingState);

  useEffect(function fetchOnChange() {
    const controller = new AbortController();
    setState(loadingState);

    load(controller.signal)
      .then(function showData(data) {
        if (!controller.signal.aborted) {
          setState(toSuccessState(data));
        }
      })
      .catch(function showError(error) {
        if (controller.signal.aborted || isAbort(error)) {
          return;
        }
        setState({ status: 'error', data: null, error });
      });

    return function cancel() {
      controller.abort();
    };
    // Las dependencias las define quien llama (por ejemplo, el slug), por eso el lint no puede comprobarlas.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return state;
}
