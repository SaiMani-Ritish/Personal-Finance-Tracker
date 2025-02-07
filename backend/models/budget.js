const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Budget = sequelize.define("Budget", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { model: User, key: "id" }, 
    onDelete: "CASCADE"
  },
  category: { type: DataTypes.STRING, allowNull: false },
  amount: { 
    type: DataTypes.FLOAT, 
    allowNull: false, 
    validate: { min: { args: [0], msg: "Amount must be positive" } } 
  }
});

module.exports = Budget;
