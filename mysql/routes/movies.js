import { Router } from "express";
import { MovieController } from "../controller/movies_controller.js";

// creo una función pasandole como parametro el movieModel que a su vez lo paso al 
// new MovieController como parametro ya que tambien es una función que hemos creado en el modulo de
// movies_controller
export const createMovieRouter = ({movieModel})=>{
    const moviesRouter = Router();

    const movieController = new MovieController({movieModel});

    moviesRouter.get('/', movieController.getAll);
    
    moviesRouter.get('/:id', movieController.getById);
    
    moviesRouter.post('/', movieController.create);
    
     moviesRouter.patch('/:id', movieController.update);
    
    moviesRouter.delete('/:id', movieController.delete);

    return moviesRouter;
}


