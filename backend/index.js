require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const expenseRoutes = require('./routes/expenseRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const budgetRoutes = require('./routes/budgetRoutes');

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use('/api/expense', expenseRoutes); // Expense routes
app.use('/api/income', incomeRoutes); // Income routes
app.use('/api/budget', budgetRoutes); // Budget routes

// Start server and connect to database
const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/expense_tracker';

//  Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  });
