import { getDestinationOffers, getFlights, getHotels } from './queries';

function describeOperation(document) {
  const operation = document.definitions[0];
  return {
    name: operation.name.value,
    variables: operation.variableDefinitions.map((definition) => definition.variable.name.value),
  };
}

test('each document is a named operation with its variables', () => {
  expect(describeOperation(getFlights)).toEqual({ name: 'GetFlights', variables: ['destination', 'date'] });
  expect(describeOperation(getHotels)).toEqual({ name: 'GetHotels', variables: ['destination', 'onlyAvailable'] });
  expect(describeOperation(getDestinationOffers)).toEqual({
    name: 'GetDestinationOffers',
    variables: ['destination'],
  });
});

function selectedFields(document, path) {
  let selections = document.definitions[0].selectionSet.selections;
  path.forEach((name) => {
    selections = selections.find((selection) => selection.name.value === name).selectionSet.selections;
  });
  return selections.map((selection) => selection.name.value);
}

test('the summary asks only for the fields it needs', () => {
  expect(selectedFields(getDestinationOffers, ['destinationOffers', 'flights'])).toEqual([
    'id',
    'price',
    'currency',
    'seatsAvailable',
  ]);
  expect(selectedFields(getDestinationOffers, ['destinationOffers', 'hotels'])).toEqual([
    'id',
    'pricePerNight',
    'currency',
    'roomsAvailable',
  ]);
});
