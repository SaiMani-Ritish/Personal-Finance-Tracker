const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Income = sequelize.define("Income", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: "id" } },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  amountType: { type: DataTypes.ENUM("Salary", "Stock"), allowNull: false },
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = Income;
