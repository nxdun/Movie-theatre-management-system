const supplier = require("../models/SupplierModel");
const mongoose = require("mongoose");
const AddSupplier = async (req, res) => {
  const { name, address, contact, email } = req.body;
  try {
    const newSupplier = new supplier({
      name,
      address,
      contact,
      email,
    });
    await newSupplier.save();
    res.status(201).json(newSupplier);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};  
const getSupplier = async (req, res) => {
  try {
    const supplier = await supplier.find();
    res.status(200).json(supplier);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const updateSupplier = async (req, res) => {
    const { id: _id } = req.params;
    const supplier = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No supplier with that id");
    const updatedSupplier = await supplier.findByIdAndUpdate(
        _id,
        { ...supplier, _id },
        {
        new: true,
        }
    );
    res.json(updatedSupplier);
    };
const deleteSupplier = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("No supplier with that id");
    await supplier.findByIdAndRemove(id);
    res.json({ message: "supplier deleted successfully." });
    };
module.exports = {
    AddSupplier,
    getSupplier,
    updateSupplier,
    deleteSupplier,
    };



 