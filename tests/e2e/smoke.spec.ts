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
