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

server.use(express.json({ limit: '10mb' }));
//app.use(express.json({ limit: '25mb' }));

// Arrancamos el servidor en el puerto 4000 --> creo que toda esta parte comentada no es necesario
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

mysql
  .createConnection({
    host: 'localhost',
    database: 'netflix',
    user: 'root',
    password: 'Valkyria891103', // aqui cada quien pone su propio password
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
