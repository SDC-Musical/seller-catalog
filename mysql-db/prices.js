const fs = require('fs');

const prices = fs.createWriteStream('mysql-db/csv/prices.csv');

prices.write('id,product_id,seller,price,tax\n', 'utf8');

const writePrices = (writer, encoding, cb) => {
  const priceOptions = [9.99, 19.99, 29.99, 39.99, 49.99, 59.99, 99.99];

  let i = 10000000;
  let id = 0;
  let productId = 0;

  function write() {
    let ok = true;

    do {
      i -= 1;
      productId += 1;

      const sellerCount = Math.floor(Math.random() * 4 + 1);

      for (let j = 0; j < sellerCount; j++) {
        const priceIndex = Math.floor(Math.random() * priceOptions.length);

        id += 1;

        let seller = Math.floor(Math.random() * 50 + 1);
        let price = priceOptions[priceIndex];
        let tax = (price * 0.05).toFixed(2);

        let data = `${id},${productId},${seller},${price},${tax}\n`;

        if (i === 0) {
          writer.write(data, encoding, cb);
        } else {
          ok = writer.write(data, encoding);
        }
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}

writePrices(prices, 'utf-8', () => {
  prices.end();
});