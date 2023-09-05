
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

require('dotenv').config();

const app = express();



const PORT = process.env.PORT || 5101;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;


mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,   
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB connection success!");
});

const bookingRouter = require('./routes/bookings.js');
app.use('/booking', bookingRouter);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));