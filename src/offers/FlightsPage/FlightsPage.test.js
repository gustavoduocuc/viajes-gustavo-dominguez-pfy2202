import { fireEvent, screen } from '@testing-library/react';
import { getFlights } from '../../graphql/queries';
import { mockDestinationsApi } from '../../testing/mockDestinationsApi';
import { flightsMock, serverErrorMock } from '../../testing/offersMocks';
import { renderAt } from '../../testing/renderAt';

function openFlights(slug, mocks) {
  mockDestinationsApi();
  renderAt(`/destinos/${slug}/vuelos`, { mocks });
}

test('the flights of the destination are listed, sold out ones included', async () => {
  openFlights('cusco', [flightsMock('cusco')]);

  expect(await screen.findByText('3 vuelos')).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 3, name: 'LATAM' })).toBeInTheDocument();
  expect(screen.getByText('Agotado')).toBeInTheDocument();
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
});

test('it shows a loading message first', async () => {
  openFlights('cusco', [{ ...flightsMock('cusco'), delay: 100 }]);

  expect(await screen.findByText('Cargando vuelos…')).toBeInTheDocument();
  expect(await screen.findByText('3 vuelos')).toBeInTheDocument();
});

test('changing the departure date updates the list and keeps the filter', async () => {
  openFlights('cusco', [flightsMock('cusco'), flightsMock('cusco', '2027-04-02')]);
  await screen.findByText('3 vuelos');

  fireEvent.change(screen.getByLabelText('Salida desde'), { target: { value: '2027-04-02' } });

  expect(await screen.findByText('2 vuelos')).toBeInTheDocument();
  expect(screen.queryByRole('heading', { level: 3, name: 'LATAM' })).not.toBeInTheDocument();
  expect(screen.getByLabelText('Salida desde')).toHaveValue('2027-04-02');
});

test('clearing the date shows every flight again', async () => {
  openFlights('cusco', [flightsMock('cusco'), flightsMock('cusco', '2027-04-02')]);
  await screen.findByText('3 vuelos');
  fireEvent.change(screen.getByLabelText('Salida desde'), { target: { value: '2027-04-02' } });
  await screen.findByText('2 vuelos');

  fireEvent.change(screen.getByLabelText('Salida desde'), { target: { value: '' } });

  expect(await screen.findByText('3 vuelos')).toBeInTheDocument();
});

test('a date after every departure shows the empty message for the filter', async () => {
  openFlights('cusco', [flightsMock('cusco'), flightsMock('cusco', '2030-01-01')]);
  await screen.findByText('3 vuelos');

  fireEvent.change(screen.getByLabelText('Salida desde'), { target: { value: '2030-01-01' } });

  expect(await screen.findByText('No hay vuelos desde esa fecha. Prueba con otra fecha.')).toBeInTheDocument();
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});

test('the destination without flights shows the empty state', async () => {
  openFlights('isla-de-pascua', [flightsMock('isla-de-pascua')]);

  expect(await screen.findByText('Este destino aún no tiene vuelos.')).toBeInTheDocument();
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});

test('a graphql error is shown as an alert and the tabs stay visible', async () => {
  openFlights('cusco', [serverErrorMock(getFlights, { destination: 'cusco' })]);

  expect(await screen.findByRole('alert')).toHaveTextContent('Error simulado del servidor GraphQL.');
  expect(screen.getByRole('navigation', { name: 'Secciones del destino' })).toBeInTheDocument();
});

test('an unknown destination keeps the friendly not found message', async () => {
  openFlights('no-existe', []);

  expect(await screen.findByRole('heading', { level: 1, name: 'Destino no encontrado' })).toBeInTheDocument();
});

test('a graphql unknown destination error is shown as an alert', async () => {
  openFlights('cusco', [serverErrorMock(getFlights, { destination: 'cusco' }, 'El destino «cusco» no existe.')]);

  expect(await screen.findByRole('alert')).toHaveTextContent('El destino «cusco» no existe.');
});
