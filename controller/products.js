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
  pricesModel.fetchPrices(req.body.productId)
    .then((pricesRecord) => {
      if (pricesRecord.length === 0) {
        pricesModel.addPrices(req.body);
      } else {
        throw 'Product already exists';
      }
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};

const addSeller = (req, res) => {
  sellersModel.fetchSeller(req.body.id)
    .then((sellerRecord) => {
      if (sellerRecord.length === 0) {
        sellersModel.addSeller(req.body);
      } else {
        throw 'Seller already exists';
      }
    })
    .then(() => res.sendStatus(200))
    .catch((err) => res.status(404).send(err));
}

const deletePrices = (req, res) => {
  pricesModel.deletePrices(req.body.productId)
    .then(() => res.sendStatus(200))
    .catch((err) => res.status(404).send(err));
};

const deleteSeller = (req, res) => {
  sellersModel.deleteSeller(req.body.id)
    .then(() => res.sendStatus(200))
    .catch((err) => res.status(400).send(err));
}

const updatePrices = (req, res) => {
  pricesModel.updatePrices(req.body.productId, req.body.sellerId, req.body.priceUpdate)
    .then(() => res.sendStatus(200))
    .catch((err) => res.status(404).send(err));
}

const updateSeller = (req, res) => {
  sellersModel.updateSeller(req.body.id, req.body.sellerUpdate)
    .then(() => res.sendStatus(200))
    .catch((err) => res.status(404).send(err));
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
