import { fetchDestination } from '../api/destinationsApi';
import { useRemoteData } from '../api/useRemoteData';

export function useDestination(slug) {
  return useRemoteData((signal) => fetchDestination(slug, { signal }), [slug]);
}
