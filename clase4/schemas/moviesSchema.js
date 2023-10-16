import z from 'zod';

const movieSchema = z.object({
    title: z.string({
        invalid_type_error: 'La movie title debe ser string',
        required_error: 'Movie title is required'
    }),
    year: z.number().int().min(1900).max(2024),
    director: z.string(),
    duration: z.number().int().positive(),
    rate: z.number().min(0).max(10).default(5),
    poster: z.string().url(),
    genre: z.array(
        z.enum(['Action', 'Adventure','Crime', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi'])
    )
});

export function validateMovie (object){
    return movieSchema.safeParse(object);
};

export function validateMoviePartial(shape){
    return movieSchema.partial().safeParse(shape)
};