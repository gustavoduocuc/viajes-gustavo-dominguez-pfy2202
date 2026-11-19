import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChooseButton } from './ChooseButton';

test('an available offer shows an enabled choose button with an accurate name', () => {
  const onChoose = jest.fn();
  render(<ChooseButton label="Elegir vuelo LATAM" onChoose={onChoose} />);

  userEvent.click(screen.getByRole('button', { name: 'Elegir vuelo LATAM' }));

  expect(onChoose).toHaveBeenCalledTimes(1);
});

test('a sold out offer shows a disabled button that does not call back', () => {
  const onChoose = jest.fn();
  render(<ChooseButton isSoldOut label="Elegir vuelo LATAM" onChoose={onChoose} />);

  const button = screen.getByRole('button', { name: 'Elegir vuelo LATAM' });
  userEvent.click(button);

  expect(button).toBeDisabled();
  expect(onChoose).not.toHaveBeenCalled();
});

test('the chosen offer shows the text Elegido and no button', () => {
  render(<ChooseButton isChosen label="Elegir vuelo LATAM" onChoose={() => {}} />);

  expect(screen.getByText('Elegido')).toBeInTheDocument();
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});
