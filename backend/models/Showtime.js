const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for Showtime
const showtimeSchema = new Schema({

  allocationId: {
    type: Schema.Types.ObjectId,
    ref: 'TheaterAllocation',
  },

  date: {
    type: Date,
    required: true,
    default: null,
  },
  time: {
    type: String,
    required: true,
    default: null,
  },
});

// Create a model for Showtime
const Showtime = mongoose.model('Showtime', showtimeSchema);

module.exports = Showtime;