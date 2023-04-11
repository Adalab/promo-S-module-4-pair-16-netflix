const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/* declaramos el esquema o estructura*/
const favoriteSchema = new Schema(
  {
    
    /* declaramos la estructura de cada documento, clave, valor  *, cambiarlo los datos de aca abajo por lo que tenemos en coleccion actors y cambiar nombre de coleccion (mayusculas) Actors a actors (en minusculas) */
    idUser: { type: Schema.Types.ObjectId, ref: 'users' },
    idMovie: { type: Schema.Types.ObjectId, ref: 'movies' },
    score: Number,
  },
  { collection: 'favorite' }
);
/*("nombre de la coleccion", nombre del esquema)*/
const Favorites = mongoose.model('favorite', favoriteSchema);
module.exports = Favorites;
