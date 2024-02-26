const { expect } = require('@playwright/test');

exports.HomePage = class HomePage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.nyaNewsWelcomeMessage = page.getByText('Would you like to be added to');
    this.nyaNewsWelcomeNoThanksButton = page.getByRole('button', { name: 'NO, THANKS' });
  }

  async goto() {
    await this.page.goto('/welcome');
  }
  async skipWelcomeMessage() {
    await expect(this.nyaNewsWelcomeMessage).toBeVisible();
    await (this.nyaNewsWelcomeNoThanksButton).click();
    await expect(this.nyaNewsWelcomeMessage).not.toBeVisible();
  }
};