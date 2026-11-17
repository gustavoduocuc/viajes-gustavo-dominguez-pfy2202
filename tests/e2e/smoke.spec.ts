import { expect, test } from '@playwright/test';

test('home shows the agency and its section menu', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('link', { name: 'Agencia de viajes' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Inicio' })).toBeVisible();
  await expect(
    page.getByRole('heading', { level: 1, name: 'Agencia de viajes' })
  ).toBeVisible();
});
