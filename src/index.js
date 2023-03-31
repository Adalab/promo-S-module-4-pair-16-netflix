//// ****** MySQL en Express*****
const express = require('express');

const cors = require('cors');
const mysql = require('mysql2/promise');

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
//   //console.log('hola');

mysql
  .createConnection({
    host: 'localhost',
    database: 'test',
    user: 'root',
    password: 'vero5886',
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
  console.log('Pidiendo a la base de datos información de los peliculas.');
  connection
    .query('SELECT * FROM movies')
    .then(([results, fields]) => {
      console.log('Información recuperada:');
      results.forEach((result) => {
        console.log(result);
      });

      res.json(results);
    })
    .catch((err) => {
      throw err;
    });
});

// {
//   success: true,
//   movies:  results
// } // en la segudo linea le decimos que movies es igual a result--> result es el resultado del DB que le hemos pedido con el query/select

// decidir si en el fetch de api-movies le quieremos poner  '//localhost:4000/api/movies/all' --> como hizo yanelis en clase, y aqui le debemos cambiar el endpoint a: server.get('/api/movies/all'
