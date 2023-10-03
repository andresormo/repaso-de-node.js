const fs = require('node:fs/promises');
const path = require('node:path');


//la posicion 0 es node, la 1 el directorio y la 2 el archivo
const folder = process.argv[2] ?? '.';


//asincornía secuencial ya que en un principio necesitamos 
//los ficheros de la carpeta para poder seguir trabajando
async function ls (folder){
    let files;
    try {
        files = await fs.readdir(folder)
    } catch {
        console.error(`No se pudo leer el directorio ${folder}`);
        //manejamos la salida del proceso si hay algún error 
        //para mejorar el funcionamiento de la app
        process.exit(1)
    }

//asincornía en paralelo ya que el map trabaja en paralelo 
//y al final de la ejecuación de este
//utilizamos Promise.all() para que nos devuelva toda la información
//una vez la haya leído por completo
    const filePromises = files.map(async file =>{
        const filePath = path.join(folder, file);
        let fileStats;
        try {
            fileStats = await fs.stat(filePath)
        } catch {
            console.error('No se pudo leer el archivo');
            process.exit(1);
        }

        const isDirectory = fileStats.isDirectory();
        const fileType = isDirectory ? 'd' : 'f';
        const fileSize = fileStats.size.toString();
        const fileModified = fileStats.mtime.toLocaleString();

        return `${fileType} ${file.padEnd(20)} ${fileSize.padStart(10)} ${fileModified}`

    });

    const fileInfo = await Promise.all(filePromises);
    fileInfo.forEach(info=>{
        console.log(info);
    });
}

ls(folder);
