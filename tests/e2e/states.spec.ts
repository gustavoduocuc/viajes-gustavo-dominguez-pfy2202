import { expect, test } from '@playwright/test';

test.describe('empty states', () => {
  test('my trip without anything chosen', async ({ page }) => {
    await page.goto('/mi-viaje');

    await expect(page.getByText('Aún no elegiste nada para tu viaje.')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Explorar destinos' })).toBeVisible();
  });

  test('the destination without flights or hotels', async ({ page }) => {
    await page.goto('/destinos/isla-de-pascua');
    await expect(page.getByText('Este destino aún no tiene vuelos ni hoteles.')).toBeVisible();

    await page.goto('/destinos/isla-de-pascua/vuelos');
    await expect(page.getByText('Este destino aún no tiene vuelos.')).toBeVisible();

    await page.goto('/destinos/isla-de-pascua/hoteles');
    await expect(page.getByText('Este destino aún no tiene hoteles.')).toBeVisible();
  });

  test('a filter without results', async ({ page }) => {
    await page.goto('/destinos/cusco/vuelos');
    await expect(page.getByText('3 vuelos')).toBeVisible();

    await page.getByLabel('Salida desde').fill('2030-01-01');

    await expect(page.getByText('No hay vuelos desde esa fecha. Prueba con otra fecha.')).toBeVisible();
  });

  test('the sold out hotels of a destination', async ({ page }) => {
    await page.goto('/destinos/ciudad-del-cabo/hoteles');
    await expect(page.getByText('2 hoteles')).toBeVisible();

    await page.getByLabel('Solo disponibles').check();

    await expect(page.getByText('No hay hoteles disponibles. Desactiva el filtro para verlos todos.')).toBeVisible();
  });
});

test.describe('error states', () => {
  test('the destinations list fails with a server error', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('mockFail', 'destinations'));
    await page.goto('/destinos');

    await expect(page.getByRole('alert')).toContainText('Error simulado del servidor.');
    await expect(page.getByRole('link', { name: 'Volver a Inicio' })).toBeVisible();
  });

  test('the destination detail fails with a server error', async ({ page }) => {
    await page.goto('/destinos/error-500');

    await expect(page.getByRole('alert')).toContainText('Error simulado del servidor.');
    await expect(page.getByRole('link', { name: 'Volver a Destinos' })).toBeVisible();
  });

  test('the graphql offers fail with a graphql error', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('mockFail', 'graphql'));
    await page.goto('/destinos/cusco/vuelos');

    await expect(page.getByRole('alert')).toContainText('Error simulado del servidor GraphQL.');
    await expect(page.getByRole('navigation', { name: 'Secciones del destino' })).toBeVisible();
  });
});

test.describe('not found', () => {
  test('an unknown destination', async ({ page }) => {
    await page.goto('/destinos/no-existe');

    await expect(page.getByRole('heading', { level: 1, name: 'Destino no encontrado' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Volver a Destinos' })).toBeVisible();
  });

  test('an unknown address', async ({ page }) => {
    await page.goto('/viajes-a-marte');

    await expect(page.getByRole('heading', { level: 1, name: 'Página no encontrada' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Volver a Inicio' })).toBeVisible();
  });
});
