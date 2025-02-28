const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/expense_tracker'; // Get the MongoDB URI from environment variable

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully'); // Log a success message
  } catch (error) {
    console.error('MongoDB connection error:', error); // Log the error
    process.exit(1);
  }
};

module.exports = connectDB;
