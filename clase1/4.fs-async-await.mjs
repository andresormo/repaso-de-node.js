// ASINCRONO SECUENCIAL
import { readFile } from 'node:fs/promises';

console.log('Leyendo el primer archivo...');

await readFile('./archivo.txt', 'utf-8')
  .then(text => {
    console.log('Prime texto ', text);
  });

console.log('-----Hace cosas mientras espera al archivo-----');

await readFile('./archivo2.txt', 'utf-8')
  .then(text => {
    console.log('Segundo texto ', text);
  });
