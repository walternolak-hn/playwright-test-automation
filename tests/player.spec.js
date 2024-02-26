// @ts-check
const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pageObjects/home.page');
const { PlayerPage } = require('../pageObjects/player.page');
import dotenv from 'dotenv';
dotenv.config();

test.beforeEach('Land into Homepage', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();
  await expect(homePage.nyaNewsWelcomeMessage).toBeVisible();
  await (homePage.nyaNewsWelcomeNoThanksButton).click();
  await expect(homePage.nyaNewsWelcomeMessage).not.toBeVisible();
});

test('can play a song for 5 seconds', async ({ page }) => {
  const playerPage = new PlayerPage(page);

  await playerPage.playSongForNSeconds('00:05');
});
test('can pause playing a song', async ({ page }) => {
  const playerPage = new PlayerPage(page);

  await test.step('Play Song', async () => {
    await playerPage.playSongForNSeconds('00:03');
  });

  await playerPage.pausePlayingSong();
});
test('can turn volume down', async ({ page }) => {
  const playerPage = new PlayerPage(page);

  await test.step('Play Song', async () => {
    await playerPage.playSongForNSeconds('00:02');
  });

  await playerPage.turnVolumeDown(page);
});
test('can turn volume up', async ({ page }) => {
  const playerPage = new PlayerPage(page);

  await test.step('Play Song and turn down volume', async () => {
    await playerPage.playSongForNSeconds('00:02');

    const volumeLevel = await playerPage.volumeSlider.getAttribute('value');
    if (volumeLevel != null) {
      let parsedVolumeLevel = parseInt(volumeLevel);

      if (parsedVolumeLevel === 100) {
        await playerPage.turnVolumeDown(page);
      }
    }
  });

  await playerPage.turnVolumeUp();
});
test('can switch sound quality to low resolution', async ({ page }) => {
  const playerPage = new PlayerPage(page);

  await playerPage.playSongForNSeconds('00:03');
  await expect(playerPage.soundQualitySwitch).toHaveClass(/high/);

  await playerPage.soundQualitySwitch.click();

  await expect(playerPage.soundQualitySwitch).toHaveClass(/low/);
  await expect(playerPage.meterKbpsReadout).toHaveText('320');
});
test('can switch sound quality to high resolution', async ({ page }) => {
  const playerPage = new PlayerPage(page);

  await test.step('Play Song and switch to low resolution audio quality', async () => {
    await playerPage.playSongForNSeconds('00:03');
    await expect(playerPage.soundQualitySwitch).toHaveClass(/high/);

    await playerPage.soundQualitySwitch.click();

    await expect(playerPage.soundQualitySwitch).toHaveClass(/low/);
    await expect(playerPage.meterKbpsReadout).toHaveText('320');
  });

  await playerPage.soundQualitySwitch.click();
  await expect(playerPage.soundQualitySwitch).toHaveClass(/high/);
});