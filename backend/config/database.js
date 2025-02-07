require("dotenv").config();
const { Sequelize } = require("sequelize");

const storage = process.env.DB_STORAGE || "database.sqlite";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage,
  logging: console.log, // Enable logging for debugging
});

module.exports = sequelize;
