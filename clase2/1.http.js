const http = require('node:http');
const fs = require('node:fs');

const desiredPort = process.env.PORT ?? 2000;

const processRequest = (req, res) => {
  if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Bienvenidos a mi página de inico');
  } else if (req.url === '/imagen-guapa') {
    // Aquí, el data es un buffer**
    fs.readFile('./elcortijoroom.jpg', (error, data) => {
      if (error) {
        res.statusCode = 500;
        res.end('500 InternalServer Error');
      } else {
        res.setHeader('Content-Type', 'image/jpg');
        res.end(data);
      }
    });
  } else if (req.url === '/contacto') {
    res.statusCode = 200;
    res.setHeader('Contet-Type', 'text/htm; charset=utf-8');
    res.end('<h1>Contactos</h1>');
  } else {
    res.statusCode = 404;
    res.end('<h1>404</h1>');
  }
};
const server = http.createServer(processRequest);

server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}/ `);
});

//* * 'Buffer' es una clase global en Node.js para trabajar con datos binarios*/
//* *este buffer es un espacio de la memoria física donde guarda los datos y los va leyendo */
