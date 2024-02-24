// @ts-check
const { test, expect } = require('@playwright/test');
const { MenuPage } = require('../pageObjects/menu.page');
const { LoginPage } = require('../pageObjects/login.page');
import dotenv from 'dotenv';
dotenv.config();

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
