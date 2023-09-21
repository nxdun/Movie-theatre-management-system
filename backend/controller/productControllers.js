const Product = require('../models/Product');
//@GET Product function
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});

        res.json(products);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}
//@GET Product by id function
const getProductsById = async (req, res) => {
    try {
        const products = await Product.findById(req.params.id);

        res.json(products);
          
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

module.exports = { getAllProducts, getProductsById };