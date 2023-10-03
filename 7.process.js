//Objeto Global muy usado



//Maneja los argumentos de entrada de la linea de comandos
console.log(process.argv);


//controlar el proceso y su salida
//0 (todo correcto y ahí termina) 1(hay algún y hay que salir)

// process.exit(0);

//controlar eventos del proceso
process.on('exist', ()=>{
    //limpiar la consola
})


//current working directory 'Desde que directorio estamos trabajando'
console.log(process.cwd());


//platform VARIABLE DE ENTORNO

console.log(process.env.PEPITO);