const PrivateScBooking = require("../models/privateScBooking");

// Create a new private screen booking
const createBooking = async (req, res) => {
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
};

// Get a list of all private screen bookings
const getBookings = async (req, res) => {
  try {
    const bookings = await PrivateScBooking.find();
    res.json(bookings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a private screen booking by ID
const deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    // Use Mongoose to find and remove the booking by ID
    await PrivateScBooking.findByIdAndRemove(bookingId);
    res.json({ message: "Private screen booking deleted successfully." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createBooking, getBookings, deleteBooking };
