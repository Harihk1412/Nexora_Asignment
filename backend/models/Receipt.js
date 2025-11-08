const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema({
  total: Number,
  name: String,
  email: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Receipt', receiptSchema);
