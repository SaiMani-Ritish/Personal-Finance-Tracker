const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Expense = sequelize.define("Expense", {
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
  category: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  date: { 
    type: DataTypes.DATEONLY, 
    allowNull: false 
  },
  paymentMethod: { 
    type: DataTypes.STRING, 
    allowNull: false 
  }
});

module.exports = Expense;
