const router = require("express").Router();
let Booking = require("../models/booking.model");

// POST: /bookings/
router.route("/").post((req, res) => {
    const bookingId = req.body.bookingId;
    const bookingDate = Date(req.body.bookingDate);
    const showTime = req.body.showTime;
    const theaterId = req.body.theaterId;
    const seatId = req.body.seatId;
    const price = Number(req.body.price);
    const customerId = req.body.customerId;

    const newBooking = new Booking({
        bookingId,
        bookingDate,
        showTime,
        theaterId,
        seatId,
        price,
        customerId
    
    });

    newBooking.save().then(() => res.json("Booking added!")).catch(err => res.status(400).json("Error: " + err));
    

});

// GET: /bookings/
router.route("/").get((req, res) => {
    Booking.find().then(bookings => res.json(bookings)).catch(err => res.status(400).json("Error: " + err));
});

// GET: /bookings/:id
router.route("/:id").get((req, res) => {
    Booking.findById(req.params.id).then(booking => res.json(booking)).catch(err => res.status(400).json("Error: " + err));
});

// DELETE: /bookings/:id
router.route("/:id").delete((req, res) => {
    Booking.findByIdAndDelete(req.params.id).then(() => res.json("Booking deleted.")).catch(err => res.status(400).json("Error: " + err));
});

// POST: /bookings/update/:id
router.route("/update/:id").post((req, res) => {
    Booking.findById(req.params.id).then(booking => {
        booking.bookingId = req.body.bookingId;
        booking.bookingDate = Date(req.body.bookingDate);
        booking.showTime = req.body.showTime;
        booking.theaterId = req.body.theaterId;
        booking.seatId = req.body.seatId;
        booking.price = Number(req.body.price);
        booking.customerId = req.body.customerId;

        booking.save().then(() => res.json("Booking updated!")).catch(err => res.status(400).json("Error: " + err));
    }).catch(err => res.status(400).json("Error: " + err));
});



module.exports = router; 
