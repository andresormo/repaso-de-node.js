import { MovieModel } from "../models/mongodb/movie.js";
import { MovieModels } from "../models/local/movie_models.js";
import { validateMovie, validateMoviePartial } from "../schemas/moviesSchema.js";


export class MovieController {
    static async getAll ( req, res ){
        const { genre } = req.query;
        const movies = await MovieModels.getAll({genre});
        res.json(movies);
    }

    static async getById ( req, res ){
        const { id } = req.params;
    const movie = await MovieModels.getById({ id });
    res.json(movie);
    }

    static async create(req, res) {
        const result = validateMovie(req.body);
     
        if(!result.success) {
         return res.status(400).json({error: JSON.parse(result.error.message)});
        }
     
        const newMovie = await MovieModels.create({input: result.data})
        return res.status(201).json(newMovie);
     
     }

     static async update (req, res){
        const result = validateMoviePartial(req.body);
        
         if(!result.success){
            return res.status(400).json({error: JSON.parse(result.error.message, 'hola')})
         };
    
         const { id } = req.params;
         
         const updateMovie = await MovieModels.update({id: id, input: result.data})
        return res.json(updateMovie);
    
    }

    static async delete (req,res) {
        const {id} = req.params;
    
       const result = await MovieModels.delete({id})
    
       if( result === false){
        return res.status(404).json({message : 'Movie not found'})
       }
    
        return res.json({message: 'Movie deteled'})
    }
}