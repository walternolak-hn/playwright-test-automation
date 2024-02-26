const { expect } = require('@playwright/test');

exports.PlayerPage = class PlayerPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.playerPlayPauseButton = page.locator('.play-pause-button');
    this.playerLeftTimeIndicator = page.locator('.time-indicators > .left');
    this.volumeSlider = page.getByRole('slider');
    this.soundQualitySwitch = page.locator('.quality-switch');
    this.meterKbpsReadout = page.locator('.meter > .readout');
    this.nextSongButton = page.locator('.next-button');
    this.previousSongButton = page.locator('.prev-button');
    this.trackTitle = page.locator('.track-title');
  }

  async goto() {
    await this.page.goto('/');
  }

  async playSongForNSeconds(time) {
    await expect(this.playerPlayPauseButton).toHaveClass(/play/);
    await this.playerPlayPauseButton.click();
    await expect(this.playerPlayPauseButton).toHaveClass(/pause/);
    await expect(this.playerLeftTimeIndicator).toHaveText(time, { timeout: 10000 });
  }
  async pausePlayingSong() {
    await expect(this.playerPlayPauseButton).toHaveClass(/pause/);
    await this.playerPlayPauseButton.click();
    await expect(this.playerPlayPauseButton).toHaveClass(/play/);
  }
  async turnVolumeDown(page) {
    let parsedInitialValue, parsedLastValue;
    const initialValue = await this.volumeSlider.getAttribute('value')

    await this.volumeSlider.hover();
    await page.mouse.down();

    const lastValue = await this.volumeSlider.getAttribute('value')

    if (initialValue != null && lastValue != null) {
      parsedInitialValue = parseInt(initialValue);
      parsedLastValue = parseInt(lastValue);
      expect(parsedLastValue).toBeLessThan(parsedInitialValue);
    }
  }
  async turnVolumeUp() {
    let parsedInitialValue, parsedLastValue;
    const initialValue = await this.volumeSlider.getAttribute('value')

    await this.volumeSlider.click({ position: { x: 10, y: 10 } });

    const lastValue = await this.volumeSlider.getAttribute('value')

    if (initialValue != null && lastValue != null) {
      parsedInitialValue = parseInt(initialValue);
      parsedLastValue = parseInt(lastValue);
      expect(parsedLastValue).toBeGreaterThan(parsedInitialValue);
    }
  }
  async verifyPlayerIsPlayingASong(time) {
    await expect(this.playerPlayPauseButton).toHaveClass(/pause/);
    await expect(this.playerLeftTimeIndicator).toHaveText(time, { timeout: 10000 });
  }
};