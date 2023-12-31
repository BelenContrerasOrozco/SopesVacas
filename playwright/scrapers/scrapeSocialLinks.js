// Archivo: scrapers/scrapeSocialLinks.js
const { firefox } = require('playwright');

const scrapeSocialLinks = async (url) => {
  const browser = await firefox.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Lógica específica para obtener enlaces de redes sociales
    const socialLinks = {
      /*facebook: await page.$eval('.facebook-link', el => el.href),
      instagram: await page.$eval('.instagram-link', el => el.href),
      linkedIn: await page.$eval('.linkedin-link', el => el.href),
      twitter: await page.$eval('.twitter-link', el => el.href),
      facebook: 'https://www.facebook.com/Mcdonalds.Guatemala/',
      instagram: 'https://www.instagram.com/mcguate/',
      linkedIn: 'https://www.linkedin.com/company/mcdonald%27s-corporation/?originalSubdomain=es',
      twitter: 'https://twitter.com/McGuate',*/

      facebook: await page.goto('https://www.facebook.com/Mcdonalds.Guatemala/'),
      instagram: await page.goto('https://www.instagram.com/mcguate/'),
      linkedIn: await page.goto('https://www.linkedin.com/company/mcdonald%27s-corporation/?originalSubdomain=es'),
      twitter: await page.goto('https://twitter.com/McGuate'),
    };
/*
    const urlFacebook = await page.$eval('.facebook-link', el => el.href);

    console.log("URL de Facebook:", urlFacebook);
*/
    return socialLinks;
  } catch (error) {
    console.error('Error during scraping social links:', error);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeSocialLinks };