const express = require('express');
const router = express.Router();
const { getAllProducts, getProductsById } = require("../controller/productControllers");

//@Get all products from db
//@route GET /api/products
//@access Public
router.get("/", getAllProducts)
//@Get all products from db
//@route GET /api/products/:id
//@access Public
router.get("/:id", getProductsById)

module.exports = router;
