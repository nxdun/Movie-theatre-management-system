
const LoyaltyData = require("../models/loyalitydb.js");
import logger from "../utils/logger";
let loyaltySettings = null; // Initialize as null

async function fetchLoyaltySettings() {
  try {
    loyaltySettings = await LoyaltyData.findOne({});
    logger.info(" fetching loyalty settings...");
  } catch (error) {
    
    logger.error("Error fetching loyalty settings:", error);
    loyaltySettings = {}; 
  }
}

fetchLoyaltySettings();

module.exports = {
  getLoyaltySettings: () => loyaltySettings,
  fetchLoyaltySettings, // use this function to manually refresh the settings
};