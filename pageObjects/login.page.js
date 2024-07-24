import { expect } from '@playwright/test';

export class LoginPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  get loginLabel(){
    return this.page.getByRole('list').getByText('Log In');
  }
  get emailInput(){
    return this.page.getByPlaceholder('Enter Email');
  }
  get passwordInput(){
    return this.page.getByPlaceholder('Password');
  }
  get loginButton(){
    return this.page.getByLabel('Log In');
  }
  get invalidLoginMessage(){
    return this.page.getByText('Wrong email or password.');
  }

  async goto() {
    await this.page.goto('/');
  }
  async doLogin(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}