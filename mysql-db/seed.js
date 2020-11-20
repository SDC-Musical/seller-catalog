const mysql = require('mysql');
const faker = require('faker');
const Promise = require('bluebird');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'buying_options'
});

connection.connect();

const seedPrices = (start, limit) => {
  const priceOptions = [9.99, 19.99, 29.99, 39.99, 49.99, 59.99, 99.99];
  let query =  `INSERT INTO prices (product_id, seller, price, tax) VALUES`;
  let values = '';

  for (let i = start; i < limit; i++) {
    const sellerCount = Math.floor(Math.random() * 4 + 1);

    for (let j = 0; j < sellerCount; j++) {
      const priceIndex = Math.floor(Math.random() * priceOptions.length);
      let value = [];

      //product_id
      value.push(i + 1);
      //seller
      value.push(Math.floor(Math.random() * 50 + 1));
      //price
      value.push(priceOptions[priceIndex]);
      //tax
      value.push((priceOptions[priceIndex] * 0.05).toFixed(2));

      values += `(${value.join( )}),`;
    }
  }

  query += values.slice(0, values.length - 1);

  return new Promise((resolve, reject) => {
    connection.query(query, (err) => {
      if (err) {
        reject('Error seeding prices', err);
      } else {
        resolve();
      }
    });
  });
}

const seedSellers = () => {
  const returnOptions = [30, 60, 90];
  const minPurchaseOptions = [20, 35];
  const deliveryDaysOptions = [1, 2, 3, 7];
  const deliveryFeeOptions = [2, 3, 5, 9.99];
  let query = 'INSERT INTO sellers (seller_name,return_policy, delivery_free,delivery_min,delivery_days,delivery_fee) VALUES';
  let values = '';

  for (let i = 0; i < 50; i++) {
    let value = [];
    let isFree = Math.floor(Math.random() * 2);

    //seller_name
    value.push(`'${faker.name.firstName()}'`);
    //return_policy
    value.push(`'Return eligible for ${returnOptions[Math.floor(Math.random() * returnOptions.length)]} days'`);
    //delivery_free
    value.push(isFree);
    //delivery_min
    if (isFree === 0) {
      value.push(0);
    } else {
      value.push(minPurchaseOptions[Math.floor(Math.random() * minPurchaseOptions.length)]);
    }
    //delivery_days
    value.push(deliveryDaysOptions[Math.floor(Math.random() * deliveryDaysOptions.length)]);
    //delivery_fee
    if (isFree === 0) {
      value.push(0);
    } else {
      value.push(deliveryFeeOptions[Math.floor(Math.random() * deliveryFeeOptions.length)]);
    }

    values += `(${value.join( )}),`;
  }
  query += values.slice(0, values.length - 1);

  return new Promise((resolve, reject) => {
    connection.query(query, (err) => {
      if (err) {
        reject('Error seeding sellers', err);
      } else {
        resolve();
      }
    });
  });
}

Promise.resolve(seedSellers())
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
  .then(() => connection.end())
  .catch((err) => console.log(err));