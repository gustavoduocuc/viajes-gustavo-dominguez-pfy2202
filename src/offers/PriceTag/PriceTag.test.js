import { render, screen } from '@testing-library/react';
import { PriceTag } from './PriceTag';

test('the price is formatted as currency', () => {
  render(<PriceTag amount={450} currency="USD" />);

  expect(screen.getByText(/450/)).toHaveTextContent(/US\$|USD/);
});

test('the suffix is shown next to the price', () => {
  render(<PriceTag amount={95} currency="USD" suffix="por noche" />);

  expect(screen.getByText('por noche')).toBeInTheDocument();
});

test('without suffix nothing extra is shown', () => {
  render(<PriceTag amount={95} currency="USD" />);

  expect(screen.queryByText('por noche')).not.toBeInTheDocument();
});
