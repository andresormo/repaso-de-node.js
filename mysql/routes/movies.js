import { Router } from "express";
import { validateMovie, validateMoviePartial } from './../schemas/moviesSchema.js';
import { MovieModels } from "../models/local/movie_models.js";
import { MovieController } from "../controller/movies_controller.js";

export const moviesRouter = Router();


moviesRouter.get('/', MovieController.getAll);

moviesRouter.get('/:id', MovieController.getById);

moviesRouter.post('/', MovieController.create);

 moviesRouter.patch('/:id', MovieController.update);

moviesRouter.delete('/:id', MovieController.delete);

