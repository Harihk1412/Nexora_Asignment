const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');
const Receipt = require('../models/Receipt');

// POST /api/checkout { cartItems(optional), name, email } -> mock receipt
router.post('/', async (req, res) => {
  try {
    // we compute prices from DB to prevent tampering
    const items = await CartItem.find().populate('productId', 'price').lean();
    if (!items || items.length === 0) return res.status(400).json({ error: 'Cart empty' });

    let total = 0;
    items.forEach(i => { total += (i.productId.price || 0) * i.qty; });

    const r = new Receipt({ total, name: req.body.name || '', email: req.body.email || '' });
    await r.save();
    await CartItem.deleteMany({}); // clear cart
    res.json({ receipt: { id: r._id, total: r.total, timestamp: r.timestamp } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
