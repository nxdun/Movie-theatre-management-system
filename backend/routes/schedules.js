const express = require('express');
const router = express.Router();

let Showtime = require('../models/Showtime');
let TheaterAllocation = require('../models/Theaterallocation');

router.use (express.json());

// Utility function to generate a date range
function getDateRange(startDate, endDate) {
  const ed = new Date(endDate);
  let sd = new Date(startDate);

  let dateRange = [];

  while (sd <= ed) {
    dateRange.push(new Date(sd)); // Push a new Date object with the current date
    sd.setDate(sd.getDate() + 1);
  }

  return dateRange;
  }

// Define routes for 'CRUD', theater allocations with showtimes

// Create a new theater allocation with showtimes
router.route('/add').post(async (req, res) => {
    try {

      const { theaterName, movieName, startDate, endDate, preferredShowtimes } = req.body;
  
      // Create a new theater allocation
      const allocation = new TheaterAllocation({
        theaterName,
        movieName,
        startDate,
        endDate,
      });
  
      // Save the allocation to the database
      const savedAllocation = await allocation.save();
  
      // Calculate the date range between start date and end date
      const dateRange = getDateRange(startDate, endDate);
  
      // Create an array to store showtime records
      let showtimeRecords = [];

      //create string maipulation to get time
      const timeContainer = preferredShowtimes.toString().split(',');

      // Populate showtimeRecords array with showtime data
      dateRange.forEach((date) => {
        const showtimeRecord = new Showtime({
          allocationId: savedAllocation._id,
          date,
          time:  timeContainer.map((t) => t).join(', ')
        });
        showtimeRecords.push(showtimeRecord);
      });
  
      // Insert showtime records into the database using insertMany
      const savedShowtimes = await Showtime.insertMany(showtimeRecords);

      return res.status(201).json({
        ok: true,
        allocation: savedAllocation,
        showtimes: savedShowtimes,
        msg: 'Theater allocation created successfully!',
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        ok: false,
        msg: 'Error creating theater allocation!',
      });
    }
  });

  // Read a theater allocation with associated showtimes
router.route('/get/:id').get(async (req, res) => {
    try {
      const allocationId = req.params.id;
  
      // Find the theater allocation by ID
      const allocation = await TheaterAllocation.findById(allocationId);
  
      // Find associated showtimes
      const showtimes = await Showtime.find({ allocationId });
  
      return res.json({
        ok: true,
        allocation,
        showtimes,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        ok: false,
        msg: "Error fetching theater allocation!",
      });
    }
  });


// Update a theater allocation with showtimes
router.route('/update/:id').put(async (req, res) => {
    try {
      const allocationId = req.params.id;
      const { theaterName, movieName, startDate, endDate, preferredShowtimes } = req.body;
  
      // Update the theater allocation
      const updatedAllocation = await TheaterAllocation.findByIdAndUpdate(
        allocationId,
        {
          theaterName,
          movieName,
          startDate,
          endDate,
        },
        { new: true }
      );
  
      // Delete existing showtimes for this allocation
      await Showtime.deleteMany({ allocationId });
  
      // Recalculate and save showtime records
      const dateRange = getDateRange(startDate, endDate);
      const updatedShowtimes = dateRange.map(date => ({
        allocationId: allocationId,
        date,
        time: preferredShowtimes[dateRange.indexOf(date)],
      }));
  
      await Showtime.insertMany(updatedShowtimes);
  
      return res.json({
        ok: true,
        allocation: updatedAllocation,
        showtimes: updatedShowtimes,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        ok: false,
        msg: "Error updating theater allocation!",
      });
    }
  });
  
  // Delete a theater allocation with showtimes
router.route('/delete/:id').delete(async (req, res) => {
    try {
      const allocationId = req.params.id;
  
      // Delete the specified theater allocation
      await TheaterAllocation.findByIdAndDelete(allocationId);
  
      // Delete associated showtimes
      await Showtime.deleteMany({ allocationId });
  
      return res.json({
        ok: true,
        msg: "Theater allocation and associated showtimes deleted",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        ok: false,
        msg: "Error deleting theater allocation!",
      });
    }
  });
  
  module.exports = router;