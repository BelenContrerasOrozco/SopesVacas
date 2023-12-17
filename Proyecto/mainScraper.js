// Archivo: mainScraper.js
const { scrapeSocialLinks } = require('./scrapers/scrapeSocialLinks');

const main = async (url) => {
  const socialLinks = await scrapeSocialLinks(url);

  if (socialLinks) {
    // Ejecutar scrapers en paralelo
    const [facebookInfo, instagramInfo, linkedInInfo, twitterInfo] = await Promise.all([
      scrapeFacebook(socialLinks.facebook),
      scrapeInstagram(socialLinks.instagram),
      scrapeLinkedIn(socialLinks.linkedIn),
      scrapeTwitter(socialLinks.twitter),
    ]);

    console.log('Información de Facebook:', facebookInfo);
    console.log('Información de Instagram:', instagramInfo);
    console.log('Información de LinkedIn:', linkedInInfo);
    console.log('Información de Twitter:', twitterInfo);
  } else {
    console.log('No se encontraron enlaces de redes sociales.');
  }
};

// Ejecutar el programa principal
const url = 'https://www.coca-cola.com/es/es'; 
main(url);
