import { fetchDestinations } from '../api/destinationsApi';
import { useRemoteData } from '../api/useRemoteData';

function loadDestinations(signal) {
  return fetchDestinations({ signal });
}

export function useDestinations() {
  return useRemoteData(loadDestinations, []);
}
