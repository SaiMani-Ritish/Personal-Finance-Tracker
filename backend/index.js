require("dotenv").config();
const express = require("express");
const cors = require("cors");
const expenseRoutes = require('./routes/expenseRoutes');
const chatRoutes = require('./routes/chatRoutes');
const connectDB = require("./config/database");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use('/api/expense', expenseRoutes); // Expense routes
app.use('/api/chat', chatRoutes); // Chat routes

connectDB();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

