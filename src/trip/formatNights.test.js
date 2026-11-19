import { formatNights } from './formatNights';

test('one night is singular and the rest plural', () => {
  expect(formatNights(1)).toBe('1 noche');
  expect(formatNights(7)).toBe('7 noches');
  expect(formatNights(0)).toBe('0 noches');
});
