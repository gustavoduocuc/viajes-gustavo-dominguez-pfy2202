import { render, screen } from '@testing-library/react';
import { CountryBadge } from './CountryBadge';

test('it shows the country and the region', () => {
  render(<CountryBadge country="Perú" region="Sudamérica" />);

  expect(screen.getByText('Perú')).toBeInTheDocument();
  expect(screen.getByText(/Sudamérica/)).toBeInTheDocument();
});

test('the region is optional', () => {
  render(<CountryBadge country="Perú" />);

  expect(screen.getByText('Perú')).toBeInTheDocument();
});
