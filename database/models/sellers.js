const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: String,
  returnPolicy: String,
  delivery: {
    free: String,
    minimumPurchase: Number,
    days: Number,
    fee: Number,
  },
});

const Seller = mongoose.model('Seller', sellerSchema);

const retrieveSellers = () => Seller.find()
  .limit()
  .sort({ productId: 1 });

const fetchSeller = (id) => {
  return Seller.find({ id });
};

const addSeller = (seller) => {
  return new Seller(seller).save();
}

const deleteSeller = (id) => {
  return Seller.deleteOne({ id });
}

const updateSeller = (id, update) => {
  return Seller.updateOne({ id }, update);
}

module.exports = {
  Seller,
  retrieveSellers,
  fetchSeller,
  addSeller,
  deleteSeller,
  updateSeller
};
