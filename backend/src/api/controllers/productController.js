    const product = require("../models/productModel");
    const mongoose = require("mongoose");
    const AddProduct = async (req, res) => {
        const { name, description, price, quantity } = req.body;
        try {
            const newProduct = new product({
            name,
            description,
            price,
            quantity,
            });
            await newProduct.save();
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(409).json({ message: error.message });
        }
        };

    const getProduct = async (req, res) => {
        try {
            const product = await product.find();
            res.status(200).json(product);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
        }
    const updateProduct = async (req, res) => {
        const { id: _id } = req.params;
        const product = req.body;
        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(404).send("No product with that id");
        const updatedProduct = await product.findByIdAndUpdate(
            _id,
            { ...product, _id },
            {
            new: true,
            }
        );
        res.json(updatedProduct);
        }

    const deleteProduct = async (req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).send("No product with that id");
        await product.findByIdAndRemove(id);
        res.json({ message: "product deleted successfully." });
        };

    module.exports = {
        AddProduct,
        getProduct,
        updateProduct,
        deleteProduct,
        };


