const { firefox } = require('playwright');

const scrapeSocialLinks = async (url) => {
  const browser = await firefox();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    const socialLinks = await page.$$eval('a.social-link', links =>
      links.map(link => link.href)
    );

    return socialLinks;
  } catch (error) {
    console.error('Error al momento de realizar el scraping:', error);
  } finally {
    await browser.close();
  }
};

module.exports = scrapeSocialLinks;
