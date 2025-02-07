const sequelize = require("../config/database");
const User = require("./user");
const Income = require("./income");
const Expense = require("./expense");
const Budget = require("./budget");
const Saving = require("./saving");
const AI = require("./ai");

// Define Associations
User.hasMany(Income, { foreignKey: "userId" });
Income.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Expense, { foreignKey: "userId" });
Expense.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Budget, { foreignKey: "userId" });
Budget.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Saving, { foreignKey: "userId" });
Saving.belongsTo(User, { foreignKey: "userId" });

User.hasMany(AI, { foreignKey: "userId" });
AI.belongsTo(User, { foreignKey: "userId" });

const db = { sequelize, User, Income, Expense, Budget, Saving, AI };
module.exports = db;
