const { expect } = require('@playwright/test');

exports.AlbumPage = class AlbumPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.songsTitle = page.getByText('songs');
    this.songsList = page.getByRole('listitem');
  }

  async goto() {
    await this.page.goto('/album?id=A_031');
  }
}