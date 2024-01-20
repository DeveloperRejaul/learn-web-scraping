import puppeteer from 'puppeteer';
import { setTimeout } from 'timers/promises';

export default async function selector() {
  try {
    // launch browser
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 250,
      defaultViewport: { width: 1920, height: 1080 },
    });

    // create a new page
    const page = await browser.newPage();

    // go to url
    await page.goto('https://devconfbd.com', { timeout: 60000 });

    // await browser.
    const guest = await page.waitForSelector('img[alt="guest"]');

    await guest.scrollIntoView();
    await setTimeout(1000);

    await page.click('img[alt="guest"]');
    await setTimeout(1000);

    // take screenshot
    await page.screenshot({ path: 'guest.png' });

    await browser.close();
  } catch (error) {
    console.log(error);
  }
}
