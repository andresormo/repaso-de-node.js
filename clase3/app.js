const express = require('express');
const crypto = require('node:crypto');
const movies = require('./movies.json');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
    origin: (origin, callback) => {
        const ACCEPTED_ORIGINS = [
          'http://localhost:8080',
          'http://localhost:1234',
          'https://movies.com',
          'https://midu.dev',
          'http://127.0.0.1:5500'
        ]
    
        if (ACCEPTED_ORIGINS.includes(origin)) {
          return callback(null, true)
        }
    
        if (!origin) {
          return callback(null, true)
        }
    
        return callback(new Error('Not allowed by CORS'))
      }
}))
app.disable('x-powered-by');

const { validateMovie, validateMoviePartial } = require('./schemas/moviesSchema');

//! Puertos de donde puedo hacer las solicitudes, 
//! además del mismo origen desde donde se envia y recibe,
//! en este caso http://localhost:3030
// const ACCEPTED_ORIGINS = [
//     'http://localhost:8080',
//     'http://localhost:1234',
//     'https://movies.com',
//     'https://andresom.dev',
//     'http://127.0.0.1:5500'
//   ]


app.get('/', ((req, res )=> {
    res.json({ message: 'hola mundo'});
}));

app.get('/movies', (req, res)=>{

    //!CORS para cada peticion diferente
//  const origin = req.header('origin');
//  if(ACCEPTED_ORIGINS.includes(origin) || !origin){
//     res.header('Access-Control-Allow-Origin', origin)
//  }
   
    const { genre } = req.query;
    if(genre){
        const filteredMovies = movies.filter(
            movies => movies.genre.some(g => g.toLowerCase() === genre.toLowerCase()) 
        )
        return res.json(filteredMovies);
    }
    return res.json(movies);
});
app.get('/movies/:id', (req,res) => {
    const { id } = req.params;
    const movieId = movies.find(movieId =>  movieId.id === id);
    if(movieId){
        return res.json(movieId);
    } else {
        res.status(404).json({message: 'id no encontrado'})
    }
});

app.post('/movies', (req, res) => {
   const result = validateMovie(req.body);

   if(!result.success) {
    return res.status(400).json({error: JSON.parse(result.error.message)});
   }

   const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
   };

   movies.push(newMovie);
   return res.status(201).json(movies);

})

app.patch('/movies/:id', (req, res) => {
    const result = validateMoviePartial(req.body);

     if(!result.success){
        return res.status(400).json({error: JSON.parse(result.error.message)})
     };

     const { id } = req.params;
     const movieIndex = movies.findIndex(movie => movie.id === id);
    


    if( movieIndex === -1){
        return res.status(404).json({message:'Movie not found'})
    };

    const updateMovie = {
        ...movies[movieIndex],
        ...result.data
    }
    movies[movieIndex] = updateMovie
    return res.json(updateMovie);

});

app.delete('/movies/:id', (req,res) => {
    //!CORS para cada peticion diferente
//  const origin = req.header('origin');
//  if(ACCEPTED_ORIGINS.includes(origin) || !origin){
//     res.header('Access-Control-Allow-Origin', origin)
//  }
    const {id} = req.params;

    const movieIndex = movies.findIndex(movie => movie.id === id);

    if( movieIndex === -1){
        return res.status(404).json({message:'Movie not found'})
    };

    movies.splice(movieIndex, 1);

    return res.json({message: 'Movie deteled'})
});

  //!peticion previa, ACEPTAR las CORS para cada METHOD,
  //!se requiere para peticiones especiales como POST, PUT Y DELETE
//   app.options('/movies/:id', (req, res) => {
//     const origin = req.header('origin');
    
//     if(ACCEPTED_ORIGINS.includes(origin) || !origin){
//         res.header('Access-Control-Allow-Origin', origin)
//         res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
//     }
//     res.send(200)
// });

const port = process.env.PORT ?? 3030;

app.listen(port, () =>{
    console.log(`Servidor escuchando en puerto http://localhost:${port}`);
});