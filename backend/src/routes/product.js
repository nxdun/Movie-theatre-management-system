const router = require('express').Router();
let Product = require('../models/product.js');

// Route to add a new product
router.route('/add').post((req, res) => {
    // Extract product data from the request body
    const { P_id, P_type, P_name, P_description, P_image, P_supplierId, P_price, P_status, P_reoderLevel } = req.body;

    // Create a new product instance
    const newProduct = new Product({
        P_id,
        P_type,
        P_name,
        P_description,
        P_image,
        P_supplierId,
        P_price,
        P_quantity:0,
        P_status,
        P_reoderLevel,
        P_createDate:new Date()
    });

    // Save the new product to the database
    newProduct.save()
        .then(() => res.json('Product added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Route to get all products
router.route('/').get((req, res) => {
    // Retrieve all products from the database
    Product.find()
        .then(products => res.status(200).send({ status: "Product fetched", products }))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Route to update a product by ID
router.route('/update/:p_id').put(async (req, res) => {
    // Extract the product ID from the URL parameter
    let productId = req.params.p_id;

    // Extract updated product data from the request body
    const { P_id, P_type, P_name, P_description, P_image, P_price, P_quantity, P_status,P_reoderLevel, P_createDate } = req.body;

    // Create an object with updated product data
    const updateProduct = {
        P_id,
        P_type,
        P_name,
        P_description,
        P_image,
        P_price,
        P_quantity,
        P_status,
        P_reoderLevel,  // Note: P_supplierId and P_reoderLevel are missing in the request body
        P_createDate
    };

    // Update the product in the database by its ID
    const update = await Product.findByIdAndUpdate(productId, updateProduct)
        .then(() => {
            res.status(200).send({ status: "Product updated" });
        })
        .catch(err => res.status(500).send({ status: "Error with updating data", error: err.message }));
});

// Route to delete a product by ID
router.route('/delete/:p_id').delete(async (req, res) => {
    // Extract the product ID from the URL parameter
    let productId = req.params.p_id;

    // Delete the product from the database by its ID
    await Product.findByIdAndDelete(productId)
        .then(() => {
            res.status(200).send({ status: "Product deleted" });
        })
        .catch(err => res.status(500).send({ status: "Error with delete product", error: err.message }));
});

// Route to get a product by ID
router.route('/get/:p_id').get(async (req, res) => {
    // Extract the product ID from the URL parameter
    let productId = req.params.p_id;

    // Retrieve the product from the database by its ID
    const product = await Product.findById(productId)
        .then((product) => {
            res.status(200).send({ status: "Product fetched", product });
        })
        .catch(err => res.status(500).send({ status: "Error with get product", error: err.message }));
});

module.exports = router; // Path: backend/routes/supplier.js
