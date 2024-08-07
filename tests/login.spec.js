import { test, expect } from '@playwright/test';
import { MenuPage } from '../pageObjects/menu.page';
import { LoginPage } from '../pageObjects/login.page';
import dotenv from 'dotenv';
dotenv.config();

test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ page }) => {
  const menuPage = new MenuPage(page);
  const loginPage = new LoginPage(page);

  await menuPage.goto();
  await expect(page).toHaveTitle(/Neil Young Archives/);
  await menuPage.loginButton.click();

  await expect(loginPage.loginLabel).toBeVisible();
});

test('can login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const menuPage = new MenuPage(page);
  
  await loginPage.doLogin(process.env.EMAIL, process.env.VALID_PASSWORD)
  await expect(menuPage.usernameLabel).toBeVisible();
});

test('cannot login with invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.doLogin(process.env.EMAIL, process.env.INVALID_PASSWORD)
  await expect(loginPage.invalidLoginMessage).toBeVisible();
});
