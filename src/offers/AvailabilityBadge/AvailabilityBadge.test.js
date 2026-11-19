import { render, screen } from '@testing-library/react';
import { AvailabilityBadge } from './AvailabilityBadge';

function renderBadge(units) {
  render(<AvailabilityBadge units={units} singularUnit="asiento" pluralUnit="asientos" />);
}

test('zero units is sold out', () => {
  renderBadge(0);

  expect(screen.getByText('Agotado')).toBeInTheDocument();
});

test('one unit says only one is left, in singular', () => {
  renderBadge(1);

  expect(screen.getByText('¡Queda 1 asiento!')).toBeInTheDocument();
});

test('up to three units say few are left', () => {
  renderBadge(3);

  expect(screen.getByText('¡Quedan 3 asientos!')).toBeInTheDocument();
});

test('more units show the available amount', () => {
  renderBadge(12);

  expect(screen.getByText('12 asientos disponibles')).toBeInTheDocument();
});

test('the state is always conveyed by text', () => {
  [0, 2, 20].forEach((units) => {
    const { container, unmount } = render(
      <AvailabilityBadge units={units} singularUnit="habitación" pluralUnit="habitaciones" />
    );
    expect(container.textContent.trim()).not.toBe('');
    unmount();
  });
});
