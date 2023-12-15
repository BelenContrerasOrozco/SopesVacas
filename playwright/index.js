const scrapeSocialLinks = require('./mainScraper');
const scrapeFacebook = require('./scrapers/facebookScraper');
const scrapeInstagram = require('./scrapers/instagramScraper');
const scrapeLinkedIn = require('./scrapers/linkedinScraper');
const scrapeTwitter = require('./scrapers/twitterScraper');

const main = async (url) => {
    const socialLinks = await scrapeSocialLinks(url);

    console.log('Enlaces a redes sociales:', socialLinks);

    // Ejecutar scrapers para redes sociales específicas en paralelo
    const facebookInfo = await scrapeFacebook(socialLinks[0]);
    console.log('Información de Facebook:', facebookInfo);

    const instagramInfo = await scrapeInstagram(socialLinks[1]);
    console.log('Información de Instagram:', instagramInfo);

    const linkedInInfo = await scrapeLinkedIn(socialLinks[2]);
    console.log('Información de LinkedIn:', linkedInInfo);

    const twitterInInfo = await scrapeTwitter(socialLinks[3]);
    console.log('Información de Twitter:', twitterInInfo);

    console.log('¡Proceso completo!');
};

// Link de la pagina
const url = 'https://example.com';
main(url);