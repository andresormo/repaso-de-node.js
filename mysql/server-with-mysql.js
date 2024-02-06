import { createApp } from "./app.js";
import { MovieModelSql } from "./models/mysql/movies_models_sql.js";

createApp({movieModel: MovieModelSql});