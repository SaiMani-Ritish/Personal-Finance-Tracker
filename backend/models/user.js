const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    validate: { notEmpty: { msg: "Name is required" } } 
  },
  email: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true, 
    validate: { isEmail: { msg: "Invalid email format" } } 
  },
  password: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    validate: { len: { args: [6, 100], msg: "Password must be at least 6 characters long" } } 
  },
  phoneNo: { 
    type: DataTypes.STRING, 
    validate: { isNumeric: { msg: "Phone number must contain only digits" } } 
  }
});

module.exports = User;
