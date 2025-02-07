const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Expense = sequelize.define("Expense", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: "id" } },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  paymentMethod: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Expense;
