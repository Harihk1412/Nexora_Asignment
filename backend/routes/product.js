const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  try {
    let items = await Product.find();

   
    if (items.length === 0) {
      items = await Product.insertMany([
        {
          name: "Nike Shoes",
          price: 1999,
          image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
        },
        {
          name: "Puma T-Shirt",
          price: 799,
          image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dHNoaXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=1000"
        },
        {
          name: "Casio Watch",
          price: 1499,
          image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2F0Y2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=1000"
        },
        {
          name: "Adidas Cap",
          price: 499,
          image:"https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FwfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=1000"
        },
        {
          name: "Wildcraft Bag",
          price: 899,
          image: "https://plus.unsplash.com/premium_photo-1678739395192-bfdd13322d34?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFnfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=1000"
        }
      ]);
    }

    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
