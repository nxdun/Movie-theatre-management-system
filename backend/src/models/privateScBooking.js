const mongoose = require("mongoose");

const privateScBookingSchema = new mongoose.Schema({
  movie: {
    type: String,
    required: true,
  },
  bookingDate: {
    type: String,
    required: true,
  },
  parking: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  otherReqs: {
    type: String,
  },
  screen: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  cusName: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
});

const PrivateScBooking = mongoose.model(
  "PrivateScBooking",
  privateScBookingSchema
);

module.exports = PrivateScBooking;
