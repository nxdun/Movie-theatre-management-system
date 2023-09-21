require('dotenv').config();
import config from "./config.js";
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            
            useNewUrlParser: true,
            useUnifiedTopology:true
        });
        console.log("MongoDB connection SUCCESS");
    } catch (error) {
        console.log(process.env.MONGO_STRING);
        console.error("MongoDB connection FAIL");
        process.exit(1);
        
    }
}
module.exports = connectDB;