import { validateMovie, validateMoviePartial } from "../schemas/moviesSchema.js";
export class MovieController {

    // creo un constructor para traerme un parametro desde otro punto de la app
    constructor({ movieModel }) {
        this.movieModel = movieModel
    }
    getAll = async (req, res) => {
        const { genre } = req.query;
        const movies = await this.movieModel.getAll({ genre });
        res.json(movies);
    }

    getById = async (req, res) => {
        const { id } = req.params;
        const movie = await this.movieModel.getById({ id });
        res.json(movie);
    }

    create = async (req, res) => {
        const result = validateMovie(req.body);

        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) });
        }

        const newMovie = await this.movieModel.create({ input: result.data })
        return res.status(201).json(newMovie);

    }

    update = async (req, res) => {
        const result = validateMoviePartial(req.body);

        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message, 'hola') })
        };

        const { id } = req.params;

        const updateMovie = await this.movieModel.update({ id: id, input: result.data })
        return res.json(updateMovie);

    }

    delete = async (req, res) => {
        const { id } = req.params;

        const result = await this.movieModel.delete({ id })

        if (result === false) {
            return res.status(404).json({ message: 'Movie not found' })
        }

        return res.json({ message: 'Movie deteled' })
    }
}