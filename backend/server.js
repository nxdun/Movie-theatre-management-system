require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const connectDB = require('./config/db');

connectDB();


const app = express();



const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));