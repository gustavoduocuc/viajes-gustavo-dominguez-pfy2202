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

test('a trip can be planned, survives a refresh and is replaced by another destination', async ({ page }) => {
  await page.goto('/destinos/cusco/vuelos');
  await page.getByRole('button', { name: 'Elegir vuelo LATAM' }).click();
  await expect(page.getByText('Elegido')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Elegir vuelo JetSMART' })).toBeDisabled();

  await page.getByRole('navigation', { name: 'Secciones del destino' }).getByRole('link', { name: 'Hoteles' }).click();
  await page.getByRole('button', { name: 'Elegir hotel Casa Andina Koricancha' }).click();

  const menu = page.getByRole('navigation', { name: 'Secciones' });
  await menu.getByRole('link', { name: /Mi viaje/ }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'Mi viaje' })).toBeVisible();
  await expect(page.getByText('7 noches', { exact: true })).toBeVisible();
  await expect(page.getByRole('region', { name: 'Total estimado' }).getByText(/1085/)).toBeVisible();

  await page.reload();
  await expect(page.getByText('Casa Andina Koricancha')).toBeVisible();

  await page.getByRole('button', { name: 'Quitar hotel Casa Andina Koricancha' }).click();
  await expect(page.getByText('Aún no elegiste un hotel.')).toBeVisible();

  await page.goto('/destinos/roma/vuelos');
  await page.getByRole('button', { name: 'Elegir vuelo Iberia' }).click();
  await expect(page.getByText('Se reemplazó tu viaje a Cusco por una oferta de Roma.')).toBeVisible();
  await page.getByRole('button', { name: 'Cerrar aviso' }).click();
  await expect(page.getByText(/Se reemplazó tu viaje/)).toHaveCount(0);
});

test('an empty trip shows the empty state with a way to destinations', async ({ page }) => {
  await page.goto('/mi-viaje');

  await expect(page.getByText('Aún no elegiste nada para tu viaje.')).toBeVisible();
  await page.getByRole('link', { name: 'Explorar destinos' }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'Destinos' })).toBeVisible();
});
