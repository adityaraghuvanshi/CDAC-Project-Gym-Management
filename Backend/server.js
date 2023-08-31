require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const DB = process.env.DB_URL.replace('<password>', process.env.DB_PASSWORD);


mongoose.set('strictQuery', false);

const database = mongoose.connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database Connected');
  })
  .catch(err => {
    console.log(err);
  });

const server = app.listen(process.env.PORT || 4000, () =>
  console.log(`Server up on port ${process.env.PORT || 4000}`)
);


  