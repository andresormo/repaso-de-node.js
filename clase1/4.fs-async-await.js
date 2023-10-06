// ASINCRONO SECUENCIAL

const { readFile } = require('node:fs/promises');

// IIFE - Inmediatly Invoked Function Expression
(async () => {
  console.log('Leyendo el primer archivo...');

  const text = await readFile('./archivo.txt', 'utf-8');
  console.log('Prime texto ', text);

  console.log('-----Hace cosas mientras espera al archivo-----');

  const text2 = await readFile('./archivo2.txt', 'utf-8');
  console.log('Segundo texto ', text2);
})();
