import { gql } from '@apollo/client';
import { createApolloClient } from './client';

const getGreeting = gql`
  query GetGreeting {
    greeting
  }
`;

test('the client sends its queries to the graphql endpoint', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    status: 200,
    headers: new Map([['content-type', 'application/json']]),
    text: () => Promise.resolve(JSON.stringify({ data: { greeting: 'hola' } })),
  });

  const result = await createApolloClient().query({ query: getGreeting });

  expect(global.fetch.mock.calls[0][0]).toBe('/graphql');
  expect(result.data).toEqual({ greeting: 'hola' });
});
