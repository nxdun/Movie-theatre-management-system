const router = require("express").Router();
let Booking = require("../models/booking.js");
const { v4: uuidv4 } = require("uuid"); // Import the uuid package

// POST: /bookings/
router.route("/add").post((req, res) => {
    const bookingId = uuidv4(); // Generate a unique ID
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

// GET: /bookings/:bookingId
router.route("/:bookingId").get((req, res) => {
    Booking.findOne({ bookingId: req.params.bookingId }) // Use findOne to find by bookingId
      .then((booking) => {
        if (!booking) {
          return res.status(404).json("Booking not found");
        }
        res.json(booking);
      })
      .catch((err) => res.status(400).json("Error: " + err));
  });
  
// GET: /bookings/seat/:seatId
router.route("/seat/:seatId").get((req, res) => {
    Booking.findOne({ seatId: req.params.seatId }) // Use findOne to find by seatId
        .then((booking) => {
            if (!booking) {
                return res.status(404).json("Booking not found");
            }
            res.json(booking);
        })
        .catch((err) => res.status(400).json("Error: " + err));
});






// DELETE: /bookings/delete/:seatId
router.route("/delete/:seatId").delete(async (req, res) => {
    try {
        const seatId = req.params.seatId;
        const deletedBooking = await Booking.findOneAndDelete({ seatId: seatId });

        if (!deletedBooking) {
            return res.status(404).send({ status: "Booking not found" });
        }

        res.status(200).send({ status: "Booking deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ status: "Error with delete booking" });
    }
});




// PUT: /bookings/update/:bookingId (for updating)
router.route("/update/:bookingId").put(async (req, res) => {
    try {
        const bookingId = req.params.bookingId;
        const { seatId, price } = req.body;

        // Construct the update object
        const updateBooking = {
            seatId,
            price,
        };

        // Use findOneAndUpdate to locate the booking by bookingId and update it
        await Booking.findOneAndUpdate({ bookingId: bookingId }, updateBooking);

        res.status(200).send({ status: "Booking Updated" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "Error with updating data" });
    }
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