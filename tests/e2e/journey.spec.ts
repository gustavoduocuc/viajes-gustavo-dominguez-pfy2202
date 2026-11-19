import { expect, test } from '@playwright/test';

test('the full journey from home to my trip', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: 'Agencia de viajes' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3 })).toHaveCount(3);

  const menu = page.getByRole('navigation', { name: 'Secciones' });
  await menu.getByRole('link', { name: 'Destinos' }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'Destinos' })).toBeVisible();
  await expect(page.getByText('8 destinos')).toBeVisible();

  await page.getByRole('link', { name: 'Cusco' }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'Cusco' })).toBeVisible();
  await expect(page.getByText('3 vuelos')).toBeVisible();

  const tabs = page.getByRole('navigation', { name: 'Secciones del destino' });
  await tabs.getByRole('link', { name: 'Vuelos' }).click();
  await expect(page.getByText('3 vuelos')).toBeVisible();
  await expect(page.getByText('10 mar 2027').first()).toBeVisible();
  await page.getByRole('button', { name: 'Elegir vuelo LATAM' }).click();
  await expect(page.getByText('Elegido')).toBeVisible();

  await tabs.getByRole('link', { name: 'Hoteles' }).click();
  await expect(page.getByText('3 hoteles')).toBeVisible();
  await page.getByRole('button', { name: 'Elegir hotel Casa Andina Koricancha' }).click();
  await expect(page.getByText('Elegido')).toBeVisible();

  await menu.getByRole('link', { name: /Mi viaje/ }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'Mi viaje' })).toBeVisible();
  await expect(page.getByText('LATAM')).toBeVisible();
  await expect(page.getByText('Casa Andina Koricancha')).toBeVisible();
  await expect(page.getByText('7 noches', { exact: true })).toBeVisible();
  await expect(page.getByRole('region', { name: 'Total estimado' }).getByText(/1085/)).toBeVisible();
});

test('the trip survives a refresh and a sold out offer cannot be chosen', async ({ page }) => {
  await page.goto('/destinos/cusco/vuelos');
  await expect(page.getByRole('button', { name: 'Elegir vuelo JetSMART' })).toBeDisabled();
  await expect(page.getByText('Agotado')).toBeVisible();
  await page.getByRole('button', { name: 'Elegir vuelo Sky Airline' }).click();

  await page.goto('/mi-viaje');
  await page.reload();

  await expect(page.getByText('Sky Airline')).toBeVisible();
});
