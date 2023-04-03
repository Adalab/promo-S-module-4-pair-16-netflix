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
  console.log('Pidiendo a la base de datos información de los peliculas.');
  const genreFilterParam = req.query.genre;
  const sortFilterParam = req.query.sort;
  if (genreFilterParam === ''){
    if(sortFilterParam === 'asc'){
      connection
      .query('SELECT * FROM movies ORDER BY title ASC')
      .then(([results, fields]) => {
        console.log('Información recuperada:');
        console.log(req.query.genre)
        results.forEach((result) => {
          console.log({ success: true, movies: results });
        });

        res.json({success: true, movies: results}); 
        // despues de la, le decimos que movies es igual a result--> result es el resultado del DB que le hemos pedido con el query/select
      })
      .catch((err) => {
        throw err;
      });
    }else {
      connection
        .query('SELECT * FROM movies ORDER BY title DESC')
        .then(([results, fields]) => {
          console.log('Información recuperada:');
          console.log(req.query.genre)
          results.forEach((result) => {
            console.log({ success: true, movies: results });
          });

          res.json({success: true, movies: results}); 
          // despues de la, le decimos que movies es igual a result--> result es el resultado del DB que le hemos pedido con el query/select
        })
        .catch((err) => {
          throw err;
        });
    }

  } else{
      connection
      .query('SELECT * FROM movies WHERE genre = ?', [genreFilterParam])
      .then(([results, fields]) => {
        console.log('Información recuperada:');
        console.log(req.query.genre)
        results.forEach((result) => {
          console.log({ success: true, movies: results });
        });

        res.json({success: true, movies: results}); 
        // despues de la, le decimos que movies es igual a result--> result es el resultado del DB que le hemos pedido con el query/select
      })
      .catch((err) => {
        throw err;
      });
    }
    

  // } else{
  //    if(sortFilterParam === 'asc'){
  //     connection
  //     .query('SELECT * FROM movies WHERE genre = ? AND ORDEY BY title ASC', [genreFilterParam])
  //     .then(([results, fields]) => {
  //       console.log('Información recuperada:');
  //       console.log(req.query.genre)
  //       results.forEach((result) => {
  //         console.log({ success: true, movies: results });
  //       });

  //       res.json({success: true, movies: results}); 
  //       // despues de la, le decimos que movies es igual a result--> result es el resultado del DB que le hemos pedido con el query/select
  //     })
  //     .catch((err) => {
  //       throw err;
  //     });
  //   }else{
  //     connection
  //     .query('SELECT * FROM movies WHERE genre = ? AND ORDEY BY title DESC', [genreFilterParam])
  //     .then(([results, fields]) => {
  //       console.log('Información recuperada:');
  //       console.log(req.query.genre)
  //       results.forEach((result) => {
  //         console.log({ success: true, movies: results });
  //       });

  //       res.json({success: true, movies: results}); 
  //       // despues de la, le decimos que movies es igual a result--> result es el resultado del DB que le hemos pedido con el query/select
  //     })
  //     .catch((err) => {
  //       throw err;
  //     });

  //   }
    
  // }
});

//

// decidir si en el fetch de api-movies le quieremos poner  '//localhost:4000/api/movies/all' --> como hizo yanelis en clase, y aqui le debemos cambiar el endpoint a: server.get('/api/movies/all'
