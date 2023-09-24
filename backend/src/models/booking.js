const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bookingSchema = new mongoose.Schema({

    bookingId: {
        type: String,
        required: true,
        unique: true
    },
    bookingDate: { 
        type: Date,
        required: true
    },
    showTime: {
        type: String,
        required: true
    },
    theaterId: {
        type: String,
        required: true
    },
    seatId: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    
    customerId: {
        type: String,
        required: true
    },

});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;