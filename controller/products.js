/* eslint-disable consistent-return */
/* eslint-disable no-restricted-globals */
const pricesModel = require('../database/models/prices');
const sellersModel = require('../database/models/sellers');
const { createQuotes } = require('../services/quotes');
const db = require('../mysql-db/index.js');
const { sellerOffer } = require('../services/helper.js');

const prices = (req, res) => {
  if (req.query.productId !== undefined) {
    pricesModel.retrievePrices(req.query.productId)
      .then((productData) => res.send(productData));
  } else {
    pricesModel.retrievePrices()
      .then((productData) => res.send(productData));
  }
};

const sellers = (req, res) => {
  sellersModel.retrieveSellers()
    .then((sellerData) => res.send(sellerData));
};

const quotes = (req, res) => {
  let id = null;
  if (req.query.productId) {
    id = req.query.productId;
  }

  if (id && isNaN(Number(id))) {
    return res.status(400).send('Bad Request.');
  }

  let priceInfo;
  let sellerInfo;

  sellersModel.retrieveSellers()
    .then((sellerData) => {
      sellerInfo = sellerData;
      return pricesModel.retrievePrices(id);
    })
    .then((productData) => {
      priceInfo = productData;
      return true;
    })
    .then(() => createQuotes(priceInfo, sellerInfo, req.query.sellerLimit))
    .then((quoteData) => {
      if (!quoteData.length) {
        return res.status(404).send('Product Not Found.');
      }
      return res.send(quoteData);
    })
    .catch(() => res.status(500).send('Internal Server Error.'));
};

const getQuotes = (req, res) => {
  if (req.query.productId && isNaN(Number(req.query.productId))) {
    return res.status(400).send('Bad Request.');
  }

  db.query(`SELECT prices.price, prices.tax, prices.id, sellers.seller_name, sellers.return_policy, sellers.delivery_free, sellers.delivery_min, sellers.delivery_days, sellers.delivery_fee FROM prices, sellers WHERE prices.product_id = ${req.query.productId} AND prices.seller = sellers.id`, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else if (result.length === 0) {
      res.status(404).send('Product Not Found');
    } else {
      result.map((quote) => {
        quote.offer = sellerOffer(quote);
      });
      res.send(result);
    }
  })
}

const addPrices = (req, res) => {
  const values = [];

  values.push(req.body.productId);
  values.push(req.body.seller);
  values.push(req.body.price);
  values.push(req.body.tax);

  db.query(`INSERT INTO prices (product_id, seller, price, tax) VALUES(?, (SELECT id FROM sellers WHERE seller_name = ?), ?, ?)`, values, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.sendStatus(200);
    }
  });
};

const addSeller = (req, res) => {
  const values = [];

  values.push(req.body.seller);
  values.push(req.body.returnPolicy);
  values.push(req.body.deliveryFree);
  values.push(req.body.deliveryMin);
  values.push(req.body.deliveryDays);
  values.push(req.body.deliveryFee);

  db.query(`INSERT INTO sellers (seller_name,return_policy, delivery_free,delivery_min,delivery_days,delivery_fee) VALUES(?, ?, ?, ?, ?, ?)`, values, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.sendStatus(200);
    }
  });
}

const deletePrices = (req, res) => {
  const values = [];

  values.push(req.body.productId);
  values.push(req.body.seller);

  db.query(`DELETE FROM prices WHERE product_id = ? AND seller = (SELECT id FROM sellers WHERE seller_name = ?)`, values, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.sendStatus(200);
    }
  });
};

const deleteSeller = (req, res) => {
  const value = req.body.seller;

  db.query(`DELETE FROM sellers WHERE seller_name = ?`, value, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.sendStatus(200);
    }
  });
}

const updatePrices = (req, res) => {
  pricesModel.updatePrices(req.body.productId, req.body.sellerId, req.body.priceUpdate)
    .then(() => res.sendStatus(200))
    .catch((err) => res.status(404).send(err));
}

const updateSeller = (req, res) => {
  const values = [];

  values.push(req.body.updateValue);
  values.push(req.body.seller);

  db.query(`UPDATE sellers SET ${req.body.updateParam} = ? WHERE seller_name = ?`, values, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.sendStatus(200);
    }
  });
}

module.exports = {
  prices,
  sellers,
  getQuotes,
  addPrices,
  addSeller,
  deletePrices,
  deleteSeller,
  updatePrices,
  updateSeller
};
