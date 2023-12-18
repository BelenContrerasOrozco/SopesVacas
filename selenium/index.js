const express = require('express');
const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const app = express();
const PORT = 3002;
// Configuración de Selenium
const configuracionChrome = new chrome.Options().headless();
app.use(express.json());

app.post('/linked', async (req, res) => {
  const driver = new Builder()
    .forBrowser('chrome') // Puedes cambiarlo a 'firefox' si lo prefieres
    .setChromeOptions(configuracionChrome)
    .build();
  console.log(req.body)


  try {
    const { url } = req.body;
    if (!url) {
      throw new Error('La solicitud debe contener una URL.');
    }
    console.log(`Entrando a ${url}`)
    await driver.get(`${url}`);
    let followersCount, followingCount, bioText, postCount, nameText;
    try {
      const bioElement = await driver.findElement(By.xpath('/html/body/main/section[1]/section/div/div[2]/div[1]/h2'));
      bioText = await bioElement.getText();
    } catch (err) {
      followersCount = err.message;
    }
    try {
      const followersElement = await driver.findElement(By.xpath('/html/body/main/section[1]/section/div/div[2]/div[1]/h3'));
      followersCount = await (await followersElement.getText()).toString().replace(/\D/g, '')
    } catch (err) {
      followersCount = err.message;
    }
    try {
      const followingElement = await driver.findElement(By.xpath('/html/body/main/section[1]/section/div/div[2]/div[2]/ul/li/div/a'));
      followingCount = (await followingElement.getText()).toString().replace(/\D/g, '')
        ;
    } catch (err2) {
      followingCount = err2.message;
    }
    try {
      const nameElement = await driver.findElement(By.xpath('/html/body/main/section[1]/section/div/div[2]/div[1]/h1'));
      nameText = await nameElement.getText();
    } catch (err4) {
      nameText = err4.message;
    }

    try {
      const postsElement = await driver.findElement(By.xpath('/html/body/main/section[1]/div/section[1]/div/p'));
      postCount = await postsElement.getAttribute('textContent')

    } catch (err4) {
      postCount = err4.message;
    }
    res.json({ Selenium: [{ linkedin: { followers: followersCount, following: followingCount, bio: bioText, name: nameText, posts: postCount } }] });
  }
  catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
  finally {
    // Cierra el navegador después de cada tarea
    //await driver.quit();
  }
});

