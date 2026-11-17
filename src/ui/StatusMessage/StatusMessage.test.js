import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { StatusMessage } from './StatusMessage';

function renderMessage(props) {
  render(
    <MemoryRouter>
      <StatusMessage {...props} />
    </MemoryRouter>
  );
}

test('an error is announced as an alert with its back link', () => {
  renderMessage({ kind: 'error', message: 'Falló la carga.', backTo: '/', backLabel: 'Volver a Inicio' });

  expect(screen.getByRole('alert')).toHaveTextContent('Falló la carga.');
  expect(screen.getByRole('link', { name: 'Volver a Inicio' })).toHaveAttribute('href', '/');
});

test('loading is announced as status without a back link', () => {
  renderMessage({ kind: 'loading', message: 'Cargando…', backTo: '/', backLabel: 'Volver a Inicio' });

  expect(screen.getByRole('status')).toHaveTextContent('Cargando…');
  expect(screen.queryByRole('link')).not.toBeInTheDocument();
});

test('an empty message is a status with its back link', () => {
  renderMessage({ kind: 'empty', message: 'No hay destinos disponibles.', backTo: '/', backLabel: 'Volver a Inicio' });

  expect(screen.getByRole('status')).toHaveTextContent('No hay destinos disponibles.');
  expect(screen.getByRole('link', { name: 'Volver a Inicio' })).toBeInTheDocument();
});
