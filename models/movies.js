const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/* declaramos el esquema o estructura*/
const moviesSchema = new Schema(
  {
    title: String,
    genre: String,
    image: String,
    category: String,
    date: String,
  },
  { collection: 'movies' }
);
/*("nombre de la coleccion", nombre del esquema)*/
const Movies = mongoose.model('movies', moviesSchema);
module.exports = Movies;
