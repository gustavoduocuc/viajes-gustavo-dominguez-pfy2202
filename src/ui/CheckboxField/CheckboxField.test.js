import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CheckboxField } from './CheckboxField';

test('the label is tied to the checkbox and toggling calls back', () => {
  const onChange = jest.fn();
  render(<CheckboxField checked={false} label="Solo disponibles" name="onlyAvailable" onChange={onChange} />);

  userEvent.click(screen.getByRole('checkbox', { name: 'Solo disponibles' }));

  expect(onChange).toHaveBeenCalledTimes(1);
});

test('it reflects the checked value', () => {
  render(<CheckboxField checked label="Solo disponibles" name="onlyAvailable" onChange={() => {}} />);

  expect(screen.getByRole('checkbox', { name: 'Solo disponibles' })).toBeChecked();
});
