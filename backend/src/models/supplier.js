const express = require("express");
const router = express.Router();
const Supplier = require("../models/supplier.js");

// Add a new supplier
router.post("/add", (req, res) => {
  const {
    S_name,
    S_id,
    S_address,
    S_email,
    S_status,
    S_createDate,
  } = req.body;

  const newSupplier = new Supplier({
    S_name,
    S_id,
    S_address,
    S_email,
    S_status,
    S_createDate,
  });

  newSupplier
    .save()
    .then(() => res.json("Supplier added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Get all suppliers
router.get("/", (req, res) => {
  Supplier.find()
    .then((suppliers) => res.json(suppliers))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Update a supplier by ID
router.put("/update/:id", async (req, res) => {
  const supplierId = req.params.id;
  const {
    S_name,
    S_id,
    S_address,
    S_email,
    S_status,
    S_createDate,
  } = req.body;

  const updateSupplier = {
    S_name,
    S_id,
    S_address,
    S_email,
    S_status,
    S_createDate,
  };

  try {
    await Supplier.findByIdAndUpdate(supplierId, updateSupplier);
    res.status(200).send({ status: "Supplier updated" });
  } catch (err) {
    res.status(500).send({ status: "Error with updating data", error: err.message });
  }
});

// Delete a supplier by ID
router.delete("/delete/:id", async (req, res) => {
  const supplierId = req.params.id;

  try {
    await Supplier.findByIdAndDelete(supplierId);
    res.status(200).send({ status: "Supplier deleted" });
  } catch (err) {
    res.status(500).send({ status: "Error with delete supplier", error: err.message });
  }
});

// Get a supplier by ID
router.get("/get/:id", async (req, res) => {
  const supplierId = req.params.id;

  try {
    const supplier = await Supplier.findById(supplierId);
    res.status(200).send({ status: "Supplier fetched", supplier });
  } catch (err) {
    res.status(500).send({ status: "Error with getting supplier", error: err.message });
  }
});

module.exports = router;
