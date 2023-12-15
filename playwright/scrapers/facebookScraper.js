// Archivo: scrapers/facebookScraper.js

const { firefox } = require('playwright');

const scrapeFacebook = async (url) => {
  const browser = await firefox();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Lógica específica de Facebook
    const facebookInfo = await page.$eval('.facebook-info', el =>
      el.textContent.trim()
    );

    return facebookInfo;
  } catch (error) {
    console.error('Error al momento de hacer scraping:', error);
  } finally {
    await browser.close();
  }
};

module.exports = scrapeFacebook;
