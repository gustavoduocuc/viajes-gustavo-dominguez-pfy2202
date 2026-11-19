import { expect, test } from '@playwright/test';

test('home shows the agency, featured destinations and its section menu', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1, name: 'Agencia de viajes' })).toBeVisible();
  const menu = page.getByRole('navigation', { name: 'Secciones' });
  await expect(menu.getByRole('link', { name: 'Inicio' })).toBeVisible();
  await expect(menu.getByRole('link', { name: 'Destinos' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3 })).toHaveCount(3);

  await page.getByRole('link', { name: 'Cusco' }).click();

  await expect(page.getByRole('heading', { level: 1, name: 'Cusco' })).toBeVisible();
});

test('destinations can be filtered and a missing destination is friendly', async ({ page }) => {
  await page.goto('/destinos');

  await expect(page.getByText('8 destinos')).toBeVisible();
  await page.getByLabel('Región').selectOption('Europa');
  await expect(page.getByText('2 destinos')).toBeVisible();

  await page.goto('/destinos/no-existe');
  await expect(page.getByRole('heading', { level: 1, name: 'Destino no encontrado' })).toBeVisible();
});

test('a destination shows its flights and hotels with filters', async ({ page }) => {
  await page.goto('/destinos/cusco');

  await expect(page.getByText('3 vuelos')).toBeVisible();
  const tabs = page.getByRole('navigation', { name: 'Secciones del destino' });

  await tabs.getByRole('link', { name: 'Vuelos' }).click();
  await expect(page.getByText('3 vuelos')).toBeVisible();
  await page.getByLabel('Salida desde').fill('2027-04-02');
  await expect(page.getByText('2 vuelos')).toBeVisible();

  await tabs.getByRole('link', { name: 'Hoteles' }).click();
  await expect(page.getByText('3 hoteles')).toBeVisible();
  await expect(page.getByText('Agotado')).toBeVisible();
  await page.getByLabel('Solo disponibles').check();
  await expect(page.getByText('2 hoteles')).toBeVisible();
  await expect(page.getByText('Agotado')).toHaveCount(0);
});

test('the destination without offers shows the empty state', async ({ page }) => {
  await page.goto('/destinos/isla-de-pascua/vuelos');

  await expect(page.getByText('Este destino aún no tiene vuelos.')).toBeVisible();
});
