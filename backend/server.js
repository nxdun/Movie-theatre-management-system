require('dotenv').config();
const express = require('express');

const connectDB = require('./config/db');
const mongoose = require("mongoose");
const Advertisement = require("./model/advertisementModel");
const advertisementRoutes = require("./routes/advertisementRoute");

connectDB();


const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(advertisementRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));