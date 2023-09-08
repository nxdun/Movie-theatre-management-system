const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const customerSchema = new Schema({
  UserName: {
    type: String,
    required: true,
  },
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  BirthDate: {
    type: Date,
    required: true,
  },
  PhoneNumber: {
    type: String,
    required: true,
  },
  Gender: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  optInForMarketing: {
    type: Boolean,
    required: true,
  },
  TicketCount: {
    type: Number,
    default: 0,
  },

  // Loyalty-related fields
  Type: {
    type: Boolean,
    default: false,
  },
  LoyaltyPoints: {
    type: Number,
    default: 0, // Default to 0 points
  },
  LoyaltyRegisteredDate: {
    type: Date,
    default: Date.now,
  },
  PointResetDate: {
    type: Date,
    default: null, // Default to null
  },
});
const Customer = mongoose.model("customer", customerSchema);
module.exports = Customer;
