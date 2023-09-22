const Prd = require("../models/Prd.js");

//@GET All Products function
const getAllProducts = async (req, res) => {
    try {
        const products = await Prd.find({});

        res.json(products);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

//@GET Product by ID function
const getProductById = async (req, res) => {
    try {
      const product = await Prd.findById(req.params.id);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }
  
  module.exports = { getAllProducts, getProductById };
