const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for Theater Allocation
const theaterAllocationSchema = new Schema({

  theaterName: {
    type: String,
    required: [true, "Theater name is required"],
  },
  movieName: {
    type: String,
    required: [true, "Movie name is required"],
  },
  startDate: {
    type: Date,
    required: [true, "Start date is required"],
  },
  endDate: {
    type: Date,
    required: [true, "End date is required"],
  },
});

// Create a model for Theater Allocation
const TheaterAllocation = mongoose.model('TheaterAllocation', theaterAllocationSchema);

module.exports = TheaterAllocation;
