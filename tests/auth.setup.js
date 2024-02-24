import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';
const { MenuPage } = require('../pageObjects/menu.page');
const { LoginPage } = require('../pageObjects/login.page');
import dotenv from 'dotenv';
dotenv.config();

setup('authenticate', async ({ page }) => {
  const menuPage = new MenuPage(page);
  const loginPage = new LoginPage(page);

  await menuPage.goto();
  await expect(page).toHaveTitle(/Neil Young Archives/);
  await menuPage.loginButton.click();

  await expect(loginPage.loginLabel).toBeVisible();
  await loginPage.doLogin(process.env.EMAIL, process.env.VALID_PASSWORD)
  await expect(menuPage.usernameLabel).toBeVisible();

  await page.context().storageState({ path: authFile });
});