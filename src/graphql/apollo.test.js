import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { MockedProvider } from '@apollo/client/testing/react';
import { render, screen } from '@testing-library/react';

const getGreeting = gql`
  query GetGreeting {
    greeting
  }
`;

function Greeting() {
  const result = useQuery(getGreeting);
  return <p>{result.loading ? 'loading' : result.data.greeting}</p>;
}

test('a query with MockedProvider shows its data', async () => {
  const mocks = [{ request: { query: getGreeting }, result: { data: { greeting: 'hola' } } }];

  render(
    <MockedProvider mocks={mocks}>
      <Greeting />
    </MockedProvider>
  );

  expect(screen.getByText('loading')).toBeInTheDocument();
  expect(await screen.findByText('hola')).toBeInTheDocument();
});
