// callback
// const fs = require('node:fs');

// const pathExist = fs.existsSync('5.pgh.js')
// console.log(pathExist);

// fs.readdir('.', (err, files)=>{
//     if(err){
//         console.log('Error al leer directorio', err);
//         return;
//     }
//     files.forEach(file=>{
//         console.log(file);
//     })
// })

// then & cath (promesa)
const fs = require('node:fs/promises');

fs.stat('6.ls.js')
  .then(res => {
    console.log(res);
  }
  );

fs.readdir('.')
  .then(files => {
    files.forEach(file => {
      console.log(file);
    });
  })
  .catch(err => {
    if (err) {
      console.error('Error en el directorio: ', err);
    }
  });
