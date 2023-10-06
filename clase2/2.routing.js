const http = require('node:http');

const dittoJSON = require('./pokemon/diiton.json');

const processRequest = (req, res) => {
  const { method, url } = req;

  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':

          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          return res.end(JSON.stringify(dittoJSON));
        default:
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          return res.end('<h1>404</h1>');
      }

    case 'POST':
      switch (url) {
        case '/pokemon': {
          let body = '';

          req.on('data', chunk => {
            body += chunk.toString();
          });
          req.on('end', () => {
            const data = JSON.parse(body);
            res.writeHead(201, { 'Content-type': 'application/json; charset=utf-8' });

            data.timestamp = Date.now();
            res.end(JSON.stringify(data));
          });

          break;
        }

        default:
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          return res.end('404 Not Found');
      }
  }
};

const server = http.createServer(processRequest);

server.listen(2000, () => {
  console.log('Servidor escuchando en puerto http://localhost:2000');
});
