const dotenv = require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const mongoose = require("mongoose");

const Advertisement = require("./models/advertisementModel");
const advertisementRoutes = require("./routes/advertisementRoute");

const Screen = require("./models/screenModel");
const screenRoutes = require("./routes/screenRoute");

const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/api/advertisements", advertisementRoutes);
app.use("/api/screens", screenRoutes);


//Routes
// app.get("/", (req, res) => {
//     res.send("Home Page");
// });

const PORT = process.env.PORT || 3040;
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};
startServer();