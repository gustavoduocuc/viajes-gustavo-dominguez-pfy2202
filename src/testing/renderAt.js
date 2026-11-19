import { MockedProvider } from '@apollo/client/testing/react';
import { render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { routes } from '../routing/routes';

// options.mocks: respuestas GraphQL simuladas para MockedProvider.
export function renderAt(path, options = {}) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  render(
    <MockedProvider mocks={options.mocks ?? []}>
      <RouterProvider router={router} />
    </MockedProvider>
  );
  return router;
}
