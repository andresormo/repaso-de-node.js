import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'
const uri = 'mongodb+srv://user:???@cluster0.dhwmu.mongodb.net/?retryWrites=true&w=majority'

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

async function connect () {
  try {
    await client.connect()
    const database = client.db('database')
    return database.collection('movies')
  } catch (error) {
    console.error('Error connecting to the database')
    console.error(error)
    await client.close()
  }
}

export class MovieModel {
  static async getAll ({ genre }) {
    const db = await connect()

    if (genre) {
      return db.find({
        genre: {
          $elemMatch: {
            $regex: genre,
            $options: 'i'
          }
        }
      }).toArray()
    }

    return db.find({}).toArray()
  }

  static async getById ({ id }) {
    const db = await connect()
    const objectId = new ObjectId(id)
    return db.findOne({ _id: objectId })
  }

  static async create ({ input }) {
    const db = await connect()

    const { insertedId } = await db.insertOne(input)

    return {
      id: insertedId,
      ...input
    }
  }

  static async delete ({ id }) {
    const db = await connect()
    const objectId = new ObjectId(id)
    const { deletedCount } = await db.deleteOne({ _id: objectId })
    return deletedCount > 0
  }

  static async update ({ id, input }) {
    const db = await connect()
    const objectId = new ObjectId(id)

    const { ok, value } = await db.findOneAndUpdate({ _id: objectId }, { $set: input }, { returnNewDocument: true })

    if (!ok) return false

    return value
  }
}


// import { readJson } from "../../utils.js";
// import { randomUUID } from 'node:crypto';

// const movies = readJson('./movies.json')

// export class MovieModels{
//     static async getAll({genre}){
//         if(genre){
//            return movies.filter(
//             movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
//            )
//         }
//         return movies;
//     };

//     static async getById({ id }) {
//         const movie = movies.find(movie => movie.id === id);
//         return movie;
//     };

//     static async create( {input} ){
//         const newMovie = {
//             id: randomUUID(),
//             ...input
//            };
//            movies.push(newMovie);

//            return newMovie;
//     };

//     static async delete({ id }){
//         const movieIndex = movies.findIndex(movie => movie.id === id);

//         if( movieIndex === -1) return false;
    
//         movies.splice(movieIndex, 1);
    
//         return true;
//     };

//     static async update({id, input}){
//         const movieIndex = movies.findIndex(movie => movie.id === id);
//         if( movieIndex === -1) return false;
    
//        movies[movieIndex] = {
//         ...movies[movieIndex],
//         ...input
//        }
//         return movies[movieIndex]
//     }
//     }