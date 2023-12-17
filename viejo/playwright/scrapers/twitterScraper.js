// Archivo: scrapers/twitterScraper.js

const { firefox } = require('playwright');

const scrapeTwitter = async (url) => {
  const browser = await firefox();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Lógica específica de twitter
    const TwitterInfo = await page.$eval('.x-info', el =>
      el.textContent.trim()
    );

    return TwitterInfo;
  } catch (error) {
    console.error('Error al momento de hacer scraping:', error);
  } finally {
    await browser.close();
  }
};

module.exports = scrapeTwitter;
