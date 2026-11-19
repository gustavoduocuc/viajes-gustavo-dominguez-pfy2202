import { render, screen } from '@testing-library/react';
import { DateRange } from './DateRange';

function renderRange() {
  render(<DateRange start="2027-03-10" end="2027-03-17" startLabel="Salida" endLabel="Regreso" />);
}

test('both dates are shown with their labels', () => {
  renderRange();

  expect(screen.getByText('Salida')).toBeInTheDocument();
  expect(screen.getByText('Regreso')).toBeInTheDocument();
});

test('the days are exactly the ones given, in Spanish with the year', () => {
  renderRange();

  expect(screen.getByText(/^10 mar/)).toHaveTextContent('2027');
  expect(screen.getByText(/^17 mar/)).toHaveTextContent('2027');
});

test('each date is a time element with its iso value', () => {
  renderRange();

  const times = screen.getAllByText(/2027/);
  expect(times.map((time) => time.getAttribute('datetime'))).toEqual(['2027-03-10', '2027-03-17']);
});
