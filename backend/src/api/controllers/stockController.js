    const stock = require("../models/stockModel");
    const mongoose = require("mongoose");

    const AddStock = async (req, res) => {

        const { name, description, price, quantity } = req.body;
        try {
            const newStock = new stock({
            name,
            description,
            price,
            quantity,
            });
            await newStock.save();
            res.status(201).json(newStock);
        } catch (error) {
            res.status(409).json({ message: error.message });
        }
        }
        const getStock = async (req, res) => {
            try {
                const stock = await stock.find();
                res.status(200).json(stock);
            } catch (error) {
                res.status(404).json({ message: error.message });
            }
            }
        const updateStock = async (req, res) => {
            const { id: _id } = req.params;
            const stock = req.body;
            if (!mongoose.Types.ObjectId.isValid(_id))
                return res.status(404).send("No stock with that id");
            const updatedStock = await stock.findByIdAndUpdate(
                _id,
                { ...stock, _id },
                {
                new: true,
                }
            );
            res.json(updatedStock);
            }
            module.exports = {  
                AddStock,
                getStock,
                updateStock,
                };
                
        
