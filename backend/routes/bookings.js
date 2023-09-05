const router = require("express").Router();
let Booking = require("../models/booking.js");

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
router.route("/:id").delete(async(req, res) => {
    let userId = req.params.id;
    await Booking.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status: "Booking deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete booking"});
    })
});

// update: /bookings/:id
router.route("/update/:id").put(async (req, res) => {
    let userId = req.params.id;
    const {seatId, price} = req.body;
  
    const updateBooking = {
        seatId,
        price,
    }
    
    const update = await Booking.findIDAndUpdate(userId, updateBooking)
    .then(() => {

     res.status(200).send({status: "Booking Updated", user: update})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data"});
    })   
});

router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    await Booking.findById(userId).then(() => {
        res.status(200).send({status: "Booking fetched", user: user})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get booking"});
    })
});


module.exports = router;