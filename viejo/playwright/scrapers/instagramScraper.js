// Archivo: scrapers/scrapeInstagram.js
const { firefox } = require('playwright');

const scrapeInstagram = async (url) => {
  const browser = await firefox();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Obtener número de followers
    const followers = await page.$eval('.followers-count', el => el.textContent.trim());

    // Obtener número de following
    const following = await page.$eval('.following-count', el => el.textContent.trim());

    // Obtener bio
    const bio = await page.$eval('.bio', el => el.textContent.trim());

    // Obtener nombre
    const name = await page.$eval('.profile-name', el => el.textContent.trim());

    // Obtener número de posts
    const posts = await page.$eval('.posts-count', el => el.textContent.trim());

    return { followers, following, bio, name, posts };
  } catch (error) {
    console.error('Error durante el scraping a Instagram:', error);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeInstagram };
