require("dotenv").config();
const { Sequelize } = require("sequelize");

const storage = process.env.DB_STORAGE || "./database.sqlite"; // SQLite database file

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage,
  logging: false, // Disable logging SQL queries
});

module.exports = sequelize;
