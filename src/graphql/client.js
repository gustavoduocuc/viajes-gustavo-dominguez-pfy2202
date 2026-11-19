import { ApolloClient, InMemoryCache } from '@apollo/client';
import { HttpLink } from '@apollo/client/link/http';

export function createApolloClient() {
  return new ApolloClient({
    link: new HttpLink({ uri: '/graphql' }),
    cache: new InMemoryCache(),
  });
}
