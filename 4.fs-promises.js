// PROMESAS
// Esto sólo en los módulos nativos
// que no tienen promesas nativas
// asi podemos dejar de utilizar los callbacks

// const { promisify } = require('node:util')
// const readFilePromise = promisify(fs.readFile)

const fs = require('node:fs/promises');
// cambiamos node:fs por node:fs-promises y asi no tenemos que utilizar los callbacks

console.log('Leyendo el primer archivo...');
fs.readFile('./archivo.txt', 'utf-8')
  .then(text => {
    console.log('Prime texto: ', text);
  });

console.log('-----Hace cosas mientras espera al archivo-----');

console.log('Leyendo el segundo texto.....');
fs.readFile('./archivo2.txt', 'utf-8')
  .then(text => {
    console.log('Segundo texto: ', text);
  });
