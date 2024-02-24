const { expect } = require('@playwright/test');

exports.LoginPage = class LoginPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.loginLabel = page.getByRole('list').getByText('Log In');
    this.emailInput = page.getByPlaceholder('Enter Email');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByLabel('Log In');
    this.invalidLoginMessage = page.getByText('Wrong email or password.');
  }

  async goto() {
    await this.page.goto('/');
  }

  async doLogin(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
};