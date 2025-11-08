require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vibe_cart_db';
mongoose.connect(MONGO).then(()=> seed()).catch(e=> console.error(e));

const products = [
  { name: 'Classic Backpack', price: 799, image: 'https://images.unsplash.com/photo-1520975698511-9c6b1f3b73fc?w=800&q=60', description: 'Comfortable daily backpack.' },
  { name: 'Leather Tote Bag', price: 1299, image: 'https://images.unsplash.com/photo-1542293787938-c9e299b880b9?w=800&q=60', description: 'Stylish leather tote.' },
  { name: 'Travel Duffel', price: 1599, image: 'https://images.unsplash.com/photo-1516646255117-2c9d6abdbd20?w=800&q=60', description: 'Durable travel bag.' },
  { name: 'Mini Sling', price: 499, image: 'https://images.unsplash.com/photo-1560361894-5b6af0a7f8c8?w=800&q=60', description: 'Compact sling bag.' },
  { name: 'Laptop Sleeve', price: 599, image: 'https://images.unsplash.com/photo-1555529771-70b4d2f5b3c7?w=800&q=60', description: 'Protective laptop sleeve.' }
];

async function seed(){
  try {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Seeded products');
    process.exit(0);
  } catch (err) {
    console.error(err); process.exit(1);
  }
}
