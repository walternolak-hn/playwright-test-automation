const { expect } = require('@playwright/test');

exports.MenuPage = class MenuPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  get loginButton(){
    return this.page.getByText('log in');
  }
  get logoutButton(){
    return this.page.getByText('LOG OUT');
  }
  get usernameLabel(){
    return this.page.getByText('walternolak');
  }

  async goto() {
    await this.page.goto('/menu');
  }
};