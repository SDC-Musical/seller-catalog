const express = require('express');
const products = require('../controller/products');

const router = express.Router();

router.get('/product/prices', products.prices);
router.get('/product/sellers', products.sellers);
router.get('/product/quotes', products.quotes);

router.post('/product/quotes', products.addQuote);
router.delete('/product/quotes', products.deleteQuote);

module.exports = router;
