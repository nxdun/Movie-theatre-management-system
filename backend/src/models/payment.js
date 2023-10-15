const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  cardHolderName: {
    type: String,
    required: true,
  },
  cartItems: [
    {
      name: String,
      price: Number,
      quantity: Number,
      total: Number,
    },
  ],
  totalCartPrice: Number,
  timeStamp: { type: Date, default: Date.now },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
