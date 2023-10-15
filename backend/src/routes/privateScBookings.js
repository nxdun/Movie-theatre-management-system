const express = require("express");
const router = express.Router();
const PrivateScBooking = require("../models/privateScBooking");

// Create a new private screen booking
router.post("/book", async (req, res) => {
  try {
    const {
      movie,
      bookingDate,
      parking,
      email,
      otherReqs,
      screen,
      price,
      time,
      cusName,
      mobile,
    } = req.body;

    const booking = new PrivateScBooking({
      movie,
      bookingDate,
      parking,
      email,
      otherReqs,
      screen,
      price,
      time,
      cusName,
      mobile,
    });

    const savedBooking = await booking.save();
    res.json(savedBooking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get a list of all private screen bookings
router.get("/bookings", async (req, res) => {
  try {
    const bookings = await PrivateScBooking.find();
    res.json(bookings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a private screen booking by ID
router.delete("/bookings/:bookingId", async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    // Use Mongoose to find and remove the booking by ID
    await PrivateScBooking.findByIdAndRemove(bookingId);
    res.json({ message: "Private screen booking deleted successfully." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
