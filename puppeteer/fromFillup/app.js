import puppeteer from 'puppeteer';

export default async function app() {
  // launch browser
  const browser = await puppeteer.launch({
    headless: false,
    // slowMo: 250,
    defaultViewport: { width: 1920, height: 1080 },
    // userDataDir: 'temporary',
  });

  // create a new page
  const page = await browser.newPage();

  // go to url
  await page.goto('https://duckduckgo.com', { waitUntil: 'networkidle2' });

  // select searchbar
  const searsBarHandle = await page.waitForSelector('#searchbox_input');

  // select search button
  const button = await page.waitForSelector('[aria-label="Search"]');

  // type soothing
  await searsBarHandle.type('devconfbd');

  // click search button
  await button.click();

  // await page results
  const fastResult = await page.waitForSelector('[data-testid="result-title-a"]');
  await fastResult.click();

  // await page results
  await page.waitForSelector('.sponsors a, .supporter a');

  // find all sponsors link // evaluate method give us access to write query in browser dom like console
  const sponsorsLinks = await page.evaluate(() => {
    const links = document.querySelectorAll('.sponsors a');
    return Array.from(links).map((link) => link.href);
  });

  // select supporter links
  const supporterLinks = await page.evaluate(() => {
    const links = document.querySelectorAll('.supporter a');
    return Array.from(links).map((link) => link.href);
  });

  // this function open new page take some information from link
  async function getLink(link) {
    const newPage = await browser.newPage();
    await newPage.goto(link, { waitUntil: 'networkidle2' });
    const title = await newPage.title();
    const hostName = await newPage.evaluate(() => window.location.hostname);
    await newPage.screenshot({ path: `${hostName}.png` });
    const facebookLink = await newPage.evaluate(() => {
      const fb = document.querySelector('a[href*="facebook"]');
      return fb ? fb.href : null;
    });
    console.log({ title, hostName, facebookLink });
    await newPage.close();
  }

  await Promise.allSettled(supporterLinks.map(async (link) => await getLink(link)));

  browser.close();
}
