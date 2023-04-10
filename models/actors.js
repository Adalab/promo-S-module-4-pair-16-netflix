const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/* declaramos el esquema o estructura*/
const actorsSchema = new Schema(
  {
    /* declaramos la estructura de cada documento, clave, valor  *, cambiarlo los datos de aca abajo por lo que tenemos en coleccion actors y cambiar nombre de coleccion (mayusculas) Actors a actors (en minusculas) */
    name: String,
    lastname: String,
    country: String,
    birthday: Date,
  },
  { collection: 'actors' }
);
/*("nombre de la coleccion", nombre del esquema)*/
const Actors = mongoose.model('actors', actorsSchema);
module.exports = Actors;
