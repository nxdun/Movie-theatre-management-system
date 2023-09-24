const express = require("express");
const router = express.Router();
const LoyaltyData = require("../models/loyalitydb.js");

// Get loyalty settings
router.get("/", async (req, res) => { 
  try {
    const loyaltySettings = await LoyaltyData.findOne({});
    res.json(loyaltySettings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update loyalty settings
router.post("/", async (req, res) => {
    try {
      // Find the existing loyalty settings document
      const existingSettings = await LoyaltyData.findOne({});
  
      if (!existingSettings) {
        return res.status(404).json({ message: "Loyalty settings not found" });
      }
  
      // Update the existing document with the new values from req.body
      if (req.body) {
        Object.assign(existingSettings, req.body);
  
        // Save the updated document
        const updatedSettings = await existingSettings.save();
  
        return res.json(updatedSettings);
      } else {
        return res.status(400).json({ message: "No update data provided" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
  

module.exports = router;
