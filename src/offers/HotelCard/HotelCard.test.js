import { render, screen } from '@testing-library/react';
import { HotelCard } from './HotelCard';

const hotel = {
  id: 'h1',
  name: 'Hotel Trastevere',
  stars: 4,
  address: 'Via della Lungaretta 60',
  checkIn: '2027-05-03',
  checkOut: '2027-05-12',
  pricePerNight: 110,
  currency: 'USD',
  roomsAvailable: 6,
  amenities: ['Wifi', 'Desayuno incluido'],
};

test('it shows name, address, dates, price per night and availability', () => {
  render(<HotelCard hotel={hotel} />);

  expect(screen.getByRole('heading', { level: 3, name: 'Hotel Trastevere' })).toBeInTheDocument();
  expect(screen.getByText('Via della Lungaretta 60')).toBeInTheDocument();
  expect(screen.getByText('Entrada')).toBeInTheDocument();
  expect(screen.getByText('por noche')).toBeInTheDocument();
  expect(screen.getByText('6 habitaciones disponibles')).toBeInTheDocument();
});

test('the stars have an accessible text', () => {
  render(<HotelCard hotel={hotel} />);

  expect(screen.getByRole('img', { name: '4 estrellas' })).toBeInTheDocument();
});

test('the amenities are list items', () => {
  render(<HotelCard hotel={hotel} />);

  expect(screen.getAllByRole('listitem').map((item) => item.textContent)).toEqual(['Wifi', 'Desayuno incluido']);
});

test('a sold out hotel is marked disabled and says so with text', () => {
  const { container } = render(<HotelCard hotel={{ ...hotel, roomsAvailable: 0 }} />);

  expect(container.querySelector('article')).toHaveAttribute('aria-disabled', 'true');
  expect(screen.getByText('Agotado')).toBeInTheDocument();
});
