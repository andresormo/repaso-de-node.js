const express = require('express');
const dittoJSON = require('./pokemon/diiton.json');

const app = express();

const PORT = process.env.PORT ?? 2000;

// disable, para desahabilitar en este caso la cabecera donde muestra el framework
app.disable('x-powered-by');

app.use(express.json());

// TODO ESTO SE SIMPLIFICA CON NODE.js CON UNA FUNCION;
// app.use((req, res, next) => {
//   if (req.method !== 'POST') return next();
//   if (req.headers['content-type'] !== 'application/json') return next();

//   let body = '';

//   req.on('data', chunk => {
//     body += chunk.toString();
//   });

//   req.on('end', () => {
//     const data = JSON.parse(body);
//     data.timestamp = Date.now();

//     req.body = data;
//     next();
//   });
// });

app.get('/pokemon/ditto', (req, res) => {
  res.json(dittoJSON);
});

app.post('/pokemon', (req, res) => {
  res.status(201).json(req.body);
});

app.use((req, res) => {
  res.status(404).send('<h1>404</h1>');
});

app.listen(PORT, () => {
  console.log(`servidor levantado en http://localhost:${PORT}`);
});
