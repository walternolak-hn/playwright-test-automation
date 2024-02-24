const { expect } = require('@playwright/test');

exports.MenuPage = class MenuPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.loginButton = page.getByText('log in');
    this.usernameLabel = page.getByText('walternolak');
  }

  async goto() {
    await this.page.goto('/menu');
  }
};