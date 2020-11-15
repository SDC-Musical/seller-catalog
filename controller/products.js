/* eslint-disable consistent-return */
/* eslint-disable no-restricted-globals */
const { retrievePrices } = require('../database/models/prices');
const { retrieveSellers } = require('../database/models/sellers');
const { createQuotes } = require('../services/quotes');

const prices = (req, res) => {
  if (req.query.productId !== undefined) {
    retrievePrices(req.query.productId)
      .then((productData) => res.send(productData));
  } else {
    retrievePrices()
      .then((productData) => res.send(productData));
  }
};

const sellers = (req, res) => {
  retrieveSellers()
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

  retrieveSellers()
    .then((sellerData) => {
      sellerInfo = sellerData;
      return retrievePrices(id);
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

const addQuote = (req, res) => {
  //to complete with db methods to add/update price and seller
  res.sendStatus(200);
};

const deleteQuote = (req, res) => {
  //to complete with db methods to delete price and seller
  res.sendStatus(200);
};

module.exports = {
  prices,
  sellers,
  quotes,
  addQuote,
  deleteQuote
};
