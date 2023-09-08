const router = require('express').Router();
let Product = require('../models/product.js');
const { route } = require('./product.js');

router.route('/add').post((req, res) => {
    const P_id = req.body.P_id;
    const P_name = req.body.P_name;
    const P_Description = req.body.P_Description;
    const P_price = req.body.P_price;
    const P_quantity = req.body.P_quantity;
    const P_status = req.body.P_status;
    const P_createDate = req.body.P_createDate;

    const newProduct = new Product({
        P_id,
        P_name,
        P_Description,
        P_price,
        P_quantity,
        P_status,
        P_createDate
    })

    newProduct.save()
    .then(() => res.json('Product added!'))
    .catch(err => res.status(400).json('Error: ' + err));
})
 router.route('/').get((req, res) => {
    Product.find()
    .then(product => res.json(product))
    .catch(err => res.status(400).json('Error: ' + err));
})  

router.route('/update/:p_id').put(async(req, res) => {  
    let productId = req.params.p_id;
    const {P_id, P_name, P_Description, P_price, P_quantity, P_status, P_createDate} = req.body;
    const updateProduct = { 
        P_id,
        P_name,
        P_Description,
        P_price,
        P_quantity,
        P_status,
        P_createDate
    }   
    const update= awaitproduct.findByIdAndUpdate(productId, updateProduct)
    .then(() => {
        res.status(200).send({status: "Product updated"})
    }).catch(err => res.status(500).send({status: "Error with updating data", error: err.message}));
})  

router.route('/delete/:p_id').delete(async(req, res) => {
    let productId = req.params.p_id;

    await Product.findByIdAndDelete(productId)
    .then(() => {
        res.status(200).send({status: "Product deleted"});
    }).catch(err => res.status(500).send({status: "Error with delete product", error: err.message}));
})

router.route('/get/:p_id').get(async(req, res) => { 
    let productId = req.params.p_id;
    const product = await Product.findById(p_id).then(() => {
        res.status(200).send({status: "Product fetched", product})
    }).catch(err => res.status(500).send({status: "Error with get product", error: err.message}));
})

module.exports = router;    // Path: backend/routes/supplier.js
