/* eslint-disable no-plusplus */
require('dotenv').config();
const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = require('bluebird');
const { Price } = require('./models/prices');
const { Seller } = require('./models/sellers');

// const dbHost = process.env.NODE_ENV === 'production' ? 'mongodb://mongo:27017/seller-catalog' : process.env.MONGO_URI;
const dbHost = 'mongodb://localhost:27017/seller-catalog';

mongoose.connect(dbHost, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Preparing product documents

const products = [];
const priceOptions = [9.99, 19.99, 29.99, 39.99, 49.99, 59.99, 99.99];

for (let i = 1; i < 101; i++) {
  const productMeta = {};
  productMeta.productId = i;
  productMeta.seller = [];
  const sellerCount = Math.floor(Math.random() * (11 - 1) + 1);
  for (let j = 1; j <= sellerCount; j++) {
    const priceIndex = Math.floor(Math.random() * (priceOptions.length - 0) + 0);
    const sellerMeta = {
      id: j,
      price: priceOptions[priceIndex],
      tax: ((priceOptions[priceIndex] * 0.05).toFixed(2)),
    };
    productMeta.seller.push(sellerMeta);
  }
  products.push(new Price(productMeta).save());
}

// Preparing seller documents

const sellers = [];
const nameOptions = [
  'Tortor',
  'Nisl',
  'Consequat',
  'Vulputate Ut',
  'Adipiscing Elit Pellentesque',
  'Fames Nunc',
  'Ultricies',
  'Morbi',
  'Odio',
  'Sit Amet',
];

const returnOptions = [30, 60, 90];
const freeOptions = ['True', 'False'];
const minPurchaseOptions = [20, 35];
const deliveryDaysOptions = [1, 2, 3, 7];
const deliveryFeeOptions = [2, 3, 5, 9.99];

const nameSelector = (array) => {
  const index = Math.floor(Math.random() * (array.length - 0) + 0);
  const name = array[index];
  array.splice(index, 1);
  return name;
};

const deliverySelector = (param, fee) => {
  if (param === 'True') {
    return 0;
  }
  if (fee === true) {
    return deliveryFeeOptions[Math.floor(Math.random() * (deliveryFeeOptions.length - 0) + 0)];
  }
  return minPurchaseOptions[Math.floor(Math.random() * (minPurchaseOptions.length - 0) + 0)];
};

for (let i = 1; i < 11; i++) {
  const sellerObject = {};
  const isFree = freeOptions[Math.floor(Math.random() * (freeOptions.length - 0) + 0)];
  const deliveryObject = {
    free: isFree,
    minimumPurchase: deliverySelector(isFree),
    days: deliveryDaysOptions[Math.floor(Math.random() * (deliveryDaysOptions.length - 0) + 0)],
    fee: deliverySelector(isFree, true),
  };

  sellerObject.id = i;
  sellerObject.name = nameSelector(nameOptions);
  sellerObject.returnPolicy = `Return-eligible for ${returnOptions[Math.floor(Math.random() * (returnOptions.length - 0) + 0)]} days`;
  sellerObject.delivery = deliveryObject;

  sellers.push(new Seller(sellerObject).save());
}

// Seed DB

const db = mongoose.connection;
db.once('open', () => {
  console.log('Deleting DB Now!');
  db.db.dropDatabase()
    .then(() => Promise.all(products))
    .then(() => Promise.all(sellers))
    .then(() => mongoose.disconnect())
    .catch((err) => {
      console.log(err);
    });
});
