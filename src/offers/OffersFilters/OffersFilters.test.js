import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OffersFilters } from './OffersFilters';

test('the date filter reports the chosen date', () => {
  const onDepartureDateChange = jest.fn();
  render(<OffersFilters departureDate="" onDepartureDateChange={onDepartureDateChange} />);

  fireEvent.change(screen.getByLabelText('Salida desde'), { target: { value: '2027-04-01' } });

  expect(onDepartureDateChange).toHaveBeenCalledWith('2027-04-01');
});

test('the availability filter reports its checked state', () => {
  const onOnlyAvailableChange = jest.fn();
  render(<OffersFilters onlyAvailable={false} onOnlyAvailableChange={onOnlyAvailableChange} />);

  userEvent.click(screen.getByRole('checkbox', { name: 'Solo disponibles' }));

  expect(onOnlyAvailableChange).toHaveBeenCalledWith(true);
});

test('only the requested controls are shown', () => {
  render(<OffersFilters departureDate="" onDepartureDateChange={() => {}} />);

  expect(screen.getByLabelText('Salida desde')).toBeInTheDocument();
  expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
});

test('the controls are grouped with a legend', () => {
  render(<OffersFilters onlyAvailable={false} onOnlyAvailableChange={() => {}} />);

  expect(screen.getByRole('group', { name: 'Filtrar ofertas' })).toBeInTheDocument();
});
