const mongoose = require('mongoose');

const dbConnect = () => {
  const user = 'veronica';
  const password = 'CVSzYQrnkDk5atg7';
  const dbName = 'Netflix';

  const uri = `mongodb+srv://${user}:${password}@cluster1.mydrv2l.mongodb.net/${dbName}?retryWrites=true&w=majority`;

  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('conectado a mongodb'))
    .catch((e) => console.log('error de conexión', e));
};
module.exports = dbConnect;
