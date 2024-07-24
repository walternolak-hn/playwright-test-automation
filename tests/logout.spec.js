// @ts-check
import { test, expect } from '@playwright/test';
import { MenuPage } from '../pageObjects/menu.page';

test('can logout successfully', async ({ page }) => {
  const menuPage = new MenuPage(page);
  
  await menuPage.goto();
  await expect(menuPage.logoutButton).toBeVisible();

  await menuPage.logoutButton.click();

  await expect(page).toHaveURL(/.*welcome/);
});