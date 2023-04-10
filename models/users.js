const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/* declaramos el esquema o estructura*/
const usersSchema = new Schema(
  {
    user: String,
    password: String,
    name: String,
    email: String,
    plan_details: String,
  },
  { collection: 'users' }
);
/*("nombre de la coleccion", nombre del esquema)*/
const Users = mongoose.model('users', usersSchema);
module.exports = Users;
