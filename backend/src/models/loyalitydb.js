const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loyaltySchema = new Schema({
  startingPoints: { type: Number, default: 100 },
  maximumPoints: { type: Number, default: 1000 },
  incrementValue: { type: Number, default: 10 },
  pointToCashConversionRate: { type: Number, default: 0.01 },
  resetMonthPeriod: { type: Number, default: 1 },
  enableAutomatedPointReset: { type: Boolean, default: false },
  enableManualConfig: { type: Boolean, default: true },
});

const LoyaltyData = mongoose.model("LoyaltyData", loyaltySchema);

module.exports = LoyaltyData;

