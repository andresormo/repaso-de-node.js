
const path = require('node:path');

// barra separadora de carpetas segun SO
console.log(path.sep);

// unir rutas con path.join
const filePath = path.join('content', 'subfolder', 'test.txt');
console.log(filePath);

const base = path.basename('/tmp/andres-secret-files/password.text');
console.log(base);

const fileName = path.basename('/tmp/secret-files/password.txt', '.txt');
console.log(fileName);

const extension = path.extname('my.super.image.jpg');
console.log(extension);
