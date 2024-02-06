import express, { json } from 'express';
import { createMovieRouter } from './routes/movies.js';
import { corsMiddleWare } from './middleware/cors.js';


// creamos una función createApp y le pasamos el movieModel desde otro fichero independiente
export const createApp = ({movieModel})=>{
    const app = express();
    app.use(json());
    app.use(corsMiddleWare())
    
    app.disable('x-powered-by');
    
    
    app.use('/movies', createMovieRouter({movieModel}));
    
    
    const port = process.env.PUERTO ?? 1234;
    
    app.listen(port, () =>{
        console.log(`Servidor escuchando en puerto http://localhost:${port}`);
    });
}
