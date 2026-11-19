import { useQuery } from '@apollo/client/react';
import { MockedProvider } from '@apollo/client/testing/react';
import { render, screen } from '@testing-library/react';
import { getFlights } from '../graphql/queries';
import { flightsMock, hotelsMock, offersMock, serverErrorMock } from './offersMocks';

function FlightCount(props) {
  const result = useQuery(getFlights, { variables: props.variables });
  if (result.loading) {
    return <p>loading</p>;
  }
  if (result.error) {
    return <p role="alert">{result.error.message}</p>;
  }
  return <p>{result.data.flights.length} vuelos</p>;
}

test('a flights mock answers the query with the same variables', async () => {
  render(
    <MockedProvider mocks={[flightsMock('cusco')]}>
      <FlightCount variables={{ destination: 'cusco' }} />
    </MockedProvider>
  );

  expect(await screen.findByText('3 vuelos')).toBeInTheDocument();
});

test('an error mock reaches the component as an error message', async () => {
  const mock = serverErrorMock(getFlights, { destination: 'cusco' }, 'Fallo de prueba');
  render(
    <MockedProvider mocks={[mock]}>
      <FlightCount variables={{ destination: 'cusco' }} />
    </MockedProvider>
  );

  expect(await screen.findByRole('alert')).toHaveTextContent('Fallo de prueba');
});

test('the other mock builders include their variables', () => {
  expect(hotelsMock('roma', true).request.variables).toEqual({ destination: 'roma', onlyAvailable: true });
  expect(hotelsMock('roma').request.variables).toEqual({ destination: 'roma' });
  expect(offersMock('kioto').request.variables).toEqual({ destination: 'kioto' });
});
