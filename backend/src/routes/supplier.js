const express = require('express');
const router = express.Router();
const Supplier = require('../models/supplier');

// Add a new supplier
router.post('/add', async (req, res) => {
  try {
    const {
      S_id,
      S_name,
      S_address,
      S_email,
      S_status,
      S_contactNo,
      // S_createDate,
    } = req.body;

    const newSupplier = new Supplier({
      S_id,
      S_name,
      S_address,
      S_email,
      S_status,
      S_contactNo,
      S_createDate: new Date(),
    });

    const savedSupplier = await newSupplier.save();
    res.json({ status: 'Supplier added', supplier: savedSupplier });
  } catch (error) {
    res.status(400).json({ status: 'Error', error: error.message });
  }
});

// Get all suppliers
router.get('/', async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json({ status: 'Suppliers retrieved', suppliers });
  } catch (error) {
    res.status(400).json({ status: 'Error', error: error.message });
  }
});

// Update a supplier by ID
router.put('/update/:id', async (req, res) => {
  try {
    const supplierId = req.params.id;
    const {
      S_id,
      S_name,
      S_address,
      S_email,
      S_status,
      S_contactNo,
      S_createDate,
    } = req.body;

    const updatedSupplier = {
      S_id,
      S_name,
      S_address,
      S_email,
      S_status,
      S_contactNo,
      S_createDate,
    };

    const result = await Supplier.findByIdAndUpdate(
      supplierId,
      updatedSupplier,
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ status: 'Supplier not found' });
    }

    res.json({ status: 'Supplier updated', supplier: result });
  } catch (error) {
    res.status(500).json({ status: 'Error', error: error.message });
  }
});

// Delete a supplier by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const supplierId = req.params.id;
    const result = await Supplier.findByIdAndDelete(supplierId);

    if (!result) {
      return res.status(404).json({ status: 'Supplier not found' });
    }

    res.json({ status: 'Supplier deleted' });
  } catch (error) {
    res.status(500).json({ status: 'Error', error: error.message });
  }
});

// Get a supplier by ID
router.get('/get/:id', async (req, res) => {
  try {
    const supplierId = req.params.id;
    const supplier = await Supplier.findById(supplierId);

    if (!supplier) {
      return res.status(404).json({ status: 'Supplier not found' });
    }

    res.json({ status: 'Supplier retrieved', supplier });
  } catch (error) {
    res.status(500).json({ status: 'Error', error: error.message });
  }
});

module.exports = router;
