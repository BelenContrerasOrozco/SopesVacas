// Archivo: scrapers/instagramScraper.js

const { firefox } = require('playwright');

const scrapeInstagram = async (url) => {
  const browser = await firefox();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Lógica específica de Instagram
    const instagramInfo = await page.$eval('.instagram-info', el =>
      el.textContent.trim()
    );

    return instagramInfo;
  } catch (error) {
    console.error('Error al momento de hacer scraping:', error);
  } finally {
    await browser.close();
  }
};

module.exports = scrapeInstagram;
