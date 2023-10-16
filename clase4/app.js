import express, { json } from 'express';
import { moviesRouter } from './routes/movies.js';
import { corsMiddleWare } from './middleware/cors.js';


const app = express();
app.use(json());
app.use(corsMiddleWare())

app.disable('x-powered-by');


app.use('/movies', moviesRouter);


const port = process.env.PUERTO ?? 1234;

app.listen(port, () =>{
    console.log(`Servidor escuchando en puerto http://localhost:${port}`);
});