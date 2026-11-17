import { destinationResponse, listDestinationsResponse } from './destinationResponses';

const emptyStorage = { getItem: () => null };
const failingStorage = { getItem: (key) => (key === 'mockFail' ? 'destinations' : null) };

function inProduction(run) {
  const previous = process.env.NODE_ENV;
  process.env.NODE_ENV = 'production';
  try {
    run();
  } finally {
    process.env.NODE_ENV = previous;
  }
}

test('the list answers 200 with the summaries', () => {
  const response = listDestinationsResponse(emptyStorage);

  expect(response.status).toBe(200);
  expect(response.body).toHaveLength(8);
});

test('the detail answers 200 with the full destination', () => {
  const response = destinationResponse('cusco');

  expect(response.status).toBe(200);
  expect(response.body).toMatchObject({ slug: 'cusco', name: 'Cusco' });
});

test('an unknown slug answers 404 with a message', () => {
  const response = destinationResponse('no-existe');

  expect(response.status).toBe(404);
  expect(response.body.message).toContain('no-existe');
});

test('in development the reserved slug answers 500', () => {
  const response = destinationResponse('error-500');

  expect(response).toEqual({ status: 500, body: { message: 'Error simulado del servidor.' } });
});

test('in development the stored flag makes the list answer 500', () => {
  expect(listDestinationsResponse(failingStorage).status).toBe(500);
});

test('in production the reserved slug is a missing destination', () => {
  inProduction(() => {
    expect(destinationResponse('error-500').status).toBe(404);
  });
});

test('in production the stored flag is ignored', () => {
  inProduction(() => {
    expect(listDestinationsResponse(failingStorage).status).toBe(200);
  });
});

test('an unreadable storage does not break the list', () => {
  const brokenStorage = {
    getItem: () => {
      throw new Error('blocked');
    },
  };

  expect(listDestinationsResponse(brokenStorage).status).toBe(200);
});
