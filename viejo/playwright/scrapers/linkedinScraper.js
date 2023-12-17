// Archivo: scrapers/linkedinScraper.js

const { firefox } = require('playwright');

const scrapeLinkedIn = async (url) => {
  const browser = await firefox();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Lógica específica de LinkedIn
    const linkedInInfo = await page.$eval('.linkedin-info', el =>
      el.textContent.trim()
    );

    return linkedInInfo;
  } catch (error) {
    console.error('Error al momento de hacer scraping:', error);
  } finally {
    await browser.close();
  }
};

module.exports = scrapeLinkedIn;
