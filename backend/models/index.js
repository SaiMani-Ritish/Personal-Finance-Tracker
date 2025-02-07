const sequelize = require("../config/database");
const User = require("./user");
const Income = require("./income");
const Expense = require("./expense");
const Budget = require("./budget");
const Saving = require("./saving");
const AI = require("./ai");

// Define Relationships
User.hasMany(Income, { foreignKey: "userId", onDelete: "CASCADE" });
Income.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Expense, { foreignKey: "userId", onDelete: "CASCADE" });
Expense.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Budget, { foreignKey: "userId", onDelete: "CASCADE" });
Budget.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Saving, { foreignKey: "userId", onDelete: "CASCADE" });
Saving.belongsTo(User, { foreignKey: "userId" });

User.hasMany(AI, { foreignKey: "userId", onDelete: "CASCADE" });
AI.belongsTo(User, { foreignKey: "userId" });

module.exports = {
  sequelize,
  User,
  Income,
  Expense,
  Budget,
  Saving,
  AI,
};
