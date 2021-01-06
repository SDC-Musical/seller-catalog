const axios = require('axios');
const faker = require('faker');
const fs = require('fs/promises');

axios.get('http://127.0.0.1:5984/')
  .then(() => console.log('Connected to CouchDB'))
  .catch((err) => console.log('Unable to connect to CouchDB', err));

const random = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
}

const seedSellers = () => {
  const options = {
    free: [true, false],
    minPurchase: [20, 35],
    deliveryDays: [1, 2, 3, 7],
    deliveryFee: [2, 3, 5, 9.99],
    return: [30, 60, 90]
  };
  let bulk = [];

  for (let i = 0; i < 50; i++) {
    let seller = {};
    let delivery = {};

    delivery.free = random(options.free);
    delivery.minimumPurchase = delivery.free ? 0 : random(options.minPurchase);
    delivery.days = random(options.deliveryDays);
    delivery.fee = delivery.free ? 0 : random(options.deliveryFee);

    seller._id = `${i + 1}`;
    seller.name = faker.name.firstName();
    seller.returnPolicy = `Return eligible for ${random(options.return)} days`;
    seller.delivery = delivery;

    bulk.push(seller);
  }

  return fs.writeFile(`couchdb/seed-data/sellers${limit}.json`, JSON.stringify({docs: bulk}))
}

const seedPrices = (start, limit) => {
  const priceOptions = [9.99, 19.99, 29.99, 39.99, 49.99, 59.99, 99.99];
  let bulk = [];

  for (let i = start; i < limit; i++) {
    const sellerCount = Math.floor(Math.random() * 4 + 1);
    let prices = {
      _id: `${i + 1}`,
      sellers: []
    };

    for (let j = 0; j < sellerCount; j++) {
      let seller = {};

      seller.id = Math.floor(Math.random() * 50 + 1);
      seller.price = random(priceOptions);
      seller.tax = (seller.price * 0.05).toFixed(2);

      prices.sellers.push(seller);
    }

    bulk.push(prices);
  }

  return fs.writeFile(`couchdb/seed-data/prices${limit}.json`, JSON.stringify({docs: bulk}))
}

seedSellers()
  .then(() => seedPrices(0, 1000000))
  .then(() => seedPrices(1000000, 2000000))
  .then(() => seedPrices(2000000, 3000000))
  .then(() => seedPrices(3000000, 4000000))
  .then(() => seedPrices(4000000, 5000000))
  .then(() => seedPrices(5000000, 6000000))
  .then(() => seedPrices(6000000, 7000000))
  .then(() => seedPrices(7000000, 8000000))
  .then(() => seedPrices(8000000, 9000000))
  .then(() => seedPrices(9000000, 10000000))
  .then(() => console.log('Successfully generated JSON files'))
  .catch((err) => console.log('Failed to generate JSON files', err));