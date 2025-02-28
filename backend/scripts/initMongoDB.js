const mongoose = require('mongoose');
const db = require('../models');

// Function to initialize the database
const initDB = async (erase = false) => {
  try {

    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/expense_tracker', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Clear existing collections
    if (erase) {
      console.log('Dropping existing collections...');
      const collections = Object.values(mongoose.connection.collections);
      for (const collection of collections) {
        await collection.deleteMany({});
      }
      console.log('All collections cleared.');
    }
    
    // Initialize the database
    console.log('Database initialized successfully.');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await mongoose.connection.close();
    process.exit();
  }
};

const erase = process.argv.includes('--erase');
initDB(erase);
