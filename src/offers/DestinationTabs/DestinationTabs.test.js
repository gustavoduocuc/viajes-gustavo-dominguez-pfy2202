import { screen, within } from '@testing-library/react';
import { mockDestinationsApi } from '../../testing/mockDestinationsApi';
import { flightsMock, hotelsMock, offersMock } from '../../testing/offersMocks';
import { renderAt } from '../../testing/renderAt';

async function openTabs(path, mocks) {
  mockDestinationsApi();
  renderAt(path, { mocks });
  return screen.findByRole('navigation', { name: 'Secciones del destino' });
}

function currentTabs(tabs) {
  return within(tabs)
    .getAllByRole('link')
    .filter((link) => link.getAttribute('aria-current') === 'page')
    .map((link) => link.textContent);
}

test('the destination has three tabs linked to its routes', async () => {
  const tabs = await openTabs('/destinos/cusco', [offersMock('cusco')]);

  expect(within(tabs).getAllByRole('link').map((link) => link.getAttribute('href'))).toEqual([
    '/destinos/cusco',
    '/destinos/cusco/vuelos',
    '/destinos/cusco/hoteles',
  ]);
  expect(within(tabs).getAllByRole('link').map((link) => link.textContent)).toEqual(['Resumen', 'Vuelos', 'Hoteles']);
});

test('only the summary is current on the destination index', async () => {
  const tabs = await openTabs('/destinos/cusco', [offersMock('cusco')]);

  expect(currentTabs(tabs)).toEqual(['Resumen']);
});

test('only flights is current on the flights route', async () => {
  const tabs = await openTabs('/destinos/cusco/vuelos', [flightsMock('cusco')]);

  expect(currentTabs(tabs)).toEqual(['Vuelos']);
});

test('only hotels is current on the hotels route', async () => {
  const tabs = await openTabs('/destinos/cusco/hoteles', [hotelsMock('cusco')]);

  expect(currentTabs(tabs)).toEqual(['Hoteles']);
});
