const express = require('express');
const Payment = require('../models/payment');
const router = express.Router();

// Payment route
router.post('/payment', async (req, res) => {
  try {
    // Assuming req.body contains the data that we need to save to the database
    const {
      email,
      phoneNumber,
      cardHolderName,
      cartItems,
      totalCartPrice,
    } = req.body;

    const paymentData = new Payment({
      email,
      phoneNumber,
      cardHolderName,
      cartItems,
      totalCartPrice,
    });

    // Use await to wait for the save operation to complete
    await paymentData.save();

    res.status(201).json({ message: 'Payment data saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while saving payment data' });
  }
});

router.get('/paymentrecords', async (req, res) => {
  try {
    const paymentRecords = await Payment.find();
    console.log('Payment Records:', paymentRecords); // Log the retrieved data
    res.json(paymentRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching payment records' });
  }
});

module.exports = router;
