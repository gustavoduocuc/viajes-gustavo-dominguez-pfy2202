import { getJson } from './httpClient';

export function fetchDestinations(options) {
  return getJson('/api/destinations', options);
}

export function fetchDestination(slug, options) {
  return getJson(`/api/destinations/${encodeURIComponent(slug)}`, options);
}
