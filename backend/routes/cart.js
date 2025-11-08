const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');
const mongoose = require('mongoose');

// GET /api/cart -> cart items + total
router.get('/', async (req, res) => {
  try {
    const items = await CartItem.find().populate('productId', 'name price image').lean();
    const formatted = items.map(i => ({
      id: i._id,
      productId: i.productId._id,
      name: i.productId.name,
      price: i.productId.price,
      image: i.productId.image || null,
      qty: i.qty
    }));
    const total = formatted.reduce((s,i)=> s + i.price * i.qty, 0);
    res.json({ items: formatted, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/cart { productId, qty } -> add or increment
router.post('/', async (req, res) => {
  try {
    const { productId, qty } = req.body;
    if (!productId || !mongoose.isValidObjectId(productId)) return res.status(400).json({ error: 'Invalid productId' });
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    let item = await CartItem.findOne({ productId });
    if (item) {
      item.qty += (qty || 1);
      await item.save();
      return res.json({ message: 'Cart updated', item });
    } else {
      item = new CartItem({ productId, qty: qty || 1 });
      await item.save();
      return res.json({ message: 'Added to cart', item });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/cart/:id -> update qty
router.put('/:id', async (req, res) => {
  try {
    const { qty } = req.body;
    if (qty < 1) return res.status(400).json({ error: 'qty must be >= 1' });
    const item = await CartItem.findByIdAndUpdate(req.params.id, { qty }, { new: true });
    if (!item) return res.status(404).json({ error: 'Cart item not found' });
    res.json({ message: 'Qty updated', item });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/cart/:id -> remove item
router.delete('/:id', async (req, res) => {
  try {
    await CartItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
