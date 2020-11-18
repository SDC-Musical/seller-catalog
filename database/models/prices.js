const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const priceSchema = new mongoose.Schema({
  productId: { type: Number, unique: true },
  seller: [{
    id: Number,
    price: Number,
    tax: Number,
  }],
});

const Price = mongoose.model('Price', priceSchema);

const retrievePrices = (id) => {
  if (id) {
    return Price.find({ productId: id })
      .sort({ productId: 1 });
  }
  return Price.find()
    .sort({ productId: 1 });
};

const fetchPrices = (id) => {
  return Price.find({ productId: id });
}

const addPrices = (product) => {
  return new Price(product).save();
}

const deletePrices = (id) => {
  return Price.deleteOne({ productId: id });
}

const updatePrices = (productId, sellerId, update) => {
  return Price.where({productId})
    .updateOne({'seller.id': sellerId}, {$set: {
      'seller.$.price': update.price,
      'seller.$.tax': update.tax
    }});
}

module.exports = {
  Price,
  retrievePrices,
  fetchPrices,
  addPrices,
  deletePrices,
  updatePrices
};
