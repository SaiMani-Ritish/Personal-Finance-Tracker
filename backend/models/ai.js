const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const AI = sequelize.define("AI", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: "id" } },
});

module.exports = AI;
