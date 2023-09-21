const router = require("express").Router();
let Prd = require("../models/Prd");
//const { route } = require('./product.js');

router.route("/add").post(async (req, res) => {
  try {
    const { name, imageUrl, description, price, countInStock } = req.body;

    const newProduct = new Product({
      name,
      imageUrl,
      description,
      price,
      countInStock,
    });

    await newProduct.save();
    res.json({ message: "Product added successfully" });
  } catch (err) {
    res.status(400).json({ error: "Error adding PPRRDD", details: err.message });
  }
});

router.route("/").get((req, res) => {
  Prd.find()
    .then((product) => res.json(product))
    .catch((err) => res.status(400).json("Error: " + err));
});



module.exports = router; // Path: backend/routes/supplier.js
