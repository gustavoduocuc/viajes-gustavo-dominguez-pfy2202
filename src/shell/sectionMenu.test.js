import { screen, within } from '@testing-library/react';
import { mockDestinationsApi } from '../testing/mockDestinationsApi';
import { renderAt } from '../testing/renderAt';

async function readMenu() {
  return screen.findByRole('navigation', { name: 'Secciones' });
}

function markedLinks(menu) {
  return within(menu)
    .getAllByRole('link')
    .filter((link) => link.getAttribute('aria-current') === 'page');
}

test('the menu has Inicio and Destinos in order', async () => {
  mockDestinationsApi();
  renderAt('/');

  const menu = await readMenu();

  expect(within(menu).getAllByRole('link').map((link) => link.textContent)).toEqual(['Inicio', 'Destinos']);
});

test('only Inicio is marked on the home page', async () => {
  mockDestinationsApi();
  renderAt('/');

  const marked = markedLinks(await readMenu());

  expect(marked).toHaveLength(1);
  expect(marked[0]).toHaveTextContent('Inicio');
});

test('Destinos stays marked on a destination detail', async () => {
  mockDestinationsApi();
  renderAt('/destinos/kioto');

  const marked = markedLinks(await readMenu());

  expect(marked).toHaveLength(1);
  expect(marked[0]).toHaveTextContent('Destinos');
});

test('an unknown address shows the not found notice inside the shell', async () => {
  mockDestinationsApi();
  renderAt('/viajes-a-marte');

  expect(await screen.findByRole('heading', { level: 1, name: 'Página no encontrada' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Volver a Inicio' })).toHaveAttribute('href', '/');
  expect(await readMenu()).toBeInTheDocument();
});
