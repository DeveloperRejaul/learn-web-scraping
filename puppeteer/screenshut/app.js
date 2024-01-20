import puppeteer from 'puppeteer';

export default async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250,
    defaultViewport: { width: 1920, height: 1080 },
  });

  const page = await browser.newPage();
  await page.goto('https://example.com');

  await page.screenshot({ path: 'example.png' });

  await page.goto('https://devconfbd.com');
  await page.screenshot({ path: 'devconfbd.png' });

  await page.goto('https://github.com/DeveloperRejaul');
  await page.screenshot({ path: 'github.png' });

  await browser.close();
};
