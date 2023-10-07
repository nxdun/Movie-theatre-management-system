const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator'); // Import express-validator for validating user input
const router = express.Router();

const privatescreenController = require('../controller/privatescreenControllers');

// Create a new private screen
router.post('/',
  [
    // Add input validation middleware using express-validator
    body('privscname').optional().trim().isLength({ min: 1 }).withMessage('Screen name is required'),
    body('privseatcapacity').optional().isInt().withMessage('Seat capacity must be an integer'),
    body('privscprice').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('privsclocation').optional().trim().isLength({ min: 1 }).withMessage('Location is required'),
    body('privscdescription').optional().trim().isLength({ min: 1 }).withMessage('Description is required'),
    body('privscimage').optional().trim().isLength({ min: 1 }).withMessage('Image URL is required'),
  ],
  privatescreenController.createPrivatescreen
);

// Get all private screens
router.get('/', privatescreenController.getAllPrivatescreens);

// Get a private screen by ID
router.get('/editprivatescreen/:id', privatescreenController.getPrivatescreenById);


// Update a private screen by ID using PUT
router.put('/editprivatescreen/:id', privatescreenController.updatePrivatescreenById);

// Delete a private screen by ID
router.delete('/deleteprivatescreen/:id', privatescreenController.deletePrivatescreenById);


module.exports = router;
