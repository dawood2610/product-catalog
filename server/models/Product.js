const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String },
  price: { type: Number, required: true },
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
