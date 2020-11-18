const express = require('express');
const products = require('../controller/products');

const router = express.Router();

router.get('/product/prices', products.prices);
router.get('/product/sellers', products.sellers);
router.get('/product/quotes', products.quotes);

router.post('/product/prices', products.addPrices);
router.post('/product/sellers', products.addSeller);

router.delete('/product/prices', products.deletePrices);
router.delete('/product/sellers', products.deleteSeller);

router.put('/product/prices', products.updatePrices);
router.put('/product/sellers', products.updateSeller);

module.exports = router;
