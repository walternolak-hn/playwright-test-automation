// @ts-check
const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pageObjects/home.page');
const { PlayerPage } = require('../pageObjects/player.page');
const { AlbumPage } = require('../pageObjects/album.page');

test.beforeEach('Land into the album page', async ({ page }) => {
  const albumPage = new AlbumPage(page);
  const homePage = new HomePage(page);
  const playerPage = new PlayerPage(page);

  await homePage.goto();
  await homePage.skipWelcomeMessage();

  await albumPage.goto();
  await expect(page).toHaveURL(/.*id=A_031/);
  await expect(albumPage.songsTitle).toBeVisible();
  await expect(playerPage.nextSongButton).toHaveClass(/disabled/);
  await expect(playerPage.previousSongButton).toHaveClass(/disabled/);
});

test('can play the next song of an album', async ({ page }) => {
  const albumPage = new AlbumPage(page);
  const playerPage = new PlayerPage(page);
  let firstSongName, nextSongName;

  await test.step('Play a song of the album', async () => {
    await albumPage.songsList.first().click();
    await playerPage.verifyPlayerIsPlayingASong('00:03');
    firstSongName = await playerPage.trackTitle.textContent();
  });

  await expect(playerPage.nextSongButton).toBeEnabled();

  await playerPage.nextSongButton.click();
  await playerPage.verifyPlayerIsPlayingASong('00:03');

  nextSongName = await playerPage.trackTitle.textContent();
  expect(firstSongName).not.toEqual(nextSongName);
});
test('can play the previous song of an album', async ({ page }) => {
  const albumPage = new AlbumPage(page);
  const playerPage = new PlayerPage(page);
  let firstSongName, previousSongName;
  console.log(await albumPage.songsList.last().textContent());

  await test.step('Play a song of the album', async () => {
    await albumPage.songsList.nth(3).click();
    await playerPage.verifyPlayerIsPlayingASong('00:03');
    firstSongName = await playerPage.trackTitle.textContent();
  });

  await expect(playerPage.previousSongButton).toBeEnabled();

  await playerPage.previousSongButton.click();
  await playerPage.verifyPlayerIsPlayingASong('00:03');
  
  previousSongName = await playerPage.trackTitle.textContent();
  expect(firstSongName).not.toEqual(previousSongName);
});