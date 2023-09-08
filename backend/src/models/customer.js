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
    required: true,
  },
});
const Customer = mongoose.model("customer", customerSchema);
module.exports = Customer;
