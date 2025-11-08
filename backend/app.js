require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const productsRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const checkoutRouter = require('./routes/checkout');

const app = express();
app.use(cors());
app.use(express.json());

const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vibe_cart_db';
mongoose.connect(MONGO)
  .then(()=> console.log('MongoDB connected'))
  .catch(err => console.error('Mongo connect err:', err));

app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/checkout', checkoutRouter);

app.get('/', (req,res)=> res.send('Vibe mock cart backend is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log('Server running on', PORT));
