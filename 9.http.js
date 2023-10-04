const http = require('node:http');
const { findAvailablePort } = require('./10.free-port');

// para crear una variable de entorno desde la terminal
// usar este comando:
// $env:(nombre de la variable) = (valor de l aavriable)
const desiredPort = process.env.PORT ?? 2000;

const server = http.createServer((req, res) => {
  console.log('request received');
  res.end('Hola mundo');
});

findAvailablePort(desiredPort).then(port => {
  server.listen(port, () => {
    console.log(`server listening on port http://localhost:${port} `);
  });
});
