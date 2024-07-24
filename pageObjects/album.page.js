import { expect } from '@playwright/test';

export class AlbumPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  get songsTitle(){
    return this.page.getByText('songs');
  }
  get songsList(){
    return this.page.getByRole('listitem');
  }

  async goto() {
    await this.page.goto('/album?id=A_031');
  }
}