import { render, screen } from '@testing-library/react';
import { ActivityList } from './ActivityList';

test('every activity is a list item', () => {
  render(<ActivityList activities={['Snorkel', 'Cenotes']} />);

  expect(screen.getAllByRole('listitem').map((item) => item.textContent)).toEqual(['Snorkel', 'Cenotes']);
});

test('the limit cuts the visible activities', () => {
  render(<ActivityList activities={['a', 'b', 'c', 'd']} limit={3} />);

  expect(screen.getAllByRole('listitem')).toHaveLength(3);
});
