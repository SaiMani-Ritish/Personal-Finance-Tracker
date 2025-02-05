require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models");

const app = express();
app.use(express.json());
// app.use(cors());
app.use(cors({ origin: "http://localhost:3000" }));


// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server and connect to database
const PORT = process.env.PORT || 5000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
