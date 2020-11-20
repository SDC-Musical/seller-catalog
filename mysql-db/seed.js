const mysql = require('mysql');
const faker = require('faker');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'buying_options'
});

connection.connect();

// const seedPrices = () => {
//   const priceOptions = [9.99, 19.99, 29.99, 39.99, 49.99, 59.99, 99.99];
//   const query =  `INSERT INTO prices (product_id, seller, price, tax) VALUES ?`;
//   let values = '';

//   for (let i = 0; i < 100; i++) {
//     let value = [];

//   }

//   connection.query('INSERT INTO prices (id, product_id, seller, price, tax) VALUES (?, ?, ?, ?, ?)');
// }

const seedSellers = () => {
  let query = 'INSERT INTO sellers (seller_name,return_policy, delivery_free,delivery_min,delivery_days,delivery_fee) VALUES';
  const returnOptions = [30, 60, 90];
  const minPurchaseOptions = [20, 35];
  const deliveryDaysOptions = [1, 2, 3, 7];
  const deliveryFeeOptions = [2, 3, 5, 9.99];
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

  connection.query(query, function (err, results, fields) {
    if (err) {
      console.log('Error seeding sellers', err);
    } else {
      console.log('Successfully loaded sellers', results);
    }
  });
}
seedSellers();
connection.end();