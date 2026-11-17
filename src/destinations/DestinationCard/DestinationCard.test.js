import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { DestinationCard } from './DestinationCard';

const destination = {
  slug: 'cusco',
  name: 'Cusco',
  country: 'Perú',
  region: 'Sudamérica',
  popularActivities: ['a', 'b', 'c', 'd'],
};

function renderCard() {
  const { container } = render(
    <MemoryRouter>
      <DestinationCard destination={destination} />
    </MemoryRouter>
  );
  return container;
}

test('the name links to the destination detail', () => {
  renderCard();

  expect(screen.getByRole('link', { name: 'Cusco' })).toHaveAttribute('href', '/destinos/cusco');
  expect(screen.getByRole('heading', { level: 2, name: 'Cusco' })).toBeInTheDocument();
});

test('it shows the country and at most three activities', () => {
  renderCard();

  expect(screen.getByText('Perú')).toBeInTheDocument();
  expect(screen.getAllByRole('listitem')).toHaveLength(3);
});

test('the cover is hidden from assistive technology', () => {
  const container = renderCard();

  expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
});
