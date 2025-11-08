const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },        // optional image URL
  description: { type: String }   // optional
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
