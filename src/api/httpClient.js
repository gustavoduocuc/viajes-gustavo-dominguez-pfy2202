import { ApiError } from './ApiError';

const networkMessage = 'No se pudo conectar con el servidor. Revisa tu conexión.';
const serverMessage = 'El servidor respondió con un error.';
const invalidBodyMessage = 'La respuesta del servidor no es válida.';

function isAbort(error) {
  return error instanceof DOMException && error.name === 'AbortError';
}

async function readErrorMessage(response) {
  try {
    const body = await response.json();
    return body.message || serverMessage;
  } catch {
    return serverMessage;
  }
}

export async function getJson(path, options = {}) {
  let response;
  try {
    response = await fetch(path, { signal: options.signal });
  } catch (error) {
    if (isAbort(error)) {
      throw error;
    }
    throw new ApiError(networkMessage);
  }

  if (!response.ok) {
    throw new ApiError(await readErrorMessage(response), response.status);
  }

  try {
    return await response.json();
  } catch {
    throw new ApiError(invalidBodyMessage, response.status);
  }
}
