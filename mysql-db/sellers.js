const faker = require('faker');
const fs = require('fs');

const sellers = fs.createWriteStream('mysql-db/csv/sellers.csv');

sellers.write('id,seller_name,return_policy,delivery_free, delivery_min,delivery_days,delivery_fee\n', 'utf8');

const random = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
}

const writeSellers = (writer, encoding, cb) => {
  const options = {
    free: [0, 1],
    minPurchase: [20, 35],
    deliveryDays: [1, 2, 3, 7],
    deliveryFee: [2, 3, 5, 9.99],
    returnPolicy: [30, 60, 90]
  };
  let i = 50;
  let id = 0;

  function write() {
    let ok = true;

    do {
      i -= 1;
      id += 1;

      let name = faker.name.firstName();
      let returnPolicy = `Return eligible for ${random(options.returnPolicy)} days`;
      let free = random(options.free);
      let minPurchase = free === 0 ? 0 : random(options.minPurchase);
      let days = random(options.deliveryDays);
      let fee = free === 0 ? 0 : random(options.deliveryFee);

      let data = `${id},${name},${returnPolicy},${free},${minPurchase},${days},${fee}\n`;

      if (i === 0) {
        writer.write(data, encoding, cb);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);

    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}

writeSellers(sellers, 'utf-8', () => {
  sellers.end();
});
