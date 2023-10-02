//ASINCRONO CON CALLBACKS
const fs = require ('node:fs');

console.log('Leyendo el primer archivo...');
fs.readFile('./archivo.txt', 'utf-8', (err, text)=>{
    console.log('Primer texto: ', text);
});

console.log('-----Hace cosas mientras espera al archivo-----');

console.log('Leyendo el segundo texto.....');
fs.readFile('./archivo2.txt', 'utf-8', (err, text)=>{
    console.log('Segundo texto: ', text);
})


