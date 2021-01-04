require('newrelic');
const express = require('express');
require('dotenv').config();
const path = require('path');
const cors = require('cors');
// eslint-disable-next-line no-unused-vars
const db = require('../database');
const router = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const isProd = process.env.NODE_ENV === 'production';
const hostname = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3002;

app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use('/:id', express.static(path.join(__dirname, '/../client/dist')));

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`App listening at http://${hostname}:${PORT}`);
});

if (isProd) {
  setTimeout(() => {
    // eslint-disable-next-line global-require
    require('../database/seed');
  }, 5000);
}
