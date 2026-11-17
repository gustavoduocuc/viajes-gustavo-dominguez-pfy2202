import { screen, within } from '@testing-library/react';
import { renderAt } from '../testing/renderAt';

test('the menu only links to home', async () => {
  renderAt('/');

  const menu = await screen.findByRole('navigation', { name: 'Secciones' });
  const names = within(menu)
    .getAllByRole('link')
    .map((link) => link.textContent);

  expect(names).toEqual(['Inicio']);
  expect(within(menu).getByRole('link', { name: 'Inicio' })).toHaveAttribute('aria-current', 'page');
});

test('an unknown address shows the not found notice inside the shell', async () => {
  renderAt('/no-existe');

  expect(
    await screen.findByRole('heading', { level: 1, name: 'Página no encontrada' })
  ).toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: 'Secciones' })).toBeInTheDocument();
});
