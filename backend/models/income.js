const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Income = sequelize.define("Income", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { model: User, key: "id" }, 
    onDelete: "CASCADE"
  },
  amount: { 
    type: DataTypes.FLOAT, 
    allowNull: false, 
    validate: { min: { args: [0], msg: "Amount must be positive" } } 
  },
  amountType: { 
    type: DataTypes.ENUM("Salary", "Stock"), 
    allowNull: false 
  },
  date: { 
    type: DataTypes.DATEONLY, 
    allowNull: false, 
    validate: { isDate: { msg: "Invalid date format" } } 
  }
});

module.exports = Income;
