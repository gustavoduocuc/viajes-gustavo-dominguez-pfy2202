import { screen } from '@testing-library/react';
import { renderAt } from './testing/renderAt';

test('home shows the provisional agency page', async () => {
  renderAt('/');

  expect(
    await screen.findByRole('heading', { level: 1, name: 'Agencia de viajes' })
  ).toBeInTheDocument();
  expect(screen.getByText('Sitio en construcción.')).toBeInTheDocument();
});
