const mongoose = require('mongoose');

// const dbHost = process.env.NODE_ENV === 'production' ? 'mongodb://mongo:27017/seller-catalog' : process.env.MONGO_URI;

const dbHost = 'mongodb://localhost:27017/seller-catalog';

mongoose.connect(dbHost, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', () => {
  console.log('Connection error');
});
db.once('open', () => {
  console.log('Mongo is connected');
});