app.get('/test', async (req, res) => {
  const driver = new Builder()
    .forBrowser('chrome') // Puedes cambiarlo a 'firefox' si lo prefieres
    //.setChromeOptions(configuracion)
    .build();


  try {
    //const { username } = req.query;
    username = "otro_usuario_aburrido"

    // Accede al perfil
    await driver.get(`https://www.instagram.com/${username}/`);
    await driver.wait(until.urlIs(`https://www.instagram.com/${username}/`), 10000);

    let followersCount, followingCount, bioText, postCount, nameText;
    // Obtiene el número de seguidores
    try {
      const followersElement = await driver.findElement(By.css('span[aria-label="Seguidores"]'));
      followersCount = await followersElement.getText();
    } catch (err) {
      followersCount = err.message;
    }

    try {
      const followingElement = await driver.findElement(By.xpath('/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/section/main/div/header/section/ul/li[3]/button/span/span'));
      followingCount = await followingElement.getText();
    } catch (err2) {
      followingCount = err2.message;
    }

    try {
      const bioElement = await driver.findElement(By.xpath('/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/section/main/div/header/section/div[3]/h1'));
      bioText = await bioElement.getText();
    } catch (err3) {
      bioText = err3.message;
    }

    try {
      const nameElement = await driver.findElement(By.xpath('/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/section/main/div/header/section/div[3]/div[1]/span'));
      nameText = await nameElement.getText();
    } catch (err4) {
      nameText = err4.message;
    }

    try {
      const postsElement = await driver.findElement(By.xpath('/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/section/main/div/header/section/ul/li[1]/button/span/span'));
      postCount = await postsElement.getText();
    } catch (err4) {
      postCount = err4.message;
    }

    res.json({ Selenium: [{ Instagram: { Followers: followersCount, Following: followingCount, Bio: bioText, Name: nameText, Posts: postCount } }] });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
  finally {
    // Cierra el navegador después de cada tarea
    //await driver.quit();
  }
});

async function scrapFacebook(url, configuracion) {
  const driver = new Builder()
    .forBrowser('chrome') // Puedes cambiarlo a 'firefox' si lo prefieres
    //.setChromeOptions(configuracion)
    .build();
  try {
    if (!url) {
      throw new Error('La solicitud debe contener una URL.');
    }
    console.log(`Entrando a ${url}`)
    await driver.get(`${url}`);
    let followersCount, followingCount, bioText, postCount, nameText;
    try {
      const bioElement = await driver.findElement(By.xpath('/html/body/div[1]/div/div/div[2]/main/div/div/div/div[1]/div/div[3]/div/div/div/div/div[3]/div/div/span'));
      bioText = await bioElement.getText();
    } catch (err) {
      followersCount = err.message;
    }
    try {
      const followersElement = await driver.findElement(By.xpath('/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[1]/div[2]/div/div/div/div[3]/div/div/div[2]/span/a[1]'));
      followersCount = await (await followersElement.getText()).toString()
    } catch (err) {
      followersCount = err.message;
    }
    try {
      const followingElement = await driver.findElement(By.xpath('/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[1]/div[2]/div/div/div/div[3]/div/div/div[2]/span/a[1]'));
      followingCount = (await followingElement.getText()).toString()
        ;
    } catch (err2) {
      followingCount = err2.message;
    }
    try {
      const nameElement = await driver.findElement(By.xpath('/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[1]/div[2]/div/div/div/div[3]/div/div/div[1]/div/div/span/h1'));
      nameText = await nameElement.getText();
    } catch (err4) {
      nameText = err4.message;
    }

    try {
      //const postsElement = await driver.findElement(By.xpath('/html/body/div[1]/div/div/div[2]/main/div/div/div/div[1]/div/div[1]/div[1]/div/div/div/div/div/div[2]/div/div'));
      postCount = ""

    } catch (err4) {
      postCount = err4.message;
    }
    return { facebook: { followers: followersCount, likes: followingCount, bio: bioText, name: nameText, posts: postCount } };
  }
  catch (error) {
    console.error('Error:', error.message);
    return { error }
  }
  finally {
    // Cierra el navegador después de cada tarea
    //await driver.quit();
  }
}
async function scrapInsta(url, configuracion) {
  const driver = new Builder()
    .forBrowser('chrome') // Puedes cambiarlo a 'firefox' si lo prefieres
    //.setChromeOptions(configuracion)
    .build();
  try {
    if (!url) {
      throw new Error('La solicitud debe contener una URL.');
    }
    console.log(`Entrando a ${url}`)
    await driver.get(`${url}`);
    let followersCount, followingCount, bioText, postCount, nameText;
    try {
      const followersElement = await driver.findElement(By.css('span[aria-label="Seguidores"]'));
      followersCount = await followersElement.getText();
    } catch (err) {
      followersCount = err.message;
    }

    try {
      const followingElement = await driver.findElement(By.xpath('/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/section/main/div/header/section/ul/li[3]/button/span/span'));
      followingCount = await followingElement.getText();
    } catch (err2) {
      followingCount = err2.message;
    }

    try {
      const bioElement = await driver.findElement(By.xpath('/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/section/main/div/header/section/div[3]/h1'));
      bioText = await bioElement.getText();
    } catch (err3) {
      bioText = err3.message;
    }

    try {
      const nameElement = await driver.findElement(By.xpath('/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/section/main/div/header/section/div[3]/div[1]/span'));
      nameText = await nameElement.getText();
    } catch (err4) {
      nameText = err4.message;
    }

    try {
      const postsElement = await driver.findElement(By.xpath('/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[2]/section/main/div/header/section/ul/li[1]/button/span/span'));
      postCount = await postsElement.getText();
    } catch (err4) {
      postCount = err4.message;
    }
    return { instagram: { followers: followersCount, likes: followingCount, bio: bioText, name: nameText, posts: postCount } };
  }
  catch (error) {
    console.error('Error:', error.message);
    return { error }
  }
  finally {
    // Cierra el navegador después de cada tarea
    //await driver.quit();
  }
}


async function scrapLinked(url, configuracion) {
  const driver = new Builder()
    .forBrowser('chrome') // Puedes cambiarlo a 'firefox' si lo prefieres
    .setChromeOptions(configuracion)
    .build();
  try {
    if (!url) {
      throw new Error('La solicitud debe contener una URL.');
    }
    console.log(`Entrando a ${url}`)
    await driver.get(`${url}`);
    let followersCount, followingCount, bioText, postCount, nameText;
    try {
      const bioElement = await driver.findElement(By.xpath('/html/body/main/section[1]/section/div/div[2]/div[1]/h2'));
      bioText = await bioElement.getText();
    } catch (err) {
      followersCount = err.message;
    }
    try {
      const followersElement = await driver.findElement(By.xpath('/html/body/main/section[1]/section/div/div[2]/div[1]/h3'));
      followersCount = await (await followersElement.getText()).toString().replace(/\D/g, '')
    } catch (err) {
      followersCount = err.message;
    }
    try {
      const followingElement = await driver.findElement(By.xpath('/html/body/main/section[1]/section/div/div[2]/div[2]/ul/li/div/a'));
      followingCount = (await followingElement.getText()).toString().replace(/\D/g, '')
        ;
    } catch (err2) {
      followingCount = err2.message;
    }
    try {
      const nameElement = await driver.findElement(By.xpath('/html/body/main/section[1]/section/div/div[2]/div[1]/h1'));
      nameText = await nameElement.getText();
    } catch (err4) {
      nameText = err4.message;
    }

    try {
      const postsElement = await driver.findElement(By.xpath('/html/body/main/section[1]/div/section[1]/div/p'));
      postCount = await postsElement.getAttribute('textContent')

    } catch (err4) {
      postCount = err4.message;
    }
    return { linkedin: { followers: followersCount, following: followingCount, bio: bioText, name: nameText, posts: postCount } };
  }
  catch (error) {
    console.error('Error:', error.message);
    return { error }
  }
  finally {
    // Cierra el navegador después de cada tarea
    await driver.quit();
  }
}

async function scrapTwitter(url, configuracion) {
  const driver = new Builder()
    .forBrowser('chrome') // Puedes cambiarlo a 'firefox' si lo prefieres
    .setChromeOptions(configuracion)
    .build();
  try {
    if (!url) {
      throw new Error('La solicitud debe contener una URL.');
    }
    console.log(`Entrando a ${url}`)
    await driver.get(`${url}`);
    let followersCount, followingCount, bioText, postCount, nameText;
    try {
      const bioElement = await driver.findElement(By.xpath('/html/body/div[1]/div/div/div[2]/main/div/div/div/div[1]/div/div[3]/div/div/div/div/div[3]/div/div/span'));
      bioText = await bioElement.getText();
    } catch (err) {
      followersCount = err.message;
    }
    try {
      const followersElement = await driver.findElement(By.xpath('/html/body/div[1]/div/div/div[2]/main/div/div/div/div[1]/div/div[3]/div/div/div/div/div[5]/div[2]/a/span[1]/span'));
      followersCount = await (await followersElement.getText()).toString()
    } catch (err) {
      followersCount = err.message;
    }
    try {
      const followingElement = await driver.findElement(By.xpath('/html/body/div[1]/div/div/div[2]/main/div/div/div/div[1]/div/div[3]/div/div/div/div/div[5]/div[1]/a/span[1]/span'));
      followingCount = (await followingElement.getText()).toString()
        ;
    } catch (err2) {
      followingCount = err2.message;
    }
    try {
      const nameElement = await driver.findElement(By.xpath('/html/body/div[1]/div/div/div[2]/main/div/div/div/div[1]/div/div[3]/div/div/div/div/div[2]/div[1]/div/div[1]/div/div/span/span[1]'));
      nameText = await nameElement.getText();
    } catch (err4) {
      nameText = err4.message;
    }

    try {
      const postsElement = await driver.findElement(By.xpath('/html/body/div[1]/div/div/div[2]/main/div/div/div/div[1]/div/div[1]/div[1]/div/div/div/div/div/div[2]/div/div'));
      postCount = await postsElement.getAttribute('textContent')

    } catch (err4) {
      postCount = err4.message;
    }
    return { twitter: { followers: followersCount, following: followingCount, bio: bioText, name: nameText, posts: postCount } };
  }
  catch (error) {
    console.error('Error:', error.message);
    return { error }
  }
  finally {
    // Cierra el navegador después de cada tarea
    await driver.quit();
  }
}

app.post('/scrap', async (req, res) => {
  try {
    const { urls } = req.body
    console.log(urls)
    // Ejecuta las funciones en paralelo
    const selenium = await Promise.all(
      [
        scrapLinked(urls.linkedin, configuracionChrome),
        scrapTwitter(urls.twitter, configuracionChrome),
        scrapFacebook(urls.facebook, configuracionChrome),
        scrapInsta(urls.instagram, configuracionChrome)
      ]
    );

    res.json({ selenium });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});




// Función para obtener el título de una página
async function obtenerTitulo(url, nombreRedSocial, configuracion) {
  const driver = new Builder()
    .forBrowser('chrome') // Puedes cambiarlo a 'firefox' si lo prefieres
    .setChromeOptions(configuracion)
    .build();

  try {
    // Abre la página proporcionada
    await driver.get(url);

    // Obtiene el título de la página
    const pageTitle = await driver.getTitle();

    console.log(`${nombreRedSocial}: ${pageTitle}`);
    return { [nombreRedSocial]: { titulo: pageTitle } };
  } catch (error) {
    console.error(`${nombreRedSocial}: Error - ${error.message}`);
    return { nombreRedSocial, error: error.message };
  } finally {
    // Cierra el navegador después de cada tarea
    await driver.quit();
  }
}

app.get('/obtener_titulos', async (req, res) => {
  try {
    const urls = {
      instagram: 'https://www.instagram.com/apple',
      facebook: 'https://www.facebook.com/apple',
      twitter: 'https://twitter.com/jdani555',
      linkedin: 'https://www.linkedin.com/company/delltechnologies'
    }
    // Ejecuta las funciones en paralelo
    const selenium = await Promise.all(
      Object.entries(urls).map(([nombreRedSocial, url]) =>
        obtenerTitulo(url, nombreRedSocial, configuracionChrome)
      )
    );

    res.json({ selenium });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});


app.get('/', (req, res) => {
  res.json({ mensaje: '¡Sistemas operativos 1!' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
