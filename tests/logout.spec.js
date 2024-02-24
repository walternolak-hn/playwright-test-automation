// @ts-check
const { test, expect } = require('@playwright/test');
const { MenuPage } = require('../pageObjects/menu.page');
import dotenv from 'dotenv';
dotenv.config();

test('can logout successfully', async ({ page }) => {
  const menuPage = new MenuPage(page);
  
  await menuPage.goto();
  await expect(menuPage.logoutButton).toBeVisible();

  await menuPage.logoutButton.click();

  await expect(page).toHaveURL(/.*welcome/);
});