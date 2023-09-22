// databaseMiddleware.js
const mongoose = require('mongoose');

const isDatabaseConnected = () => {
  return mongoose.connection.readyState === 1; // Check if the connection state is 'connected'
};

const waitForDatabase = async (req, res, next) => {
  if (isDatabaseConnected()) {
    // If the database is already connected, move on to the next middleware/route handler.
    next();
  } else {
    // If the database is not connected, wait for it to connect.
    mongoose.connection.once('connected', () => {
      next();
    });

    // You can also handle errors if the connection fails during the waiting period.
    mongoose.connection.on('error', (err) => {
      console.error('Database connection error:', err);
      res.status(500).json({ message: 'Database connection error' });
    });
  }
};

module.exports = waitForDatabase;
