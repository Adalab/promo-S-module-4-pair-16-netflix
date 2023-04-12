//// ****** MySQL en Express*****
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const path = require('path');

// Aquí almacenaremos la conexión a la base de datos// Agui guardo la informacion de la conexion
let connection;

// Configuramos el servidor
const server = express(); /// Creamos el servidor y/o app
server.use(cors());

server.use(express.json({ limit: '25mb' }));
//app.use(express.json({ limit: '25mb' }));

// Arrancamos el servidor en el puerto 4000 --> creo que toda esta parte comentada no es necesario
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

const mongoose = require('mongoose');
const dbConnect = require('../config/connection');
dbConnect();

const Actors = require('../models/actors.js');
const Movies = require('../models/movies.js');
const Users = require('../models/movies.js');
const Favorites = require('../models/favorites.js');

server.get('/movies_all_mongo', (req, res) => {
  const genreFilterParam = req.query.genre;
  const sortFilterParam = req.query.sort;
  if (genreFilterParam === '') {
    if (sortFilterParam === 'asc') {
      //Se podría poner un ternario para hacerlo más corto??? sort({ title: sortValue === 'asc' ? 1 : -1 })
      Movies.find({})
        .sort({ title: 'asc' })
        .then((doc) => {
          res.json({ success: true, movies: doc });
        })
        .catch((error) => {
          console.log('Error', error);
        });
    } else {
      Movies.find({})
        .sort({ title: 'desc' })
        .then((doc) => {
          res.json({ success: true, movies: doc });
        })
        .catch((error) => {
          console.log('Error', error);
        });
    }
  } else if (genreFilterParam !== '') {
    if (sortFilterParam === 'asc') {
      Movies.find({ genre: genreFilterParam })
        .sort({ title: 'asc' })

        .then((doc) => {
          res.json({ success: true, movies: doc });
        })
        .catch((error) => {
          console.log('Error', error);
        });
    } else {
      Movies.find({ genre: genreFilterParam })
        .sort({ title: 'desc' })

        .then((doc) => {
          res.json({ success: true, movies: doc });
        })
        .catch((error) => {
          console.log('Error', error);
        });
    }
  }
});

server.post('/favorites-add', (req, res) => {
  let idMoviefav = '642d71eb13f261874cadda04';
  let idUserfav = '642d72f113f261874cadda07';
  const favorite = new Favorites({
    idUser: idUserfav,
    idMovie: idMoviefav,
    score: 10, //Eso estaba con req.body.score
  });
  favorite.save().then((docs) => {
    res.json(docs);
  });
});

// server.get('/movies_filterGenre_mongo/:genreValue', (req, res) => {
//   const { genreValue } = req.params;
//   Movies.find({ genre: genreValue })
//     .then((doc) => {
//       res.json({ success: true, movies: doc });
//     })
//     .catch((error) => {
//       console.log('Error', error);
//     });
// });

mysql
  .createConnection({
    host: 'localhost',
    database: 'netflix',
    user: 'root',
    password: 'vero5886', // aqui cada quien pone su propio password
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
  //console.log('Pidiendo a la base de datos información de los peliculas.');
  const genreFilterParam = req.query.genre;
  const sortFilterParam = req.query.sort;
  if (genreFilterParam === '') {
    if (sortFilterParam === 'asc') {
      connection
        .query('SELECT * FROM movies ORDER BY title ASC')
        .then(([results, fields]) => {
          //console.log('Información recuperada:');
          // console.log(req.query.genre);
          results.forEach((result) => {
            console.log({ success: true, movies: results });
          });

          res.json({ success: true, movies: results });
          // despues de la, le decimos que movies es igual a result--> result es el resultado del DB que le hemos pedido con el query/select
        })
        .catch((err) => {
          throw err;
        });
    } else {
      connection
        .query('SELECT * FROM movies ORDER BY title DESC')
        .then(([results, fields]) => {
          // console.log('Información recuperada:');
          // console.log(req.query.genre);
          results.forEach((result) => {
            //console.log({ success: true, movies: results });
          });

          res.json({ success: true, movies: results });
          // despues de la, le decimos que movies es igual a result--> result es el resultado del DB que le hemos pedido con el query/select
        })
        .catch((err) => {
          throw err;
        });
    }
  } else {
    if (sortFilterParam === 'asc') {
      connection
        .query('SELECT * FROM movies WHERE genre = ? ORDER BY title ASC', [
          genreFilterParam,
        ])
        .then(([results, fields]) => {
          // console.log('Información recuperada:');
          // console.log(req.query.genre);
          results.forEach((result) => {
            // console.log({ success: true, movies: results });
          });

          res.json({ success: true, movies: results });
          // despues de la, le decimos que movies es igual a result--> result es el resultado del DB que le hemos pedido con el query/select
        })
        .catch((err) => {
          throw err;
        });
    } else {
      connection
        .query('SELECT * FROM movies WHERE genre = ? ORDER BY title DESC', [
          genreFilterParam,
        ])
        .then(([results, fields]) => {
          //console.log('Información recuperada:');
          //console.log(req.query.genre);
          results.forEach((result) => {
            //console.log({ success: true, movies: results });
          });

          res.json({ success: true, movies: results });
          // despues de la, le decimos que movies es igual a result--> result es el resultado del DB que le hemos pedido con el query/select
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
    ]) // las comillas del select deben ser ``?
    .then(([results, fields]) => {
      if (results.length > 0) {
        // debe ser > 0 o solo results.legnth??
        console.log('true'); // si email y password estan correctos nos regresan true
        res.json({ success: true, userId: results[0].idUser }); // esto hico ivan en clase
      } else {
        console.log('false'); // si email y contrasdena no estan correctos nos regresa false
        res.json({ success: false, errorMessage: 'Usuaria/o no encontrada/o' });
      }
    })
    .catch((err) => {
      throw err;
    });
});

// server.get('src/public-react/', (req, res) => {
//   const absolutePathtoApp = path.join(__dirname, '../'); // a qué carpeta???????
//   res.sendFile(absolutePathtoApp);
// });

// servidor de estaticos
server.use(express.static('./src/public-react'));

server.use(express.static('./src/public-movies-images'));
