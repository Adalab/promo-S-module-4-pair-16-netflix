//// ****** MySQL en Express*****
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

// Aquí almacenaremos la conexión a la base de datos// Agui guardo la informacion de la conexion
let connection;

// Configuramos el servidor
const server = express(); /// Creamos el servidor y/o app
server.use(cors());

server.use(express.json({ limit: '25mb' }));

// Arrancamos el servidor en el puerto 4000
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});


mysql
  .createConnection({
    host: 'localhost',
    database: 'netflix',
    user: 'root',
    password: 'Valkyria89', 
  })
  .then((conn) => {
    connection = conn;
    connection
      .connect()
      .then(() => {
        console.log(
          `Conexión establecida con la base de datos (identificador=${connection.threadId})`
        );
      })
      .catch((err) => {
        console.error('Error de conexion: ' + err.stack);
      });
  })
  .catch((err) => {
    console.error('Error de configuración: ' + err.stack);
  });

server.get('/movies', (req, res) => {
  const genreFilterParam = req.query.genre;
  const sortFilterParam = req.query.sort;
  if (genreFilterParam === '') {
    if (sortFilterParam === 'asc') {
      connection
        .query('SELECT * FROM movies ORDER BY title ASC')
        .then(([results, fields]) => {
          res.json({ success: true, movies: results });
        })
        .catch((err) => {
          throw err;
        });
    } else {
      connection
        .query('SELECT * FROM movies ORDER BY title DESC')
        .then(([results, fields]) => {
          res.json({ success: true, movies: results });
        })
        .catch((err) => {
          throw err;
        });
    }
  } else {
    if (sortFilterParam === 'asc') {
      connection
        .query('SELECT * FROM movies WHERE genre = ? ORDER BY title ASC', [genreFilterParam])
        .then(([results, fields]) => {
          res.json({ success: true, movies: results });
        })
        .catch((err) => {
          throw err;
        });
    } else {
      connection
        .query('SELECT * FROM movies WHERE genre = ? ORDER BY title DESC', [genreFilterParam])
        .then(([results, fields]) => {
          res.json({ success: true, movies: results });
        })
        .catch((err) => {
          throw err;
        });
    }
  }
});

server.post('/login', (req, res) => {
  console.log(req.body);
  connection
    .query('SELECT * FROM users WHERE email = ? AND password = ? ', [
      req.body.email,
      req.body.password,
    ])
    .then(([results, fields]) => {
      if (results.length > 0) {
        res.json({ success: true, userId: results[0].idUser }); 
      } else {
        res.json({ success: false, errorMessage: 'Usuaria/o no encontrada/o' });
      }
    })
    .catch((err) => {
      throw err;
    });
});


//Conexión con base de datos MongoDb
const dbConnect = require('../config/connection');
dbConnect();

const Actors = require('../models/actors.js');
const Movies = require('../models/movies.js');
const Users = require('../models/users.js');
const Favorites = require('../models/favorites.js');

//Listar películas y ordenarlas por nombre/titulo y género:
server.get('/movies_all_mongo', (req, res) => {
  const genreFilterParam = req.query.genre;
  const sortFilterParam = req.query.sort;
  if (genreFilterParam === '') {
    Movies.find({}).sort({title: sortFilterParam})
        .then((doc) => {
          res.json({ success: true, movies: doc });
        })
        .catch((error) => {
          console.log('Error', error);
        });
  } else if (genreFilterParam !== '') {
    Movies.find({genre: genreFilterParam}).sort({title: sortFilterParam})
         .then((doc) => {
          res.json({ success: true, movies: doc });
        })
        .catch((error) => {
          console.log('Error', error);
        });
  }
});

server.post('/favorites-add', (req, res) => {
  let idMoviefav = '642d71eb13f261874cadda04';
  let idUserfav = '642d72f113f261874cadda07';
  const favorite = new Favorites({
    idUser: idUserfav,
    idMovie: idMoviefav,
    score: 10,
  });
  favorite.save()
  .then((docs) => {
    res.json(docs);
  })
  .catch((error) => {
  console.log('Error', error);
  });
});

// servidor de estaticos
server.use(express.static('./src/public-react'));
server.use(express.static('./src/public-movies-images'));