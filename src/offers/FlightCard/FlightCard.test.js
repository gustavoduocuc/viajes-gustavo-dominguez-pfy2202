import { render, screen } from '@testing-library/react';
import { FlightCard } from './FlightCard';

const flight = {
  id: 'f1',
  airline: 'LATAM',
  origin: 'Santiago',
  departureDate: '2027-03-10',
  returnDate: '2027-03-17',
  price: 420,
  currency: 'USD',
  seatsAvailable: 12,
};

test('it shows airline, origin, dates, price and availability', () => {
  render(<FlightCard flight={flight} />);

  expect(screen.getByRole('heading', { level: 3, name: 'LATAM' })).toBeInTheDocument();
  expect(screen.getByText('Desde Santiago')).toBeInTheDocument();
  expect(screen.getByText('Salida')).toBeInTheDocument();
  expect(screen.getByText('Regreso')).toBeInTheDocument();
  expect(screen.getByText(/420/)).toBeInTheDocument();
  expect(screen.getByText('12 asientos disponibles')).toBeInTheDocument();
});

test('an available flight is not marked disabled', () => {
  render(<FlightCard flight={flight} />);

  expect(screen.getByRole('article')).not.toHaveAttribute('aria-disabled');
});

test('a sold out flight is marked disabled and says so with text', () => {
  render(<FlightCard flight={{ ...flight, seatsAvailable: 0 }} />);

  expect(screen.getByRole('article')).toHaveAttribute('aria-disabled', 'true');
  expect(screen.getByText('Agotado')).toBeInTheDocument();
});

test('an available flight offers a choose button named after the airline', () => {
  render(<FlightCard flight={flight} onChoose={() => {}} />);

  expect(screen.getByRole('button', { name: 'Elegir vuelo LATAM' })).toBeEnabled();
});

test('a sold out flight has its choose button disabled', () => {
  render(<FlightCard flight={{ ...flight, seatsAvailable: 0 }} onChoose={() => {}} />);

  expect(screen.getByRole('button', { name: 'Elegir vuelo LATAM' })).toBeDisabled();
});

test('the chosen flight says Elegido instead of offering the button', () => {
  render(<FlightCard flight={flight} isChosen onChoose={() => {}} />);

  expect(screen.getByText('Elegido')).toBeInTheDocument();
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});
