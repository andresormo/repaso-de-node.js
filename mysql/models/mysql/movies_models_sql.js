import mysql  from 'mysql2/promise';
import dotenv from 'dotenv'
dotenv.config();

// 1º- descargamos  las dependencias de mysql2 "npm i --save mysql2"
// importamos myql al fichero
// hemos creado en el fichero una clase con metodos static igual que
// con la ddbb de mongodb
// creamos un objeto config para la conexion con la ddbb


const config = {
host: 'localhost',
user:'root',
port:3306,
password: process.env.PASSWORD,
database:'moviesbd',
}

const connection = await mysql.createConnection(config);



export class MovieModelSql {
  static async getAll ({ genre }) { 
    if (genre) {
    const lowerCaseGenre = genre.toLowerCase()

    // get genre ids from database table using genre names
    const [genres] = await connection.query(
      "SELECT genre_id FROM movie_genre JOIN genre ON genre.id = movie_genre.genre_id WHERE name = ?;",
      [lowerCaseGenre]
    )
    
    if (genres.length === 0) return []

    // get the id from the first genre result

    const [{genre_id}] = genres;

    const [result] = await connection.query(
        "SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie JOIN movie_genre ON movie.id = movie_genre.movie_id WHERE movie_genre.genre_id = ?;",
        genre_id
    )

    // get all movies ids from database table
    // la query a movie_genres
    // join
    // y devolver resultados..
    return result;

  } else {
    const [movies] = await connection.query(
        'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie;'
    )
    return movies;
  }


  }

  static async getById ({ id }) {
    try {
        const [movies] = await connection.query(
            'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?);',
            [id]
        )
        
        if(movies.length === 0) return null;
    
        return movies[0];
        
    } catch (e) {
        throw new Error('Error');
    }
  
   
  }

  static async create ({ input }) {
    
        const {
            genre: genreArray,
            title,
            year,
            director,
            duration,
            poster, 
            rate
        } = input;
    
        const [uuidResult] = await connection.query('SELECT UUID() uuid;');
        const [{uuid}] = uuidResult;
        
        try {
        await connection.query(
            `INSERT INTO movie (id, title, year, director, duration, poster, rate)
            VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,
            [title, year, director, duration,poster, rate]
        )
    
        const [genreSelect] = await connection.query(
            `SELECT id FROM genre WHERE name IN (?)`,
            [genreArray]
        )
    
        for (let i = 0; i < genreSelect.length; i++) {
            const {id} = genreSelect[i];
    
            await connection.query(
                `INSERT INTO movie_genre(movie_id, genre_id) 
                VALUES (UUID_TO_BIN("${uuid}"), ?);`,
                [id]
            );
            
        }
    } catch (e) {
        throw new Error('Error');
    }
    const [movies] = await connection.query(
        `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
          FROM movie WHERE id = UUID_TO_BIN(?);`,
        [uuid]
      )
      return movies[0]

  }

  static async delete ({ id }) {

  }


  static async update ({ id, input }) {

  }

}
