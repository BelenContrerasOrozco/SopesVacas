// Archivo: scrapers/scrapeFacebook.js
const { firefox } = require('playwright');

const scrapeFacebook = async (url) => {
  const browser = await firefox.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Obtener número de followers
    const followers = await page.$eval('.followers-count', el => el.textContent.trim());

    // Obtener número de posts
    const posts = await page.$eval('.posts-count', el => el.textContent.trim());

    return { followers, posts };
  } catch (error) {
    console.error('Error during scraping Facebook:', error);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeFacebook };
