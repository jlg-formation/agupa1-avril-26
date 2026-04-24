import { expect, test } from '@playwright/test';

test('allows managing stock by adding then deleting an article', async ({ page }) => {
  const articleName = `E2E${Date.now().toString().slice(-2)}`;

  await page.goto('/');
  await expect(page).toHaveTitle(/Gestion Stock/);

  await page.getByRole('link', { name: /Voir le stock/i }).click();
  await expect(page).toHaveURL(/\/stock$/);
  await expect(page.getByRole('heading', { name: 'Liste des articles' })).toBeVisible();

  await page.locator('a[title="Ajouter"]').click();
  await expect(page).toHaveURL(/\/stock\/add$/);

  await page.getByLabel('Nom').fill(articleName);
  await page.getByLabel('Prix').fill('12');
  await page.getByLabel('Quantité').fill('3');
  await page.getByRole('button', { name: 'Ajouter' }).click();

  await expect(page).toHaveURL(/\/stock$/);

  const articleRow = page.locator('tbody tr', { hasText: articleName });
  await expect(articleRow).toBeVisible();

  await articleRow.click();
  await page.locator('button[title="Supprimer"]').click();

  await expect(page.locator('tbody tr', { hasText: articleName })).toHaveCount(0);
});
