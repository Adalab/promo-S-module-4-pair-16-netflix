// login

const getMoviesFromApi = (movies) => {
  console.log('hola');
  // console.log('Se están pidiendo las películas de la app');
  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
  return fetch(
    `//localhost:4000/movies_all_mongo?genre=${movies.genre}&sort=${movies.sort}`
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const objToExport = {
  getMoviesFromApi: getMoviesFromApi,
};

export default objToExport;

// fetch(
//     `//localhost:4000/movies?genre=${params.genre}&sort=${params.sort}`

// return fetch(
//   `//localhost:4000/movies_all_mongo?genre=${movie.genre}&sort=${movie.sort}`,
// );
