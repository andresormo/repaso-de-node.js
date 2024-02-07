Para desplegar la base de datos a un cliente externo en este caso: PlanetScale
Par autilizarlo en la app necesitamos instalar la dependencia de dicho cliente
qu eseria con el comando : scoop bucket add pscale https://github.com/planetscale/scoop-bucket.git
                           scoop install pscale mysql
para ello necesitamos instalar Scoop en nuestro equipo que a su vez necesita del framework 
.NET que es una plaraforma de app gratuitas de codigo abierto.         

Cuando tenemos instalado .NET ya podemos hacer el comando: Set-ExecutionPolicy RemoteSigned -scope CurrentUser
para instalar Scoop


una vez instalado en la terminal ponemos: pscale auth login
y nos redirigirá a una pagina para confirmar el password

A continuacion en la base de datos que creamos en planetscale le damos a conectar e introducimos el comando que nos aparece en la terminal y ya podemos agregar los comandos sql para crear , ver actualizar y eliminar tablas y datos de esta.


Tiene cierta limitaciones como que no permite la creacion de claves foraneas y esto me causa errores en mi app,
