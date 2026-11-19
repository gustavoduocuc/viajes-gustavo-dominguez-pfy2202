import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getHotels } from '../../graphql/queries';
import { mockDestinationsApi } from '../../testing/mockDestinationsApi';
import { hotelsMock, serverErrorMock } from '../../testing/offersMocks';
import { renderAt } from '../../testing/renderAt';

function openHotels(slug, mocks) {
  mockDestinationsApi();
  renderAt(`/destinos/${slug}/hoteles`, { mocks });
}

test('the hotels of the destination are listed, sold out ones included', async () => {
  openHotels('roma', [hotelsMock('roma')]);

  expect(await screen.findByText('3 hoteles')).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 3, name: 'Hotel Trastevere' })).toBeInTheDocument();
  expect(screen.getByText('Agotado')).toBeInTheDocument();
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
});

test('it shows a loading message first', async () => {
  openHotels('roma', [{ ...hotelsMock('roma'), delay: 100 }]);

  expect(await screen.findByText('Cargando hoteles…')).toBeInTheDocument();
  expect(await screen.findByText('3 hoteles')).toBeInTheDocument();
});

test('only available hides the sold out hotels and updates the count', async () => {
  openHotels('roma', [hotelsMock('roma'), hotelsMock('roma', true)]);
  await screen.findByText('3 hoteles');

  userEvent.click(screen.getByRole('checkbox', { name: 'Solo disponibles' }));

  expect(await screen.findByText('2 hoteles')).toBeInTheDocument();
  expect(screen.queryByText('Agotado')).not.toBeInTheDocument();
  expect(screen.getByRole('checkbox', { name: 'Solo disponibles' })).toBeChecked();
});

test('only available on a fully sold out destination shows the filter empty message', async () => {
  openHotels('ciudad-del-cabo', [hotelsMock('ciudad-del-cabo'), hotelsMock('ciudad-del-cabo', true)]);
  await screen.findByText('2 hoteles');

  userEvent.click(screen.getByRole('checkbox', { name: 'Solo disponibles' }));

  expect(
    await screen.findByText('No hay hoteles disponibles. Desactiva el filtro para verlos todos.')
  ).toBeInTheDocument();
});

test('the destination without hotels shows the empty state', async () => {
  openHotels('isla-de-pascua', [hotelsMock('isla-de-pascua')]);

  expect(await screen.findByText('Este destino aún no tiene hoteles.')).toBeInTheDocument();
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});

test('a graphql error is shown as an alert', async () => {
  openHotels('roma', [serverErrorMock(getHotels, { destination: 'roma' })]);

  expect(await screen.findByRole('alert')).toHaveTextContent('Error simulado del servidor GraphQL.');
});
